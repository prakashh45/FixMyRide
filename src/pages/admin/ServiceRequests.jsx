import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Search, CheckCircle, X, Eye, Clock } from 'lucide-react';

const initRequests = [
  { id: 'SR001', customer: 'Emily Davis',   vehicle: 'BMW X5',       problem: 'Brake pad replacement and rotor check needed urgently', date: 'Oct 24, 2023', status: 'Pending',  phone: '+1 567 890 123' },
  { id: 'SR002', customer: 'Chris Evans',   vehicle: 'Audi A4',      problem: 'Transmission noise at high speeds, needs inspection',   date: 'Oct 23, 2023', status: 'Pending',  phone: '+1 678 901 234' },
  { id: 'SR003', customer: 'Raj Patil',     vehicle: 'Hyundai Creta',problem: 'AC not cooling properly, need full AC service',         date: 'Oct 22, 2023', status: 'Approved', phone: '+91 987 654 321' },
  { id: 'SR004', customer: 'Pooja Desai',   vehicle: 'Maruti Swift',  problem: 'Car vibrates at high speed, wheel alignment check',    date: 'Oct 21, 2023', status: 'Rejected', phone: '+91 876 543 210' },
  { id: 'SR005', customer: 'Vikram Joshi',  vehicle: 'Tata Nexon',   problem: 'Engine light on, need full diagnostic scan',            date: 'Oct 20, 2023', status: 'Approved', phone: '+91 765 432 109' },
];

const statusStyle = {
  Pending:  'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
};

function DetailModal({ req, onClose, onApprove, onReject }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[460px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Request Details</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="flex flex-col gap-3 mb-5">
          {[
            { label: 'Request ID', value: req.id },
            { label: 'Customer',   value: req.customer },
            { label: 'Phone',      value: req.phone },
            { label: 'Vehicle',    value: req.vehicle },
            { label: 'Date',       value: req.date },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
              <span className="text-sm font-medium text-gray-900">{value}</span>
            </div>
          ))}
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">Problem Description</span>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{req.problem}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</span>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyle[req.status]}`}>{req.status}</span>
          </div>
        </div>
        {req.status === 'Pending' && (
          <div className="flex gap-3">
            <button onClick={() => { onReject(req.id); onClose(); }} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50">Reject</button>
            <button onClick={() => { onApprove(req.id); onClose(); }} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">Approve</button>
          </div>
        )}
        {req.status !== 'Pending' && (
          <button onClick={onClose} className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Close</button>
        )}
      </div>
    </div>
  );
}

export default function ServiceRequests() {
  const [requests, setRequests] = useState(initRequests);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('All');
  const [selected, setSelected] = useState(null);
  const [toast, setToast]       = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleApprove = (id) => {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: 'Approved' } : x));
    showToast('✅ Request Approved!');
  };
  const handleReject = (id) => {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: 'Rejected' } : x));
    showToast('❌ Request Rejected');
  };

  const filtered = requests.filter(r =>
    (filter === 'All' || r.status === filter) &&
    (r.customer.toLowerCase().includes(search.toLowerCase()) ||
     r.vehicle.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = {
    All:      requests.length,
    Pending:  requests.filter(r => r.status === 'Pending').length,
    Approved: requests.filter(r => r.status === 'Approved').length,
    Rejected: requests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        {toast && <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">{toast}</div>}

        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-5">
            <h1 className="text-lg font-bold text-gray-900">Service Requests</h1>
            <p className="text-xs text-gray-400 mt-0.5">{counts.Pending} pending approval</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Total',    count: counts.All,      bg: 'bg-gray-50',    text: 'text-gray-700',   icon: <Clock size={18} className="text-gray-500" /> },
              { label: 'Pending',  count: counts.Pending,  bg: 'bg-yellow-50',  text: 'text-yellow-700', icon: <Clock size={18} className="text-yellow-500" /> },
              { label: 'Approved', count: counts.Approved, bg: 'bg-green-50',   text: 'text-green-700',  icon: <CheckCircle size={18} className="text-green-500" /> },
              { label: 'Rejected', count: counts.Rejected, bg: 'bg-red-50',     text: 'text-red-600',    icon: <X size={18} className="text-red-500" /> },
            ].map(({ label, count, bg, text, icon }) => (
              <div key={label} className={`${bg} rounded-2xl p-4 flex items-center gap-3`}>
                {icon}
                <div>
                  <div className={`text-2xl font-bold ${text}`}>{count}</div>
                  <div className="text-xs text-gray-400">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer or vehicle..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-blue-400" />
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_1fr_2fr_120px_100px_130px] px-5 py-3 bg-gray-50 border-b border-gray-100">
              {['ID', 'Customer', 'Vehicle', 'Problem', 'Date', 'Status', 'Actions'].map(h => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No requests found</div>}
            {filtered.map(req => (
              <div key={req.id} className="grid grid-cols-[80px_1fr_1fr_2fr_120px_100px_130px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                <span className="text-xs font-semibold text-gray-400">{req.id}</span>
                <span className="text-sm font-semibold text-gray-900">{req.customer}</span>
                <span className="text-sm text-gray-700">{req.vehicle}</span>
                <span className="text-sm text-blue-500 truncate pr-3" title={req.problem}>{req.problem}</span>
                <span className="text-sm text-gray-500">{req.date}</span>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusStyle[req.status]}`}>{req.status}</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setSelected(req)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors"><Eye size={13} /></button>
                  {req.status === 'Pending' && <>
                    <button onClick={() => handleApprove(req.id)} className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">✓</button>
                    <button onClick={() => handleReject(req.id)} className="px-2.5 py-1.5 border border-gray-200 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors">✕</button>
                  </>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <DetailModal req={selected} onClose={() => setSelected(null)} onApprove={handleApprove} onReject={handleReject} />}
    </div>
  );
}