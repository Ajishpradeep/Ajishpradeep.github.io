import Hero from '../components/Hero';
import WorkConsole from '../components/WorkConsole';
import Impact from '../components/Impact';
import Approach from '../components/Approach';
import Capabilities from '../components/Capabilities';
import Research from '../components/Research';
import Lab from '../components/Lab';
import Contact from '../components/Contact';

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
