import { ClipboardList, Sun, CheckCircle2 } from "lucide-react";
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import QuickEntry from '../../components/QuickEntry';

const stats = [
  { label: 'Assigned Jobs',   value: 12, Icon: ClipboardList, cardCls: 'bg-blue-50 border-blue-100',   iconCls: 'bg-blue-600' },
  { label: 'Jobs In Progress', value: 4,  Icon: Sun,           cardCls: 'bg-yellow-50 border-yellow-100', iconCls: 'bg-yellow-500' },
  { label: 'Completed Today',  value: 8,  Icon: CheckCircle2,   cardCls: 'bg-green-50 border-green-100',  iconCls: 'bg-green-600' },
];

const jobs = [
  { id: '#JC-8821', vehicle: 'Toyota Camry',  plate: 'ABC-1234', task: 'Engine Oil Change',       priority: 'HIGH',   status: 'PENDING',     action: 'start' },
  { id: '#JC-8825', vehicle: 'Honda Civic',   plate: 'XYZ-5678', task: 'Brake Pad Replacement',   priority: 'MEDIUM', status: 'IN PROGRESS', action: 'view'  },
  { id: '#JC-8830', vehicle: 'Ford Explorer', plate: 'KRR-9012', task: 'Full Transmission Flush',  priority: 'LOW',    status: 'PENDING',     action: 'start' },
];

const completed = [
  { id: '#JC-8815', vehicle: 'Audi A4', time: '45m ago' },
  { id: '#JC-8812', vehicle: 'BMW X5',  time: '2h ago'  },
];

const priorityBadge = {
  HIGH:   'bg-red-100 text-red-600',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW:    'bg-green-100 text-green-600',
};

const statusBadge = {
  'PENDING':     'bg-gray-100 text-gray-500 border border-gray-200',
  'IN PROGRESS': 'bg-blue-100 text-blue-700',
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        

        <div className="flex flex-1 overflow-auto">
          {/* Left Panel */}
          <div className="flex-1 p-6 overflow-auto">

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4 mb-7">
              {stats.map(({ label, value, Icon, cardCls, iconCls }) => (
                <div key={label} className={`flex items-center justify-between border rounded-xl p-4 ${cardCls}`}>
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5">{label}</div>
                    <div className="text-3xl font-semibold text-gray-900">{value}</div>
                  </div>
                  <div className={`w-11 h-11 ${iconCls} rounded-xl flex items-center justify-center`}>
                    <Icon size={20} color="white" />
                  </div>
                </div>
              ))}
            </div>

            {/* My Assigned Jobs */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">My Assigned Jobs</h2>
              <span className="text-xs text-blue-600 cursor-pointer">View All</span>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-7">
              {/* Table Head */}
              <div className="grid grid-cols-[80px_140px_1fr_90px_120px_110px] px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                {['Job ID', 'Vehicle', 'Task', 'Priority', 'Status', 'Action'].map(h => (
                  <span key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
                ))}
              </div>

              {/* Rows */}
              {jobs.map(job => (
                <div
                  key={job.id}
                  className="grid grid-cols-[80px_140px_1fr_90px_120px_110px] px-4 py-3.5 border-b border-gray-50 last:border-b-0 items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{job.id}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.vehicle}</div>
                    <div className="text-xs text-gray-400">{job.plate}</div>
                  </div>
                  <span className="text-sm text-gray-700">{job.task}</span>
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${priorityBadge[job.priority]}`}>
                    {job.priority}
                  </span>
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusBadge[job.status]}`}>
                    {job.status}
                  </span>
                  <div>
                    {job.action === 'start' ? (
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
                        Start Job
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Recently Completed */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Recently Completed</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {completed.map(job => (
                <div key={job.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{job.id} - {job.vehicle}</div>
                    <div className="text-xs text-gray-400">Completed {job.time}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Panel */}
          <QuickEntry />
        </div>
      </div>
    </div>
  );
}
