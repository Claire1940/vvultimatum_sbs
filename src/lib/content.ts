import fs from "fs";
import path from "path";
import { CONTENT_TYPES as CONFIG_CONTENT_TYPES } from "@/config/navigation";
import { routing, type Locale } from "@/i18n/routing";

// 从统一配置导入内容类型
export const CONTENT_TYPES = CONFIG_CONTENT_TYPES;

/**
 * 将文件名转换为 URL-safe slug
 * 所有非字母数字连字符下划线的字符（冒号、问号、井号、空格等）替换为 -
 * 合并连续的 -，去掉首尾 -
 */
export function fileNameToSlug(fileName: string): string {
  return fileName
    .replace(/\.mdx$/, "")
    .replace(/[^a-zA-Z0-9\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * 根据 slug 在目录中反查真实文件名（不含 .mdx）
 * 例如 slug="gelum-boss" → 返回 "gelum:boss"
 */
export function findFileBySlug(dir: string, slug: string, basePath: string[] = []): string | null {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = findFileBySlug(fullPath, slug, [...basePath, entry.name]);
      if (result) return result;
    } else if (entry.name.endsWith(".mdx")) {
      const fileName = entry.name.replace(".mdx", "");
      const entrySlug = [...basePath, fileNameToSlug(fileName)].join("/");
      if (entrySlug === slug) {
        return [...basePath, fileName].join("/");
      }
    }
  }
  return null;
}

// 通用 Metadata 接口（与 MDX 文件 export const metadata 对应）
export interface ContentMetadata {
  title: string;
  description: string;
  category: string;
  date: string;
  lastModified?: string;
  image?: string;
  badge?: string;
  summary?: string;
}

// Heading 结构（从 MDX 源文件提取）
export interface Heading {
  id: string;
  text: string;
  level: number;
}

// 内容项接口
export interface ContentItem {
  slug: string;
  segments: string[];
  contentType: string;
  locale: Locale;
  metadata: ContentMetadata;
}

// 内容数据接口（含 MDX 组件）
export type ContentData = {
  slug: string;
  segments: string[];
  contentType: string;
  locale: Locale;
  metadata: ContentMetadata;
  MDXContent: React.ComponentType;
  headings: Heading[];
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * 从 MDX 源文件中提取 ## 和 ### 标题
 */
function extractHeadings(mdxSource: string): Heading[] {
  const headings: Heading[] = [];
  const lines = mdxSource.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\{[^}]*\}/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

/**
 * 读取 MDX 源文件并提取 headings
 */
function getHeadingsFromFile(filePath: string): Heading[] {
  try {
    const source = fs.readFileSync(filePath, "utf-8");
    return extractHeadings(source);
  } catch {
    return [];
  }
}

/**
 * 辅助函数：递归获取目录下所有 MDX 文件的 slug 路径
 */
function getSlugsFromDirectory(dir: string, basePath: string[] = []): string[][] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const paths: string[][] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...getSlugsFromDirectory(fullPath, [...basePath, entry.name]));
    } else if (entry.name.endsWith(".mdx")) {
      const fileName = entry.name.replace(".mdx", "");
      paths.push([...basePath, fileNameToSlug(fileName)]);
    }
  }
  return paths;
}

/**
 * 获取所有内容列表（支持递归读取嵌套目录）
 * 使用动态 import 获取 MDX 文件的 metadata
 */
export async function getAllContent(contentType: string, language: Locale): Promise<ContentItem[]> {
  const contentDir = path.join(CONTENT_ROOT, language, contentType);
  const slugPaths = getSlugsFromDirectory(contentDir);

  const items = await Promise.all(
    slugPaths.map(async (segments) => {
      const slug = segments.join("/");
      try {
        const realSlug = findFileBySlug(contentDir, slug) || slug;
        const mod = await import(`../../content/${language}/${contentType}/${realSlug}.mdx`);
        return {
          slug,
          segments,
          contentType,
          locale: language,
          metadata: mod.metadata as ContentMetadata,
        } satisfies ContentItem;
      } catch {
        return null;
      }
    }),
  );

  return items
    .filter((item): item is ContentItem => Boolean(item))
    .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
}

/**
 * 获取单个内容项（含 MDX 渲染后的内容组件）
 * 使用动态 import 直接导入 .mdx 文件
 */
export async function getContent(contentType: string, slugSegments: string[], language: Locale): Promise<ContentData | null> {
  const currentSlug = slugSegments.join("/");
  const contentDir = path.join(CONTENT_ROOT, language, contentType);

  try {
    const realSlug = findFileBySlug(contentDir, currentSlug) || currentSlug;
    const mdxPath = path.join(contentDir, `${realSlug}.mdx`);
    const { default: MDXContent, metadata } = await import(
      `../../content/${language}/${contentType}/${realSlug}.mdx`
    );

    return {
      slug: currentSlug,
      segments: slugSegments,
      contentType,
      locale: language,
      metadata: metadata as ContentMetadata,
      MDXContent,
      headings: getHeadingsFromFile(mdxPath),
    };
  } catch {
    // Fallback 到英文
    if (language !== routing.defaultLocale) {
      try {
        const enContentDir = path.join(CONTENT_ROOT, routing.defaultLocale, contentType);
        const enRealSlug = findFileBySlug(enContentDir, currentSlug) || currentSlug;
        const enMdxPath = path.join(enContentDir, `${enRealSlug}.mdx`);
        const { default: MDXContent, metadata } = await import(
          `../../content/${routing.defaultLocale}/${contentType}/${enRealSlug}.mdx`
        );
        return {
          slug: currentSlug,
          segments: slugSegments,
          contentType,
          locale: routing.defaultLocale,
          metadata: metadata as ContentMetadata,
          MDXContent,
          headings: getHeadingsFromFile(enMdxPath),
        };
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * 获取所有内容路径（用于 generateStaticParams）
 */
export async function getAllContentPaths(language: Locale) {
  const localeDir = path.join(CONTENT_ROOT, language);
  if (!fs.existsSync(localeDir)) return [];

  const entries = fs.readdirSync(localeDir, { withFileTypes: true });
  const contentTypeDirs = entries.filter((entry) => entry.isDirectory());

  const paths = contentTypeDirs.flatMap((entry) => {
    const segments = getSlugsFromDirectory(path.join(localeDir, entry.name));
    return segments.map((slug) => ({ contentType: entry.name, slug }));
  });

  return paths;
}
