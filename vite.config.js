// vite.config.js
//
// This config adds a tiny dev-server middleware (`/api/run`) that compiles
// and runs code on YOUR machine using whatever compilers/interpreters you
// already have installed (g++, python, javac).
//
// No API keys. No internet. Nothing leaves your computer.
//
// Requirements (one-time):
//   - Python:  install Python 3 — `python --version` should work
//   - C++:     install g++ — `g++ --version` should work
//              (Windows: install MinGW or WSL; Mac: `xcode-select --install`)
//   - Java:    install JDK — `javac --version` should work
//
// You don't need ALL of them — just the languages you actually use.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

// ---------- helpers ----------

// Try a list of binaries (e.g. ["python", "python3"]). Pick the first that exists.
function tryCommands(commands) {
  for (const cmd of commands) {
    const probe = spawnSync(cmd, ['--version']);
    if (probe.ok) return cmd;
  }
  return commands[0]; // fall back; will error clearly when used
}
function spawnSync(cmd, args) {
  try {
    const { execSync } = require('child_process');
    execSync(`${cmd} ${args.join(' ')}`, { stdio: 'ignore' });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

// Run a program with stdin and capture stdout/stderr. Hard timeout in ms.
function execProgram(cmd, args, stdin, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args);
    let stdout = '', stderr = '';
    let timedOut = false;
    const killTimer = setTimeout(() => {
      timedOut = true;
      try { proc.kill('SIGKILL'); } catch {}
    }, timeoutMs);

    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('error', (e) => {
      clearTimeout(killTimer);
      resolve({
        error:
          e.code === 'ENOENT'
            ? `Command not found: ${cmd}. Install it and make sure it's on your PATH.`
            : `Spawn error: ${e.message}`,
      });
    });
    proc.on('close', (code) => {
      clearTimeout(killTimer);
      if (timedOut) {
        resolve({ error: `Time limit exceeded (>${timeoutMs}ms). Possible infinite loop.` });
      } else {
        resolve({ stdout, stderr, exitCode: code });
      }
    });

    try {
      if (stdin) proc.stdin.write(stdin);
      proc.stdin.end();
    } catch {}
  });
}

// ---------- per-language runners ----------

async function runCode(lang, code, stdin) {
  const dir = mkdtempSync(path.join(tmpdir(), 'pq-'));

  try {
    if (lang === 'py') {
      const file = path.join(dir, 'main.py');
      writeFileSync(file, code);
      const py = process.platform === 'win32' ? 'python' : 'python3';
      return await execProgram(py, [file], stdin);
    }

    if (lang === 'cpp') {
      const src = path.join(dir, 'main.cpp');
      const bin = path.join(dir, process.platform === 'win32' ? 'main.exe' : 'main');
      writeFileSync(src, code);
      const compile = await execProgram('g++', ['-std=c++17', '-O2', '-o', bin, src], '', 10000);
      if (compile.error) return compile;
      if (compile.exitCode !== 0) {
        return { error: 'COMPILE ERROR\n' + (compile.stderr || compile.stdout) };
      }
      return await execProgram(bin, [], stdin);
    }

    if (lang === 'java') {
      const src = path.join(dir, 'Main.java');
      writeFileSync(src, code);
      const compile = await execProgram('javac', [src], '', 15000);
      if (compile.error) return compile;
      if (compile.exitCode !== 0) {
        return { error: 'COMPILE ERROR\n' + (compile.stderr || compile.stdout) };
      }
      return await execProgram('java', ['-cp', dir, 'Main'], stdin);
    }

    return { error: 'Unsupported language: ' + lang };
  } finally {
    try { rmSync(dir, { recursive: true, force: true }); } catch {}
  }
}

// ---------- the Vite plugin itself ----------

const codeRunner = () => ({
  name: 'placement-quest-code-runner',
  configureServer(server) {
    server.middlewares.use('/api/run', async (req, res, next) => {
      if (req.method !== 'POST') return next();

      // Read JSON body
      let body = '';
      for await (const chunk of req) body += chunk;
      let payload;
      try { payload = JSON.parse(body); }
      catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
        return;
      }

      const { language, code, stdin } = payload;
      if (!language || typeof code !== 'string') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Missing language or code' }));
        return;
      }

      const result = await runCode(language, code, stdin || '');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    });
  },
});

// ---------- export ----------

export default defineConfig({
  plugins: [react(), codeRunner()],
});