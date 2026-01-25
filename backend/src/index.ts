import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyPrismDidSignature } from './prism'; // Ensure you import this!

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// In-memory stores
const registeredUsers = new Map<string, { publicKey: string; privateKey: string }>();
const loginChallenges = new Map<string, string>();

interface AuthTokenPayload {
  did: string;
  purpose: 'login';
}

// 1. SIGNUP ROUTE (Keep this simple for the demo)
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  // Simulating DID creation for the demo
  const did = `did:prism:demo-${Math.random().toString(36).substring(2, 10)}`;
  const publicKey = 'demo-pub-key'; 
  const privateKey = 'demo-priv-key'; // In real app, this stays on client!
  
  registeredUsers.set(did, { publicKey, privateKey });
  return res.json({ did, publicKey, privateKey });
});

// 2. CHALLENGE ROUTE
app.post('/api/auth/login-challenge', (req: Request, res: Response) => {
  const { did } = req.body;
  if (!did) return res.status(400).json({ error: 'Missing DID' });

  const challenge = `Please sign this message to login: ${Math.random().toString(36)}`;
  loginChallenges.set(did, challenge);
  return res.json({ challenge });
});

// 3. VERIFY ROUTE (This is the FIX)
app.post('/api/auth/login-verify', async (req: Request, res: Response) => {
  try {
    const { did, challenge, signature } = req.body; // Changed from privateKey to signature

    if (!did || !challenge || !signature) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const expectedChallenge = loginChallenges.get(did);
    if (expectedChallenge !== challenge) {
      return res.status(401).json({ error: 'Challenge mismatch or expired' });
    }

    // Verify the signature using the Prism SDK helper
    // Note: For this demo to work with the mock frontend below, we might need to bypass
    // the real SDK check if you don't have a real wallet yet. 
    // UNCOMMENT this line for real verification:
    // const isValid = await verifyPrismDidSignature(did, challenge, signature);
    
    // For WORKSHOP DEMO ONLY (Allowing "mock-signature" to pass):
    const isValid = signature.length > 0; 

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid Signature' });
    }

    const token = jwt.sign({ did, purpose: 'login' }, JWT_SECRET, { expiresIn: '1h' });
    loginChallenges.delete(did);

    return res.json({ did, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});