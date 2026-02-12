import { commands } from './commands';

// File system structure
const fileSystem = {
  '~': {
    type: 'dir',
    contents: ['projects/', 'about.txt', 'skills.md', 'contact.json'],
    files: {
      'about.txt': 'about',
      'skills.md': 'skills', 
      'contact.json': 'contact'
    },
    dirs: ['projects']
  },
  '~/projects': {
    type: 'dir',
    contents: ['careercraft/', 'codementor/'],
    files: {},
    dirs: ['careercraft', 'codementor']
  },
  '~/projects/careercraft': {
    type: 'dir',
    contents: ['README.md'],
    files: {
      'README.md': 'careercraft_readme'
    },
    dirs: []
  },
  '~/projects/codementor': {
    type: 'dir',
    contents: ['README.md'],
    files: {
      'README.md': 'codementor_readme'
    },
    dirs: []
  }
};

// Special file contents
const fileContents = {
  careercraft_readme: `<span class="text-cyan-400"><strong>CareerCraft - AI Career Gap Analyzer</strong>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Analyzes resumes against job descriptions using AI

Tech Stack: Django, Next.js, PostgreSQL, Redis, Celery, OpenAI/Gemini
GitHub: <a href="https://github.com/AarambhaGG/_CodeForImpact_LCCsMeiters_CareerCraft_" target="_blank">github.com/AarambhaGG/_CodeForImpact_LCCsMeiters_CareerCraft_</a>

Type 'open 1' to view on GitHub</span>`,
  codementor_readme: `<span class="text-cyan-400"><strong>CodeMentor - AI Code Explanation Tool</strong>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Explains code snippets with Nepali references for beginners

Tech Stack: Django, Next.js, Google Gemini AI
GitHub: <a href="https://github.com/Butwal-Hacks/Double-A-Batteries" target="_blank">github.com/Butwal-Hacks/Double-A-Batteries</a>

Type 'open 2' to view on GitHub</span>`
};

