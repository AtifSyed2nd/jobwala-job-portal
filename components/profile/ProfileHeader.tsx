"use client";

import {
  MapPin,
  Phone,
  Mail,
  Pencil,
  Upload,
  House,
  BriefcaseBusiness,
  Cake,
  Heart,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SlSocialLinkedin, SlSocialGithub } from "react-icons/sl";
import { CiGlobe, CiTwitter } from "react-icons/ci";
import { ImProfile } from "react-icons/im";

interface ProfileHeaderProps {
  user: any;
  id: string;
  profileType: string;
  onEditProfile?: () => void; // Edits name and headline
  onEditPersonalDetails?: () => void; // Edits the grid (DOB, Address, etc.)
  onUpdatePhoto?: () => void;
  onEditSocials?: () => void;
  onDeleteSocial?: (platform: string) => void;
}

export function ProfileHeader({
  user,
  id,
  profileType,
  onEditProfile,
  onEditPersonalDetails,
  onUpdatePhoto,
  onEditSocials,
  onDeleteSocial,
}: ProfileHeaderProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <SlSocialGithub className="w-4 h-4" />;
      case "linkedin":
        return <SlSocialLinkedin className="w-4 h-4" />;
      case "portfolio":
        return <ImProfile className="w-4 h-4" />;
      case "website":
        return <CiGlobe className="w-4 h-4" />;
      case "twitter":
        return <CiTwitter className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <Card
      id={id}
      className="border-slate-200 shadow-sm overflow-hidden bg-white"
    >
      <CardContent className="p-0">
        <div className="h-2 w-full bg-linear-to-r from-blue-600 to-indigo-400" />

        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-8">
          {/* PROFILE IMAGE */}
          <div className="relative shrink-0 self-center md:self-auto">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden group">
              <span className="text-4xl font-bold text-slate-300 select-none uppercase">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </span>
              <button
                onClick={onUpdatePhoto}
                className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
              >
                <Upload className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold uppercase">Update</span>
              </button>
            </div>
          </div>

          {/* INFO SECTIONS */}
          <div className="flex-1 space-y-6 w-full">
            {/* NAME & HEADLINE */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                  {user.firstName} {user.lastName}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onEditProfile}
                    className="h-8 w-8 rounded-full"
                  >
                    <Pencil className="w-4 h-4 text-slate-400 hover:text-blue-600 transition-colors" />
                  </Button>
                </h1>
                <p className="text-slate-600 font-medium text-lg mt-1">
                  {user.title} <span className="text-slate-300 px-1">|</span>{" "}
                  {user.description}
                </p>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* PERSONAL DETAILS SECTION */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Personal Details
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEditPersonalDetails}
                  className="h-7 text-[10px] uppercase font-bold"
                >
                  Edit Details
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
                <DetailItem icon={<MapPin />} label={user.location} />
                <DetailItem icon={<House />} label={user.address} />
                <DetailItem
                  icon={<BriefcaseBusiness />}
                  label={user.experiences || "5 Years"}
                />
                <DetailItem icon={<Cake />} label={user.dob} />
                <DetailItem icon={<Phone />} label={user.contact} />
                <DetailItem icon={<Heart />} label={user.maritalStatus} />
              </div>
            </div>

            {/* SOCIAL LINKS SECTION */}
            {profileType == "candidate" && (
              <div className="pt-2 border-t border-dashed border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Social & Professional Links
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEditSocials}
                    className="h-7 text-[10px] uppercase font-bold"
                  >
                    Manage Links
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {user.socials?.map((social: any) => (
                    <div
                      key={social.platform}
                      className="group flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-transparent hover:border-blue-100 hover:bg-white transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-1.5 bg-white rounded shadow-sm text-slate-500 group-hover:text-blue-600">
                          {getSocialIcon(social.platform)}
                        </div>
                        <span className="truncate font-medium text-slate-700">
                          {social.username || social.url}
                        </span>
                      </div>
                      <button
                        onClick={() => onDeleteSocial?.(social.platform)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400">{icon}</div>
      <span className="truncate">{label || "Not specified"}</span>
    </div>
  );
}
