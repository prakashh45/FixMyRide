import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { Mail, Phone, MapPin, Briefcase, Star, Camera, Save } from 'lucide-react';

export default function Profile() {
  const [toast, setToast] = useState('');
  const [profile, setProfile] = useState({
    name: 'Admin User', role: 'Service Manager', email: 'admin@autocare.com',
    phone: '+1 234 567 890', location: 'Nashik, Maharashtra', experience: '8 Years',
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const stats = [
    { label: 'Total Jobs',      value: '524' },
    { label: 'Mechanics',       value: '8'   },
    { label: 'Customers',       value: '142' },
    { label: 'Revenue',         value: '$42k' },
  ];

  const activities = [
    { action: 'Approved service request from Emily Davis', time: '10 min ago' },
    { action: 'Added new mechanic — Donna Paulsen',        time: '1 hr ago'  },
    { action: 'Updated inventory — Engine Oil restocked',  time: '3 hr ago'  },
    { action: 'Rejected service request from unknown',     time: 'Yesterday' },
    { action: 'Generated monthly report for October',      time: 'Yesterday' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        {toast && <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">{toast}</div>}

        <div className="p-6 flex-1 overflow-auto">
          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage your account information</p>
          </div>

          <div className="grid grid-cols-3 gap-5">

            {/* Left Card */}
            <div className="col-span-1 flex flex-col gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-white">AU</div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow">
                    <Camera size={13} color="white" />
                  </button>
                </div>
                <div className="text-base font-bold text-gray-900">{profile.name}</div>
                <div className="text-xs text-gray-400 mb-3">{profile.role}</div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full mb-5">
                  <Star size={13} className="text-yellow-500" fill="#eab308" />
                  <span className="text-xs font-semibold text-yellow-700">Top Rated Manager</span>
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  {[
                    { Icon: Mail,      val: profile.email },
                    { Icon: Phone,     val: profile.phone },
                    { Icon: MapPin,    val: profile.location },
                    { Icon: Briefcase, val: profile.experience + ' Experience' },
                  ].map(({ Icon, val }) => (
                    <div key={val} className="flex items-center gap-2.5 text-xs text-gray-500">
                      <Icon size={13} className="text-gray-400 flex-shrink-0" />{val}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="text-sm font-bold text-gray-900 mb-4">Recent Activity</div>
                <div className="flex flex-col gap-3">
                  {activities.map((a, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                      <div>
                        <div className="text-xs text-gray-700">{a.action}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="col-span-2 flex flex-col gap-5">

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {stats.map(({ label, value }) => (
                  <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                ))}
              </div>

              {/* Edit Info */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="text-sm font-bold text-gray-900 mb-4">Edit Information</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name',   key: 'name' },
                    { label: 'Role',        key: 'role' },
                    { label: 'Email',       key: 'email' },
                    { label: 'Phone',       key: 'phone' },
                    { label: 'Location',    key: 'location' },
                    { label: 'Experience',  key: 'experience' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input value={profile[key]} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400" />
                    </div>
                  ))}
                </div>
                <button onClick={() => showToast('✅ Profile Updated!')}
                  className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                  <Save size={15} /> Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}