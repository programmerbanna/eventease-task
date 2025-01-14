import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/auth.mutations";
import { useRouter } from "next/navigation";
import { GET_CURRENT_USER } from "@/graphql/queries/auth.queries";
import { User } from "@/types/auth.types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const [logout] = useMutation(LOGOUT);

  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.error("Auth query error:", error);
      if (error.message.includes("Unauthorized")) {
        setUser(null);
      }
    },
  });

  useEffect(() => {
    if (!loading) {
      if (data?.me) {
        setUser(data.me);
      }
      setIsInitialized(true);
    }
  }, [data, loading]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    isLoading: loading || !isInitialized,
    isAuthenticated: !!user,
    logout: handleLogout,
  };
}
