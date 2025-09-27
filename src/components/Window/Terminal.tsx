import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface TerminalProps {
  onClose?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Microsoft Windows XP [Version 5.1.2600]',
    '(C) Copyright 1985-2001 Microsoft Corp.',
    '',
    'C:\\Documents and Settings\\CodePoets>'
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const args = cmd.trim().split(' ');
    const newHistory = [...history, `C:\\Documents and Settings\\CodePoets>${cmd}`];

    switch (command) {
      case '':
        break;
      case 'help':
        newHistory.push(
          'For more information on a specific command, type HELP command-name',
          '',
          'ATTRIB      Displays or changes file attributes.',
          'CD          Displays the name of or changes the current directory.',
          'CHDIR       Displays the name of or changes the current directory.',
          'CLS         Clears the screen.',
          'CONTACT     Opens contact details in Notepad.',
          'COPY        Copies one or more files to another location.',
          'DATE        Displays or sets the date.',
          'DEL         Deletes one or more files.',
          'DIR         Displays a list of files and subdirectories in a directory.',
          'ECHO        Displays messages, or turns command-echoing on or off.',
          'EXIT        Quits the CMD.EXE program (command interpreter).',
          'FIND        Searches for a text string in a file or files.',
          'HELP        Provides Help information for Windows commands.',
          'MD          Creates a directory.',
          'MKDIR       Creates a directory.',
          'MORE        Displays output one screen at a time.',
          'MOVE        Moves files and renames files and directories.',
          'PATH        Displays or sets a search path for executable files.',
          'PING        Tests network connectivity.',
          'RD          Removes a directory.',
          'REN         Renames a file or files.',
          'RENAME      Renames a file or files.',
          'TIME        Displays or sets the system time.',
          'TREE        Graphically displays the directory structure.',
          'TYPE        Displays the contents of a text file.',
          'VER         Displays the Windows version.',
          'VOL         Displays a disk volume label and serial number.',
          'WHOAMI      Displays current username.',
          'ABOUT       About CodePoets portfolio.'
        );
        break;
      case 'dir':
        newHistory.push(
          ' Volume in drive C has no label.',
          ' Volume Serial Number is 1234-ABCD',
          '',
          ' Directory of C:\\Documents and Settings\\CodePoets',
          '',
          '24/09/2025  03:30 PM    <DIR>          .',
          '24/09/2025  03:30 PM    <DIR>          ..',
          '24/09/2025  02:15 PM    <DIR>          Desktop',
          '24/09/2025  02:15 PM    <DIR>          My Documents',
          '24/09/2025  02:15 PM           256,128 portfolio.html',
          '24/09/2025  02:15 PM            15,872 readme.txt',
          '24/09/2025  02:15 PM             4,096 contact.txt',
          '               3 File(s)        275,096 bytes',
          '               4 Dir(s)  15,234,567,890 bytes free'
        );
        break;
      case 'cls':
      case 'clear':
        setHistory([
          'Microsoft Windows XP [Version 5.1.2600]',
          '(C) Copyright 1985-2001 Microsoft Corp.',
          ''
        ]);
        return;
      case 'ver':
        newHistory.push('Microsoft Windows XP [Version 5.1.2600]');
        break;
      case 'date':
        newHistory.push(
          `The current date is: ${new Date().toLocaleDateString()}`,
          'Enter the new date: (mm-dd-yy) [Press Enter to keep current date]'
        );
        break;
      case 'time':
        newHistory.push(
          `The current time is: ${new Date().toLocaleTimeString()}`,
          'Enter the new time: [Press Enter to keep current time]'
        );
        break;
      case 'vol':
        newHistory.push(
          ' Volume in drive C has no label.',
          ' Volume Serial Number is 1234-ABCD'
        );
        break;
      case 'whoami':
        newHistory.push('CODEPOETS\\CodePoetsTeam');
        break;
      case 'tree':
        newHistory.push(
          'Folder PATH listing for volume Local Disk',
          'Volume serial number is 1234-ABCD',
          'C:\\DOCUMENTS AND SETTINGS\\CODEPOETS',
          '├───Desktop',
          '├───My Documents',
          '│   ├───Projects',
          '│   └───Portfolio',
          '└───Application Data'
        );
        break;
      case 'ping localhost':
      case 'ping 127.0.0.1':
        newHistory.push(
          'Pinging 127.0.0.1 with 32 bytes of data:',
          '',
          'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
          'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
          'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
          'Reply from 127.0.0.1: bytes=32 time<1ms TTL=128',
          '',
          'Ping statistics for 127.0.0.1:',
          '    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)',
          'Approximate round trip times in milli-seconds:',
          '    Minimum = 0ms, Maximum = 0ms, Average = 0ms'
        );
        break;
      case 'ping codepoets.dev':
        newHistory.push(
          'Pinging codepoets.dev [192.168.1.100] with 32 bytes of data:',
          '',
          'Reply from 192.168.1.100: bytes=32 time=45ms TTL=64',
          'Reply from 192.168.1.100: bytes=32 time=43ms TTL=64',
          'Reply from 192.168.1.100: bytes=32 time=44ms TTL=64',
          'Reply from 192.168.1.100: bytes=32 time=42ms TTL=64',
          '',
          'Ping statistics for 192.168.1.100:',
          '    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)',
          'Approximate round trip times in milli-seconds:',
          '    Minimum = 42ms, Maximum = 45ms, Average = 43ms'
        );
        break;
      case 'type contact.txt':
      case 'contact':
        newHistory.push('Opening contact details in Notepad...');
        newHistory.push(
          '',
          '=== CodePoets Contact Details ===',
          '',
          'Company: CodePoets',
          'Email: hello@codepoets.dev',
          'Website: https://codepoets.dev',
          'Phone: +1 (555) 123-4567',
          '',
          'Services:',
          '- Web Development',
          '- UI/UX Design',
          '- Portfolio Websites',
          '- Custom Applications',
          '',
          'Location: Digital Nomads',
          'Timezone: UTC+0',
          '',
          'Social Media:',
          '- GitHub: @codepoets',
          '- Twitter: @codepoets_dev',
          '- LinkedIn: CodePoets',
          '',
          'Note: We create digital poetry through code!'
        );
        break;
      case 'about':
        newHistory.push(
          'CodePoets XP Portfolio - Windows XP Experience',
          '',
          'Built with React & TypeScript',
          'Authentic Windows XP interface recreation',
          'Featuring working applications and authentic styling',
          '',
          'Contact: hello@codepoets.dev',
          'Website: https://codepoets.dev',
          '',
          'This is a demonstration of our frontend development skills',
          'showcasing attention to detail and authentic user experiences.'
        );
        break;
      case 'echo hello':
        newHistory.push('hello');
        break;
      case 'echo off':
        newHistory.push('Echo is OFF');
        break;
      case 'echo on':
        newHistory.push('Echo is ON');
        break;
      case 'cd..':
      case 'cd ..':
        newHistory.push('C:\\Documents and Settings>');
        break;
      case 'cd desktop':
        newHistory.push('C:\\Documents and Settings\\CodePoets\\Desktop>');
        break;
      case 'md test':
      case 'mkdir test':
        newHistory.push('Directory created successfully.');
        break;
      case 'path':
        newHistory.push(
          'PATH=C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;',
          'C:\\Program Files\\Internet Explorer;C:\\Program Files\\CodePoets'
        );
        break;
      case 'exit':
        newHistory.push('Goodbye! Closing terminal...');
        setTimeout(() => onClose?.(), 1500);
        break;
      default:
        if (command.startsWith('echo ')) {
          newHistory.push(cmd.substring(5));
        } else if (command.startsWith('ping ')) {
          const target = args[1] || 'unknown';
          newHistory.push(`Ping request could not find host ${target}. Please check the name and try again.`);
        } else if (command.startsWith('cd ')) {
          const dir = args[1] || '';
          newHistory.push(`The system cannot find the path specified: ${dir}`);
        } else {
          newHistory.push(`'${cmd}' is not recognized as an internal or external command,`);
          newHistory.push('operable program or batch file.');
        }
        break;
    }

    newHistory.push('');
    newHistory.push('C:\\Documents and Settings\\CodePoets>');
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || input === '') {
      setCommandHistory(prev => [...prev, input]);
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="h-full bg-black text-gray-300 font-mono text-xs overflow-hidden flex flex-col">
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="flex-1 px-2 py-1 overflow-y-auto cursor-text"
        style={{
          fontFamily: "'Lucida Console', 'Courier New', monospace",
          scrollbarWidth: 'thin',
          scrollbarColor: '#c0c0c0 #1a1a1a'
        }}
      >
        {history.map((line, index) => (
          <div key={index}>
            {line === 'C:\\Documents and Settings\\CodePoets>' && index === history.length - 1 ? (
              <form onSubmit={handleSubmit} className="inline">
                <span>{line}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none text-gray-300 font-mono text-xs ml-0 selection:bg-blue-600 selection:text-white"
                  style={{
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    width: 'calc(100% - 320px)'
                  }}
                />
              </form>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Terminal;