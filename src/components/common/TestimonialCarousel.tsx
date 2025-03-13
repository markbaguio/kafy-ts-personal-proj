import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TestimonialCarousel() {
  return (
    <>
      <section className="">
        <Carousel className="">
          <CarouselContent className="bg-transparent">
            <CarouselItem className="basis-1/3">
              <TestimonyCard
                iconUrl="src/assets/profile/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg"
                name="Andrea Solmere Vance"
                role="Dentist"
                testimony='"Best coffee in town! The rich, bold flavors keep me coming back, and the pastries? Absolutely irresistible."'
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonyCard
                iconUrl="asdasd"
                name="Mark Patton"
                role="Software Developer"
                testimony='"Best coffee in town! The rich, bold flavors keep me coming back, and the pastries? Absolutely irresistible."'
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonyCard
                iconUrl="asdasd"
                name="Hayley Seraphine Crowell"
                role="Artist"
                testimony='"Best coffee in town! The rich, bold flavors keep me coming back, and the pastries? Absolutely irresistible."'
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonyCard
                iconUrl="asdasd"
                name="Alexandra Smith"
                role="Artist"
                testimony='"Best coffee in town! The rich, bold flavors keep me coming back, and the pastries? Absolutely irresistible."'
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonyCard
                iconUrl="asdasd"
                name="Alex Orion Vexley"
                role="Artist"
                testimony='"Best coffee in town! The rich, bold flavors keep me coming back, and the pastries? Absolutely irresistible."'
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
}

type TestimonyCardProps = {
  iconUrl: string;
  testimony: string;
  name: string;
  role: string;
};

function TestimonyCard({ iconUrl, name, role, testimony }: TestimonyCardProps) {
  return (
    <Card className="h-[250px] min-w-[200px] border-2 shadow-card">
      {/* <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader> */}
      <CardContent>
        <span className="text-xl font-semibold">{testimony}</span>
      </CardContent>
      <CardFooter className="h-full flex gap-3 ">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={iconUrl}
          alt="Profile Picture"
        />
        <div className="">
          <div className="font-medium">{name}</div>
          <div className="font-light">{role}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
