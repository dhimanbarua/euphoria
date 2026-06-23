import { createRoot } from '@wordpress/element';
import App from './App';
import './admin.css';

const root = document.getElementById( 'euphoria-root' );

if ( root ) {
	createRoot( root ).render( <App /> );
}
