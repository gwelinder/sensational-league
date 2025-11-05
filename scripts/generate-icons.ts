import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const publicDir = path.resolve(process.cwd(), 'public')
const srcLogo = path.join(publicDir, 'SENSATIONAL-LEAGUE-PRIMARY-MARK-WHITE.png')

async function ensureDir(p: string) {
  await fs.promises.mkdir(path.dirname(p), { recursive: true })
}

async function makeIcon({ size, out, logoWidth, bg = '#232324' }: { size: number; out: string; logoWidth: number; bg?: string }) {
  const canvas = sharp({ create: { width: size, height: size, channels: 4, background: bg } })
  const logo = await sharp(srcLogo).resize({ width: logoWidth, fit: 'inside' }).toBuffer()
  const composed = await canvas
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
  await ensureDir(out)
  await fs.promises.writeFile(out, composed)
  console.log(`Wrote ${path.relative(process.cwd(), out)}`)
}

async function run() {
  // App icons (tight crop)
  await makeIcon({ size: 192, out: path.join(publicDir, 'icon-192.png'), logoWidth: 150 })
  await makeIcon({ size: 512, out: path.join(publicDir, 'icon-512.png'), logoWidth: 420 })

  // Maskable icons (extra padding for safe area)
  await makeIcon({ size: 192, out: path.join(publicDir, 'icon-192-maskable.png'), logoWidth: 120 })
  await makeIcon({ size: 512, out: path.join(publicDir, 'icon-512-maskable.png'), logoWidth: 320 })
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

