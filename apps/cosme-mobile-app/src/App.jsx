import './App.css'
import bannerWinter from './assets/banner_1.png'
import iconProfile from './assets/personal.svg'
import iconBell from './assets/notifications.svg'
import iconCart from './assets/shopping_cart.svg'
import iconHeart from './assets/like.svg'
import iconHome from './assets/home.svg'
import iconSearch from './assets/search.svg'
import iconFavorites from './assets/like.svg'
import iconBarcode from './assets/barcode.svg'

const NAV_TABS = [
  { id: 'recommend', label: 'おすすめ', active: true },
  { id: 'shopping', label: 'お買い物' },
  { id: 'present', label: 'プレゼント' },
  { id: 'article', label: '記事' },
  { id: 'photo', label: 'フォト' },
  { id: 'ranking', label: 'ランキング' },
]

const HERO_SLIDES = [
  {
    id: 'present',
    title: 'Picks@cosme',
    description: 'カンタン応募で毎月 コスメ現品プレゼント',
    accent: 'lavender',
    active: true,
  },
  {
    id: 'collection',
    title: 'HOLIDAY COLLECTION 2025',
    description: '@cosme 公式通販で先行予約受付中',
    accent: 'navy',
  },
  {
    id: 'double-point',
    title: 'Wポイントキャンペーン',
    description: '通販 or お店 初めての方限定で 500ポイント進呈',
    accent: 'mustard',
  },
  {
    id: 'mini-present',
    title: 'ミニコスメプレゼント',
    description: '人気ブランドが週替わりで届く',
    accent: 'pink',
  },
  {
    id: 'coupon',
    title: '500円クーポン',
    description: 'アプリ限定クーポンをチェック',
    accent: 'peach',
  },
]

const PROMO_CARDS = [
  {
    id: 'holiday',
    title: 'WINTER SALE',
    description: '最大50%OFF 冬の限定アイテム',
    image: bannerWinter,
    alt: 'Winter sale banner showing 最大50%OFF',
  },
  {
    id: 'points',
    title: '数量限定ギフト',
    description: '人気ブランドの限定セット',
    image: bannerWinter,
    alt: '限定ギフトキャンペーンバナー',
  },
  {
    id: 'mini',
    title: '新作先行販売',
    description: '今だけの先行ラインナップ',
    image: bannerWinter,
    alt: '新作先行販売のお知らせバナー',
  },
]

const FEATURED_PICK = {
  headline: '10/22(水)のピックアップ！',
  name: 'アップリフト ネイルカラー',
  brand: 'OSAJI(オサジ)',
  liked: false,
}

const NEW_ITEMS = [
  { id: 'kiehls', name: 'キールズ クリーム UFC', brand: 'KIEHL’S', release: '10/24発売', liked: true },
  { id: 'nars', name: 'ライトリフレクティングセッティングパウダー', brand: 'NARS', release: '10/24発売' },
  { id: 'replica', name: 'レプリカ オードトワレ', brand: 'Maison Margiela', release: '10/23発売' },
  { id: 'kate', name: 'ポッピングシルエットパレット', brand: 'KATE', release: '10/25発売', liked: true },
]

const HISTORY_ITEMS = [
  { id: 'elixir', name: 'リフトナイトクリーム', brand: 'ELIXIR' },
  { id: 'aqua', name: 'AQUA CHARGE', brand: 'ESTÉE LAUDER' },
  { id: 'nars', name: 'ライトリフレクト', brand: 'NARS' },
  { id: 'fancl', name: 'ENRICH MOIST CREAM', brand: 'FANCL' },
]

const HIDDEN_HISTORY_BRANDS = new Set(['ELIXIR', 'ESTÉE LAUDER', 'NARS'])

const BRAND_NEWS = [
  {
    id: 'skii-gift',
    title: '【現品500名 & 1,000名Ｗチャンス】SK-II 6.0 新発売',
    brand: 'SK-II',
    tag: 'プレゼント',
    deadline: '11/4まで',
  },
  {
    id: 'canmake',
    title: '現品◎ぷっくり涙袋仕上げる涙袋用パレット',
    brand: 'キャンメイク',
    tag: 'プレゼント',
    deadline: '10/23まで',
  },
  {
    id: 'maquia',
    title: 'NEW★色ツヤ弾ける「リップグロウボム」登場',
    brand: 'マキアージュ',
    tag: '発売情報',
    deadline: '10/21まで',
  },
  {
    id: 'osaji',
    title: '本日発売！HOLIDAY COLLECTION 2025',
    brand: 'OSAJI',
    tag: 'ニュース',
    deadline: '10/20まで',
  },
]

