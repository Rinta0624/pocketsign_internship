import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import { SessionContext } from "./SessionProvider.jsx";
// ▼▼▼ 以下2行をインポート ▼▼▼
import { AdminPage } from '../src/pages/AdminPage.jsx'; // AdminPageのパスを確認
import { AdminRoute } from "../src/components/AdminRoute.jsx"; // AdminRouteのパスを確認

// ログイン状態に応じてルートを保護するラッパーコンポーネント
function PrivateRoute({ children }) {
  const { currentUser } = useContext(SessionContext);
  // currentUserが存在すれば子要素（Home）を、そうでなければSigninページにリダイレクト
  return currentUser ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Signin と Signup は誰でもアクセス可能 */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* HomeページはPrivateRouteで保護する */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />

        {/* ▼▼▼ 管理者専用ルートを追加 ▼▼▼ */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;