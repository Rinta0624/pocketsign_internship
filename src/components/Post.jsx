import React from "react";

export function Post({ post, onDelete }) {
    // currentUserの取得はHomeコンポーネントで行うので、ここでは不要
    // const { currentUser } = useContext(SessionContext);

    // postオブジェクトにユーザー情報が含まれていると想定
    const userName = post.user_metadata?.name || "Unknown User";
    const userStatus = post.user_metadata?.status || "未確認";

    // ステータスに応じたスタイルを定義
    const getStatusStyle = (status) => {
        switch (status) {
            case '合流済み':
            case '無事です':
                return 'bg-green-100 text-green-800';
            case '救助求む':
                return 'bg-red-100 text-red-800 animate-pulse';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold">by {userName}</h3>
                {/* ▼▼▼ ステータス表示を追加 ▼▼▼ */}
                <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(userStatus)}`}>
                    {userStatus}
                </span>
            </div>
            <p className="text-gray-700">{post.content}</p>

            {/* 削除ボタンの表示条件はHomeコンポーネントで管理するため、ここでは不要 */}
            {onDelete && (
                <button
                    onClick={() => onDelete(post.id)}
                    className="mt-2 text-sm text-blue-500 hover:underline cursor-pointer focus:outline-none"
                >
                    削除
                </button>
            )}
        </div>
    );
}