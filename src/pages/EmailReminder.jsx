import { useState } from '@wordpress/element';
import { useSettings } from '../store/SettingsContext';
import {
	deliveryOptions,
	highRatingOptions,
	highRedirectOptions,
	lowRatingOptions,
	lowRedirectOptions,
	timeOptions,
	triggerOptions,
} from '../constants';
import FormField from '../components/FormField';
import MergeTagsPanel from '../components/MergeTagsPanel';
import PreviewPanel from '../components/PreviewPanel';
import SectionCard from '../components/SectionCard';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';
import Toggle from '../components/Toggle';

const tabs = [
	{ id: 'settings', label: 'Settings' },
	{ id: 'first-email', label: 'First Email' },
	{ id: 'follow-ups', label: 'Follow-ups' },
];

const EmailReminder = () => {
	const {
		settings,
		isLoading,
		isSaving,
		notice,
		updateSetting,
		updateTemplateSetting,
		setEnabled,
		handleSave,
	} = useSettings();

	const [ activeTab, setActiveTab ] = useState( 'settings' );
	const [ previewMode, setPreviewMode ] = useState( 'desktop' );

	const renderStaticTab = ( title, description ) => (
		<div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
			<h3 className="text-lg font-semibold text-gray-900">{ title }</h3>
			<p className="mt-2 text-sm text-gray-500">{ description }</p>
		</div>
	);

	const renderSettingsTab = () => {
		const isDisabled = ! settings.enabled;

		return (
			<div className="space-y-4">
				<div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
					<Toggle
						id="email-reminder-enabled"
						checked={ settings.enabled }
						onChange={ setEnabled }
						label="Email Reminder"
						description="Enable automated review request emails and follow-ups for WooCommerce orders."
					/>
				</div>

				<SectionCard title="General" disabled={ isDisabled }>
					<FormField
						label="Trigger review emails when order is"
						value={ settings.general.trigger_when }
						onChange={ ( value ) => updateSetting( 'general', 'trigger_when', value ) }
						options={ triggerOptions }
						disabled={ isDisabled }
					/>
					<FormField
						type="checkbox"
						label="Exclude refunded orders"
						value={ settings.general.exclude_refunded }
						onChange={ ( value ) => updateSetting( 'general', 'exclude_refunded', value ) }
						disabled={ isDisabled }
					/>
					<FormField
						type="checkbox"
						label="Exclude cancelled orders"
						value={ settings.general.exclude_cancelled }
						onChange={ ( value ) => updateSetting( 'general', 'exclude_cancelled', value ) }
						disabled={ isDisabled }
					/>
					<FormField
						type="checkbox"
						label="Enable in-email rating"
						value={ settings.general.enable_in_email_rating }
						onChange={ ( value ) =>
							updateSetting( 'general', 'enable_in_email_rating', value )
						}
						disabled={ isDisabled }
					/>
					<FormField
						type="checkbox"
						label="Add an unsubscribe link in email"
						value={ settings.general.add_unsubscribe_link }
						onChange={ ( value ) =>
							updateSetting( 'general', 'add_unsubscribe_link', value )
						}
						disabled={ isDisabled }
					/>
				</SectionCard>

				<SectionCard title="Timing" disabled={ isDisabled }>
					<div className="grid gap-4 md:grid-cols-2">
						<FormField
							label="Send between (Store time)"
							value={ settings.timing.send_from }
							onChange={ ( value ) => updateSetting( 'timing', 'send_from', value ) }
							options={ timeOptions() }
							disabled={ isDisabled }
						/>
						<FormField
							label="To"
							value={ settings.timing.send_to }
							onChange={ ( value ) => updateSetting( 'timing', 'send_to', value ) }
							options={ timeOptions() }
							disabled={ isDisabled }
						/>
					</div>
				</SectionCard>

				<SectionCard title="Delivery" disabled={ isDisabled }>
					<FormField
						label="Email sending method"
						description="Connect an SMTP plugin to ensure review reminders are delivered reliably."
						value={ settings.delivery.method }
						onChange={ ( value ) => updateSetting( 'delivery', 'method', value ) }
						options={ deliveryOptions }
						disabled={ isDisabled }
					/>
				</SectionCard>

				<SectionCard title="Ratings scale">
					<FormField
						label="Calculate low ratings"
						value={ settings.ratings_scale.low_ratings }
						onChange={ ( value ) => updateSetting( 'ratings_scale', 'low_ratings', value ) }
						options={ lowRatingOptions }
					/>
					<FormField
						label="Calculate high ratings"
						value={ settings.ratings_scale.high_ratings }
						onChange={ ( value ) => updateSetting( 'ratings_scale', 'high_ratings', value ) }
						options={ highRatingOptions }
					/>
				</SectionCard>

				<SectionCard title="Redirection">
					<FormField
						label="Redirect low ratings to"
						value={ settings.redirection.low_ratings_to }
						onChange={ ( value ) => updateSetting( 'redirection', 'low_ratings_to', value ) }
						options={ lowRedirectOptions }
					/>
					<FormField
						label="Redirect high ratings to"
						value={ settings.redirection.high_ratings_to }
						onChange={ ( value ) => updateSetting( 'redirection', 'high_ratings_to', value ) }
						options={ highRedirectOptions }
					/>
				</SectionCard>

				<div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
					{ notice && <p className="text-sm text-gray-600">{ notice }</p> }
					<button
						type="button"
						onClick={ handleSave }
						disabled={ isSaving }
						className="ml-auto rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{ isSaving ? 'Saving…' : 'Save Settings' }
					</button>
				</div>
			</div>
		);
	};

	const renderFirstEmailTab = () => {
		const firstEmail = settings.templates.first_email;

		return (
			<div className="space-y-4">
				{ /* Merge Tags – reusable component with copy-to-clipboard */ }
				<MergeTagsPanel />

				{ /* Form Card */ }
				<SectionCard title="First Email Template">
					<FormField
						type="text"
						label="Subject Line"
						description="The subject line of the email displayed in the customer's inbox."
						value={ firstEmail.subject }
						onChange={ ( value ) => updateTemplateSetting( 'subject', value ) }
					/>
					<FormField
						type="text"
						label="Incentive Banner Text"
						description="A promo header shown in the colored banner. Leave empty to disable."
						value={ firstEmail.banner }
						onChange={ ( value ) => updateTemplateSetting( 'banner', value ) }
					/>
					<FormField
						type="text"
						label="Email Heading"
						description="The primary heading at the top of the email content."
						value={ firstEmail.heading }
						onChange={ ( value ) => updateTemplateSetting( 'heading', value ) }
					/>
					<FormField
						type="textarea"
						label="Email Body"
						description="The main body text of the review reminder. Supports merge tags."
						value={ firstEmail.body }
						onChange={ ( value ) => updateTemplateSetting( 'body', value ) }
					/>
					<FormField
						type="text"
						label="Button Text"
						description="The call-to-action text on the button."
						value={ firstEmail.button_text }
						onChange={ ( value ) => updateTemplateSetting( 'button_text', value ) }
					/>
					<FormField
						type="textarea"
						label="Footer Text"
						description="The closing text at the bottom of the email."
						value={ firstEmail.footer_text }
						onChange={ ( value ) => updateTemplateSetting( 'footer_text', value ) }
					/>
				</SectionCard>

				{ /* Save Bar */ }
				<div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4">
					{ notice && <p className="text-sm text-gray-600">{ notice }</p> }
					<button
						type="button"
						onClick={ handleSave }
						disabled={ isSaving }
						className="ml-auto rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{ isSaving ? 'Saving…' : 'Save Settings' }
					</button>
				</div>
			</div>
		);
	};

	const renderTabContent = () => {
		if ( activeTab === 'first-email' ) {
			return renderFirstEmailTab();
		}

		if ( activeTab === 'follow-ups' ) {
			return renderStaticTab(
				'Follow-ups',
				'Configure follow-up reminder sequences in a future release.'
			);
		}

		return renderSettingsTab();
	};

	if ( isLoading ) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-600">
				Loading settings…
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-gray-100 text-gray-900">
			<Sidebar />

			<div className="flex min-w-0 flex-1">
				<main className="min-w-0 flex-1 overflow-y-auto px-8 py-6">
					<div className="mb-6">
						<h1 className="text-2xl font-semibold text-gray-900">
							WooCommerce Review Widget
						</h1>
						<p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
							Collect and showcase product ratings and reviews to build trust, boost
							conversions, and enhance your store&apos;s credibility.
						</p>
					</div>

					<div className="mb-6">
						<Tabs tabs={ tabs } activeTab={ activeTab } onChange={ setActiveTab } />
					</div>

					{ renderTabContent() }
				</main>

				<PreviewPanel
					settings={ settings }
					previewMode={ previewMode }
					onPreviewModeChange={ setPreviewMode }
				/>
			</div>
		</div>
	);
};

export default EmailReminder;
