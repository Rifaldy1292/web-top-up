import * as React from "react";
import caresoulImage1 from "../../assets/img/ID_GoPay_Cashback_Campaign_december_730x280.jpg";
import { useState } from "react";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchBanner } from "@/api/userApi";
export function CarouselDemo() {
  const url = import.meta.env.VITE_API_URL;
  const [banners, setBanners] = useState([]);
  const handleFetchBanners = async () => {
    try {
      const response = await fetchBanner();
      if (response) {
        setBanners(response);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleFetchBanners();
  }, []);
  return (
    <div className="w-full p-5">
      <Carousel className=" md:max-w-[1280px] mx-auto w-full ">
        <CarouselContent>
          {banners.map((banner) => {
            return (
              <CarouselItem key={banner.id}>
                {banner?.url_banner_image && (
                  <img
                    src={`${url}${banner.url_banner_image}`}
                    alt=""
                    className="aspect-[5/2]  w-full rounded-[10px]  object-cover   "
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Tombol navigasi */}
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2"></CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2"></CarouselNext>
      </Carousel>
    </div>
  );
}
