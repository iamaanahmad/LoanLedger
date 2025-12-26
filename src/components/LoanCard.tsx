import { Leaf, AlertTriangle, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { Loan } from '../types';

interface LoanCardProps {
  loan: Loan;
  onTrade: (loan: Loan) => void;
  onViewDetails?: (loan: Loan) => void;
  isWatched?: boolean;
  onToggleWatch?: (loanId: string) => void;
}

const riskColors: Record<string, string> = {
  'AAA': 'bg-emerald-100 text-emerald-800',
  'AA': 'bg-green-100 text-green-800',
  'A': 'bg-blue-100 text-blue-800',
  'BBB': 'bg-yellow-100 text-yellow-800',
  'BB': 'bg-orange-100 text-orange-800',
  'B': 'bg-red-100 text-red-800',
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

export default function LoanCard({ loan, onTrade, onViewDetails, isWatched, onToggleWatch }: LoanCardProps) {
  const isHighRisk = loan.defaultProbability > 5;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900">{loan.borrower}</h3>
            {loan.isGreen && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                <Leaf className="w-3 h-3" />
                Green
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">{loan.sector} • {loan.loanType}</p>
        </div>
        <div className="flex items-center gap-2">
          {onToggleWatch && (
            <button
              onClick={() => onToggleWatch(loan.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isWatched 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'hover:bg-slate-100 text-slate-400'
              }`}
              title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isWatched ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riskColors[loan.riskRating]}`}>
            {loan.riskRating}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500">Principal Amount</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(loan.amount, loan.currency)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Interest Rate</p>
          <p className="text-lg font-semibold text-slate-900">{loan.interestRate}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Maturity</p>
          <p className="text-sm font-medium text-slate-700">
            {new Date(loan.maturityDate).toLocaleDateString('en-GB', { 
              day: 'numeric', month: 'short', year: 'numeric' 
            })}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Originator</p>
          <p className="text-sm font-medium text-slate-700">{loan.originatingBank}</p>
        </div>
      </div>

      {isHighRisk && (
        <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span className="text-xs text-amber-700">
            Elevated default risk: {loan.defaultProbability}%
          </span>
        </div>
      )}

      {loan.isGreen && loan.greenCategory && (
        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg mb-4">
          <Leaf className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-700">{loan.greenCategory}</span>
        </div>
      )}

      <div className="flex gap-2">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(loan)}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
        )}
        <button
          onClick={() => onTrade(loan)}
          disabled={loan.status !== 'Available'}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors ${
            loan.status === 'Available'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          {loan.status === 'Available' ? 'Trade' : loan.status}
        </button>
      </div>
    </div>
  );
}
