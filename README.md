# template-v11

## 注意！
nodeのバージョンは、`v14.21.3`推奨です。  
v15以上では動作しない可能性があります。

# 使い方
- 監視しながら変更ファイルはコンパイル
  - npx gulp

- 圧縮ファイルの作成（cssのみ）
  - npx gulp release

- 各種ファイルのコンパイル
  - npx gulp browserify
  - npx gulp sass
  - npx gulp pug

- 各種ファイルの監視・コンパイル
  - npx gulp browserify:watch
  - npx gulp sass:watch
  - npx gulp pug:watch

$ npx browserify src/●●●●●.js -o dist/●●●●●.js

# 今後追加する機能
- gulpで画像の圧縮

# 問題点など
- 画像の圧縮でエラーになる

# npmで追加
- yakuhanjp
- bootstrap
- slick
- jquery

# 変更・追加
- 2021-04-29
pugファイル修正

- 2021-05-15
  - google fontsを使えるように'mplusrounded1c.scss'を作成
  - gitのuser.nameを変更
- 2021-05-24
 - google fonts Oswald追加
 - bemインライン要素以外のブロック要素にクラス命名
- 2021-05-31
 - pugファイルif文で出し分け
- 2021-06-09
 -  Browserifyを追加
 - https://designsupply-web.com/media/knowledgeside/5915/
- 2021-08-13
  - 「src」「dist」フォルダ作成
  - Browserifyとgulpの連携処理追加
  - .browserslistrcにie >= 11を追加
  - gulpfile.jsのautoprefixerに '{ grid: true }'を追加
- 2021-09-11
  - node.jsのバージョンを v14.17.6 に変更
  - Browserifyを削除
  - postcss-assetsを削除
  - jsファイルの結合・圧縮を実装
  - cssとjsの圧縮を release に変更
  - gulp-imageminバージョン7.1.0に指定
- 2021-09-12
 - ディレクトリ `assets` 追加 
 - `sec` `dist` ディレクトリ削除して `assets` のみで運用
