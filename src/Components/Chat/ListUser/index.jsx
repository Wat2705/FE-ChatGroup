import { useSelector } from "react-redux";
import AccountItem from "../AccountItem";

export default function ListUser(props) {
    const userList = useSelector(state => state.chat.userList)

    return (
        <>
            {userList?.map((item, index) => (
                <AccountItem
                    title={item.name}
                    time={"10:57"}
                    img={"https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg"}
                    lastMsg={item.email}
                    isShowMenu={props.isShowMenu}
                    isClickable={props.isClickable}
                    key={index}
                />
            ))}
        </>
    )
}