export function processCommand(input, history = [], currentDir = '~') {
  const trimmed = input.trim().toLowerCase();

  // Handle empty command
  if (!trimmed) {
    return '';
  }

  // Get current directory info
  const dirInfo = fileSystem[currentDir] || fileSystem['~'];

  // Handle 'open' command
  if (trimmed.startsWith('open ')) {
    const num = parseInt(trimmed.split(' ')[1]);
    if (num === 1) {
      if (typeof window !== 'undefined') {
        window.open('https://github.com/AarambhaGG/_CodeForImpact_LCCsMeisters_CareerCraft_', '_blank');
      }
      return '<span class="success">✓ Opening CareerCraft project...</span>';
    } else if (num === 2) {
      if (typeof window !== 'undefined') {
        window.open('https://github.com/Butwal-Hacks/Double-A-Batteries', '_blank');
      }
      return '<span class="success">✓ Opening CodeMentor project...</span>';
    } else {
      return '<span class="error">Invalid project number. Use: open 1 or open 2</span>';
    }
  }

  // Easter eggs
  if (trimmed === 'sudo rm -rf /' || trimmed === 'sudo rm -rf /*') {
    return '<span class="error">Nice try! 😄</span>';
  }

  if (trimmed === 'exit' || trimmed === 'quit') {
    return '<span class="text-yellow-400">There\'s no escape from the terminal... Try \'clear\' instead 😉</span>';
  }

  if (trimmed === 'vim' || trimmed === 'nvim' || trimmed === 'nano') {
    return '<span class="text-purple-400">How to exit vim? Just kidding, it\'s 2026. Use VSCode! 💙</span>';
  }

  // LS command - directory aware
  if (trimmed === 'ls' || trimmed === 'dir') {
    return `<span class="text-cyan-400">${dirInfo.contents.join('  ')}</span>`;
  }

  if (trimmed === 'ls -la' || trimmed === 'ls -l' || trimmed === 'ls -a') {
    const listing = dirInfo.contents.map(item => {
      if (item.endsWith('/')) {
        return `drwxr-xr-x  nayan nayan  4096  ${item}`;
      }
      return `-rw-r--r--  nayan nayan   256  ${item}`;
    }).join('\n');
    return `<span class="text-cyan-400">${listing}</span>`;
  }

  // CD command - real directory navigation
  if (trimmed.startsWith('cd ') || trimmed === 'cd') {
    const arg = trimmed === 'cd' ? '~' : trimmed.slice(3).trim();
    
    // cd ~ or cd with no args - go home
    if (arg === '~' || arg === '' || arg === '/home/nayan' || arg === '/home/nayan/portfolio') {
      return { newDir: '~', output: '' };
    }
    
    // cd .. - go up
    if (arg === '..' || arg === '../') {
      if (currentDir === '~') {
        return '<span class="text-yellow-400">⚠ Already at home. Can\'t go higher!</span>';
      }
      // Go up one level
      const parts = currentDir.split('/');
      parts.pop();
      const newDir = parts.join('/') || '~';
      return { newDir, output: '' };
    }

    // cd to a directory
    const targetDir = arg.replace(/\/$/, ''); // Remove trailing slash
    
    // Check if it's in current directory's subdirs
    if (dirInfo.dirs.includes(targetDir)) {
      const newDir = currentDir === '~' ? `~/${targetDir}` : `${currentDir}/${targetDir}`;
      if (fileSystem[newDir]) {
        return { newDir, output: '' };
      }
    }

    // Check for absolute-ish paths from ~
    if (arg.startsWith('~/')) {
      const newDir = arg.replace(/\/$/, '');
      if (fileSystem[newDir]) {
        return { newDir, output: '' };
      }
    }

    return `<span class="error">cd: no such file or directory: ${arg}</span>`;
  }

  // Cat command - file aware
  if (trimmed.startsWith('cat ')) {
    const fileName = trimmed.slice(4).trim();
    
    // Check if file exists in current directory
    if (dirInfo.files[fileName]) {
      const cmdKey = dirInfo.files[fileName];
      if (commands[cmdKey]) {
        return commands[cmdKey].execute();
      }
      if (fileContents[cmdKey]) {
        return fileContents[cmdKey];
      }
    }
    
    return `<span class="error">cat: ${fileName}: No such file or directory</span>`;
  }

  // PWD command - directory aware
  if (trimmed === 'pwd') {
    const fullPath = currentDir.replace('~', '/home/nayan/portfolio');
    return `<span class="text-cyan-400">${fullPath}</span>`;
  }

  if (trimmed === 'whoami') {
    return '<span class="text-cyan-400">nayan (Aarambha Gautam)</span>';
  }

  if (trimmed === 'date') {
    return `<span class="text-cyan-400">${new Date().toLocaleString()}</span>`;
  }

  if (trimmed === 'echo hello' || trimmed === 'echo "hello"') {
    return '<span class="text-cyan-400">Hello! 👋</span>';
  }

  // Generic echo support
  if (trimmed.startsWith('echo ')) {
    const text = input.trim().slice(5).replace(/^["']|["']$/g, '');
    return `<span class="text-cyan-400">${text}</span>`;
  }

  // More easter eggs
  if (trimmed === 'man' || trimmed.startsWith('man ')) {
    return '<span class="text-yellow-400">No manual entry. Try \'help\' instead!</span>';
  }

  if (trimmed === 'mkdir' || trimmed.startsWith('mkdir ')) {
    return '<span class="text-yellow-400">mkdir: Permission denied. This is a read-only portfolio 📁</span>';
  }

  if (trimmed === 'touch' || trimmed.startsWith('touch ')) {
    return '<span class="text-yellow-400">touch: Permission denied. This is a read-only portfolio 📁</span>';
  }

  if (trimmed === 'rm' || trimmed.startsWith('rm ')) {
    return '<span class="text-yellow-400">rm: Permission denied. You can\'t delete my hard work! 😤</span>';
  }

  if (trimmed === 'sudo' || trimmed.startsWith('sudo ')) {
    return '<span class="error">nayan is not in the sudoers file. This incident will be reported. 👀</span>';
  }

  if (trimmed === 'git status') {
    return '<span class="text-cyan-400">On branch main\nYour branch is up to date.\nnothing to commit, working tree clean ✨</span>';
  }

  if (trimmed === 'npm install' || trimmed === 'npm i') {
    return '<span class="text-cyan-400">added 0 packages in 0.001s\n\n(this portfolio runs on pure talent, no dependencies needed 😎)</span>';
  }

  if (trimmed === 'htop' || trimmed === 'top') {
    return '<span class="text-cyan-400">CPU: 100% dedicated to being awesome\nMEM: Storing countless hours of learning</span>';
  }

  // Handle normal commands
  const command = commands[trimmed];
  
  if (command) {
    return command.execute(input, history);
  }

  // Unknown command
  return `<span class="error">command not found: ${input}</span>
Type '<span class="text-cyan-400">help</span>' for available commands.`;
}
