import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Error from "../../components/ui/Error";
import UserList from "../../components/ui/UserList";
import NavLogo from "../../utils/NavLogo";
import UseLogin from "./UseLogin";

export default function Login() {
  const {
    setEmail,
    setPassword,
    error,
    handleSubmit,
    isLoading,
    email,
    password,
  } = UseLogin();
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <NavLogo />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-3">
                <Input
                  variant="standard"
                  type="email"
                  color="blue"
                  label="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  variant="standard"
                  color="blue"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                color="green"
                type="submit"
                disabled={isLoading || email === "" || password.length < 4}
              >
                Sign in
              </Button>
            </div>

            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </div>
      <UserList />
    </div>
  );
}
