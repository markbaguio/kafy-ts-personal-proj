import { formattedCurrency } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import CustomHoverCardInfoIcon from "../CustomHoverCardInfoIcon";
import {
  FREE_SHIPPING_THRESHOLD,
  MockOrderSummaryValues,
  OrderSummaryTextValues,
} from "@/constants";
import { Button } from "@/components/ui/button";

type PriceSummaryProps = {
  calculatedSubtotal: number;
  calculatedOrderTotal: number;
  showHeader?: boolean;
  buttonLabel: string;
  onButtonClick: () => void;
};

function PriceSummary({
  calculatedOrderTotal,
  calculatedSubtotal,
  showHeader = false,
  buttonLabel,
  onButtonClick,
}: PriceSummaryProps) {
  return (
    <div className=" bg-success-green/20 flex flex-col gap-5">
      {showHeader && <h2 className="text-2xl font-semibold">Order Summary</h2>}
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <span className="text-raisin-black-muted">Subtotal</span>
          <span>{formattedCurrency(calculatedSubtotal)}</span>
        </div>
        <Separator />
        <div className="flex flex-row justify-between">
          <div className="flex gap-2">
            <span className="text-raisin-black-muted">Delivery estimate</span>
            <CustomHoverCardInfoIcon
              message={OrderSummaryTextValues.delivery}
            />
          </div>
          <span
            className={`${
              calculatedSubtotal >= FREE_SHIPPING_THRESHOLD &&
              "line-through text-destructive"
            }`}
          >
            {formattedCurrency(MockOrderSummaryValues.delivery)}
          </span>
        </div>
        <Separator />
        <div className="flex flex-row justify-between">
          <div className="flex gap-2">
            <span className="text-raisin-black-muted">Tax</span>
            <CustomHoverCardInfoIcon message={OrderSummaryTextValues.tax} />
          </div>
          <span>{formattedCurrency(MockOrderSummaryValues.tax)}</span>
        </div>
        <Separator />
        <div className="flex flex-row justify-between">
          <span className="text-xl font-semibold">Order total</span>
          <span className="text-xl font-semibold">
            {/* {PESOSIGN}
                  {(100).toFixed(2)} */}
            {calculatedSubtotal !== 0
              ? formattedCurrency(calculatedOrderTotal)
              : formattedCurrency(0)}
          </span>
        </div>
        <Button onClick={onButtonClick} variant="main">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

export default PriceSummary;
