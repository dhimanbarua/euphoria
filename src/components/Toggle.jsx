const Toggle = ( { id, checked, onChange, label, description } ) => {
	return (
		<div className="flex items-start justify-between gap-4">
			<div className="flex-1">
				{ label && (
					<label htmlFor={ id } className="text-sm font-medium text-gray-900">
						{ label }
					</label>
				) }
				{ description && (
					<p className="mt-1 text-sm text-gray-500">{ description }</p>
				) }
			</div>
			<button
				id={ id }
				type="button"
				role="switch"
				aria-checked={ checked }
				onClick={ () => onChange( ! checked ) }
				className={ `relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
					checked ? 'bg-emerald-500' : 'bg-gray-300'
				}` }
			>
				<span
					className={ `inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
						checked ? 'translate-x-5' : 'translate-x-0.5'
					} mt-0.5` }
				/>
			</button>
		</div>
	);
};

export default Toggle;
