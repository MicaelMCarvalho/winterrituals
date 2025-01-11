import { Festival } from '../types/festival';

class ApiService {
  private readonly API_BASE_URL = process.env.API_URL || 'https://rituaisdeinverno.pt/api';

  private getToken() {
    return localStorage.getItem('token');
  }

  private getAuthHeader() {
    return {
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    };
  }

  async login(username: string, password: string) {
    const response = await fetch(`${this.API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    
    localStorage.setItem('token', data.token);
    return data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  async fetchFestivals() {
    const response = await fetch(`${this.API_BASE_URL}/festivals`);
    if (!response.ok) throw new Error('Failed to fetch festivals');
    return response.json();
  }

  async fetchFestival(id: string) {
    const response = await fetch(`${this.API_BASE_URL}/festivals/${id}`);
    if (!response.ok) throw new Error('Failed to fetch festival');
    return response.json();
  }

  async createFestival(festival: Omit<Festival, 'id'>) {
    const response = await fetch(`${this.API_BASE_URL}/festivals`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(festival)
    });

    if (!response.ok) throw new Error('Failed to create festival');
    return response.json();
  }

  async updateFestival(id: string, festival: Partial<Festival>) {
    const response = await fetch(`${this.API_BASE_URL}/festivals/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeader(),
      body: JSON.stringify(festival)
    });

    if (!response.ok) throw new Error('Failed to update festival');
    return response.json();
  }

  async deleteFestival(id: string) {
    const response = await fetch(`${this.API_BASE_URL}/festivals/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeader()
    });

    if (!response.ok) throw new Error('Failed to delete festival');
    return response.json();
  }
}

// Create and export a single instance
const api = new ApiService();
export default api;
