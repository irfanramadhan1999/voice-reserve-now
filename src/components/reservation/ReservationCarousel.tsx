
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ReservationDetails from "./ReservationDetails";

interface Reservation {
  id: string;
  customer: string;
  date: string;
  time: string;
  table: string;
  guests: string;
  timestamp: string;
}

interface ReservationCarouselProps {
  reservations: Reservation[];
  onCancelClick: (reservationId: string) => void;
}

const ReservationCarousel = ({ reservations, onCancelClick }: ReservationCarouselProps) => {
  if (reservations.length === 1) {
    return (
      <ReservationDetails 
        reservation={reservations[0]}
        onCancelClick={() => onCancelClick(reservations[0].id)}
      />
    );
  }

  return (
    <div className="relative px-12">
      <Carousel className="w-full">
        <CarouselContent>
          {reservations.map((reservation) => (
            <CarouselItem key={reservation.id}>
              <ReservationDetails 
                reservation={reservation}
                onCancelClick={() => onCancelClick(reservation.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-8 top-1/2" />
        <CarouselNext className="-right-8 top-1/2" />
      </Carousel>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {reservations.map((_, index) => (
          <div 
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationCarousel;
