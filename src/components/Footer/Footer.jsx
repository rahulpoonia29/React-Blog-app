import { Link } from "react-router-dom";

export default function Component() {
	const socials = [
		{ icon: LinkedInIcon, label: "LinkedIN", href: "#" },
		{ icon: GithubIcon, label: "GitHub", href: "#" },
		{ icon: TwitterIcon, label: "Twitter", href: "#" },
	];
	return (
		<footer className="dark bg-white  py-6">
			<div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
				<div className="text-center md:text-left mb-6 md:mb-0">
					<p className="text-lg">
						Made with ❤ by{" "}
						<Link className="text-blue-700" href="">
							Rahul
						</Link>
					</p>
				</div>

				<div className="flex items-center justify-center space-x-4">
					{socials.map((item, index) => (
						<Link
							key={index}
							className="hover:text-gray-600 transition-colors"
							href={item.href}
						>
							<item.icon className="h-6 w-6" />
							<span className="sr-only">{item.label}</span>
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}

function GithubIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.086-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.067 1.832 2.8 1.302 3.487.996.108-.775.417-1.302.762-1.602-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.874.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.625-5.475 5.921.43.372.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.217.694.825.576 4.765-1.589 8.198-6.084 8.198-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
	);
}

function TwitterIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.896-.957-2.173-1.555-3.586-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.425.722-.667 1.561-.667 2.457 0 1.695.863 3.191 2.175 4.068-.801-.026-1.555-.247-2.213-.616v.061c0 2.366 1.684 4.342 3.918 4.787-.41.111-.843.171-1.288.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.418-1.68 1.319-3.809 2.107-6.102 2.107-.39 0-.773-.023-1.152-.067 2.188 1.402 4.768 2.22 7.548 2.22 9.051 0 13.998-7.496 13.998-13.986 0-.21-.004-.423-.014-.633.961-.695 1.8-1.56 2.457-2.548l-.047-.02z" />
		</svg>
	);
}

function LinkedInIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-10h3v10zm-1.5-11.269c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.269h-3v-5.448c0-3.209-4-2.969-4 0v5.448h-3v-10h3v1.528c1.396-2.586 7-2.777 7 2.472v6z" />
		</svg>
	);
}
