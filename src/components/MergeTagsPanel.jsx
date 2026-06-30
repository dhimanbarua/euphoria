import { useState } from '@wordpress/element';
import { MERGE_TAG_META } from '../utils/parseTemplate';

/**
 * MergeTagsPanel
 *
 * Displays all supported merge tags with copy-to-clipboard functionality.
 * Follows the WordPress Admin UX patterns defined in AGENT.md.
 *
 * @return {JSX.Element}
 */
const MergeTagsPanel = () => {
	const [ copiedTag, setCopiedTag ] = useState( null );

	const handleCopy = ( tag ) => {
		if ( navigator.clipboard ) {
			navigator.clipboard.writeText( tag ).then( () => {
				setCopiedTag( tag );
				setTimeout( () => setCopiedTag( null ), 1500 );
			} );
		}
	};

	return (
		<div className="rounded-xl border border-sky-100 bg-sky-50/50 p-5">
			<h3 className="text-sm font-semibold text-sky-950">Supported Merge Tags</h3>
			<p className="mt-1 text-sm text-sky-800">
				Use these tags in your email fields to dynamically pull customer and
				order information. Click any tag to copy it.
			</p>

			<div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
				{ MERGE_TAG_META.map( ( { tag, label, description } ) => {
					const isCopied = copiedTag === tag;

					return (
						<button
							key={ tag }
							type="button"
							title={ `Click to copy ${ tag }` }
							onClick={ () => handleCopy( tag ) }
							className={ `rounded-lg border p-3 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${ isCopied ? 'border-emerald-300 bg-emerald-50' : 'border-sky-100/80 bg-white hover:border-emerald-200 hover:bg-emerald-50/30' }` }
						>
							<div className="flex items-center justify-between gap-2">
								<code className="text-xs font-semibold text-emerald-700 font-mono">
									{ tag }
								</code>
								{ isCopied ? (
									<span className="shrink-0 text-xs font-medium text-emerald-600">
										Copied!
									</span>
								) : (
									<svg
										className="h-3.5 w-3.5 shrink-0 text-gray-300 group-hover:text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M8 3a2 2 0 00-2 2v2H4a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2v-2h2a2 2 0 002-2V5a2 2 0 00-2-2H8zm0 2h6v6h-2V9a2 2 0 00-2-2H8V5zm-2 4h6v6H6V9z" />
									</svg>
								) }
							</div>
							<p className="mt-1 text-xs text-gray-500">{ description }</p>
						</button>
					);
				} ) }
			</div>
		</div>
	);
};

export default MergeTagsPanel;
