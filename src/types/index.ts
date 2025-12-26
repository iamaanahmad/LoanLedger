export interface Loan {
  id: string;
  borrower: string;
  borrowerType: 'Corporate' | 'SME' | 'Infrastructure' | 'Real Estate';
  amount: number;
  currency: string;
  interestRate: number;
  maturityDate: string;
  riskRating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B';
  loanType: 'Term Loan' | 'Revolving Credit' | 'Bridge Loan' | 'Syndicated';
  isGreen: boolean;
  greenCategory?: string;
  status: 'Available' | 'Pending' | 'Traded';
  sector: string;
  originatingBank: string;
  defaultProbability: number;
}

export interface Trade {
  id: string;
  loanId: string;
  loanBorrower: string;
  seller: string;
  buyer: string;
  amount: number;
  price: number;
  timestamp: Date;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  action: 'TRADE_EXECUTED' | 'LOAN_LISTED' | 'PRICE_UPDATED' | 'COMPLIANCE_CHECK';
  actor: string;
  details: string;
  loanId?: string;
  tradeId?: string;
}

export interface ComplianceCheck {
  id: string;
  loanId: string;
  checkType: string;
  status: 'Passed' | 'Failed' | 'Pending';
  details: string;
  timestamp: Date;
}

export interface MarketStats {
  totalVolume: number;
  tradesCount: number;
  avgYield: number;
  greenLoansPercent: number;
}

export interface Notification {
  id: string;
  type: 'trade' | 'price' | 'watchlist' | 'compliance';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  loanId?: string;
}
