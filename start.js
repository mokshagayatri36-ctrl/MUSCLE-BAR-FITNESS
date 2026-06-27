import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[35m%s\x1b[0m', '==================================================');
console.log('\x1b[36m%s\x1b[0m', '  Muscle Bar Fitness Centre Gym Management Website');
console.log('\x1b[35m%s\x1b[0m', '==================================================');

// Helper to pipe child process logs with prefix
function logProcess(child, name, colorCode) {
  child.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      console.log(`\x1b[${colorCode}m[${name}]\x1b[0m ${line}`);
    });
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      console.error(`\x1b[31m[${name} ERROR]\x1b[0m ${line}`);
    });
  });

  child.on('close', (code) => {
    console.log(`\x1b[31m[${name}]\x1b[0m Process exited with code ${code}`);
  });
}

// 1. Start Backend on Port 5000
console.log('\x1b[33m%s\x1b[0m', 'Starting Express Backend API...');
const backendProcess = spawn('npm.cmd', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  env: { ...process.env, PORT: '5000' },
  shell: true
});
logProcess(backendProcess, 'BACKEND', '32'); // Green

// 2. Start Frontend on Port 3000
console.log('\x1b[33m%s\x1b[0m', 'Starting Next.js Frontend Dev Server...');
const frontendProcess = spawn('npm.cmd', ['run', 'dev', '--', '-p', '3000'], {
  cwd: path.join(__dirname, 'frontend'),
  shell: true
});
logProcess(frontendProcess, 'FRONTEND', '34'); // Blue


// Print Local Access URLs
setTimeout(() => {
  console.log('\n\x1b[32m%s\x1b[0m', '==================================================');
  console.log('\x1b[32m%s\x1b[0m', '  Muscle Bar Gym Application successfully started!');
  console.log('\x1b[32m%s\x1b[0m', '==================================================');
  console.log('\x1b[36m%s\x1b[0m', '  Frontend URL:     http://localhost:3000');
  console.log('\x1b[36m%s\x1b[0m', '  Backend URL:      http://localhost:5000');
  console.log('\x1b[36m%s\x1b[0m', '  Member Portal:    http://localhost:3000/member');
  console.log('\x1b[36m%s\x1b[0m', '  Admin Portal:     http://localhost:3000/admin');
  console.log('\x1b[32m%s\x1b[0m', '==================================================\n');
}, 5000);

// Terminate both when main process ends
process.on('SIGINT', () => {
  backendProcess.kill();
  frontendProcess.kill();
  process.exit();
});
