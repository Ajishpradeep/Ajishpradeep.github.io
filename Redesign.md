You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion
yarn: yarn add motion
pnpm: pnpm add motion
bun: bun add motion
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import ExpandableEventCard from './base';

export default function ExpandableEventCardDemo() {
  return (
    <div className="flex w-full max-w-sm items-center justify-center p-4">
      <ExpandableEventCard />
    </div>
  );
}


expandable-event-card-base.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableCardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export default function ExpandableEventCard({
  imageSrc = "https://assets.watermelon.sh/event.avif",
  title = "Neon Nights Festival",
  description = "Experience the ultimate electronic music festival with top DJs and immersive visual arts.",
  content
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `expandable-event-card-${title}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group shadow-sm theme-injected"
      >
        <motion.div layoutId={`image-container-${layoutId}`} className="relative h-48 w-full overflow-hidden">
          <motion.img 
            layoutId={`image-${layoutId}`} 
            src={imageSrc} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </motion.div>
        <div className="p-4 sm:p-5">
          <motion.h3 layoutId={`title-${layoutId}`} className="text-base font-medium tracking-tight text-foreground mb-1">{title}</motion.h3>
          <motion.p layoutId={`desc-${layoutId}`} className="text-muted-foreground text-xs tracking-wide line-clamp-2">{description}</motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-2xl bg-card rounded-2xl overflow-hidden border border-border z-10 flex flex-col shadow-xl"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-background/50 hover:bg-accent rounded-full border border-border text-foreground transition-colors backdrop-blur-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              
              <motion.div layoutId={`image-container-${layoutId}`} className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <motion.img 
                  layoutId={`image-${layoutId}`} 
                  src={imageSrc} 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <motion.h3 layoutId={`title-${layoutId}`} className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-2">{title}</motion.h3>
                <motion.p layoutId={`desc-${layoutId}`} className="text-primary text-xs font-medium tracking-wide uppercase mb-6">{description}</motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0, delay: 0.1 }}
                  className="text-foreground/80 text-sm leading-relaxed"
                >
                  {content || (
                    <div className="space-y-4">
                      <p>Join us for three unforgettable nights of pulsating beats and breathtaking light shows. The Neon Nights Festival brings together the best electronic music artists from around the globe.</p>
                      <h4 className="text-foreground font-semibold mt-6 mb-2 tracking-tight">Event Details:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Dates: August 15-17, 2026</li>
                        <li>Location: Downtown Arena</li>
                        <li>Age Restriction: 18+ only</li>
                      </ul>
                      <button className="mt-6 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto shadow-sm">
                        Get Tickets
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


expandable-event-card.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableCardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export default function ExpandableEventCard({
  imageSrc = "https://assets.watermelon.sh/event.avif",
  title = "Neon Nights Festival",
  description = "Experience the ultimate electronic music festival with top DJs and immersive visual arts.",
  content
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = `expandable-event-card-${title}`;

  return (
    <>
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group shadow-sm"
      >
        <motion.div layoutId={`image-container-${layoutId}`} className="relative h-48 w-full overflow-hidden">
          <motion.img 
            layoutId={`image-${layoutId}`} 
            src={imageSrc} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </motion.div>
        <div className="p-4 sm:p-5">
          <motion.h3 layoutId={`title-${layoutId}`} className="text-base font-medium tracking-tight text-foreground mb-1">{title}</motion.h3>
          <motion.p layoutId={`desc-${layoutId}`} className="text-muted-foreground text-xs tracking-wide line-clamp-2">{description}</motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-2xl bg-card rounded-2xl overflow-hidden border border-border z-10 flex flex-col shadow-xl"
            >
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center bg-background/50 hover:bg-accent rounded-full border border-border text-foreground transition-colors backdrop-blur-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              
              <motion.div layoutId={`image-container-${layoutId}`} className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
                <motion.img 
                  layoutId={`image-${layoutId}`} 
                  src={imageSrc} 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <motion.h3 layoutId={`title-${layoutId}`} className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-2">{title}</motion.h3>
                <motion.p layoutId={`desc-${layoutId}`} className="text-primary text-xs font-medium tracking-wide uppercase mb-6">{description}</motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0, delay: 0.1 }}
                  className="text-foreground/80 text-sm leading-relaxed"
                >
                  {content || (
                    <div className="space-y-4">
                      <p>Join us for three unforgettable nights of pulsating beats and breathtaking light shows. The Neon Nights Festival brings together the best electronic music artists from around the globe.</p>
                      <h4 className="text-foreground font-semibold mt-6 mb-2 tracking-tight">Event Details:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Dates: August 15-17, 2026</li>
                        <li>Location: Downtown Arena</li>
                        <li>Age Restriction: 18+ only</li>
                      </ul>
                      <button className="mt-6 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto shadow-sm">
                        Get Tickets
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them






 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react lucide-react react-icons
yarn: yarn add motion/react lucide-react react-icons
pnpm: pnpm add motion/react lucide-react react-icons
bun: bun add motion/react lucide-react react-icons
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
"use client";
import { MinimalCarousel, type CarouselCard } from "./original";
import { Anchor } from "lucide-react";
import { VscSparkleFilled } from "react-icons/vsc";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaCloud } from "react-icons/fa";

const CARDS: CarouselCard[] = [
  {
    id: "gxuri",
    title: "Gxuri",
    value: "1.03 ETH",
    color: "bg-[#AD46FF]",
    icon: VscSparkleFilled,
  },
  {
    id: "savings",
    title: "Savings",
    value: "25.08 ETH",
    color: "bg-[#171717]",
    icon: BsBookmarkStarFill,
  },
  {
    id: "yield",
    title: "Yield",
    value: "0.04 ETH",
    color: "bg-[#00B8DB]",
    icon: FaCloud,
  },
  {
    id: "spending",
    title: "Spending",
    value: "0 ETH",
    color: "bg-[#2B7FFF]",
    icon: Anchor,
  },
];

export default function MinimalCarouselDemo() {
  const handleCopy = (card: CarouselCard) => {
    console.log("Copied address for:", card.title);
  };

  const handleCustomize = (card: CarouselCard) => {
    console.log("Customizing:", card.title);
  };

  return (
      <MinimalCarousel 
        cards={CARDS} 
        onCopyClick={handleCopy}
        onCustomizeClick={handleCustomize}
      />
  );
}

minimal-carousel-base.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreHorizontal, Copy } from "lucide-react";

/* --- Types --- */
export interface CarouselCard {
  id: string;
  title: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

interface MinimalCarouselProps {
  cards: CarouselCard[];
  onCopyClick?: (card: CarouselCard) => void;
  onCustomizeClick?: (card: CarouselCard) => void;
}

export const MinimalCarousel: React.FC<MinimalCarouselProps> = ({
  cards,
  onCopyClick,
  onCustomizeClick,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCard = cards.find((c) => c.id === activeId);
  const secondaryCards = cards.filter((c) => c.id !== activeId);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setActiveId(null);
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center bg-transparent theme-injected">
      <div
        className="w-full flex flex-col items-center justify-center px-4 sm:px-5 select-none font-sans"
        onClick={handleBackgroundClick}
      >
        {/* Container  */}
        <div className="w-full max-w-105">
          <motion.div layout className="flex flex-col gap-4">

            {/* Expanded Card */}
            <AnimatePresence mode="popLayout">
              {activeCard && (
                <motion.div
                  key={activeCard.id}
                  layoutId={activeCard.id}
                  className={`relative flex w-full flex-col justify-between
                             rounded-2xl sm:rounded-3xl border border-white/20 p-5 sm:p-6 text-white shadow-xl
                             ${activeCard.color}
                             min-h-42.5 sm:h-48`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full shrink-0">
                      <activeCard.icon size={38} className="sm:w-11 sm:h-11" />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyClick?.(activeCard);
                      }}
                      className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15
                                 px-3 py-1.5 sm:px-4 sm:py-2 font-bold backdrop-blur-md 
                                 text-xs sm:text-base whitespace-nowrap
                                 hover:bg-white/20 transition-colors"
                    >
                      Copy <span className="hidden xs:inline">Address</span> <Copy size={16} />
                    </motion.button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="overflow-hidden mr-2">
                      <h3 className="text-xl sm:text-2xl font-semibold opacity-90 leading-tight truncate">
                        {activeCard.title}
                      </h3>
                      <p className="text-lg sm:text-xl font-semibold tracking-tight opacity-60 truncate">
                        {activeCard.value}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomizeClick?.(activeCard);
                      }}
                      className="rounded-full border border-white/30 bg-white/25 px-3 py-1.5 sm:px-4 sm:py-2
                                 text-sm sm:text-base font-bold backdrop-blur-md 
                                 hover:bg-white/40 transition-colors shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid Layout */}
            <motion.div
              layout
              className={`grid gap-3 sm:gap-4 transition-all duration-500 ${activeId ? "grid-cols-3" : "grid-cols-2"
                }`}
            >
              {(activeId ? secondaryCards : cards).map((card) => (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(card.id);
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className={`relative flex flex-col justify-between cursor-pointer
                             rounded-xl sm:rounded-2xl border border-white/15 p-3 sm:p-4 text-white shadow-md
                             ${card.color}
                             ${activeId ? "h-24 sm:h-28" : "h-28 sm:h-32"}`}
                >
                  <div className="flex justify-between items-start">
                    <card.icon size={activeId ? 20 : 28} className="shrink-0" />
                    <div className="rounded-full border border-white/25 bg-white/15 p-1 sm:p-1.5 transition-colors">
                      <MoreHorizontal size={16} />
                    </div>
                  </div>

                  <div className="mt-1 overflow-hidden">
                    <h4 className={`${activeId ? "text-xs sm:text-xs" : "text-sm sm:text-base"} 
                                   font-medium opacity-90 truncate leading-tight`}>
                      {card.title}
                    </h4>
                    <p className={`${activeId ? "text-xs sm:text-xs" : "text-sm sm:text-base"} 
                                   font-semibold text-white/60 truncate`}>
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

minimal-carousel.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreHorizontal, Copy } from "lucide-react";

/* --- Types --- */
export interface CarouselCard {
  id: string;
  title: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

interface MinimalCarouselProps {
  cards: CarouselCard[];
  onCopyClick?: (card: CarouselCard) => void;
  onCustomizeClick?: (card: CarouselCard) => void;
}

export const MinimalCarousel: React.FC<MinimalCarouselProps> = ({
  cards,
  onCopyClick,
  onCustomizeClick,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCard = cards.find((c) => c.id === activeId);
  const secondaryCards = cards.filter((c) => c.id !== activeId);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setActiveId(null);
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center bg-transparent">
      <div
        className="w-full flex flex-col items-center justify-center px-3 sm:px-4 select-none font-sans"
        onClick={handleBackgroundClick}
      >
        {/* Container  */}
        <div className="w-full max-w-105">
          <motion.div layout className="flex flex-col gap-3">

            {/* Expanded Card */}
            <AnimatePresence mode="popLayout">
              {activeCard && (
                <motion.div
                  key={activeCard.id}
                  layoutId={activeCard.id}
                  className={`relative flex w-full flex-col justify-between
                             rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 text-white shadow-2xl
                             ${activeCard.color}
                             min-h-42.5 sm:h-48`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full shrink-0">
                      <activeCard.icon size={38} className="sm:w-11 sm:h-11" />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyClick?.(activeCard);
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-white/10
                                 px-3 py-1.5 sm:px-4 sm:py-2 font-bold backdrop-blur-md 
                                 text-xs sm:text-base whitespace-nowrap
                                 hover:bg-white/20 transition-colors"
                    >
                      Copy <span className="hidden xs:inline">Address</span> <Copy size={16} />
                    </motion.button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="overflow-hidden mr-2">
                      <h3 className="text-xl sm:text-2xl font-semibold opacity-90 leading-tight truncate">
                        {activeCard.title}
                      </h3>
                      <p className="text-lg sm:text-xl font-semibold tracking-tight opacity-60 truncate">
                        {activeCard.value}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomizeClick?.(activeCard);
                      }}
                      className="rounded-full bg-white/30 px-3 py-1 sm:px-4 sm:py-1.5
                                 text-sm sm:text-base font-bold backdrop-blur-md 
                                 hover:bg-white/40 transition-colors shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid Layout */}
            <motion.div
              layout
              className={`grid gap-2 sm:gap-3 transition-all duration-500 ${activeId ? "grid-cols-3" : "grid-cols-2"
                }`}
            >
              {(activeId ? secondaryCards : cards).map((card) => (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(card.id);
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className={`relative flex flex-col justify-between cursor-pointer
                             rounded-[22px] sm:rounded-[28px] p-3 sm:p-4 text-white shadow-lg
                             ${card.color}
                             ${activeId ? "h-24 sm:h-28" : "h-28 sm:h-32"}`}
                >
                  <div className="flex justify-between items-start">
                    <card.icon size={activeId ? 20 : 28} className="shrink-0" />
                    <div className="rounded-full bg-white/10 p-1 sm:p-1.5 transition-colors">
                      <MoreHorizontal size={16} />
                    </div>
                  </div>

                  <div className="mt-1 overflow-hidden">
                    <h4 className={`${activeId ? "text-[10px] sm:text-xs" : "text-sm sm:text-base"} 
                                   font-medium opacity-90 truncate leading-tight`}>
                      {card.title}
                    </h4>
                    <p className={`${activeId ? "text-[10px] sm:text-xs" : "text-sm sm:text-base"} 
                                   font-semibold text-white/60 truncate`}>
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them




 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react react-icons @hugeicons/react @hugeicons/core-free-icons
yarn: yarn add motion/react react-icons @hugeicons/react @hugeicons/core-free-icons
pnpm: pnpm add motion/react react-icons @hugeicons/react @hugeicons/core-free-icons
bun: bun add motion/react react-icons @hugeicons/react @hugeicons/core-free-icons
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import { VoiceChatDisclosure } from './original';

const myUsers = [
  {
    id: 1,
    name: 'Oğuz',
    img: 'https://i.pravatar.cc/150?u=oguz',
    active: true,
  },
  { id: 2, name: 'Ashish', img: 'https://i.pravatar.cc/150?u=ashish' },
  { id: 3, name: 'Mariana', img: 'https://i.pravatar.cc/150?u=mariana' },
  { id: 4, name: 'MDS', img: 'https://i.pravatar.cc/150?u=mds' },
  { id: 5, name: 'Ana', img: 'https://i.pravatar.cc/150?u=ana' },
  {
    id: 6,
    name: 'Natko',
    img: 'https://i.pravatar.cc/150?u=natko',
    active: true,
  },
  { id: 7, name: 'Afshin', img: 'https://i.pravatar.cc/150?u=afshin' },
];

function VoiceChatDisclosureDemo() {
  return (
    <div className="flex items-center justify-center">
      <VoiceChatDisclosure users={myUsers} />
    </div>
  );
}

export default VoiceChatDisclosureDemo;


voice-chat-disclosure-base.tsx
'use client';

import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { IoChevronDown } from 'react-icons/io5';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

export interface User {
  id: number;
  name: string;
  img: string;
  active?: boolean;
}

type IconRenderer = (props?: any) => ReactNode;

interface VoiceChatDisclosureProps {
  users?: User[];
  title?: string;
  ctaText?: string;
  helperText?: string;
  closeIcon?: IconRenderer;
}

const DEFAULT_USERS: User[] = [
  {
    id: 1,
    name: 'Oğuz',
    img: 'https://i.pravatar.cc/150?u=oguz',
    active: true,
  },
  { id: 2, name: 'Ashish', img: 'https://i.pravatar.cc/150?u=ashish' },
  { id: 3, name: 'Mariana', img: 'https://i.pravatar.cc/150?u=mariana' },
  { id: 4, name: 'MDS', img: 'https://i.pravatar.cc/150?u=mds' },
  { id: 5, name: 'Ana', img: 'https://i.pravatar.cc/150?u=ana' },
  {
    id: 6,
    name: 'Natko',
    img: 'https://i.pravatar.cc/150?u=natko',
    active: true,
  },
];

export const VoiceChatDisclosure: React.FC<VoiceChatDisclosureProps> = ({
  users = DEFAULT_USERS,
  title = 'Voice Chat',
  ctaText = 'Join Now',
  helperText = 'Mic will be muted initially.',
  closeIcon = (props) => (
    <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={2} {...props} />
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bars = [0, 1, 2, 3];

  return (
    <MotionConfig
      transition={{ type: 'spring', bounce: 0, visualDuration: 0.32 }}
    >
      <motion.div layout className="relative theme-injected font-sans">
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              layout="position"
              className="absolute -top-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-4xl bg-primary shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-[3px]">
                {bars.map((i) => (
                  <motion.div
                    key={i}
                    className="w-[2.5px] rounded-full bg-primary-foreground"
                    initial={{ height: 6 }}
                    animate={{ height: [2, 16, 6] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          onClick={() => !isOpen && setIsOpen(true)}
          className="cursor-pointer overflow-hidden border border-border bg-card shadow-xl"
          style={{
            width: isOpen ? 'min(320px, calc(100vw - 32px))' : 280,
            height: isOpen ? 'auto' : 90,
            borderRadius: isOpen ? 32 : 44,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!isOpen ? (
              <div className="flex h-[90px] items-center px-6">
                <div className="flex -space-x-3">
                  {users.slice(0, 4).map((user, idx) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      style={{ zIndex: 10 - idx }}
                    >
                      <motion.img
                        layoutId={`avatar-img-${user.id}`}
                        src={user.img}
                        className="h-14 w-14 rounded-full border-4 border-background object-cover shadow-lg"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="ml-4 flex items-center gap-1 font-sans text-lg font-medium text-muted-foreground">
                  <span>+{users.length - 4}</span>
                  <IoChevronDown />
                </div>
              </div>
            ) : (
              <motion.div layout className="flex flex-col">
                <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3 sm:px-8">
                  <div className="w-8" />
                  <h2 className="font-sans text-base font-semibold text-foreground sm:text-lg truncate">
                    {title}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="rounded-full bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {closeIcon({
                      className: 'text-current size-4 sm:size-5',
                    })}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-y-6 px-4 py-6 sm:gap-y-8 sm:px-6">
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      className="relative flex flex-col items-center gap-2"
                    >
                      <div className="relative">
                        <motion.img
                          layoutId={`avatar-img-${user.id}`}
                          src={user.img}
                          className="h-11 w-11 rounded-full border border-border object-cover shadow-md sm:h-[56px] sm:w-[56px]"
                        />

                        {user.active && (
                          <motion.div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-xl sm:-top-3 sm:-right-3 sm:h-8 sm:w-8">
                            <div className="flex items-center gap-[2px]">
                              {bars.map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-[1.5px] rounded-full bg-muted-foreground sm:w-[2px]"
                                  animate={{ height: [2, 10, 6] }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <span className="font-sans text-[11px] font-semibold text-muted-foreground sm:text-sm truncate w-full text-center px-1">
                        {user.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="px-4 pb-6 sm:px-6">
                  <button className="w-full rounded-4xl bg-primary py-2.5 font-sans text-base font-semibold text-primary-foreground transition active:scale-[0.98] sm:py-3 sm:text-lg">
                    {ctaText}
                  </button>
                  <p className="mt-3 text-center font-sans text-xs text-muted-foreground sm:mt-4 sm:text-sm">
                    {helperText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};


voice-chat-disclosure.tsx
'use client';

import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { IoChevronDown } from 'react-icons/io5';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';

export interface User {
  id: number;
  name: string;
  img: string;
  active?: boolean;
}

type IconRenderer = (props?: any) => ReactNode;

interface VoiceChatDisclosureProps {
  users?: User[];
  title?: string;
  ctaText?: string;
  helperText?: string;
  closeIcon?: IconRenderer;
}

const DEFAULT_USERS: User[] = [
  {
    id: 1,
    name: 'Oğuz',
    img: 'https://i.pravatar.cc/150?u=oguz',
    active: true,
  },
  { id: 2, name: 'Ashish', img: 'https://i.pravatar.cc/150?u=ashish' },
  { id: 3, name: 'Mariana', img: 'https://i.pravatar.cc/150?u=mariana' },
  { id: 4, name: 'MDS', img: 'https://i.pravatar.cc/150?u=mds' },
  { id: 5, name: 'Ana', img: 'https://i.pravatar.cc/150?u=ana' },
  {
    id: 6,
    name: 'Natko',
    img: 'https://i.pravatar.cc/150?u=natko',
    active: true,
  },
];

export const VoiceChatDisclosure: React.FC<VoiceChatDisclosureProps> = ({
  users = DEFAULT_USERS,
  title = 'Voice Chat',
  ctaText = 'Join Now',
  helperText = 'Mic will be muted initially.',
  closeIcon = (props) => (
    <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={2} {...props} />
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const bars = [0, 1, 2, 3];

  return (
    <MotionConfig
      transition={{ type: 'spring', bounce: 0, visualDuration: 0.32 }}
    >
      <motion.div layout className="relative">
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              layout="position"
              className="absolute -top-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 shadow-lg dark:bg-neutral-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-[3px]">
                {bars.map((i) => (
                  <motion.div
                    key={i}
                    className="w-[2.5px] rounded-full bg-white dark:bg-neutral-900"
                    initial={{ height: 6 }}
                    animate={{ height: [2, 16, 6] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          onClick={() => !isOpen && setIsOpen(true)}
          className="cursor-pointer overflow-hidden border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
          style={{
            width: isOpen ? 'min(320px, calc(100vw - 32px))' : 280,
            height: isOpen ? 'auto' : 90,
            borderRadius: isOpen ? 32 : 44,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!isOpen ? (
              <div className="flex h-[90px] items-center px-6">
                <div className="flex -space-x-3">
                  {users.slice(0, 4).map((user, idx) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      style={{ zIndex: 10 - idx }}
                    >
                      <motion.img
                        layoutId={`avatar-img-${user.id}`}
                        src={user.img}
                        className="h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg dark:border-neutral-900"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="ml-4 flex items-center gap-1 text-lg font-medium text-neutral-600 dark:text-neutral-400">
                  <span>+{users.length - 4}</span>
                  <IoChevronDown />
                </div>
              </div>
            ) : (
              <motion.div layout className="flex flex-col">
                <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-3 sm:px-8 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="w-8" />
                  <h2 className="text-base font-semibold text-neutral-700 sm:text-lg dark:text-neutral-300 line-clamp-1">
                    {title}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="rounded-full bg-neutral-200 p-2 dark:bg-neutral-700"
                  >
                    {closeIcon({
                      className: 'text-neutral-600 size-4 sm:size-5 dark:text-neutral-300',
                    })}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-y-6 px-4 py-6 sm:gap-y-8 sm:px-6">
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      layoutId={`avatar-${user.id}`}
                      className="relative flex flex-col items-center gap-2"
                    >
                      <div className="relative">
                        <motion.img
                          layoutId={`avatar-img-${user.id}`}
                          src={user.img}
                          className="h-11 w-11 rounded-full border border-neutral-200 object-cover shadow-md sm:h-[56px] sm:w-[56px] dark:border-neutral-700"
                        />

                        {user.active && (
                          <motion.div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-xl sm:-top-3 sm:-right-3 sm:h-8 sm:w-8 dark:bg-neutral-800">
                            <div className="flex items-center gap-[2px]">
                              {bars.map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-[1.5px] rounded-full bg-neutral-700 sm:w-[2px] dark:bg-neutral-300"
                                  animate={{ height: [2, 10, 6] }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <span className="text-[11px] font-semibold text-neutral-700 sm:text-sm dark:text-neutral-400 truncate w-full text-center px-1">
                        {user.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="px-4 pb-6 sm:px-6">
                  <button className="w-full rounded-xl bg-neutral-900 py-2.5 text-base text-white transition active:scale-[0.98] sm:py-3 sm:text-lg dark:bg-neutral-100 dark:text-neutral-900">
                    {ctaText}
                  </button>
                  <p className="mt-3 text-center text-xs text-neutral-500 sm:mt-4 sm:text-sm dark:text-neutral-500">
                    {helperText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them





 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react lucide-react
yarn: yarn add motion/react lucide-react
pnpm: pnpm add motion/react lucide-react
bun: bun add motion/react lucide-react
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import { CarouselNavigator } from "./original";
import { useState, useEffect } from "react";

const customThemes = [
  {
    bg: "bg-[#F4F4F9]",
    button: "bg-[#262629]",
    dot: "bg-[#D5D4E0]",
    progress: "bg-[#D5D4E0]",
  },
  {
    bg: "bg-[#E7F1FD]",
    button: "bg-[#016FFE]",
    dot: "bg-[#89BCF9]",
    progress: "bg-[#89BCF9]",
  },
  {
    bg: "bg-[#E0FAE7]",
    button: "bg-[#2EBE50]",
    dot: "bg-[#38E363]",
    progress: "bg-[#38E363]",
  },
  {
    bg: "bg-[#FCF5DB]",
    button: "bg-[#FEC400]",
    dot: "bg-[#FAD34C]",
    progress: "bg-[#FAD34C]",
  },
];

export default function CarouselNavigatorDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4;
  const autoDelay = 4000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoDelay);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="flex justify-center items-center">
      <CarouselNavigator
        totalSlides={totalSlides}
        autoDelay={autoDelay}
        themes={customThemes}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}

carousel-navigator-base.tsx
'use client';

import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FC } from 'react';

type ThemeConfig = {
  button: string;
  dot: string;
  progress: string;
};

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const DEFAULT_THEMES: ThemeConfig[] = [
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
];

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
}) => {
  const theme = themes[currentIndex];

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);

  const goNext = () => onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <motion.div
      className="theme-injected flex items-center justify-center gap-1 rounded-4xl border border-border bg-card px-4 py-3 font-sans transition-colors duration-300"
    >
      <ArrowButton
        onClick={goPrev}
        themeColor={theme.button}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </ArrowButton>

      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            isActive={i === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      <ArrowButton onClick={goNext} themeColor={theme.button}>
        <ChevronRight size={24} strokeWidth={3} />
      </ArrowButton>
    </motion.div>
  );
};

const ArrowButton = ({ children, onClick, themeColor, disabled }: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-4xl font-sans shadow-sm transition-colors duration-300 ${disabled ? 'cursor-not-allowed bg-input text-muted-foreground opacity-60' : `${themeColor} hover:brightness-95`}`}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ borderRadius: 24 }}
      className={`relative h-3 cursor-pointer focus:outline-none ${isActive ? `w-12 ${theme.progress}` : `w-3 ${theme.dot}`} transition-colors duration-300`}
    >
      {isActive && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoDelay / 1000, ease: 'linear' }}
          className="absolute inset-0 rounded-4xl bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
        />
      )}
    </motion.button>
  );
};


