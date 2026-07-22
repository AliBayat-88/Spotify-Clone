
import { useEffect } from "react";

export function useOutsideClick(ref, isOpen, onClose) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isOpen, onClose]);
}