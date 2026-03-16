import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Plus, Search, X, Pencil, Trash2 } from 'lucide-react';

const initVehicles = [
  { id: 'V001', reg: 'ABC-1234', make: 'Toyota',   model: 'Camry',  year: 2020, owner: 'John Doe',     status: 'In Service' },
  { id: 'V002', reg: 'XYZ-5678', make: 'Honda',    model: 'Civic',  year: 2022, owner: 'Jane Smith',   status: 'Ready' },
  { id: 'V003', reg: 'KRR-9012', make: 'Ford',     model: 'F-150',  year: 2019, owner: 'Robert Brown', status: 'Pending' },
  { id: 'V004', reg: 'MH-2341',  make: 'BMW',      model: 'X5',     year: 2021, owner: 'Emily Davis',  status: 'In Service' },
  { id: 'V005', reg: 'DL-5566',  make: 'Audi',     model: 'A4',     year: 2023, owner: 'Chris Evans',  status: 'Ready' },
];

const statusStyle = {
  'In Service': 'bg-blue-100 text-blue-700',
  'Ready':      'bg-green-100 text-green-700',
  'Pending':    'bg-yellow-100 text-yellow-700',
};

const emptyForm = { reg: '', make: '', model: '', year: '', owner: '', status: 'Pending' };

function Modal({ title, form, setForm, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[440px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Reg Number', key: 'reg',   placeholder: 'e.g. ABC-1234' },
            { label: 'Make',       key: 'make',  placeholder: 'e.g. Toyota' },
            { label: 'Model',      key: 'model', placeholder: 'e.g. Camry' },
            { label: 'Year',       key: 'year',  placeholder: 'e.g. 2022' },
            { label: 'Owner',      key: 'owner', placeholder: 'e.g. John Doe' },
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
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
              <option>Pending</option><option>In Service</option><option>Ready</option>
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

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(initVehicles);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [editId, setEditId]     = useState(null);
  const [toast, setToast]       = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = vehicles.filter(v =>
    v.reg.toLowerCase().includes(search.toLowerCase()) ||
    v.make.toLowerCase().includes(search.toLowerCase()) ||
    v.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.reg || !form.make) return;
    setVehicles(v => [...v, { id: `V00${vehicles.length + 1}`, ...form }]);
    setModal(null); setForm(emptyForm);
    showToast('✅ Vehicle Added!');
  };

  const handleEdit = () => {
    setVehicles(v => v.map(x => x.id === editId ? { ...x, ...form } : x));
    setModal(null); setForm(emptyForm); setEditId(null);
    showToast('✅ Vehicle Updated!');
  };

  const handleDelete = (id) => {
    setVehicles(v => v.filter(x => x.id !== id));
    showToast('🗑️ Vehicle Deleted!');
  };

  const openEdit = (v) => {
    setForm({ reg: v.reg, make: v.make, model: v.model, year: v.year, owner: v.owner, status: v.status });
    setEditId(v.id); setModal('edit');
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
              <h1 className="text-lg font-bold text-gray-900">Vehicles</h1>
              <p className="text-xs text-gray-400 mt-0.5">{vehicles.length} vehicles registered</p>
            </div>
            <button onClick={() => { setForm(emptyForm); setModal('add'); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Plus size={16} /> Add Vehicle
            </button>
          </div>

          <div className="relative mb-4 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by reg, make, owner..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-blue-400" />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[60px_120px_1fr_1fr_80px_1fr_110px_90px] px-5 py-3 bg-gray-50 border-b border-gray-100">
              {['ID', 'Reg No.', 'Make', 'Model', 'Year', 'Owner', 'Status', 'Actions'].map(h => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No vehicles found</div>}
            {filtered.map(v => (
              <div key={v.id} className="grid grid-cols-[60px_120px_1fr_1fr_80px_1fr_110px_90px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                <span className="text-xs font-semibold text-gray-400">{v.id}</span>
                <span className="text-sm font-semibold text-gray-900">{v.reg}</span>
                <span className="text-sm text-gray-700">{v.make}</span>
                <span className="text-sm text-gray-700">{v.model}</span>
                <span className="text-sm text-gray-600">{v.year}</span>
                <span className="text-sm text-gray-700">{v.owner}</span>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusStyle[v.status]}`}>{v.status}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(v)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(v.id)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal === 'add'  && <Modal title="Add Vehicle"  form={form} setForm={setForm} onClose={() => setModal(null)} onSave={handleAdd} />}
      {modal === 'edit' && <Modal title="Edit Vehicle" form={form} setForm={setForm} onClose={() => { setModal(null); setEditId(null); }} onSave={handleEdit} />}
    </div>
  );
}