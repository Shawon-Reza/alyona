// store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    location_area: '',
    area: '',
    country: '',
    city: '',

    age: null,
    name: '',

    daily_period: false,
    // last_period: '',
    // next_period: '',

    // pregnant_or_breastfeeding: false,
    // life_styles: '',
    // mood_choices: '',
    // water_intake: '',
    // sweet_consumptions: [],
    // skin_concerns: [],
    // eating_habits: [],
    // take_supplements: false,
    // sleep_quality: '',
    // daily_activity: '',
    // skincare_times: [],
    // skincare_goals: [],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        resetForm: () => initialState,
    },
});

export const { setField, resetForm } = formSlice.actions;
export default formSlice.reducer;
