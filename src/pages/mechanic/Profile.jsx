import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { User, Phone, Mail, MapPin, Briefcase, Star } from 'lucide-react';

const stats = [
  { label: 'Jobs Completed', value: '124' },
  { label: 'In Progress',    value: '4'   },
  { label: 'Rating',         value: '4.8' },
  { label: 'Experience',     value: '6 yrs' },
];

const skills = ['Engine Repair', 'Brake Systems', 'Transmission', 'AC Service', 'Electrical', 'Wheel Alignment'];

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div className="p-6 overflow-auto flex-1">

          <h1 className="text-lg font-semibold text-gray-900 mb-6">My Profile</h1>

          <div className="grid grid-cols-3 gap-5">

            {/* Left - Profile Card */}
            <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">AT</span>
              </div>
              <div className="text-base font-semibold text-gray-900">Alex Thompson</div>
              <div className="text-xs text-gray-400 mb-4">Senior Mechanic</div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full mb-5">
                <Star size={13} className="text-yellow-500" fill="#eab308" />
                <span className="text-xs font-semibold text-yellow-700">4.8 Rating</span>
              </div>

              <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-3">
                {[
                  { Icon: Mail,     val: 'alex.t@autocare.com' },
                  { Icon: Phone,    val: '+1 234 567 890' },
                  { Icon: MapPin,   val: 'Nashik, Maharashtra' },
                  { Icon: Briefcase, val: '6 Years Experience' },
                ].map(({ Icon, val }) => (
                  <div key={val} className="flex items-center gap-2.5 text-xs text-gray-500">
                    <Icon size={14} className="text-gray-400" />
                    <span>{val}</span>
                  </div>
                ))}
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

              {/* Skills */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="text-sm font-semibold text-gray-900 mb-3">Skills & Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              {/* Edit Form */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="text-sm font-semibold text-gray-900 mb-4">Edit Information</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', val: 'Alex Thompson' },
                    { label: 'Phone',     val: '+1 234 567 890' },
                    { label: 'Email',     val: 'alex.t@autocare.com' },
                    { label: 'Location',  val: 'Nashik, Maharashtra' },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input
                        defaultValue={val}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
                  Save Changes
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}