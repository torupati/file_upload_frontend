# Firebase File Upload Interface

ブラウザからファイル（テキスト・バイナリ）をGoogle Cloud Storageにアップロードするインターフェイス

## 🚀 機能

- ✅ Firebase Authentication（Google認証）
- ✅ Firebase Storage（GCS統合）へのファイルアップロード
- ✅ テキストファイル・バイナリファイル対応
- ✅ 複数ファイル同時アップロード
- ✅ アップロード進捗表示
- ✅ ユーザーごとのファイル管理

## 📋 前提条件

- Node.js（v16以上推奨）
- Firebaseプロジェクト
- Google Cloudプロジェクト

## 🛠️ セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. Authenticationを有効化し、Googleプロバイダーを追加
4. Storageを有効化

### 3. Firebase設定の取得

1. Firebase Console → プロジェクト設定 → 全般
2. 「アプリを追加」→ Web（</>）を選択
3. 表示されるFirebase設定をコピー

### 4. Firebase設定の更新

`src/app.js`のfirebaseConfigを更新：

```javascript
const firebaseConfig = {
    apiKey: "あなたのAPIキー",
    authDomain: "あなたのプロジェクトID.firebaseapp.com",
    projectId: "あなたのプロジェクトID",
    storageBucket: "あなたのプロジェクトID.appspot.com",
    messagingSenderId: "あなたのメッセージング送信者ID",
    appId: "あなたのアプリID"
};
```

### 5. Firebase CLIのインストールとログイン

```bash
npm install -g firebase-tools
firebase login
```

### 6. Firebaseプロジェクトの初期化

```bash
firebase init
```

- Hosting、Storageを選択
- 既存のプロジェクトを選択
- public directoryは`.`（カレントディレクトリ）
- SPAとして設定: No
- 既存のファイルを上書きしない

### 7. Storageルールのデプロイ

```bash
firebase deploy --only storage
```

## 🎯 使い方

### ローカル開発

```bash
# ローカルサーバーで実行
npm run serve

# または Firebase Emulators を使用
npm run dev
```

ブラウザで http://localhost:5000 を開く

### デプロイ

```bash
npm run deploy
```

デプロイ後、`https://あなたのプロジェクトID.web.app`でアクセス可能

## 📁 ファイル構造

```
upload_interface/
├── index.html          # メインHTML（アップロードUI）
├── src/
│   ├── app.js         # Firebase初期化とメインロジック
│   ├── auth.js        # 認証処理
│   └── upload.js      # ファイルアップロード処理
├── storage.rules       # Storageセキュリティルール
├── firebase.json       # Firebase設定
├── package.json        # npm設定
└── README.md          # このファイル
```

## 🔒 セキュリティ

- ユーザーは自分のフォルダ（`users/{userId}/`）にのみアクセス可能
- Firebase Authenticationで認証必須
- Storageルールで権限制御

## 📝 アップロードされるファイル構造

```
gs://YOUR_BUCKET/users/{userId}/{timestamp}_{filename}
```

例: `gs://my-project.appspot.com/users/abc123/1704067200000_example.txt`

## 🐛 トラブルシューティング

### モジュールが見つからないエラー

Firebase Hostingでは、`type="module"`を使用する場合、ブラウザの互換性に注意。古いブラウザでは動作しない場合があります。

### アップロードエラー

1. Firebase Storageが有効化されているか確認
2. Storage rulesが正しくデプロイされているか確認
3. ブラウザのコンソールでエラーメッセージを確認

### 認証エラー

1. Firebase AuthenticationでGoogleプロバイダーが有効か確認
2. 認証ドメインが正しく設定されているか確認（Firebase Console → Authentication → Settings → Authorized domains）

## 💰 コスト概算

Firebase Freeプランで以下が含まれます：
- Storage: 5GB保存、1GB/月ダウンロード
- Authentication: 無制限
- Hosting: 10GB/月転送

詳細は[Firebase料金](https://firebase.google.com/pricing)を参照

## 📚 参考リンク

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
