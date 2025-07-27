import { CartProduct } from "@/models/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartProducts: CartProduct[];
}

interface CartActions {
  addProductToCart: (cartProduct: CartProduct) => void;
  removeProductFromCart: (productID: number) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartProducts: [],

      addProductToCart: (cartProduct) =>
        set((state) => {
          // cartProducts: [...state.cartProducts, cartProduct],
          //? handle existing product in the cart.
          //? if a product is already in the cart that product will be incremented/combined.

          //? if the product to be added is already in the cart.
          //? the cartProduct in this case. The quantity of the existing product in the cart
          //? will be added with the cartProduct.quantity.

          //? check if the product with the same size and product_id exist in the cart.
          const existingIndex = state.cartProducts.findIndex(
            (product) =>
              product.product_id === cartProduct.product_id &&
              product.product_size === cartProduct.product_size
          );

          //? if the product is already existing. Increment it's quantity.
          //? .findByIndex returns -1 if no elements satisfy the condition.
          if (existingIndex !== -1) {
            //? create a copy of the current cartProducts.
            //? update the copy of the current cartProducts.
            const updatedCartProducts = [...state.cartProducts];

            //? get the existing Product
            const existingProduct = updatedCartProducts[existingIndex];

            //? calculate new product quantity and price_at_purchase
            const baseProductPriceAtPurchase = cartProduct.price_at_purchase;
            const newProductQuantity =
              existingProduct.quantity + cartProduct.quantity;
            const newProductPriceAtPurchase =
              baseProductPriceAtPurchase * newProductQuantity;

            updatedCartProducts[existingIndex] = {
              ...existingProduct,
              quantity: existingProduct.quantity + cartProduct.quantity,
              price_at_purchase: newProductPriceAtPurchase,
            };

            return {
              cartProducts: updatedCartProducts,
            };
          }

          //? if the product to be added is unique, simply append it to the current
          //? cartProducts, in the state.cartProducts
          return {
            cartProducts: [
              ...state.cartProducts,
              {
                ...cartProduct,
                price_at_purchase:
                  cartProduct.price_at_purchase * cartProduct.quantity,
              },
            ],
          };
        }),

      removeProductFromCart: (productID) =>
        set((state) => ({
          cartProducts: state.cartProducts.filter(
            (product) => product.product_id !== productID
          ),
        })),

      clearCart: () => {
        set({ cartProducts: [] });
      },
    }),
    { name: "cart" }
  )
);
