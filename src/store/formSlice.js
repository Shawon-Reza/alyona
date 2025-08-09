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
    last_period: '',
    next_period: '',

    pregnant_or_breastfeeding: false,
    selectedLifestyle: '',
    selectedMood: '',
    selectedWaterIntake: '',
    selectedSweetConsumption: [],
    selectedSkinConcerns: [],
    selectedEatingHabits: [],
    selectedSupplement: false,
    selectedSleepQuality: '',
    selectedDailyActivity: '',
    selectedSkincareTime: [],
    selectedSkincareGoals: [],
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
