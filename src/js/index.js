// Global app controller

import string from './models/Search';

// import { add, multiply, ID } from './views/searchView';
// console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3, 5)} and ${string}`);

import * as searchView from './views/searchView';
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)} and ${string}`);
