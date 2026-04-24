import React from 'react'

const page = () => {
  return (
    <div>Auth page</div>
  )
}

export default page


// "use client"

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Briefcase, User, Lock, Mail, Loader2 } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedin, FaGithub } from "react-icons/fa";

// // Import the hooks we just updated
// import { useLogin, useRegister } from "@/hooks/use-auth"; 

// // ─── VALIDATION SCHEMAS ──────────────────────────────────────────────────
// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(1, "Password is required"),
// });

// const registerSchema = z.object({
//   firstName: z.string().min(2, "First name is too short"),
//   lastName: z.string().min(2, "Last name is too short"),
//   username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "No special characters allowed"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   role: z.enum(["CANDIDATE", "RECRUITER", "ADMIN"], {
//     required_error: "Please select your role",
//   }),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;
// type RegisterFormValues = z.infer<typeof registerSchema>;

// export default function AuthPage() {
//   const [activeTab, setActiveTab] = useState("login");
  
//   // Use TanStack Hooks
//   const loginMutation = useLogin();
//   const registerMutation = useRegister();

//   // ─── FORM INITIALIZATION ────────────────────────────────────────────────
//   const loginForm = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const registerForm = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       firstName: "", lastName: "", username: "", email: "", password: "", role: "CANDIDATE",
//     },
//   });

//   // ─── HANDLERS ───────────────────────────────────────────────────────────
//   const onLoginSubmit = (values: LoginFormValues) => {
//     loginMutation.mutate(values);
//   };

//   const onRegisterSubmit = (values: RegisterFormValues) => {
//     const payload = {
//       ...values,
//       name: `${values.firstName} ${values.lastName}`,
//     };
    
//     registerMutation.mutate(payload, {
//       onSuccess: () => {
//         registerForm.reset();
//         setActiveTab("login"); // Auto-switch to login tab on success
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50/50">
//       <Card className="w-full max-w-[480px] shadow-2xl border-slate-200 bg-white">
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <CardHeader className="space-y-1 pb-6">
//             <div className="flex justify-center mb-4">
//               <div className="bg-blue-600 p-2 rounded-lg text-white font-bold text-xl">JW</div>
//             </div>
//             <CardTitle className="text-2xl text-center font-bold tracking-tight text-slate-900">
//               JobWala Portal
//             </CardTitle>
//             <CardDescription className="text-center text-slate-500">
//               Manage your professional journey
//             </CardDescription>
//             <TabsList className="grid w-full grid-cols-2 mt-6">
//               <TabsTrigger value="login">Sign In</TabsTrigger>
//               <TabsTrigger value="register">Create Account</TabsTrigger>
//             </TabsList>
//           </CardHeader>

//           {/* ─── LOGIN TAB ───────────────────────────────────────────────── */}
//           <TabsContent value="login">
//             <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email Address</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
//                     <Input id="login-email" placeholder="name@example.com" className="pl-10" {...loginForm.register("email")} />
//                   </div>
//                   {/* Validation Error Display */}
//                   {loginForm.formState.errors.email && <p className="text-xs text-red-500">{loginForm.formState.errors.email.message}</p>}
//                 </div>
                
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="login-password">Password</Label>
//                   </div>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
//                     <Input id="login-password" type="password" placeholder="••••••••" className="pl-10" {...loginForm.register("password")} />
//                   </div>
//                   {loginForm.formState.errors.password && <p className="text-xs text-red-500">{loginForm.formState.errors.password.message}</p>}
//                 </div>
                
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11" type="submit" disabled={loginMutation.isPending}>
//                   {loginMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Sign In to JobWala"}
//                 </Button>
//               </CardContent>
//             </form>
//           </TabsContent>

//           {/* ─── REGISTER TAB ────────────────────────────────────────────── */}
//           <TabsContent value="register">
//             <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>First Name</Label>
//                     <Input placeholder="John" {...registerForm.register("firstName")} />
//                     {registerForm.formState.errors.firstName && <p className="text-xs text-red-500">{registerForm.formState.errors.firstName.message}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Last Name</Label>
//                     <Input placeholder="Doe" {...registerForm.register("lastName")} />
//                     {registerForm.formState.errors.lastName && <p className="text-xs text-red-500">{registerForm.formState.errors.lastName.message}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Username</Label>
//                   <Input placeholder="johndoe_99" {...registerForm.register("username")} />
//                   {registerForm.formState.errors.username && <p className="text-xs text-red-500">{registerForm.formState.errors.username.message}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Email</Label>
//                   <Input type="email" placeholder="john@company.com" {...registerForm.register("email")} />
//                   {registerForm.formState.errors.email && <p className="text-xs text-red-500">{registerForm.formState.errors.email.message}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Password</Label>
//                   <Input type="password" placeholder="At least 8 characters" {...registerForm.register("password")} />
//                   {registerForm.formState.errors.password && <p className="text-xs text-red-500">{registerForm.formState.errors.password.message}</p>}
//                 </div>

//                 <div className="space-y-3">
//                   <Label>Register as a:</Label>
//                   <div className="grid grid-cols-2 gap-4">
//                     <Button 
//                       variant="outline" type="button"
//                       className={`flex flex-col h-20 gap-1 border-2 transition-all ${registerForm.watch("role") === "CANDIDATE" ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}
//                       onClick={() => registerForm.setValue("role", "CANDIDATE")}
//                     >
//                       <User className={`h-5 w-5 ${registerForm.watch("role") === "CANDIDATE" ? "text-blue-600" : "text-slate-400"}`} />
//                       <span className="text-xs font-semibold">Candidate</span>
//                     </Button>
//                     <Button 
//                       variant="outline" type="button"
//                       className={`flex flex-col h-20 gap-1 border-2 transition-all ${registerForm.watch("role") === "RECRUITER" ? "border-blue-600 bg-blue-50" : "border-slate-100"}`}
//                       onClick={() => registerForm.setValue("role", "RECRUITER")}
//                     >
//                       <Briefcase className={`h-5 w-5 ${registerForm.watch("role") === "RECRUITER" ? "text-blue-600" : "text-slate-400"}`} />
//                       <span className="text-xs font-semibold">Recruiter</span>
//                     </Button>
//                   </div>
//                 </div>

//                 <Button className="w-full bg-slate-900 hover:bg-slate-800 h-11 mt-2" type="submit" disabled={registerMutation.isPending}>
//                   {registerMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Create Account"}
//                 </Button>
//               </CardContent>
//             </form>
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }