import { TestimonyCardProps } from "./components/common/TestimonialCarousel";

export const TESTIMONIALS: TestimonyCardProps[] = [
  {
    id: 1,
    iconUrl:
      "src/assets/profile/images/stefan-stefancik-QXevDflbl8A-unsplash.jpg",
    name: "Andrea Meredith Vance",
    role: "CTO, Nexora Technologies",
    testimony: `"I can’t imagine starting my day without this coffee! It’s smooth, bold, and gives me the perfect kick to stay sharp during long coding sessions. Whether I’m deep in problem-solving or brainstorming the next big innovation at Nexora, this is the fuel that keeps me going!"`,
  },
  {
    id: 2,
    iconUrl: "src/assets/profile/images/rayul-_M6gy9oHgII-unsplash.jpg",
    name: "Mark Patton",
    role: "Software Developer, Nexora Technologies",
    testimony:
      '"I’ve tasted coffee from all over, but nothing compares to this! The rich aroma and perfectly balanced flavors make every cup an experience. Whether I’m on the go or unwinding after a long day, this is my go-to brew."',
  },
  {
    id: 3,
    iconUrl: "src/assets/profile/images/fatane-rahimi-Agv-xPQBO60-unsplash.jpg",
    name: "Hayley Crowell",
    role: "Novelist, Indie Musician",
    testimony:
      '"Every sip feels like a warm hug! The deep, chocolatey notes and smooth finish make this my go-to for songwriting sessions. It’s like creativity in a cup!"',
  },
  {
    id: 4,
    iconUrl:
      "src/assets/profile/images/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg",
    name: "Alexandra Smith",
    role: "Marketing Director",
    testimony:
      '"The perfect balance of strength and smoothness! Whether I’m leading a meeting or catching up on emails, this coffee keeps me focused and ready to tackle the day."',
  },
  {
    id: 5,
    iconUrl: "src/assets/profile/images/warren-tHiGKAJxaA8-unsplash.jpg",
    name: "Alex Barrett",
    role: "Cybersecurity Specialist and Underground DJ",
    testimony: `"Cybersecurity is all about precision, and so is great coffee. This blend is rich, bold, and exactly what I need to stay sharp. I wouldn’t trust anything else to get me through those late-night coding sessions!"`,
  },
];

export const sections: SectionType[] = [
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
