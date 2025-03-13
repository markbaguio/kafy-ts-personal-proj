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
  contentBGColor:
    | "bg-black-coffee"
    | "bg-light-caramel"
    | "bg-royal-brown"
    | "bg-golden-brown";
  id: number;
};

const sections: SectionType[] = [
  {
    id: 1,
    imgUrl: "src/assets/nathan-dumlao-zEdCT0qrodE-unsplash.jpg",
    alt: "Black Coffee and Latte",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "More to sip and savor",
    content: `Enjoy a rich selection of coffee, plus freshly baked pastries made to pair perfectly with your favorite brew. Whether you're in the mood for a bold espresso or a sweet treat, there’s always something delicious waiting for you.`,
    textColor: "text-milky-white",
    contentBGColor: "bg-black-coffee",
  },
  {
    id: 2,
    imgUrl: "src/assets/tabitha-turner-F0Wd4djYvSA-unsplash.jpg",
    alt: "Creamy Latte",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "Crafted for every cup",
    content: `We take pride in every pour. From carefully sourced beans to expertly brewed espresso, each cup is made with precision and passion. Whether you prefer a bold, rich roast or a smooth, creamy latte, our coffee is crafted to bring out the best in every sip.`,
    textColor: "text-black-coffee",
    contentBGColor: "bg-light-caramel",
  },
  {
    id: 3,
    imgUrl: "src/assets/mike-kenneally-TD4DBagg2wE-unsplash.jpg",
    alt: "Coffee Beans",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "Freshly brewed, just for you",
    content:
      "Great coffee starts with great beans. We carefully select and roast each batch to highlight the unique flavors of every origin. Whether it’s a hand-poured single origin or a classic espresso, every drink is made to order, just the way you like it.",
    contentBGColor: "bg-royal-brown",
    textColor: "text-milky-white",
  },
  {
    id: 4,
    imgUrl: "src/assets/conor-brown-sqkXyyj4WdE-unsplash.jpg",
    alt: "Croissant",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "Beyond the basics",
    content:
      "We’re more than just coffee. From flaky croissants to decadent desserts, our pastries are baked fresh to complement every cup. Looking for something savory? Our selection of bites makes the perfect pairing for any moment of the day.",
    contentBGColor: "bg-golden-brown",
    textColor: "text-milky-white",
  },
];

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
              className="h-full max-h-[900px] w-full"
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
    </div>
  );
}
