const API_BASE_URL = 'http://localhost:3000/api'

export const apiService = {
  async fetchUsers() {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json()
  },

  async createUser(userData: { name: string; email: string }) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error('Failed to create user')
    return response.json()
  },

  async deleteUser(userId: number) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete user')
    return response.json()
  },

  async createPost(postData: { title: string; content: string; authorId: number }) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create post')
    }
    return response.json()
  },

  async deletePost(postId: number) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete post')
    return response.json()
  },

  async togglePostPublish(postId: number) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/publish`, {
      method: 'PATCH',
    })
    if (!response.ok) throw new Error('Failed to update post')
    return response.json()
  },
}
