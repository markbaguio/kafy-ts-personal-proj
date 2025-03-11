import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <div className="flex items-center gap-10 w-fit py-10 md:px-[100px]">
      <div className="flex flex-col md:flex-row h-fit">
        <div className="w-full bg-light-caramel">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, velit?
        </div>
        <div className="w-full bg-black-coffee py-[100px] px-[60px] text-center text-milky-white flex flex-col gap-y-20 items-center">
          <h1 className=" text-6xl font-bold">More to sip and savor</h1>
          <p className="font-semibold text-2xl">
            Enjoy a rich selection of coffee, plus freshly baked pastries made
            to pair perfectly with your favorite brew. Whether you're in the
            mood for a bold espresso or a sweet treat, there’s always something
            delicious waiting for you.
          </p>
          <Button
            className="w-fit text-milky-white border-milky-white"
            variant="outline"
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
