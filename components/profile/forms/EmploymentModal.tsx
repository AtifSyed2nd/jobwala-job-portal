// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState, useEffect } from "react";
// import { Employment } from "../sections/EmploymentView";

// interface EmploymentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: Partial<Employment>) => Promise<void>; // Setup for async API calls
//   initialData?: Employment | null;
// }

// export function EmploymentModal({ isOpen, onClose, onSave, initialData }: EmploymentModalProps) {
//   const [formData, setFormData] = useState<Partial<Employment>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Sync state when modal opens/changes
//   useEffect(() => {
//     if (initialData) setFormData(initialData);
//     else setFormData({ role: "", company: "", type: "", duration: "" });
//   }, [initialData, isOpen]);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     await onSave(formData); // In the future, this waits for your Prisma DB update
//     setIsSubmitting(false);
//     onClose();
//   };

// // export interface Employment {
// //   id: string;
// //   role: string;
// //   company: string;
// //   companyLocation: string; // address
// //   salary: string;
// //   joiningDate: string;
// //   leavingDate?: string; 
// //   // isCurrent?: bool;
// //   employmentType?: string; // should be select [full-time, part-time, contract]
// //   skilledUsed?: string; // should be a array [react, html, css]
// //   noticePeriod?: string; // should be select [15-30 days, 2 monts, 3 months]
// //   description?: string;  // 500 words or something
// // }


//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>{initialData ? "Edit Employment" : "Add Employment"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="space-y-2">
//             <Label>Job Title / Role</Label>
//             <Input value={formData.role || ""} onChange={(e) => setFormData({...formData, role: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>Company</Label>
//             <Input value={formData.company || ""} onChange={(e) => setFormData({...formData, company: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>companyLocation</Label>
//             <Input value={formData.companyLocation || ""} onChange={(e) => setFormData({...formData, companyLocation: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>salary</Label>
//             <Input value={formData.salary || ""} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>joiningDate</Label>
//             <Input value={formData.joiningDate || ""} onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>leavingDate</Label>
//             <Input value={formData.leavingDate || ""} onChange={(e) => setFormData({...formData, leavingDate: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>employmentType</Label>
//             <Input value={formData.employmentType || ""} onChange={(e) => setFormData({...formData, employmentType: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>skilledUsed</Label>
//             <Input value={formData.skilledUsed || ""} onChange={(e) => setFormData({...formData, skilledUsed: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>noticePeriod</Label>
//             <Input value={formData.noticePeriod || ""} onChange={(e) => setFormData({...formData, noticePeriod: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <Label>description</Label>
//             <Input value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} />
//           </div>
//           {/* Add other fields... */}
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
//           <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
//             {isSubmitting ? "Saving..." : "Save"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }