import {
  cn,
  handleZodApiFieldErrors,
  isAuthApiErrorResponse,
  isZodApiErrorResponse,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SignInPayload, signInUser } from "@/services/authServiceApi";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/models/ApiResponse";
import { AxiosErrorCode } from "@/constants";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router";
import { UserSignInSchema } from "@/schemas/auth/UserSignInFormSchema";
import Loading from "./loading";

// const UserSignInSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(1, "Password is required"),
//   // email: z.string(),
//   // password: z.string(),
// });

export type UserSignInFormType = z.infer<typeof UserSignInSchema>;

// TODO: Make the SignInErrorFallback beautiful.

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserSignInFormType>({
    resolver: zodResolver(UserSignInSchema),
  });
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (response) => {
      const profile = response.data; // Assuming ApiResponse has a 'data' property containing the Profile
      // useProfileStore.getState().updateProfile(profile!);
      useAuthStore.setState({ profile });
      //? on successful login; redirect to homepage.
      navigate("/");
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
          const fieldErrors = error.errorDetails?.fieldErrors;
          if (error.errorDetails?.formErrors.length !== 0) {
            console.error(error.errorDetails?.formErrors);
            setError("root", {
              type: "manual",
              message: `${error.errorDetails?.formErrors[0]}`,
            });
          }
          if (fieldErrors) {
            // Object.entries(fieldErrors).forEach(([field, messages]) => {
            //   if (messages.length > 0) {
            //     setError(field as keyof SignInPayload, {
            //       type: "manual",
            //       message: messages[0],
            //     });
            //   }
            // });
            handleZodApiFieldErrors(fieldErrors, setError);
          }
        }
      } else if (error instanceof Error) {
        showBoundary(error);
      }
    },
  });

  const onSubmit: SubmitHandler<SignInPayload> = async (
    data: UserSignInFormType
  ) => {
    signInMutation.mutate(data);
  };

  if (signInMutation.isPending) {
    return <Loading text="Signing in..." />;
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-raisin-black">
          Login to your account
        </h1>
        <p className="text-sm text-balance text-raisin-black">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-raisin-black">
            Email
          </Label>
          <div className="flex flex-col gap-y-1">
            <Input
              {...register("email")}
              id="email"
              // type="email"
              className="border-raisin-black placeholder:text-raisin-black"
              placeholder="Email"
              autoComplete="username"
            />
            {errors.email && (
              <p className="text-destructive text-[12px] text-start">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgotpassword"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="flex flex-col gap-y-1">
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="border-raisin-black placeholder:text-raisin-black"
            />
            {errors.password && (
              <p className="text-destructive text-[12px] text-start">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        {errors.root && (
          <p className="text-destructive text-[12px] text-start">
            {errors.root.message}
          </p>
        )}
        <Button
          data-testid="login-button"
          disabled={isSubmitting}
          type="submit"
          variant="main"
          className="w-full"
        >
          Login
        </Button>
        <div className="after:border-raisin-black relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className=" bg-light-caramel relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <Facebook />
          Login with Facebook
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
