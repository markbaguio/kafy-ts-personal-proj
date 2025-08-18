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
  handleOpenChange: () => void;
  handleViewTransactions: () => void;
  handleGrabAnotherCup: () => void;
};

export default function OrderSuccessDialog({
  open = false,
  handleOpenChange,
  handleGrabAnotherCup,
  handleViewTransactions,
}: OrderSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader className=" flex flex-col items-center justify-center gap-4">
          <div className="rounded-full p-5 bg-success-green">
            <CircleCheckBig className="size-30 text-milky-white" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <DialogTitle>Order placed Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col gap-4 sm:flex-col sm:justify-center">
          <Button onClick={handleViewTransactions}>View Transactions</Button>
          <Button
            onClick={handleGrabAnotherCup}
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
