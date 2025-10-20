import { useState } from 'react';
import { ArrowLeft, Loader, AlertCircle, Home } from 'lucide-react';

const DUMMY_PRODUCTS = {
  '4901234567890': {
    barcode: '4901234567890',
    product_name: 'モイストリペア BBクリーム',
    manufacturer: 'ビューティーラボ',
    category: 'ベースメイク',
    image_url: 'https://images.unsplash.com/photo-1596462502278-af407713571d?w=400&h=400&fit=crop',
    rating: {
      score: 4.5,
      count: 612,
    },
    summary:
      '保湿成分配合で乾燥肌でも使いやすいBBクリーム。カバー力と透明感のバランスが良く、毎日のメイクが時短できると高く評価されています。',
    merits: ['カバー力が高い', '保湿力が優秀', 'よれにくい', 'SPF値が十分'],
    demerits: ['容量が少なめ', 'やや高価', '肌質によっては重く感じる'],
    product_page_url: 'https://example.com/products/123',
  },
  '4912345678901': {
    barcode: '4912345678901',
    product_name: 'ロングラスティング リップティント',
    manufacturer: 'カラーコスメティックス',
    category: 'リップ',
    image_url: 'https://images.unsplash.com/photo-1586894966410-cb11d42ee3dc?w=400&h=400&fit=crop',
    rating: {
      score: 4.3,
      count: 789,
    },
    summary:
      '12時間続く高発色のリップティント。色落ちしにくく唇を美しく染めてくれます。豊富なカラーバリエーションで毎日のメイクを楽しめると好評です。',
    merits: ['色が落ちにくい', 'カラバリが豊富', '発色が良い', 'コスパが良い'],
    demerits: ['乾燥しやすい', '落とすときに手間がかかる'],
    product_page_url: 'https://example.com/products/456',
  },
  '4923456789012': {
    barcode: '4923456789012',
    product_name: 'プレミアム アイシャドウパレット',
    manufacturer: 'グラマースタジオ',
    category: 'アイメイク',
    image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    rating: {
      score: 4.6,
      count: 456,
    },
    summary:
      'まぶたに密着するパール感のある色合いが特徴。上品な発色とまぶたへの優しい使い心地で、毎日のアイメイクをワンランクアップさせられます。',
    merits: ['発色が綺麗', 'まぶたにフィット', 'ラメが上品', 'ブラシが高品質'],
    demerits: ['価格が高め', 'パレットがやや重い'],
    product_page_url: 'https://example.com/products/789',
  },
};

const fetchProductData = (barcode) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = DUMMY_PRODUCTS[barcode];
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 1500);
  });

const HomeScreen = ({ onScan }) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
    <div className="mb-12 text-center">
      <div className="mb-4 text-5xl" aria-hidden>
        📱
      </div>
      <h1 className="mb-2 text-3xl font-bold text-[#233838]">ProductScanner</h1>
      <p className="text-[#798989]">店内での購入判断をお手伝いします</p>
    </div>

    <button
      type="button"
      onClick={onScan}
      className="mb-8 transform rounded-lg bg-[#2eb6aa] px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 hover:bg-[#00a699]"
    >
      📷 バーコードをスキャン
    </button>

    <div className="max-w-md rounded-lg border border-blue-200 bg-[#dbf1f0] p-6">
      <h3 className="mb-3 font-semibold text-[#233838]">使い方</h3>
      <ul className="space-y-2 text-sm text-[#556666]">
        <li className="flex items-start">
          <span className="mr-3" aria-hidden>
            1️⃣
          </span>
          <span>上のボタンをタップしてバーコードをスキャンします</span>
        </li>
        <li className="flex items-start">
          <span className="mr-3" aria-hidden>
            2️⃣
          </span>
          <span>商品の評価やクチコミサマリーが表示されます</span>
        </li>
        <li className="flex items-start">
          <span className="mr-3" aria-hidden>
            3️⃣
          </span>
          <span>詳細ページで更に詳しい情報を確認できます</span>
        </li>
      </ul>
    </div>

    <div className="mt-8 text-center text-xs text-[#99A3A3]">
      <p>プロトタイプ版</p>
      <p>テスト用バーコード: 4901234567890, 4912345678901, 4923456789012</p>
    </div>
  </div>
);

