import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

/**
 * ? Elements of this QuantityInput Component can be modified.
 * ? This component is reusable design wise.
 */

export type QuantityInputProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  showHeader?: boolean;
  classNames?: {
    wrapperDiv?: string;
    header?: string;
    buttonContainer?: string;
    button?: string;
    quantityText?: string;
  };
};

export function QuantityInput({
  quantity,
  onQuantityChange,
  showHeader = true,
  classNames = {},
}: QuantityInputProps) {
  return (
    <div className={cn("flex flex-col gap-1 w-fit", classNames.wrapperDiv)}>
      {showHeader && (
        <span className={cn("text-lg/tight font-light", classNames.header)}>
          Quantity
        </span>
      )}
      <div
        className={cn(
          "flex items-center gap-3 border-1 border-raisin-black p-2 rounded-lg",
          classNames.buttonContainer
        )}
      >
        <Button
          variant="outline2"
          className={cn(
            "border-none rounded-lg bg-success-green/20",
            classNames.button
          )}
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(quantity - 1)}
        >
          <Minus />
        </Button>
        <span
          className={cn(
            "text-2xl text-center min-w-[3ch] tabular-nums",
            classNames.quantityText
          )}
        >
          {quantity}
        </span>
        <Button
          variant="outline2"
          className={cn(
            "border-none rounded-lg bg-success-green/20",
            classNames.button
          )}
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
