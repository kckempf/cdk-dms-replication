#!/usr/bin/env node
// Queries the DMS API for orderable replication instance classes and
// regenerates the ReplicationInstanceClass enum in src/enums.ts.
//
// Usage:
//   node scripts/sync-instance-classes.js
//   AWS_REGION=eu-west-1 node scripts/sync-instance-classes.js
//
// Requires: AWS CLI configured with dms:DescribeOrderableReplicationInstances
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REGION = process.env.AWS_REGION ?? 'us-east-1';
const ENUMS_FILE = path.resolve(__dirname, '..', 'src', 'enums.ts');

// Known family descriptions and preferred display order.
// Unknown families (if AWS adds a new one) appear at the end, alphabetically.
const FAMILY_META = {
  't3':  'T3 — burstable general purpose',
  'c5':  'C5 — compute optimized (previous generation)',
  'c6i': 'C6i — compute optimized (current generation)',
  'c7i': 'C7i — compute optimized (latest generation)',
  'x7i': 'X7i — compute optimized (latest generation, larger sizes)',
  'r5':  'R5 — memory optimized (previous generation)',
  'r6i': 'R6i — memory optimized (current generation)',
  'r7i': 'R7i — memory optimized (latest generation)',
};

const SIZE_ORDER = [
  'micro', 'small', 'medium', 'large',
  'xlarge', '2xlarge', '4xlarge', '8xlarge', '9xlarge',
  '12xlarge', '16xlarge', '18xlarge', '24xlarge', '32xlarge', '48xlarge',
];

// ---------------------------------------------------------------------------
// AWS API
// ---------------------------------------------------------------------------

function fetchInstanceClasses() {
  const all = new Set();
  let marker;

  do {
    const markerArg = marker ? `--marker "${marker}"` : '';
    const raw = execSync(
      `aws dms describe-orderable-replication-instances --region ${REGION} ${markerArg} --output json`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] },
    );
    const page = JSON.parse(raw);
    for (const inst of page.OrderableReplicationInstances ?? []) {
      all.add(inst.ReplicationInstanceClass);
    }
    marker = page.Marker || undefined;
  } while (marker);

  return [...all];
}

// ---------------------------------------------------------------------------
// Enum generation
// ---------------------------------------------------------------------------

function getFamily(cls) {
  return cls.replace('dms.', '').split('.')[0];
}

function sizeRank(cls) {
  const size = cls.split('.').pop();
  const idx = SIZE_ORDER.indexOf(size);
  return idx === -1 ? 999 : idx;
}

function toEnumKey(cls) {
  return cls.replace('dms.', '').replace(/\./g, '_').toUpperCase();
}

function buildEnumBody(classes) {
  // Group by family
  const grouped = {};
  for (const cls of classes) {
    const f = getFamily(cls);
    (grouped[f] = grouped[f] ?? []).push(cls);
  }

  // Sort within each family by size
  for (const f of Object.keys(grouped)) {
    grouped[f].sort((a, b) => sizeRank(a) - sizeRank(b));
  }

  // Sort families: known order first, then unknowns alphabetically
  const knownOrder = Object.keys(FAMILY_META);
  const families = Object.keys(grouped).sort((a, b) => {
    const ai = knownOrder.indexOf(a);
    const bi = knownOrder.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  const lines = [];
  for (let i = 0; i < families.length; i++) {
    const f = families[i];
    const comment = FAMILY_META[f] ?? `${f.toUpperCase()} instances`;
    lines.push(`  // ${comment}`);
    for (const cls of grouped[f]) {
      lines.push(`  ${toEnumKey(cls)} = '${cls}',`);
    }
    if (i < families.length - 1) lines.push('');
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// File update
// ---------------------------------------------------------------------------

function replaceEnum(filePath, enumBody) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Find the line with 'export enum ReplicationInstanceClass {'
  let enumLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^export enum ReplicationInstanceClass\s*\{/.test(lines[i])) {
      enumLineIdx = i;
      break;
    }
  }
  if (enumLineIdx === -1) throw new Error('Cannot find ReplicationInstanceClass enum');

  // Walk back to include the preceding JSDoc comment block
  let blockStart = enumLineIdx;
  for (let i = enumLineIdx - 1; i >= 0; i--) {
    const t = lines[i].trim();
    if (t.startsWith('/**') || t.startsWith('*') || t === '*/') {
      blockStart = i;
    } else {
      break;
    }
  }

  // Walk forward, counting braces, to find the closing '}'
  let depth = 0;
  let blockEnd = -1;
  for (let i = enumLineIdx; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    if (depth === 0) { blockEnd = i; break; }
  }
  if (blockEnd === -1) throw new Error('Cannot find closing brace of ReplicationInstanceClass enum');

  const newBlock = [
    '/**',
    ' * DMS replication instance class.',
    ' *',
    ' * @see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.Types.html',
    ' */',
    'export enum ReplicationInstanceClass {',
    enumBody,
    '}',
  ].join('\n');

  const before = lines.slice(0, blockStart).join('\n');
  const after  = lines.slice(blockEnd + 1).join('\n');
  return (before ? before + '\n' : '') + newBlock + (after ? '\n' + after : '');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  process.stdout.write(`Querying DMS orderable instances in ${REGION}... `);

  let classes;
  try {
    classes = fetchInstanceClasses();
  } catch (err) {
    console.error('\nFailed to call DMS API:', err.message);
    console.error('Ensure AWS credentials are configured with dms:DescribeOrderableReplicationInstances.');
    process.exit(1);
  }
  console.log(`${classes.length} classes found.`);

  const enumBody   = buildEnumBody(classes);
  const newContent = replaceEnum(ENUMS_FILE, enumBody);
  const oldContent = fs.readFileSync(ENUMS_FILE, 'utf-8');

  if (newContent === oldContent) {
    console.log('✓ ReplicationInstanceClass is already up to date.');
    return;
  }

  // Report the diff before writing
  const oldClasses = new Set([...oldContent.matchAll(/'(dms\.[^']+)'/g)].map(m => m[1]));
  const newClasses = new Set(classes);
  const added   = classes.filter(c => !oldClasses.has(c));
  const removed = [...oldClasses].filter(c => !newClasses.has(c));
  if (added.length)   console.log('  + Added:  ', added.join(', '));
  if (removed.length) console.log('  - Removed:', removed.join(', '));

  fs.writeFileSync(ENUMS_FILE, newContent);
  console.log('✓ Updated src/enums.ts');
}

main();
