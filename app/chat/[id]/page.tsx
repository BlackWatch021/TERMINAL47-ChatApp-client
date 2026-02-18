"use client";
import ChatSection from "@/app/components/ChatSection";
import SideNavBar from "@/app/components/SideNavBar";
import UserName from "@/app/components/UserName";
import { useChat } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

const Chat = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [allMessages, setAllMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [askUserName, setAskUserName] = useState(false);
  const { socket, joinRoom, roomExists, roomStatus, sendMessage } = useChat();

  const sendMessageSocket = () => {
    if (!userMessage.trim()) return; // avoid empty messages
    sendMessage(roomId, userMessage);
  };

  //   useEffect(() => {
  //     const savedUser = localStorage.getItem("username");

  //     if (!savedUser) {
  //       setAskUserName(true);
  //     } else {
  //       roomExists(roomId);
  //       setAskUserName(false);
  //       setUserName(savedUser);
  //       joinRoom(roomId, userName);
  //     }
  //  socket?.on("receive_message", (data) => {
  //       console.log("User message to all", data.message);
  //     });

  //   }, [userName, roomStatus,socket]);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");

    if (!savedUser) {
      setAskUserName(true);
    } else {
      setUserName(savedUser);
      setAskUserName(false);
    }
  }, []);

  // check room + join (when username ready)
  useEffect(() => {
    if (!socket || !userName) return;

    roomExists(roomId);
    joinRoom(roomId, userName);
  }, [socket, userName, roomId]);

  //isten for messages (with cleanup)
  useEffect(() => {
    console.log("Is this socket useEffect even working, lets check");
    if (!socket) return;

    const handleReceive = (data: any) => {
      setAllMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [socket]);

  if (askUserName) {
    return (
      <UserName setUserName={setUserName} setAskUserName={setAskUserName} />
    );
  }

  // Loading state
  if (roomStatus === null) {
    return (
      <div className="w-full h-[80vh] flex flex-col gap-y-2 justify-center items-center">
        <LoaderCircle size={35} className="animate-spin" />
        <p className="font-terminal text-2xl">Initializing...</p>
      </div>
    );
  }

  // Room doesn't exist
  if (roomStatus === false) {
    return (
      <div className="w-full h-[80vh] flex flex-col gap-y-2 justify-center items-center">
        <p className="font-terminal text-2xl">Agent, room doen't exist</p>
        <Link
          href="/"
          className="underline underline-offset-4 text-textSecondary hover:text-terminalGreen transition-all duration-200"
        >
          Go back
        </Link>
      </div>
    );
  }
  return (
    <div className="flex h-[93.5vh]">
      <SideNavBar />
      <ChatSection
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        allMessages={allMessages}
        userName={userName}
        sendMessageSocket={sendMessageSocket}
      />
    </div>
  );
};

export default Chat;
