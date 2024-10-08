"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeRaw from "rehype-raw";
import { type PluggableList } from "node_modules/react-markdown/lib";
import Link from "next/link";

const components = {
	img({ alt = "", src = "", ...props }: { alt?: string; src?: string }) {
		return <img className="w-full" {...props} src={src} alt={alt} />;
	},
	a({ href, ...props }: { href?: string; children?: React.ReactNode }) {
		return (
			<Link href={href ?? "/"} {...props}>
				{props.children}
			</Link>
		);
	},
};

export function Mdx({ content }: { content: string }) {
	return (
		// <article className="prose prose-lg prose-headings:text-gray-900 prose-p:leading-normal prose-a:font-medium prose-a:text-teal-500 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-teal-500 prose-blockquote:pl-4 prose-blockquote:font-normal prose-blockquote:italic prose-blockquote:text-inherit prose-strong:font-medium prose-strong:text-gray-900 dark:prose-headings:text-gray-100 dark:prose-blockquote:border-gray-400 dark:prose-strong:text-gray-100 max-w-none text-lg text-gray-600 dark:text-gray-400">
		<article className="mdx prose mx-auto overflow-y-hidden p-2 text-left leading-normal dark:prose-invert prose-h1:text-2xl prose-a:text-blue-600 prose-a:underline prose-td:border-2 prose-td:border-gray-500 prose-td:p-2 prose-img:mx-auto prose-img:my-0 prose-img:w-3/4 dark:prose-td:border-white">
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkUnwrapImages] as PluggableList}
				rehypePlugins={[rehypeRaw]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
}
