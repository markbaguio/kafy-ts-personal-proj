import KafyLogo from "../../assets/coffee-svgrepo-com.svg";
import { cn } from "@/lib/utils";

type LogoProps = {
  darkBg?: boolean;
  classname?: string;
  classNames?: {
    textLogo: string;
  };
};

export default function Logo({
  darkBg = false,
  classNames,
  classname,
}: LogoProps) {
  return (
    <>
      <div className={cn("flex items-center gap-1", classname)}>
        <img
          src={KafyLogo}
          alt="Kafy logo"
          className={`w-[35px] h-[35px] md:w-[50px] md:h-[50px] fill-current ${
            darkBg ? `invert` : ""
          }`}
        />
        {/* <span
          className={`text-[35px] md:text-[40px] font-bold tracking-[0%] ${
            darkBg ? "text-milky-white" : "text-raisin-black"
          }`}
        >
          KAFY
        </span> */}
        <span
          className={cn(
            "text-[35px] md:text-[40px] font-bold tracking-[0%]",
            darkBg ? "text-milky-white" : "text-raisin-black",
            classNames?.textLogo
          )}
        >
          KAFY
        </span>
      </div>
    </>
  );
}
