import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search Job Card ID or Vehicle Number"
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-900 outline-none focus:border-blue-400 focus:bg-white transition-colors"
        />
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-3">
        <button className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell size={15} />
        </button>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">Alex Thompson</div>
          <div className="text-xs text-gray-400">Senior Mechanic</div>
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
          AT
        </div>
      </div>
    </header>
  );
}