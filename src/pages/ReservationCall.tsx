import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MicIcon, PhoneIcon, MapPinIcon, InfoIcon, Utensils } from "lucide-react";

const ReservationCall = () => {
  const { toast } = useToast();
  const [isCallActive, setIsCallActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start call
  const startCall = () => {
    setIsCallActive(true);
    toast({
      title: "Call Started",
      description: "Connected to reservation assistant",
    });
  };

  // End call
  const endCall = () => {
    setIsCallActive(false);
    setTimeRemaining(300); // Reset timer
    toast({
      title: "Call Ended",
      description: "Your call has been ended",
      variant: "destructive",
    });
  };

  // Cancel reservation
  const cancelReservation = () => {
    toast({
      title: "Reservation Cancelled",
      description: "Your reservation has been cancelled",
      variant: "destructive",
    });
    endCall();
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCallActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      toast({
        title: "Call Time Limit Reached",
        description: "Your call has ended due to the time limit",
        variant: "destructive",
      });
      endCall();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCallActive, timeRemaining, toast]);

  // Mock restaurant data
  const restaurant = {
    name: "Bistro Elegance",
    logo: "/placeholder.svg", // Using a placeholder, we can replace with an actual image
    address: "123 Gourmet Avenue, Culinary District, NY 10001",
    phone: "(555) 123-4567"
  };

  // Mock reservation data
  const reservation = {
    id: "RES-20250522-42",
    name: "Emma Johnson",
    time: "May 22, 2025 • 7:30 PM",
    tableType: "Window Seating (2 persons)"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">AI Reservation Assistant</h1>
      
        {/* Restaurant Info Card */}
        <Card className="mb-6 p-5 bg-white shadow-md">
          <div className="flex items-center">
            <div className="h-14 w-14 rounded-full bg-call-purple flex items-center justify-center">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{restaurant.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <p className="text-sm">{restaurant.address}</p>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <PhoneIcon className="h-4 w-4 mr-1" />
                <p className="text-sm">{restaurant.phone}</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Call Interface Card - Sticky */}
        <div className="sticky top-4 z-10">
          <Card className="p-6 bg-white shadow-lg border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium mb-4">
                {isCallActive ? "Call in progress" : "Start reservation call"}
              </div>
              
              {isCallActive && (
                <div className="w-full mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Time Remaining</div>
                    <div className={`font-mono ${timeRemaining < 60 ? "text-red-500" : ""}`}>
                      {formatTime(timeRemaining)}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-call-purple h-2 rounded-full"
                      style={{ width: `${(timeRemaining / 300) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-6 items-center">
                {!isCallActive ? (
                  <Button 
                    onClick={startCall} 
                    className="h-16 w-16 rounded-full bg-call-green hover:bg-green-600"
                  >
                    <MicIcon className="h-6 w-6 text-white" />
                  </Button>
                ) : (
                  <Button 
                    onClick={endCall} 
                    className="h-16 w-16 rounded-full bg-call-red hover:bg-red-600"
                  >
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </Button>
                )}
              </div>
              
              {isCallActive && (
                <div className="mt-4 text-gray-500 flex items-center animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span>AI Assistant is listening...</span>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Reservation Details */}
        <Card className="mt-6 p-6 bg-white shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Reservation Details</h3>
            <div className="flex items-center text-gray-500">
              <InfoIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">Manage via call</span>
            </div>
          </div>
          
          <Separator className="mb-4" />
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Reservation ID</span>
              <span className="font-medium">{reservation.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer</span>
              <span className="font-medium">{reservation.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-medium">{reservation.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Table Type</span>
              <span className="font-medium">{reservation.tableType}</span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <Button 
            onClick={cancelReservation}
            variant="outline" 
            className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 mt-2"
          >
            Cancel Reservation
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ReservationCall;
