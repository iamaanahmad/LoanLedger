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
import Notifications from './components/Notifications';
import { mockLoans, mockAuditTrail, mockComplianceChecks, mockTrades } from './data/mockLoans';
import { Loan, Trade, AuditEntry, Notification } from './types';

const initialNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'trade',
    title: 'Trade Executed',
    message: 'BlackRock purchased $50M of Meridian Energy loan',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    loanId: 'LN-001'
  },
  {
    id: 'n2',
    type: 'compliance',
    title: 'Compliance Alert',
    message: 'GreenBuild Construction flagged for elevated risk',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    loanId: 'LN-006'
  },
  {
    id: 'n3',
    type: 'price',
    title: 'Price Update',
    message: 'Atlas Manufacturing loan price updated to 98.50',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    loanId: 'LN-003'
  }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [loans, setLoans] = useState(mockLoans);
  const [trades, setTrades] = useState(mockTrades);
  const [auditTrail, setAuditTrail] = useState(mockAuditTrail);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [detailLoan, setDetailLoan] = useState<Loan | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>(['LN-001', 'LN-004']);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleTrade = (loan: Loan) => {
    setSelectedLoan(loan);
  };

  const handleToggleWatch = (loanId: string) => {
    setWatchlist(prev => 
      prev.includes(loanId) 
        ? prev.filter(id => id !== loanId)
        : [...prev, loanId]
    );
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
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

    // Add notification if loan was watched
    if (watchlist.includes(trade.loanId)) {
      const newNotification: Notification = {
        id: `n-${Date.now()}`,
        type: 'watchlist',
        title: 'Watched Loan Traded',
        message: `${trade.loanBorrower} loan was traded to ${trade.buyer}`,
        timestamp: new Date(),
        read: false,
        loanId: trade.loanId
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
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
        return (
          <Dashboard 
            loans={loans} 
            onTrade={handleTrade} 
            onViewDetails={handleViewDetails} 
            onExport={() => setShowExport(true)}
            watchlist={watchlist}
            onToggleWatch={handleToggleWatch}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'audit':
        return <AuditTrail entries={auditTrail} />;
      case 'compliance':
        return <ComplianceView checks={mockComplianceChecks} loans={loans} />;
      case 'green':
        return <GreenLoans loans={loans} onTrade={handleTrade} />;
      default:
        return (
          <Dashboard 
            loans={loans} 
            onTrade={handleTrade} 
            onViewDetails={handleViewDetails} 
            onExport={() => setShowExport(true)}
            watchlist={watchlist}
            onToggleWatch={handleToggleWatch}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-end mb-4">
          <Notifications 
            notifications={notifications}
            onMarkRead={handleMarkNotificationRead}
            onClearAll={handleClearNotifications}
          />
        </div>
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
