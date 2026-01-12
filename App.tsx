
import React, { useState } from 'react';
import { TechLayer, LANDevice } from './types';
import { CS_SNIPPETS } from './constants';
import { CodeDisplay } from './components/CodeDisplay';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { 
  Monitor, 
  Cpu, 
  Network, 
  Tv, 
  Layers, 
  Zap, 
  Settings, 
  Power, 
  ShieldCheck,
  Globe,
  Activity,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const App: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<TechLayer>(TechLayer.OVERVIEW);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [devices] = useState<LANDevice[]>([
    { name: "PC-STUDENT-01", ip: "192.168.1.105", status: "Broadcasting" },
    { name: "TEACHER-WORKSTATION", ip: "192.168.1.2", status: "Idle" },
    { name: "LAB-DESK-04", ip: "192.168.1.112", status: "Broadcasting" },
    { name: "SURFACE-PRO-X", ip: "192.168.1.55", status: "Idle" },
    { name: "PC-GAMING-BOX", ip: "192.168.1.200", status: "Disconnected" },
    { name: "REMOTE-DEV-01", ip: "192.168.1.88", status: "Broadcasting" }
  ]);

  const layerIcons = {
    [TechLayer.OVERVIEW]: <Layers className="w-5 h-5" />,
    [TechLayer.CAPTURE]: <Monitor className="w-5 h-5" />,
    [TechLayer.ENCODING]: <Cpu className="w-5 h-5" />,
    [TechLayer.NETWORK]: <Network className="w-5 h-5" />,
    [TechLayer.RECEIVER]: <Tv className="w-5 h-5" />
  };

  return (
    <div className="flex h-screen w-full bg-[#121212] text-white overflow-hidden font-sans">
      {/* Mini Sidebar for Navigation */}
      <nav className="w-20 lg:w-64 border-r border-[#2d2d30] flex flex-col bg-[#1e1e1e] z-30">
        <div className="p-6 border-b border-[#2d2d30] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-bold text-lg tracking-tight leading-tight">LAN Vision</h1>
            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">P2P ARCHITECT</p>
          </div>
        </div>

        <div className="flex-1 p-3 lg:p-4 flex flex-col gap-2">
          {Object.values(TechLayer).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                activeLayer === layer 
                ? 'bg-cyan-500 text-white shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                : 'text-gray-400 hover:bg-[#2d2d30] hover:text-cyan-400'
              }`}
            >
              <span className="shrink-0">{layerIcons[layer]}</span>
              <span className="hidden lg:block text-sm font-semibold whitespace-nowrap">{layer}</span>
              {activeLayer === layer && <ChevronRight className="hidden lg:block w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>

        <div className="p-4 mt-auto space-y-4">
          <div className="hidden lg:block bg-black/20 rounded-xl p-4 border border-[#2d2d30]">
             <div className="flex items-center gap-2 mb-2 text-cyan-400">
               <ShieldCheck className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-tighter">System Status</span>
             </div>
             <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                <span className="text-gray-500 uppercase">Jitter</span>
                <span className="text-emerald-400">0.2ms</span>
             </div>
             <div className="w-full h-1 bg-[#2d2d30] rounded-full">
                <div className="w-1/12 h-full bg-emerald-500 rounded-full" />
             </div>
          </div>
          <button className="w-full p-3 rounded-xl bg-[#2d2d30] hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center justify-center gap-2">
             <Power className="w-5 h-5" />
             <span className="hidden lg:block text-sm font-bold uppercase">Exit</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - My Info */}
        <header className="h-20 glass-header flex items-center justify-between px-8 z-20 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Local Machine:</span>
              <span className="text-sm font-bold text-white uppercase tracking-wider">PC-ARCHITECT-01</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-cyan-500 font-mono tracking-tighter">IP: 192.168.1.105</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Peers</span>
               <span className="text-sm font-mono text-cyan-400">{devices.filter(d => d.status === 'Broadcasting').length} Broadcasting</span>
            </div>
            <button className="p-2 rounded-lg bg-[#2d2d30] hover:text-cyan-400 transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Dynamic Stage */}
        <main className="flex-1 overflow-auto p-6 lg:p-10 relative">
          {activeLayer === TechLayer.OVERVIEW ? (
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
              {/* Device Stage - Card Layout */}
              <div>
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold flex items-center gap-3">
                      <Globe className="w-6 h-6 text-cyan-500" />
                      LAN Discovery Stage
                   </h2>
                   <div className="flex gap-2">
                      <span className="px-3 py-1 bg-[#2d2d30] rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-tighter border border-[#3e3e42]">Filters: All</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {devices.map((device, idx) => (
                    <div key={idx} className="cyber-card rounded-2xl p-6 group cursor-pointer relative overflow-hidden">
                      {device.status === 'Broadcasting' && (
                        <div className="absolute top-0 right-0 p-2">
                           <div className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-[9px] font-bold text-emerald-400 uppercase animate-pulse">
                              LIVE
                           </div>
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center gap-4 py-4">
                        <div className={`w-20 h-16 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          device.status === 'Broadcasting' ? 'border-cyan-500 bg-cyan-500/10' : 'border-[#3e3e42] bg-black/20'
                        }`}>
                           <Tv className={`w-8 h-8 ${device.status === 'Broadcasting' ? 'text-cyan-400' : 'text-gray-600'}`} />
                        </div>
                        
                        <div className="text-center">
                          <h3 className="font-bold text-sm text-gray-200 group-hover:text-white">{device.name}</h3>
                          <p className="text-[11px] text-gray-500 font-mono mt-0.5">{device.ip}</p>
                        </div>

                        {device.status === 'Broadcasting' ? (
                          <button className="w-full mt-2 py-2 bg-cyan-500 rounded-xl text-white text-xs font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all">
                            WATCH STREAM
                          </button>
                        ) : (
                          <div className="w-full mt-2 py-2 bg-[#2d2d30] rounded-xl text-gray-500 text-xs font-bold text-center border border-white/5">
                            {device.status === 'Disconnected' ? 'OFFLINE' : 'IDLE'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Blueprint Section */}
              <div className="flex flex-col gap-6 pt-10 border-t border-[#2d2d30]">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-cyan-500" />
                  <h2 className="text-xl font-bold">Protocol Architecture</h2>
                </div>
                <div className="bg-[#1e1e1e] rounded-3xl border border-[#2d2d30] p-1 overflow-hidden h-[500px]">
                   <div className="w-full h-full bg-[#121212] rounded-[22px] border border-white/5 shadow-inner">
                      <ArchitectureFlow />
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto h-full flex flex-col">
               <div className="grid grid-cols-1 gap-8">
                  {CS_SNIPPETS[activeLayer].map((snippet, idx) => (
                    <CodeDisplay key={idx} snippet={snippet} />
                  ))}
               </div>
            </div>
          )}
        </main>

        {/* Footer Action Bar */}
        <footer className="h-24 bg-[#1e1e1e] border-t border-[#2d2d30] flex items-center justify-center px-10 relative z-30 shrink-0">
          <div className="flex-1 hidden md:flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Protocol</span>
                <span className="text-xs font-mono text-cyan-400">H.264/TCP</span>
             </div>
             <div className="w-px h-8 bg-[#2d2d30]" />
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Enc. Speed</span>
                <span className="text-xs font-mono text-cyan-400">Ultrafast</span>
             </div>
          </div>

          {/* Central Action Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-12">
            <button 
              onClick={() => setIsBroadcasting(!isBroadcasting)}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-500 group shadow-2xl ${
                isBroadcasting 
                ? 'bg-[#121212] border-red-500 text-red-500 animate-breathe shadow-red-500/20' 
                : 'bg-cyan-500 border-[#1e1e1e] text-white hover:scale-110 shadow-cyan-500/30'
              }`}
            >
              <Power className={`w-8 h-8 transition-transform ${isBroadcasting ? 'scale-90' : 'group-hover:rotate-12'}`} />
              <span className="text-[9px] font-black uppercase tracking-tighter mt-1">
                {isBroadcasting ? 'Stop' : 'Broadcast'}
              </span>
            </button>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2d30] rounded-xl border border-white/5 hover:bg-[#3e3e42] transition-colors text-xs font-bold text-gray-300">
                <Settings className="w-4 h-4" />
                Advanced
             </button>
             <button className="p-2 text-gray-500 hover:text-white">
                <MoreVertical className="w-5 h-5" />
             </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
