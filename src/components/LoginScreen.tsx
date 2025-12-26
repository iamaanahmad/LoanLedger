import { useState } from 'react';
import { FileText, Building2, Shield, TrendingUp } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const features = [
  { icon: TrendingUp, title: 'Real-Time Trading', desc: 'Execute loan trades with instant settlement visibility' },
  { icon: Shield, title: 'Full Transparency', desc: 'Immutable audit trail for every transaction' },
  { icon: Building2, title: 'Multi-Institution', desc: 'Connect banks, funds, and institutions seamlessly' },
];

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('trader@bankdemo.com');
  const [institution, setInstitution] = useState('Deutsche Bank');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">LoanLedger</h1>
            <p className="text-blue-400">Transparent Loan Trading</p>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">
          Making loan trading as transparent as stock trading
        </h2>
        <p className="text-xl text-slate-400 mb-12">
          Real-time visibility, immutable audit trails, and automated compliance for the multi-trillion dollar loan market.
        </p>

        <div className="space-y-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-sm text-slate-500">
            Built for the LMA Edge Hackathon • Transparent Loan Trading Category
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">LoanLedger</h1>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500 mb-8">Sign in to access the loan marketplace</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Institution</label>
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Deutsche Bank</option>
                  <option>BNP Paribas</option>
                  <option>HSBC</option>
                  <option>Barclays</option>
                  <option>BlackRock</option>
                  <option>Fidelity Investments</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@institution.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In to Dashboard
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> Click sign in to explore the prototype with sample data.
              </p>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Secure • Compliant • Transparent
          </p>
        </div>
      </div>
    </div>
  );
}
