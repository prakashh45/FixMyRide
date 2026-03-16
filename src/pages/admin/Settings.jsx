import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Bell, Shield, Building, Palette, Save } from 'lucide-react';

const tabs = [
  { id: 'general',   label: 'General',       icon: Building },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security',  label: 'Security',      icon: Shield },
  { id: 'appearance',label: 'Appearance',    icon: Palette },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast]         = useState('');
  const [general, setGeneral]     = useState({ shopName: 'AutoCare Service Center', email: 'admin@autocare.com', phone: '+1 234 567 890', address: '123 Main Street, City', timezone: 'IST (UTC+5:30)', currency: 'USD ($)' });
  const [notif, setNotif]         = useState({ newRequest: true, jobComplete: true, lowInventory: true, dailyReport: false, smsAlert: false });
  const [security, setSecurity]   = useState({ currentPwd: '', newPwd: '', confirmPwd: '' });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleSave = () => showToast('✅ Settings Saved!');

  const handlePasswordChange = () => {
    if (!security.newPwd || security.newPwd !== security.confirmPwd) {
      showToast('❌ Passwords do not match!'); return;
    }
    setSecurity({ currentPwd: '', newPwd: '', confirmPwd: '' });
    showToast('✅ Password Changed!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        {toast && <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">{toast}</div>}

        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">Settings</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage your system preferences</p>
          </div>

          <div className="flex gap-5">
            {/* Sidebar Tabs */}
            <div className="w-48 flex-shrink-0">
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm transition-colors border-b border-gray-50 last:border-b-0
                      ${activeTab === id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <Icon size={16} className={activeTab === id ? 'text-blue-600' : 'text-gray-400'} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">

              {/* General */}
              {activeTab === 'general' && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-gray-900 mb-5">General Settings</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Shop Name',  key: 'shopName' },
                      { label: 'Email',      key: 'email' },
                      { label: 'Phone',      key: 'phone' },
                      { label: 'Address',    key: 'address' },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">{label}</label>
                        <input value={general[key]} onChange={e => setGeneral(g => ({ ...g, [key]: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400" />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Timezone</label>
                      <select value={general.timezone} onChange={e => setGeneral(g => ({ ...g, timezone: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
                        <option>IST (UTC+5:30)</option><option>EST (UTC-5)</option><option>GMT (UTC+0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Currency</label>
                      <select value={general.currency} onChange={e => setGeneral(g => ({ ...g, currency: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400">
                        <option>USD ($)</option><option>INR (₹)</option><option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={handleSave} className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
                    <Save size={15} /> Save Changes
                  </button>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-gray-900 mb-5">Notification Preferences</h2>
                  <div className="flex flex-col gap-4">
                    {[
                      { key: 'newRequest',   label: 'New Service Request',  desc: 'Get notified when a new service request is submitted' },
                      { key: 'jobComplete',  label: 'Job Completed',        desc: 'Get notified when a mechanic completes a job' },
                      { key: 'lowInventory', label: 'Low Inventory Alert',  desc: 'Get notified when items are running low' },
                      { key: 'dailyReport',  label: 'Daily Report',         desc: 'Receive a daily summary of operations' },
                      { key: 'smsAlert',     label: 'SMS Alerts',           desc: 'Receive alerts via SMS on your phone' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{label}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                        </div>
                        <button onClick={() => setNotif(n => ({ ...n, [key]: !n[key] }))}
                          className={`w-11 h-6 rounded-full transition-colors relative ${notif[key] ? 'bg-blue-600' : 'bg-gray-200'}`}>
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notif[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleSave} className="mt-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
                    <Save size={15} /> Save Changes
                  </button>
                </div>
              )}

              {/* Security */}
              {activeTab === 'security' && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-gray-900 mb-5">Change Password</h2>
                  <div className="flex flex-col gap-4 max-w-sm">
                    {[
                      { label: 'Current Password', key: 'currentPwd' },
                      { label: 'New Password',     key: 'newPwd' },
                      { label: 'Confirm Password', key: 'confirmPwd' },
                    ].map(({ label, key }) => (
                      <div key={key}>
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">{label}</label>
                        <input type="password" placeholder="••••••••" value={security[key]}
                          onChange={e => setSecurity(s => ({ ...s, [key]: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400" />
                      </div>
                    ))}
                    <button onClick={handlePasswordChange} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl w-fit">
                      <Shield size={15} /> Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance */}
              {activeTab === 'appearance' && (
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h2 className="text-sm font-bold text-gray-900 mb-5">Appearance</h2>
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-3">Theme Color</label>
                    <div className="flex gap-3">
                      {['bg-blue-600','bg-purple-600','bg-green-600','bg-orange-500','bg-red-600'].map(c => (
                        <button key={c} className={`w-9 h-9 ${c} rounded-xl border-2 border-white ring-2 ring-transparent hover:ring-gray-300 transition-all`} />
                      ))}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-3">Mode</label>
                    <div className="flex gap-3">
                      {['Light Mode', 'Dark Mode'].map(m => (
                        <button key={m} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">{m}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
                    <Save size={15} /> Save Changes
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}