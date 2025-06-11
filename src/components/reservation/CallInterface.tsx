import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CallInterfaceProps {
  callStatus: "ready" | "active" | "completed";
  duration: number;
  onStartCall: () => void;
  onEndCall: () => void;
  formatDuration: (seconds: number) => string;
  restaurant: {
    name: string;
    phone: string;
    address: string;
  };
}

const CallInterface = ({ callStatus, duration, onStartCall, onEndCall, formatDuration, restaurant }: CallInterfaceProps) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center">
        {/* Call display circle with restaurant profile picture */}
        <div className="w-36 h-36 rounded-full bg-blue-100/50 flex items-center justify-center mb-6 relative">
          <div className="w-32 h-32 rounded-full bg-blue-50/70 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=center" 
                  alt={restaurant.name} 
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="bg-blue-500 text-white text-lg font-bold w-full h-full flex items-center justify-center">
                  {restaurant.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              {/* Call status overlay */}
              {callStatus === "active" && (
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
              )}
              {callStatus === "completed" && (
                <div className="absolute inset-0 bg-green-500/20 rounded-full flex items-center justify-center">
                  <X className="h-6 w-6 text-green-600" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Call action button */}
        {callStatus === "ready" && (
          <>
            <Button 
              onClick={onStartCall} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out"
            >
              <Phone className="h-5 w-5 mr-2" />
              Start Call
            </Button>
            
            {/* Timer - Only show when call is active, positioned under the start call button */}
            {callStatus === "active" && (
              <div className="text-green-600 mt-4 text-lg font-medium">
                {formatDuration(duration)}
              </div>
            )}
          </>
        )}
        
        {callStatus === "active" && (
          <>
            <div className="text-center mb-4">
              <span className="text-blue-600 font-medium">Call in progress...</span>
            </div>
            <Button
              onClick={onEndCall}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out"
            >
              <PhoneOff className="h-5 w-5 mr-2" />
              End Call
            </Button>
            
            {/* Timer - Show under the end call button when call is active */}
            <div className="text-green-600 mt-4 text-lg font-medium">
              {formatDuration(duration)}
            </div>
          </>
        )}
        
        {callStatus === "completed" && (
          <>
            <div className="text-center mb-4">
              <span className="text-green-600 font-medium flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                Call Completed
              </span>
            </div>
            <Button 
              onClick={onStartCall} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out"
            >
              <Phone className="h-5 w-5 mr-2" />
              Start Call
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallInterface;
