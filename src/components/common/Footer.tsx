import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-milky-white flex flex-col-reverse md:flex-row">
      <div className="flex flex-col w-full items-start p-3 gap-2 md:w-[40%]">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <p className="text-sm font-light">
            &copy; 2025 Mark Godwin C. Baguio. All rights reserved
          </p>
          <p className="text-sm font-light">
            Fueled by ☕ & passion. Thanks for stopping by!
          </p>
        </div>
        <hr className="border-raisin-black w-full" />
        <div className="flex gap-1 py-2 w-full justify-around">
          <Button asChild className="rounded-full" variant="icon" size="icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="size-full" />
            </a>
          </Button>
          <Button asChild className="rounded-full" variant="icon" size="icon">
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="size-full" />
            </a>
          </Button>
          <Button asChild className="rounded-full" variant="icon" size="icon">
            <a
              href="https://www.Instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-full" />
            </a>
          </Button>
          <Button asChild className="rounded-full" variant="icon" size="icon">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-full" />
            </a>
          </Button>
        </div>
        <p className="text-xs font-extralight">
          This project is for personal practice only.
        </p>
      </div>
      <div className="flex items-center justify-between px-5 py-5 text-base md:text-1xl lg:text-2xl font-bold w-full md:w-[60%]">
        <Link to="/menu" className="hover:text-golden-brown">
          MENU
        </Link>
        <Link to="/rewards" className="hover:text-golden-brown">
          REWARDS
        </Link>
        <Link to="/gift-cards" className="hover:text-golden-brown">
          GIFT CARDS
        </Link>
        <Link to="/about-us" className="hover:text-golden-brown">
          ABOUT US
        </Link>
      </div>
    </footer>
  );
}
