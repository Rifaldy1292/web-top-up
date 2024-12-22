import * as React from "react";
import caresoulImage1 from "../../assets/img/ID_GoPay_Cashback_Campaign_december_730x280.jpg";
import caresoulImage2 from "../../assets/img/afk_journey_banner_id.jpg";
import caresoulImage3 from "../../assets/img/ID_coda_rewards_gopay_november_730x280_ID.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <div className="relative ">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <img
              src={caresoulImage1}
              alt=""
              className=" md:h-[400px] w-full rounded-[10px] h-[150px] object-cover "
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={caresoulImage1}
              alt=""
              className=" md:h-[400px] w-full rounded-[10px] h-[150px] object-cover "
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={caresoulImage3}
              alt=""
              className=" md:h-[400px] w-full rounded-[10px] h-[150px] object-cover "
            />
          </CarouselItem>
          {/* Tambahkan lebih banyak CarouselItem sesuai kebutuhan */}
        </CarouselContent>

        {/* Tombol navigasi */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2"></CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2"></CarouselNext>
      </Carousel>
    </div>
  );
}
