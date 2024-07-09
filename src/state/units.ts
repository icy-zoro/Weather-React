import {createSlice} from "@reduxjs/toolkit";

const unitsSlice = createSlice({
    name: 'units',
    initialState: {
        value: "metric" as "standard" | "metric" | "imperial",
    },
    reducers: {
        setUnits: (_state, action) => {
            if (!["standard", "metric", "imperial"].includes(action.payload)) {
                return
            }
            return {value: action.payload}
        },
    },
})

export const {setUnits} = unitsSlice.actions
export default unitsSlice.reducer
