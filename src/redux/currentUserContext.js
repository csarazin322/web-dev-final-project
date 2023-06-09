import { profileThunk } from "../sercives/user/user-thunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CurrentUserContext({ children }) {
    const dispatch = useDispatch();
    // const getProfile = async () => {
    //     await dispatch(profileThunk());
    // };
    useEffect(() => {
        dispatch(profileThunk())
    });

    return children;
}

export default CurrentUserContext;