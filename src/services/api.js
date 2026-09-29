const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // If running under Vite dev on 5173, target backend on 5000
    if (window.location.port === '5173') {
      return `http://${window.location.hostname}:5000/api`;
    }
    // Otherwise in unified production server or hosted URL, use current origin
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // Auth
  async register(name, email, phone, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Could not connect to backend server.' };
    }
  },

  async login(email, phone, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, password })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Could not connect to backend server.' };
    }
  },

  // Certificates
  async issueCertificate({ studentName, courseId, courseTitle, scorePercentage }) {
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, courseId, courseTitle, scorePercentage })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Could not connect to certificate API.' };
    }
  },

  async verifyCertificate(certId) {
    try {
      const res = await fetch(`${API_BASE_URL}/certificates/verify/${encodeURIComponent(certId)}`);
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Could not reach verification server.' };
    }
  },

  // Payments
  async createOrder({ courseId, sheetPrice, couponCode, userEmail }) {
    try {
      const res = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, sheetPrice, couponCode, userEmail })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Payment service connection error.' };
    }
  },

  async verifyPayment(orderPayload) {
    try {
      const res = await fetch(`${API_BASE_URL}/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Payment verification failed.' };
    }
  },

  async getDatabaseOverview() {
    try {
      const res = await fetch(`${API_BASE_URL}/database/overview`);
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Could not connect to database inspector.' };
    }
  },

  async executeCode({ language, code, input }) {
    try {
      const res = await fetch(`${API_BASE_URL}/compiler/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input })
      });
      return await res.json();
    } catch (e) {
      return { success: false, output: `Network error connecting to compiler: ${e.message}` };
    }
  }
};

