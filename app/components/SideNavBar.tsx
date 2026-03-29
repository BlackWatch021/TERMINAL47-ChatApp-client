"use client";
import {
  ArrowBigRight,
  TimerReset,
  Users,
  Link2,
  Check,
  Share2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SHARE_OPTIONS } from "@/utils/icons";

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
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const shareRef = useRef<HTMLDivElement>(null);

  // Grab the full URL (including hash key)
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Close share panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = currentUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

        {/* ── Share / Copy Link Section ── */}
        <div
          ref={shareRef}
          className={`flex flex-col gap-y-3 ${!expandSideBar ? "pointer-events-none md:pointer-events-auto" : ""}`}
        >
          {/* Copy Link button */}
          <button
            onClick={handleCopy}
            title="Copy room link"
            className={`
              flex items-center gap-x-4 w-full
              py-1
              rounded-md
              border border-transparent
              transition-all duration-200
              hover:text-terminalGreen
              ${copied ? "text-terminalGreen" : "text-textSecondary"}
              cursor-pointer group
            `}
          >
            <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
              {copied ? <Check size={18} /> : <Link2 size={18} />}
            </span>
            <span
              className={`${expandSideBar ? "block" : "hidden"} md:block text-sm whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {copied ? "Link Copied!" : "Copy Room Link"}
            </span>
          </button>

          {/* Share via... button */}
          <button
            onClick={() => setShareOpen((prev) => !prev)}
            title="Share room link"
            className={`
              flex items-center gap-x-4 w-full
              py-1
              rounded-md
              border border-transparent
              transition-all duration-200
              hover:text-terminalGreen
              text-textSecondary
              cursor-pointer group
            `}
          >
            <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
              <Share2 size={18} />
            </span>
            <span
              className={`${expandSideBar ? "block" : "hidden"} md:block text-sm whitespace-nowrap`}
            >
              Share via...
            </span>
          </button>

          {/* Share options panel — only render when expanded or on desktop */}
          {shareOpen && (expandSideBar || true) && (
            <div
              className={`flex-col gap-y-1 animate-fadeIn ${expandSideBar ? "flex" : "hidden"} md:flex`}
            >
              {SHARE_OPTIONS.map((opt) => (
                <a
                  key={opt.label}
                  href={opt.getUrl(currentUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Share via ${opt.label}`}
                  className={`
                    flex items-center gap-x-4
                    w-2/3
                    py-1 pl-3
                    rounded-md
                    border border-transparent
                    transition-all duration-200
                    cursor-pointer group
                    text-textSecondary hover:text-white
                  `}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      opt.color + "80";
                    (e.currentTarget as HTMLElement).style.background =
                      opt.color + "15";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  <span
                    className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: opt.color }}
                  >
                    {opt.icon}
                  </span>
                  <span
                    className="text-sm whitespace-nowrap"
                    style={{ color: "inherit" }}
                  >
                    {opt.label}
                  </span>
                </a>
              ))}
            </div>
          )}
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
