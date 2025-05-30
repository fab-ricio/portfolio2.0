import React from "react";

const ServicesDropdown = ({ services, onSelect }) => {
	return (
		<div className="relative group inline-block text-left">
			<button className="px-4 py-2 rounded-md bg-white/10 text-white font-semibold hover:bg-white/20 transition duration-200">
				Services
				<svg
					className="inline ml-2 w-4 h-4"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			<div className="absolute left-0 mt-2 w-64 bg-zinc-900/95 border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
				<ul className="py-2">
					{services.map((service) => {
						const localService = services.find((s) => s.id === service.id);
						return (
							<li
								key={service.id}
								className="px-4 py-3 hover:bg-white/10 cursor-pointer transition rounded-md"
								onClick={() => onSelect && onSelect(localService)}
							>
								<div className="font-semibold text-sm mb-1 text-white">
									{service.title}
								</div>
								<div className="text-xs text-gray-300 leading-tight">
									{service.description}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ServicesDropdown;
