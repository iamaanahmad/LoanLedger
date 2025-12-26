import { LayoutDashboard, TrendingUp, Shield, FileText, History, Leaf } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Loan Marketplace', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'audit', label: 'Audit Trail', icon: History },
  { id: 'compliance', label: 'Compliance', icon: Shield },
  { id: 'green', label: 'Green Loans', icon: Leaf },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">LoanLedger</h1>
          <p className="text-xs text-slate-400">Transparent Trading</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Market Status</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">Markets Open</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">Last update: Just now</p>
      </div>
    </aside>
  );
}
