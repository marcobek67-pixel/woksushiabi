/**
 * Brauzer tekshiruvi — skrinshotlar + interaktiv oqimlar + konsol xatolari.
 * Ishlatish: node scripts/verify.mjs [desktop|mobile|overflow|reduced|all]
 */
import { mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer-core'

const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.BASE_URL || 'http://127.0.0.1:5177/'
const OUT = new URL('../shots/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
mkdirSync(OUT, { recursive: true })

const which = (process.argv[2] || 'all').toLowerCase()
const report = { errors: [], warnings: [], checks: [], shots: [] }

function watch(page, tag) {
  page.on('console', (m) => {
    const t = m.type()
    if (t === 'error') report.errors.push(`[${tag}] ${m.text()}`)
    else if (t === 'warning') report.warnings.push(`[${tag}] ${m.text()}`)
  })
  page.on('pageerror', (e) => report.errors.push(`[${tag}] PAGEERROR ${e.message}`))
  page.on('requestfailed', (r) => {
    // Uchinchi tomon (xarita) resurslari tarmoqqa bog'liq — ogohlantirish sifatida
    if (r.url().includes('google.com')) report.warnings.push(`[${tag}] REQFAIL ${r.url().slice(0, 70)}`)
    else report.errors.push(`[${tag}] REQFAIL ${r.url()} ${r.failure?.errorText}`)
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function shot(page, name) {
  const p = `${OUT}${name}.png`
  await page.screenshot({ path: p })
  report.shots.push(name)
}

async function open(browser, { width, height, mobile = false, tag = 'd' }) {
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile })
  watch(page, tag)
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.evaluate(() => document.fonts.ready)
  await sleep(3600) // loader + intro
  return page
}

async function wheelTo(page, total, step = 500, waitMs = 240) {
  const n = Math.max(1, Math.round(total / step))
  for (let i = 0; i < n; i++) {
    await page.mouse.wheel({ deltaY: step })
    await sleep(waitMs)
  }
  await sleep(600)
}

async function gotoSection(page, id, extra = 0) {
  const ok = await page.evaluate(
    (sel, off) => {
      const el = document.getElementById(sel)
      if (!el) return false
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + off)
      window.dispatchEvent(new Event('scroll'))
      return true
    },
    id,
    extra,
  )
  await sleep(1400)
  return ok
}

async function check(page, label) {
  const r = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    canvas: document.querySelectorAll('canvas').length,
    scrollH: document.documentElement.scrollHeight,
  }))
  report.checks.push(`${label}: overflowX=${r.overflow}px canvases=${r.canvas} height=${r.scrollH}`)
  return r
}

async function desktop(browser) {
  const page = await open(browser, { width: 1440, height: 900, tag: 'desktop' })
  await shot(page, 'd01-hero-top')
  await check(page, 'desktop hero')

  await wheelTo(page, 1500)
  await shot(page, 'd02-hero-cook')
  await wheelTo(page, 1600)
  await shot(page, 'd03-hero-food')

  await gotoSection(page, 'kategoriyalar', -40)
  await shot(page, 'd04-categories')
  await page.hover('[data-cat="sushi"]')
  await sleep(1400)
  await shot(page, 'd05-category-hover')

  await page.evaluate(() => {
    document.getElementById('menu')?.scrollIntoView()
  })
  await sleep(1400)
  await shot(page, 'd06-menu')

  // Kategoriya tab'ini bosish
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#menu button'))
    const t = btns.find((b) => b.textContent.includes('LAVASH'))
    t?.click()
  })
  await sleep(1500)
  await shot(page, 'd07-menu-lavash')

  // Mahsulot modali + telefon orqali buyurtma
  await page.evaluate(() => {
    document.querySelector('#menu [data-card]')?.click()
  })
  await sleep(1500)
  await shot(page, 'd08-product-modal')

  const telInModal = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a[href^="tel:"]'))
    return a.length ? a[a.length - 1].getAttribute('href') : null
  })
  report.checks.push(`modal tel link: ${telInModal}`)
  await page.keyboard.press('Escape')
  await sleep(900)

  // Savat/checkout butunlay o'chirilgan bo'lishi kerak
  const leftovers = await page.evaluate(() => ({
    savatText: (document.body.innerText.match(/SAVAT|Savat/g) || []).length,
    cartLs: localStorage.getItem('abi-cart-v1') ? 1 : 0,
    telTotal: document.querySelectorAll('a[href^="tel:"]').length,
  }))
  report.checks.push(
    `no cart UI: savatText=${leftovers.savatText} cartLS=${leftovers.cartLs} telLinks=${leftovers.telTotal}`,
  )

  const navPhone = await page.evaluate(
    () => document.querySelector('header')?.innerText.includes('90 754 07 97') ?? false,
  )
  report.checks.push(`navbar phone visible: ${navPhone}`)

  // Qolgan bo'limlar
  for (const [i, id] of [
    ['d11-cinema-a', 'cinema'],
    ['d12-signature', 'signature'],
    ['d13-promotions', 'aksiyalar'],
    ['d14-instagram', 'instagram'],
    ['d15-contact', 'qayerdamiz'],
  ]) {
    const extra = i === 'd11-cinema-a' ? 1300 : -40
    await gotoSection(page, id, extra)
    await shot(page, i)
  }
  const mapLive = await page.evaluate(() => {
    const f = document.querySelector('#qayerdamiz iframe')
    return f ? (f.src || '').slice(0, 42) : 'none'
  })
  report.checks.push(`contact map iframe: ${mapLive}`)
  await gotoSection(page, 'qayerdamiz', 900)
  await shot(page, 'd16-footer')
  await check(page, 'desktop bottom')
  await page.close()
}

