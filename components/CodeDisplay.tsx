
import React from 'react';
import { CodeSnippet } from '../types';

interface Props {
  snippet: CodeSnippet;
}

export const CodeDisplay: React.FC<Props> = ({ snippet }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="ml-2 text-xs font-medium text-slate-400 font-mono">{snippet.filename}</span>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(snippet.code)}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="p-4 flex-1 overflow-auto scroll-hide">
        <p className="text-sm text-slate-400 mb-4 italic font-light">
          {snippet.description}
        </p>
        <pre className="text-sm font-mono text-emerald-400 whitespace-pre leading-relaxed">
          {snippet.code}
        </pre>
      </div>
    </div>
  );
};
