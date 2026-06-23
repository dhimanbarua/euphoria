import { useState } from '@wordpress/element';

const SectionCard = ( { title, children, defaultOpen = true } ) => {
	const [ isOpen, setIsOpen ] = useState( defaultOpen );

	return (
		<section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
			<button
				type="button"
				onClick={ () => setIsOpen( ! isOpen ) }
				className="flex w-full items-center justify-between px-5 py-4 text-left"
			>
				<h3 className="text-sm font-semibold text-gray-900">{ title }</h3>
				<span className="text-gray-400">{ isOpen ? '▾' : '▸' }</span>
			</button>
			{ isOpen && (
				<div className="space-y-4 border-t border-gray-100 px-5 py-4">
					{ children }
				</div>
			) }
		</section>
	);
};

export default SectionCard;
