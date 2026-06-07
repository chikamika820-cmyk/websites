const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

// Each scene as a self-contained HTML string
const scenes = [
  {
    name: 'scene1-product',
    title: 'Szene 1 – Produktaufnahme',
    html: `<!DOCTYPE html><html><body style="margin:0;background:#1a1208;width:540px;height:960px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:Georgia,serif;overflow:hidden;">
<div style="position:relative;display:flex;align-items:center;justify-content:center;">
${bagSVG(260)}
<div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(ellipse,rgba(181,153,89,0.3) 0%,transparent 70%);filter:blur(25px);"></div>
</div>
<div style="margin-top:48px;font-size:18px;letter-spacing:10px;color:#b59959;text-transform:uppercase;">Louis Vuitton</div>
<div style="position:absolute;bottom:40px;font-size:11px;letter-spacing:4px;color:rgba(181,153,89,0.4);text-transform:uppercase;">Scene 1 · 0–3 s</div>
</body></html>`
  },
  {
    name: 'scene2-zoom',
    title: 'Szene 2 – Zoom auf Details',
    html: `<!DOCTYPE html><html><body style="margin:0;background:#0f0b05;width:540px;height:960px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;font-family:Georgia,serif;">
<div style="transform:scale(1.4) translate(-30px,40px);">
${bagSVG(280)}
</div>
<div style="position:absolute;bottom:120px;left:50px;border-left:2px solid #b59959;padding-left:14px;color:#b59959;font-size:13px;letter-spacing:3px;text-transform:uppercase;line-height:1.9;">
  Monogram Canvas<br>
  <span style="font-size:10px;opacity:0.7;">Iconic Pattern · Savoir-Faire</span>
</div>
<div style="position:absolute;bottom:40px;font-size:11px;letter-spacing:4px;color:rgba(181,153,89,0.4);text-transform:uppercase;">Scene 2 · 3–7 s</div>
</body></html>`
  },
  {
    name: 'scene3-text',
    title: 'Szene 3 – Textanimation',
    html: `<!DOCTYPE html><html><body style="margin:0;background:linear-gradient(160deg,#0a0800 0%,#1e1508 60%,#0a0800 100%);width:540px;height:960px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:Georgia,serif;overflow:hidden;position:relative;">
<div style="position:absolute;font-size:240px;font-weight:bold;color:#b59959;opacity:0.06;letter-spacing:-8px;user-select:none;pointer-events:none;">LV</div>
<div style="width:160px;height:1px;background:#b59959;margin-bottom:28px;"></div>
<div style="font-size:38px;letter-spacing:6px;color:#f0e6cc;text-transform:uppercase;margin-bottom:14px;">Timeless.</div>
<div style="font-size:38px;letter-spacing:6px;color:#f0e6cc;text-transform:uppercase;margin-bottom:14px;">Iconic.</div>
<div style="font-size:50px;letter-spacing:6px;color:#b59959;text-transform:uppercase;font-style:italic;">Yours.</div>
<div style="width:160px;height:1px;background:#b59959;margin-top:28px;"></div>
<div style="position:absolute;bottom:40px;font-size:11px;letter-spacing:4px;color:rgba(181,153,89,0.4);text-transform:uppercase;">Scene 3 · 7–11 s</div>
</body></html>`
  },
  {
    name: 'scene4-cta',
    title: 'Szene 4 – Call-To-Action',
    html: `<!DOCTYPE html><html><body style="margin:0;background:#0a0800;width:540px;height:960px;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:Georgia,serif;overflow:hidden;position:relative;">
<div style="transform:scale(0.5);margin-bottom:-40px;">
${bagSVG(260)}
</div>
<div style="text-align:center;margin-bottom:28px;">
  <div style="font-size:13px;letter-spacing:7px;color:#b59959;text-transform:uppercase;margin-bottom:10px;">New Collection 2025</div>
  <div style="font-size:26px;letter-spacing:3px;color:#f0e6cc;text-transform:uppercase;">Monogram Canvas Bag</div>
</div>
<div style="background:#b59959;color:#0a0800;font-size:13px;letter-spacing:5px;text-transform:uppercase;padding:13px 42px;margin-bottom:20px;">Shop Now</div>
<div style="font-size:12px;letter-spacing:2px;color:rgba(181,153,89,0.6);">lv.com · @LouisVuitton</div>
<div style="position:absolute;bottom:40px;font-size:13px;letter-spacing:4px;color:#b59959;text-transform:uppercase;">↑ Swipe Up</div>
<div style="position:absolute;bottom:18px;font-size:11px;letter-spacing:4px;color:rgba(181,153,89,0.35);text-transform:uppercase;">Scene 4 · 11–15 s</div>
</body></html>`
  }
];

function bagSVG(size) {
  const s = size;
  const scale = s / 260;
  const w = Math.round(260 * scale);
  const h = Math.round(280 * scale);
  const rows = [0,1,2,3].flatMap(row =>
    [0,1,2,3].map(col =>
      `<text x="${Math.round((46+col*50)*scale)}" y="${Math.round((108+row*40)*scale)}" fill="#b59959" fill-opacity="0.35" font-size="${Math.round(14*scale)}" font-family="Georgia,serif" font-weight="bold" transform="rotate(-15,${Math.round((46+col*50)*scale)},${Math.round((108+row*40)*scale)})">LV</text>`
    )
  ).join('');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M${Math.round(90*scale)} ${Math.round(80*scale)} Q${Math.round(90*scale)} ${Math.round(30*scale)} ${Math.round(130*scale)} ${Math.round(30*scale)} Q${Math.round(170*scale)} ${Math.round(30*scale)} ${Math.round(170*scale)} ${Math.round(80*scale)}" stroke="#b59959" stroke-width="${Math.round(10*scale)}" stroke-linecap="round" fill="none"/>
    <rect x="${Math.round(30*scale)}" y="${Math.round(75*scale)}" width="${Math.round(200*scale)}" height="${Math.round(160*scale)}" rx="${Math.round(14*scale)}" fill="#2a1f0a"/>
    <rect x="${Math.round(30*scale)}" y="${Math.round(75*scale)}" width="${Math.round(200*scale)}" height="${Math.round(160*scale)}" rx="${Math.round(14*scale)}" stroke="#b59959" stroke-width="2"/>
    ${rows}
    <rect x="${Math.round(112*scale)}" y="${Math.round(145*scale)}" width="${Math.round(36*scale)}" height="${Math.round(22*scale)}" rx="${Math.round(4*scale)}" fill="#b59959"/>
    <text x="${Math.round(122*scale)}" y="${Math.round(161*scale)}" fill="#0a0800" font-size="${Math.round(10*scale)}" font-family="Georgia,serif" font-weight="bold">LV</text>
    <line x1="${Math.round(50*scale)}" y1="${Math.round(235*scale)}" x2="${Math.round(210*scale)}" y2="${Math.round(235*scale)}" stroke="#b59959" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="4 4"/>
  </svg>`;
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const outDir = path.join(__dirname, '../out/stills');
  fs.mkdirSync(outDir, { recursive: true });

  for (const scene of scenes) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 540, height: 960 });
    await page.setContent(scene.html, { waitUntil: 'networkidle' });
    const outPath = path.join(outDir, `${scene.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    await page.close();
    console.log(`✓ ${scene.title} → ${outPath}`);
  }

  await browser.close();
  console.log('Done.');
})();
