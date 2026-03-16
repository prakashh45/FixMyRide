import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Plus, X, Pencil, Trash2, Star } from 'lucide-react';

const initMechanics = [
  { id: 'M001', name: 'Mike Ross',      specialty: 'Engine & Transmission', jobs: 3, total: 5, rating: 4.8, status: 'Available', color: 'bg-blue-500' },
  { id: 'M002', name: 'Sarah Connor',   specialty: 'Brake & Suspension',    jobs: 5, total: 5, rating: 4.6, status: 'Busy',      color: 'bg-red-500'  },
  { id: 'M003', name: 'Harvey Specter', specialty: 'Electrical Systems',    jobs: 1, total: 5, rating: 4.9, status: 'Available', color: 'bg-green-500'},
  { id: 'M004', name: 'Donna Paulsen',  specialty: 'AC & Cooling',          jobs: 2, total: 5, rating: 4.7, status: 'Available', color: 'bg-purple-500'},
];

const colors = ['bg-blue-500','bg-red-500','bg-green-500','bg-purple-500','bg-orange-500','bg-teal-500'];
const emptyForm = { name: '', specialty: '', status: 'Available' };

function Modal({ title, form, setForm, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Full Name',  key: 'name',      placeholder: 'e.g. Mike Ross' },
            { label: 'Specialty',  key: 'specialty', placeholder: 'e.g. Engine & Transmission' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
              <input placeholder={placeholder} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
              <option>Available</option><option>Busy</option><option>Off Duty</option>
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

export default function Mechanics() {
  const [mechanics, setMechanics] = useState(initMechanics);
  const [modal, setModal]         = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [toast, setToast]         = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleAdd = () => {
    if (!form.name) return;
    setMechanics(m => [...m, {
      id: `M00${mechanics.length + 1}`,
      ...form,
      jobs: 0, total: 5, rating: 4.5,
      color: colors[mechanics.length % colors.length],
    }]);
    setModal(null); setForm(emptyForm);
    showToast('✅ Mechanic Added!');
  };

  const handleEdit = () => {
    setMechanics(m => m.map(x => x.id === editId ? { ...x, ...form } : x));
    setModal(null); setForm(emptyForm); setEditId(null);
    showToast('✅ Mechanic Updated!');
  };

  const handleDelete = (id) => {
    setMechanics(m => m.filter(x => x.id !== id));
    showToast('🗑️ Mechanic Removed!');
  };

  const openEdit = (m) => {
    setForm({ name: m.name, specialty: m.specialty, status: m.status });
    setEditId(m.id); setModal('edit');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        {toast && <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">{toast}</div>}

        <div className="p-6 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Mechanics</h1>
              <p className="text-xs text-gray-400 mt-0.5">{mechanics.length} mechanics registered</p>
            </div>
            <button onClick={() => { setForm(emptyForm); setModal('add'); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Plus size={16} /> Add Mechanic
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mechanics.map(m => (
              <div key={m.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 ${m.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{m.name}</div>
                      <div className="text-xs text-gray-400">{m.specialty}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      m.status === 'Available' ? 'bg-green-100 text-green-700' :
                      m.status === 'Busy' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-500'}`}>
                      {m.status}
                    </span>
                    <button onClick={() => openEdit(m)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors">
                      <Pencil size={12} />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">Workload</span>
                  <span className="text-xs font-semibold text-gray-700">{m.jobs}/{m.total} Jobs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div className={`${m.color} h-2 rounded-full transition-all`} style={{ width: `${(m.jobs / m.total) * 100}%` }} />
                </div>

                <div className="flex items-center gap-1">
                  <Star size={13} className="text-yellow-500" fill="#eab308" />
                  <span className="text-xs font-semibold text-gray-700">{m.rating} Rating</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal === 'add'  && <Modal title="Add Mechanic"  form={form} setForm={setForm} onClose={() => setModal(null)} onSave={handleAdd} />}
      {modal === 'edit' && <Modal title="Edit Mechanic" form={form} setForm={setForm} onClose={() => { setModal(null); setEditId(null); }} onSave={handleEdit} />}
    </div>
  );
}