// hooks/useChat.ts (or useRoom.ts)

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export const useChat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState();
  const [roomStatus, setRoomStatus] = useState<boolean | null>(null);

  const router = useRouter();

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000",
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Create room
  const createRoom = useCallback(
    (roomName: string, durationMinutes: number) => {
      console.log("Hitting createRoom, useChat hook");

      socket?.emit(
        "create_room",
        { roomName, durationMinutes },
        (result: any) => {
          console.log({ result: result.message });

          console.log("result", result.roomId);
          if (result.roomId) {
            router.push(`/chat/${result.roomId}`);
          }
        },
      );
    },
    [socket], //
  );

  // Join room
  const joinRoom = useCallback(
    (roomId: string, userName: string) => {
      socket?.emit("join_room", { roomId, userName }, (result: any) => {
        console.log("joining room", result.message);
      });
    },
    [socket],
  );

  // Send message
  const sendMessage = useCallback(
    (roomId: string, message: string) => {
      if (roomId || message) {
        socket?.emit("send_message", { roomId, message }, (result: any) => {
          // console.log("Message send, from useChat hook", result);
        });
      }
    },
    [socket],
  );

  // Listen for incoming messages
  //   const messages = () => {};

  // Listen for user join/leave

  // Room exists
  const roomExists = useCallback(
    (roomId: string) => {
      socket?.emit("room_exists", { roomId }, (result: any) => {
        console.log({ success: result.success });
        setRoomStatus(result.success);
      });
    },
    [socket],
  );

  return {
    socket,
    createRoom,
    joinRoom,
    sendMessage,
    roomExists,
    room,
    users,
    messages,
    roomId,
    roomStatus,
  };
};
