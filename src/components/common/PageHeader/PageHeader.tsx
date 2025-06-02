import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../Logo.tsx";
import { Button } from "../../ui/button.tsx";
import { Locate, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { LARGE_SCREEN } from "@/lib/constants.ts";
import { useProfileStore } from "@/store/useProfileStore.ts";
import { AUTH_SIGN_IN, AUTH_SIGN_UP } from "@/constants.ts";
import { useMutation } from "@tanstack/react-query";
import { signOutUser } from "@/services/authServiceApi.ts";
import { toast } from "sonner";

//? Setup unit and integration test.

type navItemType = {
  name: string;
  path: string;
};

const navItems: navItemType[] = [
  { name: "HOME", path: "/" },
  { name: "MENU", path: "/menu" },
  { name: "REWARDS", path: "/rewards" },
  { name: "GIFT CARDS", path: "/gift" },
];

export default function PageHeader() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const profile = useProfileStore((state) => state.profile);
  console.log(profile);

  const signOutMutation = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      //? on successful sign out; redirect to homepage.
      navigate("/auth/signin");
      useProfileStore.getState().deleteProfile();
      toast.success("Successfully signed out.");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > LARGE_SCREEN) {
        setSheetOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header
        data-testid="page-header"
        className="w-full bg-off-white shadow-md px-4 py-0"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-[70px]">
            {/** LOGO */}
            <Link to="/">
              <Logo />
            </Link>
            {/** DESKTOP NAVBAR */}
            <nav className="hidden lg:flex gap-6">
              {navItems.map((navItem) => (
                <NavLink
                  key={navItem.path}
                  to={navItem.path}
                  className={({ isActive }) =>
                    `relative py-5 text-xs lg:text-sm font-semibold text-nowrap 
                    after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] 
                    after:bg-golden-brown after:scale-x-0 after:transition-transform after:duration-300 
                    ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`
                  }
                >
                  {navItem.name}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="hidden lg:flex flex-row gap-3">
            <Button asChild variant="ghost" className="flex items-center gap-0">
              <Link to="/storelocator">
                <Locate className="w-5 h-5 mr-2" />
                Store Locator
              </Link>
            </Button>
            {profile === null ? (
              <div className="flex gap-2">
                <Button variant="outline">
                  <Link to={AUTH_SIGN_IN}>Sign in</Link>
                </Button>
                <Button variant="main">
                  <Link to={AUTH_SIGN_UP}>Join now</Link>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  data-testid="profile-button"
                  onClick={() => {
                    console.log("profile");
                  }}
                  variant="main"
                >
                  <User />
                </Button>
                <Button
                  data-testid="signout-button"
                  onClick={() => {
                    signOutMutation.mutate();
                  }}
                  variant="outline2"
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>

          {/** Mobile view */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-full" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`bg-off-white border-none`}>
              <SheetTitle hidden />
              <SheetDescription hidden />
              <div className="flex flex-col px-2">
                {navItems.map((navItem) => (
                  <NavLink
                    key={navItem.path}
                    to={navItem.path}
                    className="py-5 px-5 text-xl font-semibold hover:text-royal-brown"
                  >
                    {navItem.name}
                  </NavLink>
                ))}
                <hr className="border-raisin-black my-5" />
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="flex justify-start gap-0"
                  >
                    <Link to="/storelocator">
                      <Locate className="w-5 h-5 mr-2" />
                      Store Locator
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/auth/signin">Sign in</Link>
                  </Button>
                  <Button variant="main">
                    <Link to="/auth/signup">Join now</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
