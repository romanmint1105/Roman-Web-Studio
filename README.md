# Roman Web Studio

飲食店向けWeb制作サービスの静的サイトです。HTML・CSS・JavaScriptのみで構成され、ビルド不要でCloudflare Pagesへ公開できます。

## GitHubへアップロード

1. GitHubで新しいリポジトリを作成します。
2. このフォルダ内のファイルを、フォルダ構成を保ったままアップロードします。
3. コミット先は `main` ブランチにします。

## Cloudflare Pagesの設定

- Framework preset: `None`
- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: 空欄

GitHubリポジトリと連携後、`main`へ変更を反映すると自動で再公開されます。

## 公開前に確認する項目

- Instagram: `https://www.instagram.com/roman.webstudio/`
- 制作実績: `https://jardindessens.jp/`
- 制作実績: `https://touounokitchen.jp/`
- 料金・対応範囲
- 初回3店舗限定の受付状況

独自ドメインを設定したら、`index.html`のOGP画像URLを絶対URLに変更するとSNS共有時の表示がより安定します。
