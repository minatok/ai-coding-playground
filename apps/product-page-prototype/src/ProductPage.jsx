import { useState } from 'react';
import { Heart, Share2, Star, ChevronDown, MapPin, Truck } from 'lucide-react';
import powderImage from '../powder.png';

const colors = [
  { id: '00', name: 'Translucent', hex: '#F5F5F5' },
  { id: '01', name: 'Crystal Translucent', hex: '#FFF9E6' },
  { id: '02', name: 'Lucent Lilac', hex: '#F0E6F6' },
  { id: '03', name: 'Luminous Pink', hex: '#FFE6F0' },
  { id: '04', name: 'Shimmering Ivory', hex: '#FFF0E6' },
  { id: '05', name: 'Glowy Tan', hex: '#F5E6D3' },
  { id: '06', name: 'Nude Matte Beige', hex: '#EDD9C7' },
  { id: '07', name: 'Nude Matte Snow', hex: '#F8F8F8' },
  { id: '101', name: 'Harmony Veil', hex: '#F3F0E8' },
];

const reviews = [
  {
    name: 'ESY☆さん',
    age: 41,
    skinType: '乾燥肌',
    date: '2024/2/23',
    rating: 5,
    text: 'パフが柔らかくなった気がします。つけると白浮きなし！',
    keywords: ['使い心地◎', 'リピート率高'],
  },
  {
    name: 'taoailand115さん',
    age: 29,
    skinType: '乾燥肌',
    date: '2024/12/4',
    rating: 5,
    text: '101はなんといっても透明感！！自然な透明感を引き出してくれます',
    keywords: ['肌なじみ良い', 'リピート率高'],
  },
  {
    name: 'はるてぃん58さん',
    age: 35,
    skinType: '乾燥肌',
    date: '2024/8/3',
    rating: 5,
    text: 'ケースを裏返して混ぜてから肌につけると自然なトーンアップが',
    keywords: ['毛穴カバー', 'さらさら'],
  },
];

const reviewTags = ['肌なじみ良い', '毛穴カバー', '使い心地◎', 'さらさら', 'リピート率高'];

