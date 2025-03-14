import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const TESTIMONIALS: TestimonyCardProps[] = [
  {
    iconUrl:
      "src/assets/profile/images/stefan-stefancik-QXevDflbl8A-unsplash.jpg",
    name: "Andrea Meredith Vance",
    role: "CTO, Nexora Technologies",
    // testimony:
    //   'Best coffee in town! The rich, bold flavors keep me coming back, and the pastries? Absolutely irresistible."',
    testimony: `"I can’t imagine starting my day without this coffee! It’s smooth, bold, and gives me the perfect kick to stay sharp during long coding sessions. Whether I’m deep in problem-solving or brainstorming the next big innovation at Nexora, this is the fuel that keeps me going!"`,
  },
  {
    iconUrl: "src/assets/profile/images/arya-dubey-8eYI8qcEFxI-unsplash.jpg",
    name: "Mark Patton",
    role: "Software Developer, Nexora Technologies",
    testimony:
      '"I’ve tasted coffee from all over, but nothing compares to this! The rich aroma and perfectly balanced flavors make every cup an experience. Whether I’m on the go or unwinding after a long day, this is my go-to brew."',
  },
  {
    iconUrl: "src/assets/profile/images/fatane-rahimi-Agv-xPQBO60-unsplash.jpg",
    name: "Hayley Seraphine Crowell",
    role: "Novelist, Indie Musician",
    testimony:
      '"Every sip feels like a warm hug! The deep, chocolatey notes and smooth finish make this my go-to for songwriting sessions. It’s like creativity in a cup!"',
  },
  {
    iconUrl:
      "src/assets/profile/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
    name: "Alexandra Smith",
    role: "Marketing Director",
    testimony:
      '"The perfect balance of strength and smoothness! Whether I’m leading a meeting or catching up on emails, this coffee keeps me focused and ready to tackle the day."',
  },
  {
    iconUrl:
      "src/assets/profile/images/charlesdeluvio-Mv9hjnEUHR4-unsplash.jpg",
    name: "Alex Vexley",
    role: "Cybersecurity Specialist and Underground DJ",
    testimony: `"Cybersecurity is all about precision, and so is great coffee. This blend is rich, bold, and exactly what I need to stay sharp. I wouldn’t trust anything else to get me through those late-night coding sessions!"`,
  },
];

export default function TestimonialCarousel() {
  return (
    <>
      <section className="py-20 flex flex-col justify-center items-center gap-y-10">
        <div className="text-center flex flex-col items-center gap-y-2 w-full">
          <h2 className="text-4xl font-extrabold">
            Don’t take our word for it
          </h2>
          <p className="text-lg font-light w-xl">
            Our customers say it best—experience why we're the ultimate
            destination for exceptional coffee.
          </p>
        </div>
        <Carousel className="">
          <CarouselContent className="bg-transparent">
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem className="basis-1/3">
                <TestimonialCard
                  iconUrl={testimonial.iconUrl}
                  name={testimonial.name}
                  role={testimonial.role}
                  testimony={testimonial.testimony}
                />
              </CarouselItem>
            ))}
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

function TestimonialCard({
  iconUrl,
  name,
  role,
  testimony,
}: TestimonyCardProps) {
  return (
    <Card className="h-[330px] min-w-[200px] border-3 flex flex-col py-0 gap-1">
      {/* <CardHeader className="">
        <CardTitle className="w-full h-[20px]"></CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader> */}
      <CardContent className="items-center py-2 grow">
        <p className="text-xl font-semibold">{testimony}</p>
      </CardContent>
      <CardFooter className="h-fit flex gap-3 py-3 justify-start">
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
