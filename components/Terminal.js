'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { processCommand } from '@/lib/commandProcessor';
import { handleTabCompletion } from '@/lib/tabCompletion';
import { BANNER, MOBILE_MESSAGE } from '@/lib/constants';

export default function Terminal() {
  const [output, setOutput] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentDir, setCurrentDir] = useState('~');
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const bottomRef = useRef(null);

  // Initialize on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show banner on load
    setOutput([{ type: 'banner', content: BANNER }]);

    // Load command history from localStorage
    try {
      const saved = localStorage.getItem('terminalCommandHistory');
      if (saved) {
        setCommandHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load command history:', e);
    }

    // Focus input
    inputRef.current?.focus();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      // Also scroll the output container
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  }, [output]);

  // Save command history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('terminalCommandHistory', JSON.stringify(commandHistory.slice(-50)));
    } catch (e) {
      console.error('Failed to save command history:', e);
    }
  }, [commandHistory]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const trimmedCommand = currentCommand.trim();
    if (!trimmedCommand) {
      // Just add empty prompt line
      setOutput(prev => [...prev, { type: 'command', content: '', dir: currentDir }]);
      return;
    }

    // Add command to output with current directory
    setOutput(prev => [...prev, { type: 'command', content: trimmedCommand, dir: currentDir }]);

    // Check for clear command
    if (trimmedCommand.toLowerCase() === 'clear') {
      setOutput([]);
      setCurrentCommand('');
      setHistoryIndex(-1);
      return;
    }

    // Process command with current directory
    const result = processCommand(trimmedCommand, commandHistory, currentDir);
    
    // Handle directory change
    if (result && result.newDir !== undefined) {
      setCurrentDir(result.newDir);
      if (result.output) {
        setOutput(prev => [...prev, { type: 'result', content: result.output }]);
      }
    } else if (result && result !== '__CLEAR__') {
      setOutput(prev => [...prev, { type: 'result', content: result }]);
    }

    // Update history (don't add duplicates in a row)
    if (commandHistory[commandHistory.length - 1] !== trimmedCommand) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
    }
    
    setHistoryIndex(-1);
    setCurrentCommand('');
  }, [currentCommand, commandHistory, currentDir]);

  const handleKeyDown = useCallback((e) => {
    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      
      if (!currentCommand.trim()) return;
      
      const completed = handleTabCompletion(currentCommand, currentDir);
      
      if (typeof completed === 'string' && completed !== currentCommand.trim().toLowerCase()) {
        // Single match - auto complete
        setCurrentCommand(completed);
      } else if (Array.isArray(completed) && completed.length > 0) {
        // Multiple matches - show suggestions
        setOutput(prev => [...prev, 
          { type: 'command', content: currentCommand, dir: currentDir },
          { type: 'suggestion', content: completed.join('  ') }
        ]);
      }
      return;
    }

    // Command history navigation (Up arrow)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
      return;
    }

    // Command history navigation (Down arrow)
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
      return;
    }

    // Clear screen (Ctrl+L)
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setOutput([]);
      return;
    }

    // Cancel command (Ctrl+C)
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setOutput(prev => [...prev, 
        { type: 'command', content: currentCommand + '^C' }
      ]);
      setCurrentCommand('');
      setHistoryIndex(-1);
      return;
    }
  }, [currentCommand, commandHistory, historyIndex, currentDir]);

  // Focus input when clicking anywhere on terminal
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Mobile message
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-[#0a0e14]">
        <div dangerouslySetInnerHTML={{ __html: MOBILE_MESSAGE }} />
      </div>
    );
  }

  return (
    <div className="terminal" onClick={handleTerminalClick}>
      <div className="terminal-output" ref={outputRef}>
        {output.map((line, index) => (
          <div key={index} className="output-line">
            {line.type === 'command' && (
              <div className="command-line">
                <span className="prompt">nayan@portfolio</span>
                <span className="prompt-separator">:</span>
                <span className="prompt-path">{line.dir || '~'}</span>
                <span className="prompt-symbol">$ </span>
                <span className="command-text">{line.content}</span>
              </div>
            )}
            {line.type === 'result' && (
              <div 
                className="result-content"
                dangerouslySetInnerHTML={{ __html: line.content }} 
              />
            )}
            {line.type === 'banner' && (
              <pre className="banner" dangerouslySetInnerHTML={{ __html: line.content }} />
            )}
            {line.type === 'suggestion' && (
              <div className="suggestion-line">{line.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="terminal-input">
        <span className="prompt">nayan@portfolio</span>
        <span className="prompt-separator">:</span>
        <span className="prompt-path">{currentDir}</span>
        <span className="prompt-symbol">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
        <span className="cursor" aria-hidden="true"></span>
      </form>
    </div>
  );
}