const reviewSummaries = {
  default:
    '1,030件のクチコミを分析すると「肌がサラサラになる」「毛穴がふんわり隠れる」「透明感が出る」といった声が目立ちました。リピート購入者の多くが夜まで崩れにくい点や肌なじみの良さを推しており、初めて使う人でも仕上がりの自然さに満足しています。パフや粉質の改良を評価する意見も散見され、乾燥肌でも粉っぽさを感じにくいというコメントが寄せられています。',
  '肌なじみ良い':
    '「肌なじみ良い」を選んだユーザーからは、肌に乗せた瞬間に溶け込むように広がり、厚塗り感が出にくい点が高評価です。透明感が出るのに白浮きしにくく、メイク直しでも自然な仕上がりを保てるという声が寄せられています。',
  '毛穴カバー':
    '毛穴カバーを重視するクチコミでは、粉質が細かくふんわりと毛穴をぼかすため、近距離でも肌が滑らかに見えるという意見が多いです。Tゾーンの崩れを抑えつつ、頬は乾燥しにくいというバランスを評価する声が目立ちます。',
  '使い心地◎':
    '「使い心地◎」と答えた利用者は、パフの肌当たりや粉の広がりの良さに満足しており、サッと乗せるだけでムラになりにくい点を支持しています。軽い付け心地ながら仕上がりが均一で、時間がない朝でも扱いやすいという実感が多数です。',
  'さらさら':
    '「さらさら」のキーワードでは、仕上げた直後から粉っぽくならずにサラサラの質感が続くとの声が多く、湿気の多い日でも肌表面がべたつかない点が好評です。マスク移りが少ないという意見も複数寄せられています。',
  'リピート率高':
    'リピート率が高いクチコミでは、長時間崩れにくい仕上がりと仕上げの上品さが継続購入の理由として挙げられています。色展開や限定パッケージを楽しみにしているユーザーも多く、季節ごとに買い足すほどの信頼感が伝わります。',
};

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState('101');
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection((current) => (current === section ? null : section));
  };

  const filteredReviews = reviews.filter(
    (review) => !selectedKeyword || review.keywords.includes(selectedKeyword),
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
        <h1 className="text-sm font-semibold">商品詳細</h1>
        <div className="flex gap-4">
          <Share2 size={20} className="cursor-pointer text-gray-600" />
          <Heart
            size={20}
            className={`cursor-pointer transition ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            onClick={() => setLiked((prev) => !prev)}
          />
        </div>
      </div>

      <div className="relative flex aspect-[4/3] items-center justify-center bg-white">
        <div className="flex h-full w-full items-center justify-center bg-white">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-56 w-56 items-center justify-center">
              <img src={powderImage} alt="ルースパウダーのパッケージ" className="h-full w-full object-contain" />
            </div>
            <p className="text-xs text-gray-400">1/12</p>
          </div>
        </div>
        <div className="absolute right-3 top-3 rounded bg-white px-2 py-1 text-xs font-semibold text-pink-600 shadow">
          リニューアル
        </div>
      </div>

      <div className="border-b bg-white px-4 py-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="mb-1 text-xs text-gray-500">コスメデコルテ</p>
            <h2 className="text-lg font-bold">ルース パウダー</h2>
          </div>
          <div className="flex items-center gap-1 rounded bg-yellow-50 px-2 py-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">4.8</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">¥8,250 (税込)</p>
        <p className="mt-2 text-xs text-gray-400">クチコミ数: 8,463 件</p>
      </div>

      <div className="border-b bg-white px-4 py-4">
        <p className="mb-3 text-xs font-semibold text-gray-700">今すぐ買える！</p>
        <button className="mb-2 w-full rounded-lg bg-pink-500 py-3 text-sm font-semibold text-white">
          @cosme公式通販
        </button>
        <button className="w-full rounded-lg bg-gray-100 py-3 text-sm font-semibold text-gray-700">
          @cosme STORE
        </button>
      </div>

      <div className="border-b bg-white px-4 py-3">
        <p className="mb-2 text-sm font-semibold">色選択</p>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`h-10 rounded-md border-2 transition ${
                selectedColor === color.id ? 'border-pink-500 ring-2 ring-pink-300' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              type="button"
            >
              <span className="text-xs font-semibold text-gray-600">{color.id}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">{colors.find((color) => color.id === selectedColor)?.name}</p>
      </div>

      <div className="border-b bg-white px-4 py-4">
        <p className="mb-3 text-sm font-semibold">数量</p>
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300"
            type="button"
          >
            −
          </button>
          <span className="w-8 text-center text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((value) => value + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300"
            type="button"
          >
            +
          </button>
        </div>
        <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-3 text-sm font-semibold text-white">
          カートに追加
        </button>
      </div>

      <div className="space-y-3 border-b bg-white px-4 py-4">
        <div className="flex items-start gap-3">
          <Truck size={18} className="mt-1 text-gray-600" />
          <div>
            <p className="text-xs font-semibold text-gray-700">送料無料</p>
            <p className="text-xs text-gray-500">¥3,000以上のお買い上げで送料無料</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="mt-1 text-gray-600" />
          <div>
            <p className="text-xs font-semibold text-gray-700">店舗受取可能</p>
            <p className="text-xs text-gray-500">全国20店舗以上で受け取り可能</p>
          </div>
        </div>
      </div>

      <div className="border-b bg-white px-4 py-4">
        <button
          onClick={() => toggleSection('description')}
          className="flex w-full items-center justify-between"
          type="button"
        >
          <h3 className="text-sm font-semibold">商品説明</h3>
          <ChevronDown size={20} className={`transition ${expandedSection === 'description' ? 'rotate-180' : ''}`} />
        </button>
        {expandedSection === 'description' && (
          <div className="mt-3 space-y-2 text-xs text-gray-700">
            <p>肌の上で光を調合し、5つの質感が素肌そのものを美しく魅せ、上品で澄んだ仕上がりが持続する光フェイスパウダーです。</p>
            <p className="mt-3 font-semibold">ポイント</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>肌の上で光を調合するという発想から生まれた5つの質感</li>
              <li>光を纏うように毛穴・色ムラ・くすみをカバー</li>
              <li>極上のシルクのようななめらかなタッチ</li>
              <li>12時間美しい仕上がりが持続</li>
            </ul>
          </div>
        )}
      </div>

      <div className="border-b bg-white px-4 py-4">
        <button
          onClick={() => toggleSection('usage')}
          className="flex w-full items-center justify-between"
          type="button"
        >
          <h3 className="text-sm font-semibold">使い方</h3>
          <ChevronDown size={20} className={`transition ${expandedSection === 'usage' ? 'rotate-180' : ''}`} />
        </button>
        {expandedSection === 'usage' && (
          <div className="mt-3 space-y-2 text-xs text-gray-700">
            <p>• ベースメイクアップの最後の仕上げにお使いください。</p>
            <p>• 中ぶたにパフをあて、容器を逆さにしてパウダーをとります。</p>
            <p>• 手の甲でつき具合をみてから、軽くらせんを描くように肌にのばします。</p>
          </div>
        )}
      </div>

      <div className="border-b bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-4">
        <h3 className="mb-3 text-sm font-semibold">クチコミの傾向</h3>

        <div className="mb-4 flex gap-4 text-xs">
          <div className="text-center">
            <p className="text-base font-semibold text-gray-800">88%</p>
            <p className="mt-0.5 text-gray-500">肯定的</p>
          </div>
          <div className="border-l border-r border-gray-200 px-4 text-center">
            <p className="text-base font-semibold text-gray-800">8%</p>
            <p className="mt-0.5 text-gray-500">中立</p>
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-gray-800">4%</p>
            <p className="mt-0.5 text-gray-500">否定的</p>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {reviewTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedKeyword((current) => (current === tag ? null : tag))}
              className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                selectedKeyword === tag
                  ? 'border-pink-400 bg-pink-100 text-pink-700'
                  : 'border-pink-200 bg-white text-gray-700 hover:border-pink-400'
              }`}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="rounded bg-white p-2 text-xs leading-relaxed text-gray-700">
          {reviewSummaries[selectedKeyword] ?? reviewSummaries.default}
        </p>

        <p className="mt-3 text-xs text-gray-400">1,030件のレビューから集計</p>
      </div>

      <div className="bg-white px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            クチコミ
            {selectedKeyword && <span className="ml-2 text-xs text-gray-500">「{selectedKeyword}」でフィルタ中</span>}
          </h3>
          {selectedKeyword && (
            <button
              onClick={() => setSelectedKeyword(null)}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700"
              type="button"
            >
              クリア
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredReviews.map((review) => (
            <div key={review.name} className="border-b pb-3 last:border-b-0">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-500">
                    {review.age}歳 / {review.skinType}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={`${review.name}-${index}`} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="mb-2 text-xs text-gray-600">{review.text}</p>
              <div className="mb-2 flex gap-2">
                {review.keywords.map((keyword) => (
                  <span key={`${review.name}-${keyword}`} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    #{keyword}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
