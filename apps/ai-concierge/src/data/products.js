export const PRODUCTS = [
  {
    id: 'hydration-toner',
    name: 'アクアバランス モイストローション',
    brand: 'HydraCare',
    category: '化粧水',
    tags: ['保湿', '乾燥肌', 'セラミド'],
    rating: 4.6,
    price: '¥2,980',
    image: 'https://placehold.co/96x96?text=Moist',
    reason:
      '角質層まで水分を届ける低刺激処方で、乾燥しやすい肌の保湿バリアを整えます。',
    evidence: [
      {
        id: 'hydra-review-1',
        type: 'review',
        source: 'コスメ口コミ 4.5★ (2023/11)',
        quote: '夜までつっぱらずに潤いが続く。重ね付けするとキメがふっくら。',
        url: 'https://example.com/review/hydra',
      },
      {
        id: 'hydra-ingredient-1',
        type: 'ingredient',
        source: '成分情報',
        quote: '3 種のセラミドとヒアルロン酸を配合し、角質層の水分保持をサポート。',
      },
      {
        id: 'hydra-tips-1',
        type: 'tips',
        source: '使い方のヒント',
        quote:
          '洗顔後すぐに 2 度づけし、手のひらで 10 秒ほどハンドプレスすると浸透感が高まります。',
      },
    ],
  },
  {
    id: 'clarifying-toner',
    name: 'クリアフォーカス 角質ケアトナー',
    brand: 'PureTone',
    category: '導入化粧水',
    tags: ['ニキビ', '角質ケア', 'BHA'],
    rating: 4.4,
    price: '¥3,200',
    image: 'https://placehold.co/96x96?text=Clear',
    reason:
      '角質柔軟成分 BHA とナイアシンアミドで毛穴詰まりと皮脂バランスを整えます。',
    evidence: [
      {
        id: 'clarify-review-1',
        type: 'review',
        source: 'ユーザー調査 (2024/02)',
        quote: '2 週間で顎周りのざらつきが減ってファンデのノリが良くなった。',
      },
      {
        id: 'clarify-ingredient-1',
        type: 'ingredient',
        source: '成分ノート',
        quote: '0.5% サリチル酸と 5% ナイアシンアミド配合で角質除去と皮脂ケアに対応。',
      },
      {
        id: 'clarify-tips-1',
        type: 'tips',
        source: '使い方のヒント',
        quote:
          '週 2〜3 回、コットンで T ゾーンから軽く拭き取った後に保湿をすると刺激なく角質ケアしやすいです。',
      },
    ],
  },
  {
    id: 'uv-milk',
    name: 'ブランシェル UV プロテクトミルク',
    brand: 'Sunnyveil',
    category: '日焼け止めミルク',
    tags: ['UV', '日焼け止め', 'PA++++'],
    rating: 4.8,
    price: '¥2,500',
    image: 'https://placehold.co/96x96?text=UV',
    reason:
      'ノンケミカル処方で白浮きせず、室内外の UV-A/B をブロックしつつ保湿成分も配合。',
    evidence: [
      {
        id: 'uv-review-1',
        type: 'review',
        source: '＠Beauty 日焼け止め部門 金賞 (2024)',
        quote: 'テレワーク中でも焼けないと人気のロングセラー。',
      },
      {
        id: 'uv-ingredient-1',
        type: 'ingredient',
        source: '成分情報',
        quote: '酸化亜鉛・酸化チタンの二重ブロック＋スクワランで乾燥しにくい設計。',
      },
      {
        id: 'uv-tips-1',
        type: 'tips',
        source: '使い方のヒント',
        quote:
          '外出 20 分前にパール 2 粒分を顔全体に塗り、頬骨や鼻筋など高い部分は重ね塗りするとムラなく仕上がります。',
      },
    ],
  },
]

export function getFallbackProduct() {
  return PRODUCTS.toSorted((a, b) => b.rating - a.rating)[0]
}
