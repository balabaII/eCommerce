import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from '../../utils/constants.js';


const initialState = {
    userLoadingStatus: 'idle',
    currentUser : [],
    cart: [],
};

// export const fetchCategories = createAsyncThunk('categories/fetchCategories', 
//     async (_, thunkAPI) => {
//         try{
//             const res = await axios(`${BASE_URL}/categories`);
//             return res.data;
//         }catch(error){
//             console.log( error );
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, {payload}) =>{
            let newCart = [...state.cart];
            const found = state.cart.find( ({id}) => id === payload.id);

            if( found ){
                newCart = newCart.map( (item) => {
                    return item.id === payload.id 
                            ? { ...item, quantity: payload.quantity || item.quantity + 1} 
                            : item; 
                })
            }else{
                newCart.push({...payload, quantity : 1});
            }

            state.cart = newCart;
        }
    },
    extraReducers: (builder) => {
        // builder
        // .addCase(fetchCategories.pending, state => { state.categoriesLoadingStatus = 'loading'; } )
        // .addCase(fetchCategories.fulfilled, (state, action) => {
        //     state.categoriesLoadingStatus = 'idle';
        //     state.list = action.payload;
        // })
        // .addCase(fetchCategories.rejected, state => { state.categoriesLoadingStatus = 'error'; } )
        // .addDefaultCase( () => {} )
    }
})

const {actions, reducer} = userSlice;

export const { addItemToCart } = actions;
export default reducer;
