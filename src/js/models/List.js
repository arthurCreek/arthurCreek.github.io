import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (quantity, measure, food) {
        const item = {
            id: uniqid(),
            quantity,
            measure,
            food
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);

        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).quantity = newCount;
    }
}