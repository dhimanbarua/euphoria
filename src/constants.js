export const defaultSettings = {
	enabled: true,
	general: {
		trigger_when: 'delivered',
		exclude_refunded: true,
		exclude_cancelled: true,
		enable_in_email_rating: false,
		add_unsubscribe_link: false,
	},
	timing: {
		send_from: '09:00 AM',
		send_to: '08:00 PM',
	},
	delivery: {
		method: 'smtp',
	},
	ratings_scale: {
		low_ratings: '2_stars_and_below',
		high_ratings: '4_stars_and_above',
	},
	redirection: {
		low_ratings_to: 'none',
		high_ratings_to: 'thank_you',
	},
	templates: {
		first_email: {
			subject: 'How was your experience?',
			banner: '🎁 Win $50 Store Credit',
			heading: 'How was your experience?',
			body: "Hi {customer_name},\n\nWe'd love to hear your thoughts on the {product_name} you recently purchased. Your feedback is truly appreciated and can help other customers make informed decisions.",
			button_text: 'Write a Review',
			footer_text: "Best regards,\n{store_name}",
		},
	},
};

export const triggerOptions = [
	{ value: 'delivered', label: 'Delivered' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'processing', label: 'Processing' },
];

export const deliveryOptions = [
	{ value: 'smtp', label: 'SMTP' },
	{ value: 'wp_mail', label: 'WordPress Mail' },
];

export const lowRatingOptions = [
	{ value: '1_star_and_below', label: '1 star and below' },
	{ value: '2_stars_and_below', label: '2 stars and below' },
	{ value: '3_stars_and_below', label: '3 stars and below' },
];

export const highRatingOptions = [
	{ value: '3_stars_and_above', label: '3 stars and above' },
	{ value: '4_stars_and_above', label: '4 stars and above' },
	{ value: '5_stars', label: '5 stars' },
];

export const lowRedirectOptions = [
	{ value: 'none', label: 'None' },
	{ value: 'custom_page', label: 'Custom Page' },
	{ value: 'contact_form', label: 'Contact Form' },
];

export const highRedirectOptions = [
	{ value: 'none', label: 'None' },
	{ value: 'thank_you', label: 'Thank You' },
	{ value: 'custom_page', label: 'Custom Page' },
];

export const timeOptions = () => {
	const options = [];

	for ( let hour = 0; hour < 24; hour += 1 ) {
		[ '00', '30' ].forEach( ( minute ) => {
			const date = new Date();
			date.setHours( hour, Number( minute ), 0, 0 );
			options.push( {
				value: date.toLocaleTimeString( 'en-US', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				} ),
				label: date.toLocaleTimeString( 'en-US', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				} ),
			} );
		} );
	}

	return options;
};

export const sidebarSections = [
	{
		title: '',
		items: [
			{ id: 'analytics', label: 'Analytics', icon: 'chart' },
			{ id: 'all-reviews', label: 'All Reviews', icon: 'reviews' },
		],
	},
	{
		title: 'WooCommerce',
		items: [
			{ id: 'general', label: 'General', icon: 'settings' },
			{ id: 'submission-form', label: 'Submission Form', icon: 'form' },
			{ id: 'email-reminder', label: 'Email Reminder', icon: 'mail', active: true },
		],
	},
	{
		title: 'Collect Reviews',
		items: [
			{ id: 'custom-form', label: 'Custom Form', icon: 'form' },
			{ id: 'external-sources', label: 'External Sources', icon: 'external' },
			{ id: 'import-reviews', label: 'Import Reviews', icon: 'import' },
		],
	},
	{
		title: '',
		items: [
			{ id: 'showcase-reviews', label: 'Showcase Reviews', icon: 'showcase' },
			{ id: 'settings', label: 'Settings', icon: 'settings' },
		],
	},
];

export const footerLinks = [
	{ id: 'documentation', label: 'Documentation' },
	{ id: 'tutorials', label: 'Tutorials' },
	{ id: 'help', label: 'Help' },
];
