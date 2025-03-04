import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h1 className="text-3xl font-bold py-10">Create an Account</h1>
      <span className="font-bold">KAFY REWARDS</span>
      <p className="text-raisin-black text-center text-sm p-5 font-light">
        Sign up now and start earning Kaffy Coins with every purchase!
      </p>
      <Card className="flex flex-col items-center justify-center drop-shadow-xs min-w-[500px]">
        <CardHeader className="w-full">
          {/* <CardTitle>Card Title</CardTitle> */}
          <CardDescription className="flex">
            <span className="text-golden-brown text-sm mr-1">*</span>
            <p>indicates required field</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex gap-2 flex-col">
          <label htmlFor="name" className="font-semibold text-lg">
            Name
          </label>
          <Input placeholder="Name" />
          <Input />
          <Input />
          <Input />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
