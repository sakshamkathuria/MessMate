import { useCallback } from "react";
import toast from "react-hot-toast";

// A small hook providing convenient toast helpers
export function useToast() {
  const success = useCallback((msg) => toast.success(msg), []);
  const error = useCallback((msg) => toast.error(msg), []);
  const info = useCallback((msg) => toast(msg), []);

  return { success, error, info };
}
