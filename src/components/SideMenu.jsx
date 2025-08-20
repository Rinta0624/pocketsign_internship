import { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../SessionProvider.jsx';
import { supabase } from '../lib/supabase.js'; // supabaseクライアントのパスを確認
import { QRCodeCanvas } from 'qrcode.react';

export function SideMenu() {
    const { currentUser } = useContext(SessionContext);
    
    // SideMenuが自分でプロフィールを管理するためのState
    const [profile, setProfile] = useState({ role: null, status: null });
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    // currentUserの情報が来たら、対応するプロフィールを取得しにいく
    useEffect(() => {
        if (!currentUser) {
            setIsLoadingProfile(false);
            return;
        }

        const fetchProfile = async () => {
            setIsLoadingProfile(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('role, status')
                .eq('id', currentUser.id)
                .single();
            
            if (error) {
                console.error('SideMenuでのプロフィール取得に失敗:', error);
            } else if (data) {
                setProfile(data); // 取得したデータをStateに保存
            }
            setIsLoadingProfile(false);
        };

        fetchProfile();
    }, [currentUser]); // currentUserが変わるたびに実行

    if (!currentUser) {
        return null;
    }
    
    const statusColor = profile.status === '合流済み' ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-auto flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <div className="text-center mb-4">
                <p className="text-sm">
                    <strong>Name:</strong> {currentUser.user_metadata?.name || 'No Name'}
                </p>
                <p className="text-sm">
                    <strong>ステータス:</strong> 
                    {isLoadingProfile ? (
                        <span className="text-gray-500">...</span>
                    ) : (
                        <span className={`font-bold ${statusColor}`}>{profile.status || '未確認'}</span>
                    )}
                </p>
            </div>
            
            <div className="p-2 bg-gray-100 rounded-md">
                <QRCodeCanvas 
                    value={currentUser.id}
                    size={128}
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">このQRを提示してチェックイン</p>

            {/* ▼▼▼ ボタンの表示条件を、自分で取得したprofile.roleに変更 ▼▼▼ */}
            {!isLoadingProfile && profile.role === 'admin' && (
                <a href="/admin" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    管理者画面へ
                </a>
            )}
        </div>
    );
}