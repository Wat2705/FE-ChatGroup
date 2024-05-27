import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRouter(props) {
    const isLogIn = useSelector(state => state.auth.isLogIn)

    if (!isLogIn) {
        return <Navigate to='/login'></Navigate>
    }

    return props.children

}