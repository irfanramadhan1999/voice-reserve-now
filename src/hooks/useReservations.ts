
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  customer: string;
  date: string;
  time: string;
  table: string;
  guests: string;
  timestamp: string;
}

export const useReservations = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);

  // Get current timestamp
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Add a new reservation
  const addReservation = () => {
    const newReservation: Reservation = {
      id: `R${8500 + reservations.length + 1}`,
      customer: "Tanaka Yuki",
      date: "May 23, 2025",
      time: "19:00 - 20:30",
      table: "Window Seat",
      guests: "2 people",
      timestamp: getCurrentTimestamp()
    };
    
    setReservations(prev => [...prev, newReservation]);
  };

  // Open cancel dialog
  const openCancelDialog = (reservationId: string) => {
    setSelectedReservationId(reservationId);
    setShowCancelDialog(true);
  };

  // Cancel reservation (after confirmation)
  const cancelReservation = () => {
    if (selectedReservationId) {
      setReservations(prev => prev.filter(r => r.id !== selectedReservationId));
      toast({
        title: "Reservation Cancelled",
        description: "Your reservation has been cancelled",
        variant: "destructive",
      });
    }
    setSelectedReservationId(null);
    setShowCancelDialog(false);
  };

  return {
    reservations,
    showCancelDialog,
    setShowCancelDialog,
    addReservation,
    openCancelDialog,
    cancelReservation
  };
};
