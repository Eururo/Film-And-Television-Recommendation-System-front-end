import { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuthContext = () => {
    const userId = useContext(AuthContext);

    if (userId === undefined) {
        throw new Error("useAuthContext can only be used inside AuthProvider");
    }

    return userId;
};