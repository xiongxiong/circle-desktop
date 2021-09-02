import ReactDOM from "react-dom";
import { rootStore, StoreContext } from "./store/Store";
import {FontStyle} from './styles/FontStyle';

const loadFonts = () => {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.innerHTML = FontStyle;
    head.appendChild(style);
}

Promise.resolve(window.Main.env.isTrial())
.then((trial) => {
    console.log(`TRIAL MODE -- ${trial}`);
    
    if (trial) {
        import("./components/FlexBox/trial").then(({App}) => ReactDOM.render(<App />, document.getElementById("root"), loadFonts));
    } else {
        import("./App").then(({App}) => ReactDOM.render(<StoreContext.Provider value={rootStore}><App /></StoreContext.Provider>, document.getElementById("root"), loadFonts));
    }
});
