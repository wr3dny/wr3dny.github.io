import {Navbar} from "./components/Navbar/Navbar.tsx";
import {HashRouter} from "react-router-dom";
import {RouterConfig} from "./router.tsx";


export const App = () => {

    return (
        <HashRouter>
            <Navbar/>
            <RouterConfig/>
        </HashRouter>
    )
}

