import React from 'react'
import { Users, Layers, Plus } from 'lucide-react'

interface StatsProps {
  userCount: number;
  postCount: number;
  onAddUser: () => void;
}

const Stats: React.FC<StatsProps> = ({ userCount, postCount, onAddUser }) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="glass-card flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Connected Users</p>
          <h3 className="text-3xl font-bold mt-1 text-emerald-500">{userCount}</h3>
        </div>
        <div className="p-3 bg-emerald-500/10 rounded-2xl">
          <Users className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      <div className="glass-card flex items-center justify-between border-blue-500/10">
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Total Content</p>
          <h3 className="text-3xl font-bold mt-1 text-blue-500">{postCount} Posts</h3>
        </div>
        <div className="p-3 bg-blue-500/10 rounded-2xl">
          <Layers className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="glass-card p-6 border-zinc-700/30">
        <h4 className="font-semibold mb-4 text-zinc-300 text-sm uppercase tracking-widest">Administration</h4>
        <div className="space-y-2">
          <button 
            onClick={onAddUser}
            className="btn btn-primary w-full"
          >
            <Plus className="w-4 h-4" />
            Register New User
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stats
