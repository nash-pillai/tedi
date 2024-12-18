import { type Metadata } from "next";
import { env } from "@/env";
import { getCldOgImageUrl } from "next-cloudinary";
import { CloudinaryClientWrapper } from "@/components/cloudinaryClientWrapper";
import Link from "next/link";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Toolkits",
	description: "Our advocacy toolkits.",
	alternates: { canonical: `${env.URL}/toolkit` },
	openGraph: {
		siteName: "The Environmental Defense Initiative",
		url: `${env.URL}/toolkit`,
		title: "Toolkit - TEDI",
		type: "website",
		description: "Our advocacy toolkits.",
		images: {
			url: getCldOgImageUrl({ src: "nature/tallForest" }),
			width: 1200,
			height: 627,
			alt: "An image of the Redwood Forest",
		},
	},
};

export default async function Toolkit() {
	const session = await auth();
	if (!session) redirect("/signin");

	return (
		<>
			<div>
				<section className="mx-auto my-8 max-w-6xl">
					<div className="mx-auto my-8 max-w-[50vw] justify-center rounded-xl bg-stone-100 py-5 dark:bg-stone-800">
						<h2 className="py-5 text-center text-6xl font-semibold text-green-500">Toolkits</h2>
						<p className="text-center text-3xl font-medium">Now it’s your turn to take action!</p>
					</div>
					<div className="mx-auto w-full justify-center">
						<h3 className="text-center text-lg font-medium">
							Our campaign team works to develop toolkits for our members to use to start environmental initiatives in
							their communities as easily as possible. We make taking action simple, stress-free, and fun! Toolkits are
							meant to be a starting point for TEDI members looking to plan an action.
							<br />
							<br />
							If your group has special circumstances or you need additional guidance on planning your action,{" "}
							<Link
								href="mailto:environmentaldefenseinitiative@gmail.com?subject=Member Initiative Guidance"
								className="text-purple-500"
							>
								contact us
							</Link>{" "}
							today to receive 1:1 guidance from a member of our campaign team!
						</h3>
					</div>
				</section>
			</div>
			<div className="w-full bg-stone-100 px-8 py-10 dark:bg-stone-800">
				<section className="mx-auto mt-8 max-w-7xl">
					<div className="flex flex-col-reverse gap-8 sm:flex-row">
						<div>
							<CloudinaryClientWrapper
								className="max-h-[80vh] w-fit rounded-xl"
								src="toolkit/cleanup"
								alt="The toolkit for the cleanup campaign"
								width={1080}
								height={2160}
							/>
						</div>
						<div className="w-4/5 px-10">
							<h1 className="mt-2 w-full text-wrap text-6xl font-bold text-green-500">The Cleanup Campaign</h1>
							<hr className="mt-5 w-3/4 border-green-500" />
							<p className="my-10 text-xl">
								<span className="text-lg">
									Have you always wanted to plan a community cleanup but don’t know how? <br />
									This is the toolkit for you!
								</span>
								<br />
								<br />
								Our cleanup toolkit contains{" "}
								<span className="text-blue-600 dark:text-blue-400">every resource you could possibly need</span> to plan
								and host a successful cleanup including how to choose a date/location, information about obtaining
								permits, volunteer recruitment strategies, and email templates that you can use to{" "}
								<span className="text-blue-600 dark:text-blue-400">contact park/town directors</span> about land use.
							</p>
							<div className="flex">
								<Link
									className="rounded-lg bg-green-500 px-5 py-3 text-center duration-300 hover:scale-110 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700"
									href={`https://drive.google.com/file/d/1GubFFA0y5VRbpw8dsYmieU9Wx3RBjiHp/view`}
									target="_blank"
								>
									Download
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="w-full px-8 py-10">
				<section className="mx-auto mt-8 max-w-7xl">
					<div className="flex flex-col-reverse gap-8 sm:flex-row">
						<div>
							<CloudinaryClientWrapper
								className="max-h-[80vh] w-fit rounded-xl"
								src="toolkit/eypvgy8fndoyfhwjapjn"
								alt="The toolkit for the cleanup campaign"
								width={1080}
								height={2160}
							/>
						</div>
						<div className="w-4/5 px-10">
							<h1 className="mt-2 w-full text-wrap text-6xl font-bold text-green-500">The Clothing Drive Toolkit</h1>
							<hr className="mt-5 w-3/4 border-green-500" />
							<p className="my-10 text-xl">
								<span className="text-lg">
									Ready to make a difference in your community with a clothing drive but unsure where to start? <br />
									This toolkit is filled with resources to help you make a positive impact in your community!
								</span>
								<br />
								<br />
								This toolkit is filled with everything you need to{" "}
								<span className="text-blue-600 dark:text-blue-400">successfully organize</span> and execute a clothing
								drive, whether independently or in partnership with an organization. It includes detailed instructions
								on setting up your drive, tips for coordinating with local groups, and{" "}
								<span className="text-blue-600 dark:text-blue-400">essential information</span> on obtaining permissions
								to place donation bins. Plus, you’ll find{" "}
								<span className="text-blue-600 dark:text-blue-400">email templates</span> for requesting approval and{" "}
								<span className="text-blue-600 dark:text-blue-400">sample flyers</span> to help promote your drive.
							</p>
							<div className="flex">
								<Link
									className="rounded-lg bg-green-500 px-5 py-3 text-center duration-300 hover:scale-110 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700"
									href={`https://drive.google.com/file/d/1AZ0b0a1lAFLh9--MTi_4799lvlwKkv8Z/view`}
									target="_blank"
								>
									Download
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="w-full bg-stone-100 px-8 py-10 dark:bg-stone-800">
				<section className="mx-auto mt-8 max-w-7xl">
					<div className="flex flex-col-reverse gap-8 sm:flex-row">
						<div>
							<CloudinaryClientWrapper
								className="max-h-[80vh] w-fit rounded-xl"
								src="toolkit/catzc1tx5w9rfkrri1pe"
								alt="The toolkit for the cleanup campaign"
								width={1080}
								height={2160}
							/>
						</div>
						<div className="w-4/5 px-10">
							<h1 className="mt-2 w-full text-wrap text-6xl font-bold text-green-500">
								The Sustainable Crafts Toolkit
							</h1>
							<hr className="mt-5 w-3/4 border-green-500" />
							<p className="my-10 text-xl">
								<span className="text-lg">
									Are you an environmentally conscious arts and crafts person? <br />
									Learn about some cool sustainable crafts here!
								</span>
								<br />
								<br />
								Unlock your creativity with our{" "}
								<span className="text-blue-600 dark:text-blue-400">sustainable crafts</span> toolkit! Designed for
								children of all ages, this kit offers{" "}
								<span className="text-blue-600 dark:text-blue-400">quick and easy sustainable crafts</span> that teach
								kids the importance of environmental stewardship. Each project is{" "}
								<span className="text-blue-600 dark:text-blue-400">
									fun, educational, and crafted from eco-friendly materials
								</span>
								, making it simple for children to learn about sustainability while making unique, earth-friendly
								creations!
							</p>
							<div className="flex">
								<Link
									className="rounded-lg bg-green-500 px-5 py-3 text-center duration-300 hover:scale-110 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700"
									href={`https://drive.google.com/file/d/1DpIbTigVz11Pd0VQx9y1ccyjOMHD6feH/view?usp=sharing`}
									target="_blank"
								>
									Download
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="w-full px-8 py-10">
				<section className="mx-auto mt-8 max-w-7xl">
					<div className="flex flex-col-reverse gap-8 sm:flex-row">
						<div>
							<CloudinaryClientWrapper
								className="max-h-[80vh] w-fit rounded-xl"
								src="toolkit/mypiky7xtlgv6jrx398a"
								alt="The toolkit for the cleanup campaign"
								width={1080}
								height={2160}
							/>
						</div>
						<div className="w-4/5 px-10">
							<h1 className="mt-2 w-full text-wrap text-6xl font-bold text-green-500">
								Engaging Kids in Environmental Awareness
							</h1>
							<hr className="mt-5 w-3/4 border-green-500" />
							<p className="my-10 text-xl">
								<span className="text-lg">
									Interested in spreading environmental awareness to a younger audience? <br />
									Our toolkit is can help you engage kids and teach them about the environment!
								</span>
								<br />
								<br />
								Empower the next generation with our{" "}
								<span className="text-blue-600 dark:text-blue-400">Engaging Kids in Environmental Awareness</span>{" "}
								toolkit! This comprehensive resource equips educators and parents with{" "}
								<span className="text-blue-600 dark:text-blue-400">
									engaging games, interactive lessons, and hands-on activities
								</span>{" "}
								designed to teach children of all ages the fundamentals of environmental stewardship. From fun,
								age-appropriate projects to insightful discussions, this toolkit makes it easy to introduce kids to the
								essentials of <span className="text-blue-600 dark:text-blue-400">caring for our planet</span> while
								sparking their curiosity and passion for a{" "}
								<span className="text-blue-600 dark:text-blue-400">sustainable future</span>.
							</p>
							<div className="flex">
								<Link
									className="rounded-lg bg-green-500 px-5 py-3 text-center duration-300 hover:scale-110 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700"
									href={`/files/toolkit/kids.pdf`}
									target="_blank"
								>
									Download
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
