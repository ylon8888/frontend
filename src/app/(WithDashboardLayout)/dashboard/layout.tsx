import WithRole from "@/role-wrapper/WithAdmin";
import { ReactNode } from "react";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return <WithRole allowedRoles={["ADMIN"]}>{children}</WithRole>;
};

export default AdminDashboard;
