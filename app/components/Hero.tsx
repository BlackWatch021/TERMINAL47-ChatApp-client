"use client";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import Button from "./Button";
import { io } from "socket.io-client";
import { useChat } from "@/hooks/useChat";

const Hero = () => {
  const [roomName, setRoomName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("5");
  const { createRoom, roomId } = useChat();

  const handleRoomCreation = (e: React.ChangeEvent) => {
    e.preventDefault();
    createRoom(roomName, parseInt(durationMinutes));
  };

  return (
    <div>
      <div className="flex flex-col items-center py-20 gap-y-5 bottomBorder">
        <h1 className="font-bold uppercase text-4xl [word-spacing:20px] underline decoration-1 underline-offset-4">
          SECURE. EPHEMERAL. ANONOYMOUS.
        </h1>
        <p className="text-textSecondary text-center text-sm">
          Initialize a elf-destructing communication node. No logs. No
          persistence.
          <br />
          Just pure data exchange.
        </p>
        {/* Create room form */}
        <div className="w-1/2 text-sm font-mono rounded-md bg-secondaryBackground py-6 px-8 border-terminalGreenSecondary border shadow-box ">
          <div className="flex text-xl gap-1 items-center">
            <CirclePlus size={16} />
            <p className="uppercase">initize_terminal_config</p>
          </div>
          <form
            className="mt-6 flex flex-col gap-y-6"
            onSubmit={handleRoomCreation}
          >
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="identifier"
                className="uppercase text-textSecondary"
              >
                ROOM IDENTIFIER
              </label>
              <input
                id="identifier"
                type="text"
                placeholder="E.G. NEBULA_PROTOCOL"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
                className="border border-terminalGreenSecondary bg-slate-900 py-3 px-4 rounded-md outline-0 "
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="lifespan"
                className="uppercase text-textSecondary"
              >
                NODE LIFESPAN
              </label>

              <div className="relative">
                <select
                  id="lifespan"
                  className="
                    w-full
                    appearance-none
                    border border-terminalGreenSecondary
                    bg-slate-900
                    py-3 px-4 pr-10
                    rounded-md
                    text-terminalGreen
                    outline-none
                    
                    transition
                    cursor-pointer
                  "
                  value={durationMinutes}
                  onChange={(e) => {
                    setDurationMinutes(e.target.value);
                  }}
                >
                  <option value="1">01 : 00 MIN</option>
                  <option value="5">05 : 00 MIN</option>
                  <option value="10">10 : 00 MIN</option>
                  <option value="20">20 : 00 MIN</option>
                  <option value="30">30 : 00 MIN</option>
                </select>

                {/* Custom terminal arrow */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-terminalGreen opacity-80">
                  ▾
                </span>
              </div>
            </div>
            <Button title={"create secure node"} icon={true} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
