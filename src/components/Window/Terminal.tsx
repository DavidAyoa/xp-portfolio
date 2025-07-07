import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useConnection from '../../hooks/useConnection';
import terminalData from '../../data/terminal-data.json';

interface TerminalEntry {
  command: string;
  output?: string;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const commandInputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { restart: restartConnection } = useConnection();

  const availableCommands = [
    'help', 
    'clear', 
    'dir', 
    'ipconfig', 
    'systeminfo', 
    'Get-Disk', 
    'sudo', 
    'rm'
  ];

  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = () => {
    if (!currentCommand.trim()) return;

    const command = currentCommand.trim();
    const newCommandHistory = [...commandHistory, command];
    setCommandHistory(newCommandHistory);
    setHistoryIndex(newCommandHistory.length);

    let output = '';

    // Handle command execution logic
    switch (command) {
      case 'help':
        output = 'Available commands:\n' + availableCommands.join('\t');
        break;
      case 'clear':
        setHistory([]);
        setCurrentCommand('');
        return;
      case 'systeminfo':
        output = terminalData.systeminfo.result;
        break;
      case 'Get-Disk':
        output = terminalData.diskinfo.result;
        break;
      case 'dir':
        output = terminalData.dir.result;
        break;
      case 'ipconfig':
        output = terminalData.ipconfig.result;
        break;
      case 'sudo':
      case 'rm':
        output = terminalData.hint.result;
        break;
      case 'sudo rm -rf /':
        output = terminalData.meme.result;
        setCurrentCommand('');
        restartConnection();
        setTimeout(() => {
          navigate('/');
        }, 2000);
        setHistory(prev => [...prev, { command, output }]);
        return;
      default:
        output = `${command}` + terminalData.error;
    }

    setHistory(prev => [...prev, { command, output }]);
    setCurrentCommand('');
  };

  const focusInput = () => {
    commandInputRef.current?.focus();
  };

  const autoComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = currentCommand.trim();
    if (!input) return;

    const matches = availableCommands.filter(cmd => cmd.startsWith(input));

    if (matches.length === 1) {
      setCurrentCommand(matches[0]);
    } else if (matches.length > 1) {
      const possibilities = matches.join(', ');
      setHistory(prev => [...prev, { command: input, output: possibilities }]);
    }
  };

  const formatOutput = (output: string) => {
    return output
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&emsp;')
      .replace(/\f/g, '&ensp;');
  };

  const getPreviousCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentCommand(commandHistory[newIndex]);
    }
  };

  const getNextCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentCommand(commandHistory[newIndex]);
    } else {
      setHistoryIndex(commandHistory.length);
      setCurrentCommand('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        executeCommand();
        break;
      case 'Tab':
        autoComplete(e);
        break;
      case 'ArrowUp':
        getPreviousCommand(e);
        break;
      case 'ArrowDown':
        getNextCommand(e);
        break;
      default:
        break;
    }
  };

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="relative right-0 h-full flex">
      <div
        onClick={focusInput}
        ref={terminalContainerRef}
        className="w-full h-full pt-6 mt-0.5 bg-black overflow-y-scroll outline-none resize-none px-1 font-trebuchet-pixel text-sm hover:cursor-text"
      >
        {history.map((entry, index) => (
          <div key={index}>
            <div className="flex items-center">
              <span className="text-white font-bold mr-1 text-sm">C:\&gt;</span>
              <span className="text-white">{entry.command}</span>
            </div>
            {entry.output && (
              <div 
                className="text-white" 
                dangerouslySetInnerHTML={{ __html: formatOutput(entry.output) }} 
              />
            )}
          </div>
        ))}
        <div className="flex items-center w-full">
          <span className="text-white font-bold mr-1 text-sm">C:\&gt;</span>
          <input
            ref={commandInputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-black text-white outline-none font-trebuchet-pixel text-sm w-11/12"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;