const BarcodeInputScreen = ({ onSubmit, onCancel }) => {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = () => {
    if (barcode.trim()) {
      onSubmit(barcode.trim());
      setBarcode('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f4f4] p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#233838]">バーコードを入力</h2>
        <input
          type="text"
          value={barcode}
          onChange={(event) => setBarcode(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
          placeholder="バーコードの数字を入力してください"
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          autoFocus
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-[#2eb6aa] py-3 font-bold text-white transition hover:bg-[#00a699]"
          >
            検索
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg bg-[#e6e9e9] py-3 font-bold text-[#233838] transition hover:bg-[#d9dddd]"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f3f4f4]">
    <div className="text-center">
      <Loader className="mx-auto mb-4 h-12 w-12 animate-spin text-[#2eb6aa]" />
      <p className="text-[#556666]">商品情報を読み込み中...</p>
    </div>
  </div>
);

const ProductDetailScreen = ({ product, onBack, onScanAgain }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="border-b bg-white">
      <div className="mx-auto flex max-w-2xl items-center px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mr-auto flex items-center text-[#2eb6aa] transition hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          戻る
        </button>
      </div>
    </div>

    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <div className="flex gap-6">
          <img src={product.image_url} alt={product.product_name} className="h-32 w-32 rounded-lg object-cover" />
          <div className="flex-1">
            <p className="mb-2 text-sm text-[#798989]">{product.category}</p>
            <h1 className="mb-2 text-2xl font-bold text-[#233838]">{product.product_name}</h1>
            <p className="mb-4 text-[#798989]">{product.manufacturer}</p>
            <p className="text-xs text-[#99A3A3]">バーコード: {product.barcode}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-[#d9dddd] bg-[#dbf1f0] p-6">
        <h2 className="mb-4 text-xl font-bold text-[#233838]">クチコミの傾向</h2>
        <div className="mb-5 flex gap-6 text-sm text-[#556666]">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#233838]">88%</p>
            <p>肯定的</p>
          </div>
          <div className="text-center border-l border-r border-[#a5deda] px-6">
            <p className="text-2xl font-bold text-[#233838]">8%</p>
            <p>中立</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#233838]">4%</p>
            <p>否定的</p>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {['肌なじみ良い', '毛穴カバー', '使い心地◎', 'さらさら', 'リピート率高'].map((tag) => (
            <span key={tag} className="rounded-full border border-[#2eb6aa] bg-white px-3 py-1 text-sm text-[#00a699]">
              {tag}
            </span>
          ))}
        </div>
        <div className="rounded-lg bg-white p-4 text-sm leading-relaxed text-[#556666]">
          {product.summary}
        </div>
        <p className="mt-3 text-xs text-[#99A3A3]">（{product.rating.count}件のレビューから集計）</p>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold text-[#233838]">特徴</h2>
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-green-700">✅ メリット</h3>
          <ul className="space-y-2">
            {product.merits.map((merit) => (
              <li key={merit} className="flex items-start text-[#556666]">
                <span className="mr-3 text-green-600" aria-hidden>
                  •
                </span>
                <span>{merit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-red-700">⚠️ デメリット</h3>
          <ul className="space-y-2">
            {product.demerits.map((demerit) => (
              <li key={demerit} className="flex items-start text-[#556666]">
                <span className="mr-3 text-red-600" aria-hidden>
                  •
                </span>
                <span>{demerit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <a
          href={product.product_page_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-[#2eb6aa] px-6 py-4 text-center font-bold text-white transition hover:bg-[#00a699]"
        >
          詳しく見る →
        </a>
        <button
          type="button"
          onClick={onScanAgain}
          className="flex-1 rounded-lg bg-[#ccd1d1] px-6 py-4 font-bold text-[#233838] transition hover:bg-[#e6e9e9]"
        >
          別の商品をスキャン
        </button>
      </div>
    </div>
  </div>
);

const ErrorScreen = ({ errorType, onRetry, onHome }) => {
  const errorMessages = {
    notFound: {
      title: '商品が見つかりません',
      message: '申し訳ございません。この商品の情報は登録されていません。',
    },
    networkError: {
      title: '通信エラー',
      message: '通信に失敗しました。再度お試しください。',
    },
    invalidBarcode: {
      title: 'バーコードが無効です',
      message: 'スキャンしたバーコードが認識できません。もう一度お試しください。',
    },
  };

  const error = errorMessages[errorType ?? 'notFound'];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f4f4] p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold text-[#233838]">{error.title}</h2>
        <p className="mb-6 text-[#798989]">{error.message}</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 rounded-lg bg-[#2eb6aa] py-3 font-bold text-white transition hover:bg-[#00a699]"
          >
            もう一度試す
          </button>
          <button
            type="button"
            onClick={onHome}
            className="flex-1 rounded-lg bg-[#e6e9e9] py-3 font-bold text-[#233838] transition hover:bg-[#d9dddd]"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = () => {
    setScreen('barcode-input');
  };

  const handleBarcodeSubmit = async (barcode) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProductData(barcode);
      setProduct(data);
      setScreen('product-detail');
    } catch {
      setError('notFound');
      setScreen('error');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setScreen('home');
    setProduct(null);
  };

  const handleScanAgain = () => {
    setScreen('barcode-input');
    setProduct(null);
  };

  const handleRetry = () => {
    setScreen('barcode-input');
    setError(null);
  };

  const handleHome = () => {
    setScreen('home');
    setError(null);
  };

  return (
    <div className="font-sans">
      {screen === 'home' && <HomeScreen onScan={handleScan} />}
      {screen === 'barcode-input' && <BarcodeInputScreen onSubmit={handleBarcodeSubmit} onCancel={handleBack} />}
      {screen === 'product-detail' && product && (
        <ProductDetailScreen product={product} onBack={handleBack} onScanAgain={handleScanAgain} />
      )}
      {screen === 'error' && <ErrorScreen errorType={error} onRetry={handleRetry} onHome={handleHome} />}
      {loading && <LoadingScreen />}
    </div>
  );
}
