'use client'
import { SettingsDashboard } from "@/components/profile/SettingsDashboard";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Manage your credentials, privacy, and preferences.
          </p>
        </header>

        <SettingsDashboard />
      </div>
    </div>
  );
}