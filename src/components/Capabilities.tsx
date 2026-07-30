import { capabilities } from '../data/research';
import SectionHead from './SectionHead';

export default function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 border-t py-28 sm:py-36">
      <div className="shell">
        <SectionHead
          index="03"
          label="Capabilities"
          title={<>The mathematics is the constant. Domains are where you point it.</>}
          lede="Linear algebra, probability and geometry do not care whether the input is an image, a sentence or a skeleton. That is what has let me move between vision, language and 3D without starting over each time."
        />

        <dl className="mt-16 border-t sm:mt-20">
          {capabilities.map((c) => (
            <div
              key={c.area}
              className="grid gap-4 border-b py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
              data-reveal
            >
              <dt className="text-[1.0625rem] font-medium tracking-tight lg:col-span-3">
                {c.area}
              </dt>
              <dd className="text-[0.9375rem] leading-relaxed text-muted text-pretty lg:col-span-6">
                {c.detail}
              </dd>
              <dd className="flex flex-wrap gap-x-4 gap-y-2 lg:col-span-3 lg:justify-end">
                {c.items.map((item) => (
                  <span key={item} className="font-mono text-micro uppercase text-faint">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
