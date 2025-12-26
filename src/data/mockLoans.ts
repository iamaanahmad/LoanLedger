import { Loan, Trade, AuditEntry, ComplianceCheck } from '../types';

export const mockLoans: Loan[] = [
  {
    id: 'LN-001',
    borrower: 'Meridian Energy Corp',
    borrowerType: 'Corporate',
    amount: 150000000,
    currency: 'USD',
    interestRate: 5.25,
    maturityDate: '2028-06-15',
    riskRating: 'AA',
    loanType: 'Term Loan',
    isGreen: true,
    greenCategory: 'Renewable Energy',
    status: 'Available',
    sector: 'Energy',
    originatingBank: 'Deutsche Bank',
    defaultProbability: 0.8
  },
  {
    id: 'LN-002',
    borrower: 'Nordic Infrastructure AS',
    borrowerType: 'Infrastructure',
    amount: 280000000,
    currency: 'EUR',
    interestRate: 4.75,
    maturityDate: '2030-03-20',
    riskRating: 'AAA',
    loanType: 'Syndicated',
    isGreen: true,
    greenCategory: 'Sustainable Transport',
    status: 'Available',
    sector: 'Infrastructure',
    originatingBank: 'BNP Paribas',
    defaultProbability: 0.3
  },
  {
    id: 'LN-003',
    borrower: 'Atlas Manufacturing Ltd',
    borrowerType: 'Corporate',
    amount: 75000000,
    currency: 'GBP',
    interestRate: 6.10,
    maturityDate: '2026-09-30',
    riskRating: 'BBB',
    loanType: 'Revolving Credit',
    isGreen: false,
    status: 'Available',
    sector: 'Manufacturing',
    originatingBank: 'Barclays',
    defaultProbability: 3.2
  },
  {
    id: 'LN-004',
    borrower: 'SunTech Solar Holdings',
    borrowerType: 'Corporate',
    amount: 200000000,
    currency: 'USD',
    interestRate: 4.90,
    maturityDate: '2029-12-01',
    riskRating: 'A',
    loanType: 'Term Loan',
    isGreen: true,
    greenCategory: 'Solar Energy',
    status: 'Available',
    sector: 'Energy',
    originatingBank: 'HSBC',
    defaultProbability: 1.5
  },
  {
    id: 'LN-005',
    borrower: 'Metro Real Estate REIT',
    borrowerType: 'Real Estate',
    amount: 120000000,
    currency: 'EUR',
    interestRate: 5.50,
    maturityDate: '2027-04-15',
    riskRating: 'A',
    loanType: 'Bridge Loan',
    isGreen: false,
    status: 'Pending',
    sector: 'Real Estate',
    originatingBank: 'Société Générale',
    defaultProbability: 2.1
  },
  {
    id: 'LN-006',
    borrower: 'GreenBuild Construction',
    borrowerType: 'SME',
    amount: 25000000,
    currency: 'GBP',
    interestRate: 7.25,
    maturityDate: '2026-01-10',
    riskRating: 'BB',
    loanType: 'Term Loan',
    isGreen: true,
    greenCategory: 'Green Buildings',
    status: 'Available',
    sector: 'Construction',
    originatingBank: 'Lloyds',
    defaultProbability: 5.8
  },
  {
    id: 'LN-007',
    borrower: 'Oceanic Shipping PLC',
    borrowerType: 'Corporate',
    amount: 180000000,
    currency: 'USD',
    interestRate: 5.80,
    maturityDate: '2028-08-22',
    riskRating: 'BBB',
    loanType: 'Syndicated',
    isGreen: false,
    status: 'Available',
    sector: 'Transportation',
    originatingBank: 'Citi',
    defaultProbability: 2.9
  },
  {
    id: 'LN-008',
    borrower: 'WindPower Europe GmbH',
    borrowerType: 'Infrastructure',
    amount: 350000000,
    currency: 'EUR',
    interestRate: 4.50,
    maturityDate: '2031-05-30',
    riskRating: 'AA',
    loanType: 'Term Loan',
    isGreen: true,
    greenCategory: 'Wind Energy',
    status: 'Available',
    sector: 'Energy',
    originatingBank: 'Commerzbank',
    defaultProbability: 0.6
  }
];

