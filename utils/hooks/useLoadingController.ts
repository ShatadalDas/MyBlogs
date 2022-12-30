import { useState } from "react";

export default function useLoadingController() {
  const [loading, setLoading] = useState(false);
  console.log("HOOK : ", loading);
  return {
    loading,
    setLoading,
  };
}
