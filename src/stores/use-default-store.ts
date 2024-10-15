import {defineStore} from 'pinia';
import {reactive, toRefs} from 'vue';

interface Sandwich {
    bread: string;
    sauce: string;
    cheese: string;
    filling: string;
}

interface Ingredients {
    breads: string[];
    sauces: string[];
    cheeses: string[];
    fillings: string[];
}

interface StoreState {
    ingredients: Ingredients;
    sandwiches: Sandwich[];
}
function generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const useDefaultStore = defineStore('default', () => {
    const state = reactive<StoreState>({
        ingredients: {
            breads: [
                'Baguette',
                'Ciabatta',
                'Pain de seigle',
                'Wrap',
                'Pain aux céréales',
            ],
            sauces: [
                'Mayonnaise',
                'Moutarde',
                'Pesto',
                'Sauce barbecue',
                'Sauce aigre-douce',
            ],
            cheeses: [
                'Cheddar',
                'Mozzarella',
                'Gouda',
                'Emmental',
                'Roquefort',
            ],
            fillings: [
                'Jambon',
                'Poulet',
                'Saumon',
                'Thon',
                'Bacon',
            ],
        },
        sandwiches: []
    });

    const getRandomElement = (array: string[]): string => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const generateSandwich = (): Sandwich => {
        return {
            id: generateUniqueId(),
            bread: getRandomElement(state.ingredients.breads),
            sauce: getRandomElement(state.ingredients.sauces),
            cheese: getRandomElement(state.ingredients.cheeses),
            filling: getRandomElement(state.ingredients.fillings),
        };
    };

    const saveSandwich = (sandwich: Sandwich): void => {
        state.sandwiches.push(sandwich);
    };

    const addBread = (bread: Ingredients.bread) => {
        state.sandwiches.bread.push(bread);
    };
    const addSauce = (sauce: Ingredients.sauce) => {
        state.sandwiches.sauce.push(sauce);
    };
    const addCheese = (cheese: Ingredients.cheese) => {
        state.sandwiches.cheese.push(cheese);
    };
    const addFilling= (filling: Ingredients.fillings) => {
        state.sandwiches.fillings.push(filling);
    };

    const filterSandwiches = (ingredient: string): Sandwich[] => {
        return state.sandwiches.filter(sandwich =>
            Object.values(sandwich)
                .map(val => val.toLowerCase())
                .some(val => val.includes(ingredient.toLowerCase()))
        );
    };

    return {
        ...toRefs(state),
        generateSandwich,
        saveSandwich,
        filterSandwiches,
        addBread,
        addCheese,
        addFilling,
        addSauce
    };
});