import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { shuffle } from '../../utils/common.js';
import {BASE_URL} from '../../utils/constants.js';


const initialState = {
    productsLoadingStatus: 'idle',
    filtered : [],
    related : [],
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
        filterByPrice: ( state, action) => {
            state.filtered = state.list.filter( (item) => item.price < action.payload )
        },
        getRelatedProducts: ( state, action) => {
            const list = state.list.filter( ({category : {id}}) => id === action.payload)
            state.related = shuffle(list);
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

export const {filterByPrice, getRelatedProducts} = actions;
export default reducer;
