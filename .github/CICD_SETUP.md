# GitHub Actions CI/CD セットアップ手順

## 自動で実行される内容

### ビルドジョブ（全ブランチ）
- コードのチェックアウト
- Node.js 20のセットアップ
- 依存関係のインストール
- ビルドテスト（`npm run build`）
- ビルド成果物のアップロード

### デプロイジョブ（mainブランチのみ）
- ビルド後、自動的にFirebase Hostingへデプロイ

## セットアップ手順

### 1. Firebase Service Accountの作成

```bash
# Firebase CLIでサービスアカウントキーを取得
firebase login
```

Firebase Console → プロジェクト設定 → サービスアカウント → 新しい秘密鍵の生成

### 2. GitHub Secretsの設定

1. GitHubリポジトリ → Settings → Secrets and variables → Actions
2. 「New repository secret」をクリック
3. 以下のシークレットを追加：

**FIREBASE_SERVICE_ACCOUNT**
- 上記で生成したJSONファイルの全内容を貼り付け

### 3. ワークフローのテスト

```bash
git add .github/workflows/ci.yml
git commit -m "Add GitHub Actions CI/CD workflow"
git push
```

GitHubリポジトリの「Actions」タブでワークフローの実行状況を確認できます。

## トリガー条件

- **Push**: `main`, `dev/**` ブランチ
- **Pull Request**: `main` ブランチへのPR

## 注意事項

- `GITHUB_TOKEN`は自動的に提供されるので設定不要
- デプロイはmainブランチのみ実行される
- 開発ブランチではビルドテストのみ実行
