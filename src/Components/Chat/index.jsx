import { socket, connectSocket } from "@/config/socket";
import { getUserList, receivedMessage, getOnline } from "@/redux/chat";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import ChatBox from "./ChatBox";
import Header from "./Header";
import Setting from "./Setting";
import SideBar from "./SideBar";
import styles from './chat.module.scss';
import axiosInstance from "@/config/axios";

axiosInstance.interceptors.request.use(config => {
  config.headers.Authorization = `${localStorage.getItem("token")}`;
  return config;
});

function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || typeof socket.on !== 'function') {
      console.error('Socket is not initialized:', socket);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      connectSocket(token);
    } else {
      connectSocket();
    }

    console.log('Setting up Socket.IO listeners...');

    function onConnect() {
      console.log('Socket connected:', socket.id);
    }

    function onGetUserList(data) {
      console.log('Received getUserList:', data);
      dispatch(getUserList(data.userList));
      dispatch(getOnline(data.length));
    }

    function onReceive(data) {
      console.log('Received message:', data); // Debug số lần nhận
      dispatch(receivedMessage(data));
    }

    function onReceiveUser(data) {
      console.log('Received receiveUser:', data);
      dispatch(getUserList(data));
    }

    socket.on('connect', onConnect);
    socket.on('getUserList', onGetUserList);
    socket.on('receiveMessagePublic', onReceive);
    socket.on('receiveUser', onReceiveUser);

    return () => {
      if (socket && typeof socket.off === 'function') {
        console.log('Cleaning up Socket.IO listeners...');
        socket.off('connect', onConnect);
        socket.off('getUserList', onGetUserList);
        socket.off('receiveMessagePublic', onReceive);
        socket.off('receiveUser', onReceiveUser);
      }
    };
  }, [dispatch]);

  return (
    <main>
      <Row id="chat" className={`ms-0 ${styles.limitHeight} ${styles.chat}`} style={{ width: "100%" }}>
        <Col md={3} sm={0} className={`pe-0 ps-0 ${styles.hiddenMb}`}>
          <SideBar />
        </Col>
        <Col md={9} className="d-flex justify-content-between ps-0 pe-0 chatbox">
          <div className="flex-w100 flex-grow-1 h-100">
            <Header className="py-3 custom-header-account" />
            <ChatBox />
          </div>
          <Setting />
        </Col>
      </Row>
    </main>
  );
}

export default Chat;