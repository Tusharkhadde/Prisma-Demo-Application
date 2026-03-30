import express from 'express'
import cors from 'cors'
import prisma from './prisma'
import seed from './seed'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

/**
 * API Routes
 */

// Get all users with their posts
app.get('/api/users', async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true
            },
            orderBy: { createdAt: 'desc' }
        })
        res.json(users)
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

// Get all posts with their authors
app.get('/api/posts', async (_req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true
            },
            orderBy: { createdAt: 'desc' }
        })
        res.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        res.status(500).json({ error: 'Failed to fetch posts' })
    }
})

// Create a new user
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })

    try {
        const user = await prisma.user.create({
            data: { name, email }
        })
        res.status(201).json(user)
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
})

// Create a new post for a user
app.post('/api/posts', async (req, res) => {
    const { title, content, authorId } = req.body
    if (!title || !authorId) return res.status(400).json({ error: 'Title and AuthorId are required' })

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: Number(authorId),
                published: true
            }
        })
        res.status(201).json(post)
    } catch (error) {
        console.error('Error creating post:', error)
        res.status(500).json({ error: 'Failed to create post' })
    }
})

// Delete a user and their posts (Cascade)
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'User and associated posts deleted successfully' })
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ error: 'Failed to delete user' })
    }
})

// Delete a post
app.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.post.delete({
            where: { id: Number(id) }
        })
        res.json({ message: 'Post deleted successfully' })
    } catch (error) {
        console.error('Error deleting post:', error)
        res.status(500).json({ error: 'Failed to delete post' })
    }
})

// Toggle publish status of a post
app.patch('/api/posts/:id/publish', async (req, res) => {
    const { id } = req.params
    try {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) }
        })
        if (!post) return res.status(404).json({ error: 'Post not found' })

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { published: !post.published }
        })
        res.json(updatedPost)
    } catch (error) {
        console.error('Error toggling publish status:', error)
        res.status(500).json({ error: 'Failed to toggle publish status' })
    }
})

app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    // Run seed logic on start
    await seed().catch(console.error)
})