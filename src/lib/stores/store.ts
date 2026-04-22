import { derived, writable } from "svelte/store";
import type { ShoppingCarProduct, ShoppingCarItem } from "$lib/components/forms/ProductForm/interfaces";
import { browser } from "$app/environment";

export const authenticated = writable(false);


const storageKey = 'shopping-cart';

function shoppingCar(){
    const { update, subscribe, set } = writable<ShoppingCarItem[]>([]);

	if (browser) {
		const stored = localStorage.getItem(storageKey);
		if (stored) {
			try {
				const items = JSON.parse(stored);
				set(items);
			} catch (e) {
				console.error('Error parsing cart from localStorage', e);
				set([]);
			}
		}
	}


	function persist(items: ShoppingCarItem[]) {
        if (browser) {
            localStorage.setItem(storageKey, JSON.stringify(items));
        }
    }

    return {
        subscribe,

		loadStoredItems: () => {
			if (browser) {
				const itemsStored = localStorage.getItem(storageKey);
				if (itemsStored) {
					try {
						const json: ShoppingCarItem[] = JSON.parse(itemsStored);
						set(json);
					} catch (e) {
						console.error('Error parsing cart', e);
					}
				} else {
					set([]);
				}
			}
		},

        addItem: (product: ShoppingCarProduct) => {
            update(items => {
                let newItems: ShoppingCarItem[];
                const productIndex = items.findIndex(
                    item => item.product.id === product.id && item.product.size_id === product.size_id
                );
                
                if (productIndex !== -1) {
                    newItems = [...items];
                    newItems[productIndex] = { ...newItems[productIndex], quantity: newItems[productIndex].quantity + 1 };
                } else {
                    newItems = [...items, { product, quantity: 1 }];
                }
                
                persist(newItems);
                return newItems;
            });
        },			

		removeItem: (productId: number, sizeId: number) => {
			update(items => {
				let newItems: ShoppingCarItem[];
				const existingItem = items.find(item => item.product.id === productId && item.product.size_id == sizeId);				

				if (existingItem && existingItem.quantity > 1) {
					newItems = items.map(item => 
						item.product.id === productId && item.product.size_id == sizeId ? { ...item, quantity: item.quantity - 1 } : item);
				} else {
					newItems = items.filter(item => !(item.product.id === productId && item.product.size_id == sizeId));
				}
				
				persist(newItems);
				return newItems;
			});
		},
		
		deleteItem: (productId: number, sizeId: number) => {
			update(items => {
				const newItems = items.filter(item => !(item.product.id === productId && item.product.size_id == sizeId));

				persist(newItems);
				return newItems;
			});
		},		

		clear: () => {
			if (browser) {
				localStorage.removeItem(storageKey);
			}
			set([]);
		},


		getProductsIds: (items: ShoppingCarItem[]) => {
			return items.map(item => item.product.id);
		},

		getTotal: (items: ShoppingCarItem[] = []) => {
			return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
		},

		getTotal2: (items: ShoppingCarItem[] = []) => {
			if (!Array.isArray(items)) return 0;

			return items.reduce((sum, item) => {
				const price = item.product.price ?? 0;
				const qty = item.quantity ?? 0;
				return sum + price * qty;
			}, 0);
		}
    }
}

export const cart = shoppingCar();

export const cartTotal = derived(cart, $cart => {
  	return $cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

