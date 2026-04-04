import { writable } from "svelte/store";
import type { ShoppingCarProduct, ShoppingCarItem } from "$lib/components/forms/ProductForm/interfaces";
import { browser } from "$app/environment";

export const authenticated = writable(false);


const storageKey = 'shopping-cart';

function shoppingCar(){
    const { update, subscribe, set } = writable<ShoppingCarItem[]>([]);

    return {
        subscribe,
        loadStoredItems:() => {
            if (browser){
                const itemsStored = localStorage.getItem(storageKey);
                if ( itemsStored ) {
                    const json: ShoppingCarItem[] = JSON.parse(itemsStored);
                    set(json);
                }

            }
        },

        addItem: (product: ShoppingCarProduct) => {

            update(items => {
                const searchItem = items.find(item => item.product.id === product.id)
                let newItems;

                if (searchItem) {
					newItems = items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
				} else {
					newItems = [...items, { product, quantity: 1 }];
				}

				localStorage.setItem(storageKey, JSON.stringify(newItems));
				return newItems;
            })
        },

		removeItem: (productId: number) => {
			update(items => {
				const existingItem = items.find(item => item.product.id === productId);
				let newItems;

				if (existingItem && existingItem.quantity > 1) {
					newItems = items.map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
				} else {
					newItems = items.filter(item => item.product.id !== productId);
				}

				localStorage.setItem(storageKey, JSON.stringify(newItems));
				return newItems;
			});
		},

		deleteItem: (productId: number) => {
			update(items => {
				const newItems = items.filter(item => item.product.id !== productId);
				localStorage.setItem(storageKey, JSON.stringify(newItems));
				return newItems;
			});
		},

		clear: () => {
			localStorage.removeItem(storageKey);
			set([]);
		},

		getTotal: (items: ShoppingCarItem[]) => {
			return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
		}
    }
}

export const cart = shoppingCar();