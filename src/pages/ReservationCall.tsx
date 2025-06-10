
import React from "react";
import { useReservations } from "@/hooks/useReservations";
import { useCall } from "@/hooks/useCall";
import ReservationContent from "@/components/reservation/ReservationContent";
import CancelDialog from "@/components/reservation/CancelDialog";

const ReservationCall = () => {
  const {
    reservations,
    showCancelDialog,
    setShowCancelDialog,
    addReservation,
    openCancelDialog,
    cancelReservation
  } = useReservations();

  const {
    callStatus,
    duration,
    formatDuration,
    startCall,
    endCall
  } = useCall(addReservation);

  // Mock restaurant data
  const restaurant = {
    name: "Sakura Sushi Tokyo",
    phone: "01-90-1234-5678",
    address: "1-2-3 Shibuya, Tokyo, Japan"
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
          </div>
        
          <ReservationContent
            restaurant={restaurant}
            callStatus={callStatus}
            duration={duration}
            formatDuration={formatDuration}
            onStartCall={startCall}
            onEndCall={endCall}
            reservations={reservations}
            onCancelClick={openCancelDialog}
          />
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
