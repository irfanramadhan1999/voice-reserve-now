
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useCall = (onCallCompleted: () => void) => {
  const { toast } = useToast();
  const [callStatus, setCallStatus] = useState<"ready" | "active" | "completed">("ready");
  const [duration, setDuration] = useState(0);

  // Handle call duration timer
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (callStatus === "active") {
      intervalId = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else if (callStatus === "ready") {
      setDuration(0);
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
    
    // Simulate call completion after 3 seconds and add a reservation
    setTimeout(() => {
      setCallStatus("completed");
      onCallCompleted();
      
      toast({
        title: "Call Completed",
        description: "Your reservation has been confirmed",
      });
    }, 3000);
  };

  // End call
  const endCall = () => {
    setCallStatus("completed");
    onCallCompleted();
    
    toast({
      title: "Call Ended",
      description: "Your reservation has been confirmed",
    });
  };

  return {
    callStatus,
    duration,
    formatDuration,
    startCall,
    endCall
  };
};
