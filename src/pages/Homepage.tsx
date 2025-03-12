import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type SectionType = {
  imgUrl: string;
  alt: string;
  title: string;
  content: string;
  textColor: "text-black-coffee" | "text-milky-white";
  buttonLink: string;
  buttonText: string;
};

const sections: SectionType[] = [
  {
    imgUrl: "src/assets/nathan-dumlao-zEdCT0qrodE-unsplash.jpg",
    alt: "Black Coffee and Latte",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "More to sip and savor",
    content: `Enjoy a rich selection of coffee, plus freshly baked pastries made to pair perfectly with your favorite brew. Whether you're in the mood for a bold espresso or a sweet treat, there’s always something delicious waiting for you.`,
    textColor: "text-milky-white",
  },
];

//bg-[url('src/assets/nathan-dumlao-zEdCT0qrodE-unsplash.jpg')]
export default function Homepage() {
  return (
    // <div className="flex items-center gap-10 w-full py-10 lg:px-[100px] max-w-[1800px]">
    //   <section className="flex flex-col md:flex-row">
    //     <div className="bg-cover w-full flex justify-center items-center">
    //       {/* <Logo darkBg={true} /> */}
    //       {/* <h2 className="text-milky-white font-bold text-4xl">KAFY</h2> */}
    //       <img
    //         src="src/assets/nathan-dumlao-zEdCT0qrodE-unsplash.jpg"
    //         alt=""
    //         className="h-full max-h-[900px] w-full"
    //       />
    //     </div>
    //     <div className="w-full bg-black-coffee p-10 md:py-[100px] md:px-[60px] text-center text-milky-white flex flex-col gap-y-10 md:gap-y-20 items-center justify-center">
    //       <h1 className="text-5xl md:text-7xl font-bold">
    //         More to sip and savor
    //       </h1>
    //       <p className="font-medium text-lg md:text-xl">
    //         Enjoy a rich selection of coffee, plus freshly baked pastries made
    //         to pair perfectly with your favorite brew. Whether you're in the
    //         mood for a bold espresso or a sweet treat, there’s always something
    //         delicious waiting for you.
    //       </p>
    //       <Button
    //         className="w-fit text-lg text-milky-white border-milky-white"
    //         variant="outline"
    //       >
    //         <Link to="#">Learn more</Link>
    //       </Button>
    //     </div>
    //   </section>
    // </div>
    <div className="flex items-center gap-10 w-full py-10 lg:px-[100px] max-w-[1800px] bg-success-green">
      {sections.map((section) => (
        <section className="flex flex-col md:flex-row">
          <div className="bg-cover w-full flex justify-center items-center">
            {/* <Logo darkBg={true} /> */}
            <h2 className="absolute text-milky-white font-bold text-4xl">
              KAFY
            </h2>
            <img
              src={section.imgUrl}
              alt={section.alt}
              className="h-full max-h-[900px] w-full"
            />
          </div>
          <div
            className={`w-full bg-black-coffee p-10 md:py-[100px] md:px-[60px] text-center ${section.textColor} flex flex-col gap-y-10 md:gap-y-20 items-center justify-center`}
          >
            <h1 className="text-5xl md:text-7xl font-bold">{section.title}</h1>
            <p className="font-medium text-lg md:text-xl">{section.content}</p>
            <Button
              className="w-fit text-lg text-milky-white border-milky-white"
              variant="outline"
            >
              <Link to={section.buttonLink}>{section.buttonText}</Link>
            </Button>
          </div>
        </section>
      ))}
    </div>
  );
}
