"use client";
import { ArrowBigRight, TimerReset, Users } from "lucide-react";
import { useState } from "react";

const SideNavBar = () => {
  const [expandSideBar, setExpandSideBar] = useState(true);

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
            12
          </span>
        </div>

        {/* Timer */}

        <div
          className={`${expandSideBar && "timer"} md:timer mb-12 md:mb-0 mt-auto`}
        >
          {expandSideBar ? "" : <TimerReset size={18} className="md:hidden" />}
          <p className={`${expandSideBar ? "block" : "hidden"} md:block`}>
            00 : 30 : 00
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideNavBar;
