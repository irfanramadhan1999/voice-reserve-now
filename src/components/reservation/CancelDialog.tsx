
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmCancel: () => void;
  restaurantName: string;
}

const CancelDialog = ({ open, onOpenChange, onConfirmCancel, restaurantName }: CancelDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your reservation at {restaurantName}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, Keep It</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmCancel} className="bg-red-500 hover:bg-red-600">
            Yes, Cancel Reservation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelDialog;
