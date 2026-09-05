const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const DEBOUNCE_MS = 5000; // 5 seconds debounce
const WATCH_DIR = path.join(__dirname, '..');
const IGNORED_DIRS = ['.git', '.next', 'node_modules', 'scripts', '.gemini', '.turbo'];
const IGNORED_FILES = ['package-lock.json', 'tsconfig.tsbuildinfo', '.DS_Store'];

console.log('🚀 Starting Millennium Games Auto-Sync & Dev Server with Enhanced Memory (4GB)...');

let devServer = null;
let isShuttingDown = false;

function startDevServer() {
  if (isShuttingDown) return;

  const nodeOptions = process.env.NODE_OPTIONS || '--max-old-space-size=4096';
  devServer = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: nodeOptions
    }
  });

  devServer.on('close', (code) => {
    if (!isShuttingDown) {
      console.log(`\n⚠️ Next.js dev server exited (code ${code}). Auto-restarting in 1s for continuous development...`);
      setTimeout(startDevServer, 1000);
    }
  });

  devServer.on('error', (err) => {
    console.error('❌ Next.js dev server error:', err);
  });
}

startDevServer();

// Git pushing logic
let debounceTimeout = null;
let isPushing = false;
let pendingChanges = false;

function runGitSync() {
  if (isPushing) {
    pendingChanges = true;
    return;
  }

  isPushing = true;
  pendingChanges = false;
  console.log('\n🔄 [Auto-Sync] Changes detected. Starting sync to GitHub...');

  exec('git add .', { cwd: WATCH_DIR }, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ [Auto-Sync] git add failed:', err);
      isPushing = false;
      return;
    }

    // Check if there are actual staged changes to commit
    exec('git status --porcelain', { cwd: WATCH_DIR }, (err, statusOutput) => {
      if (err) {
        console.error('❌ [Auto-Sync] git status failed:', err);
        isPushing = false;
        return;
      }

      if (!statusOutput.trim()) {
        console.log('ℹ️ [Auto-Sync] No changes to commit.');
        isPushing = false;
        if (pendingChanges) {
          setTimeout(runGitSync, 1000);
        }
        return;
      }

      const commitMsg = `auto: update website (${new Date().toLocaleString()})`;
      exec(`git commit -m "${commitMsg}"`, { cwd: WATCH_DIR }, (err, stdout, stderr) => {
        if (err) {
          console.error('❌ [Auto-Sync] git commit failed:', err);
          isPushing = false;
          return;
        }
        console.log('📝 [Auto-Sync] Committed local changes.');

        exec('git push origin main', { cwd: WATCH_DIR }, (err, stdout, stderr) => {
          isPushing = false;
          if (err) {
            console.error('❌ [Auto-Sync] git push failed:', stderr || err);
          } else {
            console.log('✅ [Auto-Sync] Successfully pushed changes to GitHub (Vercel deployment triggered)!');
          }

          if (pendingChanges) {
            setTimeout(runGitSync, 1000);
          }
        });
      });
    });
  });
}

function triggerSync() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(runGitSync, DEBOUNCE_MS);
}

// Watcher logic
function watchDirectory(dir) {
  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;

      // Check if filename path contains ignored directories or files
      const normalizedPath = filename.replace(/\\/g, '/');
      const parts = normalizedPath.split('/');
      const isIgnored = parts.some(part => IGNORED_DIRS.includes(part)) || 
                        IGNORED_FILES.includes(path.basename(filename));

      if (!isIgnored) {
        triggerSync();
      }
    });
  } catch (error) {
    console.error('❌ [Auto-Sync] Watcher error:', error);
  }
}

watchDirectory(WATCH_DIR);
console.log(`👀 [Auto-Sync] Watching files in ${WATCH_DIR} for auto-push...`);

// Cleanup on exit
process.on('SIGINT', () => {
  isShuttingDown = true;
  if (devServer) devServer.kill();
  process.exit(0);
});
process.on('SIGTERM', () => {
  isShuttingDown = true;
  if (devServer) devServer.kill();
  process.exit(0);
});
