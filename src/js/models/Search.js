// Use axios to do AJAX call instead of fetch to be compatible with all browsers
// Unlike fetch, axios return the json immedietally
import axios from 'axios';
import { appKey, appID} from '../secret';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const baseURL = 'https://api.edamam.com'
        try {
            const res = await axios(`${baseURL}/search?q=${this.query}&app_id=${appID}&app_key=${appKey}`);
            this.result = res.data.hits[0].recipe;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}

