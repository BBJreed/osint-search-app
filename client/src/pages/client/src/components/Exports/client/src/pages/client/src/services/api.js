const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.defaultHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Person Search
  async searchPerson(searchParams) {
    return this.request('/search/person', {
      method: 'POST',
      body: JSON.stringify(searchParams),
    });
  }

  // Email Investigation
  async investigateEmail(email) {
    return this.request('/investigate/email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Domain Analysis
  async analyzeDomain(domain) {
    return this.request('/analyze/domain', {
      method: 'POST',
      body: JSON.stringify({ domain }),
    });
  }

  // Phone Lookup
  async lookupPhone(phoneNumber) {
    return this.request('/lookup/phone', {
      method: 'POST',
      body: JSON.stringify({ phone: phoneNumber }),
    });
  }

  // Settings Management
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // API Key Management
  async getApiKeys() {
    return this.request('/settings/api-keys');
  }

  async updateApiKey(service, apiKey) {
    return this.request('/settings/api-keys', {
      method: 'PUT',
      body: JSON.stringify({ service, apiKey }),
    });
  }

  async testApiKey(service, apiKey) {
    return this.request('/settings/api-keys/test', {
      method: 'POST',
      body: JSON.stringify({ service, apiKey }),
    });
  }

  // Search History
  async getSearchHistory(page = 1, limit = 20) {
    return this.request(`/history?page=${page}&limit=${limit}`);
  }

  async saveSearch(searchData) {
    return this.request('/history', {
      method: 'POST',
      body: JSON.stringify(searchData),
    });
  }

  async deleteSearch(searchId) {
    return this.request(`/history/${searchId}`, {
      method: 'DELETE',
    });
  }

  // Export functionality
  async exportResults(searchId, format) {
    const response = await fetch(`${this.baseURL}/export/${searchId}?format=${format}`, {
      headers: this.defaultHeaders,
    });
    
    if (!response.ok) {
      throw new Error(`Export failed: ${response.status}`);
    }
    
    return response.blob();
  }
}

export default new ApiService();
