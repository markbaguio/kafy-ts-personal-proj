import {
  MenuProductDetailPageParamsSchema,
  MenuProductDetailPageParams,
  ProductSize,
  ProductSizeOptions,
} from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { Link, useParams } from "react-router";
import { PageNotFound } from "../PageNotFound";
import imageSkeleton from "@/assets/rewards/image-skeleton.svg";
import { Minus, Plus, Star } from "lucide-react";
import { MockExtendedDescription, PESOSIGN } from "@/constants";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, isValidProductSize } from "@/lib/utils";
import useMenuDetailPageSearchParams from "@/hooks/useMenuPageDetailSearchParams";
import { useQuery } from "@tanstack/react-query";
import createProductDetailQueryOptions from "@/queryOptions/createGetProductDetailQueryOptions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

//TODO: Fix quantityStepper change in width when then quantity > 1

export default function MenuProductDetailPage() {
  const params = useParams<MenuProductDetailPageParams>();

  const parsedParams = MenuProductDetailPageParamsSchema.safeParse(params);

  if (parsedParams.error) {
    return <PageNotFound />;
  }

  const {
    quantity: quantityParam,
    size: sizeParam,
    setSearchParams,
  } = useMenuDetailPageSearchParams();

  console.log(`quantity: ${quantityParam} size: ${sizeParam}`);

  //? Derived/Computed value
  const rawSize: string = sizeParam;
  const size: ProductSize = isValidProductSize(rawSize) ? rawSize : "S";
  const quantity = Math.max(parseInt(quantityParam ?? "1"), 1);
  const parsedQuantity = isNaN(quantity) ? 1 : quantity;

  function handleSizeChange(size: ProductSize) {
    setSearchParams({ size: size, quantity: quantityParam });
  }

  function handleQuantityChange(quantity: number) {
    const sanitizedQuantity = Math.max(1, quantity).toString();
    setSearchParams({ size: sizeParam, quantity: sanitizedQuantity });
  }

  const { data } = useQuery(
    createProductDetailQueryOptions({
      product_id: parsedParams.data.product_id,
    })
  );

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

  // const MockProductDetail = {
  //   id: 10,
  //   category: "hot",
  //   created_at: "2025-07-01T05:31:56.115117+00:00",
  //   description:
  //     "A flavorful chai tea latte. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   image_url:
  //     "https://images.unsplash.com/photo-1578899952107-9c390f1af1b7?w=900",
  //   // null,
  //   is_available: false,
  //   name: "Chai Latte",
  //   price: 150,
  //   updated_at: null,
  // };

  return (
    <div className="w-full min-h-full h-full flex flex-col gap-2 py-5 px-20 bg-off-white-2/50">
      <div className="flex-none h-fit py-5">
        <MenuDetailPageBreadcrumb
          category={data?.data?.category ?? "hot"}
          name={data?.data?.name ?? ""}
        />
      </div>
      <main className="grow-1 flex flex-col bg-milky-white rounded-xl shadow-lg">
        {/** Product Image and  settings.*/}
        <div className="flex w-full flex-row p-10 gap-10">
          <div className="rounded-lg overflow-hidden">
            <img
              src={data?.data?.image_url ?? imageSkeleton}
              alt="Product img"
              className="w-[600px] h-[700px] object-cover"
            />
          </div>
          <div className="w-1/2 p-10 flex flex-col gap-5">
            <div>
              <h1 className="text-5xl/tight font-bold">{data?.data?.name}</h1>
              <MockRatingComponent rating={4} />
            </div>
            <span className="text-4xl font-bold">
              {PESOSIGN}
              {data?.data?.price}
            </span>
            <p className="font-light text-[16px] text-justify">
              {data?.data?.description}
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
      {/** Mock extended general description*/}
      <div className="grow-0 p-10 flex-auto flex gap-5 bg-light-caramel/80 rounded-xl shadow-lg font-light">
        <div className="w-1/2 flex flex-col gap-5">
          <p className="text-justify text-black-coffee">
            {MockExtendedDescription}
          </p>
          <Button className="w-fit" variant="outline">
            <Link to={"/about-us"}>More info</Link>
          </Button>
        </div>
        <div className="mx-auto my-auto">
          <span className="border-2 p-5 text-2xl rounded-lg border-golden-brown text-golden-brown">
            {(data?.data?.price ?? 100) / 10} Kafy points item
          </span>
        </div>
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

type MenuDetailPageBreadcrumbProps = {
  category: string;
  name: string;
};

function MenuDetailPageBreadcrumb({
  category,
  name,
}: MenuDetailPageBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg text-raisin-black-muted">
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-golden-brown" href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-golden-brown" href="/menu">
            Menu
          </BreadcrumbLink>
        </BreadcrumbItem>
        {category && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="hover:text-golden-brown" asChild>
                <Link to={`/menu?category=${category}&page=1`}>
                  {capitalizeFirstLetter(category)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {name && (
          <>
            {/* <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="font-medium text-golden-brown">{name}</span>
            </BreadcrumbItem> */}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// const MenuDetailPageBreadcrumb = memo(function MenuDetailPageBreadcrumb({
//   category,
//   name,
// }: MenuDetailPageBreadcrumbProps) {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList className="text-lg text-raisin-black-muted">
//         <BreadcrumbItem>
//           <BreadcrumbLink className="hover:text-golden-brown" href="/">
//             Home
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink className="hover:text-golden-brown" href="/menu">
//             Menu
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         {category && (
//           <>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink className="hover:text-golden-brown" asChild>
//                 <Link to={`/menu?category=${category}&page=1`}>
//                   {capitalizeFirstLetter(category)}
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//           </>
//         )}
//         {name && (
//           <>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <span className="font-medium text-golden-brown">{name}</span>
//             </BreadcrumbItem>
//           </>
//         )}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// });

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
