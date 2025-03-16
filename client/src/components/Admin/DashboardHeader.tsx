import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  action?: {
    label: string;
    to: string;
  };
  backButton?: {
    label: string;
    to: string;
  };
}

export function DashboardHeader({
  heading,
  text,
  action,
  backButton,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-1">
        {backButton && (
          <Button variant="link" className="p-0 h-auto mb-2" asChild>
            <Link to={backButton.to}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backButton.label}
            </Link>
          </Button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {heading}
        </h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {action && (
        <Button asChild>
          <Link to={action.to}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
