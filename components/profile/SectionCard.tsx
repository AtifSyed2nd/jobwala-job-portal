import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  id: string;
  title: string;
  actionLabel?: string;
  actionType?: "add" | "edit";
  onAction?: () => void;
  children: React.ReactNode;
}

export function SectionCard({ id, title, actionLabel, onAction, children }: Props) {
  return (
    <Card id={id} className="border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-white py-4 px-6">
        <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
        {actionLabel && (
          <Button variant="ghost" size="sm" onClick={onAction} className="text-blue-600 font-bold hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-1" /> {actionLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}