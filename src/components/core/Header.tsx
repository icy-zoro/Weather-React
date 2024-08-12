import React, {useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import Language from '../../scripts/requests/language.ts'
import {RootState} from '../../state/store.ts'
import {useDispatch, useSelector} from 'react-redux'
import {setLanguage} from '../../state/language.ts'
import {setUnits} from '../../state/units.ts'
import { setTheme } from '../../state/theme.ts'

export default function Header() {
    const path = window.location.pathname
    const [searchParams] = useSearchParams()
    const city = searchParams.get('city')

    const [oneDay, setOneDay] = useState(path === '/')
    const [search, setSearch] = useState(city ?? '')

    const storedLang = useSelector((state: RootState) => state.language.value)
    const storedUnits = useSelector((state: RootState) => state.units.value)
    const storedTheme = useSelector((state: RootState) => state.theme.value)
    const dispatch = useDispatch()

    const Light = () => {
        document.documentElement.classList.remove('dark')
        dispatch(setTheme('light'))
    }
    const Dark = () => {
        document.documentElement.classList.add('dark')
        dispatch(setTheme('dark'))
    }

    const handleThemeChange = () => storedTheme === 'dark' ? Light() : Dark()

    storedTheme === 'dark' ? Dark() : Light()

    const navigate = useNavigate()

    const oneDayClick = () => {
        setOneDay(true)

        const root = '/'
        const path = search.length > 0
            ? `${root}?city=${search}`
            : city ? `${root}?city=${city}` : root
        navigate(path)
    }

    const fiveDaysClick = () => {
        setOneDay(false)

        const root = '/five-days'
        const path = search.length > 0
            ? `${root}?city=${search}`
            : city ? `${root}?city=${city}` : root
        navigate(path)
    }

    const handleSearch = () => {
        const root = oneDay ? '/' : '/five-days'
        const path = search.length > 0 ? `${root}?city=${search}` : root
        navigate(path)
        window.location.reload()
    }

    const langChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value as Language
        dispatch(setLanguage(lang))
    }

    const unitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const units = e.target.value
        dispatch(setUnits(units))
    }

    return (
        <header>
            <nav className='nav'>
                <div>
                    <div className='logo'></div>
                    <h1>Weather</h1>
                </div>
                <div className='mt-1'>
                    <ul className='flex items-center'>
                        <li>
                            <label htmlFor='units'>Temperature units:</label>
                            <select
                                name='units'
                                value={storedUnits}
                                onChange={unitsChange}>
                                <option value='standard'>Standard (K, m/s)</option>
                                <option value='metric'>Metric (°C, m/s)</option>
                                <option value='imperial'>Imperial (°F, m/h)</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor='languages'>Selected language:</label>
                            <select
                                value={storedLang}
                                name='languages'
                                onChange={langChange}>{
                                Object.keys(Language).map((lang) =>
                                    // @ts-expect-error - iterating over enum values with a string (but it works)
                                    <option key={lang} value={Language[lang]}>
                                        {lang}
                                    </option>
                                )
                            }</select>
                        </li>
                        <li>
                            {/* Dark mode toggle switch */}
                            <button
                                onClick={handleThemeChange}
                                type='button'
                                className='theme-switch-btn'>
                                <svg aria-hidden='true' id='theme-dark-icon' className='w-5 h-5' fill='currentColor'
                                     viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
                                </svg>
                                <svg aria-hidden='true' id='theme-light-icon' className='w-5 h-5 hidden'
                                     fill='currentColor'
                                     viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                                        fillRule='evenodd' clipRule='evenodd'></path>
                                </svg>
                                <span className='sr-only'>Toggle dark mode</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className='flex mt-10 search'>
                <button
                    className='select-btn'
                    disabled={oneDay}
                    onClick={oneDayClick}>
                    One day
                </button>
                <button
                    className='select-btn mx-2'
                    disabled={!oneDay}
                    onClick={fiveDaysClick}>
                    Five days
                </button>
                <input
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    role='searchbox'/>
                <button
                    role='search'
                    className='select-btn mx-2'
                    onClick={handleSearch}>
                    Search
                </button>
            </nav>
        </header>
    )
}
