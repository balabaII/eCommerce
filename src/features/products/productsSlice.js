import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from '../../utils/constants.js';


const initialState = {
    productsLoadingStatus: 'idle',
    filtered : [],
    // related : [],
    list : [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', 
    async (_, thunkAPI) => {
        try{
            const res = await axios(`${BASE_URL}/products`);
            return res.data;
        }catch(error){
            console.log( error );
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers : {
        filterByPrice: ( state, action) =>{
            state.filtered = state.list.filter( (item) => item.price < action.payload )
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, state => { state.productsLoadingStatus = 'loading'; } )
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.productsLoadingStatus = 'idle';
            state.list = action.payload;
        })
        .addCase(fetchProducts.rejected, state => { state.productsLoadingStatus = 'error'; } )
        .addDefaultCase( () => {} )
    }
})


const {actions, reducer} = productsSlice;

export const {filterByPrice} = actions;
export default reducer;
