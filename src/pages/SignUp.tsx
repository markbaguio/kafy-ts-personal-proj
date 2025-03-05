import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";

export default function SignUp() {
  return (
    <form className="flex flex-col justify-center items-center py-10 bg-light-caramel">
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold py-10">Create an Account</h1>
        <span className="font-bold">KAFY REWARDS</span>
        <p className="text-raisin-black text-center text-sm p-2 font-light">
          Sign up now and start earning Kaffy Coins with every purchase!
        </p>
        <Card className="flex flex-col gap-6 items-center justify-center drop-shadow-xs max-w-[400px]">
          <CardHeader className="w-full">
            <CardDescription className="flex">
              <span className="text-golden-brown text-lg mr-1">*</span>
              <p className="text-sm">indicates required field</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex gap-2 flex-col">
            <div className="flex flex-col gap-y-5 mb-6">
              <Label className="flex items-center justify-start gap-0">
                <span className="text-lg">Personal Information</span>
                <span className="text-golden-brown ml-0">*</span>
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
            <div className="flex flex-col gap-y-5">
              <Label className="flex items-center justify-start gap-0">
                <span className="text-lg">Account Security</span>
                <span className=" text-golden-brown ml-0">*</span>
              </Label>
              <Input
                id="email"
                placeholder="Email"
                type="text"
                pattern="[A-Za-z\s]+"
                required
              />
              <div className="flex flex-col gap-y-2">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  pattern="[A-Za-z\s]+"
                  required
                />
                <p className="text-xs text-start font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati odio quas praesentium provident quod, architecto
                  ipsa ipsam nostrum sed eos.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-milky-white w-full flex flex-col gap-6 items-center justify-center">
            <div className="w-full after:border-raisin-black relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t font-light">
              <span className="bg-milky-white relative z-10 px-2">
                Or sign up with
              </span>
            </div>
            <Button variant="main" className="w-full">
              <Facebook />
              Login with Facebook
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
