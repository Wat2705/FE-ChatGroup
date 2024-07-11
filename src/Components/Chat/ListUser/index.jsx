import { useSelector } from "react-redux";
import AccountItem from "../AccountItem";
import dayjs from "dayjs";
const { VITE_BASE_URL } = import.meta.env

export default function ListUser(props) {
    const userList = useSelector(state => state.chat.userList)
    return (
        <>
            {userList?.map((item) => (
                <AccountItem
                    title={item.user.name}
                    time={dayjs(item.created_at).format('hh:mm')}
                    img={
                        item.user.avatarId?.path.slice(0, 7) == 'uploads'
                            ? `${VITE_BASE_URL}/${item.user.avatarId?.path}`
                            : item.user.avatarId?.path
                    }
                    lastMsg={item.user.email}
                    isShowMenu={props.isShowMenu}
                    isClickable={props.isClickable}
                    key={item._id}
                />
            ))}
        </>
    )
}