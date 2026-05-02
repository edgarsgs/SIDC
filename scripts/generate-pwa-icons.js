const fs = require('fs');
const zlib = require('zlib');
function crc32(buf) {
  const table = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    return c >>> 0;
  });

  let crc = 0xffffffff;
  for (const b of buf) {
    crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function png(width, height, color) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rows = Buffer.alloc((1 + width * 4) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (1 + width * 4);
    rows[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      const px = rowStart + 1 + x * 4;
      rows[px] = color[0];
      rows[px + 1] = color[1];
      rows[px + 2] = color[2];
      rows[px + 3] = color[3];
    }
  }

  const idat = zlib.deflateSync(rows);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

fs.writeFileSync('assets/icon-192.png', png(192, 192, [0, 113, 227, 255]));
fs.writeFileSync('assets/icon-512.png', png(512, 512, [0, 113, 227, 255]));
console.log('Created icons: assets/icon-192.png, assets/icon-512.png');
