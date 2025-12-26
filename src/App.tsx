import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import AuditTrail from './components/AuditTrail';
import ComplianceView from './components/ComplianceView';
import GreenLoans from './components/GreenLoans';
import TradeModal from './components/TradeModal';
import LoginScreen from './components/LoginScreen';
import ExportReport from './components/ExportReport';
import LoanDetail from './components/LoanDetail';
import { mockLoans, mockAuditTrail, mockComplianceChecks, mockTrades } from './data/mockLoans';
import { Loan, Trade, AuditEntry } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [loans, setLoans] = useState(mockLoans);
  const [trades, setTrades] = useState(mockTrades);
  const [auditTrail, setAuditTrail] = useState(mockAuditTrail);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [detailLoan, setDetailLoan] = useState<Loan | null>(null);
  const [showExport, setShowExport] = useState(false);

  const handleTrade = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleTradeComplete = (trade: Trade, auditEntry: AuditEntry) => {
    // Update loan status
    setLoans(prev => prev.map(l => 
      l.id === trade.loanId ? { ...l, status: 'Traded' as const } : l
    ));
    
    // Add trade to history
    setTrades(prev => [trade, ...prev]);
    
    // Add to audit trail
    setAuditTrail(prev => [auditEntry, ...prev]);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleViewDetails = (loan: Loan) => {
    setDetailLoan(loan);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard loans={loans} onTrade={handleTrade} onViewDetails={handleViewDetails} onExport={() => setShowExport(true)} />;
      case 'analytics':
        return <Analytics />;
      case 'audit':
        return <AuditTrail entries={auditTrail} />;
      case 'compliance':
        return <ComplianceView checks={mockComplianceChecks} loans={loans} />;
      case 'green':
        return <GreenLoans loans={loans} onTrade={handleTrade} />;
      default:
        return <Dashboard loans={loans} onTrade={handleTrade} onViewDetails={handleViewDetails} onExport={() => setShowExport(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 p-6 overflow-auto">
        {renderView()}
      </main>

      {selectedLoan && (
        <TradeModal
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
          onTradeComplete={handleTradeComplete}
        />
      )}

      {detailLoan && (
        <LoanDetail
          loan={detailLoan}
          onClose={() => setDetailLoan(null)}
          onTrade={() => {
            setDetailLoan(null);
            setSelectedLoan(detailLoan);
          }}
        />
      )}

      {showExport && (
        <ExportReport
          loans={loans}
          trades={trades}
          auditTrail={auditTrail}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
