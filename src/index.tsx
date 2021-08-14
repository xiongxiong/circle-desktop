import ReactDOM from "react-dom";
import {FontStyle} from './styles/FontStyle';

const loadFonts = () => {
    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.innerHTML = FontStyle;
    head.appendChild(style);
}

const isTrial: boolean = false;

Promise.resolve(isTrial)
.then((trial) => {
    if (trial) {
        import("./components/FlexBox/trial").then(({App}) => ReactDOM.render(<App />, document.getElementById("root"), loadFonts));
    } else {
        import("./App").then(({App}) => ReactDOM.render(<App />, document.getElementById("root"), loadFonts));
    }
});
