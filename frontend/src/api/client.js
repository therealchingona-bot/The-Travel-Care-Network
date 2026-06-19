import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach auth token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('carebnb_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('carebnb_token')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

export default apiClient

// Auth
export const authAPI = {
  signIn: (data) => apiClient.post('/auth/signin', data),
  signUp: (data) => apiClient.post('/auth/signup', data),
  getProfile: () => apiClient.get('/auth/me'),
}

// Caregivers
export const caregiversAPI = {
  list: (params) => apiClient.get('/caregivers', { params }),
  getById: (id) => apiClient.get(`/caregivers/${id}`),
  updateProfile: (data) => apiClient.put('/caregivers/profile', data),
}

// Bookings
export const bookingsAPI = {
  list: (params) => apiClient.get('/bookings', { params }),
  create: (data) => apiClient.post('/bookings', data),
  getById: (id) => apiClient.get(`/bookings/${id}`),
  updateStatus: (id, status) => apiClient.put(`/bookings/${id}/status`, { status }),
}

// Messages
export const messagesAPI = {
  list: (bookingId) => apiClient.get(`/messages/${bookingId}`),
  send: (bookingId, data) => apiClient.post(`/messages/${bookingId}`, data),
}

// Payments
export const paymentsAPI = {
  createPayment: (bookingId) => apiClient.post(`/bookings/${bookingId}/payment`),
  releasePayment: (bookingId) => apiClient.post(`/bookings/${bookingId}/release-payment`),
}

// NDA
export const ndaAPI = {
  signNda: (bookingId) => apiClient.post(`/bookings/${bookingId}/sign-nda`),
}

// Verification
export const verificationAPI = {
  uploadId: (formData) => apiClient.post('/users/upload-id', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getStatus: () => apiClient.get('/users/verification-status'),
  consentBackgroundCheck: () => apiClient.put('/users/background-check'),
}

// Profile
export const profileAPI = {
  update: (data) => apiClient.put('/users/profile', data),
  getCredentials: () => apiClient.get('/users/credentials'),
  uploadCredential: (formData) => apiClient.post('/users/upload-credential', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateServices: (data) => apiClient.put('/users/services', data),
}