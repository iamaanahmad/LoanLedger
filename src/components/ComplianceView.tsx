import { Shield, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { ComplianceCheck, Loan } from '../types';

interface ComplianceViewProps {
  checks: ComplianceCheck[];
  loans: Loan[];
}

const statusConfig = {
  Passed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  Failed: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  Pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
};

export default function ComplianceView({ checks, loans }: ComplianceViewProps) {
  const passedCount = checks.filter(c => c.status === 'Passed').length;
  const failedCount = checks.filter(c => c.status === 'Failed').length;
  const pendingCount = checks.filter(c => c.status === 'Pending').length;

  const highRiskLoans = loans.filter(l => l.defaultProbability > 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Risk & Compliance</h1>
        <p className="text-slate-500">Automated compliance monitoring and risk assessment</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{passedCount}</p>
              <p className="text-sm text-slate-500">Checks Passed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{failedCount}</p>
              <p className="text-sm text-slate-500">Checks Failed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
              <p className="text-sm text-slate-500">Pending Review</p>
            </div>
          </div>
        </div>
      </div>

      {highRiskLoans.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">High Risk Alerts</h3>
          </div>
          <div className="space-y-2">
            {highRiskLoans.map((loan) => (
              <div key={loan.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <p className="font-medium text-slate-900">{loan.borrower}</p>
                  <p className="text-sm text-slate-500">{loan.id} • {loan.loanType}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">{loan.defaultProbability}%</p>
                  <p className="text-xs text-slate-500">Default Probability</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Compliance Checklist</h2>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {checks.map((check) => {
            const config = statusConfig[check.status];
            const Icon = config.icon;
            const loan = loans.find(l => l.id === check.loanId);
            
            return (
              <div key={check.id} className="p-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{check.checkType}</p>
                      <p className="text-sm text-slate-500">{loan?.borrower || check.loanId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                      {check.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">
                      {check.timestamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2 ml-11">{check.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
