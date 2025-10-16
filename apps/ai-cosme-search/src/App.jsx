import { useState } from 'react';
import './App.css';

const SCREENS = {
  SEARCH: 'screen0',
  RESULTS: 'screen1',
  QUESTION_SHAPE: 'screen2',
  QUESTION_SPF: 'screen3',
  FILTERED_RESULTS: 'screen4',
  PRODUCT_DETAIL: 'screen5',
};

const POPULAR_KEYWORDS = ['日焼け止め', 'ファンデーション', '化粧水', 'リップ'];

const SEARCH_RESULTS = [
  {
    id: 'product-1',
    name: 'スティック型 UVカット SPF50+',
    brand: 'サンケアブランド',
    rating: '★★★★☆ 4.6',
    price: '1,650円',
  },
  {
    id: 'product-2',
    name: 'サラサラ UVジェル SPF50+',
    brand: 'ビューティーラボ',
    rating: '★★★★★ 4.8',
    price: '1,980円',
  },
  {
    id: 'product-3',
    name: '敏感肌用 UVクリーム SPF30',
    brand: 'スキンケアプラス',
    rating: '★★★★☆ 4.3',
    price: '2,200円',
  },
  {
    id: 'product-4',
    name: 'UVスプレー 化粧の上から SPF50+',
    brand: 'コスメティック',
    rating: '★★★★☆ 4.5',
    price: '2,480円',
  },
  {
    id: 'product-5',
    name: '保湿UVミルク SPF35',
    brand: 'ナチュラルケア',
    rating: '★★★★☆ 4.4',
    price: '1,850円',
  },
];

const RECOMMENDATIONS = [
  {
    id: 'product-1',
    name: 'スティック型 UVカット SPF50+',
    rating: '★★★★☆ 4.6 (203件)',
    price: '1,650円',
    matchScore: '98%',
    reasons: ['形状 ◎', 'SPF値 ◎', '使用感 ○', '価格 ○'],
    reviewSummary: '手を汚さず塗れて便利、白浮きしにくい',
  },
  {
    id: 'product-6',
    name: 'スティック 日焼け止め SPF50+',
    rating: '★★★★☆ 4.3 (156件)',
    price: '1,880円',
    matchScore: '96%',
    reasons: ['形状 ◎', 'SPF値 ◎', '保湿力 ◎', '使用感 ○'],
    reviewSummary: '塗りやすくベタつかない、化粧の上からも使える',
  },
];

const DETAIL = {
  id: 'product-1',
  name: 'スティック型 UVカット SPF50+',
  price: '1,650円',
  matchScore: '98%',
  reasons: ['形状 ◎', 'SPF値 ◎', '使用感 ○', '価格 ○'],
  summary:
    'スティックタイプで手を汚さず塗れて、SPF50+で強力に紫外線をカット。ベタつかずさらさらな使用感です。',
  bulletPoints: [
    'SPF50+ PA++++で強力UVカット',
    'スティック型で手を汚さず塗れる',
    '白浮きしにくい透明タイプ',
    '化粧の上からも塗り直しOK',
    'ウォータープルーフで汗に強い',
  ],
  reviewSummary:
    '多くのユーザーが手を汚さず塗れる便利さを高く評価しています。白浮きしにくく、ベタつかないさらっとした使用感が好評。化粧の上からも使えるため、塗り直しが簡単という声も多数。一方で、容量が少なめという意見もありますが、携帯性に優れ総合的に満足度の高い商品です。',
};

const SHAPE_OPTIONS = [
  { title: 'スティックタイプ', subtitle: '手を汚さず塗れる' },
  { title: 'ジェルタイプ', subtitle: 'さっぱり軽い' },
  { title: 'クリームタイプ', subtitle: 'しっとり保湿' },
  { title: 'スプレータイプ', subtitle: '簡単に塗り直せる' },
];

const SPF_OPTIONS = [
  { title: 'SPF50+', subtitle: 'アウトドア・レジャー' },
  { title: 'SPF30〜50', subtitle: '日常使い' },
  { title: 'SPF30以下', subtitle: '軽めの保護' },
];

const PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='40' text-anchor='middle' dominant-baseline='middle'%3E%E2%98%80%EF%B8%8F%3C/text%3E%3C/svg%3E";

