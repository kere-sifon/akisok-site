import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "images", "placeholders");

const keys = [
  { name: "hero-ibom-coast", w: 960, h: 1280, shift: 0 },
  { name: "seaport-ibaka", w: 1200, h: 800, shift: 7 },
  { name: "anaang-language", w: 1200, h: 800, shift: 13 },
  { name: "ekpe-society", w: 1200, h: 800, shift: 19 },
  { name: "calabar-uyo-highway", w: 1200, h: 800, shift: 29 },
];

function clamp(value) {
  return Math.max(0, Math.min(255, value | 0));
}

function writePpm(filePath, width, height, shift) {
  const header = Buffer.from(`P6\n${width} ${height}\n255\n`);
  const body = Buffer.alloc(width * height * 3);
  let i = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const diagonal = x + y + shift * 9;
      const hatch = ((diagonal / 12) | 0) % 2;
      const band = ((diagonal / 48) | 0) % 2;
      const noise = ((x * 13 + y * 7 + shift * 17) % 11) - 5;

      const base = band ? [16, 38, 28] : [22, 52, 40];
      const sage = hatch ? [143, 168, 138] : [90, 120, 100];
      const mix = hatch ? 0.22 : 0.1;

      body[i] = clamp(base[0] * (1 - mix) + sage[0] * mix + noise);
      body[i + 1] = clamp(base[1] * (1 - mix) + sage[1] * mix + noise);
      body[i + 2] = clamp(base[2] * (1 - mix) + sage[2] * mix + noise);
      i += 3;
    }
  }

  fs.writeFileSync(filePath, Buffer.concat([header, body]));
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const key of keys) {
  const ppm = path.join(OUT_DIR, `${key.name}.ppm`);
  const jpg = path.join(OUT_DIR, `${key.name}.jpg`);
  writePpm(ppm, key.w, key.h, key.shift);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "70", ppm, "--out", jpg]);
  fs.unlinkSync(ppm);
  console.log(`wrote ${path.relative(process.cwd(), jpg)}`);
}
