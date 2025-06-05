
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface RestaurantInfoCardProps {
  restaurant: {
    name: string;
    phone: string;
  };
  callStatus: "ready" | "active" | "completed";
  onStartCall: () => void;
}

const RestaurantInfoCard = ({ restaurant, callStatus, onStartCall }: RestaurantInfoCardProps) => {
  const isMobile = useIsMobile();
  
  // Determine restaurant status (open/closed) based on time or other logic
  // For now, we'll assume it's open during business hours
  const isOpen = true; // This could be dynamic based on actual business hours
  
  return (
    <Card className="mb-10 p-4 bg-blue-50/40 border-blue-100">
      <div className={`${isMobile ? 'flex flex-col items-center' : 'flex items-center justify-between'}`}>
        <div className={`flex items-center ${isMobile ? 'mb-4' : ''}`}>
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=center" 
              alt={restaurant.name} 
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-100 text-blue-500">
              {restaurant.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold text-blue-900">{restaurant.name}</h2>
            <div className="flex items-center text-gray-600 mt-1">
              <PhoneIcon className="h-3 w-3 mr-1" />
              <p className="text-xs">{restaurant.phone}</p>
            </div>
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
