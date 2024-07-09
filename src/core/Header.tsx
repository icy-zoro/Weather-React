import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Light = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
}
const Dark = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
}

const handleThemeToggle = () => {
    const theme = localStorage.getItem('color-theme')
        ?? ('dark' in document.documentElement.classList ? 'dark' : 'light')
    theme === 'dark' ? Light() : Dark()
}

export default function Header() {
    const [oneDay, setOneDay] = useState(true)
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    const oneDayClick = () => {
        setOneDay(true)
        navigate("/")
    }

    const fiveDaysClick = () => {
        setOneDay(false)
        navigate("/five-days")
    }

    const handleSearch = () => {
        const root = oneDay ? "/" : "/five-days"
        const path = search.length > 0 ? `${root}?city=${search}` : root
        navigate(path)
    }

    return (
        <header>
            <nav className="nav">
                <div>
                    <div id="logo"></div>
                    <h1>Weather</h1>
                </div>
                <div className="mt-1">
                    <ul className="flex items-center">
                        <li>
                            <label htmlFor="units">Temperature units:</label>
                            <select name="units" id="units">
                                <option value="standard">Standard (K, m/s)</option>
                                <option value="metric">Metric (°C, m/s)</option>
                                <option value="imperial">Imperial (°F, m/h)</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="languages">Selected language:</label>
                            <select name="languages"></select>
                        </li>
                        <li>
                            {/* Dark mode toggle switch */}
                            <button
                                onClick={handleThemeToggle}
                                type="button"
                                className="themeswitchbtn">
                                <svg aria-hidden="true" id="theme-dark-icon" className="w-5 h-5" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                                <svg aria-hidden="true" id="theme-light-icon" className="w-5 h-5 hidden"
                                     fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Toggle dark mode</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className="flex mt-10 search">
                <button
                    className="selectbtn"
                    disabled={oneDay}
                    onClick={oneDayClick}>
                    One day
                </button>
                <button
                    className="selectbtn mx-2"
                    disabled={!oneDay}
                    onClick={fiveDaysClick}>
                    Five days
                </button>
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    role="searchbox"/>
                <button
                    role="search"
                    className="selectbtn mx-2"
                    onClick={handleSearch}>
                    Search
                </button>
            </nav>
        </header>
    )
}
