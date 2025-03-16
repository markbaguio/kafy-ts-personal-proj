import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TESTIMONIALS } from "@/constants";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { useRef } from "react";

export default function TestimonialCarousel() {
  const carouselAutoPlayPlugin = useRef<AutoplayType>(
    Autoplay({
      delay: 2500,
      stopOnMouseEnter: true,
    })
  );

  return (
    <>
      <section className="py-20 flex flex-col justify-center items-center gap-y-20">
        <div className="text-center flex flex-col items-center gap-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            Don’t take our word for it
          </h2>
          <p className="text-xs md:text-lg font-light w-xs md:w-xl">
            Our customers say it best—experience why we're the ultimate
            destination for exceptional coffee.
          </p>
        </div>
        <Carousel
          opts={{ loop: true, startIndex: 1 }}
          plugins={[carouselAutoPlayPlugin.current]}
          onMouseLeave={() => {
            carouselAutoPlayPlugin.current.play();
          }}
        >
          <CarouselContent className="h-full min-w-[250px] w-svw sm:w-[500px] lg:w-full md:w-lg">
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/1 lg:basis-1/3"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    </>
  );
}

export type TestimonyCardProps = {
  id: number;
  iconUrl: string;
  testimony: string;
  name: string;
  role: string;
};

function TestimonialCard({
  iconUrl,
  name,
  role,
  testimony,
}: TestimonyCardProps) {
  return (
    <Card className="h-full w-full border-3 flex flex-col p-5 py-7 gap-2 md:gap-5 bg-off-white/30">
      <CardContent className="items-center grow p-0">
        <p className="text-xs md:text-sm lg:text-xl font-semibold tracking-tight">
          {testimony}
        </p>
      </CardContent>
      <CardFooter className="h-fit flex-col sm:flex-row sm:justify-center gap-2 grow-0 p-0">
        <div className="flex items-center justify-center h-fit w-fit p-0">
          <img
            className="w-12 h-12 md:w-18 md:h-18 rounded-full object-cover"
            src={iconUrl}
            alt="Profile Picture"
          />
        </div>
        <div className="grow h-full flex flex-col justify-center items-center sm:items-start">
          <div className="font-medium text-xs xl:text-lg">{name}</div>
          <div className="font-light text-xs xl:text-sm">{role}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
