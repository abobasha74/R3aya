import { toast } from "react-toastify";

import successSound from "../assets/sounds/success.mp3";
import updateSound from "../assets/sounds/update.mp3";
import errorSound from "../assets/sounds/error.mp3";
import approveSound from "../assets/sounds/approve.mp3";
import warningSound from "../assets/sounds/warning.mp3";

// تشغيل الصوت
const playSound = (sound) => {
  const audio = new Audio(sound);

  audio.volume = 0.5;

  audio.play().catch((error) => {
    console.log("Sound could not be played:", error);
  });
};

// نجاح
export const showSuccess = (message) => {
  playSound(successSound);
  toast.success(message);
};

// تعديل أو تحديث
export const showUpdate = (message) => {
  playSound(updateSound);
  toast.success(message);
};

// خطأ أو رفض أو إلغاء
export const showError = (message) => {
  playSound(errorSound);
  toast.error(message);
};

// قبول أو إكمال
export const showApprove = (message) => {
  playSound(approveSound);
  toast.success(message);
};

// تحذير
export const showWarning = (message) => {
  playSound(warningSound);
  toast.warning(message);
};
