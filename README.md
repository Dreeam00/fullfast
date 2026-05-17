# 🚀 flexweb

**「軽量・高速・モジュール化された現代の DOM エコシステム。」**

`flexweb` は、仮想 DOM を介さない直接的な DOM 操作と、原子的なコンポーネント設計を融合させた、超軽量・高速な UI 開発フレームワークです。

## 🌟 特徴

- ⚡ **Zero Overhead**: 仮想 DOM なし。ブラウザネイティブの速度を最大限に活かします。
- 🧱 **Modular Architecture**: 必要な機能だけをインポート可能。エコシステム全体を軽量に保ちます。
- 🏗 **DOM Cursor Philosophy**: `Q` は常に DOM を指すカーソル。迷うことなく操作できます。
- ✨ **Atomic Identity**: クラスや ID の操作を原子的に実行し、UI を直感的に制御します。
- 🔄 **Reactive Core**: 組み込みの状態管理で、値の変化を即座に UI へ反映。
- 📦 **Ultra Light**: 依存関係ゼロ。小分けになったモジュールで必要な分だけを利用可能です。

## 🛠 インストール

```bash
npm install flexweb
```

## 🚀 クイックスタート

```javascript
import { Q } from 'flexweb';

// 1. DOM カーソルの取得
const app = Q("#app");

// 2. DOM の生成
const container = app.el("div.container");

// 3. リアクティブな状態
const count = Q.state(0);

// 4. コンポーネントの定義
function Counter(parent, state) {
  return parent.el("div")
    .el("p").bind(state, v => `Count: ${v}`, 'text')
    .parent.el("button").text("+").on("click", () => state.value++);
}

// 5. コンポーネントの呼び出し
container.el(Counter, count);
```

## 🧩 モジュール構成

`flexweb` は用途に合わせて機能を分割しています。

- **`flexweb` (Core)**: 基本的な DOM 操作とリアクティブ機能。
- **`flexweb/base`**: 基盤となるユーティリティ。
- **`flexweb/rooting`**: SPA を構築するための軽量ルーティング機能。
- **`flexweb/fx`**: JS ベースのアトミック・アニメーション・エンジン。

## 📖 ドキュメント

詳細な仕様および API リファレンスは [仕様書.md](./仕様書.md) を参照してください。

## 📜 ライセンス

ISC
