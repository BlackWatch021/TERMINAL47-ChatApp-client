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
  const joinRoom = () => {};

  // Send message
  const sendMessage = () => {};

  // Listen for incoming messages
  //   const messages = () => {};

  // Listen for user join/leave

  return {
    createRoom,
    joinRoom,
    sendMessage,
    room,
    users,
    messages,
    roomId,
  };
};
