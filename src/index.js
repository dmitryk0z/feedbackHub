import ReactDOM from 'react-dom/client';
// Amplify
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
//
import App from './App';

// ----------------------------------------------------------------------

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
