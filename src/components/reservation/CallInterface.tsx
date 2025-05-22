
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
        {/* Updated call display to match the provided image */}
        <div className="w-36 h-36 rounded-full bg-blue-100/50 flex items-center justify-center mb-4 relative">
          <div className="w-32 h-32 rounded-full bg-blue-50/70 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              {callStatus === "ready" && (
                <Button 
                  onClick={onStartCall} 
                  className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 border-0 transition-all duration-300 ease-in-out"
                  aria-label="Start call"
                >
                  <Mic className="h-6 w-6 text-white" />
                </Button>
              )}
              {callStatus === "active" && (
                <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center transition-all duration-300 ease-in-out">
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
