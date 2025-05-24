import { useSelector } from "react-redux";
import isAdmin from "../utils/IsAdmin";

function AdminPermission({ children }) {
  const user = useSelector((state) => state.user);
  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <p className="text-red-500 bg-red-100 p-4">Do not have permision</p>
      )}
    </>
  );
}

export default AdminPermission;
