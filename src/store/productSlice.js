// productSlice.js
import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        details: null,
    },
    reducers: {
        setProductDetails: (state, action) => {
            state.details = action.payload
        },
        clearProductDetails: (state) => {
            state.details = null
        }
    }
})

export const { setProductDetails, clearProductDetails } = productSlice.actions
export default productSlice.reducer
