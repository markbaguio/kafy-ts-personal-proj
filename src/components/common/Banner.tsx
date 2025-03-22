import { Link } from "react-router";
import { Button } from "../ui/button";

export default function Banner() {
  return (
    <section className="sticky top-0 z-10 flex flex-col md:flex-row justify-center gap-2 md:gap-10 items-center px-5 py-2 md:px-5 md:py-3 w-full h-fit bg-black-coffee">
      <span className="text-xs md:text-lg lg:text-xl text-center font-bold text-milky-white">
        Sip More, Earn More! ☕✨ Collect points with every purchase and enjoy
        exclusive perks!
      </span>
      <Button
        asChild
        className="border-milky-white text-milky-white hover:bg-golden-brown/80 text-[10px] md:text-sm"
        variant="outline2"
      >
        <Link to="/menu">Check Out What’s Brewing</Link>
      </Button>
    </section>
  );
}
