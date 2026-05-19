/**
 * build.js — Obfuscate JS di dalam index.html
 * Output: dist/index.html (versi terenkripsi)
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const SRC  = path.join(__dirname, 'index.html');
const DIST = path.join(__dirname, 'dist');
const OUT  = path.join(DIST, 'index.html');

// Pastikan folder dist ada
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

let html = fs.readFileSync(SRC, 'utf8');

// ── 1. Hapus semua komentar HTML <!-- ... --> kecuali DOCTYPE
html = html.replace(/<!--(?!\s*DOCTYPE)[^]*?-->/g, '');

// ── 2. Ekstrak semua blok <script> tanpa atribut src (inline script)
//    Kita skip script yang punya src= (CDN) karena itu bukan kode kita
const scriptRegex = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;

let match;
const scripts = [];
while ((match = scriptRegex.exec(html)) !== null) {
    scripts.push({
        full  : match[0],
        code  : match[1],
        index : match.index
    });
}

console.log(`✅ Ditemukan ${scripts.length} inline script block(s)`);

// ── 3. Obfuscate setiap inline script
for (const s of scripts) {
    if (!s.code.trim()) continue;

    // Skip blok tailwind.config (konfigurasi JSON, bukan logic)
    if (s.code.includes('tailwind.config')) {
        console.log('   ⏭  Skip tailwind.config block');
        continue;
    }

    const obfResult = JavaScriptObfuscator.obfuscate(s.code, {
        compact                           : true,
        controlFlowFlattening             : true,
        controlFlowFlatteningThreshold    : 0.5,
        deadCodeInjection                 : true,
        deadCodeInjectionThreshold        : 0.3,
        debugProtection                   : false,
        disableConsoleOutput              : false, // biarkan console.error tetap ada
        identifierNamesGenerator          : 'hexadecimal',
        renameGlobals                     : false,  // false agar fungsi HTML onclick masih bisa dipanggil
        selfDefending                     : true,
        stringArray                       : true,
        stringArrayCallsTransform         : true,
        stringArrayEncoding               : ['base64'],
        stringArrayIndexShift             : true,
        stringArrayRotate                 : true,
        stringArrayShuffle                : true,
        stringArrayWrappersCount          : 2,
        stringArrayWrappersChainedCalls   : true,
        stringArrayThreshold              : 0.75,
        transformObjectKeys               : false,
        unicodeEscapeSequence             : false
    });

    const obfCode = obfResult.getObfuscatedCode();
    html = html.replace(s.full, `<script>${obfCode}</script>`);
    console.log(`   🔒 Obfuscated block (${s.code.trim().length} chars → ${obfCode.length} chars)`);
}

// ── 4. Minify HTML whitespace (tanpa library, manual trim baris)
html = html
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .join('\n');

// ── 5. Tulis output
fs.writeFileSync(OUT, html, 'utf8');

const srcSize  = fs.statSync(SRC).size;
const distSize = fs.statSync(OUT).size;

console.log(`\n🎉 Build selesai!`);
console.log(`   📄 Input  : ${SRC} (${(srcSize/1024).toFixed(1)} KB)`);
console.log(`   📦 Output : ${OUT} (${(distSize/1024).toFixed(1)} KB)`);
console.log(`   🔐 Status : JS berhasil diobfuscate & HTML diminify`);
