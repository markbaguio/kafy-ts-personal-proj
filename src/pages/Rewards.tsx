import Banner from "@/components/common/Banner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RewardPerks,
  rewardsInfo,
  RewardsPerksDescription,
  RewardsPerksHeader,
} from "@/constants";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
                discounts, and exclusive rewards. The more you sip, the more you{" "}
                save! {""}
                <a
                  href="#perks"
                  className="text-golden-brown underline hover:no-underline"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <RewardInfoSection rewardInfo={rewardsInfo} />
      <RewardPerksSection
        header={RewardsPerksHeader}
        description={RewardsPerksDescription}
        rewardPerks={RewardPerks}
      />
    </div>
  );
}

export type RewardPerksType = {
  imgUrl: string;
  imgAlt: string;
  header: string;
  description: string;
  dialogHeader: string;
  dialogDescription: string;
  dialogImgUrl: string;
  diaImgAlt: string;
};

type RewardPerksSectionProps = {
  header: string;
  description: string;
  rewardPerks: RewardPerksType[];
};

function RewardPerksSection({
  header,
  description: desciption,
  rewardPerks,
}: RewardPerksSectionProps) {
  return (
    <section id="perks" className="flex flex-col py-30 min-h-fit">
      <div className="flex flex-col items-center gap-1 md:gap-5">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">{header}</h2>
        <p className="w-full md:w-1/2 px-3 text-center text-sm sm:text-lg md:text-xl">
          {desciption}
        </p>
      </div>
      <div className="flex lg:flex-row flex-col justify-center gap-5 p-5 md:p-10">
        {rewardPerks.map((perk) => (
          <div
            key={perk.imgUrl}
            className="w-full lg:max-w-[500px] flex flex-row lg:flex-col items-center gap-5 md:gap-10 p-5"
          >
            <img
              src={perk.imgUrl}
              alt="number1"
              className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
            />
            <div className="flex flex-col items-start lg:items-center gap-3 md:gap-5">
              <span className="text-start text-lg sm:text-2xl md:text-3xl lg:text-center w-full font-bold text-golden-brown">
                {perk.header}
              </span>
              <p className="text-start text-xs sm:text-sm md:text-lg lg:text-center">
                {perk.description}
              </p>
              <Dialog>
                <DialogTrigger
                  asChild
                  className="w-full flex flex-col justify-start items-start"
                >
                  <Button
                    className="w-fit p-0 text-burnt-sienna underline hover:no-underline duration-0 text-sm"
                    variant="ghost"
                  >
                    Learn more
                  </Button>
                </DialogTrigger>
                <DialogContent className="h-fit py-15">
                  <div className="flex flex-col items-center gap-5">
                    <img
                      src={perk.dialogImgUrl}
                      alt={perk.diaImgAlt}
                      className="w-[125px] h-[125px] md:w-[200px] md:h-[200px] object-center object-cover rounded-2xl"
                    />
                    <h2 className="text-xl md:text-2xl font-bold text-center">
                      {perk.dialogHeader}
                    </h2>
                    <p className="text-sm md:text-lg text-center">
                      {perk.dialogDescription}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export type RewardsInfoType = {
  imgUrl: string;
  value: string;
  header: string;
  description: string;
};

type RewardInfoSectionProps = {
  rewardInfo: RewardsInfoType[];
};

function RewardInfoSection({ rewardInfo }: RewardInfoSectionProps) {
  return (
    <section
      id="rewards-info"
      className="h-full w-full flex flex-col items-center justify-center"
    >
      <div className="w-full text-center py-5 text-lg sm:text-xl md:text-4xl font-semibold bg-light-caramel">
        <h2>Get your KAFY favorites for free</h2>
      </div>
      <div className="w-full flex flex-col items-center py-5 bg-off-white">
        <Tabs
          defaultValue={rewardInfo[0].value}
          className="w-full max-w-[1000px] p-5 flex gap-0"
        >
          {/* Generate Tab Triggers */}
          <TabsList className="h-full w-full p-0 rounded-none bg-off-white">
            {rewardInfo.map((reward) => (
              <TabsTrigger
                key={reward.value}
                className="h-[50px] md:h-[100px] text-lg sm:text-xl md:text-4xl bg-off-white hover:cursor-pointer data-[state=active]:bg-off-white data-[state=active]:shadow-none focus-visible:ring
              text-raisin-black relative border-none shadow-none
                data-[state=active]:after:w-full after:absolute after:bottom-0 after:left-0
                after:h-[5px] after:bg-golden-brown after:transition-all after:duration-300 after:w-0"
                value={reward.value}
              >
                {reward.value}
                <img
                  src="src/assets/reward/ticket-svgrepo-com.svg"
                  alt="kafy points"
                  className="w-[30px] h-[30px]"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          {/* Generate Tab Contents */}
          {rewardInfo.map(
            (reward) => (
              console.log(reward.imgUrl),
              (
                <TabsContent key={reward.value} value={reward.value}>
                  <div className="h-full flex flex-col md:flex-row gap-10">
                    {/* <div
                      className={`w-full h-[500px] bg-[url(${reward.imgUrl})] bg-center bg-cover bg-no-repeat rounded-2xl`}
                    ></div> */}
                    <div className={`w-full h-[300px] md:h-[500px]`}>
                      <img
                        src={reward.imgUrl}
                        alt=""
                        className="w-full h-full object-center object-cover rounded-2xl"
                      />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2   md:gap-5">
                      <h2 className="text-lg md:text-5xl font-semibold w-full text-center md:text-start">
                        {reward.header}
                      </h2>
                      <p className="text-sm md:text-2xl w-full text-center md:text-start">
                        {reward.description}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              )
            )
          )}
        </Tabs>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-fit md:h-lvh p-5 bg-[url(src/assets/reward/math-6GDW9BVdmkw-unsplash.jpg)] bg-center bg-no-repeat bg-cover"
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
