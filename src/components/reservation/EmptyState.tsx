
import React from "react";
import { Calendar } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Calendar className="h-8 w-8 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-700">You don't have a reservation yet</h3>
        <p className="text-sm text-gray-500">Start a call to make your reservation</p>
      </div>
    </div>
  );
};

export default EmptyState;
