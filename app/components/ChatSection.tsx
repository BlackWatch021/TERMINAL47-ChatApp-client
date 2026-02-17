import { BadgePlus, Send } from "lucide-react";
import React from "react";

interface ChatProps {
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  allMessages: { username: string; message: string }[];
  sendMessage: () => void;
}

const ChatSection = ({
  userMessage,
  setUserMessage,
  allMessages,
  userName,
  sendMessage,
}: ChatProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex-1 text-sm flex flex-col px-2 py-2 gap-y-4 w-full  font-terminal">
      <div className="w-full flex-1 flex flex-col gap-y-4 overflow-y-scroll overflow-x-hidden ">
        {allMessages.map((data, index) => {
          return (
            <div
              key={index}
              className={`w-full flex ${data.username.toLowerCase() === userName.toLowerCase() ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%] bg-secondaryBackground rounded-md px-4 py-2">
                <p
                  className={`${data.username.toLowerCase() === userName.toLowerCase() && "text-textSecondary"}`}
                >
                  {data.message}
                </p>

                {data.username.toLowerCase() === userName.toLowerCase() ? (
                  ""
                ) : (
                  <p className="text-xs mt-1 text-textMuted">{data.username}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full h-2/12 bg-secondaryBackground rounded-md px-1 pb-2">
        <div className="flex  px-2 py-1">
          <textarea
            placeholder="...Your message will go here"
            rows={3}
            className="bg-primaryBackground rounded-xl outline-none px-2 py-2 w-full flex-1"
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
                  if (userMessage) sendMessage();
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
