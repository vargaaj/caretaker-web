import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import {Link} from "@nextui-org/link";


export default async function Home() {
	return (
		<section className="flex flex-col items-center justify-center mt-20 gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={`${title({ color: "blue" })} border-b-4 border-blue-500`}>
					Caretaker&nbsp;
				</h1>
				<br />
				<br />
				<h1 className={title({size: "sm"})}>
					Manage your daycare with ease
				</h1>
				
			</div>

			

			<div className="mt-4">
				<Link href="/register">
					<Button className="m-2" color="primary" size="lg"> Register </Button>
				</Link>
				
				<Link href='/login'>
					<Button color="primary" size="lg">Login</Button>
				</Link>
			</div>
		</section>
	);
}
