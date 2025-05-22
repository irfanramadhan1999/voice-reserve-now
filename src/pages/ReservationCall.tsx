
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Timer } from "lucide-react";
import RestaurantInfoCard from "@/components/reservation/RestaurantInfoCard";
import CallInterface from "@/components/reservation/CallInterface";
import EmptyState from "@/components/reservation/EmptyState";
import ReservationDetails from "@/components/reservation/ReservationDetails";
import CancelDialog from "@/components/reservation/CancelDialog";

const ReservationCall = () => {
  const { toast } = useToast();
  const [callStatus, setCallStatus] = useState<"ready" | "active" | "completed">("ready");
  const [duration, setDuration] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // Handle call duration timer
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (callStatus === "active") {
      intervalId = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [callStatus]);
  
  // Format duration to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start call
  const startCall = () => {
    setCallStatus("active");
    setDuration(0);
    toast({
      title: "Call Connected",
      description: "You are now connected to the reservation line",
    });
    
    // Simulate call completion after 3 seconds
    setTimeout(() => {
      setCallStatus("completed");
      toast({
        title: "Call Completed",
        description: "Your reservation has been confirmed",
      });
    }, 3000);
  };

  // Open cancel dialog
  const openCancelDialog = () => {
    setShowCancelDialog(true);
  };

  // Cancel reservation (after confirmation)
  const cancelReservation = () => {
    toast({
      title: "Reservation Cancelled",
      description: "Your reservation has been cancelled",
      variant: "destructive",
    });
    setCallStatus("ready");
    setDuration(0);
    setShowCancelDialog(false);
  };

  // Mock restaurant data
  const restaurant = {
    name: "Sakura Sushi Tokyo",
    phone: "01-90-1234-5678"
  };

  // Mock reservation data
  const reservation = {
    id: "R8501",
    customer: "Tanaka Yuki",
    date: "May 23, 2025",
    time: "19:00 - 20:30",
    table: "Window Seat",
    guests: "2 people"
  };

  const currentDate = "Thursday, May 22, 2025";

  return (
    <div className="min-h-screen bg-gray-800 py-8 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Phone-like wrapper */}
        <div className="p-6 pb-10 relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold">Reservation Call</h1>
              <p className="text-gray-500 text-sm">{currentDate}</p>
            </div>
            <div className="text-right">
              {callStatus === "active" && (
                <div className="flex items-center text-green-600">
                  <Timer className="h-4 w-4 mr-1" />
                  <span>{formatDuration(duration)}</span>
                </div>
              )}
            </div>
          </div>
        
          {/* Restaurant Info Card */}
          <RestaurantInfoCard 
            restaurant={restaurant} 
            callStatus={callStatus}
            onStartCall={startCall}
          />
          
          {/* Call Interface */}
          <CallInterface 
            callStatus={callStatus}
            duration={duration}
            onStartCall={startCall}
            formatDuration={formatDuration}
          />
          
          {/* Empty State - Only shown when no reservation and call not active */}
          {callStatus === "ready" && <EmptyState />}
          
          {/* Reservation Details - Only shown after call is completed */}
          {callStatus === "completed" && (
            <ReservationDetails 
              reservation={reservation}
              onCancelClick={openCancelDialog}
            />
          )}
        </div>
      </div>
      
      {/* Cancel Confirmation Dialog */}
      <CancelDialog 
        open={showCancelDialog} 
        onOpenChange={setShowCancelDialog}
        onConfirmCancel={cancelReservation}
        restaurantName={restaurant.name}
      />
    </div>
  );
};

export default ReservationCall;
