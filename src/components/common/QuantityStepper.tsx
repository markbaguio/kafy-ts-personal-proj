import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

export type QuantityStepperProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export function QuantityStepper({
  quantity = 1,
  onQuantityChange,
}: QuantityStepperProps) {
  return (
    <div className="flex flex-col gap-1 w-fit">
      <span className="text-lg/tight font-light">Quantity</span>
      <div
        className="flex items-center gap-3 border-1
      border-raisin-black p-2 rounded-lg"
      >
        <Button
          variant="outline2"
          className="border-none rounded-lg"
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(quantity - 1)}
        >
          <Minus width={50} />
        </Button>
        <span className="text-2xl">{quantity}</span>
        <Button
          variant="outline2"
          className="border-none rounded-lg "
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus width={50} />
        </Button>
      </div>
    </div>
  );
}
