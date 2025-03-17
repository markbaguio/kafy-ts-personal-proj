import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type SingleColumnSectionType = {
  id: number;
  heading: string;
  imgUrl: string;
  imgAlt: string;
  content: string;
  buttonText: string;
  buttonLink: string;
};

const SingleColumnSection: SingleColumnSectionType[] = [
  {
    id: 1,
    buttonLink: "/",
    heading: "A Passion for Great Coffee",
    imgUrl: "src/assets/about-us/najib-kalil-gHQxwXFj15o-unsplash.jpg",
    imgAlt: "Filtering Coffee",
    buttonText: "Browse our coffees",
    content: `At KAFY, coffee isn’t just a drink—it’s an experience. Every cup
            starts with carefully selected beans, roasted to perfection to bring
            out the rich flavors and aromas that make each sip unforgettable.
            Whether you’re craving a bold espresso, a creamy latte, or a smooth
            pour-over, we craft every drink with precision and care.`,
  },
  {
    id: 2,
    heading: "More Than Just Coffee",
    buttonLink: "/",
    imgUrl: "src/assets/about-us/diliara-garifullina-b6p2EMtKj2Y-unsplash.jpg",
    imgAlt: "Eclair",
    buttonText: "Check out our pastries",
    content: `Pair your favorite drink with our selection of freshly baked pastries and treats. Whether it’s a flaky croissant, a rich chocolate muffin, or a savory bite, we have something to complement your coffee and brighten your day.`,
  },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col justify-center gap-20 p-10">
      {SingleColumnSection.map((aboutUs) => (
        <section key={aboutUs.id} className=" w-fit xl:px-[300px]">
          <div className="w-full flex flex-col gap-3 md:gap-5">
            <h2 className="w-full text-xl sm:text-3xl md:text-5xl xl:text-7xl font-bold">
              {aboutUs.heading}
            </h2>

            <img
              className="w-full h-[300px] md:h-[650px] object-cover"
              src={aboutUs.imgUrl}
              alt={aboutUs.imgAlt}
            />
            <p className="font-semibold text-sm md:text-2xl">
              {aboutUs.content}
            </p>
            <Button
              asChild
              variant="main"
              className="w-fit text-xs md:text-lg bg-black-coffee"
            >
              <Link to={aboutUs.buttonLink}>{aboutUs.buttonText}</Link>
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
