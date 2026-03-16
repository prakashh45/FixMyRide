import { Car, User, Clock, FileText, Bell, Info } from 'lucide-react';
import { useState } from 'react';

const alerts = [
  {
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    Icon: FileText,
    title: 'New Job Assigned',
    sub: 'Mercedes G-Wagon Engine Checkup.',
    time: '12 minutes ago',
  },
  {
    bg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    Icon: Bell,
    title: 'Parts Available',
    sub: 'Brake pads for XYZ-5678 are now ready.',
    time: '45 minutes ago',
  },
  {
    bg: 'bg-gray-100',
    iconColor: 'text-gray-500',
    Icon: Info,
    title: 'Shift Update',
    sub: 'Daily workshop meeting at 17:00.',
    time: '2 hours ago',
  },
];

export default function QuickEntry() {
  const [status, setStatus] = useState('In Progress');
  const [remarks, setRemarks] = useState('');

  return (
    <div className="w-72 bg-white border-l border-gray-100 p-5 overflow-auto flex flex-col gap-4 flex-shrink-0">

      {/* Job Details Card */}
      <div className="border border-gray-100 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-900">Job Details</span>
          <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">#JC-8825</span>
        </div>

        {/* Vehicle */}
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center flex-shrink-0 text-gray-500 mt-0.5">
            <Car size={13} />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Vehicle</div>
            <div className="text-xs font-medium text-gray-900">Honda Civic (2022) - XYZ-5678</div>
          </div>
        </div>

        {/* Customer */}
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center flex-shrink-0 text-gray-500 mt-0.5">
            <User size={13} />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Customer</div>
            <div className="text-xs font-medium text-gray-900">Johnathan Smith (+1 234 567 890)</div>
          </div>
        </div>

        <hr className="border-gray-100 my-3" />

        {/* Status */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Service Status</div>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-blue-400 transition-colors"
          >
            <option>In Progress</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Remarks */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Service Remarks</div>
          <textarea
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
            placeholder="Update job progress, parts used, or issues found..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-blue-400 resize-none h-20 transition-colors"
          />
        </div>

        {/* Est. Completion */}
        <div className="flex items-center gap-2 mb-4 text-gray-400">
          <Clock size={13} />
          <span className="text-xs">Est. Completion</span>
          <span className="text-xs font-semibold text-blue-600 ml-auto">14:30 PM</span>
        </div>

        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
          Update Status
        </button>
      </div>

      {/* Recent Alerts Card */}
      <div className="border border-gray-100 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-900">Recent Alerts</span>
          <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">New</span>
        </div>

        <div className="flex flex-col gap-3">
          {alerts.map((a, i) => (
            <div key={i} className="flex gap-2.5">
              <div className={`w-8 h-8 ${a.bg} rounded-lg flex items-center justify-center flex-shrink-0 ${a.iconColor}`}>
                <a.Icon size={14} />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-900 mb-0.5">{a.title}</div>
                <div className="text-xs text-gray-500 mb-0.5">{a.sub}</div>
                <div className="text-xs text-gray-400">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}