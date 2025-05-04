import React from "react";
import { Button, Input } from "cb-sting-react-ts";
import cbLogo from "@/app/assets/img/logo.svg";
import Image from "next/image";
import { GoogleSignIn } from "./GoogleSignIn";
import { User as UserType } from "@/app/models/user";

// import { User } from "../_models/User";
import { useAuthStore } from "@/app/store/auth/useAuthStore";
import { useRouter } from "next/navigation";
import { connectToDatabase } from "@/app/lib/mongodb";

export const SignInForm = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  /*async function syncUserDB(userData: any) {
    try {
      await connectToDatabase();
      console.log(userData);
      const update = {
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        role: userData.role,
        status: userData.status,
      };
      console.error("Sync user with mongodb", update);
      const filter = { email: userData.email };
      const user = await User.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });
      console.log("User sync success", user);
    } catch (error) {
      console.error("User sync error [catch]:", error);
    }
  }*/
  const handleSuccess = async (user: UserType) => {
    setUser(user);
    // syncUserDB(user);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-body">
        <div className="login-container">
          <div className="login-head">
            <Image src={cbLogo} alt="Chargebee Logo" />
            <h1 className="h5">Sign In to CB2.0</h1>
          </div>
          <div className="space-y-2">
            <Input
              iconName="user"
              inputSize="large"
              placeholder="Username"
              type="text"
              // withIcon
              fullWidth
              //   onChangeLogic={(value: string) => setEmail(value)}
              //   error={!!errors.email}
              //   messageText={errors.email}
            />
            <Input
              iconName="lockIcon"
              inputSize="large"
              placeholder="Password"
              type="password"
              // withIcon
              fullWidth
              //   onChangeLogic={(value: string) => setPassword(value)}
              //   error={!!errors.password}
              //   messageText={errors.password}
            />
            {/* {errors.form && <div className="text-red-500">{errors.form}</div>} */}
          </div>
          <div className="flex items-center">
            <div className="w-1/2">
              <a href="#" className="text-base text-neutral-500">
                Forgot password?
              </a>
            </div>
            <div className="w-1/2">
              <Button variant="primary" size="large" fullWidth>
                Sign in
              </Button>
            </div>
          </div>

          <div className="separator">
            <div className="separator-text">or</div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <GoogleSignIn onSuccess={handleSuccess} />

            <a href="#" className="text-base text-center text-neutral-500">
              Sign in with SAML single sign-on
            </a>
          </div>
        </div>
        <div>
          <p className="text-center p-8">
            New to Chargebee? <strong> Join Now</strong>.
            {/* <Link href={'/sign-up'} passHref >  <strong> Join Now</strong> </Link>. */}
          </p>
        </div>
      </div>
    </form>
  );
};
