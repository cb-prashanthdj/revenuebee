"use client";

import React from "react";

import BaseLayout from "@/components/layout/BaseLayout";
import { usePathname } from "next/navigation";

interface RoutePattern {
  path: string;
  dynamic?: boolean;
}

const matchRoute = (pathname: string, pattern: RoutePattern): boolean => {
  const patternParts = pattern.path.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  if (!pattern.dynamic && patternParts.length !== pathParts.length) {
    return false;
  }

  if (pattern.dynamic && pathParts.length !== patternParts.length + 1) {
    return false;
  }

  return patternParts.every((part, index) => {
    if (part.startsWith("[") && part.endsWith("]")) {
      return true; // Dynamic segment matches anything
    }
    return part === pathParts[index];
  });
};

const Billinglayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define routes that should bypass this layout
  const bypassRoutes: RoutePattern[] = [
    { path: "/billing/customers/", dynamic: true },
    { path: "/billing/subscriptions/", dynamic: true },
    { path: "/billing/payment-gateway" },
    { path: "/billing/home" },
    { path: "/billing/payment-gateway/", dynamic: true },
    { path: "/billing/payment-gateway/payments-orchestration" },
    { path: "/billing/payment-gateway/payments-orchestration/", dynamic: true },
    {
      path: "/billing/payment-gateway/payments-orchestration/optimise-payment-method",
    },
    {
      path: "/billing/payment-gateway/payments-orchestration/optimise-payment-method/",
      dynamic: true,
    },
    {
      path: "/billing/payment-gateway/payments-orchestration/validation-verification",
    },
    {
      path: "/billing/payment-gateway/payments-orchestration/validation-verification/",
      dynamic: true,
    },
    { path: "/billing/payment-gateway/payments-orchestration/smart-routing" },
    {
      path: "/billing/payment-gateway/payments-orchestration/smart-routing/",
      dynamic: true,
    },
    // { path: '/billing/usages' },
    { path: "/billing/usages/metrics/", dynamic: true },
    { path: "/billing/usages/metrics" },
    { path: "/billing/usages/metrics/create" },
    { path: "/billing/usages/metrics/details/dashboard" },
    { path: "/billing/usages/metrics/details/analytics" },

    { path: "/billing/usages/", dynamic: true },

    { path: "/billing/product-catalog" },
    { path: "/billing/product-catalog/plans" },
    { path: "/billing/approvals" },
    { path: "/billing/configure-chargebee", dynamic: true },
  ];

  // Check if current path should bypass the layout
  const shouldBypassLayout = bypassRoutes.some((route) =>
    matchRoute(pathname, route)
  );

  if (shouldBypassLayout) {
    return children;
  }

  return (
    <React.Fragment>
      <BaseLayout>{children}</BaseLayout>
    </React.Fragment>
  );
};

export default Billinglayout;