export default function App() {
  const [activeScreen, setActiveScreen] = useState(SCREENS.SEARCH);
  const [searchQuery, setSearchQuery] = useState('日焼け止め');

  const isActive = (screenId) => activeScreen === screenId;

  const goToScreen = (screenId) => {
    setActiveScreen(screenId);
    window.scrollTo(0, 0);
  };

  const handleSearch = () => {
    goToScreen(SCREENS.RESULTS);
  };

  const handleKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    goToScreen(SCREENS.RESULTS);
  };

  return (
    <div className="app">
      <div className={`screen${isActive(SCREENS.SEARCH) ? ' active' : ''}`} id={SCREENS.SEARCH}>
        <div className="header">
          <div>コスメ検索</div>
          <div className="header-icon" role="img" aria-label="shopping cart">
            🛒
          </div>
        </div>

        <div className="content">
          <div className="hero-section">
            <div className="hero-icon" role="img" aria-label="search">
              🔍
            </div>
            <h1 className="hero-title">商品を探す</h1>

            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                placeholder="商品名やキーワードを入力"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button className="search-button" onClick={handleSearch}>
                検索
              </button>
            </div>

            <div className="popular-keywords-wrapper">
              <div className="popular-keywords-title">人気の検索ワード</div>
              <div className="popular-keywords">
                {POPULAR_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    className="keyword-chip"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`screen${isActive(SCREENS.RESULTS) ? ' active' : ''}`} id={SCREENS.RESULTS}>
        <div className="header">
          <button className="header-link" onClick={() => goToScreen(SCREENS.SEARCH)}>
            ← 検索
          </button>
          <div className="header-icon" role="img" aria-label="shopping cart">
            🛒
          </div>
        </div>

        <div className="search-box">🔍 {searchQuery}</div>

        <div className="content">
          <div className="ai-card">
            <div className="ai-icon" role="img" aria-label="ai assistant">
              🤖
            </div>
            <div className="ai-card-title">お客様の商品探しをお手伝いします！</div>
            <div className="ai-card-subtitle">お求めの商品について教えてください。</div>
            <button className="btn btn-primary" onClick={() => goToScreen(SCREENS.QUESTION_SHAPE)}>
              はじめる
            </button>
          </div>

          <div className="result-count">142,663件</div>

          <div className="product-list">
            {SEARCH_RESULTS.map((product) => (
              <button
                key={product.id}
                type="button"
                className="product-list-item"
                onClick={() => goToScreen(SCREENS.PRODUCT_DETAIL)}
              >
                <div className="product-list-image">
                  <img src={PLACEHOLDER_SVG} alt="商品" />
                </div>
                <div className="product-list-info">
                  <div className="product-list-name">{product.name}</div>
                  <div className="product-list-brand">{product.brand}</div>
                  <div className="product-list-rating">{product.rating}</div>
                  <div className="product-list-price">{product.price}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`screen dialog-screen${isActive(SCREENS.QUESTION_SHAPE) ? ' active' : ''}`}
        id={SCREENS.QUESTION_SHAPE}
      >
        <div className="dialog-header">
          <button className="link-btn" onClick={() => goToScreen(SCREENS.RESULTS)}>
            ← ページ反映
          </button>
          <div className="dialog-ai-icon" role="img" aria-label="ai assistant">
            🤖
          </div>
          <button className="link-btn" onClick={() => goToScreen(SCREENS.RESULTS)}>
            終了
          </button>
        </div>

        <div className="dialog-content">
          <div className="question-card">
            <div className="question-title">日焼け止めの形状について教えてください</div>
            <div className="question-subtitle">使いやすいタイプをお選びください</div>

            <div className="options">
              {SHAPE_OPTIONS.map((option) => (
                <button
                  key={option.title}
                  type="button"
                  className="option-btn"
                  onClick={() => goToScreen(SCREENS.QUESTION_SPF)}
                >
                  <div className="option-title">{option.title}</div>
                  <div className="option-subtitle">{option.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-secondary" onClick={() => goToScreen(SCREENS.RESULTS)}>
              戻る
            </button>
            <button className="btn btn-secondary" onClick={() => goToScreen(SCREENS.QUESTION_SPF)}>
              スキップ
            </button>
          </div>
        </div>
      </div>

      <div
        className={`screen dialog-screen${isActive(SCREENS.QUESTION_SPF) ? ' active' : ''}`}
        id={SCREENS.QUESTION_SPF}
      >
        <div className="dialog-header">
          <button className="link-btn" onClick={() => goToScreen(SCREENS.RESULTS)}>
            ← ページ反映
          </button>
          <div className="dialog-ai-icon" role="img" aria-label="ai assistant">
            🤖
          </div>
          <button className="link-btn" onClick={() => goToScreen(SCREENS.RESULTS)}>
            終了
          </button>
        </div>

        <div className="dialog-content">
          <div className="question-card">
            <div className="question-title">SPF値について教えてください</div>
            <div className="question-subtitle">使用シーンに合わせてお選びください</div>

            <div className="options">
              {SPF_OPTIONS.map((option) => (
                <button
                  key={option.title}
                  type="button"
                  className="option-btn"
                  onClick={() => goToScreen(SCREENS.FILTERED_RESULTS)}
                >
                  <div className="option-title">{option.title}</div>
                  <div className="option-subtitle">{option.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="controls">
            <button className="btn btn-secondary" onClick={() => goToScreen(SCREENS.QUESTION_SHAPE)}>
              戻る
            </button>
            <button className="btn btn-secondary" onClick={() => goToScreen(SCREENS.FILTERED_RESULTS)}>
              スキップ
            </button>
          </div>
        </div>
      </div>

      <div className={`screen${isActive(SCREENS.FILTERED_RESULTS) ? ' active' : ''}`} id={SCREENS.FILTERED_RESULTS}>
        <div className="header">
          <button className="header-link" onClick={() => goToScreen(SCREENS.RESULTS)}>
            ← 検索
          </button>
          <div className="header-icon" role="img" aria-label="shopping cart">
            🛒
          </div>
        </div>

        <div className="content">
          <div className="result-header">
            <div className="ai-icon" role="img" aria-label="ai assistant">
              🤖
            </div>
            <div className="result-title">あなたにぴったりな2選！</div>
          </div>

          {RECOMMENDATIONS.map((product) => (
            <button
              key={product.id}
              type="button"
              className="product-card-result"
              onClick={() => goToScreen(SCREENS.PRODUCT_DETAIL)}
            >
              <div className="product-header">
                <div className="product-image-small" role="img" aria-label="sun">
                  ☀️
                </div>
                <div className="product-details">
                  <div className="product-name">{product.name}</div>
                  <div className="stars">{product.rating}</div>
                  <div className="product-price">{product.price}</div>
                </div>
              </div>

              <div className="match-score">
                <div className="match-score-label">AIマッチスコア</div>
                <div className="match-score-value">{product.matchScore}</div>
                <div className="match-reasons">
                  {product.reasons.map((reason) => (
                    <span key={reason} className="match-reason">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="review-summary">
                <div className="review-summary-title">レビューをまとめると...</div>
                <div className="review-summary-text">{product.reviewSummary}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`screen${isActive(SCREENS.PRODUCT_DETAIL) ? ' active' : ''}`} id={SCREENS.PRODUCT_DETAIL}>
        <div className="header">
          <button className="header-link" onClick={() => goToScreen(SCREENS.FILTERED_RESULTS)}>
            ← 戻る
          </button>
          <div className="header-icon" role="img" aria-label="shopping cart">
            🛒
          </div>
        </div>

        <div className="content">
          <div className="detail-hero">
            <div className="detail-image" role="img" aria-label="sun">
              ☀️
            </div>
            <div className="detail-name">{DETAIL.name}</div>
            <div className="detail-price">{DETAIL.price}</div>
          </div>

          <div className="match-score detail-match-score">
            <div className="match-score-label">あなたにぴったり！</div>
            <div className="detail-score-row">
              <div className="match-score-label">AIマッチスコア</div>
              <div className="match-score-value">{DETAIL.matchScore}</div>
            </div>
            <div className="match-reasons">
              {DETAIL.reasons.map((reason) => (
                <span key={reason} className="match-reason">
                  {reason}
                </span>
              ))}
            </div>
            <div className="detail-summary">
              <div className="detail-summary-title">あなたにおすすめの理由</div>
              <p>{DETAIL.summary}</p>
            </div>
          </div>

          <div className="detail-points">
            <div className="detail-points-title">この商品のおすすめポイント</div>
            <ul>
              {DETAIL.bulletPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="review-summary review-summary-static">
            <div className="review-summary-title">レビューをまとめると...</div>
            <div className="review-summary-text">{DETAIL.reviewSummary}</div>
          </div>

          <button className="btn btn-primary btn-full">カートに追加</button>
        </div>
      </div>
    </div>
  );
}