carousel-navigator.tsx
'use client';

import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FC } from 'react';

type ThemeConfig = {
  bg: string;
  button: string;
  dot: string;
  progress: string;
};

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const DEFAULT_THEMES: ThemeConfig[] = [
  {
    bg: 'bg-zinc-100',
    button: 'bg-zinc-900',
    dot: 'bg-zinc-300',
    progress: 'bg-zinc-300',
  },
  {
    bg: 'bg-blue-100',
    button: 'bg-blue-600',
    dot: 'bg-blue-300',
    progress: 'bg-blue-300',
  },
  {
    bg: 'bg-green-100',
    button: 'bg-green-600',
    dot: 'bg-green-400',
    progress: 'bg-green-400',
  },
  {
    bg: 'bg-yellow-100',
    button: 'bg-yellow-400',
    dot: 'bg-yellow-300',
    progress: 'bg-yellow-300',
  },
];

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
}) => {
  const theme = themes[currentIndex];

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);

  const goNext = () => onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <motion.div
      animate={{
        backgroundColor: theme.bg.replace('bg-[', '').replace(']', ''),
      }}
      className="flex items-center justify-center gap-1 rounded-full px-4 py-3 transition-colors duration-300"
    >
      <ArrowButton
        onClick={goPrev}
        themeColor={theme.button}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </ArrowButton>

      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            isActive={i === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      <ArrowButton onClick={goNext} themeColor={theme.button}>
        <ChevronRight size={24} strokeWidth={3} />
      </ArrowButton>
    </motion.div>
  );
};

