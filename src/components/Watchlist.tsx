import { Eye, EyeOff, TrendingUp, Bell } from 'lucide-react';
import { Loan } from '../types';

interface WatchlistProps {
  loans: Loan[];
  watchlist: string[];
  onToggleWatch: (loanId: string) => void;
  onTrade: (loan: Loan) => void;
}

export default function Watchlist({ loans, watchlist, onToggleWatch, onTrade }: WatchlistProps) {
  const watchedLoans = loans.filter(l => watchlist.includes(l.id));

  if (watchedLoans.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Your Watchlist</h3>
        </div>
        <div className="text-center py-8 text-slate-500">
          <Eye className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p>No loans in watchlist</p>
          <p className="text-sm mt-1">Click the eye icon on any loan to track it</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-slate-900">Your Watchlist</h3>
        </div>
        <span className="text-sm text-slate-500">{watchedLoans.length} loan{watchedLoans.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-3">
        {watchedLoans.map((loan) => (
          <div key={loan.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">{loan.borrower}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500">{loan.interestRate}%</span>
                <span className="text-xs px-1.5 py-0.5 bg-slate-200 rounded">{loan.riskRating}</span>
                {loan.isGreen && (
                  <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Green</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onTrade(loan)}
                disabled={loan.status !== 'Available'}
                className={`p-2 rounded-lg transition-colors ${
                  loan.status === 'Available'
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleWatch(loan.id)}
                className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg flex items-center gap-2">
        <Bell className="w-4 h-4 text-purple-600" />
        <span className="text-xs text-purple-700">You'll be notified when watched loans are traded</span>
      </div>
    </div>
  );
}
