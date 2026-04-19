// app/recruiter/page.tsx
import { Check, Zap, Shield, BarChart3, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecruiterPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="px-4 py-1 border-blue-200 text-blue-700 bg-blue-50/50">
            Trusted by 5,000+ Teams
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Hire the best talent <br />
            <span className="text-blue-600 italic">faster than ever.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Our AI-driven matching engine connects you with pre-vetted candidates 
            in 2026's most competitive markets. Post your first job in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-slate-900 px-8 py-6 text-lg rounded-full">
              Post a Job for Free
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-slate-900">48h</p>
            <p className="text-sm text-slate-500">Avg. Time to Hire</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">1.2M+</p>
            <p className="text-sm text-slate-500">Active Candidates</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">98%</p>
            <p className="text-sm text-slate-500">Placement Success</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-900">150+</p>
            <p className="text-sm text-slate-500">Countries Covered</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Why Recruiters Choose Us</h2>
          <p className="text-slate-500">Everything you need to build your dream team.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureItem 
            icon={<Zap className="w-6 h-6 text-blue-600" />}
            title="AI Screening"
            description="Our 2026 AI models score candidates based on skills, culture fit, and soft skills automatically."
          />
          <FeatureItem 
            icon={<Shield className="w-6 h-6 text-blue-600" />}
            title="Pre-Vetted Talent"
            description="Every candidate undergoes a background check and initial tech screening before you see them."
          />
          <FeatureItem 
            icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
            title="Advanced Analytics"
            description="Track your recruitment funnel, cost-per-hire, and diversity metrics in real-time."
          />
        </div>
      </section>

      {/* 4. PRICING SECTION */}
      <section className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mx-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Scale your hiring without breaking the bank.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <PricingCard 
              title="Starter"
              price="$0"
              description="Perfect for small startups."
              features={["1 Active Job Post", "Basic Candidate Search", "Standard Support"]}
              buttonText="Get Started"
              highlight={false}
            />
            {/* Pro Plan */}
            <PricingCard 
              title="Professional"
              price="$299"
              description="Best for growing teams."
              features={["Unlimited Job Posts", "AI Candidate Matching", "Priority Support", "ATS Integration"]}
              buttonText="Start 14-day Trial"
              highlight={true}
            />
            {/* Enterprise Plan */}
            <PricingCard 
              title="Enterprise"
              price="Custom"
              description="For large scale hiring."
              features={["Custom Workflows", "Dedicated Account Manager", "Unlimited Seats", "White-label Portal"]}
              buttonText="Contact Sales"
              highlight={false}
            />
          </div>
        </div>
      </section>

    </div>
  );
}

// Sub-components for better organization
function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="space-y-4 p-6 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, description, features, buttonText, highlight }: any) {
  return (
    <Card className={`relative border-none ${highlight ? 'bg-blue-600 text-white scale-105 shadow-2xl z-10' : 'bg-slate-800 text-white'}`}>
      {highlight && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 hover:bg-yellow-400 font-bold">
          MOST POPULAR
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className={highlight ? "text-blue-100" : "text-slate-400"}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-sm opacity-70">/month</span>}
        </div>
        <ul className="space-y-3">
          {features.map((f: string) => (
            <li key={f} className="flex items-center gap-3 text-sm">
              <Check className={`w-4 h-4 ${highlight ? "text-blue-200" : "text-blue-500"}`} />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full py-6 font-bold ${highlight ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}