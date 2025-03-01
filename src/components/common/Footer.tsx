import {
  Facebook,
  FacebookIcon,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-milky-white flex flex-col-reverse md:flex-row">
      <div className="flex flex-col w-full items-start p-3 gap-2 md:w-[40%]">
        <Logo />
        <div className="">
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
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="size-full" />
            </a>
          </Button>
          <Button asChild className="rounded-full" variant="icon" size="icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-full" />
            </a>
          </Button>
          <Button asChild className="rounded-full" variant="icon" size="icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-full" />
            </a>
          </Button>
        </div>
      </div>
      <div className="bg-light-caramel w-full md:w-[60%]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
        architecto esse assumenda, excepturi, officiis quo placeat tempore
        delectus unde ratione temporibus expedita alias! Culpa debitis accusamus
        reprehenderit quaerat ut dicta amet dolor vero est provident cupiditate
        neque praesentium animi qui, veniam autem libero nam quam repellat
        cumque ipsam. Sit, illo.
      </div>
    </footer>
  );
}
