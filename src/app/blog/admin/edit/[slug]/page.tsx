"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { upsertArticle, getPost } from "@/lib/serverActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { team } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function BlogEditor({ params: { slug } }: { params: { slug: string } }) {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [content, setContent] = useState("");
	const [newSlug, setNewSlug] = useState(slug);
	const [title, setTitle] = useState("New Article");
	const [summary, setSummary] = useState("");
	const [author, setAuthor] = useState("");
	const [articleImage, setArticleImage] = useState("");
	const [isAuthorOpen, setIsAuthorOpen] = useState(false);

	const [isSaving, setIsSaving] = useState(false);

	if (status === "unauthenticated" || (session?.user && !["editor", "admin"].includes(session.user.role)))
		router.push("/unauthorized");

	useEffect(() => {
		if (slug !== "new") {
			getPost(slug)
				.then((post) => {
					if (post) {
						setTitle(post.title);
						setContent(post.content);
						setSummary(post.summary);
						setContent(post.content);
						setArticleImage(post.image);
					}
				})
				.catch(() => null);
		}
	}, [slug]);

	return (
		<div className="m-auto max-w-6xl space-y-4 p-8 pt-24">
			{/* Edit title */}
			<div>
				<label htmlFor="title" className="mb-2 block">
					Title
				</label>
				<Input id="title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			{/* URL */}
			<div className="flex flex-col gap-4 sm:flex-row">
				<div className="w-full">
					<label htmlFor="slug" className="mb-2 block">
						URL
					</label>
					<Input
						id="slug"
						type="text"
						value={newSlug}
						onChange={(e) => setNewSlug((prev) => (e.target.value.match(/^[a-z0-9-]*$/) ? e.target.value : prev))}
					/>
				</div>
				<div className="w-full">
					<label htmlFor="author" className="mb-2 block">
						Author
					</label>
					<Popover open={isAuthorOpen} onOpenChange={setIsAuthorOpen}>
						<PopoverTrigger asChild>
							<Button
								id="author"
								variant="outline"
								role="combobox"
								aria-expanded={isAuthorOpen}
								className="w-full justify-between">
								{author ? team.find((member) => member.name.toLowerCase() === author)?.name : "Select author..."}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-72 p-0">
							<Command>
								<CommandInput placeholder="Search author..." />
								<CommandEmpty>No author found.</CommandEmpty>
								<CommandGroup className="max-h-96 overflow-scroll">
									{team.map((member) => (
										<CommandItem
											key={member.name}
											value={member.name}
											onSelect={(newAuthor) => {
												setAuthor((prev) => (newAuthor === prev ? "" : newAuthor));
												setIsAuthorOpen(false);
											}}>
											<Check className={cn("mr-2 h-4 w-4", author === member.name ? "opacity-100" : "opacity-0")} />
											<CldImage
												className="mr-4 h-8 w-8 rounded-full"
												src={member.image}
												gravity="face"
												crop="thumb"
												alt={`An image of ${member.name}.`}
												height={32}
												width={32}
											/>
											{member.name}
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			{/* Summary */}
			<div>
				<label htmlFor="summary" className="mb-2 block">
					Summary
				</label>
				<Textarea id="summary" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
			</div>
			<div className="flex items-center justify-between py-4">
				<h1 className="mb-4 grow text-2xl font-bold">Edit Post</h1>
				<CldUploadButton
					className="mx-4 rounded-md border-2 border-blue-400 px-4 py-2"
					uploadPreset="TEDI Blog"
					onSuccess={(results) => {
						if (!results.info || typeof results.info === "string") return;
						setArticleImage(results.info.secure_url);
					}}>
					Upload Article Image
				</CldUploadButton>
				{articleImage && (
					<button
						className="flex space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white"
						onClick={() => window.open(articleImage)}>
						Preview article image...
					</button>
				)}
				<CldUploadButton
					className="mx-4 rounded-md border-2 border-blue-400 px-4 py-2"
					uploadPreset="TEDI Blog"
					options={{ cropping: true }}
					onSuccess={(results) => {
						if (!results.info || typeof results.info === "string") return;
						const imageMd = `![${results.info.original_filename}](${results.info.secure_url})`;
						setContent((prev) => prev + imageMd);
					}}>
					Upload Image
				</CldUploadButton>
				<button
					className="flex space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white"
					onClick={async () => {
						setIsSaving(true);
						if (newSlug && newSlug !== "new") {
							await upsertArticle(slug, { title, content, slug: newSlug, summary, author, image: articleImage });
							if (slug !== newSlug) router.push(`/blog/admin/edit/${newSlug}`);
						} else alert("Please enter a URL");
						setIsSaving(false);
					}}>
					<span>{slug === "new" ? "Create Article" : "Save Article"}</span>
					{isSaving && <Loading />}
				</button>
			</div>

			<MDEditor id="md-editor" value={content} onChange={(val) => setContent(val ?? "")} />
		</div>
	);
}
