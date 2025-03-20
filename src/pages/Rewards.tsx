import Banner from "@/components/common/Banner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Rewards() {
  return (
    <div className="flex flex-col w-full">
      <Banner />
      {/* Hero section */}
      <HeroSection />
      {/* Rewards section */}
      <section className="flex flex-col py-30 h-fit">
        <div className="flex flex-col items-center gap-1 md:gap-5">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
            Getting free coffee is easy!
          </h2>
          <p className="text-sm sm:text-lg md:text-xl">
            Earn points in a few steps
          </p>
        </div>
        <div className="flex lg:flex-row flex-col justify-center gap-5 p-5 md:p-10">
          {/**1 */}
          <div className="w-full lg:max-w-[500px] flex flex-row lg:flex-col items-center gap-5 md:gap-10 p-5">
            <img
              src="src\assets\rewards\number-one-svgrepo-com.svg"
              alt="number1"
              className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
            />
            <div className="flex flex-col items-center gap-3 md:gap-5">
              <span className="text-start text-lg sm:text-2xl md:text-3xl lg:text-center w-full font-bold text-burnt-sienna ">
                Create an account
              </span>
              <p className="text-start text-xs sm:text-sm md:text-lg lg:text-center">
                Creating an account is quick and easy! {""}
                <Link
                  to="/auth/signup"
                  className="text-golden-brown underline hover:no-underline"
                >
                  Sign up
                </Link>{" "}
                today to unlock exclusive perks, special offers, and early
                access to promotions. The more you visit, the more you earn!
              </p>
            </div>
          </div>
          {/**2 */}
          <div className="w-full lg:max-w-[500px] flex flex-row lg:flex-col items-center gap-5 md:gap-10 p-5">
            <img
              src="src\assets\rewards\number-two-svgrepo-com.svg"
              alt="number1"
              className="w-[50px] h-[50px] md:w-[70px]  md:h-[70px]"
            />
            <div className="flex flex-col items-center gap-3 md:gap-5">
              <span className="text-start text-lg sm:text-2xl md:text-3xl lg:text-center w-full font-bold text-burnt-sienna">
                Buy Kafy products your way
              </span>
              <p className="text-start text-xs sm:text-sm md:text-lg lg:text-center">
                We make checkout seamless and convenient! Whether you prefer
                cash, credit/debit cards, or digital wallets, KAFY gives you the
                flexibility to pay the way you like. Earn points no matter how
                you pay!{" "}
                <a
                  href="#hero"
                  className="text-golden-brown underline hover:no-underline"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
          {/**3 */}
          <div className="w-full lg:max-w-[500px] flex flex-row lg:flex-col items-center gap-5 md:gap-10 p-5">
            <img
              src="src\assets\rewards\number-three-svgrepo-com.svg"
              alt="number1"
              className="w-[50px] h-[50px] md:w-[70px]  md:h-[70px]"
            />
            <div className="flex flex-col items-center gap-3 md:gap-5">
              <span className="text-start text-lg sm:text-2xl md:text-3xl lg:text-center w-full font-bold text-burnt-sienna">
                Earn points, unlock rewards
              </span>
              <p className="text-start text-xs sm:text-sm md:text-lg lg:text-center">
                Every order brings you closer to something special! Collect
                points with every purchase and redeem them for free drinks,
                discounts, and exclusive rewards. The more you sip, the more you
                save!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-full w-full flex flex-col items-center justify-center">
        <div className="w-full text-center py-5 text-5xl font-semibold bg-light-caramel">
          <h2>Get your KAFY favorites for free</h2>
        </div>
        <div className="w-full flex flex-col items-center bg-off-white">
          <Tabs defaultValue="20" className="w-full max-w-[800px] p-5">
            <TabsList className="h-full w-full p-0 rounded-none bg-off-white">
              <TabsTrigger
                className="h-[100px] text-4xl bg-off-white data-[state=active]:bg-off-white data-[state=active]:shadow-none 
              text-raisin-black relative border-none shadow-none 
                data-[state=active]:after:w-full after:absolute after:bottom-0 after:left-0 
                after:h-[5px] after:bg-golden-brown after:transition-all after:duration-300 after:w-0"
                value="20"
              >
                20
              </TabsTrigger>

              <TabsTrigger
                className="h-[100px] text-4xl bg-off-white data-[state=active]:bg-off-white data-[state=active]:shadow-none 
              text-raisin-black relative border-none shadow-none 
                data-[state=active]:after:w-full after:absolute after:bottom-0 after:left-0 
                after:h-[5px] after:bg-golden-brown after:transition-all after:duration-300 after:w-0"
                value="40"
              >
                40
              </TabsTrigger>
              <TabsTrigger
                className="h-[100px] text-4xl bg-off-white data-[state=active]:bg-off-white data-[state=active]:shadow-none 
              text-raisin-black relative border-none shadow-none 
                data-[state=active]:after:w-full after:absolute after:bottom-0 after:left-0 
                after:h-[5px] after:bg-golden-brown after:transition-all after:duration-300 after:w-0"
                value="60"
              >
                60
              </TabsTrigger>
              <TabsTrigger
                className="h-[100px] text-4xl bg-off-white data-[state=active]:bg-off-white data-[state=active]:shadow-none 
              text-raisin-black relative border-none shadow-none 
                data-[state=active]:after:w-full after:absolute after:bottom-0 after:left-0 
                after:h-[5px] after:bg-golden-brown after:transition-all after:duration-300 after:w-0"
                value="95"
              >
                95
              </TabsTrigger>
            </TabsList>
            <TabsContent value="20">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
              aliquid!
            </TabsContent>
            <TabsContent value="40">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, praesentium.
            </TabsContent>
            <TabsContent value="60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, praesentium.
            </TabsContent>
            <TabsContent value="95">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, praesentium.
            </TabsContent>
          </Tabs>
        </div>
        {/* <div className="h-1/4 bg-golden-brown/50"></div>
        <div className="h-full bg-raisin-black "></div> */}
      </section>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-fit md:h-[500px] p-5 bg-[url(src/assets/reward/math-6GDW9BVdmkw-unsplash.jpg)] bg-center bg-no-repeat bg-cover"
    >
      {/** Overlay */}
      <div className="absolute inset-0 bg-black-coffee/30"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black-coffee/60 via-black-coffee/30"></div> */}
      <div className="relative flex flex-col justify-center items-center md:items-start h-full w-full text-milky-white px-10 sm:px-30 md:px-0">
        <div className="flex flex-col gap-5 md:gap-10 h-fit w-full md:max-w-[50%] bg-raisin-black/30 backdrop-blur-md p-5 md:p-10 md:ml-10 rounded-4xl">
          <div className="flex flex-col gap-1 text-start w-full py-3">
            <h1 className="font-bold text-xl md:text-4xl lg:text-5xl xl:text-[4rem] text-center md:text-start">
              Free coffee is just around the corner
            </h1>
            <p className="text-xs md:text-2xl lg:text-3xl font-light text-center md:text-start">
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
  );
}
