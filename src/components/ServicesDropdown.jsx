import React from "react";

const ServicesDropdown = ({ services, onSelect, dropdownOpen, onToggle }) => {
	return (
		<div className="relative inline-block text-left">
			<button
				onClick={onToggle}
				className="futuristic-pyramid-btn w-14 h-14 bg-gradient-to-br from-cyan-900 via-indigo-900 to-cyan-800 shadow-[0_4px_32px_0_rgba(0,255,255,0.18)] border-2 border-cyan-400/40 flex items-center justify-center relative overflow-hidden pyramid-shape
				transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-cyan-400/40 focus:ring-2 focus:ring-cyan-400 animate-pulse"
				title="Afficher les services"
			>
				<span className="absolute inset-0 bg-cyan-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl animate-pulse pointer-events-none" />
				<svg className="w-8 h-8 text-cyan-300 hover:text-cyan-400 transition-colors duration-200 drop-shadow-glow relative z-10"
					viewBox="0 0 32 32" fill="none">
					<polygon points="16,4 28,28 4,28" fill="#0ff" fillOpacity="0.18" className="hover:animate-bounce" />
					<polygon points="16,8 24,26 8,26" fill="#0ff" fillOpacity="0.32" className="hover:animate-pulse" />
					<polygon points="16,12 20,24 12,24" fill="#0ff" fillOpacity="0.7" className="hover:animate-pulse" />
					<path d="M12 20 L16 24 L20 20" stroke="#0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="hover:animate-bounce" />
				</svg>
			</button>
			{dropdownOpen && (
				<div className="absolute left-0 mt-2 w-64 bg-zinc-900/95 border border-white/10 rounded-lg shadow-lg z-50">
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
			)}
		</div>
	);
};

export default ServicesDropdown;
