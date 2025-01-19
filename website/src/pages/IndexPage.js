import Hero from "../component/sections/Hero";
import About from "../component/sections/About";
import Instalattion from "../component/sections/Installation";
import Contributing from "../component/sections/Contributing";
import Changelog from "../component/sections/Changelog";

function IndexPage() {
  return (
    <div className="bg-background flex flex-col gap-10">
      {/* HERO SECTION */}
      <Hero />
      {/* ABOUT SECTION */}
      <About />
      {/* INSTALATION GUIDE */}
      <Instalattion />
      {/* Contributing */}
      <Contributing />
      {/* Changelog */}
      <Changelog />
    </div>
  );
}

export default IndexPage;
