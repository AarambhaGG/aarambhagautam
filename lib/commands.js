import { NEOFETCH_OUTPUT, ABOUT_TEXT, SKILLS_TEXT, PROJECTS_TEXT, CONTACT_TEXT, SOCIALS_TEXT, QUOTE_TEXT } from './constants';

export const commands = {
  help: {
    description: 'Show available commands',
    execute: () => `
<div class="help-output">
<strong>Available Commands:</strong>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  <span class="text-cyan-400">help</span>        - Show this help message
  <span class="text-cyan-400">about</span>       - Learn about me
  <span class="text-cyan-400">skills</span>      - View my technical skills
  <span class="text-cyan-400">projects</span>    - See my projects
  <span class="text-cyan-400">contact</span>     - Get my contact information
  <span class="text-cyan-400">socials</span>     - View my social links
  <span class="text-cyan-400">quote</span>       - Display my favorite quote
  <span class="text-cyan-400">clear</span>       - Clear the terminal
  
  
<span class="text-teal-400">Tip: Use TAB for auto-completion!</span>
</div>
    `
  },

  neofetch: {
    description: 'Display system info',
    execute: () => NEOFETCH_OUTPUT
  },

  about: {
    description: 'Learn about me',
    execute: () => ABOUT_TEXT
  },

  skills: {
    description: 'View technical skills',
    execute: () => SKILLS_TEXT
  },

  projects: {
    description: 'See my projects',
    execute: () => PROJECTS_TEXT
  },

  contact: {
    description: 'Get contact information',
    execute: () => CONTACT_TEXT
  },

  socials: {
    description: 'View social links',
    execute: () => SOCIALS_TEXT
  },

  quote: {
    description: 'Display favorite quote',
    execute: () => QUOTE_TEXT
  },

  clear: {
    description: 'Clear the terminal',
    execute: () => '__CLEAR__'
  },

  history: {
    description: 'Show command history',
    execute: (_, history) => {
      if (!history || history.length === 0) {
        return '<span class="text-gray-400">No command history yet.</span>';
      }
      return `<div class="history-output">
<strong>Command History:</strong>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${history.map((cmd, i) => `  <span class="text-gray-400">${i + 1}.</span> ${cmd}`).join('\n')}
</div>`;
    }
  }
};
