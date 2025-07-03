
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useCall = (onCallCompleted: () => void) => {
  const { toast } = useToast();
  const [callStatus, setCallStatus] = useState<"ready" | "active" | "completed" | "unavailable" | "blocked">("ready");
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

  // Handle auto-reset after call completion
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (callStatus === "completed") {
      timeoutId = window.setTimeout(() => {
        setCallStatus("ready");
        setDuration(0);
      }, 2000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
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

  // Set call as unavailable (can be called externally)
  const setCallUnavailable = () => {
    setCallStatus("unavailable");
    toast({
      title: "Call Unavailable",
      description: "The shop is currently unable to receive calls",
      variant: "destructive",
    });
  };

  // Set call as blocked due to spam detection
  const setCallBlocked = () => {
    setCallStatus("blocked");
    toast({
      title: "Access Blocked",
      description: "Your IP address has been blocked due to spam detection",
      variant: "destructive",
    });
  };

  return {
    callStatus,
    duration,
    formatDuration,
    startCall,
    endCall,
    setCallUnavailable,
    setCallBlocked
  };
};
