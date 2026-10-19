import React, { useRef, useState } from "react";
import {
  LogOutIcon,
  Volume2Icon,
  VolumeOffIcon,
  Loader2Icon,
} from "lucide-react";
import { useAuthStore } from "../store/UseAuthStore";
import { useChatStore } from "../store/UseChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfileImg } =
    useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUplode = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b bg-slate-700/50 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div className="avatar online">
            <button
              disabled={isUpdatingProfileImg}
              className={`size-14 rounded-full overflow-hidden relative group ${
                isUpdatingProfileImg
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer"
              }`}
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User Img"
                className={`size-full object-cover ${
                  isUpdatingProfileImg ? "brightness-50" : ""
                }`}
              />
              {/* SHOW SPINNER WHEN UPLOADING, OTHERWISE SHOW "CHANGE" ON HOVER */}
              {isUpdatingProfileImg ? (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2Icon className="size-6 text-cyan-400 animate-spin" />
                </div>
              ) : (
                <div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <span className="text-white text-xs">Change</span>
                </div>
              )}
            </button>
            <input
              disabled={isUpdatingProfileImg}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUplode}
              className="hidden"
            />
          </div>
          {/* username and online text */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>

          {/* buttons */}
          <div className="flex gap-4 items-center ml-20">
            {/* LOGOUT BTN */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={logout}
            >
              <LogOutIcon className="size-5" />
            </button>

            {/* SOUND TOGGLE BTN */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => {
                // play click sound before toggling
                if (isSoundEnabled) {
                  mouseClickSound.currentTime = 0; // reset to start
                  mouseClickSound
                    .play()
                    .catch((error) => console.log("Audio play failed:", error));
                }
                toggleSound();
              }}
            >
              {isSoundEnabled ? (
                <Volume2Icon className="size-5" />
              ) : (
                <VolumeOffIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
