import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Plus, Search, X, Pencil, Trash2, AlertTriangle } from 'lucide-react';

const initInventory = [
  { id: 'INV001', name: 'Engine Oil (5L)',      category: 'Lubricants',  qty: 45, minQty: 10, price: 25,  unit: 'Bottle',  status: 'In Stock' },
  { id: 'INV002', name: 'Brake Pads (Set)',      category: 'Brakes',     qty: 8,  minQty: 10, price: 65,  unit: 'Set',     status: 'Low Stock' },
  { id: 'INV003', name: 'Air Filter',            category: 'Filters',    qty: 30, minQty: 5,  price: 18,  unit: 'Piece',   status: 'In Stock' },
  { id: 'INV004', name: 'Spark Plugs (4pcs)',    category: 'Electrical', qty: 0,  minQty: 8,  price: 32,  unit: 'Set',     status: 'Out of Stock' },
  { id: 'INV005', name: 'Coolant (1L)',          category: 'Lubricants', qty: 22, minQty: 10, price: 12,  unit: 'Bottle',  status: 'In Stock' },
  { id: 'INV006', name: 'Wiper Blades',          category: 'Accessories',qty: 4,  minQty: 6,  price: 20,  unit: 'Pair',    status: 'Low Stock' },
  { id: 'INV007', name: 'Transmission Fluid',    category: 'Lubricants', qty: 15, minQty: 8,  price: 35,  unit: 'Bottle',  status: 'In Stock' },
  { id: 'INV008', name: 'Battery (12V)',         category: 'Electrical', qty: 6,  minQty: 3,  price: 120, unit: 'Piece',   status: 'In Stock' },
];

const categories = ['All', 'Lubricants', 'Brakes', 'Filters', 'Electrical', 'Accessories'];
const emptyForm = { name: '', category: 'Lubricants', qty: '', minQty: '', price: '', unit: 'Piece' };

const statusStyle = {
  'In Stock':     'bg-green-100 text-green-700',
  'Low Stock':    'bg-yellow-100 text-yellow-700',
  'Out of Stock': 'bg-red-100 text-red-600',
};

function Modal({ title, form, setForm, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[460px] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Item Name', key: 'name',   placeholder: 'e.g. Engine Oil', col: 2 },
            { label: 'Quantity',  key: 'qty',    placeholder: '0', col: 1 },
            { label: 'Min Qty',   key: 'minQty', placeholder: '5', col: 1 },
            { label: 'Price ($)', key: 'price',  placeholder: '0.00', col: 1 },
            { label: 'Unit',      key: 'unit',   placeholder: 'Piece', col: 1 },
          ].map(({ label, key, placeholder, col }) => (
            <div key={key} className={col === 2 ? 'col-span-2' : ''}>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
              <input placeholder={placeholder} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400" />
            </div>
          ))}
          <div className="col-span-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
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

export default function Inventory() {
  const [items, setItems]     = useState(initInventory);
  const [search, setSearch]   = useState('');
  const [catFilter, setCat]   = useState('All');
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(emptyForm);
  const [editId, setEditId]   = useState(null);
  const [toast, setToast]     = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const getStatus = (qty, minQty) => qty === 0 ? 'Out of Stock' : qty < minQty ? 'Low Stock' : 'In Stock';

  const filtered = items.filter(i =>
    (catFilter === 'All' || i.category === catFilter) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name) return;
    const qty = Number(form.qty), minQty = Number(form.minQty);
    setItems(i => [...i, {
      id: `INV00${items.length + 1}`,
      ...form, qty, minQty,
      price: Number(form.price),
      status: getStatus(qty, minQty),
    }]);
    setModal(null); setForm(emptyForm);
    showToast('✅ Item Added!');
  };

  const handleEdit = () => {
    const qty = Number(form.qty), minQty = Number(form.minQty);
    setItems(i => i.map(x => x.id === editId ? { ...x, ...form, qty, minQty, price: Number(form.price), status: getStatus(qty, minQty) } : x));
    setModal(null); setForm(emptyForm); setEditId(null);
    showToast('✅ Item Updated!');
  };

  const handleDelete = (id) => { setItems(i => i.filter(x => x.id !== id)); showToast('🗑️ Item Deleted!'); };

  const openEdit = (item) => {
    setForm({ name: item.name, category: item.category, qty: item.qty, minQty: item.minQty, price: item.price, unit: item.unit });
    setEditId(item.id); setModal('edit');
  };

  const lowStockCount = items.filter(i => i.status !== 'In Stock').length;

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
              <h1 className="text-lg font-bold text-gray-900">Inventory</h1>
              <p className="text-xs text-gray-400 mt-0.5">{items.length} items · {lowStockCount} need attention</p>
            </div>
            <button onClick={() => { setForm(emptyForm); setModal('add'); }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
              <Plus size={16} /> Add Item
            </button>
          </div>

          {/* Low Stock Alert */}
          {lowStockCount > 0 && (
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
              <AlertTriangle size={16} className="text-yellow-600 flex-shrink-0" />
              <span className="text-sm text-yellow-700 font-medium">{lowStockCount} items are low or out of stock — reorder soon!</span>
            </div>
          )}

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-blue-400" />
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {categories.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${catFilter === c ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_120px_80px_80px_90px_80px_110px_90px] px-5 py-3 bg-gray-50 border-b border-gray-100">
              {['ID', 'Item Name', 'Category', 'Qty', 'Min Qty', 'Price', 'Unit', 'Status', 'Actions'].map(h => (
                <span key={h} className="text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-10 text-center text-sm text-gray-400">No items found</div>}
            {filtered.map(item => (
              <div key={item.id} className="grid grid-cols-[80px_1fr_120px_80px_80px_90px_80px_110px_90px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors">
                <span className="text-xs font-semibold text-gray-400">{item.id}</span>
                <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                <span className="text-sm text-gray-600">{item.category}</span>
                <span className={`text-sm font-bold ${item.qty === 0 ? 'text-red-500' : item.qty < item.minQty ? 'text-yellow-600' : 'text-gray-900'}`}>{item.qty}</span>
                <span className="text-sm text-gray-500">{item.minQty}</span>
                <span className="text-sm text-gray-700">${item.price}</span>
                <span className="text-sm text-gray-500">{item.unit}</span>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusStyle[item.status]}`}>{item.status}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 text-gray-400 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal === 'add'  && <Modal title="Add Item"  form={form} setForm={setForm} onClose={() => setModal(null)} onSave={handleAdd} />}
      {modal === 'edit' && <Modal title="Edit Item" form={form} setForm={setForm} onClose={() => { setModal(null); setEditId(null); }} onSave={handleEdit} />}
    </div>
  );
}