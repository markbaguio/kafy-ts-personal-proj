import {
  MenuProductDetailPageParamsSchema,
  MenuProductDetailPageParams,
  ProductSize,
  ProductSizeOptions,
} from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { useParams, useSearchParams } from "react-router";
import { PageNotFound } from "../PageNotFound";
import imageSkeleton from "@/assets/rewards/image-skeleton.svg";
import { useQuery } from "@tanstack/react-query";
import createProductDetailQueryOptions from "@/queryOptions/createGetProductDetailQueryOptions";
import { Minus, Plus, Star } from "lucide-react";
import { PESOSIGN } from "@/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { isValidProductSize } from "@/lib/utils";

//TODO: Fix quantityStepper change in width when then quantity > 1
//TODO: Sanitize search Params before adding to cart.

export default function MenuProductDetailPage() {
  const params = useParams<MenuProductDetailPageParams>();

  const parsedParams = MenuProductDetailPageParamsSchema.safeParse(params);

  if (parsedParams.error) {
    return <PageNotFound />;
  }

  const [searchParams, setSearchParams] = useSearchParams({
    size: "S",
    quantity: "1",
  });

  //? Derived/Computed value
  const rawSize: string = searchParams.get("size") ?? "S";
  const size: ProductSize = isValidProductSize(rawSize) ? rawSize : "S";
  const quantity = Math.max(parseInt(searchParams.get("quantity") ?? "1"), 1);
  const parsedQuantity = isNaN(quantity) ? 1 : quantity;

  function handleSizeChange(size: ProductSize) {
    searchParams.set("size", size);
    setSearchParams(searchParams);
  }

  function handleQuantityChange(quantity: number) {
    const sanitizedQuantity = Math.max(1, quantity);
    searchParams.set("quantity", sanitizedQuantity.toString());
    setSearchParams(searchParams);
  }

  // const { data } = useQuery(
  //   createProductDetailQueryOptions({
  //     product_id: parsedParams.data.product_id,
  //   })
  // );

  // console.log("ProductDetail:", data);
  function handleAddToCart({
    size,
    quantity,
  }: {
    size: string;
    quantity: number;
  }) {
    console.log(`size: ${size}`);
    const parsedQuantity = isNaN(quantity) ? "1" : quantity;
    console.log(`quantity: ${parsedQuantity}`);
  }

  const MockProductDetail = {
    id: 10,
    category: "hot",
    created_at: "2025-07-01T05:31:56.115117+00:00",
    description:
      "A flavorful chai tea latte. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image_url:
      "https://images.unsplash.com/photo-1578899952107-9c390f1af1b7?w=900",
    // null,
    is_available: false,
    name: "Chai Latte",
    price: 150,
    updated_at: null,
  };

  return (
    <div className="w-full min-h-full h-full flex flex-col gap-2 px-20 py-5 bg-off-white-2">
      <div className="flex-none h-fit bg-burnt-sienna ">Breadcrumbs</div>
      <main className="grow-1 flex flex-col bg-milky-white rounded-xl shadow-lg">
        {/** Produc Image and  settings.*/}
        <div className="flex w-full flex-row p-10 gap-10">
          <div className="rounded-lg overflow-hidden">
            <img
              src={MockProductDetail.image_url ?? imageSkeleton}
              alt="Product img"
              // width={650}
              // height={650}
              className="w-[600px] h-[700px] object-cover"
            />
          </div>
          <div className="w-1/2 p-10 flex flex-col gap-5">
            <div>
              <h1 className="text-5xl/tight font-bold">
                {MockProductDetail.name}
              </h1>
              <MockRatingComponent rating={4} />
            </div>
            <span className="text-4xl font-bold">
              {PESOSIGN}
              {MockProductDetail.price}
            </span>
            <p className="font-light text-[16px] text-justify">
              {MockProductDetail.description}
            </p>
            <ProductOptions
              size={size}
              handleSizeChange={handleSizeChange}
              handleQuantityChange={handleQuantityChange}
              quantity={parsedQuantity}
            />
            <div className="w-1/3">
              <Button
                className="w-full rounded-lg"
                variant="main"
                onClick={() =>
                  handleAddToCart({ size: size, quantity: quantity })
                }
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <div className="grow-0 flex-auto bg-burnt-sienna">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        commodi neque nostrum nobis quisquam eum aperiam deserunt ratione,
        cupiditate vel?
      </div>
    </div>
  );
}

function MockRatingComponent({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "fill-yellow  text-yellow"
              : "text-raisin-black-muted/10 fill-raisin-black-muted/10"
          }
          size={20}
        />
      ))}
      <span className="text-lg">{`(${rating})`}</span>
    </div>
  );
}

type ProductOptionsProps = {
  size: ProductSize;
  handleSizeChange: (size: ProductSize) => void;
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
};

function ProductOptions({
  size,
  handleSizeChange,
  quantity,
  handleQuantityChange,
}: ProductOptionsProps) {
  return (
    <div className="w-full border-y-1 border-raisin-black/20">
      <div className="flex gap-10 w-1/2 justify-start  py-10">
        <SizeSelector size={size} onSizeChange={handleSizeChange} />
        <QuantityStepper
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </div>
  );
}

type SizeSelectorProps = {
  size: ProductSize;
  onSizeChange: (size: ProductSize) => void;
};

function SizeSelector({ size = "S", onSizeChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-col gap-1 w-fit">
      <span className="text-lg/tight font-light">Available Size</span>
      <div className="flex items-center gap-3 h-full">
        {ProductSizeOptions.map((productSize) => (
          <Button
            key={productSize}
            className={`capitalize px-6 py-2 rounded-lg hover:bg-raisin-black hover:text-milky-white h-full ${
              size === productSize ? "bg-raisin-black text-milky-white" : ""
            }`}
            variant="outline2"
            onClick={() => onSizeChange(productSize)}
          >
            {productSize}
          </Button>
        ))}
      </div>
    </div>
  );
}

type QuantityStepperProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

function QuantityStepper({
  quantity = 1,
  onQuantityChange,
}: QuantityStepperProps) {
  return (
    <div className="flex flex-col gap-1 w-fit">
      <span className="text-lg/tight font-light">Quantity</span>
      <div
        className="flex items-center gap-3 border-1
      border-raisin-black p-2 rounded-lg"
      >
        <Button
          variant="outline2"
          className="border-none rounded-lg"
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(quantity - 1)}
        >
          <Minus width={50} />
        </Button>
        <span className="text-2xl">{quantity}</span>
        <Button
          variant="outline2"
          className="border-none rounded-lg "
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus width={50} />
        </Button>
      </div>
    </div>
  );
}
