import { useMemo } from "react";
import AccountItem from "../AccountItem";

export default function ListUser(props) {
    const a = useMemo(() => {
        return [
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk Dev",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },

            {
                img: "https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg",
                title: "Elon Musk",
                lastMsg: "hank you for the invitation, Denis",
                time: "10:57",
            },
        ]
    }, []);
    return (
        <>
            {a?.map((item, index) => (
                <AccountItem
                    title={item.title}
                    time={"10:57"}
                    img={"https://media.thuonghieucongluan.vn/uploads/2018_06_06/5-1528272790.jpg"}
                    lastMsg={item.lastMsg}
                    isShowMenu={props.isShowMenu}
                    isClickable={props.isClickable}
                    key={index}
                />
            ))}
        </>

    )
}