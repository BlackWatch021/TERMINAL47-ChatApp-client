import { ChevronDown, CircleQuestionMark, Info } from "lucide-react";
import React from "react";
import FAQ from "./FAQ";

const AboutApp = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-12 font-terminal text-sm md:text-base p-6 w-8/12">
        {/* ABOUT project */}
        <div className="w-12/12 md:w-5/12 ">
          <div className="flex items-center gap-2 mb-4">
            <Info size={18} />
            <h3 className="font-mono uppercase tracking-[0.2em] font-bold">
              [PROTOCOL_OVERVIEW]
            </h3>
          </div>

          <div className="space-y-4 pt-2 text-textSecondary font-terminal text-xs md:text-sm">
            <blockquote className="before:content-['>'] before:mr-3 ">
              All communications are handled via volatile, ephemeral buffers in
              real-time. Transmission is limited to active link-holders only.
            </blockquote>

            <blockquote className="before:content-['>'] before:mr-3 ">
              Zero-persistence architecture. We do not store logs, metadata, or
              session signatures. Once a connection is severed, all associated
              data is purged from volatile memory globally.
            </blockquote>

            <blockquote className="before:content-['>'] before:mr-3  italic">
              Optimized for field agents, whistleblowers, and security
              researchers operating in restricted environments.
            </blockquote>
          </div>
        </div>
        {/* FAQs */}
        <div className="w-12/12 md:w-5/12 ">
          <div className="flex items-center gap-2 mb-4">
            <CircleQuestionMark size={18} />
            <h3 className="font-mono uppercase tracking-[0.2em] font-bold">
              [FREQUENTLY_ASKED]
            </h3>
          </div>
          <div className="flex flex-col gap-y-5">
            <FAQ
              question="CAN_ADMINS_READ_MESSAGES?"
              answer="Negative. E2E encryption ensures only keys held by participants can decrypt traffic."
            />

            <FAQ
              question="HOW_TO_RECOVER_EXPIRED_ROOMS?"
              answer="Impossible. Expiration results in total data eradication (DoD 5220.22-M standard equivalent)."
            />

            <FAQ
              question="IS_THIS_LEGAL?"
              answer="CipherChat is a tool for privacy. Use of encryption is a fundamental human right."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
