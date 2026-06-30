const FormField = ({
	label,
	description,
	type = 'select',
	value,
	onChange,
	options = [],
	id,
	disabled = false,
}) => {
	const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

	if (type === 'checkbox') {
		return (
			<label htmlFor={fieldId} className={`flex items-start gap-3 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
				<input
					id={fieldId}
					type="checkbox"
					checked={Boolean(value)}
					disabled={disabled}
					onChange={(event) => onChange(event.target.checked)}
					className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
				/>
				<span>
					<span className={`block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>{label}</span>
					{description && (
						<span className={`mt-1 block text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>{description}</span>
					)}
				</span>
			</label>
		);
	}

	if (type === 'text') {
		return (
			<div>
				<label htmlFor={fieldId} className={`mb-2 block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
					{label}
				</label>
				{description && (
					<p className={`mb-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
				)}
				<input
					id={fieldId}
					type="text"
					value={value || ''}
					disabled={disabled}
					onChange={(event) => onChange(event.target.value)}
					className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
				/>
			</div>
		);
	}

	if (type === 'textarea') {
		return (
			<div>
				<label htmlFor={fieldId} className={`mb-2 block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
					{label}
				</label>
				{description && (
					<p className={`mb-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
				)}
				<textarea
					id={fieldId}
					value={value || ''}
					disabled={disabled}
					onChange={(event) => onChange(event.target.value)}
					rows={4}
					className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
				/>
			</div>
		);
	}

	return (
		<div>
			<label htmlFor={fieldId} className={`mb-2 block text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
				{label}
			</label>
			{description && (
				<p className={`mb-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
			)}
			<select
				id={fieldId}
				value={value}
				disabled={disabled}
				onChange={(event) => onChange(event.target.value)}
				className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default FormField;
