import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from '../../utils/constants.js';


const initialState = {
    userLoadingStatus: 'idle',
    currentUser : null,
    cart: [],
    formType : "signup",
    showForm: false,
};

export const createUser = createAsyncThunk(
    'users/createUser', 
    async (payload, thunkAPI) => {
        try{
            const res = await axios.post(`${BASE_URL}/users`, payload);
            return res.data;
        }catch(error){
            console.log( error );
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser', 
    async (payload, thunkAPI) => {
        try{
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
            return res.data;
        }catch(error){
            console.log( error );
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser', 
    async (payload, thunkAPI) => {
        try{
            const res = await axios.post(`${BASE_URL}/auth/login`, payload),
                login = await axios(`${BASE_URL}/auth/profile`,{ 
                    headers : {
                        "Authorization" : `Bearer ${res.data.access_token}`
                    }});

            return login.data;
        }catch(error){
            console.log( error );
            return thunkAPI.rejectWithValue(error);
        }
    }
);


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
        },
        removeItemFromCart : (state, {payload : { id } }) => {
            state.cart = state.cart.filter( item => item.id !== id)
        },
        toggleForm: ( state, action) => { state.showForm = action.payload; },
        toggleFormType : (state, action) => { state.formType = action.payload },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        })
    }
})

const {actions, reducer} = userSlice;

export const { addItemToCart, removeItemFromCart, toggleForm, toggleFormType} = actions;
export default reducer;
