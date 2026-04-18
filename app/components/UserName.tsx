import React from "react";
import Button from "./Button";

interface UserNameProps {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setAskUserName: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserName = ({ setUserName, setAskUserName }: UserNameProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("setUserName");

    if (!userName || !userName.toString().trim()) return;

    setAskUserName(false);
    setUserName(userName.toString().trim());
    localStorage.setItem("username", userName.toString().trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center backdrop-blur-[3px] justify-center bg-black/60">
      <div className="w-[90%] max-w-md bg-secondaryBackground p-6 rounded-xl shadow-box overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="identifier"
            className="uppercase text-textSecondary text-sm"
          >
            User Name
          </label>

          <input
            id="identifier"
            type="text"
            // value={userName}
            name="setUserName"
            // onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="border border-terminalGreenSecondary bg-slate-900 py-3 px-4 rounded-md outline-none"
            // required
          />

          <Button title={"Select"} icon={false} />
        </form>
      </div>
    </div>
  );
};

export default UserName;
