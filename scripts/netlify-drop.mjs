/**
 * Netlify Drop — anonim joylash (akkountsiz), keyin claim havolasini olish.
 * Ishlatish: node scripts/netlify-drop.mjs
 */
import puppeteer from 'puppeteer-core'

const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const ZIP = new URL('../dist.zip', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 900 })

const urls = []
page.on('response', (r) => {
  const u = r.url()
  if (/netlify\.app|app\.netlify\.com\/(signup|claim|sites)/.test(u) && !urls.includes(u)) urls.push(u)
})

console.log('opening drop page...')
await page.goto('https://app.netlify.com/drop', { waitUntil: 'domcontentloaded', timeout: 90000 })

let input = null
for (let i = 0; i < 40 && !input; i++) {
  await new Promise((r) => setTimeout(r, 2000))
  input = await page.$('input[type="file"]')
}
console.log('file input:', input ? 'found' : 'NOT FOUND')
if (!input) {
  await page.screenshot({ path: 'shots/netlify-drop-page.png' })
  console.log('page saved to shots/netlify-drop-page.png')
  console.log('page text:', (await page.evaluate(() => document.body.innerText.slice(0, 500))).replace(/\n+/g, ' | '))
  await browser.close()
  process.exit(1)
}

console.log('uploading zip...')
await input.uploadFile(ZIP)

// Deploy tugaguncha kutamiz — sahifada netlify.app havolasi paydo bo'ladi
let siteUrl = null
for (let i = 0; i < 60; i++) {
  await new Promise((r) => setTimeout(r, 3000))
  const html = await page.evaluate(() => document.documentElement.innerHTML).catch(() => '')
  const m = html.match(/https:\/\/[a-z0-9][a-z0-9-]*\.netlify\.app\//)
  if (m) {
    siteUrl = m[0]
    break
  }
  const txt = await page.evaluate(() => document.body.innerText).catch(() => '')
  if (/is live|your site|deploy succe/i.test(txt) && i > 10) {
    siteUrl = (txt.match(/https:\/\/[a-z0-9][a-z0-9-]*\.netlify\.app\//) || [])[0] || null
    if (siteUrl) break
  }
}

await page.screenshot({ path: 'shots/netlify-drop-result.png' })
const finalUrl = page.url()
const text = await page.evaluate(() => document.body.innerText.slice(0, 900)).catch(() => '')

console.log('FINAL URL:', finalUrl)
console.log('SITE URL:', siteUrl || '(aniqlanmadi)')
const htmlMatches = await page
  .evaluate(() => (document.documentElement.innerHTML.match(/https:\/\/[a-z0-9][a-z0-9-]*\.netlify\.app[^"'<\s]*/g) || []).slice(0, 10))
  .catch(() => [])
console.log('HTML MATCHES:', [...new Set(htmlMatches)].join('\n'))
const btns = await page.evaluate(() => Array.from(document.querySelectorAll('button')).map((b) => b.innerText.trim()).filter(Boolean).slice(0, 15)).catch(() => [])
console.log('BUTTONS:', btns.join(' | '))
console.log('PAGE TEXT:', text.replace(/\n+/g, ' | '))

// Sahifa ichidagi havolalardan netlify.app linkini ham qidirib ko'ramiz
const links = await page
  .evaluate(() => Array.from(document.querySelectorAll('a')).map((a) => a.href).filter((h) => /\.netlify\.app|signup|claim/.test(h)))
  .catch(() => [])
console.log('PAGE LINKS:', [...new Set(links)].slice(0, 15).join('\n'))

await browser.close()
