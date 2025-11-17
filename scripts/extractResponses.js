const fs = require('fs');
const path = require('path');

const inputPath = path.resolve('data1.txt');
const outputDir = path.resolve('src', 'data');
const outputPath = path.join(outputDir, 'extracted_responses.json');

if (!fs.existsSync(inputPath)) {
  console.error('Input file not found:', inputPath);
  process.exit(1);
}

const content = fs.readFileSync(inputPath, 'utf8');
const marker = '//response';
let idx = 0;
const results = [];

while (true) {
  const m = content.indexOf(marker, idx);
  if (m === -1) break;
  const start = content.indexOf('{', m);
  if (start === -1) break;

  // find matching closing brace for the JSON object
  let i = start;
  let depth = 0;
  let inString = false;
  let prevChar = '';
  for (; i < content.length; i++) {
    const ch = content[i];
    if (ch === '"' && prevChar !== '\\') inString = !inString;
    if (!inString) {
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    prevChar = ch;
  }

  const jsonStr = content.slice(start, i);
  try {
    const obj = JSON.parse(jsonStr);
    const entry = {
      status: obj.status,
      message: obj.message,
      data: {
        request: obj.data ? obj.data.request : null,
        visuals_sugg: obj.data ? obj.data.visuals_sugg : null,
      },
    };
    results.push(entry);
  } catch (err) {
    console.error('Failed to parse JSON at index', start, err.message);
  }

  idx = i;
}

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
console.log('Wrote', results.length, 'responses to', outputPath);
