import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../services/supabase.js'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 🟢 ۱. استیت لودینگ با مقدار اولیه true

  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setUser(user);
      } catch (error) {
        console.error("Error loading user:", error.message);
      } finally {
        setIsLoading(false); // 🟢 ۲. بعد از اتمام بررسی (چه موفق چه خطا) لودینگ تمام می‌شود
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false); // 🟢 ۳. جهت اطمینان در لیسنر تغییرات لاگین/لاگ‌آوت
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    // 🟢 ۴. قرار دادن isLoading در value تا بقیه کامپوننت‌ها بهش دسترسی داشته باشن
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth () {
  const context = useContext(AuthContext)

  if (!context) throw new Error('AuthContext must be used within the context')
  return context
}

export { useAuth, AuthProvider }