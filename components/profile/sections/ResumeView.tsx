import { FileText, Download, Trash2, Calendar,Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeData {
  name: string;
  date: string;
}

interface ResumeViewProps {
  data: ResumeData;
  onDownload?: () => void;
  onDelete?: () => void;
  onUpload?: () => void;
}

export function ResumeView({ data, onDownload, onDelete, onUpload }: ResumeViewProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/30 group hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-4">
        {/* File Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 shrink-0">
          <FileText className="w-6 h-6" />
        </div>
        
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 break-all">
            {data?.name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>Uploaded on {data?.date}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onUpload}
          className="flex-1 sm:flex-none border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDownload}
          className="flex-1 sm:flex-none border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDelete}
          className="text-slate-400 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}