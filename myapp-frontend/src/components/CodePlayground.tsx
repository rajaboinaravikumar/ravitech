import React, { useState, useEffect } from 'react';
import { Play, Download, Copy, CheckCircle, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

interface CodePlaygroundProps {
  initialCode: string;
  language: string;
  height?: number;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  initialCode, 
  language, 
  height = 256 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution
    setTimeout(() => {
      try {
        let result = '';
        
        switch (language) {
          case 'python':
            result = simulatePythonExecution(code);
            break;
          case 'java':
            result = simulateJavaExecution(code);
            break;
          case 'c':
            result = simulateCExecution(code);
            break;
          case 'cpp':
            result = simulateCppExecution(code);
            break;
          case 'javascript':
            result = simulateJavaScriptExecution(code);
            break;
          default:
            result = 'Language not supported in playground';
        }
        
        setOutput(result);
      } catch (error: any) {
        setOutput(`Error: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  const simulatePythonExecution = (code: string): string => {
    const lines = code.split('\n');
    let result = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('print(')) {
        const match = trimmedLine.match(/print\(["']?(.*?)["']?\)/);
        if (match) {
          const content = match[1].replace(/['"]/g, '');
          result += content + '\n';
        }
      } else if (trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('def ') && !trimmedLine.startsWith('class ')) {
        // Simple expression evaluation simulation
        if (trimmedLine.includes('=')) {
          const [varName, expression] = trimmedLine.split('=').map(s => s.trim());
          if (expression && !expression.includes('(')) {
            result += `Variable ${varName} set to ${expression}\n`;
          }
        }
      }
    }
    
    return result || 'Code executed successfully! (Python)';
  };

  const simulateJavaExecution = (code: string): string => {
    if (code.includes('System.out.print')) {
      const lines = code.split('\n');
      const outputLines = lines
        .filter(line => line.includes('System.out.print'))
        .map(line => {
          const match = line.match(/System\.out\.print(ln)?\(["']?(.*?)["']?\)/);
          return match ? match[2] : 'Printed output';
        });
      return outputLines.join('\n') || 'Java program executed successfully!';
    }
    return 'Java code compiled and executed successfully!\nOutput: Hello Java World!';
  };

  const simulateCExecution = (code: string): string => {
    if (code.includes('printf(')) {
      const lines = code.split('\n');
      const outputLines = lines
        .filter(line => line.includes('printf('))
        .map(line => {
          const match = line.match(/printf\(["']?(.*?)["']?\)/);
          return match ? match[1].replace(/\\n/g, '') : 'Printed output';
        });
      return outputLines.join('\n') || 'C program executed successfully!';
    }
    return 'C program compiled and executed successfully!\nOutput: Hello C World!';
  };

  const simulateCppExecution = (code: string): string => {
    if (code.includes('cout <<')) {
      const lines = code.split('\n');
      const outputLines = lines
        .filter(line => line.includes('cout <<'))
        .map(line => {
          const match = line.match(/cout << ["']?(.*?)["']?/);
          return match ? match[1] : 'Printed output';
        });
      return outputLines.join('\n') || 'C++ program executed successfully!';
    }
    return 'C++ program compiled and executed successfully!\nOutput: Hello C++ World!';
  };

  const simulateJavaScriptExecution = (code: string): string => {
    const lines = code.split('\n');
    let result = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('console.log(')) {
        const match = trimmedLine.match(/console\.log\(["']?(.*?)["']?\)/);
        if (match) {
          const content = match[1].replace(/['"]/g, '');
          result += content + '\n';
        }
      }
    }
    
    return result || 'JavaScript code executed successfully!';
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code_example.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    toast.success('Code reset to original!');
  };

  const getFileExtension = (lang: string): string => {
    const extensions: { [key: string]: string } = {
      python: 'py',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      javascript: 'js',
      typescript: 'ts'
    };
    return extensions[lang] || 'txt';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Code Playground
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full capitalize">
                {language}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyCode}
              className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              title="Copy code"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={downloadCode}
              className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              title="Download code"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={resetCode}
              className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              title="Reset code"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Code Editor */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Code Editor
          </h4>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ height: `${height}px` }}
            className="w-full p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your code here..."
            spellCheck="false"
          />
        </div>

        {/* Output */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 lg:border-l border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Output
          </h4>
          <div 
            style={{ height: `${height}px` }}
            className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-auto font-mono text-sm"
          >
            {isRunning ? (
              <div className="flex items-center text-green-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                Running code...
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap text-green-300">{output}</pre>
            ) : (
              <div className="text-gray-500 italic">
                Click "Run Code" to see output
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;