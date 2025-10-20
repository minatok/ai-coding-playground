import { useState } from 'react';
import './App.css';
import productThumbnail from '../sunscreen.png';
import recommendationImage from './assets/recommendation-product.png';

const SCREENS = {
  SEARCH: 'screen0',
  RESULTS: 'screen1',
  QUESTION_SHAPE: 'screen2',
  QUESTION_SPF: 'screen3',
  FILTERED_RESULTS: 'screen4',
  PRODUCT_DETAIL: 'screen5',
  SKIN_DIAGNOSIS: 'screen6',
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

const getProductById = (productId) =>
  RECOMMENDATIONS.find((product) => product.id === productId) || (DETAIL.id === productId ? DETAIL : null);

const getAllProductIds = () => [...new Set([...RECOMMENDATIONS.map((product) => product.id), DETAIL.id])];

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

const createInitialMatchStatus = () => {
  const initialStatus = {};
  getAllProductIds().forEach((productId) => {
    initialStatus[productId] = { status: 'idle', score: null, error: null };
  });
  return initialStatus;
};

const SKIN_DIAGNOSIS_DELAY_MS = 1000;

// TODO: Perfect社の肌診断API接続時に置き換える
const runMockSkinDiagnosis = (productId) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const recommendation = RECOMMENDATIONS.find((product) => product.id === productId);
      if (recommendation) {
        resolve(recommendation.matchScore);
        return;
      }

      if (DETAIL.id === productId) {
        resolve(DETAIL.matchScore);
        return;
      }

      reject(new Error('診断に失敗しました'));
    }, SKIN_DIAGNOSIS_DELAY_MS);
  });

