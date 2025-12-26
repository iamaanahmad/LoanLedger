import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { Loan, Trade, AuditEntry } from '../types';

interface TradeModalProps {
  loan: Loan;
  onClose: () => void;
  onTradeComplete: (trade: Trade, auditEntry: AuditEntry) => void;
}

const institutions = [
  'BlackRock', 'Vanguard', 'Fidelity', 'State Street', 'Allianz',
  'AXA Investment', 'PIMCO', 'Wellington', 'T. Rowe Price', 'Invesco'
];

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function TradeModal({ loan, onClose, onTradeComplete }: TradeModalProps) {
  const [step, setStep] = useState<'details' | 'confirm' | 'complete'>('details');
  const [buyer, setBuyer] = useState(institutions[0]);
  const [amount, setAmount] = useState(Math.floor(loan.amount * 0.25));
  const [price, setPrice] = useState(99.50);

  const handleExecuteTrade = () => {
    setStep('confirm');
    
    setTimeout(() => {
      const trade: Trade = {
        id: `TR-${Date.now()}`,
        loanId: loan.id,
        loanBorrower: loan.borrower,
        seller: loan.originatingBank,
        buyer,
        amount,
        price,
        timestamp: new Date(),
        status: 'Completed'
      };

      const auditEntry: AuditEntry = {
        id: `AUD-${Date.now()}`,
        timestamp: new Date(),
        action: 'TRADE_EXECUTED',
        actor: buyer,
        details: `Purchased ${formatCurrency(amount, loan.currency)} of ${loan.borrower} loan from ${loan.originatingBank} at ${price}`,
        loanId: loan.id,
        tradeId: trade.id
      };

      onTradeComplete(trade, auditEntry);
      setStep('complete');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-semibold text-slate-900">
            {step === 'complete' ? 'Trade Completed' : 'Execute Trade'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5">
          {step === 'details' && (
            <>
              <div className="bg-slate-50 rounded-lg p-4 mb-5">
                <h3 className="font-semibold text-slate-900">{loan.borrower}</h3>
                <p className="text-sm text-slate-500">{loan.loanType} • {loan.riskRating} Rating</p>
                <div className="mt-2 flex gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Total Amount</p>
                    <p className="font-semibold">{formatCurrency(loan.amount, loan.currency)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Rate</p>
                    <p className="font-semibold">{loan.interestRate}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Buyer Institution</label>
                  <select
                    value={buyer}
                    onChange={(e) => setBuyer(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {institutions.map((inst) => (
                      <option key={inst} value={inst}>{inst}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Trade Amount ({loan.currency})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    max={loan.amount}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Max: {formatCurrency(loan.amount, loan.currency)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (% of par)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    step="0.25"
                    min="80"
                    max="120"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Trade Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-blue-700">Settlement Value:</p>
                  <p className="font-semibold text-blue-900">{formatCurrency(amount * (price / 100), loan.currency)}</p>
                  <p className="text-blue-700">Seller:</p>
                  <p className="font-semibold text-blue-900">{loan.originatingBank}</p>
                  <p className="text-blue-700">Buyer:</p>
                  <p className="font-semibold text-blue-900">{buyer}</p>
                </div>
              </div>

              <button
                onClick={handleExecuteTrade}
                className="w-full mt-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Execute Trade
              </button>
            </>
          )}

          {step === 'confirm' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Processing Trade</h3>
              <p className="text-slate-500">Running compliance checks...</p>
              <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>KYC Verification passed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>AML Screening passed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Executing settlement...</span>
                </div>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Trade Executed Successfully</h3>
              <p className="text-slate-500 mb-4">
                {formatCurrency(amount, loan.currency)} of {loan.borrower} loan transferred to {buyer}
              </p>
              <div className="bg-slate-50 rounded-lg p-4 text-left">
                <p className="text-xs text-slate-500 mb-1">Transaction ID</p>
                <p className="font-mono text-sm text-slate-900">TR-{Date.now()}</p>
                <p className="text-xs text-slate-500 mt-2 mb-1">Recorded in Audit Trail</p>
                <p className="text-sm text-green-600">✓ Immutable record created</p>
              </div>
              <button
                onClick={onClose}
                className="w-full mt-5 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
