import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

const PUBLIC_ROUTES = ["/login", "/reset-password", "/forgot-password"];
const PRIVATE_ROUTES = [
  "/dashboard",
  "/form",
  //"/thankyou-order",
  "/settings",
  "/settings/approval-workflows",
  "/settings/community",
  "/settings/notifications",
  "/settings/finance",
  "/settings/general-settings",
  "/settings/notifications",
  "/settings/policies",
  "/settings/security",
  "/settings/setup",
  "/settings/templates",
  "/settings/support-tickets",
  "/settings/plans-and-products",
  "/settings/inventory",
  "/settings/inventory/meeting-rooms",
  "/settings/inventory/closed-offices",
  "/settings/inventory/desks",
  "/settings/inventory/event-spaces",
  "/settings/inventory/floor-plans",
  "/settings/inventory/locations",
  "/settings/inventory/lockers",
];

export function withAuthMiddleware(
  middleware: CustomMiddleware
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const currentUser: any = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);
    const isPrivateRoute = PRIVATE_ROUTES.includes(request.nextUrl.pathname);

    if (currentUser?.accessToken && isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!currentUser && isPrivateRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return middleware(request, event, response);
  };
}
