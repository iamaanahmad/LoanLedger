import { useState } from 'react';
import { X, Download, FileText, Mail, CheckCircle } from 'lucide-react';
import { Loan, Trade, AuditEntry } from '../types';

interface ExportReportProps {
  loans: Loan[];
  trades: Trade[];
  auditTrail: AuditEntry[];
  onClose: () => void;
}

export default function ExportReport({ loans, trades, auditTrail, onClose }: ExportReportProps) {
  const [reportType, setReportType] = useState<'portfolio' | 'audit' | 'compliance'>('portfolio');
  const [format, setFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [exported, setExported] = useState(false);

  const generateCSV = () => {
    if (reportType === 'portfolio') {
      const headers = ['ID', 'Borrower', 'Amount', 'Currency', 'Interest Rate', 'Rating', 'Maturity', 'Sector', 'Green', 'Status'];
      const rows = loans.map(l => [
        l.id, l.borrower, l.amount, l.currency, l.interestRate, l.riskRating, l.maturityDate, l.sector, l.isGreen ? 'Yes' : 'No', l.status
      ]);
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    } else if (reportType === 'audit') {
      const headers = ['ID', 'Timestamp', 'Action', 'Actor', 'Details', 'Loan ID', 'Trade ID'];
      const rows = auditTrail.map(a => [
        a.id, a.timestamp.toISOString(), a.action, a.actor, `"${a.details}"`, a.loanId || '', a.tradeId || ''
      ]);
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    } else {
      const headers = ['Loan ID', 'Borrower', 'Risk Rating', 'Default Probability', 'Status'];
      const rows = loans.map(l => [l.id, l.borrower, l.riskRating, `${l.defaultProbability}%`, l.status]);
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  };

  const generateJSON = () => {
    const reportData = {
      reportType,
      generatedAt: new Date().toISOString(),
      generatedBy: 'LoanLedger Platform',
      summary: {
        totalLoans: loans.length,
        totalValue: loans.reduce((s, l) => s + l.amount, 0),
        greenLoans: loans.filter(l => l.isGreen).length,
        avgInterestRate: (loans.reduce((s, l) => s + l.interestRate, 0) / loans.length).toFixed(2),
        recentTrades: trades.length,
        auditEntries: auditTrail.length
      },
      data: reportType === 'portfolio' 
        ? loans.map(l => ({
            id: l.id, borrower: l.borrower, amount: l.amount, currency: l.currency,
            interestRate: l.interestRate, riskRating: l.riskRating, maturityDate: l.maturityDate,
            sector: l.sector, loanType: l.loanType, isGreen: l.isGreen, greenCategory: l.greenCategory,
            originatingBank: l.originatingBank, defaultProbability: l.defaultProbability, status: l.status
          }))
        : reportType === 'audit'
        ? auditTrail.map(a => ({
            id: a.id, timestamp: a.timestamp.toISOString(), action: a.action,
            actor: a.actor, details: a.details, loanId: a.loanId, tradeId: a.tradeId
          }))
        : loans.map(l => ({
            id: l.id, borrower: l.borrower, riskRating: l.riskRating,
            defaultProbability: l.defaultProbability, status: l.status,
            complianceStatus: l.defaultProbability > 5 ? 'Review Required' : 'Cleared'
          }))
    };
    return JSON.stringify(reportData, null, 2);
  };

  const generatePDFContent = () => {
    // Generate HTML that can be printed as PDF
    const title = reportType === 'portfolio' ? 'Portfolio Summary Report' 
      : reportType === 'audit' ? 'Audit Trail Report' : 'Compliance Report';
    
    let tableRows = '';
    if (reportType === 'portfolio') {
      tableRows = loans.map(l => `
        <tr>
          <td>${l.id}</td>
          <td>${l.borrower}</td>
          <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: l.currency }).format(l.amount)}</td>
          <td>${l.interestRate}%</td>
          <td>${l.riskRating}</td>
          <td>${l.isGreen ? '✓ Green' : '-'}</td>
        </tr>
      `).join('');
    } else if (reportType === 'audit') {
      tableRows = auditTrail.map(a => `
        <tr>
          <td>${a.timestamp.toLocaleString()}</td>
          <td>${a.action}</td>
          <td>${a.actor}</td>
          <td>${a.details}</td>
        </tr>
      `).join('');
    } else {
      tableRows = loans.map(l => `
        <tr>
          <td>${l.borrower}</td>
          <td>${l.riskRating}</td>
          <td>${l.defaultProbability}%</td>
          <td style="color: ${l.defaultProbability > 5 ? 'red' : 'green'}">${l.defaultProbability > 5 ? 'Review Required' : 'Cleared'}</td>
        </tr>
      `).join('');
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - LoanLedger</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .summary { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
          .summary-item { text-align: center; }
          .summary-value { font-size: 24px; font-weight: bold; color: #1e40af; }
          .summary-label { font-size: 12px; color: #64748b; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
          th { background: #1e40af; color: white; }
          tr:hover { background: #f8fafc; }
          .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 ${title}</h1>
          <div>Generated: ${new Date().toLocaleString()}</div>
        </div>
        <div class="summary">
          <div class="summary-grid">
            <div class="summary-item">
              <div class="summary-value">${loans.length}</div>
              <div class="summary-label">Total Loans</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">$${(loans.reduce((s, l) => s + l.amount, 0) / 1e9).toFixed(2)}B</div>
              <div class="summary-label">Total Value</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">${loans.filter(l => l.isGreen).length}</div>
              <div class="summary-label">Green Loans</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">${auditTrail.length}</div>
              <div class="summary-label">Audit Entries</div>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              ${reportType === 'portfolio' 
                ? '<th>ID</th><th>Borrower</th><th>Amount</th><th>Rate</th><th>Rating</th><th>Green</th>'
                : reportType === 'audit'
                ? '<th>Timestamp</th><th>Action</th><th>Actor</th><th>Details</th>'
                : '<th>Borrower</th><th>Rating</th><th>Default Prob.</th><th>Status</th>'}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <div class="footer">
          <p>Generated by LoanLedger - Transparent Loan Trading Platform</p>
          <p>This report is for informational purposes. All data is immutably recorded on the audit trail.</p>
        </div>
      </body>
      </html>
    `;
  };

  const handleExport = () => {
    let content: string;
    let mimeType: string;
    let extension: string;

    if (format === 'json') {
      content = generateJSON();
      mimeType = 'application/json';
      extension = 'json';
    } else if (format === 'csv') {
      content = generateCSV();
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      // PDF - open in new window for printing
      content = generatePDFContent();
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
      }
      setExported(true);
      return;
    }

    // Download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loanledger-${reportType}-report-${new Date().toISOString().split('T')[0]}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">Export Report</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5">
          {!exported ? (
            <>
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'portfolio', label: 'Portfolio Summary' },
                    { id: 'audit', label: 'Audit Trail' },
                    { id: 'compliance', label: 'Compliance Report' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setReportType(type.id as typeof reportType)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        reportType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
                <div className="flex gap-2">
                  {[
                    { id: 'pdf', label: 'PDF', desc: 'Print-ready' },
                    { id: 'csv', label: 'CSV', desc: 'Excel/Sheets' },
                    { id: 'json', label: 'JSON', desc: 'API/Data' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id as typeof format)}
                      className={`flex-1 p-3 rounded-lg border text-center transition-colors ${
                        format === f.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`block font-semibold uppercase text-sm ${format === f.id ? 'text-blue-700' : 'text-slate-700'}`}>
                        {f.label}
                      </span>
                      <span className="text-xs text-slate-500">{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-5">
                <h4 className="font-medium text-slate-900 mb-2">Report Preview</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• {loans.length} loans in portfolio</li>
                  <li>• ${(loans.reduce((s, l) => s + l.amount, 0) / 1e9).toFixed(2)}B total value</li>
                  <li>• {auditTrail.length} audit entries</li>
                  <li>• Generated: {new Date().toLocaleDateString()}</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {format === 'pdf' ? 'Generate & Print PDF' : `Download ${format.toUpperCase()}`}
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Report Generated</h3>
              <p className="text-slate-500 mb-4">
                Your {reportType} report ({format.toUpperCase()}) has been {format === 'pdf' ? 'opened for printing' : 'downloaded'}.
              </p>
              <p className="text-sm text-slate-400">
                Ready for regulators, investors, or internal review.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setExported(false)}
                  className="flex-1 px-6 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                >
                  Export Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
