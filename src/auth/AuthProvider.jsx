import { useContext, createContext, useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [session, setSession] = useState(null);
  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{session, supabase}}>
      {children}
    </AuthContext.Provider>
  );
}


export {AuthContext};
// export const useAuth = () => useContext(AuthContext);



