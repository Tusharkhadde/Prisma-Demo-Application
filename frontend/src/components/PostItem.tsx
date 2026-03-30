import React from 'react'
import { Trash2 } from 'lucide-react'

export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
}

interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
  onTogglePublish: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onTogglePublish }) => {
  return (
    <div className="post-grid-item group/post relative">
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-semibold text-zinc-200 text-sm line-clamp-1 pr-8">{post.title}</h5>
        <div className="flex items-center gap-2 absolute top-3 right-3">
          <div 
            onClick={() => onTogglePublish(post.id)}
            className={`status-dot ${post.published ? 'status-online' : 'status-offline'}`}
            title={post.published ? 'Unpublish' : 'Publish'}
          />
          <button 
            onClick={() => onDelete(post.id)}
            className="btn-icon btn-danger-icon w-6 h-6 opacity-0 group-hover/post:opacity-100 transition-all scale-90"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
      <p className="text-[11px] text-zinc-500 line-clamp-2 leading-normal">
        {post.content || 'No content provided.'}
      </p>
    </div>
  )
}

export default PostItem
