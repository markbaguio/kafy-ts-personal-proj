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
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UserSignUpFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(25, "Password must not exceed 25 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowecase letter."),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UserSignUpFormType = z.infer<typeof UserSignUpFormSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpFormType>({
    resolver: zodResolver(UserSignUpFormSchema),
  });

  const onSubmit: SubmitHandler<UserSignUpFormType> = (
    data: UserSignUpFormType
  ) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col justify-center items-center py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="text-center flex flex-col justify-center items-center
      "
      >
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
              <div className="flex flex-col gap-y-1">
                <Input
                  {...register("firstName")}
                  id="firstName"
                  placeholder="First name"
                  type="text"
                  className={
                    errors.firstName
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  }
                  // pattern="[A-Za-z\s]+"
                  // required
                />
                {errors.firstName && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-1">
                <Input
                  {...register("lastName")}
                  id="lastname"
                  placeholder="Last name"
                  type="text"
                  className={
                    errors.lastName
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  }
                  // pattern="[A-Za-z\s]+"
                  // required
                />
                {errors.lastName && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <Label className="flex items-center justify-start gap-0">
                <span className="text-lg">Account Security</span>
                <span className=" text-golden-brown ml-0">*</span>
              </Label>
              <div className="flex flex-col gap-y-1">
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="Email"
                  type="text"
                  className={
                    errors.email
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  }
                  // pattern="[A-Za-z\s]+"
                  // required
                />
                {errors.email && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-1">
                <Input
                  {...register("password")}
                  id="password"
                  placeholder="Password"
                  type="password"
                  className={
                    errors.password
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  }
                  // pattern="[A-Za-z\s]+"
                  // required
                />
                {errors.password && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.password.message}
                  </p>
                )}
                <p className="text-xs text-start font-light">
                  Create a password 8 to 25 characters long that includes at
                  least 1 uppercase and 1 lowecase letter
                </p>
              </div>
              <div className="flex flex-col gap-y-1">
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  className={
                    errors.confirmPassword
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  }
                  // pattern="[A-Za-z\s]+"
                  // required
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button variant="main" type="submit">
              Create Account
            </Button>
          </CardContent>
          <CardFooter className="bg-milky-white w-full flex flex-col gap-6 items-center justify-center">
            <div className="w-full after:border-raisin-black/30 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t font-light">
              <span className="bg-milky-white relative z-10 px-2">
                Or sign up with
              </span>
            </div>
            <Button variant="outline" className="w-full">
              <Facebook />
              Facebook
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
