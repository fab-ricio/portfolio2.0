import React from 'react';
import { motion } from 'framer-motion';
import ServicesDropdown from './ServicesDropdown';
import services from './servicesList';

const Services = () => {
	const [selectedService, setSelectedService] = React.useState(null);
	const [proposedPrice, setProposedPrice] = React.useState('');
	const [submitted, setSubmitted] = React.useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<section
			id="services"
			className="w-full py-8 sm:py-12 md:py-20 px-2 sm:px-4 md:px-8 bg-transparent text-white flex flex-col items-center"
		>
			<h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10 text-center">
				Choisissez un service
			</h2>
			<ServicesDropdown services={services} onSelect={(service) => { setSelectedService(service); setSubmitted(false); }} />
			{selectedService && !submitted && (
				<form onSubmit={handleSubmit} className="mt-8 p-4 bg-white/10 rounded-lg border border-white/10 max-w-lg w-full flex flex-col items-center gap-4">
					<div className="text-lg font-semibold mb-2 text-white">
						{selectedService.title}
					</div>
					<div className="text-gray-200 mb-4 text-center">
						{selectedService.description}
					</div>
					<input
						type="number"
						min="0"
						step="1"
						placeholder="Votre proposition de prix (€)"
						className="px-4 py-2 rounded-md bg-zinc-900/80 border border-white/20 text-white w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
						value={proposedPrice}
						onChange={e => setProposedPrice(e.target.value)}
						required
					/>
					<button type="submit" className="mt-2 px-6 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition">
						Valider
					</button>
				</form>
			)}
			{submitted && (
				<div className="mt-8 p-4 bg-green-700/80 rounded-lg border border-green-400 max-w-lg w-full text-center text-white">
					Merci pour votre demande concernant <span className="font-semibold">{selectedService.title}</span> !<br />
					Proposition de prix : <span className="font-semibold">{proposedPrice} €</span>
				</div>
			)}
		</section>
	);
};

export default Services;
