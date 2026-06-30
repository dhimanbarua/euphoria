import { SettingsProvider } from './store/SettingsContext';
import EmailReminder from './pages/EmailReminder';

const App = () => {
	return (
		<SettingsProvider>
			<EmailReminder />
		</SettingsProvider>
	);
};

export default App;
