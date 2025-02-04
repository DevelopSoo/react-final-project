import { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import supabase from "../utils/supabase";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session && session.user.email) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          nickname: session.user.user_metadata.nickname,
          img_url: session.user.user_metadata.img_url,
        });
      } else {
        setUser(null);
      }
    });
  }, [setUser]);
  return <>{children}</>;
};

export default AuthProvider;