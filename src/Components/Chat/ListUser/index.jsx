import { useSelector } from "react-redux";
import AccountItem from "../AccountItem";
import dayjs from "dayjs";

export default function ListUser(props) {
    const userList = useSelector(state => state.chat.userList)

    return (
        <>
            {userList?.map((item) => (
                <AccountItem
                    title={item.user.name}
                    time={dayjs(item.created_at).format('hh:mm')}
                    img={`http://localhost:8080/${item.user.avatarId?.path}`}
                    lastMsg={item.user.email}
                    isShowMenu={props.isShowMenu}
                    isClickable={props.isClickable}
                    key={item._id}
                />
            ))}
        </>
    )
}