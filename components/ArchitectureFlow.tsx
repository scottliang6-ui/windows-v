
import React from 'react';

export const ArchitectureFlow: React.FC = () => {
  return (
    <div className="w-full h-full p-8 flex flex-col gap-12 items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Broadcaster Side */}
        <div className="flex flex-col gap-4">
          <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm text-center">Broadcaster Host</h3>
          <div className="p-6 bg-slate-900 border-2 border-emerald-500/30 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">1</span>
                SharpDX Capture (GPU Texture)
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span>
                SwsContext RGB → YUV420P
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">3</span>
                FFmpeg x264 (libx264)
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">4</span>
                TCP Multi-Stream Server
              </li>
            </ul>
          </div>
        </div>

        {/* Network Layer */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-500 to-transparent md:w-32 md:h-px" />
          <div className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs">
            LAN TCP/UDP
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-500 to-transparent md:w-32 md:h-px" />
          <p className="text-[10px] text-slate-500 text-center px-4 uppercase tracking-tighter">
            Zero-Config Auto Discovery (UDP 54321)
          </p>
        </div>

        {/* Receiver Side */}
        <div className="flex flex-col gap-4">
          <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-sm text-center">Receiver Client</h3>
          <div className="p-6 bg-slate-900 border-2 border-indigo-500/30 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">1</span>
                TCP Socket Stream Buffering
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">2</span>
                FFmpeg H.264 Decoding
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">3</span>
                YUV → RGB Translation
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">4</span>
                WPF WriteableBitmap Render
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4 max-w-2xl w-full">
         <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Key Optimization</h4>
            <p className="text-xs text-slate-300">Using <span className="text-emerald-400">libx264</span> with <code className="text-[10px] bg-black/40 px-1">preset=ultrafast</code> and <code className="text-[10px] bg-black/40 px-1">tune=zerolatency</code> brings end-to-end latency below 100ms on 1Gbps LAN.</p>
         </div>
         <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase">Robustness</h4>
            <p className="text-xs text-slate-300">The broadcaster monitors new TCP connections and triggers an <span className="text-indigo-400">IDR Frame</span> (Keyframe) immediately to prevent decoding artifacts for joining clients.</p>
         </div>
      </div>
    </div>
  );
};
