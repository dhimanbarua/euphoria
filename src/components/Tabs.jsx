const Tabs = ( { tabs, activeTab, onChange } ) => {
	return (
		<div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
			{ tabs.map( ( tab ) => {
				const isActive = tab.id === activeTab;

				return (
					<button
						key={ tab.id }
						type="button"
						onClick={ () => onChange( tab.id ) }
						className={ `rounded-md px-4 py-2 text-sm font-medium transition ${
							isActive
								? 'bg-gray-900 text-white'
								: 'text-gray-600 hover:text-gray-900'
						}` }
					>
						{ tab.label }
					</button>
				);
			} ) }
		</div>
	);
};

export default Tabs;
