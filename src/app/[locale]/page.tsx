import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { JsonLd, WikiSidebar } from "@/components/site";
import en from "@/locales/en.json";
import HomePageClient from "./HomePageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vvultimatum.net";

type Messages = typeof en;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  return {
    title: messages.home.meta.title,
    description: messages.home.meta.description,
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { en: "/" } },
    openGraph: { title: messages.home.meta.title, description: messages.home.meta.description, url: siteUrl, images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await getMessages({ locale })) as Messages;
  const webSite = { "@context": "https://schema.org", "@type": "WebSite", name: "VV Ultimatum Wiki", url: siteUrl, description: messages.home.meta.description };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={webSite} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <HomePageClient home={messages.home} locale={locale} />
        <WikiSidebar locale={locale} />
      </div>
    </main>
  );
}
