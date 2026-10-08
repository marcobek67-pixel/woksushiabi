import puppeteer from 'puppeteer-core'

const EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  protocolTimeout: 120000,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
const seen = new Set()
page.on('pageerror', (e) => {
  const key = e.message
  if (!seen.has(key)) {
    seen.add(key)
    console.log('--- PAGEERROR:', key)
    console.log(e.stack)
  }
})
page.on('console', (m) => {
  if (m.type() === 'error' && !seen.has(m.text())) {
    seen.add(m.text())
    console.log('--- CONSOLE ERROR:', m.text())
  }
})
await page.goto('http://127.0.0.1:5177/', { waitUntil: 'networkidle2', timeout: 60000 })
await new Promise((r) => setTimeout(r, 6000))
for (let i = 0; i < 8; i++) {
  await page.mouse.wheel({ deltaY: 500 })
  await new Promise((r) => setTimeout(r, 260))
}
await new Promise((r) => setTimeout(r, 1500))
const canvasState = await page.evaluate(() => {
  const c = document.querySelector('canvas')
  return { canvases: document.querySelectorAll('canvas').length, w: c?.width, h: c?.height }
})
console.log('after wheel:', JSON.stringify(canvasState))
const info = await page.evaluate(() => {
  const c = document.querySelector('canvas')
  const gl = c && (c.getContext('webgl2') || c.getContext('webgl'))
  return {
    canvas: c ? { w: c.width, h: c.height, cssW: c.clientWidth, cssH: c.clientHeight } : null,
    glLost: gl ? gl.isContextLost() : 'no-ctx',
    heroProgress: window.__abiDebug ? window.__abiDebug() : 'n/a',
  }
})
console.log(JSON.stringify(info, null, 2))
await new Promise((r) => setTimeout(r, 4000))
await page.screenshot({ path: new URL('../shots/debug-hero.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
await browser.close()