export default function App() {
  const [activeScreen, setActiveScreen] = useState(SCREENS.SEARCH);
  const [searchQuery, setSearchQuery] = useState('日焼け止め');
  const [matchStatus, setMatchStatus] = useState(() => createInitialMatchStatus());
  const [diagnosisContext, setDiagnosisContext] = useState({ productId: null, sourceScreen: null });
  const [diagnosisStage, setDiagnosisStage] = useState('idle');

  const isActive = (screenId) => activeScreen === screenId;
  const getDiagnosisState = (productId) => matchStatus[productId] ?? { status: 'idle', score: null, error: null };

  const goToScreen = (screenId) => {
    setActiveScreen(screenId);
    window.scrollTo(0, 0);
  };

  const startDiagnosis = (productId) => {
    setDiagnosisContext({ productId, sourceScreen: activeScreen });
    setDiagnosisStage('camera');
    setMatchStatus((previous) => ({
      ...previous,
      [productId]: previous[productId]?.status === 'success' ? previous[productId] : { status: 'idle', score: null, error: null },
    }));
    goToScreen(SCREENS.SKIN_DIAGNOSIS);
  };

  const handleCapturePhoto = async () => {
    const { productId } = diagnosisContext;
    if (!productId) {
      return;
    }

    setDiagnosisStage('loading');
    setMatchStatus((previous) => ({
      ...previous,
      [productId]: { status: 'loading', score: null, error: null },
    }));

    try {
      const score = await runMockSkinDiagnosis(productId);
      setMatchStatus((previous) => {
        const updated = { ...previous };
        getAllProductIds().forEach((id) => {
          const productInfo = getProductById(id);
          updated[id] = {
            status: 'success',
            score: productInfo?.matchScore ?? score,
            error: null,
          };
        });
        return updated;
      });
      setDiagnosisStage('success');
      setTimeout(() => exitDiagnosisScreen(), 600);
    } catch (error) {
      setMatchStatus((previous) => ({
        ...previous,
        [productId]: { status: 'error', score: null, error: error.message },
      }));
      setDiagnosisStage('error');
    }
  };

  const exitDiagnosisScreen = ({ resetError = false } = {}) => {
    const { sourceScreen, productId } = diagnosisContext;
    const targetScreen = sourceScreen ?? SCREENS.FILTERED_RESULTS;

    if (resetError && productId) {
      setMatchStatus((previous) => {
        const current = previous[productId];
        if (!current || current.status !== 'error') {
          return previous;
        }
        return {
          ...previous,
          [productId]: { status: 'idle', score: null, error: null },
        };
      });
    }

    setDiagnosisContext({ productId: null, sourceScreen: null });
    setDiagnosisStage('idle');
    goToScreen(targetScreen);
  };

  const handleSearch = () => {
    goToScreen(SCREENS.RESULTS);
  };

  const handleKeywordClick = (keyword) => {
    setSearchQuery(keyword);
    goToScreen(SCREENS.RESULTS);
  };

  const detailDiagnosis = getDiagnosisState(DETAIL.id);
  const currentDiagnosisProduct = getProductById(diagnosisContext.productId);

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
                  <img src={productThumbnail} alt="商品" />
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

          {RECOMMENDATIONS.map((product) => {
            const diagnosis = getDiagnosisState(product.id);
            const isSuccess = diagnosis.status === 'success';

            const handleCardClick = () => {
              goToScreen(SCREENS.PRODUCT_DETAIL);
            };

            const handleKeyDown = (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                goToScreen(SCREENS.PRODUCT_DETAIL);
              }
            };

            return (
              <div key={product.id} className="product-card-result" role="button" tabIndex={0} onClick={handleCardClick} onKeyDown={handleKeyDown}>
                <div className="product-card-content">
                  <div className="product-header">
                    <div className="product-image-small">
                      <img src={recommendationImage} alt={`${product.name} 商品画像`} />
                    </div>
                    <div className="product-details">
                      <div className="product-name">{product.name}</div>
                      <div className="stars">{product.rating}</div>
                      <div className="product-price">{product.price}</div>
                    </div>
                  </div>

                  {isSuccess ? (
                    <div className="match-score">
                      <div className="match-score-label">AIマッチスコア</div>
                      <div className="match-score-value">{diagnosis.score}</div>
                    </div>
                  ) : (
                    <div className="diagnosis-action">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(event) => {
                          event.stopPropagation();
                          startDiagnosis(product.id);
                        }}
                      >
                        相性チェック
                      </button>
                    </div>
                  )}

                  <div className="match-reasons">
                    {product.reasons.map((reason) => (
                      <span key={reason} className="match-reason">
                        {reason}
                      </span>
                    ))}
                  </div>

                  <div className="review-summary">
                    <div className="review-summary-title">レビューをまとめると...</div>
                    <div className="review-summary-text">{product.reviewSummary}</div>
                  </div>
                </div>
              </div>
            );
          })}
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
            <div className="detail-image">
              <img src={recommendationImage} alt={`${DETAIL.name} 商品画像`} />
            </div>
            <div className="detail-name">{DETAIL.name}</div>
            <div className="detail-price">{DETAIL.price}</div>
          </div>

          <div className="detail-diagnosis-container">
            <div className="match-score detail-match-score">
              <div className="match-score-label">あなたにぴったり！</div>
              {detailDiagnosis.status === 'success' ? (
                <div className="detail-score-row">
                  <div className="match-score-label">AIマッチスコア</div>
                  <div className="match-score-value">{detailDiagnosis.score}</div>
                </div>
              ) : (
                <div className="detail-diagnosis-action">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => startDiagnosis(DETAIL.id)}
                  >
                    相性チェック
                  </button>
                </div>
              )}
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

          <button className="btn btn-primary btn-full">商品情報を詳しく見る</button>
        </div>
      </div>

      <div
        className={`screen diagnosis-screen${isActive(SCREENS.SKIN_DIAGNOSIS) ? ' active' : ''}`}
        id={SCREENS.SKIN_DIAGNOSIS}
      >
        <div className="header">
          <button
            className="header-link"
            onClick={() => exitDiagnosisScreen({ resetError: true })}
            disabled={diagnosisStage === 'loading'}
          >
            ← 戻る
          </button>
          <div className="header-icon" role="img" aria-label="camera">
            📷
          </div>
        </div>

        <div className="content diagnosis-content">
          {currentDiagnosisProduct ? (
            <>
              <div className="diagnosis-product-name">{currentDiagnosisProduct.name}</div>

              {diagnosisStage === 'camera' && (
                <div className="diagnosis-camera">
                  <div className="camera-frame" role="img" aria-label="カメラプレビュー">
                    📸
                  </div>
                  <div className="diagnosis-instruction">
                    顔全体が映るようにカメラに向かってください。準備ができたら撮影ボタンを押してください。
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleCapturePhoto}>
                    撮影する
                  </button>
                </div>
              )}

              {diagnosisStage === 'loading' && (
                <div className="diagnosis-loading" aria-live="polite">
                  <div className="diagnosis-text">診断中…</div>
                  <div className="running-cat" role="img" aria-label="走る子猫">
                    🐈
                  </div>
                </div>
              )}

              {diagnosisStage === 'success' && (
                <div className="diagnosis-complete" aria-live="polite">
                  <div className="diagnosis-text">診断結果を表示しています…</div>
                </div>
              )}

              {diagnosisStage === 'error' && (
                <div className="diagnosis-error" aria-live="polite">
                  <div className="diagnosis-text">失敗しました</div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => exitDiagnosisScreen({ resetError: true })}
                  >
                    戻る
                  </button>
                </div>
              )}

              {diagnosisStage === 'idle' && (
                <div className="diagnosis-placeholder">
                  <div className="diagnosis-text">診断を開始してください</div>
                </div>
              )}
            </>
          ) : (
            <div className="diagnosis-placeholder">
              <div className="diagnosis-text">診断対象の商品が選択されていません</div>
              <button type="button" className="btn btn-secondary" onClick={() => goToScreen(SCREENS.FILTERED_RESULTS)}>
                商品一覧へ戻る
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