const BOTTOM_NAV = [
  { id: 'home', label: 'ホーム', asset: iconHome, active: true },
  { id: 'search', label: 'さがす', asset: iconSearch },
  { id: 'ranking', label: 'ランキング', iconClass: 'crown' },
  { id: 'favorites', label: 'お気に入り', asset: iconFavorites },
  { id: 'points', label: 'ポイント', asset: iconBarcode },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="status-bar">
          <span className="status-time">14:38</span>
          <div className="status-indicators">
            <span className="indicator signal" aria-hidden="true" />
            <span className="indicator wifi" aria-hidden="true" />
            <span className="indicator battery" aria-hidden="true">
              <span className="battery-level" />
            </span>
          </div>
        </div>

        <div className="search-row">
          <button type="button" className="avatar-button" aria-label="プロフィール">
            <img src={iconProfile} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="search-field" aria-label="商品を探す">
            <img src={iconSearch} alt="" className="icon-img icon-search-img" aria-hidden="true" />
            <span className="search-placeholder">商品名、ブランド名で探す</span>
            <span className="search-barcode" aria-hidden="true">
              <img src={iconBarcode} alt="" className="icon-img icon-barcode-img" aria-hidden="true" />
            </span>
          </button>
          <button type="button" className="header-icon-button badge-button" aria-label="お知らせ">
            <img src={iconBell} alt="" className="icon-img icon-header-img" aria-hidden="true" />
            <span className="badge-dot" />
          </button>
          <button type="button" className="header-icon-button badge-button" aria-label="カート">
            <img src={iconCart} alt="" className="icon-img icon-header-img" aria-hidden="true" />
            <span className="badge-counter">1</span>
          </button>
        </div>

        <nav className="tab-nav" aria-label="タブ">
          {NAV_TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              className={`tab-pill${tab.active ? ' is-active' : ''}`}
              aria-pressed={tab.active}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <section className="hero-section" aria-label="プロモーション">
          <article className={`hero-card accent-${HERO_SLIDES[0].accent}`}>
            <div className="hero-text">
              <p className="hero-kicker">{HERO_SLIDES[0].title}</p>
              <h1 className="hero-title">{HERO_SLIDES[0].description}</h1>
              <button type="button" className="hero-button">
                今すぐ応募
              </button>
            </div>
            <div className="hero-visual" aria-hidden="true" />
          </article>
          <div className="hero-dots" role="tablist" aria-label="スライダーのページ">
            {HERO_SLIDES.map((slide) => (
              <span
                key={slide.id}
                className={`hero-dot${slide.active ? ' is-active' : ''}`}
                role="tab"
                aria-selected={slide.active}
              />
            ))}
          </div>
        </section>

        <section className="promo-section" aria-label="キャンペーン">
          <div className="promo-grid">
            {PROMO_CARDS.map((card) => (
              <article key={card.id} className="promo-card">
                <img src={card.image} alt={card.alt} loading="lazy" />
                <div className="promo-caption">
                  <p className="promo-title">{card.title}</p>
                  <p className="promo-description">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="featured-section" aria-label="新作コスメ">
          <header className="section-header">
            <h2>みんなが Like している新作コスメ</h2>
            <button type="button" className="link-button">
              新作カレンダーへ
            </button>
          </header>
          <article className="featured-card">
            <div className="featured-visual" aria-hidden="true" />
            <div className="featured-body">
              <p className="featured-headline">{FEATURED_PICK.headline}</p>
              <h3 className="featured-name">{FEATURED_PICK.name}</h3>
              <p className="featured-brand">{FEATURED_PICK.brand}</p>
            </div>
            <span className="featured-favorite" aria-hidden="true">
              <img src={iconHeart} alt="" className="icon-img icon-heart-img" aria-hidden="true" />
            </span>
          </article>
        </section>

        <section className="new-items" aria-label="新作アイテム">
          <header className="section-header">
            <h2>新作カレンダー</h2>
            <button type="button" className="link-button">
              発売日をチェック
            </button>
          </header>
          <div className="horizontal-scroll">
            {NEW_ITEMS.map((item) => (
              <article key={item.id} className="new-item-card">
                <div className="product-chip" aria-hidden="true" />
                <span className="new-item-favorite" aria-hidden="true">
                  <img src={iconHeart} alt="" className="icon-img icon-heart-img" aria-hidden="true" />
                </span>
                <h3>{item.name}</h3>
                <p className="brand">{item.brand}</p>
                <p className="release">{item.release}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="history-section" aria-label="閲覧履歴">
          <header className="section-header">
            <h2>閲覧履歴</h2>
            <button type="button" className="link-button">
              もっとみる
            </button>
          </header>
          <div className="horizontal-scroll">
            {HISTORY_ITEMS.map((item) => (
              <article key={item.id} className="history-card">
                <div className="history-visual" aria-hidden="true" />
                {!HIDDEN_HISTORY_BRANDS.has(item.brand) && <p className="brand">{item.brand}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="brand-news" aria-label="ブランド最新情報">
          <header className="section-header">
            <h2>ブランド最新情報</h2>
            <button type="button" className="link-button">
              表示ブランド変更へ
            </button>
          </header>
          <div className="news-list">
            {BRAND_NEWS.map((news) => (
              <article key={news.id} className="news-card">
                <div className="news-visual" aria-hidden="true" />
                <div className="news-body">
                  <p className="news-title">{news.title}</p>
                  <div className="news-meta">
                    <span className="news-tag">{news.tag}</span>
                    <span className="news-brand">{news.brand}</span>
                    <span className="news-deadline">{news.deadline}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <button type="button" className="floating-capture" aria-label="フォト投稿">
        <span className="icon icon-camera" aria-hidden="true" />
      </button>

      <nav className="bottom-nav" aria-label="フッターメニュー">
        {BOTTOM_NAV.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`bottom-nav-item${item.active ? ' is-active' : ''}`}
            aria-pressed={item.active}
          >
            <span className="nav-icon" aria-hidden="true">
              {item.asset ? (
                <img src={item.asset} alt="" className="nav-icon-img" aria-hidden="true" />
              ) : (
                <span className={`nav-icon-shape ${item.iconClass}`} aria-hidden="true" />
              )}
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
