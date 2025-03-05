import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  return (
    <form className="flex flex-col justify-center items-center py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold py-10">Create an Account</h1>
        <span className="font-bold">KAFY REWARDS</span>
        <p className="text-raisin-black text-center text-sm p-2 font-light">
          Sign up now and start earning Kaffy Coins with every purchase!
        </p>
        <Card className="flex flex-col items-center justify-center drop-shadow-xs min-w-[400px]">
          <CardHeader className="w-full">
            <CardDescription className="flex">
              <span className="text-golden-brown text-lg mr-1">*</span>
              <p className="text-sm">indicates required field</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex gap-2 flex-col">
            <div className="flex flex-col gap-y-2">
              <Label className="flex items-center justify-start gap-0">
                <span className="">Personal Information</span>
                <span className=" text-golden-brown ml-0">*</span>
              </Label>
              <Input
                id="firstname"
                placeholder="First name"
                type="text"
                pattern="[A-Za-z\s]+"
                required
              />
              <Input
                id="lastname"
                placeholder="Last name"
                type="text"
                pattern="[A-Za-z\s]+"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