async function mobile(browser) {
  const page = await open(browser, { width: 390, height: 844, mobile: true, tag: 'mobile' })
  await shot(page, 'm01-hero')
  await check(page, 'mobile hero')
  await wheelTo(page, 1400, 350)
  await shot(page, 'm02-hero-mid')
  await gotoSection(page, 'menu', -20)
  await shot(page, 'm03-categories')
  await page.evaluate(() => document.getElementById('menu')?.scrollIntoView())
  await sleep(1300)
  await shot(page, 'm04-menu')
  await page.evaluate(() => {
    document.querySelector('#menu [data-card]')?.click()
  })
  await sleep(1400)
  await shot(page, 'm05-product-sheet')
  const mTel = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a[href^="tel:"]'))
    return a.length ? a[a.length - 1].getAttribute('href') : null
  })
  report.checks.push(`mobile modal tel: ${mTel}`)
  await page.keyboard.press('Escape')
  await sleep(800)
  await page.evaluate(() => document.getElementById('qayerdamiz')?.scrollIntoView())
  await sleep(1300)
  await shot(page, 'm06-contact')
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('header button')).find((x) => x.getAttribute('aria-label') === 'Menyu')
    b?.click()
  })
  await sleep(1200)
  await shot(page, 'm07-nav')
  await check(page, 'mobile bottom')
  await page.close()
}

async function overflow(browser) {
  const page = await browser.newPage()
  watch(page, 'overflow')
  for (const w of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewport({ width: w, height: 900, isMobile: w < 768, hasTouch: w < 768 })
    await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
    await sleep(2600)
    const r = await page.evaluate(async () => {
      const out = []
      const ids = ['hero', 'menu', 'cinema', 'signature', 'aksiyalar', 'instagram', 'qayerdamiz']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY)
        window.dispatchEvent(new Event('scroll'))
        await new Promise((r) => setTimeout(r, 320))
        out.push({
          id,
          over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        })
      }
      return out
    })
    const worst = Math.max(...r.map((x) => x.over))
    report.checks.push(`width ${w}px: maxOverflowX=${worst}px ` + r.map((x) => `${x.id}:${x.over}`).join(' '))
    if (worst > 1) await page.screenshot({ path: `${OUT}overflow-${w}.png` })
  }
  await page.close()
}

async function reduced(browser) {
  const page = await browser.newPage()
  watch(page, 'reduced')
  await page.setViewport({ width: 1280, height: 800 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 })
  await sleep(3200)
  await shot(page, 'r01-reduced-hero')
  await check(page, 'reduced motion')
  await page.evaluate(() => document.getElementById('menu')?.scrollIntoView())
  await sleep(1200)
  await shot(page, 'r02-reduced-menu')
  await page.close()
}

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

try {
  if (which === 'desktop' || which === 'all') await desktop(browser)
  if (which === 'mobile' || which === 'all') await mobile(browser)
  if (which === 'overflow' || which === 'all') await overflow(browser)
  if (which === 'reduced' || which === 'all') await reduced(browser)
} finally {
  await browser.close()
}

console.log('=== CHECKS ===')
report.checks.forEach((c) => console.log(c))
console.log('=== SHOTS (' + report.shots.length + ') ===')
console.log(report.shots.join(', '))
console.log('=== ERRORS (' + report.errors.length + ') ===')
console.log([...new Set(report.errors)].slice(0, 40).join('\n'))
console.log('=== WARNINGS (' + report.warnings.length + ') ===')
console.log([...new Set(report.warnings)].slice(0, 20).join('\n'))
