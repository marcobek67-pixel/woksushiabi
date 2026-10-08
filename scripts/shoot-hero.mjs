import puppeteer from 'puppeteer-core'

const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = new URL('../shots/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  protocolTimeout: 180000,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const errs = new Set()
page.on('pageerror', (e) => {
  if (!errs.has(e.message)) {
    errs.add(e.message)
    console.log('PAGEERROR:', e.message, '\n', e.stack?.split('\n').slice(0, 4).join('\n'))
  }
})
await page.goto('http://127.0.0.1:5177/', { waitUntil: 'networkidle2', timeout: 60000 })
await sleep(5000)
await page.screenshot({ path: `${OUT}h00-top.png` })
for (let i = 1; i <= 6; i++) {
  await page.mouse.wheel({ deltaY: 700 })
  await sleep(1400)
  await page.screenshot({ path: `${OUT}h0${i}-scroll.png` })
}
const state = await page.evaluate(() => ({
  y: Math.round(window.scrollY),
  canvases: document.querySelectorAll('canvas').length,
}))
console.log('state', JSON.stringify(state), 'errors', errs.size)
await browser.close()
