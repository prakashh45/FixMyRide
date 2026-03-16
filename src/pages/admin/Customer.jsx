import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Plus, Search, X, Pencil, Trash2 } from 'lucide-react';

const initCustomers = [
  { id: 'C001', name: 'John Doe',     phone: '+1 234 567 890', email: 'john@email.com',  vehicles: 2, lastVisit: 'Oct 24, 2023', status: 'Active' },
  { id: 'C002', name: 'Jane Smith',   phone: '+1 345 678 901', email: 'jane@email.com',  vehicles: 1, lastVisit: 'Oct 22, 2023', status: 'Active' },
  { id: 'C003', name: 'Robert Brown', phone: '+1 456 789 012', email: 'rob@email.com',   vehicles: 3, lastVisit: 'Oct 18, 2023', status: 'Inactive' },
  { id: 'C004', name: 'Emily Davis',  phone: '+1 567 890 123', email: 'emily@email.com', vehicles: 1, lastVisit: 'Oct 24, 2023', status: 'Active' },
  { id: 'C005', name: 'Chris Evans',  phone: '+1 678 901 234', email: 'chris@email.com', vehicles: 2, lastVisit: 'Oct 23, 2023', status: 'Active' },
];

const emptyForm = { name: '', phone: '', email: '', status: 'Active' };

function Modal({ title, form, setForm, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-gray-600" /></button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Full Name', key: 'name',  placeholder: 'e.g. John Doe' },
            { label: 'Phone',     key: 'phone', placeholder: '+1 234 567 890' },
            { label: 'Email',     key: 'email', placeholder: 'email@example.com' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
              <input
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={onSave} className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function Customer() {
  const [customers, setCustomers] = useState(initCustomers);
  const [search, setSearch]       = useState('');
  const [modal, setModal]         = useState(null); // 'add' | 'edit'
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [toast, setToast]         = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.phone) return;
    const newC = {
      id: `C00${customers.length + 1}`,
      ...form,
      vehicles: 0,
      lastVisit: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setCustomers(c => [...c, newC]);
    setModal(null); setForm(emptyForm);
    showToast('✅ Customer Added!');
  };

  const handleEdit = () => {
    setCustomers(c => c.map(x => x.id === editId ? { ...x, ...form } : x));
    setModal(null); setForm(emptyForm); setEditId(null);
    showToast('✅ Customer Updated!');
  };

  const handleDelete = (id) => {
    setCustomers(c => c.filter(x => x.id !== id));
    showToast('🗑️ Customer Deleted!');
  };

  const openEdit = (c) => {
    setForm({ name: c.name, phone: c.phone, email: c.email, status: c.status });
    setEditId(c.id); setModal('edit');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />

        {toast && <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">{toast}</div>}

        <div className="p-6 flex-1 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Customers</h1>
              <p className="text-xs text-gray-400 mt-0.5">{customers.length} total customers</p>
            </div>
            <button
              onClick={() => { setForm(emptyForm); setModal('add'); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus size={16} /> Add Customer
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-blue-400"
            />
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_1fr_1fr_80px_130px_90px_90px] px-5 py-3 bg-gray-50 border-b border-gray-100">
              {['ID', 'Name', 'Phone', 'Email', 'Vehicles', 'Last Visit', 'Status', 'Actions'].map(h => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No customers found</div>}
            {filtered.map(c => (
              <div key={c.id} className="grid grid-cols-[60px_1fr_1fr_1fr_80px_130px_90px_90px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                <span className="text-xs font-semibold text-gray-400">{c.id}</span>
                <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                <span className="text-sm text-gray-600">{c.phone}</span>
                <span className="text-sm text-blue-500">{c.email}</span>
                <span className="text-sm text-gray-600 text-center">{c.vehicles}</span>
                <span className="text-sm text-gray-500">{c.lastVisit}</span>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {c.status}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(c)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-400">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal === 'add' && <Modal title="Add Customer" form={form} setForm={setForm} onClose={() => setModal(null)} onSave={handleAdd} />}
      {modal === 'edit' && <Modal title="Edit Customer" form={form} setForm={setForm} onClose={() => { setModal(null); setEditId(null); }} onSave={handleEdit} />}
    </div>
  );
}