import type { AuthSession } from '../types';

// src/api/didAuth.ts
const API_BASE = (import.meta.env.VITE_AUTH_API_URL || 'http://localhost:4000') + '/api/auth';

export async function didSignUp(): Promise<AuthSession & { publicKey: string; privateKey: string }> {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  
  // Store keys for the demo
  localStorage.setItem('demo_did', data.did);
  localStorage.setItem('demo_privateKey', data.privateKey);
  
  return { did: data.did, token: '', publicKey: data.publicKey, privateKey: data.privateKey };
}

export async function didLogin(): Promise<AuthSession> {
  const did = localStorage.getItem('demo_did');
  if (!did) throw new Error('No DID found. Sign up first.');

  // 1. Get Challenge
  const challengeRes = await fetch(`${API_BASE}/login-challenge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ did }),
  });
  const { challenge } = await challengeRes.json();

  // 2. Sign Challenge (Mock Signature for Demo)
  // In a real app, you would use: await wallet.sign(challenge)
  const mockSignature = `signed-${challenge}-${Date.now()}`;

  // 3. Verify
  const verifyRes = await fetch(`${API_BASE}/login-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      did, 
      challenge, 
      signature: mockSignature // Sending signature now
    }),
  });

  if (!verifyRes.ok) throw new Error('Login failed');
  
  const data = await verifyRes.json();
  return { did: data.did, token: data.token };
}