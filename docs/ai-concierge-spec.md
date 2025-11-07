# AI Concierge v0 モック スペック

## 1. 目的とスコープ
- **目的**: 美容 Q&A に応える AI コンシェルジュの体験（会話 → 推奨 → 根拠提示 → メモ保存）をローカルモックで検証する。
- **対象**: フロントエンド UI（React + Vite）。疑似 AI ロジック、ローカル状態管理、localStorage 永続化。
- **非対象**: サーバー連携、実データ取得、認証。

## 2. ユースケース
- **U1**: ユーザーがフリーワードで相談すると、推奨商品（カード）、推奨理由、根拠が提示される。
- **U2**: 質問チップをクリックすると相談が開始される。
- **U3**: 推奨カードの「メモ保存」で右ペインへ保存され、ブラウザリロード後も保持される。
- **U4**: 「根拠を見る」トグルでクチコミや成分などのエビデンスを表示・非表示できる。

## 3. 画面構成
- **2 カラムレイアウト**（左: チャット、右: メモ）
  - 左カラム
    - `SuggestionChips`: 事前定義の相談トピック。
    - `MessageList`: ユーザー / アシスタントの吹き出し表示。
    - `ProductSuggestion`: 商品カード、推奨理由、アクション（根拠トグル、メモ保存）。
    - `EvidenceList`: 根拠情報をカード内部に展開表示。
    - `InputBox`: テキスト入力、Enter / 送信ボタン操作。
  - 右カラム
    - `MemoPanel`: 保存済み商品の一覧カード、保存日時、全削除ボタン。

## 4. データモデル
```ts
type Evidence = { id: string; type: 'review' | 'ingredient' | 'award'; source: string; quote: string; url?: string };
type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  tags: string[];
  rating: number;
  price: string;
  image: string;
  evidence: Evidence[];
  reason: string; // 疑似 AI 推奨理由
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  payload?: {
    product?: Product;
  };
};

type Memo = {
  product: Product;
  savedAt: string;
};
```

## 5. 疑似 AI ロジック
```ts
function selectProductsByPrompt(prompt: string): Product;
```
- ルールマッチ:
  - `"保湿"` or `"乾燥"` → 保湿系化粧水
  - `"ニキビ"` or `"角質"` → 角質ケア系トナー
  - `"日焼け"` or `"UV"` → 日焼け止め
  - 上記以外 → 評価の高い順で 1 件
- `ask(req: AskRequest): Promise<AskResponse>` として抽象化し、UI からはこの関数経由で応答取得。
  - 乾燥系キーワードのときはフォローアップ質問（カテゴリ確認）を返し、2 発目のユーザー回答で最終商品を推奨する。
  - それ以外は即時に推奨商品を返す。

## 6. 状態管理
- React Hooks で管理。
  - `messages: Message[]`
  - `memos: Memo[]` （初回レンダーで localStorage から復元）
  - `pendingEvidenceId: string | null` （根拠表示トグル）
  - `inputText: string`
- メモ保存時:
  - 重複チェック（`product.id`）。
  - 保存後 localStorage 更新。
  - 全削除ボタンで state と localStorage をクリア。

## 7. インタラクションフロー
1. 初期表示: 質問チップ / ガイダンスメッセージを表示。
2. ユーザーが入力 or チップ選択。
   - 乾燥系キーワードの場合は clarifying question を返し、回答待ち状態に遷移。候補はクイックチップで提示。
   - それ以外は `ask()` → 推奨メッセージと `ProductSuggestion` を render。
3. Clarifying question 中にユーザーが回答（クイックチップ or 自由入力）→ ペンディングしていた推奨商品を提示。
4. 「根拠を見る」クリック → evidence リスト表示（ARIA 属性・フォーカス対応）。
5. 「メモ保存」でドロワー内のメモ一覧に保存、再保存不可・localStorage 永続。
6. メモドロワーでカード閲覧、`全削除` でリセット。

## 8. アクセシビリティ & UX
- ボタンは `aria-label` を付与。Enter 投稿対応。フォーカススタイル（outline）を明示。
- ルートレイアウトはレスポンシブ：モバイル幅では縦並び。

## 9. 受け入れ基準
- **AC-01**: 質問チップ click → User メッセージ追加 → Product 提示。
- **AC-02**: 「根拠を見る」で evidence 表示/非表示が切り替わる。
- **AC-03**: 「メモ保存」で右ペインに追加、リロード後も保持。
- **AC-04**: 入力欄で Enter 送信（空文字無視）。

## 10. 実装計画
1. Vite + React プロジェクト生成（`apps/ai-concierge`）。ESLint & フォーマッタは Vite デフォルト準拠。
2. モックデータ (`PRODUCTS`) と `ask()` モジュール作成。
3. UI コンポーネント実装：レイアウト → メッセージ → 商品カード → メモ。
4. localStorage フック実装 (`useMemos`)。
5. AC を手動確認（質問チップ、根拠トグル、メモ保存、Enter 送信）。

以上に則って v0 モックを構築する。
