import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login, setShowAuthModal } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    if (!user) {
      store.dispatch(setShowAuthModal(true)); // 👈 modal open
      return false;
    }
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) {
      store.dispatch(setShowAuthModal(true)); // 👈 modal open
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    context.store.dispatch(setShowAuthModal(true)); // 👈 modal open on error
    return redirect({ to: "/auth" }); // optional
  }
};
