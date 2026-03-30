import React from 'react'
import { Database, RefreshCw } from 'lucide-react'

interface NavbarProps {
  loading: boolean;
  onRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ loading, onRefresh }) => {
  return (
    <nav className="glass-card flex items-center justify-between p-4 mb-10 sticky top-4 z-50 mx-auto max-w-[95%]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/20 rounded-xl">
          <Database className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Prisma<span className="text-emerald-500">Flux</span>
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-mono">
            Real-time DB Monitor
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className="btn btn-sm"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span className="font-medium">Sync DB</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
