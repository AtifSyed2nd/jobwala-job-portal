import { Users, Briefcase, Building2, Activity, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Candidates", value: "12,450", trend: "+12%", icon: <Users className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50" },
    { title: "Active Jobs", value: "842", trend: "+5%", icon: <Briefcase className="w-6 h-6 text-indigo-600" />, bg: "bg-indigo-50" },
    { title: "Registered Companies", value: "312", trend: "+18%", icon: <Building2 className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-50" },
    { title: "Daily Applications", value: "1,204", trend: "+2%", icon: <Activity className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6 space-x-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Here is what is happening on your platform today.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>{stat.trend} from last month</span>
              </div>
            </div>
            <div className={`p-4 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Platform Traffic</h3>
          <div className="w-full h-75 border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 text-sm font-medium">Chart visualization will go here (e.g., Recharts)</p>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { text: "John Doe registered as a Candidate.", time: "2 mins ago" },
              { text: "LoCo Tech posted a new job: Sr. React Dev.", time: "15 mins ago" },
              { text: "Sarah applied for UI/UX Designer.", time: "1 hour ago" },
              { text: "New company 'Alpha Systems' pending approval.", time: "3 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Timeline line */}
                {i !== 3 && <div className="absolute left-2 top-6 bottom-6 w-px bg-slate-200"></div>}
                <div className="w-4 h-4 mt-1 rounded-full bg-slate-200 border-2 border-white z-10 shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}