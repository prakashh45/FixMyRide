import { Search, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { text: 'New service request from Emily Davis', time: '2 min ago' },
    { text: 'Job #JC-8822 marked In Progress',      time: '15 min ago' },
    { text: 'Mechanic Mike Ross completed job',      time: '1 hr ago' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 relative z-10">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search Job Card, Customer, or Vehicle..."
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-900 outline-none focus:border-blue-400 focus:bg-white transition-colors"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Bell size={15} />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {notifications.length}
          </span>

          {/* Dropdown */}
          {showNotif && (
            <div className="absolute right-0 top-11 w-72 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-900">Notifications</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <div className="text-xs text-gray-700">{n.text}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User */}
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">Admin User</div>
          <div className="text-xs text-gray-400">Service Manager</div>
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
          AU
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}