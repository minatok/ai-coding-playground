import { useMemo, useState } from 'react'
import './App.css'

const EXPERIENCE_STEPS = [
  { id: 'card', label: 'カード読み取り' },
  { id: 'select', label: 'タイプ選択' },
  { id: 'result', label: '診断カード生成' },
]

const TYPE_PROFILES = [
  {
    id: 'smart-shopper',
    label: '効率重視の「賢い買い物」タイプ',
    keywords: ['時短派', '直感重視', '比較して決めたい'],
    description:
      '忙しい毎日の中でも最適な選択を素早く決めたいタイプです。直感を信じながらも、ひと目で比較できる情報を求めています。',
    reviews: [
      '写真付きレビューで色味と質感がすぐに分かって助かりました。朝の支度が一段とスムーズに。',
      'ぶっちゃけどうだった？→コスパ最高！使うほど良さが分かる王道アイテムです。',
      'AとBを使い比べてみて、速乾性でBに軍配。迷ったらこちらで間違いなし。',
    ],
    accent: 'smart',
  },
  {
    id: 'risk-averse',
    label: '失敗を避けたい「慎重派」タイプ',
    keywords: ['安心感', '他人の体験談', '継続利用'],
    description:
      '同じ悩みを持つ人の声に耳を傾け、確かな安心材料を集めてから行動するタイプ。長く付き合える相棒を探しています。',
    reviews: [
      '同じ乾燥肌の方が「肌荒れしなかった」と書いていて安心できました。夜もヒリつきゼロ。',
      '2年リピート中という口コミに背中を押されました。信頼できる実感が伝わります。',
      '「使うほど落ち着く肌感」って言葉がぴったり。私も長く付き合えそうです。',
    ],
    accent: 'care',
  },
  {
    id: 'trend-setter',
    label: '最新情報を追い求める「トレンドセッター」タイプ',
    keywords: ['SNSで話題', '限定コラボ', 'ワクワク感'],
    description:
      '流行の最前線にいたいあなたへ。新作やSNSで話題のアイテムをいち早くキャッチして体験したいタイプです。',
    reviews: [
      'TikTokでバズっていた限定色、写真通りでめちゃ可愛い！テンション上がりました。',
      '韓国コラボの先行レビューが参考になった！推し活にもピッタリのデザイン。',
      '朝のライブ配信で紹介されて即ポチ。流行を逃さないワクワク感が好きです。',
    ],
    accent: 'trend',
  },
  {
    id: 'problem-solver',
    label: '悩みを解決したい「課題解決」タイプ',
    keywords: ['研究熱心', '効果検証', 'ノウハウ共有'],
    description:
      '課題の根本を見極め、確実に改善へ導きたいタイプ。検証されたデータや使い方の工夫を重視します。',
    reviews: [
      '2週間でニキビ跡が薄くなったという写真つきレビューが決め手に。再現性のあるケアが魅力。',
      '同じ悩みの人が「夜は2プッシュで翌朝が別人」と書いていて、使い方の参考になりました。',
      'コットンパック＋マッサージの裏技で乾燥小じわがふっくら。試す価値ありです。',
    ],
    accent: 'solve',
  },
]

const MAX_HISTORY = 6

