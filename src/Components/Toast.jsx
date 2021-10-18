import "./Toast.css";
import { useContent } from "../Context/DataContext";
import { useEffect } from "react";
export const Toast = () => {
  const {
    state: { toastMsg },
    dispatch
  } = useContent();
  const hideToast = () => {
    dispatch({ type: "SHOW_TOAST", payload: null });
  };
  useEffect(() => {
    const toastTimeout = setTimeout(hideToast, 1000);
    return () => {
      clearTimeout(toastTimeout);
    };
  });
  return (
    <>
      <div class="toast-container">
        <div class="toast-message">{toastMsg}</div>
        <button class="toast-close-before" onClick={hideToast}>
          {"X"}
        </button>
      </div>
    </>
  );
};
export default Toast;
