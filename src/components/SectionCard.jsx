import { useState } from '@wordpress/element';

/**
 * SectionCard
 *
 * Collapsible card wrapper for grouped settings fields.
 *
 * When `disabled` is true:
 * - A notice banner is shown below the header.
 * - Child fields are visually dimmed and pointer events are blocked,
 *   keeping values visible but preventing interaction.
 * - The collapse toggle still works so the section remains inspectable.
 *
 * @param {{
 *   title:       string,
 *   children:    React.ReactNode,
 *   disabled?:   boolean,
 *   defaultOpen?: boolean,
 * }} props
 * @return {JSX.Element}
 */
const SectionCard = ( { title, children, disabled = false, defaultOpen = true } ) => {
	const [ isOpen, setIsOpen ] = useState( defaultOpen );

	return (
		<section
			className={ `overflow-hidden rounded-xl border bg-white transition ${ disabled ? 'border-gray-200 opacity-70' : 'border-gray-200' }` }
		>
			{ /* Header / toggle */ }
			<button
				type="button"
				onClick={ () => setIsOpen( ! isOpen ) }
				className="flex w-full items-center justify-between px-5 py-4 text-left"
			>
				<h3 className={ `text-sm font-semibold ${ disabled ? 'text-gray-400' : 'text-gray-900' }` }>
					{ title }
				</h3>
				<span className="text-gray-400">{ isOpen ? '▾' : '▸' }</span>
			</button>

			{ isOpen && (
				<div className="border-t border-gray-100">
					{ /* Disabled notice banner */ }
					{ disabled && (
						<div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50 px-5 py-2.5">
							<svg
								className="h-4 w-4 shrink-0 text-amber-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
									clipRule="evenodd"
								/>
							</svg>
							<p className="text-xs font-medium text-amber-700">
								Enable Email Reminder to configure these settings.
							</p>
						</div>
					) }

					{ /* Field area */ }
					<div
						className={ `space-y-4 px-5 py-4 ${ disabled ? 'pointer-events-none select-none' : '' }` }
					>
						{ children }
					</div>
				</div>
			) }
		</section>
	);
};

export default SectionCard;