const createDemoCardId = () => `STAR-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

const formatTime = (timestamp) =>
  new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))

function App() {
  const [cardId, setCardId] = useState('')
  const [step, setStep] = useState('card')
  const [selectedTypeId, setSelectedTypeId] = useState('')
  const [recentSelections, setRecentSelections] = useState([])
  const [error, setError] = useState('')

  const currentProfile = useMemo(
    () => TYPE_PROFILES.find((profile) => profile.id === selectedTypeId) ?? null,
    [selectedTypeId],
  )

  const experienceIndex = EXPERIENCE_STEPS.findIndex((item) => item.id === step)

  const handleCardSubmit = (event) => {
    event.preventDefault()
    if (!cardId.trim()) {
      setError('カードIDを入力するか、デモカードを発行してください。')
      return
    }
    setError('')
    setStep('select')
  }

  const handleIssueDemoCard = () => {
    const generated = createDemoCardId()
    setCardId(generated)
    setError('')
    setStep('select')
  }

  const handleTypeSelection = (typeId) => {
    const effectiveCardId = cardId || createDemoCardId()
    if (!cardId) {
      setCardId(effectiveCardId)
    }
    setSelectedTypeId(typeId)
    setStep('result')
    setRecentSelections((prev) => {
      const nextEntry = {
        cardId: effectiveCardId,
        typeId,
        timestamp: Date.now(),
      }
      return [nextEntry, ...prev].slice(0, MAX_HISTORY)
    })
  }

  const handleRestart = () => {
    setCardId('')
    setSelectedTypeId('')
    setError('')
    setStep('card')
  }

  const handleBackToSelect = () => {
    setStep('select')
    setSelectedTypeId('')
  }

  return (
    <div className="app-shell">
      <div className="control-panel">
        <header className="control-panel__header">
          <div>
            <p className="eyebrow">共感の星空 / Tablet Console</p>
            <h1>来場者の共感タイプを案内する</h1>
          </div>
          <Stepper currentIndex={experienceIndex} />
        </header>

        <main className="control-panel__content">
          {step === 'card' && (
            <section className="panel">
              <h2>Step 1. カードを読み取る</h2>
              <p className="panel__lead">
                Step 1で配布したQRコードを読み取り、体験をスタートします。デモ体験時は「デモカードを発行する」を選択してください。
              </p>
              <form className="panel__form" onSubmit={handleCardSubmit}>
                <label className="field">
                  <span className="field__label">カードID</span>
                  <input
                    value={cardId}
                    onChange={(event) => setCardId(event.target.value)}
                    placeholder="例: STAR-0412"
                    aria-invalid={Boolean(error)}
                  />
                </label>
                {error && <p className="field__error">{error}</p>}
                <div className="panel__actions">
                  <button type="submit" className="btn-primary">
                    タイプ選択へ進む
                  </button>
                  <button type="button" className="btn-secondary" onClick={handleIssueDemoCard}>
                    デモカードを発行する
                  </button>
                </div>
              </form>
            </section>
          )}

          {step === 'select' && (
            <section className="panel">
              <div className="panel__heading">
                <h2>Step 2. 口コミタイプを選ぶ</h2>
                <p className="card-info">
                  現在のカードID: <span>{cardId || 'DEMO-CARD'}</span>
                </p>
              </div>
              <p className="panel__lead">
                来場者の気分や好みに最も近いタイプをタップしてください。選択したタイプが壁面演出に大きく映し出されます。
              </p>
              <div className="type-grid">
                {TYPE_PROFILES.map((profile) => (
                  <TypeOption key={profile.id} profile={profile} onSelect={handleTypeSelection} />
                ))}
              </div>
              <div className="panel__actions panel__actions--end">
                <button type="button" className="btn-tertiary" onClick={handleRestart}>
                  カードを読み直す
                </button>
              </div>
            </section>
          )}

          {step === 'result' && (
            <section className="panel">
              <div className="panel__heading">
                <h2>Step 3. タイプ診断カードをお渡し</h2>
                <p className="card-info">
                  カードID: <span>{cardId || 'DEMO-CARD'}</span>
                </p>
              </div>
              {currentProfile ? (
                <>
                  <p className="panel__lead">
                    メインビジョンに<strong>{currentProfile.label}</strong>
                    を投影しています。カードに印刷する文言を確認して、来場者へお渡しください。
                  </p>
                  <div className="result-summary">
                    <div>
                      <p className="eyebrow">タイプ</p>
                      <h3>{currentProfile.label}</h3>
                    </div>
                    <ul>
                      {currentProfile.keywords.map((keyword) => (
                        <li key={keyword}>{keyword}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="panel__lead">タイプが選択されていません。戻って選択を完了してください。</p>
              )}
              <div className="panel__actions panel__actions--split">
                <button type="button" className="btn-secondary" onClick={handleBackToSelect}>
                  別のタイプを選び直す
                </button>
                <button type="button" className="btn-primary" onClick={handleRestart}>
                  次の来場者へ
                </button>
              </div>
            </section>
          )}

          <RecentSelections history={recentSelections} />
        </main>
      </div>

      <MainVision cardId={cardId} profile={currentProfile} step={step} />
    </div>
  )
}

const Stepper = ({ currentIndex }) => (
  <ul className="stepper">
    {EXPERIENCE_STEPS.map((step, index) => {
      const status = index === currentIndex ? 'current' : index < currentIndex ? 'done' : 'todo'
      return (
        <li key={step.id} className={`stepper__item stepper__item--${status}`}>
          <span className="stepper__index">{index + 1}</span>
          <span className="stepper__label">{step.label}</span>
        </li>
      )
    })}
  </ul>
)

const TypeOption = ({ profile, onSelect }) => (
  <button type="button" className={`type-card type-card--${profile.accent}`} onClick={() => onSelect(profile.id)}>
    <p className="eyebrow">共感タイプ</p>
    <h3>{profile.label}</h3>
    <div className="type-card__keywords">
      {profile.keywords.map((keyword) => (
        <span key={keyword}>{keyword}</span>
      ))}
    </div>
    <p className="type-card__description">{profile.description}</p>
    <p className="type-card__cta">この口コミを体験する</p>
  </button>
)

const RecentSelections = ({ history }) => {
  if (history.length === 0) return null

  return (
    <section className="history">
      <div className="history__heading">
        <h2>最近の診断ログ</h2>
        <p>直近の選択をスタッフが確認できます。</p>
      </div>
      <ul className="history__list">
        {history.map(({ cardId, typeId, timestamp }) => {
          const profile = TYPE_PROFILES.find((item) => item.id === typeId)
          return (
            <li key={`${cardId}-${timestamp}`} className="history__item">
              <div>
                <span className="history__time">{formatTime(timestamp)}</span>
                <span className="history__card">{cardId}</span>
              </div>
              <p>{profile?.label ?? '不明なタイプ'}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const MainVision = ({ cardId, profile, step }) => (
  <section className="main-vision">
    <div className="main-vision__backdrop" />
    <Starfield count={54} />
    <div className="main-vision__content">
      <p className="main-vision__eyebrow">共感の星空</p>
      {profile ? (
        <>
          <h2 className="main-vision__title">{profile.label}</h2>
          <p className="main-vision__subtitle">選んだ人の声が、星座のように心を照らす。</p>
          <div className="main-vision__keywords">
            {profile.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
          <div className="main-vision__reviews">
            {profile.reviews.map((review, index) => (
              <article key={review} className="main-vision__review">
                <span className="main-vision__review-index">★ {index + 1}</span>
                <p>{review}</p>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="main-vision__placeholder">
          <h2>あなたの共感が星空を描く。</h2>
          <p>カードを読み取り、タイプを選ぶとこの画面に口コミが浮かび上がります。</p>
        </div>
      )}
    </div>
    <footer className="main-vision__footer">
      <span>{cardId || 'Awaiting card...'}</span>
      <span>{labelByStep(step)}</span>
    </footer>
  </section>
)

const labelByStep = (step) => {
  switch (step) {
    case 'card':
      return 'カードスキャン待機中'
    case 'select':
      return 'タイプ選択中'
    case 'result':
      return 'タイプ診断を投影中'
    default:
      return ''
  }
}

const Starfield = ({ count = 42 }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: `star-${index}`,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 8 + Math.random() * 16,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 6,
        driftX: (Math.random() - 0.5) * 50,
        driftY: (Math.random() - 0.5) * 40,
        glow: 0.45 + Math.random() * 0.45,
      })),
    [count],
  )

  return (
    <div className="starfield">
      {stars.map((star) => (
        <span
          key={star.id}
          className="starfield__star"
          style={{
            '--star-top': `${star.top}%`,
            '--star-left': `${star.left}%`,
            '--star-size': `${star.size}px`,
            '--star-duration': `${star.duration}s`,
            '--star-delay': `${star.delay}s`,
            '--star-drift-x': `${star.driftX}px`,
            '--star-drift-y': `${star.driftY}px`,
            '--star-glow': star.glow,
          }}
        />
      ))}
    </div>
  )
}

export default App
