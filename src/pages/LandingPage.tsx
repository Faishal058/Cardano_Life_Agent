import { Link } from 'react-router-dom';
import { Shield, User2, Lock, Zap, MessageSquare, Activity } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <Shield className="w-10 h-10 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Midnight Persona Layer</h1>
              <p className="text-sm text-blue-300">for Cardano Life Agents</p>
            </div>
          </div>
          <Link
            to="/app"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Open App
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            Zero-Knowledge Personas for Your AI Agent
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Midnight Persona Layer is a mini ZK DApp that lets your Cardano Life Agent switch into
            temporary Personas (Investor, Voter, Student, Gamer, Explorer, Guardian) and generate
            Zero-Knowledge proofs for dApps without exposing your identity or AI memory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Agent + DID + ZK</h3>
              <p className="text-gray-400 text-sm">
                Your Life Agent uses Decentralized Identity and Zero-Knowledge cryptography to
                protect your privacy while interacting with dApps.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <User2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">ZK Persona Masks</h3>
              <p className="text-gray-400 text-sm">
                Switch between Investor, Voter, Student, Gamer, Explorer, and Guardian personas.
                Each mask provides context-specific privacy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Privacy-Preserving Proofs</h3>
              <p className="text-gray-400 text-sm">
                Generate ZK proofs for DeFi, DAOs, games, and more without revealing your
                identity, wallet, or private data.
              </p>
            </div>
          </div>

          <Link
            to="/app"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-xl shadow-blue-500/20"
          >
            <span>Launch Application</span>
            <Zap className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <User2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Persona Switching</h3>
            <p className="text-gray-600 text-sm">
              Activate temporary personas that expire automatically, maintaining fresh privacy boundaries.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ZK-Proof Generator</h3>
            <p className="text-gray-600 text-sm">
              Create verifiable proofs for dApps with configurable scopes and validity periods.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Life Agent Chat</h3>
            <p className="text-gray-600 text-sm">
              Converse with your AI agent that reasons over private memory while respecting personas.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Anonymous Activity Layer</h3>
            <p className="text-gray-600 text-sm">
              Track your persona activations and proof generations with full activity logging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
