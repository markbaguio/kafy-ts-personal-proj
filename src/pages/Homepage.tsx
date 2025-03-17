import TestimonialCarousel from "@/components/common/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sections } from "@/constants";

import { Link } from "react-router";

export type SplitScreenSectionType = {
  imgUrl: string;
  alt: string;
  title: string;
  content: string;
  textColor: "text-black-coffee" | "text-milky-white";
  buttonLink: string;
  buttonText: string;
  contentBGColor:
    | "bg-black-coffee"
    | "bg-light-caramel"
    | "bg-royal-brown"
    | "bg-golden-brown";
  id: number;
};

//bg-[url('src/assets/nathan-dumlao-zEdCT0qrodE-unsplash.jpg')]
export default function Homepage() {
  return (
    <div className="flex flex-col items-center gap-10 w-full py-10 lg:px-[100px] max-w-[1800px]">
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`flex flex-col md:flex-row ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="bg-cover w-full md:w-[50%] flex justify-center items-center">
            {index === 0 ? (
              <h1 className="absolute text-milky-white font-bold text-5xl">
                KAFY
              </h1>
            ) : (
              <></>
            )}
            <img
              src={section.imgUrl}
              alt={section.alt}
              className="h-full max-h-[900px] w-full object-cover"
            />
          </div>
          <div
            className={`w-full md:w-[50%] ${section.contentBGColor} px-5 py-10 md:py-[100px] md:px-[60px] text-center ${section.textColor} flex flex-col gap-y-10 md:gap-y-20 items-center justify-center`}
          >
            <h2 className="text-4xl md:text-7xl font-bold">{section.title}</h2>
            <p className="font-medium text-lg md:text-xl">{section.content}</p>
            <Button
              className={`w-fit text-lg 
                 ${section.textColor} ${
                section.textColor === "text-milky-white"
                  ? "border-milky-white"
                  : "border-black-coffee"
              }`}
              variant="outline2"
            >
              <Link to={section.buttonLink}>{section.buttonText}</Link>
            </Button>
          </div>
        </section>
      ))}
      <Separator className="bg-raisin-black/50" />
      <TestimonialCarousel />
      <Separator className="bg-raisin-black/50" />
    </div>
  );
}
