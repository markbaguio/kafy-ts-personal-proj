import KafyLogo from "../../assets/coffee-svgrepo-com.svg";

export default function Logo() {
  return (
    <>
      <div className="flex items-center gap-1">
        <img src={KafyLogo} alt="Kafy logo" className="w-[50px] h-[50px]" />
        <span className="text-[40px] font-bold text-raisin-black tracking-[0%]">
          KAFY
        </span>
      </div>
    </>
  );
}
