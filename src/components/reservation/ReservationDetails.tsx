
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

interface ReservationDetailsProps {
  reservation: {
    id: string;
    customer: string;
    date: string;
    time: string;
    table: string;
    guests: string;
  };
  onCancelClick: () => void;
}

const ReservationDetails = ({ reservation, onCancelClick }: ReservationDetailsProps) => {
  return (
    <Card className="bg-blue-50/40 border-blue-100 p-6 mx-auto max-w-md w-full">
      <div className="flex items-center mb-4">
        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
        <h3 className="text-md font-semibold text-blue-900">Reservation Details</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Booking ID:</span>
          <span className="font-medium text-sm">{reservation.id}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Customer:</span>
          <span className="font-medium text-sm">{reservation.customer}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Date:</span>
          <span className="font-medium text-sm">{reservation.date}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Time:</span>
          <span className="font-medium text-sm">{reservation.time}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Guests:</span>
          <span className="font-medium text-sm">{reservation.guests}</span>
        </div>
      </div>
      
      <Button 
        onClick={onCancelClick}
        variant="outline" 
        className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white border-none"
      >
        <X className="h-4 w-4 mr-1" />
        Cancel Reservation
      </Button>
    </Card>
  );
};

export default ReservationDetails;
