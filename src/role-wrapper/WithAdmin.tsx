// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import { ReactNode } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { verifyToken } from "@/utils/verifyToken";
// import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
// import Loading from "@/components/ui/core/Loading/Loading";

// const WithAdmin = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [loading, setLoading] = useState(true); // Loading state
//   const token = useAppSelector(selectCurrentToken); // Check for token
//   const user: any | null = token ? verifyToken(token) : null;

//   useEffect(() => {
//     if (!token) {
//       dispatch(logout());
//       router.replace("/login"); // Redirect if not authenticated
//     } else if (user && user.role !== "ADMIN") {
//       dispatch(logout());
//       router.replace("/login");
//     } else {
//       setLoading(false); // Stop loading once authenticated
//     }
//   }, [router, token, user, dispatch]);

//   if (loading) {
//     return <Loading />;
//   }

//   return children; // Render the children if authenticated
// };

// export default WithAdmin;

"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import Loading from "@/components/ui/core/Loading/Loading";

const WithRole = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const [loading, setLoading] = useState(true);

  const user: any | null = token ? verifyToken(token) : null;

  useEffect(() => {
    if (!token || !user) {
      dispatch(logout());
      router.replace("/login");
    } else if (!allowedRoles.includes(user.role)) {
      dispatch(logout());
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [dispatch, token, user, router, allowedRoles]);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default WithRole;
