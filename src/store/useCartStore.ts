import { CartProduct } from "@/models/types";
import { ProductSize } from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartProducts: CartProduct[];
}

interface CartActions {
  addProductToCart: (cartProduct: CartProduct) => void;
  removeProductFromCart: (productID: number) => void;
  updateCartProductQuantity: (
    productID: number,
    productSize: ProductSize,
    newQty: number
  ) => void;
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
            const baseProductPriceAtPurchase = cartProduct.unit_price;
            const newProductQuantity =
              existingProduct.quantity + cartProduct.quantity;
            const newProductPriceAtPurchase =
              baseProductPriceAtPurchase * newProductQuantity;

            updatedCartProducts[existingIndex] = {
              ...existingProduct,
              quantity: existingProduct.quantity + cartProduct.quantity,
              unit_price: newProductPriceAtPurchase,
            };

            return {
              cartProducts: updatedCartProducts,
            };
          }

          //? if the product to be added is unique, simply append it to the current
          //? cartProducts, in the state.cartProducts

          //? just send the unit price
          return {
            cartProducts: [
              ...state.cartProducts,
              {
                ...cartProduct,
                // price_at_purchase:
                //   cartProduct.price_at_purchase * cartProduct.quantity,
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

      updateCartProductQuantity: (productID, productSize, newQty) =>
        set((state) => {
          //? shallow copy the cartProducts array.
          /**
           * ? This is important because react is Immutable. React won't react to the change if you
           * ? directly mutate the original array.
           */

          const updatedCartProducts = [...state.cartProducts];

          //? get the matching cartProduct index.
          const matchingProductIndex = state.cartProducts.findIndex(
            (cartProduct) =>
              cartProduct.product_id === productID &&
              cartProduct.product_size === productSize
          );

          if (matchingProductIndex !== -1) {
            //? Get the matching product
            const matchingProduct: CartProduct =
              updatedCartProducts[matchingProductIndex];

            //? Update the quantity of the matching cart product
            updatedCartProducts[matchingProductIndex] = {
              ...matchingProduct,
              quantity: newQty,
            };

            return {
              cartProducts: [...updatedCartProducts],
            };
          }

          return {
            cartProducts: [...state.cartProducts],
          };
        }),

      clearCart: () => {
        set({ cartProducts: [] });
      },
    }),
    { name: "cart" }
  )
);
