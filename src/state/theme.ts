import { createSlice } from "@reduxjs/toolkit"
import Theme from "../scripts/types/theme"

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: Theme.Light,
    },
    reducers: {
        setTheme: (_state, action) => {
            if (!Object.values(Theme).includes(action.payload)) return
            return {value: action.payload}
        },
    },
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer
