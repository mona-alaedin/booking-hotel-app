import { useEffect } from "react";

export default function useOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    function handleOutsideClock(event) {
      console.log(event.target);
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exeptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutsideClock);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClock);
    };
  }, [ref]);
}
