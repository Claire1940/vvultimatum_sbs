"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, CircleHelp, Code2, Compass, Flame, Map, Shield, Skull, Swords, Trophy, Users, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrailerButton, localizeHref } from "@/components/site";
import en from "@/locales/en.json";

type Home = typeof en.home;

const icons = [BookOpen, Shield, Compass, Boxes, Flame, Code2, Swords, Map, Users, Trophy, Skull, Zap, CircleHelp];

export default function HomePageClient({ home, locale }: { home: Home; locale: string }) {
  const YOUTUBE_VIDEO_ID = "zpvGp5kOg18";
  return (
    <div className="space-y-16">
      <section className="text-center">
        <div className="mx-auto mb-5 flex items-center justify-center gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">{home.hero.title}</h1>
          <span className="mt-2 inline-flex items-center rounded-md border border-[hsl(var(--nav-theme))] bg-[hsl(var(--nav-theme))] px-2.5 py-0.5 text-xs font-semibold text-primary-foreground sm:-translate-y-1.5">{home.hero.eyebrow}</span>
        </div>
        <div className="mx-auto mt-5 max-w-2xl">
          <TrailerButton videoId={YOUTUBE_VIDEO_ID} />
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{home.hero.description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">{home.hero.stats.map((stat) => <span key={stat} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{stat}</span>)}</div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3"><Button asChild size="lg"><Link href={localizeHref("/beginner-guide", locale)}>{home.hero.primaryCta}</Link></Button><Button asChild size="lg" variant="outline"><Link href={localizeHref("/races/best-race", locale)}>{home.hero.secondaryCta}</Link></Button><Button asChild size="lg" variant="ghost"><Link href={localizeHref("/codes", locale)}>{home.hero.tertiaryCta}</Link></Button></div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-border bg-card/70 p-5"><h2 className="mb-4 text-xl font-bold">{home.updates.title}</h2><div className="space-y-3">{home.updates.items.map((item) => <Link key={item.title} href={localizeHref(item.href, locale)} className="block rounded-xl border border-border bg-background p-4 transition hover:border-[hsl(var(--nav-theme-light))]"><div className="mb-2 flex items-center justify-between"><Badge className="bg-[hsl(var(--nav-theme))] text-primary-foreground">{item.type}</Badge><span className="text-xs text-muted-foreground">{item.date}</span></div><p className="font-semibold text-foreground">{item.title}</p></Link>)}</div><Button asChild className="mt-5 w-full" variant="outline"><Link href={localizeHref("/updates", locale)}>{home.updates.browse}</Link></Button></Card>
        <div><p className="text-sm font-semibold text-[hsl(var(--nav-theme))]">{home.start.eyebrow}</p><h2 className="mt-1 text-3xl font-bold tracking-tight">{home.start.title}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{home.start.cards.map((card) => <Link key={card.number} href={localizeHref(card.href, locale)} className="rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-0.5 hover:border-[hsl(var(--nav-theme-light))]"><span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--nav-theme))] text-sm font-bold text-primary-foreground">{card.number}</span><h3 className="mt-4 font-bold text-foreground">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p></Link>)}</div></div>
      </section>

      <section><p className="text-sm font-semibold text-[hsl(var(--nav-theme))]">{home.popular.eyebrow}</p><h2 className="mt-1 text-3xl font-bold tracking-tight">{home.popular.title}</h2><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{home.popular.cards.map((card, index) => { const Icon = icons[index % icons.length]; return <Link key={card.title} href={localizeHref(card.href, locale)} className="group rounded-2xl border border-border bg-card/70 p-5 transition hover:border-[hsl(var(--nav-theme-light))]"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-[hsl(var(--nav-theme))]"><Icon className="h-5 w-5" /></span><Badge variant="secondary">{card.badge}</Badge></div><h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-[hsl(var(--nav-theme))]">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p></Link>; })}</div><div className="mt-6 flex flex-wrap gap-2">{home.popular.quickLinks.map((link) => <Badge key={link} variant="outline" className="border-border px-3 py-1 text-muted-foreground">{link}</Badge>)}</div></section>

      <section className="grid gap-8 rounded-3xl border border-border bg-card/60 p-6 lg:grid-cols-[1.1fr_0.9fr]"><div><h2 className="text-3xl font-bold tracking-tight">{home.aboutGame.title}</h2>{home.aboutGame.paragraphs.map((p) => <p key={p} className="mt-5 leading-8 text-muted-foreground">{p}</p>)}<Button asChild className="mt-6"><Link href={localizeHref("/beginner-guide", locale)}>{home.aboutGame.cta}</Link></Button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">{home.aboutGame.stats.map((stat) => <div key={stat.label} className="rounded-2xl border border-border bg-background p-4"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p><p className="mt-2 text-xl font-bold text-foreground">{stat.value}</p></div>)}</div></section>

      <section><h2 className="text-3xl font-bold tracking-tight">{home.explore.title}</h2><p className="mt-2 text-muted-foreground">{home.explore.description}</p><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{home.explore.cards.map((card, index) => { const Icon = icons[(index + 3) % icons.length]; return <Link key={card.title} href={localizeHref(card.href, locale)} className="rounded-2xl border border-border bg-card/70 p-5 transition hover:border-[hsl(var(--nav-theme-light))]"><Icon className="h-5 w-5 text-[hsl(var(--nav-theme))]" /><h3 className="mt-4 font-bold text-foreground">{card.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p></Link>; })}</div></section>

      <section><h2 className="text-3xl font-bold tracking-tight">{home.faq.title}</h2><p className="mt-2 text-muted-foreground">{home.faq.description}</p><Accordion type="single" collapsible className="mt-6 rounded-2xl border border-border bg-card/70 px-5">{home.faq.items.map((item, index) => <AccordionItem key={item.question} value={`item-${index}`}><AccordionTrigger className="text-left text-foreground">{item.question}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}</Accordion></section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-muted to-card p-8 text-center"><h2 className="text-3xl font-bold tracking-tight">{home.finalCta.title}</h2><p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{home.finalCta.description}</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Button asChild size="lg"><Link href={localizeHref("/beginner-guide", locale)}>{home.finalCta.primary}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline"><Link href="https://www.roblox.com/games/6270290407/VV-ULTIMATUM">{home.finalCta.secondary}</Link></Button></div></section>
    </div>
  );
}
