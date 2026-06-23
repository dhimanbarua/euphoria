import { footerLinks, sidebarSections } from '../constants';

const icons = {
	chart: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M3 14V6h2v8H3zm4-4V6h2v4H7zm4 6V6h2v10h-2zm4-8V6h2v2h-2z" />
		</svg>
	),
	reviews: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M4 4h12v10H6l-2 2V4z" />
		</svg>
	),
	settings: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M10 12a2 2 0 100-4 2 2 0 000 4zm8-2a8 8 0 11-16 0 8 8 0 0116 0z" />
		</svg>
	),
	form: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M4 4h12v2H4V4zm0 4h8v2H4V8zm0 4h12v2H4v-2z" />
		</svg>
	),
	mail: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M2 5h16v10H2V5zm2 2v6h12V7l-6 4L4 7z" />
		</svg>
	),
	external: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M11 3h6v6h-2V6.4L9 12.4 7.6 11 13.6 5H11V3zM5 5h4V3H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4h-2v4H5V5z" />
		</svg>
	),
	import: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M10 3v8l3-3 1.4 1.4L10 14.8 5.6 9.4 7 8l3 3V3zm-7 12h14v2H3v-2z" />
		</svg>
	),
	showcase: (
		<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z" />
		</svg>
	),
};

const SidebarItem = ( { item } ) => {
	const isActive = item.active;

	return (
		<button
			type="button"
			className={ `flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
				isActive
					? 'bg-sky-50 font-medium text-sky-700'
					: 'text-gray-600 hover:bg-gray-50'
			}` }
		>
			<span className={ isActive ? 'text-sky-600' : 'text-gray-400' }>
				{ icons[ item.icon ] || icons.settings }
			</span>
			{ item.label }
		</button>
	);
};

const Sidebar = () => {
	return (
		<aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white">
			<div className="border-b border-gray-200 px-4 py-4">
				<div className="flex items-center gap-2">
					<span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-sm font-bold text-white">
						E
					</span>
					<span className="text-base font-semibold text-gray-900">Euphoria</span>
				</div>
			</div>

			<nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
				{ sidebarSections.map( ( section ) => (
					<div key={ section.title || section.items[ 0 ].id }>
						{ section.title && (
							<p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
								{ section.title }
							</p>
						) }
						<div className="space-y-1">
							{ section.items.map( ( item ) => (
								<SidebarItem key={ item.id } item={ item } />
							) ) }
						</div>
					</div>
				) ) }
			</nav>

			<div className="space-y-1 border-t border-gray-200 px-3 py-4">
				{ footerLinks.map( ( link ) => (
					<button
						key={ link.id }
						type="button"
						className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50"
					>
						{ link.label }
					</button>
				) ) }
			</div>
		</aside>
	);
};

export default Sidebar;
