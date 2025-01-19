import Hero from "../component/sections/Hero";
import ChangelogExpanded from "../component/sections/ChangelogExpanded";

function ChangelogPage() {
  return (
    <div className="bg-background flex flex-col gap-10">
      {/* HERO SECTION */}
      <Hero />
      {/* CHANGELOG EXPANDED SECTION */}
      <ChangelogExpanded />
    </div>
  );
}

export default ChangelogPage;
