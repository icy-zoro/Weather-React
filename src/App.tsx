import {Route, Routes} from "react-router-dom"
import Home from "./components/Home.tsx"
import Layout from "./components/core/Layout.tsx"
import NotFound from "./components/core/NotFound.tsx"
import FiveDay from "./components/FiveDay.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="five-days" element={<FiveDay/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
