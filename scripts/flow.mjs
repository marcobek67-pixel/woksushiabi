/**
 * OQIM TEKSHIRUVI — buyurtma endi faqat telefon orqali.
 * Savat/checkout yo'qligini, telefon havolalari va manzil ma'lumoti to'g'riligini tekshiradi.
 * Ishlatish: node scripts/flow.mjs   (BASE_URL bilan manzil o'zgartiriladi)
 */
import puppeteer from 'puppeteer-core'

const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.BASE_URL || 'http://127.0.0.1:5177/'
const PHONE = '+998907540797'
const DISPLAY = '+998 90 754 07 97'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const log = (label, pass, extra = '') =>
  console.log(`${label}: ${pass ? 'PASS' : 'FAIL'}${extra ? ` ${extra}` : ''}`)

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  protocolTimeout: 180000,
  args: [
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--hide-scrollbars',
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--remote-debugging-port=0',
  ],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const errs = []
page.on('pageerror', (e) => errs.push(e.message))
page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))

await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
await sleep(3600)

// 1. Navbar telefon raqamini ko'rsatadi
const navTel = await page.evaluate(
  async () =>
    Array.from(document.querySelectorAll('header a[href^="tel:"]')).map((a) => a.getAttribute('href'))[0],
)
log('navbar tel link', navTel === `tel:${PHONE}`, String(navTel))

const navText = await page.evaluate(() => document.querySelector('header')?.innerText || '')
log('navbar shows number', navText.includes(DISPLAY))

// 2. Hero CTA — telefon
const heroTel = await page.evaluate(() => {
  const a = document.querySelector('#hero a[href^="tel:"]')
  return a ? { href: a.getAttribute('href'), text: a.innerText.trim() } : null
})
log('hero tel CTA', heroTel?.href === `tel:${PHONE}`, JSON.stringify(heroTel))
log('hero has no BUYURTMA BERISH button', !/BUYURTMA BERISH/.test(await page.evaluate(() => document.querySelector('#hero')?.innerText || '')))

// 3. Menyuda savat tugmasi yo'q
await page.evaluate(() => document.getElementById('menu')?.scrollIntoView())
await sleep(1400)
const menuState = await page.evaluate(() => {
  const t = document.getElementById('menu')?.innerText || ''
  return { hasSavat: /SAVATGA|savatga/.test(t), cards: document.querySelectorAll('#menu [data-card]').length }
})
log('menu has no add-to-cart', !menuState.hasSavat, `cards=${menuState.cards}`)

// 4. Modal — telefon CTA, savatga qo'shish yo'q
await page.evaluate(() => document.querySelector('#menu [data-card]')?.click())
await sleep(1500)
const modal = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('a[href^="tel:"]'))
  const t = document.body.innerText
  return {
    tel: links.length ? links[links.length - 1].getAttribute('href') : null,
    hasAdd: /SAVATGA QO/.test(t),
    hasPrice: /so'm/.test(t),
  }
})
log('modal tel CTA', modal.tel === `tel:${PHONE}`, String(modal.tel))
log('modal has no cart button', !modal.hasAdd)
log('modal shows price', modal.hasPrice)
await page.screenshot({ path: new URL('../shots/f01-modal.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })

await page.keyboard.press('Escape')
await sleep(800)

// 5. Butun saytda savat izi yo'q
const leftovers = await page.evaluate(() => ({
  body: document.body.innerText,
  ls: Object.keys(localStorage).filter((k) => /cart|savat/i.test(k)),
}))
log('no "SAVAT" text on page', !/SAVAT|Savat|savatga/.test(leftovers.body))
log('no cart in localStorage', leftovers.ls.length === 0, leftovers.ls.join(','))

// 6. "ABI KIM?" bo'limi o'chirilgan
log('abi-kim section removed', (await page.evaluate(() => !!document.getElementById('abi-kim'))) === false)

// 7. Aloqa bo'limi — haqiqiy manzil + jonli xarita
await page.evaluate(() => document.getElementById('qayerdamiz')?.scrollIntoView())
await sleep(1800)
const contact = await page.evaluate(() => {
  const el = document.getElementById('qayerdamiz')
  return {
    text: el?.innerText || '',
    iframe: el?.querySelector('iframe')?.src || null,
    maps: Array.from(el?.querySelectorAll('a[target="_blank"]') || []).map((a) => a.href),
    tel: el?.querySelector('a[href^="tel:"]')?.getAttribute('href') || null,
  }
})
log('address shown', contact.text.includes('Toshbuloq'), contact.text.match(/Toshbuloq[^\n]*/)?.[0] || '')
log('phone shown', contact.text.includes(DISPLAY))
log('live map iframe', !!contact.iframe && contact.iframe.includes('40.9298'), String(contact.iframe).slice(0, 60))
log('maps link has coords', contact.maps.some((h) => h.includes('40.9298333') && h.includes('71.5845556')))
log('contact tel link', contact.tel === `tel:${PHONE}`, String(contact.tel))
log('hours still flagged as missing', /Kiritilmadi/.test(contact.text))

// 8. Footer
const footer = await page.evaluate(() => {
  const f = document.querySelector('footer')
  return { text: f?.innerText || '', tel: f?.querySelector('a[href^="tel:"]')?.getAttribute('href') || null }
})
log('footer tel link', footer.tel === `tel:${PHONE}`, String(footer.tel))
log('footer has no "Abi kim?"', !/Abi kim/.test(footer.text))

// 9. Sahifa bo'ylab barcha tel havolalari bir xil raqamga boradi
const allTels = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="tel:"]')).map((a) => a.getAttribute('href')))
log('all tel links consistent', allTels.length > 0 && allTels.every((h) => h === `tel:${PHONE}`), `n=${allTels.length}`)

log('page errors', errs.length ? [...new Set(errs)].join(' | ') : 'none')
await browser.close()
