import React from 'react'
import Dashboard from '../mechanic/Dashboard'
import AdminDashboard from '../admin/Dashboard'
import JobCards from '../admin/JobCards'

const AssingnJobs = () => {
  return (
   {/* ── Manager ── */}
<Route path="/manager/dashboard"  element={<AdminDashboard />} />
{/* <Route path="/manager/assigned-jobs" element={<AssignnJobs />} /> */}
<Route path="/manager/job-cards"  element={JobCards />} />
  )
}

export default AssingnJobs