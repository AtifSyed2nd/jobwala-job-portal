// components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-slate-50 border-t py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-blue-900">jobportal.app</h3>
          <p className="text-sm text-slate-500">
            Connecting world-class talent with the most innovative companies in 2026.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900">For Candidates</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="hover:text-blue-600 cursor-pointer">Browse Jobs</li>
            <li className="hover:text-blue-600 cursor-pointer">Job Alerts</li>
            <li className="hover:text-blue-600 cursor-pointer">Resume Builder</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900">For Employers</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="hover:text-blue-600 cursor-pointer">Post a Job</li>
            <li className="hover:text-blue-600 cursor-pointer">Browse Candidates</li>
            <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-slate-400">
        © 2026 JobPortal. Built with Next.js 16 & Prisma 7.
      </div>
    </footer>
  );
}