import { ChatMessage, ActivePersona } from '../types';

// Points to your Python CrewAI Backend
const BASE_URL = 'http://localhost:8000'; 

export async function sendChatMessage(
  message: string,
  activePersona?: ActivePersona | null
): Promise<ChatMessage> {
  
  // 1. Prepare the payload required by Masumi Agent
  const payload = {
    job_type: "chat",
    inputs: {
      topic: message,
      persona: activePersona?.type || "DEFAULT",
      risk_level: activePersona?.riskLevel || "LOW"
    }
  };

  try {
    // 2. Call the Real Backend
    const response = await fetch(`${BASE_URL}/start_job`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Agent error');

    const data = await response.json();

    // 3. Return the real response
    return {
      id: `msg_${Date.now()}`,
      role: 'agent',
      content: data.result || "I processed that but have no output.",
      createdAt: new Date().toISOString(),
    };

  } catch (error) {
    console.error("Agent Error:", error);
    // Fallback error message for UI
    return {
      id: `err_${Date.now()}`,
      role: 'agent',
      content: "Error: Could not connect to the AI Agent. Is 'main.py' running on port 8000?",
      createdAt: new Date().toISOString(),
    };
  }
}