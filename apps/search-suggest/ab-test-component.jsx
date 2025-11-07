import { useState } from 'react';

// パターンA: シンプルなサジェスト
const SearchUIMockA = () => {
  const [searchQuery, setSearchQuery] = useState('ディ');

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
      alert(`検索: ${searchQuery}`);
    } else if (char === '→' || char === '↶' || char === 'ABC' || char === '😊') {
      return;
    } else {
      setSearchQuery(searchQuery + char);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-white px-4 py-2 flex justify-between items-center text-xs border-b">
        <span className="font-semibold">16:18</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
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

      <div className="bg-gray-300 p-2 rounded-t-2xl">
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

        <div className="flex justify-between items-center px-4 mt-2 mb-2">
          <button className="text-gray-600 text-2xl">🌐</button>
          <button className="text-gray-600 text-2xl">🎤</button>
        </div>
      </div>
    </div>
  );
};

// パターンB: ラベル付きサジェスト + 検索結果
const SearchUIMockB = () => {
  const [searchQuery, setSearchQuery] = useState('ディ');
  const [screen, setScreen] = useState('search');
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const suggestions = [
    { label: '商品名', text: 'ディオール リップ' },
    { label: 'ブランド', text: 'ディオール' },
    { label: '商品名', text: 'ディオール ハイライト' },
    { label: '商品名', text: 'ディオール コンシーラー' },
    { label: '商品名', text: 'ディオール ファンデーション' },
    { label: '商品名', text: 'ディオール チーク' },
    { label: '商品名', text: 'ディオール アイシャドウ' },
    { label: 'ブランド', text: 'ディオール バックステージ' },
  ];

  const searchResults = [
    { id: 1, name: 'ディオール リップ - ルージュ ディオール', brand: 'Christian Dior', price: '¥4,200' },
    { id: 2, name: 'ディオール ハイライト - リュミナイザー', brand: 'Christian Dior', price: '¥5,800' },
    { id: 3, name: 'ディオール コンシーラー - プレステージ', brand: 'Christian Dior', price: '¥6,000' },
    { id: 4, name: 'ディオール ファンデーション - フォーエヴァー', brand: 'Christian Dior', price: '¥7,500' },
    { id: 5, name: 'ディオール チーク - ルージュ ブラッシュ', brand: 'Christian Dior', price: '¥4,800' },
    { id: 6, name: 'ディオール アイシャドウ - 5 クルール', brand: 'Christian Dior', price: '¥6,800' },
  ];

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
      setScreen('results');
    } else if (char === '→' || char === '↶' || char === 'ABC' || char === '😊') {
      return;
    } else {
      setSearchQuery(searchQuery + char);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedKeyword(suggestion.text);
    setScreen('results');
  };

  const handleBackClick = () => {
    setScreen('search');
  };

  if (screen === 'results') {
    return (
      <div className="h-screen bg-gray-100 flex flex-col">
        <div className="bg-white px-4 py-2 flex justify-between items-center text-xs border-b">
          <span className="font-semibold">16:18</span>
          <div className="flex gap-1">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        <div className="bg-white p-4 border-b">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={handleBackClick}
              className="text-blue-600 font-medium text-sm"
            >
              ← 戻る
            </button>
          </div>
          <h1 className="text-lg font-bold text-gray-800">
            「{selectedKeyword || searchQuery}」の検索結果
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {searchResults.length}件の商品が見つかりました
          </p>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
            >
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-2xl">💄</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-sm text-gray-800 mb-1">
                    {result.name}
                  </h2>
                  <p className="text-xs text-gray-600 mb-2">{result.brand}</p>
                  <p className="font-bold text-sm text-orange-600">{result.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-white px-4 py-2 flex justify-between items-center text-xs border-b">
        <span className="font-semibold">16:18</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center gap-3 bg-gray-200 rounded-full px-4 py-2">
            <span className="text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="検索キーワード"
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

        <div className="flex-1 overflow-y-auto bg-white">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
            >
              <span className="text-gray-400 text-lg">🔍</span>
              <div className="flex-1">
                <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 font-medium">
                  {suggestion.label}
                </span>
                <span className="text-gray-800 text-sm">{suggestion.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-300 p-2 rounded-t-2xl">
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

        <div className="flex justify-between items-center px-4 mt-2 mb-2">
          <button className="text-gray-600 text-2xl">🌐</button>
          <button className="text-gray-600 text-2xl">🎤</button>
        </div>
      </div>
    </div>
  );
};

// ABテストコンポーネント
const ABTestComponent = () => {
  const [pattern, setPattern] = useState('A');

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <div className="bg-white border-b border-gray-300 p-3 flex gap-2 justify-center shadow-md">
        <button
          onClick={() => setPattern('A')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            pattern === 'A'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          パターンA
        </button>
        <button
          onClick={() => setPattern('B')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            pattern === 'B'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          パターンB
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {pattern === 'A' ? <SearchUIMockA /> : <SearchUIMockB />}
      </div>
    </div>
  );
};

export default ABTestComponent;
