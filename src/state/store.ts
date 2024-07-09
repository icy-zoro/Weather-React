import {configureStore} from '@reduxjs/toolkit'
import languageReducer from './language.ts'
import unitsReducer from './units.ts'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import {thunk} from 'redux-thunk'

const languagePersistConfig = {
    key: 'language',
    storage,
}

const unitsPersistConfig = {
    key: 'units',
    storage,
}

const store = configureStore({
    reducer: {
        language: persistReducer(languagePersistConfig, languageReducer),
        units: persistReducer(unitsPersistConfig, unitsReducer),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

const persistor = persistStore(store)

export default store
export {persistor}
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
