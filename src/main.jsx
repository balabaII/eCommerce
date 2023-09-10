import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from './components/App/App';

import { store } from "./features/store";

import './styles/index.css';



createRoot( document.getElementById("root") ).render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
    
);