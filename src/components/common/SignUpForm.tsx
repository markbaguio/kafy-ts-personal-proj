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
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/services/authServiceApi";
import { AxiosErrorCode } from "@/constants";
import { ApiErrorResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import { useProfileStore } from "@/store/useProfileStore";
import { toast } from "sonner";
import {
  cn,
  handleZodApiFieldErrors,
  isAuthApiErrorResponse,
  isZodApiErrorResponse,
} from "@/lib/utils";
import { useErrorBoundary } from "react-error-boundary";

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
      .regex(/[a-z]/, "Password must contain at least one lowercase letter."),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// const UserSignUpFormSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string(),
//   password: z.string(),
//   confirmPassword: z.string(),
// });

//TODO: Try to use ul and li for the password errors/requirements instead of p tag
//TODO: Or just use .split to split the string into an array and map through it to create a list of errors

export type UserSignUpFormType = z.infer<typeof UserSignUpFormSchema>;

export default function SignUpForm() {
  // const { passwordErrors, setPasswordErrors } = useState<string[]>(undefined);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserSignUpFormType>({
    resolver: zodResolver(UserSignUpFormSchema),
    mode: "onChange",
  });

  const { showBoundary } = useErrorBoundary();

  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (response) => {
      if (response.data) {
        const profile: Profile = response.data;
        // Use the profile variable here if needed
        useProfileStore.getState().updateProfile(profile);
        //? on successful login; redirect to homepage.
        navigate("/");
      }
    },
    onError: (error) => {
      if (error instanceof ApiErrorResponse) {
        if (error.errorName === AxiosErrorCode.NetworkError) {
          toast.warning(`${error.message}`);
          return;
        }
        if (isAuthApiErrorResponse(error)) {
          setError("root", { type: "manual", message: error.message });
          console.error(error);
          return;
        } else if (isZodApiErrorResponse(error)) {
          const formErrors = error.errorDetails?.formErrors;
          const fieldErrors = error.errorDetails?.fieldErrors;
          // console.error("miau", fieldErrors);
          error.errorDetails?.fieldErrors;
          console.log("miau", fieldErrors);
          if (formErrors && formErrors.length !== 0) {
            setError("root", { type: "manual", message: formErrors[0] });
            return;
          }
          if (fieldErrors) {
            handleZodApiFieldErrors(fieldErrors, setError);
            return;
          }
        }
      } else if (error instanceof Error) {
        showBoundary(error);
      }
    },
  });

  const onSubmit: SubmitHandler<UserSignUpFormType> = async (
    data: UserSignUpFormType
  ) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log(data);
    signUpMutation.mutateAsync(data);
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
                  className={cn(
                    errors.firstName
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  )}
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
                  className={cn(
                    errors.lastName
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  )}
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
                  autoComplete="username"
                  className={cn(
                    errors.email
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  )}
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
                  autoComplete="new-password"
                  className={cn(
                    errors.password
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  )}
                />
                {/* {errors.password && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.password.message}
                  </p>
                )} */}
                {errors.password &&
                  errors.password.message?.split(",").map((error, index) => (
                    <ul>
                      <li
                        key={index}
                        className="text-destructive text-[12px] text-start"
                      >
                        {error}
                      </li>
                    </ul>
                  ))}
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
                  autoComplete="new-password"
                  className={cn(
                    errors.confirmPassword
                      ? "focus-visible:border-destructive focus-visible:ring-destructive"
                      : "focus-visible:border-success-green focus-visible:ring-success-green"
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-[12px] text-start">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button disabled={isSubmitting} variant="main" type="submit">
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
