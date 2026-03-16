import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const jobs = [
  { id: '#JC-8821', vehicle: 'Toyota Camry',  task: 'Engine Oil Change',       currentStatus: 'PENDING',     customer: 'Raj Patil' },
  { id: '#JC-8825', vehicle: 'Honda Civic',   task: 'Brake Pad Replacement',   currentStatus: 'IN PROGRESS', customer: 'Sneha More' },
  { id: '#JC-8830', vehicle: 'Ford Explorer', task: 'Full Transmission Flush', currentStatus: 'PENDING',     customer: 'Amit Shah' },
  { id: '#JC-8833', vehicle: 'Hyundai Creta', task: 'AC Gas Refill',           currentStatus: 'IN PROGRESS', customer: 'Pooja Desai' },
];

const statusOptions = ['PENDING', 'IN PROGRESS', 'COMPLETED'];

const statusStyle = {
  'PENDING':     { cls: 'bg-gray-100 text-gray-500', Icon: Clock },
  'IN PROGRESS': { cls: 'bg-blue-100 text-blue-700', Icon: AlertCircle },
  'COMPLETED':   { cls: 'bg-green-100 text-green-600', Icon: CheckCircle },
};

export default function StatusUpdates() {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(jobs.map(j => [j.id, j.currentStatus]))
  );
  const [remarks, setRemarks] = useState(Object.fromEntries(jobs.map(j => [j.id, ''])));
  const [saved, setSaved] = useState({});

  const handleSave = (id) => {
    setSaved(s => ({ ...s, [id]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [id]: false })), 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="p-6 overflow-auto flex-1">

          <div className="mb-6">
            <h1 className="text-lg font-semibold text-gray-900">Status Updates</h1>
            <p className="text-xs text-gray-400 mt-0.5">Update job status and add remarks</p>
          </div>

          <div className="flex flex-col gap-4">
            {jobs.map(job => {
              const { cls, Icon } = statusStyle[statuses[job.id]];
              return (
                <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{job.id}</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{job.vehicle}</div>
                        <div className="text-xs text-gray-400">{job.task} · {job.customer}</div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${cls}`}>
                      <Icon size={12} />
                      {statuses[job.id]}
                    </span>
                  </div>

                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Update Status</label>
                      <select
                        value={statuses[job.id]}
                        onChange={e => setStatuses(s => ({ ...s, [job.id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-blue-400 transition-colors"
                      >
                        {statusOptions.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="flex-[2]">
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Remarks</label>
                      <input
                        type="text"
                        placeholder="Add remarks..."
                        value={remarks[job.id]}
                        onChange={e => setRemarks(r => ({ ...r, [job.id]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => handleSave(job.id)}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                        saved[job.id]
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {saved[job.id] ? '✓ Saved' : 'Update'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}