const ArrowButton = ({ children, onClick, themeColor, disabled }: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-sm transition-colors cursor-pointer duration-300 ${disabled ? 'bg-gray-300 opacity-50' : themeColor}`}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ borderRadius:24}}
      className={`relative h-3 cursor-pointer  focus:outline-none ${isActive ? `w-12 ${theme.progress}` : `w-3 ${theme.dot}`} transition-colors duration-300`}
    >
      {isActive && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoDelay / 1000, ease: 'linear' }}
          className="absolute inset-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      )}
    </motion.button>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them





 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react
yarn: yarn add motion/react
pnpm: pnpm add motion/react
bun: bun add motion/react
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import { Dock } from './original';
import {
  Search01Icon,
  NoteIcon,
  Settings01Icon,
  AddSquareIcon,
  MessageNotification01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const items = [
  { id: 1, Icon: ()=> <HugeiconsIcon icon={Search01Icon} size={26} /> },
  { id: 2, Icon: ()=> <HugeiconsIcon icon={NoteIcon} size={26} /> },
  { id: 3, Icon: ()=> <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
  { id: 4, Icon: ()=> <HugeiconsIcon icon={MessageNotification01Icon} size={26} /> },
  { id: 5, Icon: ()=> <HugeiconsIcon icon={Settings01Icon} size={26} /> },
]

export default function DockDemo() {
  return (
    <div>
      <Dock items={items} />
    </div>
  );
}


dock-base.tsx
'use client';

import React, { useState, type FC } from 'react';
import { motion, type Transition } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  AddSquareIcon,
  MessageNotification01Icon,
  NoteIcon,
  Search01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface DockItem {
  id: number;
  Icon: React.ElementType;
}

interface DockProps {
  items?: DockItem[];
}

const DEFAULT_DOCK_ITEMS: DockItem[] = [
  { id: 1, Icon: () => <HugeiconsIcon icon={Search01Icon} size={26} /> },
  { id: 2, Icon: () => <HugeiconsIcon icon={NoteIcon} size={26} /> },
  { id: 3, Icon: () => <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
  {
    id: 4,
    Icon: () => <HugeiconsIcon icon={MessageNotification01Icon} size={26} />,
  },
  { id: 5, Icon: () => <HugeiconsIcon icon={Settings01Icon} size={26} /> },
];

const dockSpring: Transition = {
  stiffness: 300,
  damping: 22,
  mass: 0.7,
};

export const Dock: FC<DockProps> = ({ items }) => {
  const dockItems = items ?? DEFAULT_DOCK_ITEMS;
  const [selected, setSelected] = useState<number | null>(null);
  const [animateSelected, setAnimateSelected] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelected(id);
    setAnimateSelected(id);
    setTimeout(() => {
      setAnimateSelected(null);
    }, 200);
  };

  return (
    <div className="theme-injected flex w-full flex-col items-center justify-center bg-transparent font-sans transition-colors duration-500">
      <motion.div
        layout
        transition={dockSpring}
        className="relative flex items-end gap-3.5 rounded-3xl border border-border bg-card px-3 py-2 shadow-sm"
      >
        {dockItems.map((item) => (
          <motion.div
            className="relative"
            onClick={() => handleClick(item.id)}
            style={{
              transformOrigin: 'bottom',
            }}
            initial={{
              scale: 1,
            }}
            whileHover={{
              y: -4,
            }}
            animate={{
              scale: animateSelected === item.id ? 1.3 : 1,
              y: animateSelected === item.id ? -6 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 550,
              damping: 15,
              mass: 1.1,
            }}
          >
            <motion.div className="cursor-pointer rounded-md bg-muted p-2 transition-colors hover:bg-background">
              <item.Icon
                className={cn(
                  'size-4 text-muted-foreground transition-all duration-200',
                  selected === item.id && 'text-foreground',
                )}
              />
            </motion.div>

            <motion.div
              className={cn(
                'absolute mt-px flex w-full items-center justify-center opacity-0 transition-opacity duration-400 will-change-transform',
                selected === item.id && 'opacity-100',
              )}
            >
              <div
                className="rounded-full bg-primary"
                style={{
                  width: 4,
                  height: 4,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};


dock.tsx
'use client';

import React, { useState, type FC } from 'react';
import { motion, type Transition } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  AddSquareIcon,
  MessageNotification01Icon,
  NoteIcon,
  Search01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface DockItem {
  id: number;
  Icon: React.ElementType;
}

interface DockProps {
  items?: DockItem[];
}

const DEFAULT_DOCK_ITEMS: DockItem[] = [
  { id: 1, Icon: () => <HugeiconsIcon icon={Search01Icon} size={26} /> },
  { id: 2, Icon: () => <HugeiconsIcon icon={NoteIcon} size={26} /> },
  { id: 3, Icon: () => <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
  {
    id: 4,
    Icon: () => <HugeiconsIcon icon={MessageNotification01Icon} size={26} />,
  },
  { id: 5, Icon: () => <HugeiconsIcon icon={Settings01Icon} size={26} /> },
];

const dockSpring: Transition = {
  stiffness: 300,
  damping: 22,
  mass: 0.7,
};

export const Dock: FC<DockProps> = ({ items }) => {
  const dockItems = items ?? DEFAULT_DOCK_ITEMS;
  const [selected, setSelected] = useState<number | null>(null);
  const [animateSelected, setAnimateSelected] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelected(id);
    setAnimateSelected(id);
    setTimeout(() => {
      setAnimateSelected(null);
    }, 200);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-white transition-colors duration-500 dark:bg-zinc-950">
      <motion.div
        layout
        transition={dockSpring}
        className="relative flex items-end gap-3.5 rounded-3xl border-[1.5px] border-[#E5E5E9] bg-white px-3 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        {dockItems.map((item) => (
          <motion.div
            className="relative"
            onClick={() => handleClick(item.id)}
            style={{
              transformOrigin: 'bottom',
            }}
            initial={{
              scale: 1,
            }}
            whileHover={{
              y: -4,
            }}
            animate={{
              scale: animateSelected === item.id ? 1.3 : 1,
              y: animateSelected === item.id ? -6 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 550,
              damping: 15,
              mass: 1.1,
            }}
          >
            <motion.div className="cursor-pointer rounded-md bg-[#F4F4FB] p-2 dark:bg-zinc-800">
              <item.Icon
                className={cn(
                  'size-4 text-zinc-500 transition-all duration-200 dark:text-zinc-600',
                  selected === item.id && 'text-zinc-700',
                )}
              />
            </motion.div>

            <motion.div
              className={cn(
                'absolute mt-px flex w-full items-center justify-center opacity-0 transition-opacity duration-400 will-change-transform',
                selected === item.id && 'opacity-100',
              )}
            >
              <div
                className="rounded-full bg-zinc-200 dark:bg-zinc-700"
                style={{
                  width: 4,
                  height: 4,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them



 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react tailwindcss
yarn: yarn add motion/react tailwindcss
pnpm: pnpm add motion/react tailwindcss
bun: bun add motion/react tailwindcss
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import { useState } from "react";
import { FractionalPicker } from "./original";

export default function FractionalPickerDemo() {
  const [value, setValue] = useState(24);

  return (
   <>
      <FractionalPicker value={value} onChange={setValue} min={0} max={30} defaultValue={10} />
    </>
  );
}


fractional-picker-base.tsx
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface RulerItemProps {
  value: number;
  x: MotionValue<number>;
  itemWidth: number;
  max: number;
}

function RulerItem({ value, x, itemWidth, max }: RulerItemProps) {
  const distance = useTransform(x, (latest) => {
    const itemPos = value * itemWidth;
    return Math.abs(itemPos + latest);
  });

  const opacity = useTransform(distance, [0, itemWidth], [1, 0.3]);
  const scale = useTransform(distance, [0, itemWidth * 0.8], [1.1, 0.9]);

  return (
    <div className="flex h-full shrink-0 flex-col" style={{ width: itemWidth }}>
      <div className="relative flex h-full w-full flex-col items-center justify-end">
        <motion.span
          className="text-foreground mb-1 text-4xl font-semibold tabular-nums select-none"
          style={{ opacity, scale }}
        >
          {value}
        </motion.span>

        <div className="relative flex h-8 w-full items-end">
          <div className="bg-muted-foreground absolute left-1/2 z-10 h-8 w-[4px] -translate-x-1/2 rounded-t-full" />
          <div className="flex w-full translate-x-1/2 justify-evenly">
            {value !== max &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`${value}-sub-${i}`}
                  className="bg-border h-4 w-[4px] rounded-t-full"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FractionalPicker({
  min = 0,
  max = 20,
  defaultValue = 0,
  itemWidth = 80,
  onChange,
  className,
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(-defaultValue * itemWidth);
  const [activeValue, setActiveValue] = useState(defaultValue);

  const snap = () => {
    const currentX = x.get();
    const closestValue = Math.round(currentX / itemWidth) * itemWidth;
    animate(x, closestValue, {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    });
  };

  useEffect(() => {
    return x.on('change', (latest) => {
      const val = Math.abs(Math.round(latest / itemWidth));
      if (val !== activeValue && val >= min && val <= max) {
        setActiveValue(val);
        onChange?.(val);
      }
    });
  }, [x, itemWidth, activeValue, onChange, min, max]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'theme-injected bg-background border-border relative max-w-[600px] overflow-hidden rounded-lg border shadow-sm',
        className,
      )}
      style={{ height: 120 }}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
        <div
          className="bg-foreground h-6 w-10 "
          style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
        />
        <div className="bg-foreground mt-1 h-1.5 w-1.5 rounded-full" />
      </div>

      <motion.div
        drag="x"
        style={{
          x,
          paddingLeft: containerWidth / 2 - itemWidth / 2,
          paddingRight: containerWidth / 2 - itemWidth / 2,
        }}
        dragConstraints={{
          left: -max * itemWidth,
          right: -min * itemWidth,
        }}
        dragElastic={0.1}
        onDragEnd={snap}
        className="flex h-full cursor-grab items-end active:cursor-grabbing"
      >
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <RulerItem
            key={i + min}
            value={i + min}
            x={x}
            itemWidth={itemWidth}
            max={max}
          />
        ))}
      </motion.div>

      <div className="from-background via-background/60 pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-background via-background/60 pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
    </div>
  );
}


fractional-picker.tsx
'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface RulerItemProps {
  value: number;
  x: MotionValue<number>;
  itemWidth: number;
  max: number;
}

function RulerItem({ value, x, itemWidth, max }: RulerItemProps) {
  const distance = useTransform(x, (latest) => {
    const itemPos = value * itemWidth;
    return Math.abs(itemPos + latest);
  });

  const opacity = useTransform(distance, [0, itemWidth], [1, 0.3]);
  const scale = useTransform(distance, [0, itemWidth * 0.8], [1.1, 0.9]);

  return (
    <div className="flex h-full shrink-0 flex-col" style={{ width: itemWidth }}>
      <div className="relative flex h-full w-full flex-col items-center justify-end">
        <motion.span
          className="text-foreground mb-1 text-4xl font-semibold tabular-nums select-none"
          style={{ opacity, scale }}
        >
          {value}
        </motion.span>

        <div className="relative flex h-8 w-full items-end">
          <div className="absolute left-1/2 z-10 h-8 w-[4px] -translate-x-1/2 rounded-t-full bg-neutral-400 dark:bg-neutral-200" />
          <div className="flex w-full translate-x-1/2 justify-evenly">
            {value !== max &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`${value}-sub-${i}`}
                  className="h-4 w-[4px] rounded-t-full bg-neutral-200 dark:bg-neutral-600"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FractionalPicker({
  min = 0,
  max = 20,
  defaultValue = 0,
  itemWidth = 80,
  onChange,
  className,
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(-defaultValue * itemWidth);
  const [activeValue, setActiveValue] = useState(defaultValue);

  const snap = () => {
    const currentX = x.get();
    console.log(currentX)
    const closestValue = Math.round(currentX / itemWidth) * itemWidth;
    animate(x, closestValue, {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    });
  };

  useEffect(() => {
    return x.on('change', (latest) => {
      const val = Math.abs(Math.round(latest / itemWidth));
      if (val !== activeValue && val >= min && val <= max) {
        setActiveValue(val);
        onChange?.(val);
      }
    });
  }, [x, itemWidth, activeValue, onChange, min, max]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'bg-background border-border relative max-w-[600px] overflow-hidden rounded-4xl border shadow-sm',
        className,
      )}
      style={{ height: 120 }}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
        <div
          className="h-6 w-10 rounded-b-xl bg-neutral-200"
          style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}
        />
        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-200" />
      </div>

      <motion.div
        drag="x"
        style={{
          x,
          paddingLeft: containerWidth / 2 - itemWidth / 2,
          paddingRight: containerWidth / 2 - itemWidth / 2,
        }}
        dragConstraints={{
          left: -max * itemWidth,
          right: -min * itemWidth,
        }}
        dragElastic={0.1}
        onDragEnd={snap}
        className="flex h-full cursor-grab items-end active:cursor-grabbing"
      >
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <RulerItem
            key={i + min}
            value={i + min}
            x={x}
            itemWidth={itemWidth}
            max={max}
          />
        ))}
      </motion.div>

      <div className="from-background via-background/60 pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-background via-background/60 pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
    </div>
  );
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them



 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react
yarn: yarn add motion/react
pnpm: pnpm add motion/react
bun: bun add motion/react
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import { DiscreteTabs } from './original';
import { FaBell } from 'react-icons/fa6';
import { HiCalendarDays } from 'react-icons/hi2';
import { MdMailOutline } from 'react-icons/md'; 



const tabs = [
  {
    id: 'mail',
    icon: <MdMailOutline size={24} />,
    label: 'Inbox',
    activeColor: 'text-blue-500',
  },
  {
    id: 'planner',
    icon: <HiCalendarDays size={24} />,
    label: 'Planner',
    activeColor: 'text-yellow-500',
  },
  {
    id: 'mail2',
    icon: <FaBell size={24} />,
    label: 'Alerts',
    activeColor: 'text-red-500',
  },
];

function DiscreteTabsDemo() {
  return (
    <div className="flex  flex-col items-center justify-center gap-10 bg-transparent p-10">
      <DiscreteTabs tabs={tabs} defaultTab="mail" />
    </div>
  );
}

export default DiscreteTabsDemo;


discrete-tabs-base.tsx
'use client';

import { useEffect, useState, type FC, type ReactNode } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  icon: ReactNode;
  label: string;
  activeColor: string;
}

interface DiscreteTabsProps {
  tabs: TabItem[];
  onTabChange?: (tabId: string) => void;
  defaultTab?: string;
}

export const DiscreteTabs: FC<DiscreteTabsProps> = ({
  tabs,
  onTabChange,
  defaultTab,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);
  const [shine, setShine] = useState<boolean>(false);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShine(true), 600);
    return () => {
      clearTimeout(timer);
      setShine(false);
    };
  }, [activeTab]);

  return (
    <motion.div
      layout
      className="theme-injected mx-auto flex w-fit items-center justify-center gap-2 overflow-hidden rounded-lg py-6"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTabClick(tab.id);
              }
            }}
            className="relative focus:outline-none"
          >
            <motion.div
              layout="position"
              transition={{
                type: 'spring',
                stiffness: 210,
                damping: 18,
                mass: 1,
              }}
              className="flex h-16 w-full items-center justify-center"
            >
              <div
                className={cn(
                  'bg-background border-border flex h-12 cursor-pointer items-center justify-center rounded-lg border px-3',
                  isActive && '',
                )}
                tabIndex={0}
              >
                <motion.div
                  className={cn(
                    'flex items-center justify-center transition-colors duration-300',
                    isActive ? tab.activeColor : 'text-foreground',
                  )}
                >
                  {tab.icon}
                </motion.div>

                <motion.span
                  animate={{
                    width: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                    marginLeft: isActive ? 8 : 0,
                  }}
                  className={cn(
                    'relative overflow-hidden text-xl font-semibold whitespace-nowrap transition-colors duration-300',
                    isActive ? tab.activeColor : 'text-foreground',
                  )}
                >
                  {tab.label}

                  <AnimatePresence>
                    {isActive && shine && (
                      <motion.span
                        initial={{ left: '-120%' }}
                        animate={{ left: '120%' }}
                        transition={{
                          duration: 0.5,
                          ease: 'linear',
                        }}
                        className="via-background/50 absolute top-0 bottom-0 w-16 bg-linear-to-r from-transparent to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </motion.span>
              </div>
            </motion.div>
          </button>
        );
      })}
    </motion.div>
  );
};


discrete-tabs.tsx
'use client';

import { useEffect, useState, type FC, type ReactNode } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  icon: ReactNode;
  label: string;
  activeColor: string;
}

interface DiscreteTabsProps {
  tabs: TabItem[];
  onTabChange?: (tabId: string) => void;
  defaultTab?: string;
}

export const DiscreteTabs: FC<DiscreteTabsProps> = ({
  tabs,
  onTabChange,
  defaultTab,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);
  const [shine, setShine] = useState<boolean>(false);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShine(true), 600);
    return () => {
      clearTimeout(timer);
      setShine(false);
    };
  }, [activeTab]);

  return (
    <motion.div
      layout
      className="mx-auto flex w-fit items-center justify-center gap-2 overflow-hidden rounded-full py-6"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTabClick(tab.id);
              }
            }}
            className="relative focus:outline-none"
          >
            <motion.div
              layout="position"
              transition={{
                type: 'spring',
                stiffness: 210,
                damping: 18,
                mass: 1,
              }}
              className="flex h-16 w-full items-center justify-center"
            >
              <div
                className={cn(
                  'flex h-12 cursor-pointer items-center justify-center rounded-full bg-zinc-50 border border-border px-3 dark:bg-zinc-900',
                  isActive && '',
                )}
                tabIndex={0}
              >
                <motion.div
                  className={cn(
                    'flex items-center justify-center transition-colors duration-300',
                    isActive
                      ? tab.activeColor
                      : 'text-neutral-800 dark:text-white',
                  )}
                >
                  {tab.icon}
                </motion.div>

                <motion.span
                  animate={{
                    width: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                    marginLeft: isActive ? 8 : 0,
                  }}
                  className={cn(
                    'relative overflow-hidden text-xl font-semibold whitespace-nowrap transition-colors duration-300',
                    isActive ? tab.activeColor : 'text-black dark:text-white',
                  )}
                >
                  {tab.label}

                  <AnimatePresence>
                    {isActive && shine && (
                      <motion.span
                        initial={{ left: '-120%' }}
                        animate={{ left: '120%' }}
                        transition={{
                          duration: 0.5,
                          ease: 'linear',
                        }}
                        className="absolute top-0 bottom-0 w-16 bg-linear-to-r from-transparent via-white/80 to-transparent dark:from-transparent dark:via-neutral-900/80 dark:to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </motion.span>
              </div>
            </motion.div>
          </button>
        );
      })}
    </motion.div>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them



 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react react-icons
yarn: yarn add motion/react react-icons
pnpm: pnpm add motion/react react-icons
bun: bun add motion/react react-icons
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import { SwitchMode } from "./original";


export default function SwitchModeDemo() {
    return (
        <div className="flex items-center justify-center">
            <SwitchMode
                width={180}
                height={90}
                darkColor="#111"
                lightColor="#F9F9F9"
                knobDarkColor="#1C1C1C"
                knobLightColor="#F3F3F7"
                borderDarkColor="#444"
                borderLightColor="#DDD"
            />
        </div>
    );
}

switch-mode-base.tsx
'use client';

import { useEffect, useState, type FC } from 'react';
import { motion } from 'motion/react';
import {
  IoMoon,
  IoMoonOutline,
  IoSunny,
  IoSunnyOutline,
} from 'react-icons/io5';
import { useTheme } from 'next-themes';

interface SwitchModeProps {
  width?: number;
  height?: number;
}

export const SwitchMode: FC<SwitchModeProps> = ({
  width = 144,
  height = 72,
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className="theme-injected border-border rounded-lg border-2"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const iconSize = height * 0.45;

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="theme-injected border-border bg-background relative flex items-center rounded-lg border-2 transition-colors"
      style={{ width, height }}
    >
      {/* TRACK */}
      <motion.div
        className="bg-background absolute inset-0 rounded-lg"
        transition={{ duration: 0.4 }}
      />

      {/* KNOB */}
      <motion.div
        layout
        layoutId="switch-knob"
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="border-border bg-muted shadow-xs absolute z-30 rounded-lg border-2"
        style={{
          width: height,
          height,
          right: isDark ? -2 : undefined,
          left: isDark ? undefined : -2,
        }}
      />

      {/* SUN */}
      <motion.div
        className="relative z-30 flex items-center justify-center"
        style={{ width: height, height }}
        animate={{ rotate: isDark ? 45 : 0 }}
        transition={{ stiffness: 20 }}
      >
        {isDark ? (
          <IoSunnyOutline
            className="text-muted-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        ) : (
          <IoSunny
            className="text-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        )}
      </motion.div>

      {/* MOON */}
      <motion.div
        className="relative z-30 flex items-center justify-center"
        style={{ width: height, height }}
        animate={{ rotate: isDark ? 0 : 15 }}
        transition={{ stiffness: 20, damping: 14 }}
      >
        {isDark ? (
          <IoMoon
            className="text-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        ) : (
          <IoMoonOutline
            className="text-muted-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        )}
      </motion.div>
    </motion.button>
  );
};


switch-mode.tsx
"use client";

import { useEffect, useState, type FC } from "react";
import { motion } from "motion/react";
import { IoMoon, IoMoonOutline, IoSunny, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

/* --- Props --- */
interface SwitchModeProps {
    width?: number;
    height?: number;
    darkColor?: string;
    lightColor?: string;
    knobDarkColor?: string;
    knobLightColor?: string;
    borderDarkColor?: string;
    borderLightColor?: string;
}

export const SwitchMode: FC<SwitchModeProps> = ({
    width = 144,
    height = 72,
    darkColor = "#0B0B0B",
    lightColor = "#FFFFFF",
    knobDarkColor = "#2A2A2E",
    knobLightColor = "#F3F2F7",
    borderDarkColor = "#4C4C50",
    borderLightColor = "#D8D6E0",
}) => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true));
    }, []);

    if (!mounted) {
        return <div style={{ width, height }} className="rounded-full border-2 border-transparent" />;
    }

    const isDark = resolvedTheme === "dark";
    const iconSize = height * 0.45;

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center rounded-full border-2 transition-colors"
            style={{
                width,
                height,
                borderColor: isDark ? borderDarkColor : borderLightColor,
            }}
        >
            {/* TRACK */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ backgroundColor: isDark ? darkColor : lightColor }}
                transition={{ duration: 0.4 }}
            />

            {/* SLIDING KNOB */}
            <motion.div
                layout
                layoutId="switch-knob"
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute rounded-full border-2 z-30"
                style={{
                    width: height,
                    height,
                    right: isDark ? -2 : undefined,
                    left: isDark ? undefined : -2,
                    backgroundColor: isDark ? knobDarkColor : knobLightColor,
                    borderColor: isDark ? borderDarkColor : borderLightColor,
                }}
            />

            {/* SUN */}
            <motion.div
                className="relative z-30 flex items-center justify-center"
                style={{ width: height, height }}
                animate={{ rotate: isDark ? 45 : 0 }}
                transition={{ stiffness: 20 }}
            >
                {isDark ? (
                    <IoSunnyOutline
                        color="#8A8A8F"
                        fill="#8A8A8F"
                        stroke="#8A8A8F"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                ) : (
                    <IoSunny
                        color="#686771"
                        fill="#686771"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                )}
            </motion.div>

            {/* MOON */}
            <motion.div
                className="relative z-30 flex items-center justify-center"
                style={{ width: height, height }}
                animate={{ rotate: isDark ? 0 : 15 }}
                transition={{ stiffness: 20, damping: 14 }}
            >
                {isDark ? (
                    <IoMoon
                        color="#F4F4FB"
                        fill="#F4F4FB"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                ) : (
                    <IoMoonOutline
                        color="#ABABB4"
                        fill="#ABABB4"
                        stroke="#ABABB4"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                )}
            </motion.div>
        </motion.button>
    );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them



 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion/react lucide-react react-icons
yarn: yarn add motion/react lucide-react react-icons
pnpm: pnpm add motion/react lucide-react react-icons
bun: bun add motion/react lucide-react react-icons
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
import React from "react";

import { ShowQr } from "./original";

const App: React.FC = () => {
  return (
    <div className="w-full">
      <ShowQr
        value="https://gemini.google.com"
        buttonLabel="Show QR Code"
        onCopy={() => console.log("Link copied to clipboard!")}
      />
    </div>
  );
};

export default App;


show-qr-base.tsx
'use client';

import { X, Link } from 'lucide-react';
import { IoQrCodeOutline } from 'react-icons/io5';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import useMeasure from 'react-use-measure';

interface ShowQrProps {
  value: string;
  buttonLabel?: string;
  onCopy?: () => void;
}

export const ShowQr = ({
  value,
  buttonLabel = 'Show QR Code',
  onCopy,
}: ShowQrProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [ref, bounds] = useMeasure();

  useEffect(() => {
    if (isCopied) {
      const t = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isCopied]);

  const springConfig: Transition = {
    type: 'spring',
    bounce: 0.25,
    visualDuration: 0.35,
  };

  const collapsedTransition: Transition = {
    type: 'spring',
    bounce: 0.15,
    visualDuration: 0.35,
  };

  return (
    <div className="theme-injected  flex w-full h-[500px] items-center justify-center overflow-hidden transition-colors">
      <MotionConfig
        transition={isExpanded ? springConfig : collapsedTransition}
      >
        <motion.div
          initial={{
            width: 180,
          }}
          animate={{
            width: isExpanded ? 250 : 180,
            height: isExpanded ? bounds.height : 48,
          }}
          className="bg-muted overflow-hidden rounded-lg"
        >
          <div ref={ref} className="">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  className="text-foreground flex cursor-pointer items-center justify-center gap-1 px-4 py-3 font-medium"
                  onClick={() => setIsExpanded(true)}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                >
                  <IoQrCodeOutline className="size-6" />
                  <span>{buttonLabel}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  className="text-foreground flex flex-col items-center gap-2 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: 'easeOut',
                    },
                  }}
                >
                  <motion.div
                    className="border-border bg-background flex h-[220px] w-[220px] items-center justify-center rounded-lg border p-4"
                    initial={{ opacity: 0, y: 60, scale: 1.2 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                  >
                    <QRCodeSVG
                      value={value}
                      size={200}
                      level="H"
                      fgColor="currentColor"
                      bgColor="transparent"
                      className="text-foreground h-full w-full"
                    />
                  </motion.div>

                  <div className="flex w-full items-center gap-2">
                    <motion.div
                      className="border-border bg-background flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg border p-2 text-lg font-medium"
                      onClick={() => {
                        navigator.clipboard.writeText(value);
                        setIsCopied(true);
                        onCopy?.();
                      }}
                      layout
                    >
                      <motion.div layout>
                        <Link />
                      </motion.div>
                      <AnimatedText
                        from="Copy"
                        to="Copied"
                        isCopied={isCopied}
                      />
                      <motion.span layout>Link</motion.span>
                    </motion.div>

                    <div
                      className="border-border bg-background flex cursor-pointer items-center justify-center rounded-lg border p-2"
                      onClick={() => {
                        setIsExpanded(false);
                        setIsCopied(false);
                      }}
                    >
                      <X />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

const AnimatedText = ({
  from,
  to,
  isCopied,
}: {
  from: string;
  to: string;
  isCopied: boolean;
}) => {
  const activeText = isCopied ? to : from;

  return (
    <div className="flex text-lg tracking-tight will-change-transform">
      <AnimatePresence mode="popLayout" initial={false}>
        {activeText.split('').map((char, index) => {
          const displayChar = char === ' ' ? '\u00A0' : char;

          return (
            <motion.span
              key={char + index}
              layout
              initial={{ opacity: 0, y: 5, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.03 * index,
                },
              }}
              exit={{ opacity: 0, y: -5, scale: 0.7 }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};


show-qr.tsx
'use client';

import { X, Link } from 'lucide-react';
import { IoQrCodeOutline } from 'react-icons/io5';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import useMeasure from 'react-use-measure';

interface ShowQrProps {
  value: string;
  buttonLabel?: string;
  onCopy?: () => void;
}

export const ShowQr = ({
  value,
  buttonLabel = 'Show QR Code',
  onCopy,
}: ShowQrProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [ref, bounds] = useMeasure();

  useEffect(() => {
    if (isCopied) {
      const t = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isCopied]);

  const springConfig: Transition = {
    type: 'spring',
    bounce: 0.25,
    visualDuration: 0.35,
  };

  const collapsedTransition: Transition = {
    type: 'spring',
    bounce: 0.15,
    visualDuration: 0.35,
  };

  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <MotionConfig
        transition={isExpanded ? springConfig : collapsedTransition}
      >
        <motion.div
          initial={{
            width: 180,
          }}
          animate={{
            width: isExpanded ? 250 : 180,
            height: isExpanded ? bounds.height : 48,
          }}
          className="overflow-hidden rounded-[32px] bg-[#F4F4F9] dark:bg-[#1C1C1E]"
        >
          <div ref={ref} className="">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isExpanded ? (
                <motion.div
                  key="collapsed"
                  className="flex cursor-pointer items-center justify-center gap-1 px-4 py-3 font-medium text-neutral-900 dark:text-white"
                  onClick={() => setIsExpanded(true)}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                >
                  <IoQrCodeOutline className="size-6" />
                  <span>{buttonLabel}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  className="flex flex-col items-center gap-2 p-4 text-neutral-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: 'easeOut',
                    },
                  }}
                >
                  <motion.div
                    className="flex h-[220px] w-[220px] items-center justify-center rounded-3xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#0B0B0E]"
                    initial={{ opacity: 0, y: 60, scale: 1.2 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                  >
                    <QRCodeSVG
                      value={value}
                      size={200}
                      level="H"
                      fgColor="currentColor"
                      bgColor="transparent"
                      className="h-full w-full text-black dark:text-white"
                    />
                  </motion.div>

                  <div className="flex w-full items-center gap-2">
                    <motion.div
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border border-gray-200 bg-white p-2 text-lg font-medium dark:border-white/10 dark:bg-neutral-950"
                      onClick={() => {
                        navigator.clipboard.writeText(value);
                        setIsCopied(true);
                        onCopy?.();
                      }}
                      layout
                    >
                      <motion.div layout>
                        <Link />
                      </motion.div>
                      <AnimatedText
                        from="Copy"
                        to="Copied"
                        isCopied={isCopied}
                      />
                      <motion.span layout>Link</motion.span>
                    </motion.div>

                    <div
                      className="flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-neutral-950"
                      onClick={() => {
                        setIsExpanded(false);
                        setIsCopied(false);
                      }}
                    >
                      <X />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
};

const AnimatedText = ({
  from,
  to,
  isCopied,
}: {
  from: string;
  to: string;
  isCopied: boolean;
}) => {
  const activeText = isCopied ? to : from;

  return (
    <div className="flex text-lg tracking-tight will-change-transform">
      <AnimatePresence mode="popLayout" initial={false}>
        {activeText.split('').map((char, index) => {
          const displayChar = char === ' ' ? '\u00A0' : char;

          return (
            <motion.span
              key={char + index}
              layout
              initial={{ opacity: 0, y: 5, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.03 * index,
                },
              }}
              exit={{ opacity: 0, y: -5, scale: 0.7 }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them




 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Install dependencies first:
```bash
npm: npm install motion next-themes
yarn: yarn add motion next-themes
pnpm: pnpm add motion next-themes
bun: bun add motion next-themes
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
"use client"

import { useState } from 'react';
import { WeightWidget } from './original';

export default function WeightWidgetDemo() {
    const [weight, setWeight] = useState(24);

    return (
        <div className="flex items-center justify-center">
            <WeightWidget
                initialValue={weight}
                min={0}
                max={200}
                onChange={(val) => setWeight(val)}
            />
        </div>
    );
};


weight-widget-base.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
  MotionValue,
} from 'motion/react';
import { useTheme } from 'next-themes';

