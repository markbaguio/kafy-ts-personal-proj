export default function NotFoundPage() {
  return (
    <div className='bg-[url("/img/rizky-subagja-1k7TnX5GAww-unsplash.jpg")] h-screen bg-cover flex items-center justify-center'>
      <div className="w-[850px] h-[600px] px-8 gap-8 bg-off-white/10 backdrop-blur-md bg-linear-to-br from-off-white/10 to-[#666666]/10  rounded-[50px] flex items-center justify-center flex-col">
        <h1 className="text-off-white text-6xl text-center leading-[57px] tracking-tighter">
          Hold Tight-We're Building Something Cool!
        </h1>
        <p className="text-off-white text-center font-light text-2xl leading-[57px] tracking-tighter">
          This page is currently under construction, but we’re working hard to
          make it worth the wait. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}
