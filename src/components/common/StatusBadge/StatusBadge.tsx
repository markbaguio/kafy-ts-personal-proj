import { Badge, badgeVariants } from "@/components/ui/badge";
import { OrderStatus } from "@/models/types";
import { VariantProps } from "class-variance-authority";
import { Check, CircleOff, Dot } from "lucide-react";
import { ReactNode } from "react";

type StatusBadgeProps = {
  orderStatus: OrderStatus;
};

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    badgeVariant: VariantProps<typeof badgeVariants>;
    icon: ReactNode;
  }
> = {
  orderInProgress: {
    badgeVariant: { variant: "orderInProgress" },
    icon: <Dot />,
    label: "Order being prepared",
  },
  orderPlaced: {
    badgeVariant: { variant: "orderPlaced" },
    icon: <Dot />,
    label: "Order being prepared",
  },
  completed: {
    badgeVariant: { variant: "completed" },
    icon: <Check />,
    label: "Order completed",
  },
  canceled: {
    badgeVariant: { variant: "canceled" },
    icon: <CircleOff />,
    label: "Order canceled",
  },
};

export default function StatusBadge({ orderStatus }: StatusBadgeProps) {
  const { badgeVariant, icon, label } = statusConfig[orderStatus];
  return (
    <Badge {...badgeVariant} className="flex flex-row-reverse">
      <span>{label}</span>
      {icon}
    </Badge>
  );
}
