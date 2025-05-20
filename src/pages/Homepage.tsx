import TestimonialCarousel from "@/components/common/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SECTIONS } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

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

export default function Homepage() {
  return (
    <div className="flex flex-col items-center gap-10 w-full py-10 lg:px-[100px] max-w-[1800px]">
      <Suspense fallback={<HomepageSkeleton />}>
        <HomepageSections />
      </Suspense>
      <Separator className="bg-raisin-black/50" />
      <TestimonialCarousel />
      <Separator className="bg-raisin-black/50" />
    </div>
  );
}

function HomepageSections() {
  //? Mock data fetch to show skeleton while loading.
  const mockFetchSectionsData = async (): Promise<SplitScreenSectionType[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return SECTIONS;
  };

  const { data: sections } = useSuspenseQuery<SplitScreenSectionType[]>({
    queryKey: ["sections"],
    queryFn: mockFetchSectionsData,
  });

  return sections?.map((section, index) => (
    <section
      key={section.id}
      className={`flex flex-col md:flex-row ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="bg-cover w-full md:w-[50%] flex justify-center items-center">
        {/* {index === 0 ? (
          <h1 className="absolute text-milky-white font-bold text-5xl">KAFY</h1>
        ) : (
          <></>
        )} */}
        {index === 0 && (
          <h1 className="absolute text-milky-white font-bold text-5xl">KAFY</h1>
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
  ));
}

function HomepageSkeleton() {
  return SECTIONS.map((section, index) => (
    <section
      key={section.id}
      className={`w-full h-[800px] flex flex-col md:flex-row ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="bg-cover w-full md:w-[50%] flex justify-center items-center">
        <div className="w-full h-full bg-grey/50 flex justify-center items-center">
          <svg
            className="w-3/4 h-3/4 text-grey dark:text-gray-600 animate-pulse"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <div
        className={`w-full md:w-[50%] px-5 py-10 md:py-[100px] md:px-[60px] text-center bg-grey flex flex-col gap-y-10 md:gap-y-20 items-center justify-center`}
      >
        <div className="w-full flex flex-col items-center gap-5">
          <Skeleton className="w-full h-[36px] rounded-full" />
          <Skeleton className="w-3/4 h-[36px] rounded-full" />
          <Skeleton className="w-1/4 h-[36px] rounded-full" />
        </div>
        <div className="w-full flex flex-col items-center gap-5">
          <Skeleton className="w-full h-4 rounded-md" />{" "}
          <Skeleton className="w-5/6 h-4 rounded-md" />
          <Skeleton className="w-4/6 h-4 rounded-md" />{" "}
        </div>
        <Skeleton className="w-1/5 h-9 rounded-full" />
      </div>
    </section>
  ));
}
