import { defaultSettings } from '../constants';
import { MERGE_TAGS, parseTemplate } from '../utils/parseTemplate';

/**
 * Inline star icon for the product rating preview.
 *
 * @param {{ filled: boolean }} props
 * @return {JSX.Element}
 */
const StarIcon = ( { filled } ) => (
	<svg
		className={ `h-5 w-5 ${ filled ? 'text-amber-400' : 'text-gray-300' }` }
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M10 2l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 14.77l-4.78 2.51.91-5.32L2.27 7.62l5.34-.78L10 2z" />
	</svg>
);

/**
 * PreviewPanel
 *
 * Renders a live email preview that responds in real-time to changes in
 * the `settings` prop. Supports desktop and mobile preview modes.
 * All merge tags are resolved via parseTemplate() using MERGE_TAGS mock data.
 *
 * Part of Phase 1: Dynamic Email Preview System.
 *
 * @param {{
 *   settings: object,
 *   previewMode: 'desktop'|'mobile',
 *   onPreviewModeChange: function,
 * }} props
 * @return {JSX.Element}
 */
const PreviewPanel = ( {
	settings = defaultSettings,
	previewMode,
	onPreviewModeChange,
} ) => {
	const isMobile = previewMode === 'mobile';
	const firstEmail =
		settings?.templates?.first_email || defaultSettings.templates.first_email;
	const general = settings?.general || defaultSettings.general;

	return (
		<aside className="flex w-[420px] shrink-0 flex-col border-l border-gray-200 bg-gray-50">
			{ /* Panel header + mode toggle */ }
			<div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
				<h3 className="text-sm font-semibold text-gray-900">Email Preview</h3>

				<div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
					<button
						type="button"
						id="preview-mode-desktop"
						onClick={ () => onPreviewModeChange( 'desktop' ) }
						className={ `rounded-md px-3 py-1.5 text-xs font-medium transition ${ ! isMobile ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50' }` }
					>
						Desktop
					</button>
					<button
						type="button"
						id="preview-mode-mobile"
						onClick={ () => onPreviewModeChange( 'mobile' ) }
						className={ `rounded-md px-3 py-1.5 text-xs font-medium transition ${ isMobile ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50' }` }
					>
						Mobile
					</button>
				</div>
			</div>

			{ /* Scrollable preview area */ }
			<div className="flex-1 overflow-y-auto p-5">
				<div
					className={ `mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${ isMobile ? 'max-w-[280px]' : 'max-w-full' }` }
				>
					{ /* Email client header mockup */ }
					<div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3 text-left text-xs text-gray-500 space-y-1">
						<div>
							<span className="font-semibold text-gray-600">From:</span>{ ' ' }
							{ parseTemplate( '{store_name}', MERGE_TAGS ) }{ ' ' }
							&lt;noreply@example.com&gt;
						</div>
						<div>
							<span className="font-semibold text-gray-600">Subject:</span>{ ' ' }
							{ parseTemplate( firstEmail.subject, MERGE_TAGS ) }
						</div>
					</div>

					{ /* Brand logo bar */ }
					<div className="border-b border-gray-100 px-6 py-4 text-center">
						<div className="inline-flex items-center gap-2">
							<span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs font-bold text-white">
								E
							</span>
							<span className="text-sm font-semibold text-emerald-600">
								Euphoria
							</span>
						</div>
					</div>

					{ /* Incentive banner – only shown when banner text is set */ }
					{ firstEmail.banner && (
						<div className="bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 px-6 py-8 text-center text-white">
							<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
								🎁
							</div>
							<p className="text-lg font-semibold">
								{ parseTemplate( firstEmail.banner, MERGE_TAGS ) }
							</p>
						</div>
					) }

					{ /* Email body */ }
					<div className="space-y-4 px-6 py-6 text-center">
						{ firstEmail.heading && (
							<h4 className="text-xl font-semibold text-gray-900">
								{ parseTemplate( firstEmail.heading, MERGE_TAGS ) }
							</h4>
						) }

						{ firstEmail.body && (
							<p className="text-sm leading-6 text-gray-600 whitespace-pre-line text-left">
								{ parseTemplate( firstEmail.body, MERGE_TAGS ) }
							</p>
						) }

						{ /* Product card */ }
						<div className="rounded-xl border border-gray-200 p-4 text-center">
							<div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-3xl">
								👠
							</div>
							<p className="text-sm font-semibold text-gray-900">
								{ parseTemplate( '{product_name}', MERGE_TAGS ) }
							</p>
							<p className="text-sm text-gray-500">$230.00</p>

							{ /* In-email star rating – respects general.enable_in_email_rating */ }
							{ general.enable_in_email_rating && (
								<div className="mt-3 flex justify-center gap-1">
									{ [ 1, 2, 3, 4, 5 ].map( ( star ) => (
										<StarIcon key={ star } filled={ true } />
									) ) }
								</div>
							) }

							<button
								type="button"
								className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
							>
								{ parseTemplate(
									firstEmail.button_text || 'Write a Review',
									MERGE_TAGS
								) }
							</button>
						</div>

						{ /* Footer text */ }
						{ firstEmail.footer_text && (
							<p className="text-sm text-gray-600 whitespace-pre-line text-left border-t border-gray-100 pt-4">
								{ parseTemplate( firstEmail.footer_text, MERGE_TAGS ) }
							</p>
						) }

						{ /* Unsubscribe link – respects general.add_unsubscribe_link */ }
						{ general.add_unsubscribe_link && (
							<p className="text-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100">
								No longer want to receive these emails?{ ' ' }
								<a href="#" className="text-gray-500 underline hover:text-gray-700">
									Unsubscribe here
								</a>
								.
							</p>
						) }
					</div>
				</div>
			</div>
		</aside>
	);
};

export default PreviewPanel;
