
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, X } from "lucide-react";

interface CallInterfaceProps {
  callStatus: "ready" | "active" | "completed";
  duration: number;
  onStartCall: () => void;
  onEndCall: () => void;
  formatDuration: (seconds: number) => string;
}

const CallInterface = ({ callStatus, duration, onStartCall, onEndCall, formatDuration }: CallInterfaceProps) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center">
        {/* Call display circle */}
        <div className="w-36 h-36 rounded-full bg-blue-100/50 flex items-center justify-center mb-6 relative">
          <div className="w-32 h-32 rounded-full bg-blue-50/70 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              {callStatus === "ready" && (
                <Phone className="h-8 w-8 text-white" />
              )}
              {callStatus === "active" && (
                <Phone className="h-8 w-8 text-white animate-pulse" />
              )}
              {callStatus === "completed" && (
                <div className="text-white flex items-center">
                  <X className="h-8 w-8" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Call action button */}
        {callStatus === "ready" && (
          <Button 
            onClick={onStartCall} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out"
          >
            <Phone className="h-5 w-5 mr-2" />
            Start Call
          </Button>
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
          </>
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
