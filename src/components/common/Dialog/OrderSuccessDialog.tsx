import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";

type OrderSuccessDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  onViewTransactions: () => void;
  onGrabAnotherCup: () => void;
};

export default function OrderSuccessDialog({
  open = false,
  onOpenChange,
  onGrabAnotherCup,
  onViewTransactions,
}: OrderSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader className=" flex flex-col items-center justify-center gap-4">
          <div className="rounded-full p-5 bg-success-green">
            <CircleCheckBig className="size-30 text-milky-white" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <DialogTitle>Order placed successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Order confirmed! Keep earning rewards with every sip, your next
              favorite drink might just be a click away.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col gap-4 sm:flex-col sm:justify-center">
          <Button onClick={onViewTransactions}>View Transactions</Button>
          <Button
            onClick={onGrabAnotherCup}
            variant="outline2"
            className="w-full"
          >
            Grab Another Cup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
