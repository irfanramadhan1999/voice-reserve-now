
import React from "react";
import RestaurantInfoCard from "./RestaurantInfoCard";
import CallInterface from "./CallInterface";
import EmptyState from "./EmptyState";
import ReservationCarousel from "./ReservationCarousel";

interface Reservation {
  id: string;
  customer: string;
  date: string;
  time: string;
  table: string;
  guests: string;
  timestamp: string;
}

interface ReservationContentProps {
  restaurant: {
    name: string;
    phone: string;
    address: string;
  };
  callStatus: "ready" | "active" | "completed" | "unavailable" | "blocked";
  duration: number;
  formatDuration: (seconds: number) => string;
  onStartCall: () => void;
  onEndCall: () => void;
  reservations: Reservation[];
  onCancelClick: (reservationId: string) => void;
}

const ReservationContent = ({
  restaurant,
  callStatus,
  duration,
  formatDuration,
  onStartCall,
  onEndCall,
  reservations,
  onCancelClick
}: ReservationContentProps) => {
  return (
    <>
      {/* Restaurant Info Card */}
      <RestaurantInfoCard 
        restaurant={restaurant} 
      />
      
      {/* Call Interface */}
      <CallInterface 
        callStatus={callStatus}
        duration={duration}
        onStartCall={onStartCall}
        onEndCall={onEndCall}
        formatDuration={formatDuration}
        restaurant={restaurant}
      />
      
      {/* Empty State - Only shown when no reservations and call not active, unavailable, or blocked */}
      {(callStatus === "ready" || callStatus === "unavailable") && reservations.length === 0 && <EmptyState />}
      
      {/* Blocked State - Show spam identification reasons */}
      {callStatus === "blocked" && (
        <div className="bg-red-50/40 border border-red-100 rounded-lg p-6 mx-auto max-w-md w-full">
          <h3 className="text-red-700 font-medium text-center mb-4">Why you were identified as spam:</h3>
          <ul className="text-red-600 text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Repeatedly calling and hanging up
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Long calls asking questions unrelated to the restaurant and ultimately not making a reservation
            </li>
          </ul>
        </div>
      )}
      
      {/* Reservation Details with Carousel - Show when reservations exist */}
      {reservations.length > 0 && (
        <ReservationCarousel 
          reservations={reservations}
          onCancelClick={onCancelClick}
        />
      )}
      
      {/* No reservations message - Show when no reservations but call has been made */}
      {reservations.length === 0 && (callStatus === "active" || callStatus === "completed") && (
        <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-6 mx-auto max-w-md w-full">
          <p className="text-gray-600 text-center">No reservations yet, please start a call to make a reservation</p>
        </div>
      )}
    </>
  );
};

export default ReservationContent;
