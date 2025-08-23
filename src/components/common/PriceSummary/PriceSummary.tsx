import { formatCurrency } from "@/lib/utils";
import CustomHoverCardInfoIcon from "../CustomHoverCardInfoIcon";
import {
  FREE_SHIPPING_THRESHOLD,
  MockOrderSummaryValues,
  OrderSummaryTextValues,
} from "@/constants";
import { Separator } from "@/components/ui/separator";

type PriceSummaryProps = {
  calculatedSubtotal: number;
  calculatedOrderTotal: number;
  headerText?: string;
  showHeader?: boolean;
};

function PriceSummary({
  calculatedOrderTotal,
  calculatedSubtotal,
  headerText,
  showHeader = false,
}: PriceSummaryProps) {
  return (
    <div className="flex flex-col gap-5">
      {showHeader && <h2 className="text-2xl font-semibold">{headerText}</h2>}
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <span className="text-raisin-black-muted">Subtotal</span>
          <span>{formatCurrency(calculatedSubtotal)}</span>
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
            {formatCurrency(MockOrderSummaryValues.delivery)}
          </span>
        </div>
        <Separator />
        <div className="flex flex-row justify-between">
          <div className="flex gap-2">
            <span className="text-raisin-black-muted">Tax</span>
            <CustomHoverCardInfoIcon message={OrderSummaryTextValues.tax} />
          </div>
          <span>{formatCurrency(MockOrderSummaryValues.tax)}</span>
        </div>
        <Separator />
        <div className="flex flex-row justify-between">
          <span className="text-xl font-semibold">Order total</span>
          <span className="text-xl font-semibold">
            {/* {PESOSIGN}
                  {(100).toFixed(2)} */}
            {calculatedSubtotal !== 0
              ? formatCurrency(calculatedOrderTotal)
              : formatCurrency(0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PriceSummary;
