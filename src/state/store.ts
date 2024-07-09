import {configureStore} from "@reduxjs/toolkit"
import languageReducer from "./language.ts";
import unitsReducer from "./units.ts";

const store = configureStore({
    reducer: {
        language: languageReducer,
        units: unitsReducer
    },
})

export default store
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
