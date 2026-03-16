import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

const allJobs = [
  { id: '#JC-8821', vehicle: 'Toyota Camry',   plate: 'ABC-1234', task: 'Engine Oil Change',        priority: 'HIGH',   status: 'PENDING',     customer: 'Raj Patil',    est: '11:00 AM' },
  { id: '#JC-8825', vehicle: 'Honda Civic',    plate: 'XYZ-5678', task: 'Brake Pad Replacement',    priority: 'MEDIUM', status: 'IN PROGRESS', customer: 'Sneha More',   est: '14:30 PM' },
  { id: '#JC-8830', vehicle: 'Ford Explorer',  plate: 'KRR-9012', task: 'Full Transmission Flush',  priority: 'LOW',    status: 'PENDING',     customer: 'Amit Shah',    est: '16:00 PM' },
  { id: '#JC-8833', vehicle: 'Hyundai Creta',  plate: 'MH-2341',  task: 'AC Gas Refill',            priority: 'MEDIUM', status: 'PENDING',     customer: 'Pooja Desai',  est: '13:00 PM' },
  { id: '#JC-8837', vehicle: 'Maruti Swift',   plate: 'PU-4512',  task: 'Wheel Alignment',          priority: 'LOW',    status: 'IN PROGRESS', customer: 'Vikram Joshi', est: '15:30 PM' },
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

export default function AssignedJobs() {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? allJobs : allJobs.filter(j => j.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="p-6 overflow-auto flex-1">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">My Assigned Jobs</h1>
              <p className="text-xs text-gray-400 mt-0.5">Total {allJobs.length} jobs assigned to you</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              {['ALL', 'PENDING', 'IN PROGRESS'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f === 'ALL' ? 'All' : f === 'PENDING' ? 'Pending' : 'In Progress'}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[80px_150px_1fr_90px_130px_100px_110px] px-5 py-3 bg-gray-50 border-b border-gray-100">
              {['Job ID', 'Vehicle', 'Task', 'Priority', 'Status', 'Est. Time', 'Action'].map(h => (
                <span key={h} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
              ))}
            </div>

            {filtered.map(job => (
              <div
                key={job.id}
                className="grid grid-cols-[80px_150px_1fr_90px_130px_100px_110px] px-5 py-4 border-b border-gray-50 last:border-b-0 items-center hover:bg-blue-50/30 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">{job.id}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{job.vehicle}</div>
                  <div className="text-xs text-gray-400">{job.plate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-700">{job.task}</div>
                  <div className="text-xs text-gray-400">{job.customer}</div>
                </div>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${priorityBadge[job.priority]}`}>
                  {job.priority}
                </span>
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${statusBadge[job.status]}`}>
                  {job.status}
                </span>
                <span className="text-sm text-blue-600 font-medium">{job.est}</span>
                <div>
                  {job.status === 'PENDING' ? (
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

            {filtered.length === 0 && (
              <div className="py-16 text-center text-gray-400 text-sm">No jobs found.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}