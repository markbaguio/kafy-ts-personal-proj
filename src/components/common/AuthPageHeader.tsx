import { Link } from "react-router";
import Logo from "./Logo";

export default function AuthPageHeader() {
  return (
    <header
      data-testid="auth-header"
      className="w-full bg-off-white shadow-md px-4 py-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/** LOGO */}
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
}
