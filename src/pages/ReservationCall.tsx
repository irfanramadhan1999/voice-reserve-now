
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PhoneIcon, Calendar, X, Mic, MicOff, Timer } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
          <Card className="mb-10 p-4 bg-blue-50/40 border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  {/* Restaurant logo/avatar placeholder */}
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
                onClick={startCall}
                disabled={callStatus !== "ready"}
                variant="outline" 
                className="text-green-600 border-green-200 hover:bg-green-50 text-xs px-2 py-1 h-auto"
              >
                <span>Ready for call</span>
              </Button>
            </div>
          </Card>
          
          {/* Call Interface */}
          <div className="mb-10">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4 relative">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                  {callStatus === "ready" && (
                    <Button 
                      onClick={startCall} 
                      className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 border-4 border-white"
                    >
                      <Mic className="h-6 w-6 text-white" />
                    </Button>
                  )}
                  {callStatus === "active" && (
                    <div className="h-16 w-16 rounded-full bg-red-500 border-4 border-white flex items-center justify-center">
                      <MicOff className="h-6 w-6 text-white" />
                    </div>
                  )}
                  {callStatus === "completed" && (
                    <div className="text-white flex items-center">
                      <X className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </div>
              
              {callStatus === "active" && (
                <div className="text-center animate-pulse">
                  <span className="text-blue-600 font-medium">Call in progress...</span>
                </div>
              )}
              
              {callStatus === "completed" && (
                <div className="text-center">
                  <span className="text-green-600 font-medium flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Call Completed
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Reservation Details - Only shown after call is completed */}
          {callStatus === "completed" && (
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
              
              <Button 
                onClick={openCancelDialog}
                variant="outline" 
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white border-none"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel Reservation
              </Button>
            </Card>
          )}
        </div>
      </div>
      
      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your reservation at {restaurant.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep It</AlertDialogCancel>
            <AlertDialogAction onClick={cancelReservation} className="bg-red-500 hover:bg-red-600">
              Yes, Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReservationCall;
