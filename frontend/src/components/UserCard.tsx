import React from 'react'
import { Users, Trash2, Plus, FileText } from 'lucide-react'
import PostItem, { Post } from './PostItem'

export interface User {
  id: number;
  email: string;
  name: string | null;
  posts: Post[];
}

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
  onAddPost: (userId: number) => void;
  onDeletePost: (id: number) => void;
  onTogglePublish: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onDelete, 
  onAddPost, 
  onDeletePost, 
  onTogglePublish 
}) => {
  return (
    <div className="glass-card relative group shadow-lg">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{user.name || 'Anonymous'}</h3>
            <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="badge">ID: {user.id}</div>
          <button 
            onClick={() => onDelete(user.id)}
            className="btn-icon btn-danger-icon"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.15em]">
            <FileText className="w-3 h-3 text-emerald-500/60" />
            Posts ({user.posts.length})
          </div>
          <button 
            onClick={() => onAddPost(user.id)}
            className="btn btn-sm"
          >
            <Plus className="w-3 h-3" />
            Add Post
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.posts.length > 0 ? user.posts.map(post => (
            <PostItem 
              key={post.id} 
              post={post} 
              onDelete={onDeletePost} 
              onTogglePublish={onTogglePublish} 
            />
          )) : (
            <div className="col-span-full py-4 text-center border border-dashed border-white/5 rounded-xl">
              <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest italic">
                Empty Workspace
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCard
