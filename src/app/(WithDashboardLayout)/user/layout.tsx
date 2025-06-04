import WithRole from "@/role-wrapper/WithAdmin";
import { ReactNode } from "react";

const UserDashboard = ({ children }: { children: ReactNode }) => {
  return <WithRole allowedRoles={["STUDENT"]}>{children}</WithRole>;
};

export default UserDashboard;
