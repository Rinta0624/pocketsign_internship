import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { supabase } from '../lib/supabase'; // あなたのsupabaseクライアントのパス

export function AdminPage() {
    const [message, setMessage] = useState('QRコードをスキャンしてください...');
    const [isProcessing, setIsProcessing] = useState(false);

    // QRコードの読み取りに成功したときの処理
    const handleScanResult = async (result) => {
        // isProcessingがtrueの間は、重複スキャンを防ぐ
        if (result && !isProcessing) {
            setIsProcessing(true); // 処理中にする
            const userId = result.text;
            setMessage(`ID: ${userId} を確認中...`);

            // Supabaseのprofilesテーブルを更新する
            const { data, error } = await supabase
                .from('profiles')
                .update({ status: '合流済み' }) // statusを'合流済み'に更新
                .eq('id', userId) // スキャンしたIDと一致する行を対象
                .select() // 更新後の情報を取得
                .single();

            if (error) {
                setMessage(`更新エラー: ${error.message} (ユーザーが見つからないか、権限がありません)`);
                console.error(error);
            } else if (data) {
                setMessage(`ID: ${data.id} のステータスを「合流済み」に更新しました。`);
            }
            
            // 3秒後にメッセージをリセットし、再度スキャン可能にする
            setTimeout(() => {
                setMessage('QRコードをスキャンしてください...');
                setIsProcessing(false);
            }, 3000);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 className="text-2xl font-bold mb-4">管理者用 チェックイン画面</h1>
            
            <div style={{ width: '300px', maxWidth: '100%', margin: '0 auto' }}>
                <QrReader
                    onResult={handleScanResult}
                    constraints={{ facingMode: 'environment' }} // 背面カメラを優先
                    videoStyle={{ width: '100%' }}
                />
            </div>
            
            <p className="mt-4 text-lg font-semibold">{message}</p>
        </div>
    );
}