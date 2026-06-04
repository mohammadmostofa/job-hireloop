import GlobeStats from "./GlobalStatic";


const BannerPage = () => {
   
  return (
    <div>
       
       <section className="relative w-full  text-white min-h-[85vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">

      {/* background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[180px] sm:h-[250px] bg-indigo-600/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto text-center z-10 flex flex-col items-center">

        {/* badge */}
        <div className="flex items-center gap-2 bg-zinc-900/10 border border-zinc-800 px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 text-[10px] sm:text-xs text-zinc-400">
          <span>💼</span>
          <span className="text-white font-semibold">50,000+</span>
          NEW JOBS THIS MONTH
        </div>

        {/* heading */}
        <h1 className="text-2xl md:3xl font-bold tracking-tight mb-4 sm:mb-6 leading-snug sm:leading-tight max-w-3xl">
          Find Your Dream Job Today
        </h1>

        {/* subtitle */}
        <p className="text-zinc-400 text-xs sm:text-sm md:text-lg max-w-2xl mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
          HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role faster.
        </p>

        {/* search bar */}
        <div className="w-full max-w-3xl bg-zinc-950/80 border border-zinc-800 rounded-2xl sm:rounded-full p-2 flex flex-col sm:flex-row gap-2 backdrop-blur-md">

          {/* job input */}
          <div className="flex items-center gap-3 flex-1 px-3 sm:px-4 py-2 sm:py-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder-zinc-500"
              placeholder="Job title, skill or company"
            />
          </div>

          {/* location input */}
          <div className="flex items-center gap-3 flex-1 px-3 sm:px-4 py-2 sm:py-3 border-t sm:border-t-0 sm:border-l border-zinc-800">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            <input
              className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder-zinc-500"
              placeholder="Location or Remote"
            />
          </div>

          {/* button */}
          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl sm:rounded-full transition active:scale-95 text-sm">
            Search
          </button>
        </div>

        {/* trending */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2">

          <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
            Trending:
          </span>

          <a className="text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white">
            Product Designer
          </a>

          <a className="text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white">
            AI Engineering
          </a>

          <a className="text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-zinc-300 hover:text-white">
            DevOps Engineer
          </a>

        </div>

      </div>
       </section> 

     <GlobeStats/>

    </div>
  );
};

export default BannerPage;