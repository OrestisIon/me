// Utility functions for managing access control in localStorage

export const ACCESS_STORAGE_KEY = 'portfolio_access_requests';
export const APPROVED_CODES_KEY = 'portfolio_approved_codes';
export const CURRENT_USER_KEY = 'portfolio_current_user';
export const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE || '12345678'; // Admin access code from .env

// Get all access requests
export const getAccessRequests = () => {
  const requests = localStorage.getItem(ACCESS_STORAGE_KEY);
  return requests ? JSON.parse(requests) : [];
};

// Save access request
export const saveAccessRequest = (request) => {
  const requests = getAccessRequests();
  const newRequest = {
    ...request,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  requests.push(newRequest);
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(requests));
  return newRequest;
};

// Get approved codes
export const getApprovedCodes = () => {
  const codes = localStorage.getItem(APPROVED_CODES_KEY);
  return codes ? JSON.parse(codes) : [];
};

// Generate random access code
export const generateAccessCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Approve request and generate code
export const approveRequest = (requestId) => {
  const requests = getAccessRequests();
  const codes = getApprovedCodes();

  const requestIndex = requests.findIndex(r => r.id === requestId);
  if (requestIndex === -1) return null;

  const request = requests[requestIndex];
  const accessCode = generateAccessCode();

  // Update request status
  requests[requestIndex] = { ...request, status: 'approved', accessCode };
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(requests));

  // Add to approved codes
  codes.push({
    code: accessCode,
    email: request.email,
    fullName: request.fullName,
    approvedAt: new Date().toISOString()
  });
  localStorage.setItem(APPROVED_CODES_KEY, JSON.stringify(codes));

  return { ...request, accessCode };
};

// Reject request
export const rejectRequest = (requestId) => {
  const requests = getAccessRequests();
  const requestIndex = requests.findIndex(r => r.id === requestId);
  if (requestIndex === -1) return null;

  requests[requestIndex] = { ...requests[requestIndex], status: 'rejected' };
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(requests));
  return requests[requestIndex];
};

// Verify access code
export const verifyAccessCode = (code) => {
  // Check if it's admin code
  if (code === ADMIN_CODE) {
    return { isValid: true, isAdmin: true };
  }

  const codes = getApprovedCodes();
  const validCode = codes.find(c => c.code === code);
  return {
    isValid: !!validCode,
    isAdmin: false,
    user: validCode
  };
};

// Set current user
export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

// Delete approved code
export const deleteApprovedCode = (requestId) => {
  const requests = getAccessRequests();
  const codes = getApprovedCodes();

  // Find the request
  const requestIndex = requests.findIndex(r => r.id === requestId);
  if (requestIndex === -1) return null;

  const request = requests[requestIndex];
  const accessCode = request.accessCode;

  // Remove from approved codes
  const updatedCodes = codes.filter(c => c.code !== accessCode);
  localStorage.setItem(APPROVED_CODES_KEY, JSON.stringify(updatedCodes));

  // Update request status back to pending or remove it
  requests[requestIndex] = { ...request, status: 'deleted', accessCode: null };
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(requests));

  return request;
};
