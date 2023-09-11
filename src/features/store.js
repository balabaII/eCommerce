import { configureStore } from '@reduxjs/toolkit';

import categories from './categories/categoriesSlice.js';
import products from './products/productsSlice.js';
import { apiSlice } from './API/apiSlice.js';

export const store = configureStore({
    reducer : {
        categories,
        products,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware: getMiddleware => getMiddleware().concat( apiSlice.middleware),
    devTools : true,
})