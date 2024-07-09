import {createSlice} from '@reduxjs/toolkit'
import Language from '../scripts/requests/language.ts'

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        value: Language.English,
    },
    reducers: {
        setLanguage: (_state, action) => {
            if (!Object.values(Language).includes(action.payload)) return
            return {value: action.payload}
        },
    },
})

export const {setLanguage} = languageSlice.actions
export default languageSlice.reducer
