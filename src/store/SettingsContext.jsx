import { createContext, useContext, useEffect, useState } from '@wordpress/element';
import { getSettings, saveSettings } from '../api/settings';
import { defaultSettings } from '../constants';

/**
 * React Context that holds global settings state.
 *
 * Centralises settings data to eliminate prop drilling across the admin UI.
 * Consumed via the `useSettings()` hook.
 *
 * Part of Phase 3 – Conditional Settings (TASK-03).
 *
 * @type {React.Context}
 */
const SettingsContext = createContext( null );

/**
 * SettingsProvider
 *
 * Wraps the admin page and exposes all settings-related state and actions
 * to every descendant through React Context.
 *
 * @param {{ children: React.ReactNode }} props
 * @return {JSX.Element}
 */
export const SettingsProvider = ( { children } ) => {
	const [ settings, setSettings ] = useState( defaultSettings );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( '' );

	useEffect( () => {
		getSettings()
			.then( ( data ) => {
				setSettings( {
					...defaultSettings,
					...data,
					general: { ...defaultSettings.general, ...data.general },
					timing: { ...defaultSettings.timing, ...data.timing },
					delivery: { ...defaultSettings.delivery, ...data.delivery },
					ratings_scale: {
						...defaultSettings.ratings_scale,
						...data.ratings_scale,
					},
					redirection: {
						...defaultSettings.redirection,
						...data.redirection,
					},
					templates: {
						first_email: {
							...defaultSettings.templates.first_email,
							...( data.templates?.first_email || {} ),
						},
					},
				} );
			} )
			.catch( () => {
				setNotice( 'Unable to load settings.' );
			} )
			.finally( () => {
				setIsLoading( false );
			} );
	}, [] );

	/**
	 * Update a single key within a top-level settings section.
	 *
	 * @param {string} section Top-level key (e.g. 'general', 'timing').
	 * @param {string} key     Field key within the section.
	 * @param {*}      value   New value.
	 */
	const updateSetting = ( section, key, value ) => {
		setSettings( ( current ) => ( {
			...current,
			[ section ]: {
				...current[ section ],
				[ key ]: value,
			},
		} ) );
	};

	/**
	 * Update a single key within templates.first_email.
	 *
	 * @param {string} key   Template field key.
	 * @param {*}      value New value.
	 */
	const updateTemplateSetting = ( key, value ) => {
		setSettings( ( current ) => ( {
			...current,
			templates: {
				...current.templates,
				first_email: {
					...current.templates.first_email,
					[ key ]: value,
				},
			},
		} ) );
	};

	/**
	 * Toggle the top-level enabled flag.
	 *
	 * Preserves all other settings; only the `enabled` field is mutated.
	 *
	 * @param {boolean} value New toggle value.
	 */
	const setEnabled = ( value ) => {
		setSettings( ( current ) => ( { ...current, enabled: value } ) );
	};

	/**
	 * Persist the current settings to the REST API.
	 */
	const handleSave = async () => {
		setIsSaving( true );
		setNotice( '' );

		try {
			await saveSettings( settings );
			setNotice( 'Settings saved successfully.' );
		} catch ( error ) {
			setNotice( error?.message || 'Unable to save settings.' );
		} finally {
			setIsSaving( false );
		}
	};

	return (
		<SettingsContext.Provider
			value={ {
				settings,
				isLoading,
				isSaving,
				notice,
				updateSetting,
				updateTemplateSetting,
				setEnabled,
				handleSave,
			} }
		>
			{ children }
		</SettingsContext.Provider>
	);
};

/**
 * useSettings hook
 *
 * Returns all settings state and actions from the nearest SettingsProvider.
 * Must be called from within a SettingsProvider tree.
 *
 * @return {{
 *   settings: object,
 *   isLoading: boolean,
 *   isSaving: boolean,
 *   notice: string,
 *   updateSetting: function,
 *   updateTemplateSetting: function,
 *   setEnabled: function,
 *   handleSave: function,
 * }}
 */
export const useSettings = () => {
	const ctx = useContext( SettingsContext );

	if ( ! ctx ) {
		throw new Error( 'useSettings must be called within a SettingsProvider.' );
	}

	return ctx;
};
