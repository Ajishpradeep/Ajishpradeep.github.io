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

import Features2 from ".";


export default function Feature2Demo() {
  return <Features2 />;
}


index.tsx
'use client';

import { Card, CardContent } from '@/components/base-ui/card';
import { Button } from '@/components/base-ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base-ui/accordion';

export default function Features2() {
  return (
    <section className="theme-injected bg-background w-full py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="text-muted-foreground bg-muted/50 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-sm">
            <span className="bg-primary h-2 w-2 rounded-full" />
            Smart insights
          </div>

          <h2 className="text-5xl leading-tight font-semibold tracking-tight">
            Turn raw data into clear decisions
          </h2>

          <p className="text-muted-foreground max-w-lg">
            Analyze patterns, track performance, and uncover actionable insights
            to make faster and smarter decisions with confidence.
          </p>

          <div className="flex gap-2">
            <Accordion type="single" collapsible className="flex gap-2">
              <AccordionItem
                value="item-1"
                className="bg-muted/50 rounded-lg border-none! px-4"
              >
                <AccordionTrigger className="text-sm hover:no-underline">
                  What insights can I track?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-3 text-sm">
                  Track productivity trends, focus time, collaboration patterns,
                  and performance metrics to understand how work actually
                  happens across your team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-muted/50 border-b-none flex-1 rounded-lg px-4"
              >
                <AccordionTrigger className="text-sm hover:no-underline">
                  Does it work in real-time?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-3 text-sm">
                  Yes, all insights are updated in real-time, giving you instant
                  visibility into activity, performance changes, and emerging
                  patterns as they happen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Button className="rounded-sm px-6 shadow-[inset_0_0px_2px_0px_rgba(0,0,0,0.1),inset_0_0px_4px_0px_rgba(0,0,0,0.1)]">
            Get started
          </Button>
        </div>

        <div className="bg-muted dark:bg-card/50 relative flex justify-center rounded-xl p-8 shadow-[inset_0_0px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0px_4px_0px_rgba(0,0,0,1)]">
          <div className="relative h-[380px] w-full max-w-md">
            <Card className="bg-background/80 dark:bg-card/80 ring-border/50 absolute top-0 left-0 w-[260px] rounded-lg p-0 shadow-md backdrop-blur-md">
              <CardContent className="space-y-2 p-4">
                <div className="text-muted-foreground text-xs">
                  Performance Overview
                </div>

                <div className="text-2xl font-semibold">
                  72<span className="text-muted-foreground text-sm">%</span>
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-200 px-2 py-0.5 text-green-700">
                    Improving
                  </span>
                  <span className="rounded-md bg-blue-200 px-2 py-0.5 text-blue-700">
                    Stable
                  </span>
                </div>

                <div className="text-muted-foreground space-y-1 text-xs">
                  <div>Tasks Completed: 124</div>
                  <div>Avg Focus Time: 3.2h</div>
                  <div>Efficiency: +12%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 absolute top-28 right-0 z-50 w-[240px] rounded-lg p-0 shadow-lg backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="text-muted-foreground text-xs">
                  Activity Breakdown
                </div>

                <div className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    6h 45m tracked
                  </span>{' '}
                  today
                </div>

                <div className="flex h-2 w-full gap-1">
                  <div className="w-[40%] rounded-full bg-emerald-400" />
                  <div className="w-[35%] rounded-full bg-blue-400" />
                  <div className="w-[25%] rounded-full bg-orange-400" />
                </div>

                <div className="text-muted-foreground flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Deep Work
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    Collaboration
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    Breaks
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 absolute bottom-8 left-10 w-[260px] rounded-lg p-0 shadow-lg backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Insights Summary</span>
                  <span className="text-muted-foreground text-xs">Updated</span>
                </div>

                <div className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    +18% productivity
                  </span>{' '}
                  this week
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-200 px-2 py-0.5 text-green-700">
                    Growth
                  </span>
                  <span className="rounded-md bg-purple-200 px-2 py-0.5 text-purple-700">
                    Optimized
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
```



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