"use client";

import { useState, useEffect } from "react";
import { 
  User, Mail, Lock, Eye, EyeOff, 
  Bell, Save
} from "lucide-react";
import { SectionCard } from "./SectionCard";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type TabType = "profile" | "email" | "security" | "notifications";

export function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const menuItems = [
    { id: "profile", label: "Profile Settings", icon: <User className="w-4 h-4" /> },
    { id: "email", label: "Email Address", icon: <Mail className="w-4 h-4" /> },
    { id: "security", label: "Password & Security", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm sticky top-24">
          <div className="p-4 border-b bg-slate-50/50 font-bold text-xs uppercase tracking-widest text-slate-500">
            Account Settings
          </div>
          <nav className="p-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "email" && <EmailTab />}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "notifications" && <NotificationTab />}
      </main>
    </div>
  );
}

/**
 * Reusable wrapper for setting sections
 */
function SettingWrapper({ title, description, children, onSave }: any) {
  return (
    <SectionCard id={title} title={title}>
      <div className="p-1">
        <p className="text-xs text-slate-500 mb-6">{description}</p>
        <div className="space-y-4">
          {children}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onSave}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* --- Tab Content Components with State Logic --- */

function ProfileTab() {
  const { user, refetchUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!user || !name.trim()) return;
    
    setIsLoading(true);
    try {
      await fetch("/api/users/update-profile", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      
      await refetchUser();
      toast.success("Profile updated", {
        description: `Your name has been changed to ${name}.`
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingWrapper 
      title="User Profile" 
      description="Update your public display name."
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase">Public Display Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50" 
            placeholder="Jane Smith" 
          />
        </div>
      </div>
    </SettingWrapper>
  );
}

function EmailTab() {
  const { user, refetchUser } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (!email.includes("@")) {
      return toast.error("Invalid email", { description: "Please enter a valid email address." });
    }
    
    setIsLoading(true);
    try {
      await fetch("/api/users/update-email", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      await refetchUser();
      toast.success("Email address updated", {
        description: `A confirmation link has been sent to ${email}.`
      });
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingWrapper 
      title="Email Address" 
      description="Manage the email address associated with your account."
      onSave={handleSave}
    >
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs font-bold text-blue-900">Current Email</p>
            <p className="text-sm text-blue-700">{user?.email || "No email set"}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase">New Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50" 
          />
        </div>
      </div>
    </SettingWrapper>
  );
}

function SecurityTab() {
  const [show, setShow] = useState(false);
  
  const handleSave = () => {
    // Logic for password changes usually involves a backend call
    toast.info("Password update simulation", {
      description: "In a real app, this would verify your old password first."
    });
  };

  return (
    <SettingWrapper 
      title="Security" 
      description="Ensure your account is using a strong password."
      onSave={handleSave}
    >
      <div className="space-y-4">
        {[
          { label: "Current Password", placeholder: "••••••••" },
          { label: "New Password", placeholder: "Min. 8 characters" },
        ].map((item) => (
          <div key={item.label} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">{item.label}</label>
            <div className="relative">
              <input 
                type={show ? "text" : "password"} 
                placeholder={item.placeholder}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <button onClick={() => setShow(!show)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </SettingWrapper>
  );
}

function NotificationTab() {
  const handleSave = () => {
    toast.success("Preferences saved", {
      description: "Your notification settings have been updated."
    });
  };

  const options = ["Job Alerts", "Application Updates", "Newsletter", "Marketing"];
  return (
    <SettingWrapper title="Notifications" description="Choose what communications you want to receive." onSave={handleSave}>
      <div className="divide-y divide-slate-100">
        {options.map((opt) => (
          <div key={opt} className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-slate-700">{opt}</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
          </div>
        ))}
      </div>
    </SettingWrapper>
  );
}