import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { logger } from '../../utils/logger';

interface TerminalProps {
  onClose?: () => void;
}

interface HistoryLine {
  text: string;
  type: 'default' | 'user' | 'ai' | 'prompt';
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryLine[]>([
    { text: 'Microsoft Windows XP [Version 5.1.2600]', type: 'default' },
    { text: '(C) Copyright 1985-2001 Microsoft Corp.', type: 'default' },
    { text: '', type: 'default' },
    { text: 'C:\\Documents and Settings\\CodePoets>', type: 'prompt' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
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

  const getAIResponse = async (query: string): Promise<string> => {
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        return 'Error: OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.';
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant integrated into a Windows XP terminal for CodePoets, a digital agency. Keep responses concise and helpful. You can answer questions about CodePoets, web development, technology, or general queries.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response from AI.';
    } catch (error) {
      logger.error('OpenAI API error:', error);
      return `Error communicating with AI: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const executeCommand = async (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const args = cmd.trim().split(' ');
    const newHistory: HistoryLine[] = [
      ...history,
      { text: `C:\\Documents and Settings\\CodePoets>${cmd}`, type: 'user' }
    ];

    const addLine = (text: string) => {
      newHistory.push({ text, type: 'default' });
    };

    const addAILine = (text: string) => {
      newHistory.push({ text, type: 'ai' });
    };

    switch (command) {
      case '':
        break;
      case 'help':
        addLine('For more information on a specific command, type HELP command-name');
        addLine('');
        addLine('ATTRIB      Displays or changes file attributes.');
        addLine('CD          Displays the name of or changes the current directory.');
        addLine('CHDIR       Displays the name of or changes the current directory.');
        addLine('CLS         Clears the screen.');
        addLine('CONTACT     Opens contact details in Notepad.');
        addLine('COPY        Copies one or more files to another location.');
        addLine('DATE        Displays or sets the date.');
        addLine('DEL         Deletes one or more files.');
        addLine('DIR         Displays a list of files and subdirectories in a directory.');
        addLine('ECHO        Displays messages, or turns command-echoing on or off.');
        addLine('EXIT        Quits the CMD.EXE program (command interpreter).');
        addLine('FIND        Searches for a text string in a file or files.');
        addLine('HELP        Provides Help information for Windows commands.');
        addLine('MD          Creates a directory.');
        addLine('MKDIR       Creates a directory.');
        addLine('MORE        Displays output one screen at a time.');
        addLine('MOVE        Moves files and renames files and directories.');
        addLine('PATH        Displays or sets a search path for executable files.');
        addLine('PING        Tests network connectivity.');
        addLine('RD          Removes a directory.');
        addLine('REN         Renames a file or files.');
        addLine('RENAME      Renames a file or files.');
        addLine('TIME        Displays or sets the system time.');
        addLine('TREE        Graphically displays the directory structure.');
        addLine('TYPE        Displays the contents of a text file.');
        addLine('VER         Displays the Windows version.');
        addLine('VOL         Displays a disk volume label and serial number.');
        addLine('WHOAMI      Displays current username.');
        addLine('ABOUT       About CodePoets portfolio.');
        break;
      case 'dir':
        addLine(' Volume in drive C has no label.');
        addLine(' Volume Serial Number is 1234-ABCD');
        addLine('');
        addLine(' Directory of C:\\Documents and Settings\\CodePoets');
        addLine('');
        addLine('24/09/2025  03:30 PM    <DIR>          .');
        addLine('24/09/2025  03:30 PM    <DIR>          ..');
        addLine('24/09/2025  02:15 PM    <DIR>          Desktop');
        addLine('24/09/2025  02:15 PM    <DIR>          My Documents');
        addLine('24/09/2025  02:15 PM           256,128 portfolio.html');
        addLine('24/09/2025  02:15 PM            15,872 readme.txt');
        addLine('24/09/2025  02:15 PM             4,096 contact.txt');
        addLine('               3 File(s)        275,096 bytes');
        addLine('               4 Dir(s)  15,234,567,890 bytes free');
        break;
      case 'cls':
      case 'clear':
        setHistory([
          { text: 'Microsoft Windows XP [Version 5.1.2600]', type: 'default' },
          { text: '(C) Copyright 1985-2001 Microsoft Corp.', type: 'default' },
          { text: '', type: 'default' }
        ]);
        return;
      case 'ver':
        addLine('Microsoft Windows XP [Version 5.1.2600]');
        break;
      case 'date':
        addLine(`The current date is: ${new Date().toLocaleDateString()}`);
        addLine('Enter the new date: (mm-dd-yy) [Press Enter to keep current date]');
        break;
      case 'time':
        addLine(`The current time is: ${new Date().toLocaleTimeString()}`);
        addLine('Enter the new time: [Press Enter to keep current time]');
        break;
      case 'vol':
        addLine(' Volume in drive C has no label.');
        addLine(' Volume Serial Number is 1234-ABCD');
        break;
      case 'whoami':
        addLine('CODEPOETS\\CodePoetsTeam');
        break;
      case 'tree':
        addLine('Folder PATH listing for volume Local Disk');
        addLine('Volume serial number is 1234-ABCD');
        addLine('C:\\DOCUMENTS AND SETTINGS\\CODEPOETS');
        addLine('├───Desktop');
        addLine('├───My Documents');
        addLine('│   ├───Projects');
        addLine('│   └───Portfolio');
        addLine('└───Application Data');
        break;
      case 'ping localhost':
      case 'ping 127.0.0.1':
        addLine('Pinging 127.0.0.1 with 32 bytes of data:');
        addLine('');
        addLine('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128');
        addLine('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128');
        addLine('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128');
        addLine('Reply from 127.0.0.1: bytes=32 time<1ms TTL=128');
        addLine('');
        addLine('Ping statistics for 127.0.0.1:');
        addLine('    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)');
        addLine('Approximate round trip times in milli-seconds:');
        addLine('    Minimum = 0ms, Maximum = 0ms, Average = 0ms');
        break;
      case 'ping codepoets.dev':
        addLine('Pinging codepoets.dev [192.168.1.100] with 32 bytes of data:');
        addLine('');
        addLine('Reply from 192.168.1.100: bytes=32 time=45ms TTL=64');
        addLine('Reply from 192.168.1.100: bytes=32 time=43ms TTL=64');
        addLine('Reply from 192.168.1.100: bytes=32 time=44ms TTL=64');
        addLine('Reply from 192.168.1.100: bytes=32 time=42ms TTL=64');
        addLine('');
        addLine('Ping statistics for 192.168.1.100:');
        addLine('    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)');
        addLine('Approximate round trip times in milli-seconds:');
        addLine('    Minimum = 42ms, Maximum = 45ms, Average = 43ms');
        break;
      case 'type contact.txt':
      case 'contact':
        addLine('Opening contact details in Notepad...');
        addLine('');
        addLine('=== CodePoets Contact Details ===');
        addLine('');
        addLine('Company: CodePoets');
        addLine('Email: hello@codepoets.dev');
        addLine('Website: https://codepoets.dev');
        addLine('Phone: +1 (555) 123-4567');
        addLine('');
        addLine('Services:');
        addLine('- Web Development');
        addLine('- UI/UX Design');
        addLine('- Portfolio Websites');
        addLine('- Custom Applications');
        addLine('');
        addLine('Location: Digital Nomads');
        addLine('Timezone: UTC+0');
        addLine('');
        addLine('Social Media:');
        addLine('- GitHub: @codepoets');
        addLine('- Twitter: @codepoets_dev');
        addLine('- LinkedIn: CodePoets');
        addLine('');
        addLine('Note: We create digital poetry through code!');
        break;
      case 'about':
        addLine('CodePoets XP Portfolio - Windows XP Experience');
        addLine('');
        addLine('Built with React & TypeScript');
        addLine('Authentic Windows XP interface recreation');
        addLine('Featuring working applications and authentic styling');
        addLine('');
        addLine('Contact: hello@codepoets.dev');
        addLine('Website: https://codepoets.dev');
        addLine('');
        addLine('This is a demonstration of our frontend development skills');
        addLine('showcasing attention to detail and authentic user experiences.');
        break;
      case 'echo hello':
        addLine('hello');
        break;
      case 'echo off':
        addLine('Echo is OFF');
        break;
      case 'echo on':
        addLine('Echo is ON');
        break;
      case 'cd..':
      case 'cd ..':
        addLine('C:\\Documents and Settings>');
        break;
      case 'cd desktop':
        addLine('C:\\Documents and Settings\\CodePoets\\Desktop>');
        break;
      case 'md test':
      case 'mkdir test':
        addLine('Directory created successfully.');
        break;
      case 'path':
        addLine('PATH=C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;');
        addLine('C:\\Program Files\\Internet Explorer;C:\\Program Files\\CodePoets');
        break;
      case 'exit':
        addLine('Goodbye! Closing terminal...');
        setTimeout(() => onClose?.(), 1500);
        break;
      default:
        if (command.startsWith('echo ')) {
          addLine(cmd.substring(5));
        } else if (command.startsWith('ping ')) {
          const target = args[1] || 'unknown';
          addLine(`Ping request could not find host ${target}. Please check the name and try again.`);
        } else if (command.startsWith('cd ')) {
          const dir = args[1] || '';
          addLine(`The system cannot find the path specified: ${dir}`);
        } else {
          setHistory(newHistory);
          setIsLoading(true);

          const aiResponse = await getAIResponse(cmd);
          const responseLines = aiResponse.split('\n');

          setIsLoading(false);
          responseLines.forEach(line => addAILine(line));
          newHistory.push({ text: '', type: 'default' });
          newHistory.push({ text: 'C:\\Documents and Settings\\CodePoets>', type: 'prompt' });
          setHistory(newHistory);
          return;
        }
        break;
    }

    newHistory.push({ text: '', type: 'default' });
    newHistory.push({ text: 'C:\\Documents and Settings\\CodePoets>', type: 'prompt' });
    setHistory(newHistory);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (input.trim() || input === '') {
      setCommandHistory(prev => [...prev, input]);
      await executeCommand(input);
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

  const getLineColor = (type: string) => {
    switch (type) {
      case 'user':
        return '#5c9cff';
      case 'ai':
        return '#00ff00';
      case 'prompt':
      case 'default':
      default:
        return '#c0c0c0';
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
          <div key={index} style={{ color: getLineColor(line.type) }}>
            {line.type === 'prompt' && index === history.length - 1 ? (
              <form onSubmit={handleSubmit} className="inline">
                <span>{line.text}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="bg-transparent border-none outline-none font-mono text-xs ml-0 selection:bg-blue-600 selection:text-white disabled:opacity-50"
                  style={{
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    width: 'calc(100% - 320px)',
                    color: '#c0c0c0'
                  }}
                />
              </form>
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Terminal;
