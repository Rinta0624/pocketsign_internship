import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'; // useEffectをインポート
import { authRepositories } from '/src/repositories/auth.js';
import { SessionContext } from '../SessionProvider.jsx';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { currentUser, setCurrentUser } = useContext(SessionContext); // currentUserも取得
    const navigate = useNavigate();

  // もし既にログインしているユーザーがこのページに来たら、ホームページにリダイレクト
    useEffect(() => {
    if (currentUser) {
        navigate('/');
    }
    }, [currentUser, navigate]);

const handleSignin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
        const user = await authRepositories.signin(email, password);
        console.log('ログイン成功:', user);
      // 状態を更新するだけ。ナビゲーションはPrivateRouteに任せる
        setCurrentUser(user); 
      // navigate('/'); // 👈 この行を削除！
    } catch (err) {
        console.error('ログイン失敗:', err);
        setError('メールアドレスまたはパスワードが違います。');
    }
};

return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">SNS APP</h2>
        <div className="mt-8 w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSignin} className="space-y-6">
            <div>
                <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                >
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm-text-sm"
                />
                </div>
            </div>
            <div>
                <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
                >
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

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div>
                <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={email === '' || password === ''}
                >
                ログイン
                </button>
            </div>
            <div className="mt-4 text-center text-sm">
                登録は
                <Link className="underline" to={'/signup'}>
                こちら
                </Link>
                から
            </div>
            </form>
        </div>
        </div>
    </div>
    </div>
);
}

export default Signin;
