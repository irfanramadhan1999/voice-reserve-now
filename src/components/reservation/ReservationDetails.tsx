
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, X, Camera } from "lucide-react";

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
    <Card className="bg-blue-50/40 border-blue-100 p-4">
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
          <span className="text-gray-500 text-sm">Table:</span>
          <span className="font-medium text-sm">{reservation.table}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Guests:</span>
          <span className="font-medium text-sm">{reservation.guests}</span>
        </div>
      </div>
      
      {/* Screenshot reminder message */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md flex items-start">
        <Camera className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-xs text-yellow-700">
          Please take a screenshot of these details to save your reservation information.
        </p>
      </div>
      
      <Button 
        onClick={onCancelClick}
        variant="outline" 
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white border-none"
      >
        <X className="h-4 w-4 mr-1" />
        Cancel Reservation
      </Button>
    </Card>
  );
};

export default ReservationDetails;
