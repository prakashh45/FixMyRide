import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { TrendingUp, DollarSign, CheckCircle, Users, Download } from 'lucide-react';

const stats = [
  { label: 'Total Revenue',   value: '$42,500', change: '+12%', icon: DollarSign,  color: 'text-green-600',  bg: 'bg-green-50'  },
  { label: 'Jobs Completed',  value: '184',     change: '+8%',  icon: CheckCircle, color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { label: 'New Customers',   value: '36',      change: '+5%',  icon: Users,       color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Avg Revenue/Job', value: '$231',    change: '+3%',  icon: TrendingUp,  color: 'text-orange-600', bg: 'bg-orange-50' },
];

const monthly = [
  { month: 'Jun', revenue: 4800, jobs: 20 },
  { month: 'Jul', revenue: 5200, jobs: 22 },
  { month: 'Aug', revenue: 6100, jobs: 26 },
  { month: 'Sep', revenue: 5800, jobs: 24 },
  { month: 'Oct', revenue: 7400, jobs: 31 },
  { month: 'Nov', revenue: 6900, jobs: 29 },
];

const topMechanics = [
  { name: 'Harvey Specter', jobs: 42, revenue: '$9,702', rating: 4.9 },
  { name: 'Mike Ross',      jobs: 38, revenue: '$8,778', rating: 4.8 },
  { name: 'Donna Paulsen',  jobs: 35, revenue: '$8,085', rating: 4.7 },
  { name: 'Sarah Connor',   jobs: 31, revenue: '$7,161', rating: 4.6 },
];

const serviceTypes = [
  { type: 'Oil Change',          count: 54, pct: 70 },
  { type: 'Brake Service',       count: 38, pct: 50 },
  { type: 'Engine Repair',       count: 27, pct: 35 },
  { type: 'AC Service',          count: 22, pct: 28 },
  { type: 'Transmission',        count: 18, pct: 23 },
];

export default function Reports() {
  const maxRevenue = Math.max(...monthly.map(m => m.revenue));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />

        <div className="p-6 flex-1 overflow-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Reports</h1>
              <p className="text-xs text-gray-400 mt-0.5">Business performance overview</p>
            </div>
            <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Download size={15} /> Export Report
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={18} className={color} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
                <div className="text-xs text-gray-400">{label}</div>
                <div className="text-xs text-green-600 font-semibold mt-1">{change} this month</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-5">

            {/* Bar Chart - Revenue */}
            <div className="col-span-2 bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-gray-900">Monthly Revenue</h2>
                <span className="text-xs text-gray-400">Last 6 months</span>
              </div>
              <div className="flex items-end gap-4 h-44">
                {monthly.map(m => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500">${(m.revenue / 1000).toFixed(1)}k</span>
                    <div className="w-full relative rounded-t-lg overflow-hidden bg-blue-100"
                      style={{ height: `${(m.revenue / maxRevenue) * 130}px` }}>
                      <div className="absolute inset-0 bg-blue-600 rounded-t-lg" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Types */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Top Services</h2>
              <div className="flex flex-col gap-3">
                {serviceTypes.map(s => (
                  <div key={s.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">{s.type}</span>
                      <span className="text-xs text-gray-400">{s.count} jobs</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Mechanics Table */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="text-sm font-bold text-gray-900">Top Performing Mechanics</h2>
            </div>
            <div className="grid grid-cols-[40px_1fr_100px_120px_100px] px-5 py-2.5 bg-gray-50 border-b border-gray-100">
              {['#', 'Mechanic', 'Jobs Done', 'Revenue', 'Rating'].map(h => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {topMechanics.map((m, i) => (
              <div key={m.name} className="grid grid-cols-[40px_1fr_100px_120px_100px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                <span className={`text-sm font-bold ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-gray-300'}`}>
                  #{i + 1}
                </span>
                <span className="text-sm font-semibold text-gray-900">{m.name}</span>
                <span className="text-sm text-gray-700">{m.jobs}</span>
                <span className="text-sm font-semibold text-green-600">{m.revenue}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-semibold text-gray-700">{m.rating}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}