import ReactDOM from "react-dom";
import { FontStyle } from './styles/FontStyle';
import { store } from './store/store';
import { Provider } from 'react-redux';
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const loadFonts = () => {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.innerHTML = FontStyle;
    head.appendChild(style);
}

const persistor = persistStore(store);

Promise.resolve(window.Main.env.isTrial())
    .then((trial) => {
        console.log(`TRIAL MODE -- ${trial}`);

        if (trial) {
            // import("./components/FlexBox/trial").then(({ App }) => ReactDOM.render(<App />, document.getElementById("root"), loadFonts));
            // import("./components/TodoNavi/trial").then(({ App }) => ReactDOM.render(<App />, document.getElementById("root"), loadFonts));
            import("./Trial").then(({ Trial }) => ReactDOM.render(<Trial />, document.getElementById("root"), loadFonts));
        } else {
            import("./App").then(({ App }) => ReactDOM.render((
                <React.StrictMode>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <App />
                        </PersistGate>
                    </Provider>
                </React.StrictMode>
            ), document.getElementById("root"), loadFonts));
        }
    });
