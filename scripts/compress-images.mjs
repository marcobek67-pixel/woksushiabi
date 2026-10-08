/**
 * public/images dagi PNG larni JPEG ga o'tkazadi (canvas orqali, tashqi bog'liqsiz).
 * Ishlatish: node scripts/compress-images.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer-core'

const SRC = new URL('../public/images', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const MAX_W = 1400
const QUALITY = 0.72

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.goto('about:blank')

mkdirSync(SRC, { recursive: true })
let before = 0
let after = 0

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.png'))) {
  const path = join(SRC, file)
  const buf = readFileSync(path)
  before += buf.length
  const dataUrl = `data:image/png;base64,${buf.toString('base64')}`
  const out = await page.evaluate(
    async (src, maxW, q) => {
      const img = new Image()
      img.src = src
      await img.decode()
      const scale = Math.min(1, maxW / img.naturalWidth)
      const w = Math.round(img.naturalWidth * scale)
      const h = Math.round(img.naturalHeight * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)
      return canvas.toDataURL('image/jpeg', q)
    },
    dataUrl,
    MAX_W,
    QUALITY,
  )
  const jpeg = Buffer.from(out.split(',')[1], 'base64')
  const target = path.replace(/\.png$/, '.jpg')
  writeFileSync(target, jpeg)
  after += jpeg.length
  console.log(`${file} ${(buf.length / 1048576).toFixed(2)}MB -> ${file.replace(/\.png$/, '.jpg')} ${(jpeg.length / 1024).toFixed(0)}KB`)
}

await browser.close()
console.log(`TOTAL ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`)
