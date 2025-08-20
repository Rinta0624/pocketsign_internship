import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authRepositories } from '/src/repositories/auth.js';
import { SessionContext } from '../SessionProvider.jsx';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // エラーメッセージ用のStateを追加
    const { setCurrentUser } = useContext(SessionContext);
    const navigate = useNavigate();

  // フォーム送信時の処理をまとめる関数
    const handleSignup = async (event) => {
    event.preventDefault(); // フォーム送信によるページの再読み込みを防ぐ
    setError(null); // 前のエラーをクリア

    try {
    const user = await authRepositories.signup(name, email, password);
    console.log('登録成功:', user);

      // ユーザー情報をグローバルなStateに保存
    setCurrentUser(user);
    
      // ホームページに移動
    navigate('/');

    } catch (err) {
    console.error('登録失敗:', err);
      // Supabaseからのエラーメッセージをユーザーに表示
    setError(err.message); 
    }
};

return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">SNS APP</h2>
        <div className="mt-8 w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* formタグとonSubmitを使うのがベストプラクティス */}
            <form onSubmit={handleSignup} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                    ユーザー名
                </label>
                <div className="mt-1">
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="ユーザー名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    メールアドレス
                </label>
                <div className="mt-1">
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                    パスワード
                </label>
                <div className="mt-1">
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            </div>

              {/* エラーメッセージの表示エリア */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={name === '' || email === '' || password === ''}
                >
                    登録
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
);
}

export default Signup;