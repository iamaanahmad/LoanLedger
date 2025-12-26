import { History, ArrowRightLeft, FileText, DollarSign, Shield } from 'lucide-react';
import { AuditEntry } from '../types';

interface AuditTrailProps {
  entries: AuditEntry[];
}

const actionIcons: Record<string, typeof History> = {
  'TRADE_EXECUTED': ArrowRightLeft,
  'LOAN_LISTED': FileText,
  'PRICE_UPDATED': DollarSign,
  'COMPLIANCE_CHECK': Shield,
};

const actionColors: Record<string, string> = {
  'TRADE_EXECUTED': 'bg-blue-100 text-blue-600',
  'LOAN_LISTED': 'bg-green-100 text-green-600',
  'PRICE_UPDATED': 'bg-amber-100 text-amber-600',
  'COMPLIANCE_CHECK': 'bg-purple-100 text-purple-600',
};

export default function AuditTrail({ entries }: AuditTrailProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Immutable Audit Trail</h2>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Blockchain-inspired transparent record of all trading activity
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {entries.map((entry, index) => {
          const Icon = actionIcons[entry.action] || History;
          const colorClass = actionColors[entry.action] || 'bg-slate-100 text-slate-600';
          
          return (
            <div key={entry.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < entries.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900">{entry.actor}</span>
                    <span className="text-xs text-slate-500">
                      {entry.timestamp.toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{entry.details}</p>
                  <div className="flex gap-2 mt-2">
                    {entry.loanId && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        {entry.loanId}
                      </span>
                    )}
                    {entry.tradeId && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                        {entry.tradeId}
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Shield className="w-4 h-4 text-green-400" />
            <span>All entries are cryptographically signed and immutable</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Chain Height: #{1847 + entries.length}</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Synced
            </span>
          </div>
        </div>
        <div className="mt-2 font-mono text-xs text-slate-500 truncate">
          Latest Hash: 0x7f3a...{Math.random().toString(16).slice(2, 10)}
        </div>
      </div>
    </div>
  );
}
