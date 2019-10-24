// Use axios to do AJAX call instead of fetch to be compatible with all browsers
// Unlike fetch, axios return the json immedietally
import axios from 'axios';
import { appKey, appID} from '../secret';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const baseURL = 'https://api.edamam.com';
        // Default is only 10 indexed items, this will esnure use of our pagination feature
        const lastIndex = 30;
        try {
            const res = await axios(`${baseURL}/search?q=${this.query}&to=${lastIndex}&app_id=${appID}&app_key=${appKey}`);
            
            this.result = res.data.hits;
            console.log(res);
        } catch(error) {
            alert(error);
        }
    }
}

