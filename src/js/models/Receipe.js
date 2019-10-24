import axios from 'axios';
import { appKey, appID} from '../secret';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        const baseURL = 'https://api.edamam.com';
        const uriString = "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23";
        try {
            const res = await axios(`${baseURL}/search?r=${uriString}${this.id}&app_id=${appID}&app_key=${appKey}`);
            this.title = res.data[0].label;
            this.author = res.data[0].source;
            this.img = res.data[0].image;
            this.url = res.data[0].shareAs;
            this.ingredients = res.data[0].ingredients;
        } catch(error) {
            console.log(error);
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = {
                quantity: el.quantity,
                measure: (el.measure != null) ? el.measure : 'n/a',
                food: (el.food != null) ? el.food.toLowerCase() : 'n/a'

            }

            // Remove parentheses

            // Parse ingredients into count, unit and ingredient
            return ingredient;
        });
        this.ingredients = newIngredients;
    }
}