"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Briefcase, User, Lock, Mail, Link } from "lucide-react"

export default function AuthPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <Card className="w-full max-w-[450px] shadow-xl border-slate-200">
        <Tabs defaultValue="login" className="w-full">
          <CardHeader className="pb-0">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </CardHeader>

          {/* LOGIN FORM */}
          <TabsContent value="login">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="name@example.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-2">Sign In</Button>
            </CardContent>
          </TabsContent>

          {/* REGISTER FORM */}
          <TabsContent value="register">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-bold">Create Account</CardTitle>
              <CardDescription className="text-center">
                Join our community to find your next career move
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-username">Username</Label>
                <Input id="reg-username" placeholder="johndoe123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" type="password" placeholder="••••••••" />
              </div>
              
              <div className="space-y-2">
                <Label>I am a:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex flex-col h-20 gap-1 border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="text-xs">Candidate</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-20 gap-1 border-slate-100 hover:border-blue-600 hover:bg-blue-50">
                    <Briefcase className="h-5 w-5 text-slate-600" />
                    <span className="text-xs">Recruiter</span>
                  </Button>
                </div>
              </div>
              
              <Button className="w-full bg-slate-900 hover:bg-slate-800 mt-2">Create Account</Button>
            </CardContent>
          </TabsContent>
        </Tabs>

        {/* <div className="px-6 pb-6">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2">
            <Link className="h-4 w-4" /> Github
          </Button>
        </div> */}
      </Card>
    </div>
  )
}