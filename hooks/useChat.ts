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
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const router = useRouter();

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000",
    );
    setSocket(newSocket);

    // Must use newSocket here — `socket` state is still null at this point
    newSocket.on("room_disposed", (data) => {
      console.log("Room disposed event received", data);
      setRoomStatus(false);
    });

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
        if (result.success && result.room) {
          // Store the absolute expiry timestamp so the timer stays accurate
          const expiry = Date.now() + result.room.timeRemaining;
          setExpiresAt(expiry);
        }
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

  // Room exists
  const roomExists = useCallback(
    (roomId: string) => {
      socket?.emit("room_exists", { roomId }, (result: any) => {
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
    expiresAt,
  };
};
