import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

type CustomHoverCardInfoIconProps = {
  message: string;
  icon?: ReactNode;
  className?: string;
};

function CustomHoverCardInfoIcon({
  message,
  icon,
  className,
}: CustomHoverCardInfoIconProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className={cn(
            "inline-flex items-center justify-center cursor-help",
            className
          )}
        >
          {icon ?? <Info className="h-4 w-4 text-muted-foreground" />}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm max-w-xs">
        {message}
      </HoverCardContent>
    </HoverCard>
  );
}

export default CustomHoverCardInfoIcon;
