import { configureStore } from '@reduxjs/toolkit';

import categories from './categories/categoriesSlice.js';
import products from './products/productsSlice.js';

export const store = configureStore({
    reducer : {
        categories,
        products,
    },
    devTools : true,
})