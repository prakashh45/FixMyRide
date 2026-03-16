import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Car, FileText,
  ClipboardList, Wrench, Package, BarChart2,
  Settings, LogOut, User
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',        path: '/admin/dashboard' },
  { icon: Users,           label: 'Customers',        path: '/admin/customers' },
  { icon: Car,             label: 'Vehicles',         path: '/admin/vehicles' },
  { icon: FileText,        label: 'Job Cards',        path: '/admin/job-cards' },
  { icon: ClipboardList,   label: 'Service Requests', path: '/admin/service-requests' },
  { icon: Wrench,          label: 'Mechanics',        path: '/admin/mechanics' },
  { icon: Package,         label: 'Inventory',        path: '/admin/inventory' },
  { icon: BarChart2,       label: 'Reports',          path: '/admin/reports' },
  { icon: Settings,        label: 'Settings',         path: '/admin/settings' },
  { icon: User,            label: 'Profile',          path: '/admin/profile' },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 min-h-screen">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Car size={18} color="white" />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">AutoCare</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Management</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all no-underline
                ${active
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
            >
              <Icon
                size={17}
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
          <LogOut size={17} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}