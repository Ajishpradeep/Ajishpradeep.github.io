import Hero from '@/sections/Hero';
import WorkConsole from '@/sections/WorkConsole';
import Impact from '@/sections/Impact';
import Approach from '@/sections/Approach';
import Capabilities from '@/sections/Capabilities';
import Research from '@/sections/Research';
import Lab from '@/sections/Lab';
import Contact from '@/sections/Contact';

/**
 * Research sits above Lab: peer-reviewed and conference work should outrank
 * personal repositories for the reader this page is built for. It was the other
 * way round.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WorkConsole />
      <Impact />
      <Approach />
      <Capabilities />
      <Research />
      <Lab />
      <Contact />
    </>
  );
}
