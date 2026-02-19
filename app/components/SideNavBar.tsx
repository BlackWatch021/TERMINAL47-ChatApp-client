"use client";
import { ArrowBigRight, TimerReset, Users } from "lucide-react";
import { useEffect, useState } from "react";

const SideNavBar = ({
  userCount,
  expiresAt,
}: {
  userCount: number;
  expiresAt: number | null;
}) => {
  const [expandSideBar, setExpandSideBar] = useState(false);
  const [formattedTime, setFormattedTime] = useState("00:00");
  const [isLowTime, setIsLowTime] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    // Run immediately to avoid 1-second delay on first render
    const tick = () => {
      const remainingMs = expiresAt - Date.now();
      const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setFormattedTime(
        String(minutes).padStart(2, "0") +
          ":" +
          String(seconds).padStart(2, "0"),
      );
      //  check threshold (1 minute = 60 sec)
      setIsLowTime(totalSeconds <= 60);

      if (totalSeconds <= 0) clearInterval(interval);
    };

    tick(); // set immediately
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <aside
      className={`
        h-full bg-secondaryBackground text-textSecondary font-mono
        relative
        overflow-hidden
        transition-all duration-300
        w-12 md:w-64
      `}
    >
      <div
        className={`h-full bg-secondaryBackground text-textSecondary font-mono
        flex flex-col gap-y-8 px-4 py-4
        transition-all duration-300
        fixed md:relative
        overflow-hidden
        ${expandSideBar ? "w-64" : "w-12"} 
        md:w-64
        z-50
      `}
      >
        {/* Toggle button (visible only on mobile) */}
        <button
          className={`${expandSideBar && "rotate-180 absolute right-2"} md:hidden text-terminalGreen cursor-pointer`}
          onClick={() => setExpandSideBar(!expandSideBar)}
        >
          <ArrowBigRight size={20} />
        </button>

        {/* Connection status */}

        <h3
          className={`${expandSideBar ? "block border-l-2 border-terminalGreen" : "hidden"} md:block text-terminalGreen md:border-l-2 
        md:border-terminalGreen pl-2`}
        >
          Connected Condition: Nominal
        </h3>

        {/* Users */}
        <div className="flex items-center gap-x-4">
          <Users size={18} />
          <span className={`${expandSideBar ? "block" : "hidden"} md:block`}>
            {userCount ? userCount : 0}
          </span>
        </div>

        {/* Timer */}

        <div
          className={`${expandSideBar && "timer"} md:p-3
  md:rounded-md
  md:border
  md:text-xl 
  md:font-terminal  
  md:text-center
 md:bg-primaryBackground
 ${isLowTime ? "md:border-errorRed" : "md:border-terminalGreen"}
  mb-12 md:mb-0 mt-auto`}
        >
          {expandSideBar ? "" : <TimerReset size={18} className="md:hidden" />}
          <p className={`${expandSideBar ? "block" : "hidden"} md:block`}>
            {formattedTime}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
