import { TrendingUp, DollarSign, BarChart3, Leaf } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const volumeData = [
  { month: 'Jul', volume: 2.4, trades: 45 },
  { month: 'Aug', volume: 3.1, trades: 52 },
  { month: 'Sep', volume: 2.8, trades: 48 },
  { month: 'Oct', volume: 3.5, trades: 61 },
  { month: 'Nov', volume: 4.2, trades: 73 },
  { month: 'Dec', volume: 4.8, trades: 82 },
];

const sectorData = [
  { name: 'Energy', value: 35, color: '#3b82f6' },
  { name: 'Infrastructure', value: 25, color: '#10b981' },
  { name: 'Real Estate', value: 20, color: '#f59e0b' },
  { name: 'Manufacturing', value: 12, color: '#8b5cf6' },
  { name: 'Other', value: 8, color: '#6b7280' },
];

const ratingData = [
  { rating: 'AAA', count: 12, yield: 4.2 },
  { rating: 'AA', count: 18, yield: 4.8 },
  { rating: 'A', count: 25, yield: 5.3 },
  { rating: 'BBB', count: 15, yield: 5.9 },
  { rating: 'BB', count: 8, yield: 6.8 },
];

const stats = [
  { label: 'Total Volume (YTD)', value: '$20.8B', change: '+18%', icon: DollarSign, color: 'blue' },
  { label: 'Active Trades', value: '361', change: '+24%', icon: TrendingUp, color: 'green' },
  { label: 'Avg. Yield', value: '5.32%', change: '-0.15%', icon: BarChart3, color: 'purple' },
  { label: 'Green Loans', value: '34%', change: '+8%', icon: Leaf, color: 'emerald' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Market Analytics</h1>
        <p className="text-slate-500">Real-time insights into loan trading activity</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Trading Volume Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v}B`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                formatter={(value: number) => [`$${value}B`, 'Volume']}
              />
              <Area type="monotone" dataKey="volume" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Sector Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {sectorData.map((sector) => (
              <div key={sector.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                <span className="text-xs text-slate-600">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Yield by Credit Rating</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="rating" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${v}%`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              formatter={(value: number) => [`${value}%`, 'Avg. Yield']}
            />
            <Bar dataKey="yield" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
