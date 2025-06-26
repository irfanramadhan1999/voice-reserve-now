
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIcon, MapPinIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RestaurantInfoCardProps {
  restaurant: {
    name: string;
    phone: string;
    address: string;
  };
}

const RestaurantInfoCard = ({ restaurant }: RestaurantInfoCardProps) => {
  const isMobile = useIsMobile();
  
  // Determine restaurant status (open/closed) based on time or other logic
  // For now, we'll assume it's open during business hours
  const isOpen = true; // This could be dynamic based on actual business hours
  
  return (
    <Card className="mb-10 p-4 bg-blue-50/40 border-blue-100">
      <div className={`${isMobile ? 'flex flex-col items-center' : 'flex items-center justify-between'}`}>
        <div className={`${isMobile ? 'mb-4 text-center' : ''}`}>
          <h2 className="text-lg font-bold text-blue-900">{restaurant.name}</h2>
          <div className="flex items-center text-gray-600 mt-1">
            <PhoneIcon className="h-3 w-3 mr-1" />
            <p className="text-xs">{restaurant.phone}</p>
          </div>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPinIcon className="h-3 w-3 mr-1" />
            <p className="text-xs">{restaurant.address}</p>
          </div>
        </div>
        <div className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isOpen 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            <span className={`h-2 w-2 rounded-full mr-2 ${
              isOpen ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            {isOpen ? 'Open' : 'Closed'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantInfoCard;
