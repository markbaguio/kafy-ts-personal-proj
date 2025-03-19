import Banner from "@/components/common/Banner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Rewards() {
  return (
    <div className="flex flex-col w-full bg-light-caramel">
      <Banner />
      {/* Hero section */}
      <section className="relative w-full h-[500px] bg-[url(src/assets/reward/math-6GDW9BVdmkw-unsplash.jpg)] bg-center bg-no-repeat bg-cover">
        {/** Overlay */}
        <div className="absolute inset-0 bg-black-coffee/30"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black-coffee/60 via-black-coffee/30"></div> */}
        <div className="relative flex flex-col justify-center items-center md:items-start h-full w-full text-milky-white px-10 sm:px-30 md:px-0">
          <div className="flex flex-col gap-5 md:gap-10 h-fit w-full md:max-w-[50%] bg-raisin-black/30 backdrop-blur-md p-5 md:p-10 md:ml-10 rounded-4xl">
            <div className="flex flex-col gap-1 text-start w-full py-3">
              <h1 className="font-bold text-xl md:text-4xl lg:text-6xl text-center md:text-start">
                Free coffee is just around the corner
              </h1>
              <p className="text-xs md:text-3xl font-light text-center md:text-start">
                Join now to start earning points!
              </p>
            </div>
            <div className="w-full flex justify-center md:justify-start">
              <Button
                asChild
                className="w-fit text-lg md:text-2xl"
                variant="main"
              >
                <Link to="/auth/signup">Join now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
