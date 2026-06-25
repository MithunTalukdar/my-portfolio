import { About } from "../sections/About";
import { Achievements } from "../sections/Achievements";
import { Contact } from "../sections/Contact";
import { DeveloperGameZone } from "../components/DeveloperGameZone";
import { Education } from "../sections/Education";
import { Experience } from "../sections/Experience";
import { Footer } from "../sections/Footer";
import { GitHubDashboard } from "../sections/GitHubDashboard";
import { Hero } from "../sections/Hero";
import { Projects } from "../sections/Projects";
import { Services } from "../sections/Services";
import { Skills } from "../sections/Skills";
import { useGsapSectionMotion } from "../hooks/useGsapSectionMotion";

export function Home() {
  useGsapSectionMotion();

  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Achievements />
      <GitHubDashboard />
      <Contact />
      <DeveloperGameZone />
      <Footer />
    </>
  );
}
