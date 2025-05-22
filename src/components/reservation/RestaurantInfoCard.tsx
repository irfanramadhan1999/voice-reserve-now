
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";
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
  
  return (
    <Card className="mb-10 p-4 bg-blue-50/40 border-blue-100">
      <div className={`${isMobile ? 'flex flex-col items-center' : 'flex items-center justify-between'}`}>
        <div className={`flex items-center ${isMobile ? 'mb-4' : ''}`}>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            {/* Restaurant logo/avatar placeholder */}
            <PhoneIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900">{restaurant.name}</h2>
            <div className="flex items-center text-gray-600 mt-1">
              <PhoneIcon className="h-3 w-3 mr-1" />
              <p className="text-xs">{restaurant.phone}</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={onStartCall}
          disabled={callStatus !== "ready"}
          variant="outline" 
          className={`text-green-600 border-green-200 hover:bg-green-50 ${isMobile ? 'w-full' : 'text-xs px-2 py-1 h-auto'}`}
        >
          <span>Ready for call</span>
        </Button>
      </div>
    </Card>
  );
};

export default RestaurantInfoCard;
