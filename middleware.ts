import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },

        set(name: string, value: string) {
          request.cookies.set({
            name,
            value,
          });

          response = NextResponse.next({
            request,
          });

          response.cookies.set({
            name,
            value,
          });
        },

        remove(name: string) {
          request.cookies.set({
            name,
            value: "",
          });

          response = NextResponse.next({
            request,
          });

          response.cookies.set({
            name,
            value: "",
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("MIDDLEWARE SESSION", session);

  if (!session && request.nextUrl.pathname.startsWith("/todos")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/todos/:path*"],
};
