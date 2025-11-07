import { useState } from 'react';

const SearchUIMock = () => {
  const [searchQuery, setSearchQuery] = useState('ディ');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // サジェスト一覧
  const suggestions = [
    'ディオール',
    'ディオール リップ',
    'ディオール ハイライト',
    'ディオール コンシーラー',
    'ディオール ファンデ',
    'ディオール チーク',
    'ディオール アイシャドウ',
    'ディオール プレステージ',
    'ルージュ ディオール オンステージ',
    'ディオール 下地',
  ];

  // 日本語キーボード配置
  const keyboardLayout = [
    ['→', 'あ', 'か', 'き', '✕'],
    ['↶', 'た', 'な', 'は', '空白'],
    ['ABC', 'ま', 'や', 'ら', ''],
    ['😊', '^^', 'わ', '、。?!', '検索'],
  ];

  const handleKeyboardInput = (char) => {
    if (char === '✕') {
      setSearchQuery('');
    } else if (char === '空白') {
      setSearchQuery(searchQuery + ' ');
    } else if (char === '検索') {
      // 検索実行
      alert(`検索: ${searchQuery}`);
    } else if (char === '→' || char === '↶' || char === 'ABC' || char === '😊') {
      // キーボード切り替えボタン
      return;
    } else {
      setSearchQuery(searchQuery + char);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* ステータスバー */}
      <div className="bg-white px-4 py-2 flex justify-between items-center text-xs border-b">
        <span className="font-semibold">16:18</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col">
        {/* 検索ボックス */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center gap-3 bg-gray-200 rounded-full px-4 py-2">
            <span className="text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ディ"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 font-bold text-xl"
            >
              ✕
            </button>
          </div>
          <button className="absolute right-4 top-[3.5rem] text-sm text-blue-600 font-medium">
            キャンセル
          </button>
        </div>

        {/* サジェスト一覧 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
            >
              <span className="text-gray-400 text-lg">🔍</span>
              <span className="text-gray-600 text-sm">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 日本語キーボード */}
      <div className="bg-gray-300 p-2 rounded-t-2xl">
        {/* キーボードレイアウト */}
        <div className="space-y-2">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {row.map((key, keyIndex) => (
                <button
                  key={keyIndex}
                  onClick={() => handleKeyboardInput(key)}
                  className={`
                    px-3 py-3 rounded font-medium text-sm transition-all
                    ${key === '検索'
                      ? 'bg-blue-500 text-white px-6 py-3'
                      : key === '✕' || key === '空白' || key === 'ABC' || key === '↶' || key === '→' || key === '😊'
                      ? 'bg-gray-400 text-white px-4 py-3'
                      : 'bg-white text-black px-4 py-3'
                    }
                    ${key === '' ? 'hidden' : ''}
                    active:opacity-70
                  `}
                >
                  {key === '✕' ? '✕' : key === '空白' ? '空白' : key === '↶' ? '↶' : key === '→' ? '→' : key === '😊' ? '😊' : key === 'ABC' ? 'ABC' : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* キーボード下部のグローブアイコンとマイク */}
        <div className="flex justify-between items-center px-4 mt-2 mb-2">
          <button className="text-gray-600 text-2xl">🌐</button>
          <button className="text-gray-600 text-2xl">🎤</button>
        </div>
      </div>
    </div>
  );
};

export default SearchUIMock;
