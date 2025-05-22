
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Restaurant Reservation System</h1>
        <p className="text-xl text-gray-600 mb-8">Try our new AI voice reservation assistant!</p>
        <Button asChild className="bg-call-purple hover:bg-purple-600">
          <Link to="/reservation-call">Make a Voice Reservation</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
