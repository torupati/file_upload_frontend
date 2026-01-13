# セキュリティポリシー / Security Policy

## 🔐 Firebase認証情報のローテーション

### 背景

以前のバージョンでは、Firebase認証情報がソースコードに直接記述されていました。これらの認証情報はGitの履歴に残っているため、**侵害されたものとみなす必要があります**。

### 必須アクション

既存のプロジェクトをセットアップする場合、以下の手順に従って認証情報を更新してください：

#### 1. 古いWebアプリの削除

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. プロジェクトを選択
3. プロジェクト設定 → 全般 → マイアプリ
4. 古いWebアプリを削除

#### 2. 新しいWebアプリの作成

1. Firebase Console → プロジェクト設定 → 全般
2. 「アプリを追加」→ Web（</>）を選択
3. アプリのニックネームを入力
4. Firebase Hostingは必要に応じて設定
5. 表示される新しい認証情報をコピー

#### 3. 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、新しい認証情報を設定：

```env
VITE_FIREBASE_API_KEY=新しいAPIキー
VITE_FIREBASE_AUTH_DOMAIN=プロジェクトID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=プロジェクトID
VITE_FIREBASE_STORAGE_BUCKET=プロジェクトID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=新しいメッセージング送信者ID
VITE_FIREBASE_APP_ID=新しいアプリID
```

#### 4. 動作確認

```bash
npm run dev
```

アプリケーションが正常に起動し、Firebase接続エラーが発生しないことを確認してください。

### 重要な注意事項

- **古い認証情報は使用しないでください:** Gitの履歴に残っている認証情報は、リポジトリにアクセスできる人なら誰でも閲覧できます
- **`.env`ファイルをコミットしないでください:** `.env`ファイルは`.gitignore`に含まれていますが、誤ってコミットしないよう注意してください
- **認証情報を共有しないでください:** 認証情報は機密情報として扱い、チーム内でも安全な方法で共有してください

## 🛡️ セキュリティベストプラクティス

### 環境変数の管理

- 本番環境では、Firebase Hostingの環境変数機能または使用しているホスティングプラットフォームの環境変数設定を使用してください
- CI/CDパイプラインでは、シークレット管理機能を使用して環境変数を設定してください

### アクセス制御

- Firebase Storage rulesを定期的に確認し、適切なアクセス制御が設定されていることを確認してください
- 不要な権限は削除し、最小権限の原則に従ってください

### 監査とモニタリング

- Firebase Consoleで定期的にアクセスログを確認してください
- 異常なアクティビティがないか監視してください

## 🚨 セキュリティ問題の報告

セキュリティ上の問題を発見した場合は、公開の Issue ではなく、プロジェクトのメンテナーに直接連絡してください。

---

## English Version

## 🔐 Firebase Credentials Rotation

### Background

In previous versions, Firebase credentials were hardcoded in the source code. These credentials remain in the Git history and should be considered **compromised**.

### Required Actions

If you're setting up an existing project, follow these steps to update the credentials:

#### 1. Delete Old Web App

1. Access [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Project Settings → General → Your apps
4. Delete the old web app

#### 2. Create New Web App

1. Firebase Console → Project Settings → General
2. "Add app" → Web (</>)
3. Enter app nickname
4. Configure Firebase Hosting if needed
5. Copy the new credentials

#### 3. Set Environment Variables

Create a `.env` file in the project root with the new credentials:

```env
VITE_FIREBASE_API_KEY=your-new-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-new-messaging-sender-id
VITE_FIREBASE_APP_ID=your-new-app-id
```

#### 4. Verify

```bash
npm run dev
```

Ensure the application starts correctly without Firebase connection errors.

### Important Notes

- **Do not use old credentials:** Credentials in Git history are accessible to anyone with repository access
- **Do not commit `.env` files:** The `.env` file is in `.gitignore`, but be careful not to commit it accidentally
- **Do not share credentials:** Treat credentials as confidential and share them securely within your team

## 🛡️ Security Best Practices

### Environment Variable Management

- In production, use Firebase Hosting's environment variable feature or your hosting platform's environment variable settings
- In CI/CD pipelines, use secret management features to set environment variables

### Access Control

- Regularly review Firebase Storage rules to ensure appropriate access controls are in place
- Remove unnecessary permissions and follow the principle of least privilege

### Audit and Monitoring

- Regularly check access logs in Firebase Console
- Monitor for unusual activity

## 🚨 Reporting Security Issues

If you discover a security issue, please contact the project maintainers directly rather than creating a public Issue.
