"use client";

import React from "react";
import { 
  Users, 
  Briefcase, 
  Building2, 
  Activity, 
  ArrowUpRight,
  PlusCircle
} from "lucide-react";

// Static Data Objects
const STATS_DATA = [
  { title: "Total Candidates", value: "12,450", trend: "+12%", icon: <Users className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50" },
  { title: "Active Jobs", value: "842", trend: "+5%", icon: <Briefcase className="w-6 h-6 text-indigo-600" />, bg: "bg-indigo-50" },
  { title: "Registered Companies", value: "312", trend: "+18%", icon: <Building2 className="w-6 h-6 text-emerald-600" />, bg: "bg-emerald-50" },
  { title: "Daily Applications", value: "1,204", trend: "+2%", icon: <Activity className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50" },
];

const RECENT_ACTIVITIES = [
  { text: "John Doe registered as a Candidate.", time: "2 mins ago" },
  { text: "LoCo Tech posted a new job: Sr. React Dev.", time: "15 mins ago" },
  { text: "Sarah applied for UI/UX Designer.", time: "1 hour ago" },
  { text: "New company 'Alpha Systems' pending approval.", time: "3 hours ago" },
  { text: "System backup completed successfully.", time: "5 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Here is what is happening on your platform today.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
          <PlusCircle className="w-4 h-4" />
          Add New Job
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-200 transition-colors">
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
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Platform Traffic</h3>
            <select className="text-xs font-semibold text-slate-500 border border-slate-200 rounded-md p-1 bg-white outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="w-full flex-grow min-h-[300px] border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center bg-slate-50">
            <p className="text-slate-400 text-sm font-medium text-center px-6">
              Recharts or Chart.js component will be integrated here.<br/>
              Currently showing static placeholder.
            </p>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {RECENT_ACTIVITIES.map((activity, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Timeline connector line */}
                {i !== RECENT_ACTIVITIES.length - 1 && (
                  <div className="absolute left-[7px] top-[24px] bottom-[-24px] w-[2px] bg-slate-100"></div>
                )}
                <div className="w-[16px] h-[16px] mt-1 rounded-full bg-white border-4 border-blue-500 z-10 shrink-0"></div>
                <div className="pb-2">
                  <p className="text-sm font-medium text-slate-800 leading-snug">{activity.text}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-100 rounded-lg transition">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}