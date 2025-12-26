import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Loan } from '../types';
import LoanCard from './LoanCard';

interface DashboardProps {
  loans: Loan[];
  onTrade: (loan: Loan) => void;
  onViewDetails: (loan: Loan) => void;
  onExport: () => void;
}

export default function Dashboard({ loans, onTrade, onViewDetails, onExport }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [greenOnly, setGreenOnly] = useState(false);

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loan.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || loan.riskRating === riskFilter;
    const matchesType = typeFilter === 'all' || loan.loanType === typeFilter;
    const matchesGreen = !greenOnly || loan.isGreen;
    return matchesSearch && matchesRisk && matchesType && matchesGreen;
  });

  const totalValue = filteredLoans.reduce((sum, l) => sum + l.amount, 0);
  const avgRate = filteredLoans.length > 0 
    ? filteredLoans.reduce((sum, l) => sum + l.interestRate, 0) / filteredLoans.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Loan Marketplace</h1>
          <p className="text-slate-500">Browse and trade loans with full transparency</p>
        </div>
        <button 
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Available Loans</p>
          <p className="text-2xl font-bold text-slate-900">{filteredLoans.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Value</p>
          <p className="text-2xl font-bold text-slate-900">
            ${(totalValue / 1e9).toFixed(2)}B
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Avg. Interest Rate</p>
          <p className="text-2xl font-bold text-slate-900">{avgRate.toFixed(2)}%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Green Loans</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredLoans.filter(l => l.isGreen).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by borrower or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="AAA">AAA</option>
              <option value="AA">AA</option>
              <option value="A">A</option>
              <option value="BBB">BBB</option>
              <option value="BB">BB</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Term Loan">Term Loan</option>
              <option value="Revolving Credit">Revolving Credit</option>
              <option value="Bridge Loan">Bridge Loan</option>
              <option value="Syndicated">Syndicated</option>
            </select>

            <label className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={greenOnly}
                onChange={(e) => setGreenOnly(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-slate-700">Green Only</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredLoans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} onTrade={onTrade} onViewDetails={onViewDetails} />
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">No loans match your filters</p>
        </div>
      )}
    </div>
  );
}
