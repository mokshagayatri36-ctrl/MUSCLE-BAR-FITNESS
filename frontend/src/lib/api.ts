const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to get token
const getAuthHeaders = (): Record<string, string> => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
  return {};
};

// Generic fetch wrapper
async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  auth: {
    login: (credentials: any) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (memberData: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(memberData) }),
    getMe: () => request('/auth/me'),
  },
  plans: {
    getAll: () => request('/plans'),
    create: (data: any) => request('/plans', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/plans/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/plans/${id}`, { method: 'DELETE' }),
  },
  trainer: {
    get: () => request('/trainer'),
    update: (data: any) => request('/trainer', { method: 'PUT', body: JSON.stringify(data) }),
  },
  programs: {
    getAll: () => request('/programs'),
    create: (data: any) => request('/programs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/programs/${id}`, { method: 'DELETE' }),
  },
  gallery: {
    getAll: () => request('/gallery'),
    upload: (data: any) => request('/gallery', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request(`/gallery/${id}`, { method: 'DELETE' }),
  },
  enquiries: {
    submit: (data: any) => request('/enquiries', { method: 'POST', body: JSON.stringify(data) }),
    getAll: () => request('/enquiries'),
  },
  registrations: {
    submit: (data: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }), // Same as auth register
    getAll: () => request('/registrations'),
    updateStatus: (id: string, status: string) => request(`/registrations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  },
  feedback: {
    submit: (data: any) => request('/feedback', { method: 'POST', body: JSON.stringify(data) }),
    getApproved: () => request('/feedback/approved'),
    getAll: () => request('/feedback'),
    updateStatus: (id: string, approvalStatus: string) => request(`/feedback/${id}/status`, { method: 'PUT', body: JSON.stringify({ approvalStatus }) }),
    delete: (id: string) => request(`/feedback/${id}`, { method: 'DELETE' }),
  },
  payments: {
    getAll: () => request('/payments'),
    updateStatus: (id: string, status: string) => request(`/payments/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  },
  analytics: {
    get: () => request('/analytics'),
  }
};
