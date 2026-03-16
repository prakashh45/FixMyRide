import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Plus, Search, X, Pencil, Trash2, Eye } from 'lucide-react';

const initJobs = [
  { id: '#JC-8821', vehicle: 'Toyota Camry',  plate: 'ABC-1234', customer: 'John Doe',     mechanic: 'Mike Ross',      task: 'Engine Oil Change',       priority: 'HIGH',   status: 'Completed',   date: 'Oct 24, 2023', amount: '$85' },
  { id: '#JC-8822', vehicle: 'Honda Civic',   plate: 'XYZ-5678', customer: 'Jane Smith',   mechanic: 'Sarah Connor',   task: 'Brake Pad Replacement',   priority: 'MEDIUM', status: 'In Progress', date: 'Oct 24, 2023', amount: '$150' },
  { id: '#JC-8823', vehicle: 'Ford F-150',    plate: 'KRR-9012', customer: 'Robert Brown', mechanic: 'Harvey Specter', task: 'Full Transmission Flush', priority: 'LOW',    status: 'Pending',     date: 'Oct 23, 2023', amount: '$220' },
  { id: '#JC-8824', vehicle: 'BMW X5',        plate: 'MH-2341',  customer: 'Emily Davis',  mechanic: 'Donna Paulsen',  task: 'AC Gas Refill',           priority: 'MEDIUM', status: 'Pending',     date: 'Oct 23, 2023', amount: '$95' },
  { id: '#JC-8825', vehicle: 'Audi A4',       plate: 'DL-5566',  customer: 'Chris Evans',  mechanic: 'Mike Ross',      task: 'Wheel Alignment',         priority: 'LOW',    status: 'Completed',   date: 'Oct 22, 2023', amount: '$60' },
];

const priorityStyle = {
  HIGH:   'bg-red-100 text-red-600',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW:    'bg-green-100 text-green-600',
};
const statusStyle = {
  'Completed':   'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Pending':     'bg-gray-100 text-gray-500',
};

const emptyForm = { vehicle: '', plate: '', customer: '', mechanic: '', task: '', priority: 'MEDIUM', status: 'Pending', amount: '' };

function Modal({ title, form, setForm, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Vehicle',  key: 'vehicle',  placeholder: 'e.g. Toyota Camry', col: 1 },
            { label: 'Reg Plate',key: 'plate',    placeholder: 'e.g. ABC-1234',     col: 1 },
            { label: 'Customer', key: 'customer', placeholder: 'e.g. John Doe',     col: 1 },
            { label: 'Mechanic', key: 'mechanic', placeholder: 'e.g. Mike Ross',    col: 1 },
            { label: 'Task',     key: 'task',     placeholder: 'e.g. Oil Change',   col: 2 },
            { label: 'Amount ($)',key:'amount',   placeholder: 'e.g. 85',           col: 1 },
          ].map(({ label, key, placeholder, col }) => (
            <div key={key} className={col === 2 ? 'col-span-2' : ''}>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
              <input placeholder={placeholder} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Priority</label>
            <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
              <option>HIGH</option><option>MEDIUM</option><option>LOW</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
              <option>Pending</option><option>In Progress</option><option>Completed</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Cancel</button>
          <button onClick={onSave} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function JobCards() {
  const [jobs, setJobs]       = useState(initJobs);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(emptyForm);
  const [editId, setEditId]   = useState(null);
  const [toast, setToast]     = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = jobs.filter(j =>
    (filter === 'All' || j.status === filter) &&
    (j.id.toLowerCase().includes(search.toLowerCase()) ||
     j.vehicle.toLowerCase().includes(search.toLowerCase()) ||
     j.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    if (!form.vehicle || !form.customer) return;
    const newId = `#JC-${8826 + jobs.length}`;
    setJobs(j => [...j, { id: newId, ...form, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }]);
    setModal(null); setForm(emptyForm);
    showToast(`✅ Job Card ${newId} Created!`);
  };

  const handleEdit = () => {
    setJobs(j => j.map(x => x.id === editId ? { ...x, ...form } : x));
    setModal(null); setForm(emptyForm); setEditId(null);
    showToast('✅ Job Card Updated!');
  };

  const handleDelete = (id) => { setJobs(j => j.filter(x => x.id !== id)); showToast('🗑️ Job Card Deleted!'); };

  const openEdit = (job) => {
    setForm({ vehicle: job.vehicle, plate: job.plate, customer: job.customer, mechanic: job.mechanic, task: job.task, priority: job.priority, status: job.status, amount: job.amount });
    setEditId(job.id); setModal('edit');
  };

  const cycleStatus = (id) => {
    const order = ['Pending', 'In Progress', 'Completed'];
    setJobs(j => j.map(x => x.id === id ? { ...x, status: order[(order.indexOf(x.status) + 1) % order.length] } : x));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        {toast && <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">{toast}</div>}

        <div className="p-6 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Job Cards</h1>
              <p className="text-xs text-gray-400 mt-0.5">{jobs.length} total job cards</p>
            </div>
            <button onClick={() => { setForm(emptyForm); setModal('add'); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
              <Plus size={16} /> New Job Card
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID, vehicle, customer..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-blue-400" />
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {['All', 'Pending', 'In Progress', 'Completed'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_90px_120px_80px_100px] px-5 py-3 bg-gray-50 border-b border-gray-100">
              {['Job ID', 'Vehicle', 'Customer', 'Mechanic', 'Task', 'Priority', 'Status', 'Amount', 'Actions'].map(h => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No job cards found</div>}
            {filtered.map(job => (
              <div key={job.id} className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_90px_120px_80px_100px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                <span className="text-sm font-bold text-blue-600">{job.id}</span>
                <div><div className="text-sm font-medium text-gray-900">{job.vehicle}</div><div className="text-xs text-gray-400">{job.plate}</div></div>
                <span className="text-sm text-gray-700">{job.customer}</span>
                <span className="text-sm text-gray-700">{job.mechanic}</span>
                <span className="text-sm text-gray-600">{job.task}</span>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${priorityStyle[job.priority]}`}>{job.priority}</span>
                <span onClick={() => cycleStatus(job.id)} className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit cursor-pointer hover:opacity-80 ${statusStyle[job.status]}`}>{job.status}</span>
                <span className="text-sm font-semibold text-gray-900">{job.amount}</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => openEdit(job)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors"><Pencil size={12} /></button>
                  <button onClick={() => handleDelete(job.id)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal === 'add'  && <Modal title="New Job Card"  form={form} setForm={setForm} onClose={() => setModal(null)} onSave={handleAdd} />}
      {modal === 'edit' && <Modal title="Edit Job Card" form={form} setForm={setForm} onClose={() => { setModal(null); setEditId(null); }} onSave={handleEdit} />}
    </div>
  );
}