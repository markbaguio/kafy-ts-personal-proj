import { render } from "@testing-library/react";
import { useCartStore } from "@/store/useCartStore";

// mock zustand cart store
// mock zustand store

describe("Checkout Page", () => {
  it("disables the place order if there are no products in cart.", () => {
    // useCartStore.setState({
    //   cartProducts: [
    //     {
    //       img_url: "",
    //       product_category: "hot",
    //       product_id: 1,
    //       product_name: "test",
    //       product_size: "L",
    //       quantity: 2,
    //       unit_price: 100,
    //     },
    //   ],
    // });
    console.log(useCartStore.getState().cartProducts);
  });
});
