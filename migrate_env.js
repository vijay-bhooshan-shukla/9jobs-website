const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const vars = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (match) {
        vars[match[1]] = match[2].trim();
    }
});

// Add custom ones
vars['NEXT_PUBLIC_API_BASE_URL'] = 'https://9jobs.co';

for (const [key, value] of Object.entries(vars)) {
    console.log(`Adding ${key}...`);
    ['production', 'preview', 'development'].forEach(env => {
        // Use shell: true on Windows for npx
        const result = spawnSync('npx', ['vercel', 'env', 'add', key, env, '--value', value, '--yes', '--force'], { stdio: 'inherit', shell: true });
        if (result.status !== 0) {
            console.error(`Failed to add ${key} to ${env}`);
        }
    });
}
