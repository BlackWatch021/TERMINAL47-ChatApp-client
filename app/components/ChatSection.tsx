import { BadgePlus, Send } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface ChatProps {
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  allMessages: { userName: string; message: string; system?: string }[];
  sendMessageSocket: () => void;
}

const ChatSection = ({
  userMessage,
  setUserMessage,
  allMessages,
  userName,
  sendMessageSocket,
}: ChatProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageSocket();
    }
  };

  return (
    <div className="flex-1 text-sm flex flex-col px-2 py-2 gap-y-4 w-full  font-terminal">
      <div className="w-full flex-1 flex flex-col gap-y-4 overflow-y-scroll overflow-x-hidden ">
        {allMessages.length > 0 &&
          allMessages.map((data, index) => {
            return (
              <div
                key={index}
                className={`w-full flex ${data.system ? "justify-start" : data.userName.toLowerCase() === userName.toLowerCase() ? "justify-end" : "justify-start"}`}
              >
                {/* SYSTEM MESSAGE */}
                {data.system ? (
                  <div className="text-xs text-textMuted font-terminal">
                    {/* USER JOINED THE ROOM */}
                    {data.system === "user_joined" && (
                      <p className="text-terminalGreen opacity-40">
                        &gt;&gt; User{" "}
                        <span className="font-bold italic underline underline-offset-1">
                          {data.userName}
                        </span>{" "}
                        Joined the chat
                      </p>
                    )}
                    {/* USER LEFT THE ROOM */}
                    {data.system === "user_left" && (
                      <p className="text-errorRed opacity-80">
                        &gt;&gt; User{" "}
                        <span className="font-bold italic underline underline-offset-1">
                          {data.userName}
                        </span>{" "}
                        LEFT the chat
                      </p>
                    )}
                  </div>
                ) : (
                  // CHAT MESSAGES
                  <div className="max-w-[70%] bg-secondaryBackground rounded-md px-4 py-2">
                    <p
                      className={`${data.userName.toLowerCase() === userName.toLowerCase() && "text-textSecondary"}`}
                    >
                      {data.message}
                    </p>

                    {data.userName.toLowerCase() === userName.toLowerCase() ? (
                      ""
                    ) : (
                      <p className="text-xs mt-1 text-textSecondary">
                        {data.userName}
                      </p>
                    )}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            );
          })}
      </div>

      <div className="w-full h-2/12 bg-secondaryBackground rounded-md px-1 pb-2">
        <div className="flex  px-2 py-1">
          <textarea
            placeholder="...Your message will go here"
            rows={3}
            className="bg-primaryBackground rounded-xl outline-none px-2 py-2 w-full flex-1 resize-none"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="w-12 flex flex-col gap-y-2 items-center py-2">
            <button className="cursor-pointer">
              <Send
                size={20}
                className="text-textSecondary hover:text-terminalGreen duration-100 "
                onClick={() => {
                  if (userMessage) sendMessageSocket();
                }}
              />
            </button>
            {/* <BadgePlus size={20} /> */}
          </div>
        </div>
        <p className="pl-2 text-xs text-terminalGreenSecondary mt-1">
          press <span className="text-terminalGreen">&quot;ENTER&quot;</span> to
          send message
        </p>
      </div>
    </div>
  );
};

export default ChatSection;
