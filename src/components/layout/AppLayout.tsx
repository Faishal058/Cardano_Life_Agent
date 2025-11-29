import { Link, Outlet, useLocation } from 'react-router-dom';
import { Wallet, Shield, Clock, Home, User2, MessageSquare, FileCheck, Activity, Settings } from 'lucide-react';
import { useStore } from '../../state/store';

export function AppLayout() {
  const location = useLocation();
  const { wallet, identity, activePersona, connectWallet, disconnectWallet } = useStore();

  const navItems = [
    { path: '/app', label: 'Dashboard', icon: Home },
    { path: '/personas', label: 'Personas', icon: User2 },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/proofs', label: 'Proofs', icon: FileCheck },
    { path: '/activity', label: 'Activity', icon: Activity },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const formatTimeRemaining = (expiresAt: string) => {
    const remaining = new Date(expiresAt).getTime() - Date.now();
    if (remaining < 0) return 'Expired';
    const minutes = Math.floor(remaining / 60000);
    return `${minutes}m remaining`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Midnight</h1>
              <p className="text-xs text-gray-500">Persona Layer</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Connected Identity</p>
          {identity.did ? (
            <div className="text-xs font-mono bg-gray-50 p-2 rounded border border-gray-200 break-all">
              {identity.did.substring(0, 30)}...
            </div>
          ) : (
            <p className="text-xs text-gray-400">No DID connected</p>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {activePersona && (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 rounded-lg border border-purple-200">
                  <User2 className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-semibold text-purple-900">
                      {activePersona.type}
                      {activePersona.riskLevel && (
                        <span className="ml-2 text-xs text-purple-600">
                          ({activePersona.riskLevel})
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-purple-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimeRemaining(activePersona.expiresAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              {wallet.connected ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {wallet.address?.substring(0, 12)}...
                    </p>
                    <p className="text-xs text-gray-500">{wallet.network}</p>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
