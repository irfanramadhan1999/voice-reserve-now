
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, X } from "lucide-react";

interface CallInterfaceProps {
  callStatus: "ready" | "active" | "completed";
  duration: number;
  onStartCall: () => void;
  formatDuration: (seconds: number) => string;
}

const CallInterface = ({ callStatus, duration, onStartCall, formatDuration }: CallInterfaceProps) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center">
        <div className="w-36 h-36 rounded-full bg-blue-100 flex items-center justify-center mb-4 relative">
          <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center">
            {callStatus === "ready" && (
              <Button 
                onClick={onStartCall} 
                className="h-20 w-20 rounded-full bg-green-500 hover:bg-green-600 border-4 border-white"
              >
                <Mic className="h-8 w-8 text-white" />
              </Button>
            )}
            {callStatus === "active" && (
              <div className="h-20 w-20 rounded-full bg-red-500 border-4 border-white flex items-center justify-center">
                <MicOff className="h-8 w-8 text-white" />
              </div>
            )}
            {callStatus === "completed" && (
              <div className="text-white flex items-center">
                <X className="h-10 w-10" />
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
  );
};

export default CallInterface;
