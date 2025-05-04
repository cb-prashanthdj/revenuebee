import { Button } from "cb-sting-react-ts";
import React, { useState } from "react";
import googleLogo from "@/app/assets/img/google.png";
import Image from "next/image";

import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { User } from "@/app/models/user";
import FullPageLoader from "@/components/ui/FullPageLoader";

const GoogleSignIn = ({ onSuccess }: { onSuccess: (user: User) => void }) => {
  const [loading, setLoading] = useState(false);
  const googleSignInHandler = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = {
        id: result.user.uid,
        email: result.user?.email ?? "",
        displayName: result.user?.displayName ?? "",
        photoURL: result.user?.photoURL ?? "",
        role: "user",
        status: "active",
      };
      onSuccess(user);
      setLoading(false);
      // await signInWithGoogle();
    } catch (error: any) {
      // setErrors({ form: parseErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <Button
        type="button"
        variant={"neutral"}
        size="large"
        fullWidth
        onClick={googleSignInHandler}
      >
        Sign in with Google
        <Image src={googleLogo} alt="Google Logo" />
      </Button>
    </>
  );
};

export { GoogleSignIn };
