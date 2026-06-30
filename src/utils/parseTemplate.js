/**
 * Template parser utility for email merge tags.
 *
 * @package Euphoria
 */

/**
 * Supported merge tag keys and their preview values.
 *
 * @type {Object.<string, string>}
 */
export const MERGE_TAGS = {
	customer_name: 'Jane Doe',
	product_name: 'Zetox High Heeled',
	store_name: 'Euphoria Store',
	order_id: '#10248',
	review_url: 'https://example.com/review/10248',
};

/**
 * Merge tag metadata for display in the UI.
 *
 * @type {Array.<{tag: string, label: string, description: string}>}
 */
export const MERGE_TAG_META = [
	{
		tag: '{customer_name}',
		label: 'Customer Name',
		description: "Customer's full name",
	},
	{
		tag: '{product_name}',
		label: 'Product Name',
		description: 'Name of the purchased product',
	},
	{
		tag: '{store_name}',
		label: 'Store Name',
		description: 'Your WooCommerce store name',
	},
	{
		tag: '{order_id}',
		label: 'Order ID',
		description: 'The WooCommerce order number',
	},
	{
		tag: '{review_url}',
		label: 'Review URL',
		description: 'Link to the product review form',
	},
];

/**
 * Replace merge tags in a template string with preview values.
 *
 * Replaces tokens of the form `{key}` with the corresponding value from
 * the provided data map. Unknown tags are left untouched.
 *
 * @param {string}                 text Template string containing merge tags.
 * @param {Object.<string,string>} [data] Data map to substitute. Defaults to MERGE_TAGS.
 * @return {string} Rendered string with tags replaced.
 */
export const parseTemplate = ( text, data = MERGE_TAGS ) => {
	if ( ! text ) {
		return '';
	}

	return text.replace( /\{(\w+)\}/g, ( match, key ) => {
		return key in data ? data[ key ] : match;
	} );
};
