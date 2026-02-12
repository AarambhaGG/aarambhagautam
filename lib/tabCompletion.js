import { commands } from './commands';

// File system structure for tab completion
const fileSystem = {
  '~': {
    files: ['about.txt', 'skills.md', 'contact.json'],
    dirs: ['projects']
  },
  '~/projects': {
    files: [],
    dirs: ['careercraft', 'codementor']
  },
  '~/projects/careercraft': {
    files: ['README.md'],
    dirs: []
  },
  '~/projects/codementor': {
    files: ['README.md'],
    dirs: []
  }
};

export function handleTabCompletion(input, currentDir = '~') {
  const trimmed = input.trim().toLowerCase();
  
  if (!trimmed) return input;

  const dirInfo = fileSystem[currentDir] || fileSystem['~'];

  // Handle 'cd ' completion
  if (trimmed.startsWith('cd ')) {
    const partial = trimmed.slice(3).trim();
    const matches = dirInfo.dirs.filter(d => d.startsWith(partial));
    
    if (matches.length === 1) {
      return 'cd ' + matches[0];
    } else if (matches.length > 1) {
      return matches;
    }
    return input;
  }

  // Handle 'cat ' completion
  if (trimmed.startsWith('cat ')) {
    const partial = trimmed.slice(4).trim();
    const matches = dirInfo.files.filter(f => f.toLowerCase().startsWith(partial));
    
    if (matches.length === 1) {
      return 'cat ' + matches[0];
    } else if (matches.length > 1) {
      return matches;
    }
    return input;
  }

  // Handle 'ls ' completion (for ls -la, etc.)
  if (trimmed.startsWith('ls ')) {
    const partial = trimmed.slice(3).trim();
    const lsOptions = ['-l', '-la', '-a'];
    const matches = lsOptions.filter(o => o.startsWith(partial));
    
    if (matches.length === 1) {
      return 'ls ' + matches[0];
    } else if (matches.length > 1) {
      return matches;
    }
    return input;
  }

  // Handle base command completion
  const commandNames = Object.keys(commands);
  // Add extra commands that aren't in the commands object
  const extraCommands = ['cd', 'cat', 'ls', 'pwd', 'whoami', 'date', 'echo', 'open'];
  const allCommands = [...new Set([...commandNames, ...extraCommands])];
  
  const matches = allCommands.filter(cmd => cmd.startsWith(trimmed));

  if (matches.length === 1) {
    return matches[0];
  } else if (matches.length > 1) {
    // Find common prefix among matches
    let commonPrefix = matches[0];
    for (let i = 1; i < matches.length; i++) {
      while (!matches[i].startsWith(commonPrefix)) {
        commonPrefix = commonPrefix.slice(0, -1);
      }
    }
    if (commonPrefix.length > trimmed.length) {
      return commonPrefix;
    }
    return matches;
  }

  return input;
}
