import { createContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';

export const SessionContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
});

export function SessionProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUser(session?.user ?? null);
                setLoading(false);
            }
        );
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // 👇 setCurrentUserをラップする新しい関数を作成
    const updateCurrentUser = (newUser) => {
        console.log('✅ 2. SessionProvider内のupdateCurrentUserが呼ばれました。 New User:', newUser);
        setCurrentUser(newUser);
    };

    if (loading) {
        return <p>読み込み中...</p>;
    }

    // 👇 Providerに渡すvalueを、新しい関数を使うように変更
    const value = { currentUser, setCurrentUser: updateCurrentUser };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};