import { X, Clock, CheckCircle, ArrowRight, FileText, Shield, TrendingUp, Users } from 'lucide-react';
import { Loan } from '../types';

interface LoanDetailProps {
  loan: Loan;
  onClose: () => void;
  onTrade: () => void;
}

const lifecycleStages = [
  { id: 'originated', label: 'Originated', icon: FileText, status: 'complete' },
  { id: 'documented', label: 'Documented', icon: FileText, status: 'complete' },
  { id: 'compliance', label: 'Compliance Cleared', icon: Shield, status: 'complete' },
  { id: 'listed', label: 'Listed for Trading', icon: TrendingUp, status: 'complete' },
  { id: 'traded', label: 'Trade Executed', icon: Users, status: 'pending' },
  { id: 'settled', label: 'Settlement Complete', icon: CheckCircle, status: 'upcoming' },
];

export default function LoanDetail({ loan, onClose, onTrade }: LoanDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-slate-900">Loan Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5">
          {/* Loan Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{loan.borrower}</h3>
                <p className="text-blue-200">{loan.sector} • {loan.loanType}</p>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                {loan.riskRating}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-blue-200 text-sm">Principal</p>
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: loan.currency, notation: 'compact' }).format(loan.amount)}
                </p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Interest Rate</p>
                <p className="text-xl font-bold">{loan.interestRate}%</p>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Maturity</p>
                <p className="text-xl font-bold">
                  {new Date(loan.maturityDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Loan Lifecycle Tracker */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Loan Lifecycle Tracker
            </h4>
            <div className="relative">
              {lifecycleStages.map((stage, index) => {
                const Icon = stage.icon;
                const isComplete = stage.status === 'complete';
                const isPending = stage.status === 'pending';
                
                return (
                  <div key={stage.id} className="flex items-center mb-3 last:mb-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isComplete ? 'bg-green-100' : isPending ? 'bg-blue-100' : 'bg-slate-100'
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isPending ? 'text-blue-600' : 'text-slate-400'}`} />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`font-medium ${isComplete ? 'text-green-700' : isPending ? 'text-blue-700' : 'text-slate-400'}`}>
                        {stage.label}
                      </p>
                    </div>
                    {index < lifecycleStages.length - 1 && (
                      <ArrowRight className={`w-4 h-4 ${isComplete ? 'text-green-400' : 'text-slate-300'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">Originating Bank</p>
              <p className="font-semibold text-slate-900">{loan.originatingBank}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">Borrower Type</p>
              <p className="font-semibold text-slate-900">{loan.borrowerType}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">Default Probability</p>
              <p className={`font-semibold ${loan.defaultProbability > 5 ? 'text-red-600' : 'text-green-600'}`}>
                {loan.defaultProbability}%
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="font-semibold text-slate-900">{loan.status}</p>
            </div>
          </div>

          {loan.isGreen && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="font-semibold text-green-800">🌱 ESG-Aligned Loan</p>
              <p className="text-sm text-green-700">{loan.greenCategory} - Supporting sustainable development</p>
            </div>
          )}

          <button
            onClick={onTrade}
            disabled={loan.status !== 'Available'}
            className={`w-full py-3 font-semibold rounded-lg transition-colors ${
              loan.status === 'Available'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            {loan.status === 'Available' ? 'Proceed to Trade' : `Status: ${loan.status}`}
          </button>
        </div>
      </div>
    </div>
  );
}
