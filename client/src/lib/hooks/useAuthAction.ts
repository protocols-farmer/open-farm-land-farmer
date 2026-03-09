//src/lib/hooks/useAuthAction.ts
"use client";

import { useAppSelector, useAppDispatch } from "./hooks";
import { selectCurrentUser } from "../features/user/userSlice";
import { openAuthModal, InteractionType } from "../features/ui/uiSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * A custom hook to conditionally perform an action based on user authentication.
 * If the user is not authenticated, it opens a friendly "login required" modal.
 * @returns A function that takes a callback to execute if the user is logged in.
 */
export const useAuthAction = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAuthAction = (
    action: () => void,

    interactionType: InteractionType = "perform this action",
  ) => {
    if (currentUser) {
      action();
    } else {
      dispatch(openAuthModal(interactionType));
    }
  };

  return handleAuthAction;
};
