import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { SuggestionChips } from './components/SuggestionChips.jsx'
import { MessageList } from './components/MessageList.jsx'
import { ChatInput } from './components/ChatInput.jsx'
import { MemoPanel } from './components/MemoPanel.jsx'
import { ask } from './services/ask.js'
import { useMemos } from './hooks/useMemos.js'

const SUGGESTIONS = ['乾燥対策', 'ニキビケア', 'UV対策']

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`
}

function buildFinalRecommendation(pending, userAnswer) {
  const product = pending.product
  const trimmed = userAnswer.trim()
  const lower = trimmed.toLowerCase()

  if (pending.topic === 'hydration') {
    if (lower.includes('記事') || lower.includes('情報')) {
      return {
        text: `乾燥対策の記事はモックでは提供していませんが、保湿ケアのポイントとして「低刺激の化粧水」「油分で潤いを閉じ込める」「室内の加湿」を意識すると乾燥を防ぎやすいです。合わせて、${product.brand}の「${product.name}」は${product.reason}`,
        product,
      }
    }

    const categoryLabel = trimmed || 'スキンケア'
    return {
      text: `${categoryLabel}での乾燥対策なら、${product.brand}の「${product.name}」がおすすめです。理由: ${product.reason}`,
      product,
    }
  }

  return {
    text: `${product.brand}の「${product.name}」をおすすめします。理由: ${product.reason}`,
    product,
  }
}

function App() {
  const [messages, setMessages] = useState([
    {
      id: createId(),
      role: 'assistant',
      text: 'こんにちは、AI ビューティーコンシェルジュです。お肌のお悩みを入力するか、チップから選んでみてください。',
    },
  ])
  const [inputText, setInputText] = useState('')
  const [expandedEvidenceId, setExpandedEvidenceId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMemoOpen, setIsMemoOpen] = useState(false)
  const [pendingRecommendation, setPendingRecommendation] = useState(null)
  const { memos, addMemo, clearMemos } = useMemos()

  const savedProductIds = useMemo(
    () => memos.map((memo) => memo.product.id),
    [memos],
  )

  const sendQuery = useCallback(
    async (query) => {
      const trimmed = query.trim()
      if (!trimmed) return

      const userMessage = {
        id: createId(),
        role: 'user',
        text: trimmed,
      }

      setIsMemoOpen(false)

      if (pendingRecommendation) {
        const finalResponse = buildFinalRecommendation(
          pendingRecommendation,
          trimmed,
        )

        setMessages((prev) => [
          ...prev,
          userMessage,
          {
            id: createId(),
            role: 'assistant',
            text: finalResponse.text,
            payload: finalResponse.product
              ? {
                  product: finalResponse.product,
                }
              : undefined,
          },
        ])
        setInputText('')
        setExpandedEvidenceId(null)
        setPendingRecommendation(null)
        setIsLoading(false)
        return
      }

      setMessages((prev) => [...prev, userMessage])
      setInputText('')
      setIsLoading(true)
      setExpandedEvidenceId(null)

      try {
        const response = await ask({ query: trimmed })

        if (response.type === 'follow-up') {
          setMessages((prev) => [
            ...prev,
            {
              id: createId(),
              role: 'assistant',
              text: response.followUpQuestion,
              payload:
                response.options?.length > 0
                  ? { followUpOptions: response.options }
                  : undefined,
            },
          ])
          setPendingRecommendation({
            product: response.product,
            topic: response.topic,
          })
          return
        }

        const assistantMessage = {
          id: createId(),
          role: 'assistant',
          text: response.answer,
          payload: {
            product: response.product,
          },
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error(error)
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: 'assistant',
            text: 'エラーが発生しました。時間を置いて再度お試しください。',
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [pendingRecommendation],
  )

  const handleChipSelect = (text) => {
    setInputText(text)
    setIsMemoOpen(false)
    sendQuery(text)
  }

  const handleToggleEvidence = (productId) => {
    setExpandedEvidenceId((prev) => (prev === productId ? null : productId))
  }

  const handleSaveMemo = (product) => {
    addMemo(product)
  }

  const handleSubmit = () => {
    setIsMemoOpen(false)
    sendQuery(inputText)
  }

  const handleFollowUpSelect = (option) => {
    sendQuery(option)
  }

  const openMemo = () => setIsMemoOpen(true)
  const closeMemo = () => setIsMemoOpen(false)

  useEffect(() => {
    if (!isMemoOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMemoOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMemoOpen])

  useEffect(() => {
    document.body.style.overflow = isMemoOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMemoOpen])

  return (
    <div className="app-shell">
      <main className="chat-pane">
        <header className="chat-header">
          <div className="chat-heading">
            <h1>AI ビューティーコンシェルジュ</h1>
            <p>会話しながら最適なアイテムを提案します。</p>
          </div>
          <button
            type="button"
            className="secondary memo-trigger"
            onClick={openMemo}
            aria-haspopup="dialog"
            aria-expanded={isMemoOpen}
          >
            メモを見る ({memos.length})
          </button>
        </header>

        <SuggestionChips options={SUGGESTIONS} onSelect={handleChipSelect} />

        <MessageList
          messages={messages}
          expandedEvidenceId={expandedEvidenceId}
          onToggleEvidence={handleToggleEvidence}
          onSaveMemo={handleSaveMemo}
          savedProductIds={savedProductIds}
          onSelectFollowUp={handleFollowUpSelect}
        />

        <ChatInput
          value={inputText}
          onChange={setInputText}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </main>
      {isMemoOpen && (
        <div
          className="memo-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="memo-title"
          onClick={closeMemo}
        >
          <div
            className="memo-drawer"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <MemoPanel memos={memos} onClear={clearMemos} onClose={closeMemo} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
