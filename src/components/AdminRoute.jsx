import { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SessionContext } from '../SessionProvider.jsx';
import { supabase } from '../lib/supabase.js';

export function AdminRoute() {
    const { currentUser } = useContext(SessionContext);
    const [isAdmin, setIsAdmin] = useState(null); // null: 確認中, true: 管理者, false: 非管理者

    useEffect(() => {
        if (!currentUser) {
            setIsAdmin(false);
            return;
        }

        const checkAdminRole = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', currentUser.id)
                .single();

            if (data?.role === 'admin') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        };

        checkAdminRole();
    }, [currentUser]);

    if (isAdmin === null) {
        return <p>権限を確認中です...</p>; // 確認が終わるまで待つ
    }

    return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}