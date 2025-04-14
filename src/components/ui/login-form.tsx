import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook } from "lucide-react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SignInPayload, signInUser } from "@/services/authServiceApi";
import { useProfileStore } from "@/store/useProfileStore";
import { toast } from "sonner";

const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type UserSignInFormType = z.infer<typeof UserSignInSchema>;

// TODO: implement error handling.

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

  const signInMutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (response) => {
      const profile = response.data; // Assuming ApiResponse has a 'data' property containing the Profile
      useProfileStore.getState().updateProfile(profile!);
    },
    onError: (error) => {
      if (error.message == "Network Error") {
        toast.warning("Network Error. Please check your connection");
        return;
      }
    },
  });

  const onSubmit: SubmitHandler<SignInPayload> = async (
    data: UserSignInFormType
  ) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log(data);
    const response = signInMutation.mutate(data);

    // try {
    //   const result = await signInUser(data.email, data.password);

    //   if (result) {
    //     const display_name: string =
    //       result.user?.user_metadata?.display_name || "User";
    //     toast(`Welcome back ${display_name}`);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   if (isAuthApiError(error)) {
    //     const processedErrorMessage: string = getAuthApiErrorMessage(error);
    //     setError("root", {
    //       type: "manual",
    //       message: `${processedErrorMessage}`,
    //     });
    //     console.error(error);
    //   } else if (isAuthRetryableFetchError(error)) {
    //     setError("root", {
    //       type: "manual",
    //       message: `Network Error. Please check your connection.`,
    //     });
    //     console.error(error);
    //   } else if (error instanceof Error) {
    //     setError("root", { type: "manual", message: `An error occurred` });
    //     console.error(error);
    //   }
    // }
  };

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
              type="email"
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
