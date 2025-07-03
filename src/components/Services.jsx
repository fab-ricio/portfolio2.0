import React from 'react';
import ServicesDropdown from './ServicesDropdown';
import services from './servicesList';
import { t } from '../i18n';

const Services = ({ language }) => {
	const [selectedService, setSelectedService] = React.useState(null);
	const [proposedPrice, setProposedPrice] = React.useState('');
	const [submitted, setSubmitted] = React.useState(false);
	const [dropdownOpen, setDropdownOpen] = React.useState(false);
	const dropdownRef = React.useRef();

	React.useEffect(() => {
		// Synchronisation par id pour garantir la référence locale
		function syncFromStorage() {
			const stored = localStorage.getItem('selectedService');
			if (stored) {
				try {
					const storedService = JSON.parse(stored);
					if (storedService && storedService.id) {
						const found = services.find(s => s.id === storedService.id);
						if (found) {
							setSelectedService(found);
							setProposedPrice('');
							setSubmitted(false);
						}
					}
				} catch {
					// fallback: rien
				}
				localStorage.removeItem('selectedService');
				// window.scrollTo({ top: 0, behavior: 'smooth' }); // supprimé pour éviter le retour en haut
			}
		}

		syncFromStorage();

		// Ajout : écouteur hashchange et focus pour synchroniser même après navigation ou retour
		function onHashOrFocus() {
			syncFromStorage();
		}
		window.addEventListener('hashchange', onHashOrFocus);
		window.addEventListener('focus', onHashOrFocus);

		// Ajout : permet au header de déclencher la sélection immédiate
		window.setSelectedServiceFromHeader = (service) => {
			const found = services.find(s => s.id === service.id);
			if (found) {
				setSelectedService(found);
				setProposedPrice('');
				setSubmitted(false);
			}
		};

		return () => {
			window.removeEventListener('hashchange', onHashOrFocus);
			window.removeEventListener('focus', onHashOrFocus);
			delete window.setSelectedServiceFromHeader;
		};
	}, []);

	// Gestion du clic en dehors pour fermer le dropdown
	React.useEffect(() => {
		if (!dropdownOpen) return;
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [dropdownOpen]);

	const handleDropdownToggle = () => {
		setDropdownOpen((open) => !open);
	};

	const handleServiceSelect = (service) => {
		localStorage.setItem('selectedService', JSON.stringify(service));
		window.location.hash = '#services';
		const section = document.getElementById('services');
		if (section) section.scrollIntoView({ behavior: 'smooth' });
		setSelectedService(service);
		setProposedPrice('');
		setSubmitted(false);
		setDropdownOpen(false);
	};

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
				{t(language, 'choose_service')}
			</h2>
			<div ref={dropdownRef}>
				<ServicesDropdown
					services={services}
					onSelect={handleServiceSelect}
					dropdownOpen={dropdownOpen}
					onToggle={handleDropdownToggle}
					language={language}
				/>
			</div>
			{/* Affiche le formulaire uniquement si un service est sélectionné et que submitted est false */}
			{selectedService && !submitted ? (
				<form onSubmit={handleSubmit} className="mt-8 p-4 bg-white/10 rounded-lg border border-white/10 max-w-lg w-full flex flex-col items-center gap-4">
					<div className="text-lg font-semibold mb-2 text-white">
						{t(language, selectedService.title) || selectedService.title}
					</div>
					<div className="text-gray-200 mb-4 text-center">
						{t(language, selectedService.description) || selectedService.description}
					</div>
					<input
						type="number"
						min="0"
						step="1"
						placeholder={t(language, 'Votre proposition de prix (€)') || 'Votre proposition de prix (€)'}
						className="px-4 py-2 rounded-md bg-zinc-900/80 border border-white/20 text-white w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
						value={proposedPrice}
						onChange={e => setProposedPrice(e.target.value)}
						required
					/>
					<button type="submit" className="mt-2 px-6 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition">
						{t(language, 'Valider') || 'Valider'}
					</button>
				</form>
			) : null}
			{/* Affiche le message de confirmation uniquement après soumission, sinon rien */}
			{submitted && selectedService ? (
				<div className="mt-8 p-4 bg-green-700/80 rounded-lg border border-green-400 max-w-lg w-full text-center text-white">
					{t(language, 'Merci pour votre demande concernant') || 'Merci pour votre demande concernant'} <span className="font-semibold">{t(language, selectedService.title) || selectedService.title}</span> !<br />
					{t(language, 'Proposition de prix') || 'Proposition de prix'} : <span className="font-semibold">{proposedPrice} €</span>
				</div>
			) : null}
		</section>
	);
};

export default Services;
