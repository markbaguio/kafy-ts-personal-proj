export type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "" }: LoadingProps) {
  return (
    <section data-testid="sign-in-loading">
      <div className="flex flex-col gap-12 h-screen items-center justify-center text-raisin-black">
        <div className="relative flex flex-col items-center justify-center z-0">
          <div className="absolute animate-ping rounded-full border-4 border-t-4 border-raisin-black h-12 w-12"></div>
          <div className="absolute animate-ping delay-200 rounded-full border-4 border-t-4 border-golden-brown h-12 w-12"></div>
          <div className="absolute animate-ping delay-400 rounded-full border-4 border-t-4 border-royal-brown h-12 w-12"></div>
        </div>
        <span className="text-2xl">{text}</span>
      </div>
    </section>
  );
}
