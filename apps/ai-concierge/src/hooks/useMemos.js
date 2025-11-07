import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'ai-concierge:memos'

function readMemos() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Failed to read memos from localStorage', error)
    return []
  }
}

export function useMemos() {
  const [memos, setMemos] = useState(() =>
    typeof window === 'undefined' ? [] : readMemos(),
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
  }, [memos])

  const addMemo = useCallback((product) => {
    setMemos((prev) => {
      if (prev.some((memo) => memo.product.id === product.id)) {
        return prev
      }
      const next = [
        ...prev,
        {
          product,
          savedAt: new Date().toISOString(),
        },
      ]
      return next
    })
  }, [])

  const clearMemos = useCallback(() => {
    setMemos([])
  }, [])

  return { memos, addMemo, clearMemos }
}
