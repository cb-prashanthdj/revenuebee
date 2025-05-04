"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../app/store/auth/useAuthStore";

// List of private root routes
const privateRoutes = ["/usages", "/dashboard"];

export const withPrivateRoutes = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithPrivateRoutes = (props: P) => {
    const { user } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Zustand hydration check
    const hasHydrated = useAuthStore.persist.hasHydrated();

    useEffect(() => {
      if (!hasHydrated) return; // Wait for hydration to complete

      const validateRoute = async () => {
        const currentRoute = window.location.pathname;

        // Check if the current route is a private route or a nested child of a private route
        const isPrivateRoute = privateRoutes.some(
          (route) =>
            currentRoute === route || currentRoute.startsWith(`${route}/`)
        );

        console.log("Hydrated user:", user);

        if (isPrivateRoute && !user) {
          // router.push("/sign-in");
          router.replace("/sign-in");
        } else {
          setLoading(false);
        }
      };

      validateRoute();
    }, [router, user, hasHydrated]);

    if (loading) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPrivateRoutes;
};
