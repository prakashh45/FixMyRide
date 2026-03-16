import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import {
  Car, ClipboardList, CheckCircle, DollarSign,
  Users, Package, BarChart2, Plus, X, ChevronRight, Wrench
} from 'lucide-react';

const stats = [
  { label: 'Serviced Today',     value: '24',     icon: Car,           bg: 'bg-blue-50',   iconBg: 'bg-blue-100',   iconColor: 'text-blue-500' },
  { label: 'Active Job Cards',   value: '12',     icon: ClipboardList, bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-500' },
  { label: 'Completed Services', value: '18',     icon: CheckCircle,   bg: 'bg-green-50',  iconBg: 'bg-green-100',  iconColor: 'text-green-500' },
  { label: 'Total Revenue',      value: '$4,250', icon: DollarSign,    bg: 'bg-blue-50',   iconBg: 'bg-blue-100',   iconColor: 'text-blue-500' },
];

const initActivity = [
  { id: '#JC-8821', vehicle: 'Toyota Camry', customer: 'John Doe',     status: 'Completed',   mechanic: 'Mike Ross' },
  { id: '#JC-8822', vehicle: 'Honda Civic',  customer: 'Jane Smith',   status: 'In Progress', mechanic: 'Sarah Connor' },
  { id: '#JC-8823', vehicle: 'Ford F-150',   customer: 'Robert Brown', status: 'Pending',     mechanic: 'Harvey Specter' },
];

const initRequests = [
  { id: 1, customer: 'Emily Davis', vehicle: 'BMW X5',  problem: 'Brake pad replacement and rotor check needed urgently', date: 'Oct 24, 2023' },
  { id: 2, customer: 'Chris Evans', vehicle: 'Audi A4', problem: 'Transmission noise at high speeds, needs inspection',   date: 'Oct 23, 2023' },
];

const mechanics = [
  { name: 'Mike Ross',      jobs: 3, total: 5, color: 'bg-blue-500' },
  { name: 'Sarah Connor',   jobs: 5, total: 5, color: 'bg-red-500'  },
  { name: 'Harvey Specter', jobs: 1, total: 5, color: 'bg-green-500' },
];

const statusStyle = {
  'Completed':   'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Pending':     'bg-gray-100 text-gray-500',
};

function NewJobCardModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ vehicle: '', customer: '', mechanic: '', task: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[440px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">New Job Card</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {[
            { label: 'Vehicle',  key: 'vehicle',  placeholder: 'e.g. Toyota Camry' },
            { label: 'Customer', key: 'customer', placeholder: 'e.g. John Doe' },
            { label: 'Mechanic', key: 'mechanic', placeholder: 'e.g. Mike Ross' },
            { label: 'Task',     key: 'task',     placeholder: 'e.g. Oil Change' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
              <input
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400"
              />
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold">Create Job Card</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activity, setActivity]   = useState(initActivity);
  const [requests, setRequests]   = useState(initRequests);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]         = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRequest = (id, action) => {
    setRequests(r => r.filter(req => req.id !== id));
    showToast(action === 'approve' ? '✅ Request Approved!' : '❌ Request Rejected');
  };

  const handleAddJob = (form) => {
    const newId = `#JC-${8824 + activity.length}`;
    setActivity(a => [...a, { id: newId, vehicle: form.vehicle, customer: form.customer, status: 'Pending', mechanic: form.mechanic }]);
    showToast(`✅ Job Card ${newId} Created!`);
  };

  const cycleStatus = (id) => {
    const order = ['Pending', 'In Progress', 'Completed'];
    setActivity(a => a.map(job =>
      job.id === id ? { ...job, status: order[(order.indexOf(job.status) + 1) % order.length] } : job
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />

        {toast && (
          <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">
            {toast}
          </div>
        )}

        <div className="flex flex-1 overflow-auto gap-5 p-6">

          {/* Left */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map(({ label, value, icon: Icon, bg, iconBg, iconColor }) => (
                <div key={label} className={`${bg} rounded-2xl p-4 flex items-center gap-4`}>
                  <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="text-2xl font-bold text-gray-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Activity */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h2 className="text-base font-bold text-gray-900">Service Activity</h2>
                <button onClick={() => navigate('/admin/job-cards')} className="text-sm text-blue-600 font-medium flex items-center gap-1">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-[110px_1fr_1fr_140px_1fr_100px] px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                {['JOB CARD ID', 'VEHICLE', 'CUSTOMER', 'STATUS', 'MECHANIC', 'ACTION'].map(h => (
                  <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
                ))}
              </div>
              {activity.map(row => (
                <div key={row.id} className="grid grid-cols-[110px_1fr_1fr_140px_1fr_100px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50">
                  <span className="text-sm font-semibold text-gray-900">{row.id}</span>
                  <span className="text-sm text-gray-700">{row.vehicle}</span>
                  <span className="text-sm text-gray-700">{row.customer}</span>
                  <span onClick={() => cycleStatus(row.id)} className={`inline-flex text-xs font-semibold px-3 py-1.5 rounded-full w-fit cursor-pointer ${statusStyle[row.status]}`}>
                    {row.status}
                  </span>
                  <span className="text-sm text-gray-700">{row.mechanic}</span>
                  <button onClick={() => cycleStatus(row.id)} className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">
                    Update
                  </button>
                </div>
              ))}
            </div>

            {/* Service Requests */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h2 className="text-base font-bold text-gray-900">Recent Service Requests</h2>
                <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full">{requests.length} Pending</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr_2fr_120px_130px] px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                {['CUSTOMER', 'VEHICLE', 'PROBLEM', 'DATE', 'ACTIONS'].map(h => (
                  <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
                ))}
              </div>
              {requests.map(req => (
                <div key={req.id} className="grid grid-cols-[1fr_1fr_2fr_120px_130px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-900">{req.customer}</span>
                  <span className="text-sm text-gray-700">{req.vehicle}</span>
                  <span className="text-sm text-blue-500 truncate pr-4">{req.problem}</span>
                  <span className="text-sm text-gray-500">{req.date}</span>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => handleRequest(req.id, 'approve')} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg">Approve</button>
                    <button onClick={() => handleRequest(req.id, 'reject')} className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:text-red-500">Reject</button>
                  </div>
                </div>
              ))}
              {requests.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No pending requests</div>}
            </div>

          </div>

          {/* Right */}
          <div className="w-72 flex flex-col gap-4 flex-shrink-0">

            {/* Mechanic Workload */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">Mechanic Workload</h2>
              {mechanics.map(m => (
                <div key={m.name} className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-800">{m.name}</span>
                    <span className="text-xs text-gray-400">{m.jobs}/{m.total} Jobs</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`${m.color} h-2 rounded-full`} style={{ width: `${(m.jobs / m.total) * 100}%` }} />
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('/admin/mechanics')} className="mt-2 w-full flex items-center justify-center gap-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 py-2 rounded-xl">
                <Users size={15} /> Manage Mechanics
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: Users,     label: 'New\nCustomer', path: '/admin/customers' },
                  { icon: Wrench,    label: 'Add\nMechanic', path: '/admin/mechanics' },
                  { icon: BarChart2, label: 'View\nReports', path: '/admin/reports'   },
                  { icon: Package,   label: 'Inventory',     path: '/admin/inventory' },
                ].map(({ icon: Icon, label, path }) => (
                  <button key={label} onClick={() => navigate(path)} className="bg-blue-50 hover:bg-blue-100 flex flex-col items-center gap-2 py-4 rounded-xl transition-all">
                    <Icon size={22} className="text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700 text-center whitespace-pre-line">{label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowModal(true)} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl">
                <Plus size={18} /> New Job Card
              </button>
            </div>

          </div>
        </div>
      </div>

      {showModal && <NewJobCardModal onClose={() => setShowModal(false)} onAdd={handleAddJob} />}
    </div>
  );
}