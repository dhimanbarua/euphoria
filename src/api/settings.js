import apiFetch from '@wordpress/api-fetch';

const { nonce } = window.euphoriaAdmin || {};

if ( nonce ) {
	apiFetch.use( apiFetch.createNonceMiddleware( nonce ) );
}

const API_PATH = '/euphoria/v1/settings';

export const getSettings = async () => {
	return apiFetch( { path: API_PATH } );
};

export const saveSettings = async ( settings ) => {
	return apiFetch( {
		path: API_PATH,
		method: 'POST',
		data: settings,
	} );
};