export const mockTrades: Trade[] = [
  {
    id: 'TR-001',
    loanId: 'LN-001',
    loanBorrower: 'Meridian Energy Corp',
    seller: 'Deutsche Bank',
    buyer: 'BlackRock',
    amount: 50000000,
    price: 99.75,
    timestamp: new Date('2024-12-20T14:30:00'),
    status: 'Completed'
  },
  {
    id: 'TR-002',
    loanId: 'LN-002',
    loanBorrower: 'Nordic Infrastructure AS',
    seller: 'BNP Paribas',
    buyer: 'Allianz',
    amount: 100000000,
    price: 100.25,
    timestamp: new Date('2024-12-19T10:15:00'),
    status: 'Completed'
  },
  {
    id: 'TR-003',
    loanId: 'LN-004',
    loanBorrower: 'SunTech Solar Holdings',
    seller: 'HSBC',
    buyer: 'Fidelity',
    amount: 75000000,
    price: 99.50,
    timestamp: new Date('2024-12-18T16:45:00'),
    status: 'Completed'
  }
];

export const mockAuditTrail: AuditEntry[] = [
  {
    id: 'AUD-001',
    timestamp: new Date('2024-12-20T14:30:00'),
    action: 'TRADE_EXECUTED',
    actor: 'BlackRock',
    details: 'Purchased $50M of Meridian Energy Corp loan from Deutsche Bank at 99.75',
    loanId: 'LN-001',
    tradeId: 'TR-001'
  },
  {
    id: 'AUD-002',
    timestamp: new Date('2024-12-20T14:29:00'),
    action: 'COMPLIANCE_CHECK',
    actor: 'System',
    details: 'KYC and AML checks passed for BlackRock trade',
    loanId: 'LN-001'
  },
  {
    id: 'AUD-003',
    timestamp: new Date('2024-12-19T10:15:00'),
    action: 'TRADE_EXECUTED',
    actor: 'Allianz',
    details: 'Purchased €100M of Nordic Infrastructure AS loan from BNP Paribas at 100.25',
    loanId: 'LN-002',
    tradeId: 'TR-002'
  },
  {
    id: 'AUD-004',
    timestamp: new Date('2024-12-19T09:00:00'),
    action: 'LOAN_LISTED',
    actor: 'BNP Paribas',
    details: 'Listed Nordic Infrastructure AS syndicated loan for trading',
    loanId: 'LN-002'
  },
  {
    id: 'AUD-005',
    timestamp: new Date('2024-12-18T16:45:00'),
    action: 'TRADE_EXECUTED',
    actor: 'Fidelity',
    details: 'Purchased $75M of SunTech Solar Holdings loan from HSBC at 99.50',
    loanId: 'LN-004',
    tradeId: 'TR-003'
  },
  {
    id: 'AUD-006',
    timestamp: new Date('2024-12-18T11:30:00'),
    action: 'PRICE_UPDATED',
    actor: 'Market Maker',
    details: 'Price updated for Atlas Manufacturing Ltd loan: 98.25 → 98.50',
    loanId: 'LN-003'
  }
];

export const mockComplianceChecks: ComplianceCheck[] = [
  { id: 'CC-001', loanId: 'LN-001', checkType: 'KYC Verification', status: 'Passed', details: 'All counterparty identities verified', timestamp: new Date('2024-12-20T14:28:00') },
  { id: 'CC-002', loanId: 'LN-001', checkType: 'AML Screening', status: 'Passed', details: 'No sanctions or PEP matches found', timestamp: new Date('2024-12-20T14:28:30') },
  { id: 'CC-003', loanId: 'LN-001', checkType: 'Credit Limit Check', status: 'Passed', details: 'Within approved credit limits', timestamp: new Date('2024-12-20T14:29:00') },
  { id: 'CC-004', loanId: 'LN-006', checkType: 'Risk Assessment', status: 'Failed', details: 'Default probability exceeds threshold (5.8% > 5%)', timestamp: new Date('2024-12-19T08:00:00') },
  { id: 'CC-005', loanId: 'LN-003', checkType: 'Documentation Review', status: 'Pending', details: 'Awaiting updated financial statements', timestamp: new Date('2024-12-18T15:00:00') }
];
