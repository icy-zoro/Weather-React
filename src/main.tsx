import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./css/index.css"
import "./css/tailwind.css"
import {BrowserRouter} from "react-router-dom"

const isDarkSet = localStorage.getItem('color-theme') === 'dark'
const isThemeSet = 'color-theme' in localStorage
const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches

if (isDarkSet || (!isThemeSet && isDarkPreferred)) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
} else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('color-theme', 'light')
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
)
