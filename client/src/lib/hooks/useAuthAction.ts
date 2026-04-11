//src/lib/hooks/useAuthAction.ts
"use client";

import { useAppSelector, useAppDispatch } from "./hooks";
import { selectCurrentUser } from "../features/user/userSlice";
import { openAuthModal, InteractionType } from "../features/ui/uiSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
