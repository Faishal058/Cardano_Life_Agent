import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  WalletState,
  IdentityState,
  ActivePersona,
  ZKProofSummary,
  ActivityItem,
  AppSettings,
} from '../types';

interface AppState {
  wallet: WalletState;
  identity: IdentityState;
  activePersona: ActivePersona | null;
  proofs: ZKProofSummary[];
  activities: ActivityItem[];
  settings: AppSettings;

  connectWallet: () => void;
  disconnectWallet: () => void;
  setActivePersona: (persona: ActivePersona) => void;
  addProof: (proof: ZKProofSummary) => void;
  addActivity: (activity: ActivityItem) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      wallet: {
        connected: false,
        // network is optional in WalletState, we set it when connecting
      },
      identity: {
        hasAgent: false,
      },
      activePersona: null,
      proofs: [],
      activities: [],
      settings: {
        defaultPersona: 'INVESTOR',
        defaultExpiration: '10min', // can change to '1hour' if you prefer
        allowAutoSwitch: false,
        allowAutoProofs: false,
      },

      connectWallet: () => {
        set((state) => {
          const activity: ActivityItem = {
            id: Date.now().toString(),
            category: 'SYSTEM',
            label: 'Connected mock Cardano wallet',
            timestamp: new Date().toISOString(),
          };

          return {
            wallet: {
              connected: true,
              address: 'addr_test1qp8xkzg3jh4k5m6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4',
              network: 'preprod',
            },
            identity: {
              ...state.identity,
              did: 'did:prism:4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
              hasAgent: true,
            },
            activities: [activity, ...state.activities],
          };
        });
      },

      disconnectWallet: () => {
        set((state) => {
          const activity: ActivityItem = {
            id: Date.now().toString(),
            category: 'SYSTEM',
            label: 'Disconnected wallet',
            timestamp: new Date().toISOString(),
          };

          return {
            wallet: { connected: false },
            identity: { hasAgent: false },
            activePersona: null,
            activities: [activity, ...state.activities],
          };
        });
      },

      setActivePersona: (persona) => {
        set((state) => {
          const activity: ActivityItem = {
            id: Date.now().toString(),
            category: 'PERSONA',
            label: `Persona activated: ${persona.type}${
              persona.riskLevel ? ` (${persona.riskLevel} risk)` : ''
            }`,
            timestamp: new Date().toISOString(),
          };

          return {
            activePersona: persona,
            activities: [activity, ...state.activities],
          };
        });
      },

      addProof: (proof) => {
        set((state) => {
          const activity: ActivityItem = {
            id: Date.now().toString(),
            category: 'PROOF',
            label: `Generated ZK proof for ${proof.scope}`,
            timestamp: new Date().toISOString(),
          };

          return {
            proofs: [proof, ...state.proofs],
            activities: [activity, ...state.activities],
          };
        });
      },

      addActivity: (activity) => {
        set((state) => ({
          activities: [activity, ...state.activities],
        }));
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
    }),
    {
      name: 'midnight-persona-storage', // localStorage key
    }
  )
);
