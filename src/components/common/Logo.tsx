import KafyLogo from "../../assets/coffee-svgrepo-com.svg";

type LogoProps = {
  darkBg?: boolean;
  classname?: string;
};

export default function Logo({ darkBg = false }: LogoProps) {
  return (
    <>
      <div className="flex items-center gap-1">
        <img
          src={KafyLogo}
          alt="Kafy logo"
          className={`w-[35px] h-[35px] md:w-[50px] md:h-[50px] fill-current ${
            darkBg ? `invert` : ""
          }`}
        />
        <span
          className={`text-[35px] md:text-[40px] font-bold tracking-[0%] ${
            darkBg ? "text-milky-white" : "text-raisin-black"
          }`}
        >
          KAFY
        </span>
      </div>
    </>
  );
}
