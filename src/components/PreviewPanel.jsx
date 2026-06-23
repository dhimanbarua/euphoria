const StarIcon = () => (
	<svg className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
		<path d="M10 2l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 14.77l-4.78 2.51.91-5.32L2.27 7.62l5.34-.78L10 2z" />
	</svg>
);

const PreviewPanel = ( { previewMode, onPreviewModeChange } ) => {
	const isMobile = previewMode === 'mobile';

	return (
		<aside className="flex w-[420px] shrink-0 flex-col border-l border-gray-200 bg-gray-50">
			<div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
				<h3 className="text-sm font-semibold text-gray-900">Email Preview</h3>
				<div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
					<button
						type="button"
						onClick={ () => onPreviewModeChange( 'desktop' ) }
						className={ `rounded-md px-3 py-1.5 text-xs font-medium ${
							! isMobile ? 'bg-gray-900 text-white' : 'text-gray-600'
						}` }
					>
						Desktop
					</button>
					<button
						type="button"
						onClick={ () => onPreviewModeChange( 'mobile' ) }
						className={ `rounded-md px-3 py-1.5 text-xs font-medium ${
							isMobile ? 'bg-gray-900 text-white' : 'text-gray-600'
						}` }
					>
						Mobile
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-5">
				<div
					className={ `mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${
						isMobile ? 'max-w-[280px]' : 'max-w-full'
					}` }
				>
					<div className="border-b border-gray-100 px-6 py-4 text-center">
						<div className="inline-flex items-center gap-2">
							<span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs font-bold text-white">
								E
							</span>
							<span className="text-sm font-semibold text-emerald-600">Euphoria</span>
						</div>
					</div>

					<div className="bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 px-6 py-8 text-center text-white">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
							🎁
						</div>
						<p className="text-lg font-semibold">Win $50 Store Credit</p>
					</div>

					<div className="space-y-4 px-6 py-6 text-center">
						<h4 className="text-xl font-semibold text-gray-900">How was your experience?</h4>
						<p className="text-sm text-gray-600">
							Hi { '{{customerName}}' },
						</p>
						<p className="text-sm leading-6 text-gray-600">
							We&apos;d love to hear your thoughts on the product! Your feedback is truly
							appreciated and can help other customers make informed decisions.
						</p>

						<div className="rounded-xl border border-gray-200 p-4">
							<div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-3xl">
								👠
							</div>
							<p className="text-sm font-semibold text-gray-900">Zetox High Heeled</p>
							<p className="text-sm text-gray-500">$230.00</p>
							<div className="mt-3 flex justify-center gap-1">
								{ [ 1, 2, 3, 4, 5 ].map( ( star ) => (
									<StarIcon key={ star } />
								) ) }
							</div>
							<button
								type="button"
								className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white"
							>
								Write a Review
							</button>
						</div>

						<p className="text-sm text-gray-600">
							Best reggards,
							<br />
							{ '{{storeName}}' }
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default PreviewPanel;