interface WeightWidgetProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const WeightWidget: React.FC<WeightWidgetProps> = ({
  initialValue = 25,
  min = 0,
  max = 100,
  onChange,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pixelsPerUnit = 80;

  const x = useMotionValue(-initialValue * pixelsPerUnit);
  const springConfig = { bounce: 0.45 };
  const springX = useSpring(x, springConfig);

  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const unsubscribe = springX.on('change', (latest) => {
      const val = Math.abs(latest / pixelsPerUnit);
      const roundedVal = Math.round(val);
      if (roundedVal !== displayValue) {
        setDisplayValue(roundedVal);
        if (onChange) onChange(roundedVal);
      }
    });
    return () => unsubscribe();
  }, [springX, pixelsPerUnit, onChange, displayValue]);

  const dragStartX = React.useRef(x.get());

  const handlePanStart = () => {
    dragStartX.current = x.get();
  };

  const handlePan = (_: any, info: PanInfo) => {
    const maxOffset = pixelsPerUnit;
    const boundedOffset = Math.max(
      -maxOffset,
      Math.min(maxOffset, info.offset.x * 0.6),
    );
    const newX = dragStartX.current + boundedOffset;

    const minX = -max * pixelsPerUnit;
    const maxX = -min * pixelsPerUnit;
    x.set(Math.max(minX, Math.min(maxX, newX)));
  };

  const handlePanEnd = (_: any, info: PanInfo) => {
    const baseValue = Math.round(dragStartX.current / -pixelsPerUnit);
    let direction = 0;

    if (info.offset.x < -20 || info.velocity.x < -100) direction = 1;
    else if (info.offset.x > 20 || info.velocity.x > 100) direction = -1;

    const targetValue = Math.max(min, Math.min(max, baseValue + direction));
    x.set(-targetValue * pixelsPerUnit);
  };

  const visibleRange = useMemo(() => {
    const items = [];
    const buffer = 5;
    for (
      let i = Math.max(min, displayValue - buffer);
      i <= Math.min(max, displayValue + buffer);
      i += 0.5
    ) {
      items.push(i);
    }
    return items;
  }, [min, max, displayValue]);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="theme-injected border-border bg-card relative flex h-[220px] w-[220px] touch-none flex-col items-center overflow-hidden rounded-lg border-2 font-sans shadow-lg transition-colors duration-300 select-none sm:h-[260px] sm:w-[260px]">
      <div className="text-muted-foreground mt-5 text-base font-semibold tracking-wide capitalize transition-colors sm:mt-6 sm:text-xl">
        Weight
      </div>

      <div className="relative flex w-full flex-1 items-start justify-center">
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className="absolute flex h-full w-full cursor-grab items-start active:cursor-grabbing"
          style={{ x: springX, left: '50%' }}
        >
          {visibleRange.map((i) => (
            <DialItem
              key={i}
              value={i}
              pixelsPerUnit={pixelsPerUnit}
              scrollX={springX}
              isDark={isDark}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 z-20 mb-1 flex flex-col items-center sm:mb-0">
          <div className="bg-muted-foreground mb-1.5 h-[5px] w-[5px] rounded-lg transition-colors sm:h-[6.5px] sm:w-[6.5px]" />
          <svg
            className="text-muted-foreground h-6 w-2 transition-colors sm:h-9 sm:w-[10px]"
            viewBox="0 0 10 36"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 5 2 L 9 36 L 1 36 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const DialItem: React.FC<{
  value: number;
  pixelsPerUnit: number;
  scrollX: MotionValue<number>;
  isDark: boolean;
}> = ({ value, pixelsPerUnit, scrollX, isDark }) => {
  const isHalf = value % 1 !== 0;
  const itemX = value * pixelsPerUnit;
  const distance = useTransform(scrollX, (s: number) => Math.abs(s + itemX));

  const opacity = useTransform(
    distance,
    [0, pixelsPerUnit * 2, pixelsPerUnit * 3],
    [1, 0.1, 0],
  );

  // const color = useTransform(
  //   distance,
  //   [0, pixelsPerUnit],
  //   isDark
  //     ? [
  //         'oklch(var(--background) / 0.8)',
  //         'oklch(var(--background) / 0)',
  //       ]
  //     : [
  //         'oklch(var(--foreground) / 0.9)',
  //         'oklch(var(--muted-foreground) / 0.5)',
  //       ],
  // );

  const scale = useTransform(distance, [0, pixelsPerUnit * 2], [1, 0.85]);

  const yOffset = useTransform(
    distance,
    [
      0,
      pixelsPerUnit * 0.5,
      pixelsPerUnit,
      pixelsPerUnit * 1.5,
      pixelsPerUnit * 2,
      pixelsPerUnit * 2.5,
      pixelsPerUnit * 3,
    ],
    [0, 2, 7, 17, 32, 54, 88],
  );

  const rotate = useTransform(scrollX, (s: number) => {
    const d = s + itemX;
    return (d / pixelsPerUnit) * 12;
  });

  return (
    <motion.div
      className="absolute top-0 flex flex-col items-center"
      style={{
        left: itemX,
        x: '-50%',
        opacity,
        scale,
        y: yOffset,
        rotate,
        transformOrigin: 'center 140px',
      }}
    >
      <motion.span
        className={`text-[56px] font-bold text-muted-foreground tracking-tight sm:text-[68px] ${
          isHalf ? 'invisible' : ''
        }`}
        // style={{ color }}
      >
        {Math.floor(value)}
      </motion.span>

      <div className="mt-2 flex flex-col items-center sm:mt-4">
        <div
          className={`h-5 w-[2.5px] rounded-lg transition-colors sm:h-7 sm:w-[3px] ${
            isDark ? 'bg-foreground/20' : 'bg-foreground/20'
          }`}
        />
      </div>
    </motion.div>
  );
};


weight-widget.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
  MotionValue,
} from 'motion/react';
import { useTheme } from 'next-themes';

interface WeightWidgetProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const WeightWidget: React.FC<WeightWidgetProps> = ({
  initialValue = 25,
  min = 0,
  max = 100,
  onChange,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pixelsPerUnit = 80;

  const x = useMotionValue(-initialValue * pixelsPerUnit);
  const springConfig = { bounce: 0.45 };
  const springX = useSpring(x, springConfig);

  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const unsubscribe = springX.on('change', (latest) => {
      const val = Math.abs(latest / pixelsPerUnit);
      const roundedVal = Math.round(val);
      if (roundedVal !== displayValue) {
        setDisplayValue(roundedVal);
        if (onChange) onChange(roundedVal);
      }
    });
    return () => unsubscribe();
  }, [springX, pixelsPerUnit, onChange, displayValue]);

  const dragStartX = React.useRef(x.get());

  const handlePanStart = () => {
    dragStartX.current = x.get();
  };

  const handlePan = (_: any, info: PanInfo) => {
    // Restrict visual drag movement to roughly one number space so it doesn't run away
    const maxOffset = pixelsPerUnit;
    const boundedOffset = Math.max(
      -maxOffset,
      Math.min(maxOffset, info.offset.x * 0.6),
    );
    const newX = dragStartX.current + boundedOffset;

    const minX = -max * pixelsPerUnit;
    const maxX = -min * pixelsPerUnit;
    x.set(Math.max(minX, Math.min(maxX, newX)));
  };

  const handlePanEnd = (_: any, info: PanInfo) => {
    const baseValue = Math.round(dragStartX.current / -pixelsPerUnit);
    let direction = 0;

    if (info.offset.x < -20 || info.velocity.x < -100) direction = 1;
    else if (info.offset.x > 20 || info.velocity.x > 100) direction = -1;

    const targetValue = Math.max(min, Math.min(max, baseValue + direction));
    x.set(-targetValue * pixelsPerUnit);
  };

  const visibleRange = useMemo(() => {
    const items = [];
    const buffer = 5;
    for (
      let i = Math.max(min, displayValue - buffer);
      i <= Math.min(max, displayValue + buffer);
      i += 0.5
    ) {
      items.push(i);
    }
    return items;
  }, [min, max, displayValue]);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="relative flex h-[220px] w-[220px] touch-none flex-col items-center overflow-hidden rounded-[28px] border-2 border-[#F0F0F0] bg-white font-sans shadow-lg transition-colors duration-300 select-none sm:h-[260px] sm:w-[260px] sm:rounded-[36px] dark:border-[#1E1E21] dark:bg-[#121214]">
      <div className="mt-5 text-base font-semibold tracking-wide text-[#94A3B8] capitalize transition-colors sm:mt-6 sm:text-xl dark:text-[#475569]">
        Weight
      </div>

      <div className="relative flex w-full flex-1 items-start justify-center">
        {/* Sliding Numbers Layer */}
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className="absolute flex h-full w-full cursor-grab items-start active:cursor-grabbing"
          style={{ x: springX, left: '50%' }}
        >
          {visibleRange.map((i) => (
            <DialItem
              key={i}
              value={i}
              pixelsPerUnit={pixelsPerUnit}
              scrollX={springX}
              isDark={isDark}
            />
          ))}
        </motion.div>

        {/* Static Indicator */}
        <div className="pointer-events-none absolute bottom-0 z-20 mb-1 flex flex-col items-center sm:mb-0">
          <div className="mb-1.5 h-[5px] w-[5px] rounded-full bg-black transition-colors sm:h-[6.5px] sm:w-[6.5px] dark:bg-white" />
          <svg
            className="h-6 w-2 text-black transition-colors sm:h-9 sm:w-[10px] dark:text-white"
            viewBox="0 0 10 36"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 5 2 L 9 36 L 1 36 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const DialItem: React.FC<{
  value: number;
  pixelsPerUnit: number;
  scrollX: MotionValue<number>;
  isDark: boolean;
}> = ({ value, pixelsPerUnit, scrollX, isDark }) => {
  const isHalf = value % 1 !== 0;
  const itemX = value * pixelsPerUnit;
  const distance = useTransform(scrollX, (s: number) => Math.abs(s + itemX));

  const opacity = useTransform(
    distance,
    [0, pixelsPerUnit * 2, pixelsPerUnit * 3],
    [1, 0.4, 0],
  );

  const color = useTransform(
    distance,
    [0, pixelsPerUnit],
    isDark ? ['#F8FAFC', '#334155'] : ['#25262B', '#CBD5E1'],
  );

  const scale = useTransform(distance, [0, pixelsPerUnit * 2], [1, 0.85]);

  // Use a quadratic curve for true circular appearance instead of linear
  const yOffset = useTransform(
    distance,
    [
      0,
      pixelsPerUnit * 0.5,
      pixelsPerUnit,
      pixelsPerUnit * 1.5,
      pixelsPerUnit * 2,
      pixelsPerUnit * 2.5,
      pixelsPerUnit * 3,
    ],
    [0, 2, 7, 17, 32, 54, 88],
  );

  const rotate = useTransform(scrollX, (s: number) => {
    const d = s + itemX;
    return (d / pixelsPerUnit) * 12;
  });

  return (
    <motion.div
      className="absolute top-0 flex flex-col items-center"
      style={{
        left: itemX,
        x: '-50%',
        opacity,
        scale,
        y: yOffset,
        rotate,
        transformOrigin: 'center 140px', // Adjusted for smaller card
      }}
    >
      <motion.span
        className={`text-[56px] font-bold tracking-tight sm:text-[68px] ${isHalf ? 'invisible' : ''}`}
        style={{ color }}
      >
        {Math.floor(value)}
      </motion.span>

      <div className="mt-2 flex flex-col items-center sm:mt-4">
        <div
          className={`h-5 w-[2.5px] rounded-full transition-colors sm:h-7 sm:w-[3px] ${isDark ? 'bg-[#2D2D30]' : 'bg-[#D6D5E1]'}`}
        />
      </div>
    </motion.div>
  );
};
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them




 You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Copy-paste this component to /components/ui folder:
```tsx
tooltip-11.tsx
import { MdLaunch } from 'react-icons/md';

import { Button } from '@/components/base-ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/base-ui/hover-card';

const Tooltip11 = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link">Explore Feature</Button>
      </HoverCardTrigger>

      <HoverCardContent side="top">
        <div className="space-y-2">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
            alt="Feature preview"
            className="w-full rounded"
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">Smart Workspace</p>

            <p className="text-muted-foreground text-xs">
              Organize your tasks, notes, and files in one unified place. Boost
              productivity with a clean and intbase-uitive interface.{' '}
              <a
                href="#"
                className="hover:text-foreground flex w-fit items-center gap-1 underline"
              >
                Learn more
                <MdLaunch className="size-4" />
              </a>
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip11;
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's arguments and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Install external dependencies (see above)
 1. Copy paste all the code above in the correct directories
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them




 Install dependencies:
```bash
npm: npm install react-icons clsx tailwind-merge
yarn: yarn add react-icons clsx tailwind-merge
pnpm: pnpm add react-icons clsx tailwind-merge
bun: bun add react-icons clsx tailwind-merge
```

Copy-paste this component to /components/ui folder:
```tsx
demo.tsx
'use client';

import Blog2 from '.';

const samplePosts = [
  {
    meta: '5 min read',
    title: 'How to give clear feedback that actually helps your team',
    author: {
      name: 'Guillermo Rauch',
      role: 'CEO @ Vercel',
      avatar: 'https://github.com/rauchg.png',
    },
    href: 'https://github.com/rauchg',
  },
  {
    meta: '8 min read',
    title: '5 small changes to improve your team\'s daily wellbeing',
    author: {
      name: 'Dan Abramov',
      role: 'React Core',
      avatar: 'https://github.com/gaearon.png',
    },
    href: 'https://github.com/gaearon',
  },
  {
    meta: '3 min read',
    title: 'What new hires really need on their first day',
    author: {
      name: 'Lee Robinson',
      role: 'VP of Product @ Vercel',
      avatar: 'https://github.com/leerob.png',
    },
    href: 'https://github.com/leerob',
  },
  {
    meta: '6 min read',
    title: 'Mastering async communication across timezones',
    author: {
      name: 'Ryan Florence',
      role: 'Remix Creator',
      avatar: 'https://github.com/ryanflorence.png',
    },
    href: 'https://github.com/ryanflorence',
  },
  {
    meta: '4 min read',
    title: 'The art of running effective 1-on-1 meetings',
    author: {
      name: 'Evan You',
      role: 'Vue.js Creator',
      avatar: 'https://github.com/yyx990803.png',
    },
    href: 'https://github.com/yyx990803',
  },
  {
    meta: '7 min read',
    title: 'Building a culture of continuous learning',
    author: {
      name: 'Rich Harris',
      role: 'Svelte Creator',
      avatar: 'https://github.com/Rich-Harris.png',
    },
    href: 'https://github.com/Rich-Harris',
  },
];

export default function Blog2Demo() {
  return (
    <Blog2
      header={{
        heading: 'Elevate your team with actionable insights',
        description:
          'Practical strategies to streamline operations, boost morale, and build a thriving workplace culture.',
        ctaText: 'See all guides',
        ctaHref: '#',
      }}
      posts={samplePosts}
    />
  );
}


index.tsx
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { FaBookmark } from 'react-icons/fa6';

interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

interface BlogCardItem {
  meta: string;
  title: string;
  author: BlogAuthor;
  href?: string;
}

interface Blog2Header {
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

interface Blog2Props {
  header: Blog2Header;
  posts: BlogCardItem[];
  className?: string;
  renderCtaLink?: (props: {
    href: string;
    children: React.ReactNode;
  }) => React.ReactNode;
  renderCardLink?: (props: {
    href: string;
    children: React.ReactNode;
  }) => React.ReactNode;
}

const colorVariants = [
  "bg-violet-400/60 hover:bg-violet-400/40 dark:bg-violet-400/50 dark:hover:bg-violet-400/40",
  "bg-amber-400/60 hover:bg-amber-400/40 dark:bg-amber-400/50 dark:hover:bg-amber-400/40",
  "bg-emerald-400/60 hover:bg-emerald-400/40 dark:bg-emerald-400/50 dark:hover:bg-emerald-400/40",
  "bg-orange-400/60 hover:bg-orange-400/40 dark:bg-orange-400/50 dark:hover:bg-orange-400/40",
  "bg-blue-400/60 hover:bg-blue-400/40 dark:bg-blue-400/50 dark:hover:bg-blue-400/40",
  "bg-rose-400/60 hover:bg-rose-400/40 dark:bg-rose-400/50 dark:hover:bg-rose-400/40",
];

export default function Blog2({
  header,
  posts,
  className,
  renderCtaLink,
  renderCardLink,
}: Blog2Props) {
  const ctaContent = (
    <span className="group/cta text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors">
      {header.ctaText}
      <ArrowUpRight className="size-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
    </span>
  );

  return (
    <section
      className={cn(
        'bg-background w-full  px-4 py-8',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <h2 className="text-foreground max-w-2xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-[2.75rem]">
            {header.heading}
          </h2>

          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed sm:text-base">
            {header.description}
          </p>

          {renderCtaLink ? (
            renderCtaLink({ href: header.ctaHref, children: ctaContent })
          ) : (
            <a href={header.ctaHref}>{ctaContent}</a>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const card = (
              <article
                key={index}
                className={cn(
                  'group relative flex min-h-[360px] flex-col justify-between rounded-4xl p-6 transition-colors duration-300 sm:p-7',
                  colorVariants[index % colorVariants.length],
                )}
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80 text-md font-bold">
                      {post.meta}
                    </span>
                    <div className="text-foreground/50 hover:text-foreground/90 transition-colors">
                      <FaBookmark className="size-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center py-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-foreground line-clamp-3 text-4xl leading-[1.2] font-medium tracking-tight">
                        {post.title}
                      </h3>
                      <ArrowRight
                        className="text-foreground group-hover:text-foreground/80 mt-10 size-5 shrink-0 transition-all duration-300 group-hover:translate-x-1"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="mt-auto flex items-center gap-3">
                      <div className="bg-background flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                        {post.author.avatar.startsWith('<svg') ||
                        post.author.avatar.startsWith('http') ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="size-full rounded-lg object-contain"
                          />
                        ) : (
                          <div className="bg-muted flex size-full items-center justify-center rounded-full text-xs font-medium">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm leading-tight font-medium">
                        {post.author.name}
                      </span>
                      <span className="text-foreground/70 text-xs leading-tight font-medium">
                        {post.author.role}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center justify-center rounded-md border border-white/30 bg-background/20 dark:bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-zinc-50 transition-transform duration-300">
                      Read
                    </div>
                  </div>
                </div>
              </article>
            );

            if (renderCardLink && post.href) {
              return renderCardLink({
                href: post.href,
                children: card,
              });
            }

            if (post.href) {
              return (
                <a
                  key={index}
                  href={post.href}
                  className="block focus-visible:ring-primary rounded-[1.5rem] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {card}
                </a>
              );
            }

            return card;
          })}
        </div>
      </div>
    </section>
  );
}
```




import { Spotlight } from '@/components/core/spotlight';

export function SpotlightBasic() {
  return (
    <div className='relative aspect-video h-[200px] rounded-sm border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black'>
      <Spotlight
        className='bg-zinc-700 blur-2xl'
        size={64}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-2 dark:bg-black'>
        <svg
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 70 70'
          aria-label='MP Logo'
          width='70'
          height='70'
          className='h-8 w-auto stroke-black dark:stroke-white'
          fill='none'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth='3'
            d='M51.883 26.495c-7.277-4.124-18.08-7.004-26.519-7.425-2.357-.118-4.407-.244-6.364 1.06M59.642 51c-10.47-7.25-26.594-13.426-39.514-15.664-3.61-.625-6.744-1.202-9.991.263'
          ></path>
        </svg>
      </div>
    </div>
  );
}


import { Tilt } from '@/components/core/tilt';

export function TiltCard1() {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <img
          src='https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg'
          alt='Ghost in the shell - Kôkaku kidôtai'
          className='h-48 w-full object-cover'
        />
        <div className='p-2'>
          <h1 className='font-mono leading-snug text-zinc-950 dark:text-zinc-50'>
            Ghost in the Shell
          </h1>
          <p className='text-zinc-700 dark:text-zinc-400'>Kôkaku kidôtai</p>
        </div>
      </div>
    </Tilt>
  );
}



import { InfiniteSlider } from '@/components/core/infinite-slider';
import { ProgressiveBlur } from '@/components/core/progressive-blur';

export function ProgressiveBlurSlider() {
  return (
    <div className='relative h-[350px] w-full overflow-hidden'>
      <InfiniteSlider className='flex h-full w-full items-center'>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          1
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          2
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          3
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          4
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          5
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          6
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          7
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          8
        </div>
        <div className='w-32 text-center text-4xl font-[450] text-black dark:text-white'>
          9
        </div>
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[200px]'
        direction='left'
        blurIntensity={1}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[200px]'
        direction='right'
        blurIntensity={1}
      />
    </div>
  );
}




import { Tilt } from '@/components/core/tilt';

export function TiltCard1() {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <img
          src='https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg'
          alt='Ghost in the shell - Kôkaku kidôtai'
          className='h-48 w-full object-cover'
        />
        <div className='p-2'>
          <h1 className='font-mono leading-snug text-zinc-950 dark:text-zinc-50'>
            Ghost in the Shell
          </h1>
          <p className='text-zinc-700 dark:text-zinc-400'>Kôkaku kidôtai</p>
        </div>
      </div>
    </Tilt>
  );
}





_________________________________________________________________________________________________________________________________________



import { TextRoll } from '@/components/core/text-roll';

export function TextRollCustomVariants() {
  return (
    <TextRoll
      className='text-4xl text-black dark:text-white'
      variants={{
        enter: {
          initial: { rotateX: 0, filter: 'blur(0px)' },
          animate: { rotateX: 90, filter: 'blur(2px)' },
        },
        exit: {
          initial: { rotateX: 90, filter: 'blur(2px)' },
          animate: { rotateX: 0, filter: 'blur(0px)' },
        },
      }}
    >
      motion-primitives
    </TextRoll>
  );
}



import { TextScramble } from '@/components/core/text-scramble';

export function TextScrambleBasic() {
  return (
    <TextScramble className='font-mono text-sm uppercase'>
      Text Scramble
    </TextScramble>
  );
}



import { TextRoll } from '@/components/core/text-roll';

export function TextRollCustomVariants() {
  return (
    <TextRoll
      className='text-4xl text-black dark:text-white'
      variants={{
        enter: {
          initial: { rotateX: 0, filter: 'blur(0px)' },
          animate: { rotateX: 90, filter: 'blur(2px)' },
        },
        exit: {
          initial: { rotateX: 90, filter: 'blur(2px)' },
          animate: { rotateX: 0, filter: 'blur(0px)' },
        },
      }}
    >
      motion-primitives
    </TextRoll>
  );
}




import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/core/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Products',
    icon: (
      <Package className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Components',
    icon: (
      <Component className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Activity',
    icon: (
      <Activity className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Change Log',
    icon: (
      <ScrollText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Email',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Theme',
    icon: (
      <SunMoon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
];

export function AppleStyleDock() {
  return (
    <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}




import { InView } from '@/components/core/in-view';

export function InViewBasicMultiple() {
  return (
    <div className='h-[350px] w-full overflow-y-auto overflow-x-hidden'>
      <div className='mb-36 py-12 text-center text-sm'>Scroll down</div>
      <div className='flex h-[350px] items-end justify-center px-4 pb-24'>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.95,
              filter: 'blur(4px)',
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='max-w-96 bg-zinc-100 p-4'>
            <p className='text-zinc-600'>
              <strong className='font-medium text-zinc-900'>Athletics.</strong>{' '}
              Watch running, jumping, and throwing events. Athletes compete in
              many different activities.
            </p>
          </div>
        </InView>
      </div>
      <div className='flex h-[350px] items-end justify-center px-4 pb-24'>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              x: 100,
            },
            visible: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='max-w-96 bg-zinc-900 p-4'>
            <p className='text-zinc-400'>
              <strong className='font-medium text-zinc-50'>Swimming.</strong>{' '}
              See swimmers race in water. They use different styles to swim fast
              and win medals.
            </p>
          </div>
        </InView>
      </div>
      <div className='flex h-[350px] items-end justify-center overflow-x-hidden px-4 pb-24'>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              scale: 1.5,
            },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          viewOptions={{ margin: '0px 0px -350px 0px' }}
        >
          <div className='max-w-96 bg-zinc-100 p-4'>
            <p className='text-zinc-600'>
              <strong className='font-medium'>Gymnastics.</strong> Gymnasts
              perform amazing flips and jumps. They show strength and balance in
              their routines.
            </p>
          </div>
        </InView>
      </div>
    </div>
  );
}



import { InView } from '@/components/core/in-view';

export function InViewBasic() {
  return (
    <div className='h-[350px] w-full overflow-auto'>
      <div className='py-12 text-center text-sm'>Scroll down</div>
      <div className='flex h-[500px] items-end justify-center px-4 pb-24'>
        <InView
          variants={{
            hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          viewOptions={{ margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='max-w-96'>
            <p className=''>
              <strong className='font-medium'>
                Craft beautiful animated components with Motion-Primitives.
              </strong>{' '}
              Designed for developers and designers. The library leverages the
              power of Motion, with intuitive APIs that simplifies creating
              complex animations for any project. Start building more dynamic
              interfaces today.
            </p>
          </div>
        </InView>
      </div>
    </div>
  );
}



'use client';
import { InView } from '@/components/core/in-view';
import { motion } from 'motion/react';

export function InViewImagesGrid() {
  return (
    <div className='h-full w-full overflow-auto'>
      <div className='mb-20 py-12 text-center text-sm'>Scroll down</div>
      <div className='flex h-[1200px] items-end justify-center pb-12'>
        <InView
          viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
        >
          <div className='columns-2 gap-4 px-8 sm:columns-3'>
            {[
              'https://images.beta.cosmos.so/e5ebb6f8-8202-40ec-bc70-976f81153501?format=jpeg',
              'https://images.beta.cosmos.so/1b6f1bee-1b4c-4035-9e93-c93ef4d445e1?format=jpeg',
              'https://images.beta.cosmos.so/9968a6cf-d7f6-4ec9-a56d-ac4eef3f8689?format=jpeg',
              'https://images.beta.cosmos.so/4b88a39c-c657-4911-b843-b473237e83b5?format=jpeg',
              'https://images.beta.cosmos.so/86af92c0-064d-4801-b7ed-232535b03328?format=jpeg',
              'https://images.beta.cosmos.so/399e2a4a-e118-4aaf-9c7e-155ed18f6556?format=jpeg',
              'https://images.beta.cosmos.so/6ff16bc9-dc94-4549-a057-673a603ce203?format=jpeg',
              'https://images.beta.cosmos.so/d67c3185-4480-4408-8f9d-1cbf541e5d91?format=jpeg',
              'https://images.beta.cosmos.so/a7b19274-3370-4080-b734-e8ac268d8c8e.?format=jpeg',
              'https://images.beta.cosmos.so/551daf0d-77e8-472c-9324-468fed15a0ba?format=jpeg',
            ].map((imgSrc, index) => {
              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: 'blur(0px)',
                    },
                  }}
                  key={index}
                  className='mb-4'
                >
                  <img
                    src={imgSrc}
                    alt={`Image placeholder from cosmos.so, index:${index}`}
                    className='size-full rounded-lg object-contain'
                  />
                </motion.div>
              );
            })}
          </div>
        </InView>
      </div>
    </div>
  );
}




'use client';
import React, { useEffect, useState } from 'react';
import { TransitionPanel } from '@/components/core/transition-panel';
import useMeasure from 'react-use-measure';

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='relative flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800'
    >
      {children}
    </button>
  );
}
export function TransitionPanelCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const FEATURES = [
    {
      title: 'Brand',
      description:
        'Develop a distinctive brand identity with tailored logos and guidelines to ensure consistent messaging across all platforms.',
    },
    {
      title: 'Product',
      description:
        'Design and refine products that excel in user experience, meeting needs effectively and creating memorable interactions. We specialize in web applications.',
    },
    {
      title: 'Website',
      description:
        'Create impactful websites that combine beautiful aesthetics with functional design, ensuring a superior online presence.',
    },
    {
      title: 'Design System',
      description:
        'Develop a design system that unifies your brand identity, ensuring consistency across all platforms and products.',
    },
  ];

  const handleSetActiveIndex = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(0);
    if (activeIndex >= FEATURES.length) setActiveIndex(FEATURES.length - 1);
  }, [activeIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 364 : -364,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 364 : -364,
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }),
  };

  return (
    <div className='w-[364px] overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:bg-zinc-700'>
      <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: (direction) => ({
            x: direction > 0 ? 364 : -364,
            opacity: 0,
            height: bounds.height > 0 ? bounds.height : 'auto',
            position: 'initial',
          }),
          center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : 'auto',
          },
          exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 364 : -364,
            opacity: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }),
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        custom={direction}
      >
        {FEATURES.map((feature, index) => (
          <div key={index} className='px-4 pt-4' ref={ref}>
            <h3 className='mb-0.5 font-medium text-zinc-800 dark:text-zinc-100'>
              {feature.title}
            </h3>
            <p className='text-zinc-600 dark:text-zinc-400'>
              {feature.description}
            </p>
          </div>
        ))}
      </TransitionPanel>
      <div className='flex justify-between p-4'>
        {activeIndex > 0 ? (
          <Button onClick={() => handleSetActiveIndex(activeIndex - 1)}>
            Previous
          </Button>
        ) : (
          <div />
        )}
        <Button
          onClick={() =>
            activeIndex === FEATURES.length - 1
              ? null
              : handleSetActiveIndex(activeIndex + 1)
          }
        >
          {activeIndex === FEATURES.length - 1 ? 'Close' : 'Next'}
        </Button>
      </div>
    </div>
  );
}




import { BorderTrail } from '@/components/core/border-trail';

export function BorderTrailCard1() {
  return (
    <div className='relative flex h-[200px] w-[300px] flex-col items-center justify-center rounded-md bg-zinc-200 px-5 py-2 dark:bg-zinc-800'>
      <BorderTrail
        style={{
          boxShadow:
            '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
        }}
        size={100}
      />
      <div
        className='flex h-full animate-pulse flex-col items-start justify-center space-y-2'
        role='status'
        aria-label='Loading...'
      >
        <div className='h-1 w-4 rounded-[4px] bg-zinc-600'></div>
        <div className='h-1 w-10 rounded-[4px] bg-zinc-600'></div>
        <div className='h-1 w-12 rounded-[4px] bg-zinc-600'></div>
        <div className='h-1 w-12 rounded-[4px] bg-zinc-600'></div>
        <div className='h-1 w-12 rounded-[4px] bg-zinc-600'></div>
      </div>
    </div>
  );
}
