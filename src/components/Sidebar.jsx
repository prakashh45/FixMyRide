import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardList, RefreshCw,
  CheckCircle, Bell, User, LogOut, Wrench
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',        path: '/mechanic/dashboard' },
  { icon: ClipboardList,   label: 'My Assigned Jobs', path: '/mechanic/assigned-jobs' },
  { icon: RefreshCw,       label: 'Status Updates',   path: '/mechanic/status-updates' },
  { icon: CheckCircle,     label: 'Completed Jobs',   path: '/mechanic/completed-jobs' },
  { icon: Bell,            label: 'Notifications',    path: '/mechanic/notifications' },
  { icon: User,            label: 'Profile',          path: '/mechanic/profile' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 min-h-screen">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Wrench size={18} color="white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">AutoCare</div>
          <div className="text-xs text-gray-400">Mechanic Portal</div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all no-underline
                ${active
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.2 : 1.8}
                className={active ? 'text-blue-600' : 'text-gray-400'}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}