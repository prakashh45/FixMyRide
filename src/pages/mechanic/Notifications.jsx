import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { CheckCircle } from 'lucide-react';

const completedJobs = [
  { id: '#JC-8815', vehicle: 'Audi A4',       plate: 'MH-9876', task: 'Engine Tune-Up',         customer: 'Rahul Nair',   completedAt: 'Today, 10:45 AM', duration: '2h 15m' },
  { id: '#JC-8812', vehicle: 'BMW X5',         plate: 'DL-1122', task: 'Brake Fluid Change',     customer: 'Meera Singh',  completedAt: 'Today, 09:00 AM', duration: '1h 30m' },
  { id: '#JC-8808', vehicle: 'Tata Nexon',     plate: 'KA-5544', task: 'Tyre Rotation',          customer: 'Suresh Patil', completedAt: 'Yesterday, 4:30 PM', duration: '45m' },
  { id: '#JC-8803', vehicle: 'Kia Seltos',     plate: 'GJ-3311', task: 'Battery Replacement',    customer: 'Anjali Roy',   completedAt: 'Yesterday, 2:00 PM', duration: '30m' },
  { id: '#JC-8799', vehicle: 'Mahindra XUV',  plate: 'MH-7788', task: 'Full Service',            customer: 'Dev Kapoor',   completedAt: 'Yesterday, 11:00 AM', duration: '3h 00m' },
];

export default function CompletedJobs() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="p-6 overflow-auto flex-1">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Completed Jobs</h1>
              <p className="text-xs text-gray-400 mt-0.5">{completedJobs.length} jobs completed</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-xl">
              <CheckCircle size={15} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">All verified</span>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {completedJobs.map(job => (
              <div key={job.id} className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-green-200 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-900">{job.id}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-sm text-gray-700">{job.vehicle}</span>
                    <span className="text-xs text-gray-400">{job.plate}</span>
                  </div>
                  <div className="text-xs text-gray-500">{job.task} · {job.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-900">{job.completedAt}</div>
                  <div className="text-xs text-gray-400">Duration: {job.duration}</div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  Completed
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}