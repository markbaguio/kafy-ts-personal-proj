import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import { useEffect } from "react";

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
  const { pathname } = useLocation();
  /**
   * ?Since About us page is fully front end.
   * ?The react router Link component won't re-render the about us page since nothing literally
   * ?changed on the about us page. This useEffect will only scroll to the top once the
   * ?Link to about page is clicked.
   * ?Eliminating the problem of about us page not showing/scrolling to the top of the page.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col justify-center gap-10 md:gap-20 p-10">
      {SingleColumnSection.map((aboutUs) => (
        <section key={aboutUs.id} className=" w-fit xl:px-[300px]">
          <div className="w-full flex flex-col gap-3 md:gap-5">
            {aboutUs.id === 1 ? (
              <h1 className="w-full text-xl sm:text-3xl md:text-5xl xl:text-7xl font-bold">
                {aboutUs.heading}
              </h1>
            ) : (
              <h2 className="w-full text-xl sm:text-3xl md:text-5xl xl:text-7xl font-bold">
                {aboutUs.heading}
              </h2>
            )}
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
      <Separator className="bg-raisin-black/50" />
      <section className="h-fit w-full flex flex-col justify-center items-center py-5">
        <div className="w-full max-w-2xl flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-3xl md:text-5xl text-center font-bold">
              Contact Us
            </h2>
            <h3 className="text-sm md:text-2xl text-center font-semibold">
              Any questions or remarks? Just send us a message!
            </h3>
          </div>
          <ContactUsForm />
        </div>
      </section>
      <Separator className="bg-raisin-black/50" />
    </div>
  );
}

const ContactUsFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  message: z
    .string()
    .min(5, "Message is required")
    .max(1000, "Message should not exceed 1000 characters"),
});

type ContactUsFormType = z.infer<typeof ContactUsFormSchema>;

function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsFormType>({
    resolver: zodResolver(ContactUsFormSchema),
  });

  const onSubmit: SubmitHandler<ContactUsFormType> = async (
    data: ContactUsFormType
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <form
      className="flex flex-col w-full max-w-lg gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1 w-full">
        <Label htmlFor="name" className="text-sm md:text-lg">
          Name
        </Label>
        <div className="flex flex-col">
          <Input
            className={clsx(
              ` text-sm md:text-lg`,
              errors.name
                ? "focus-visible:border-destructive focus-visible:ring-destructive"
                : "border-raisin-black placeholder:text-raisin-black"
            )}
            {...register("name")}
            id="name"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-destructive text-[12px] text-start">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <Label htmlFor="email" className="text-sm md:text-lg">
          Email
        </Label>
        <div className="flex flex-col">
          <Input
            className={clsx(
              `text-sm md:text-lg`,
              errors.email
                ? "focus-visible:border-destructive focus-visible:ring-destructive"
                : "border-raisin-black placeholder:text-raisin-black"
            )}
            {...register("email")}
            id="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-destructive text-[12px] text-start">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="message" className="text-sm md:text-lg">
          Your message
        </Label>
        <div className="flex flex-col gap-1">
          <Textarea
            className={clsx(
              "text-sm md:text-lg",
              errors.message
                ? "focus-visible:border-destructive focus-visible:ring-destructive"
                : "border-raisin-black placeholder:text-raisin-black"
            )}
            {...register("message")}
            id="message"
            placeholder="Your message"
          />
          {errors.message && (
            <p className="text-destructive text-[12px] text-start">
              {errors.message.message}
            </p>
          )}
          <p className="text-xs md:text-sm text-raisin-black/70">
            Your message will be sent to the support team.
          </p>
        </div>
      </div>
      <Button
        className="text-sm md:text-lg w-full"
        variant="main"
        type="submit"
      >
        Send message
      </Button>
    </form>
  );
}
