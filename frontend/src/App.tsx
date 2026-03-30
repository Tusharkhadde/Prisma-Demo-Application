import { useState, useEffect } from 'react'
import { LayoutDashboard, Database } from 'lucide-react'
import Navbar from './components/Navbar'
import Stats from './components/Stats'
import UserCard, { User } from './components/UserCard'
import Modal from './components/Modal'
import Toast from './components/Toast'
import { apiService } from './services/api'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  
  // Modal States
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [activeUserId, setActiveUserId] = useState<number | null>(null)

  // Form States
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [newPost, setNewPost] = useState({ title: '', content: '' })

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.fetchUsers()
      setUsers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setTimeout(() => setLoading(false), 500)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiService.createUser(newUser)
      showToast('User created successfully')
      setIsUserModalOpen(false)
      setNewUser({ name: '', email: '' })
      fetchData()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user and all their posts?')) return
    try {
      await apiService.deleteUser(id)
      showToast('User deleted')
      fetchData()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeUserId) return
    try {
      await apiService.createPost({ ...newPost, authorId: activeUserId })
      showToast('Post created successfully')
      setIsPostModalOpen(false)
      setNewPost({ title: '', content: '' })
      setActiveUserId(null)
      fetchData()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  const handleDeletePost = async (id: number) => {
    try {
      await apiService.deletePost(id)
      showToast('Post deleted')
      fetchData()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  const handleTogglePublish = async (id: number) => {
    try {
      await apiService.togglePostPublish(id)
      fetchData()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  return (
    <div className="min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <Navbar loading={loading} onRefresh={fetchData} />

      <main className="container animate-fade-in">
        <header className="mb-12">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-emerald-500" />
            Database Overview
          </h2>
          <p className="text-zinc-500 max-w-2xl">
            Live synchronization with your Neon Tech PostgreSQL instance. 
            Perform real CRUD operations that persist directly to your cloud database.
          </p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6">
            Error: {error}. Make sure the backend is running on port 3000.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Stats 
            userCount={users.length} 
            postCount={users.reduce((acc, user) => acc + user.posts.length, 0)} 
            onAddUser={() => setIsUserModalOpen(true)} 
          />

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4">
              {loading && Array(3).fill(0).map((_, i) => (
                <div key={i} className="glass-card h-40 animate-pulse bg-zinc-800/20" />
              ))}

              {!loading && users.map((user) => (
                <UserCard 
                  key={user.id}
                  user={user}
                  onDelete={handleDeleteUser}
                  onAddPost={(id) => { setActiveUserId(id); setIsPostModalOpen(true); }}
                  onDeletePost={handleDeletePost}
                  onTogglePublish={handleTogglePublish}
                />
              ))}

              {!loading && users.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                  <Database className="w-12 h-12 mb-4 opacity-10" />
                  <p>Database is empty.</p>
                  <button onClick={() => setIsUserModalOpen(true)} className="mt-4 text-emerald-500 text-sm font-bold border-b border-emerald-500/20">Create first user</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Modal title="New User" isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)}>
        <form onSubmit={handleCreateUser}>
          <div className="form-group">
            <label>Name</label>
            <input 
              autoFocus 
              className="form-input" 
              value={newUser.name} 
              onChange={e => setNewUser({...newUser, name: e.target.value})} 
              placeholder="John Doe" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={newUser.email} 
              onChange={e => setNewUser({...newUser, email: e.target.value})} 
              placeholder="john@example.com" 
              required 
            />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => setIsUserModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Create User</button>
          </div>
        </form>
      </Modal>

      <Modal title="New Post" isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)}>
        <form onSubmit={handleCreatePost}>
          <div className="form-group">
            <label>Title</label>
            <input 
              autoFocus 
              className="form-input" 
              value={newPost.title} 
              onChange={e => setNewPost({...newPost, title: e.target.value})} 
              placeholder="Post title" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea 
              className="form-input min-h-[100px] resize-none" 
              value={newPost.content} 
              onChange={e => setNewPost({...newPost, content: e.target.value})} 
              placeholder="What's on your mind?" 
              required 
            />
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => setIsPostModalOpen(false)} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Publish Post</button>
          </div>
        </form>
      </Modal>

      <footer className="mt-20 py-10 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        Built with Prisma & React • &copy; 2026 Modern CRM Dashboard
      </footer>
    </div>
  )
}

export default App
