import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from '../../utils/constants.js';


const initialState = {
    categoriesLoadingStatus: 'idle',
    list : [],
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', 
    async (_, thunkAPI) => {
        try{
            const res = await axios(`${BASE_URL}/categories`);
            return res.data;
        }catch(error){
            console.log( error );
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, state => { state.categoriesLoadingStatus = 'loading'; } )
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.categoriesLoadingStatus = 'idle';
            state.list = action.payload;
        })
        .addCase(fetchCategories.rejected, state => { state.categoriesLoadingStatus = 'error'; } )
        .addDefaultCase( () => {} )
    }
})

const {actions, reducer} = categoriesSlice;

export default reducer;
