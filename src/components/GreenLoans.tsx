import { Leaf, Sun, Wind, Building2, Truck } from 'lucide-react';
import { Loan } from '../types';
import LoanCard from './LoanCard';

interface GreenLoansProps {
  loans: Loan[];
  onTrade: (loan: Loan) => void;
}

const categoryIcons: Record<string, typeof Leaf> = {
  'Renewable Energy': Sun,
  'Solar Energy': Sun,
  'Wind Energy': Wind,
  'Green Buildings': Building2,
  'Sustainable Transport': Truck,
};

export default function GreenLoans({ loans, onTrade }: GreenLoansProps) {
  const greenLoans = loans.filter(l => l.isGreen);
  const totalGreenValue = greenLoans.reduce((sum, l) => sum + l.amount, 0);
  const categories = [...new Set(greenLoans.map(l => l.greenCategory).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Green & Sustainable Loans</h1>
        <p className="text-slate-500">Supporting the transition to a sustainable economy</p>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">ESG-Aligned Portfolio</h2>
            <p className="text-green-100">Loans funding sustainable projects</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-3xl font-bold">{greenLoans.length}</p>
            <p className="text-green-100">Green Loans</p>
          </div>
          <div>
            <p className="text-3xl font-bold">
              ${(totalGreenValue / 1e9).toFixed(1)}B
            </p>
            <p className="text-green-100">Total Value</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{categories.length}</p>
            <p className="text-green-100">Categories</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category!] || Leaf;
          const count = greenLoans.filter(l => l.greenCategory === category).length;
          return (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{category}</p>
                  <p className="text-sm text-slate-500">{count} loan{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Available Green Loans</h3>
        <div className="grid grid-cols-2 gap-4">
          {greenLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} onTrade={onTrade} />
          ))}
        </div>
      </div>
    </div>
  );
}
