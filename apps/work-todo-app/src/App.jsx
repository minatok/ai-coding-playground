import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'work-todo-tracker-v1'

const STATUS = {
  todo: { label: 'ToDo', accent: 'todo' },
  in_progress: { label: '進行中', accent: 'progress' },
  done: { label: '完了', accent: 'done' },
}

const STATUS_ORDER = ['todo', 'in_progress', 'done']

const getNextStatus = (current) => {
  const index = STATUS_ORDER.indexOf(current)
  if (index === -1) return STATUS_ORDER[0]
  return STATUS_ORDER[(index + 1) % STATUS_ORDER.length]
}

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const toDateInputValue = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60000)
  return local.toISOString().slice(0, 10)
}

const getToday = () => toDateInputValue(new Date())

const isIsoDateString = (value) => {
  if (typeof value !== 'string') return false
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

const normalizeTask = (task) => ({
  id: typeof task.id === 'string' ? task.id : createId(),
  title: typeof task.title === 'string' ? task.title : '',
  goal: typeof task.goal === 'string' ? task.goal : '',
  category: typeof task.category === 'string' ? task.category : '',
  notes: typeof task.notes === 'string' ? task.notes : '',
  status: STATUS[task.status] ? task.status : 'todo',
  dueDate: isIsoDateString(task.dueDate) ? task.dueDate : getToday(),
  createdAt: isIsoDateString(task.createdAt) ? task.createdAt : new Date().toISOString(),
  completedAt: isIsoDateString(task.completedAt) ? task.completedAt : null,
})

const loadInitialTasks = () => {
  if (typeof window === 'undefined') return []
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return []
  try {
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeTask)
  } catch (error) {
    console.warn('タスクの読み込みに失敗しました', error)
    return []
  }
}

const formatDate = (value, fallback = '未設定') => {
  if (!value) return fallback
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return fallback
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date)
}

const startOfWeek = (value) => {
  const date = new Date(value)
  const day = date.getDay()
  const diff = (day + 6) % 7
  date.setHours(0, 0, 0, 0)
  return new Date(date.getTime() - diff * 86400000)
}

const isSameWeek = (value, reference) => {
  if (!value) return false
  const start = startOfWeek(reference)
  const end = new Date(start.getTime() + 7 * 86400000)
  const date = new Date(value)
  return date >= start && date < end
}

function App() {
  const [tasks, setTasks] = useState(loadInitialTasks)
  const [form, setForm] = useState(() => ({
    title: '',
    goal: '',
    category: '',
    dueDate: getToday(),
  }))
  const [search, setSearch] = useState('')
  const [rangeFilter, setRangeFilter] = useState('all')
  const [expandedTasks, setExpandedTasks] = useState([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const filteredTasks = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    const today = new Date()
    return tasks.filter((task) => {
      const matchesKeyword =
        !normalized ||
        `${task.title} ${task.goal} ${task.notes} ${task.category}`.toLowerCase().includes(normalized)
      if (!matchesKeyword) return false
      if (rangeFilter === 'all') return true
      if (rangeFilter === 'thisWeek') {
        return isSameWeek(task.dueDate, today)
      }
      if (rangeFilter === 'overdue') {
        const due = new Date(task.dueDate)
        due.setHours(0, 0, 0, 0)
        const anchor = new Date()
        anchor.setHours(0, 0, 0, 0)
        return task.status !== 'done' && due < anchor
      }
      return true
    })
  }, [tasks, search, rangeFilter])

  const groupedTasks = useMemo(() => {
    const groups = new Map(STATUS_ORDER.map((key) => [key, []]))
    filteredTasks
      .slice()
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.createdAt.localeCompare(b.createdAt))
      .forEach((task) => {
        const bucket = groups.get(task.status)
        bucket.push(task)
      })
    return groups
  }, [filteredTasks])

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((task) => task.status === 'done').length
    const inProgress = tasks.filter((task) => task.status === 'in_progress').length
    const upcoming = tasks.filter((task) => {
      if (!task.dueDate) return false
      const due = new Date(task.dueDate)
      const today = new Date()
      const diff = (due - today) / 86400000
      return diff >= 0 && diff <= 3 && task.status !== 'done'
    }).length
    const completionRate = total === 0 ? 0 : Math.round((done / total) * 100)
    const byCategory = tasks.reduce((acc, task) => {
      if (!task.category) return acc
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {})
    const topCategories = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
    const thisWeekWins = tasks
      .filter((task) => task.status === 'done' && isSameWeek(task.completedAt, new Date()))
      .map((task) => ({
        id: task.id,
        title: task.title,
        goal: task.goal,
        notes: task.notes,
        completedAt: task.completedAt,
      }))
      .slice(0, 5)
    return {
      total,
      done,
      inProgress,
      upcoming,
      completionRate,
      topCategories,
      thisWeekWins,
    }
  }, [tasks])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTask = (event) => {
    event.preventDefault()
    const trimmedTitle = form.title.trim()
    if (!trimmedTitle) return
    setTasks((prev) => [
      ...prev,
      normalizeTask({
        id: createId(),
        title: trimmedTitle,
        goal: form.goal.trim(),
        category: form.category.trim(),
        dueDate: form.dueDate || getToday(),
        status: 'todo',
        notes: '',
        createdAt: new Date().toISOString(),
      }),
    ])
    setForm({
      title: '',
      goal: '',
      category: form.category,
      dueDate: form.dueDate || getToday(),
    })
  }

  const updateTask = (id, updater) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        const updates = typeof updater === 'function' ? updater(task) : updater
        const next = { ...task, ...updates }
        return normalizeTask(next)
      })
    )
  }

  const handleStatusChange = (id, nextStatus) => {
    updateTask(id, (task) => ({
      status: nextStatus,
      completedAt: nextStatus === 'done' ? new Date().toISOString() : task.completedAt,
    }))
  }

  const handleNotesChange = (id, value) => {
    updateTask(id, { notes: value })
  }

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    setExpandedTasks((prev) => prev.filter((taskId) => taskId !== id))
  }

  const handleClearForm = () => {
    setForm({
      title: '',
      goal: '',
      category: '',
      dueDate: getToday(),
    })
  }

  const toggleTaskExpansion = (id) => {
    setExpandedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id],
    )
  }

  const handleStatusCycle = (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus)
    handleStatusChange(id, nextStatus)
  }

  return (
    <div className="app">
      <header className="page-header">
        <div>
          <p className="eyebrow">業務TODO管理 / 成果ダッシュボード</p>
          <h1>成果が見える TODOボード</h1>
          <p className="lead">
            タスクの消化状況とビジネスインパクトをひと目で把握し、振り返りをスムーズにします。
          </p>
        </div>
        <div className="stats-row">
          <article className="stat-card">
            <span className="stat-label">完了率</span>
            <strong className="stat-value">{stats.completionRate}%</strong>
            <span className="stat-meta">
              {stats.done} / {stats.total} 件完了
            </span>
          </article>
          <article className="stat-card">
            <span className="stat-label">進行中</span>
            <strong className="stat-value">{stats.inProgress}</strong>
            <span className="stat-meta">フォロー中のタスク</span>
          </article>
          <article className="stat-card caution">
            <span className="stat-label">期限迫る</span>
            <strong className="stat-value">{stats.upcoming}</strong>
            <span className="stat-meta">3日以内に期限</span>
          </article>
        </div>
      </header>

      <main className="layout">
        <section className="panel focus-panel">
          <div className="panel-header">
            <h2>タスク登録</h2>
            <p>完了時の成果イメージを先に描くことで、アウトプットを明確にします。</p>
          </div>
          <form className="task-form" onSubmit={handleAddTask}>
            <label>
              <span>タスク名</span>
              <input
                name="title"
                type="text"
                placeholder="例: B社向け提案資料のドラフト作成"
                value={form.title}
                onChange={handleFormChange}
                required
              />
            </label>

            <div className="form-grid">
              <label>
                <span>カテゴリ</span>
                <input
                  name="category"
                  type="text"
                  placeholder="営業 / 採用 / 企画 など"
                  value={form.category}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                <span>期限</span>
                <input
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleFormChange}
                />
              </label>
            </div>

            <label>
              <span>期待する成果</span>
              <textarea
                name="goal"
                rows={3}
                placeholder="完了条件や期待されるインパクトを明記しておきましょう"
                value={form.goal}
                onChange={handleFormChange}
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="primary">
                タスクを登録
              </button>
              <button type="button" className="ghost" onClick={handleClearForm}>
                入力をリセット
              </button>
            </div>
          </form>
        </section>

        <section className="panel board-panel">
          <div className="board-toolbar">
            <div>
              <h2>実行ボード</h2>
              <p>ステータスごとに並び替え、進捗と成果メモを更新しましょう。</p>
            </div>
            <div className="filters">
              <input
                type="search"
                placeholder="キーワード検索"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select value={rangeFilter} onChange={(event) => setRangeFilter(event.target.value)}>
                <option value="all">全期間</option>
                <option value="thisWeek">今週の期限</option>
                <option value="overdue">期限切れ</option>
              </select>
            </div>
          </div>

          <div className="board-columns">
            {STATUS_ORDER.map((statusKey) => {
              const tasksInColumn = groupedTasks.get(statusKey)
              const meta = STATUS[statusKey]
              return (
                <article key={statusKey} className={`board-column ${statusKey}`}>
                  <header>
                    <h3>{meta.label}</h3>
                    <span className="column-count">{tasksInColumn.length}</span>
                  </header>
                  <div className="column-body">
                    {tasksInColumn.length === 0 ? (
                      <p className="empty-column">該当のタスクはありません。</p>
                    ) : (
                      tasksInColumn.map((task) => {
                        const isExpanded = expandedTasks.includes(task.id)
                        return (
                          <div
                            key={task.id}
                            className={`task-card ${isExpanded ? 'expanded' : 'compact'}`}
                          >
                            <div className="task-topline">
                              <span className="task-date">{formatDate(task.dueDate, '期限なし')}</span>
                              <button
                                type="button"
                                className={`status-chip status-${task.status}`}
                                onClick={() => handleStatusCycle(task.id, task.status)}
                                title="クリックでステータスを切り替え"
                              >
                                {STATUS[task.status].label}
                              </button>
                            </div>
                            <h4>{task.title}</h4>
                            <div className="task-meta-row">
                              <div className="meta-left">
                                {task.category && <span className="chip tiny">{task.category}</span>}
                              </div>
                              <button
                                type="button"
                                className="toggle-details"
                                onClick={() => toggleTaskExpansion(task.id)}
                              >
                                {isExpanded ? '詳細を閉じる' : '詳細'}
                              </button>
                            </div>
                            {isExpanded && (
                              <div className="task-expanded">
                                <label className="notes-label">
                                  <span>成果メモ</span>
                                  <textarea
                                    rows={3}
                                    placeholder="達成した成果や次回に活かす学びを残しましょう"
                                    value={task.notes}
                                    onChange={(event) =>
                                      handleNotesChange(task.id, event.target.value)
                                    }
                                  />
                                </label>
                                {task.goal && (
                                  <p className="task-goal">
                                    <strong>完了イメージ:</strong> {task.goal}
                                  </p>
                                )}
                                <div className="task-actions">
                                  <label className="status-select">
                                    <span>ステータス</span>
                                    <select
                                      value={task.status}
                                      onChange={(event) =>
                                        handleStatusChange(task.id, event.target.value)
                                      }
                                    >
                                      {STATUS_ORDER.map((value) => (
                                        <option key={value} value={value}>
                                          {STATUS[value].label}
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                  <button
                                    type="button"
                                    className="ghost danger"
                                    onClick={() => handleDelete(task.id)}
                                  >
                                    削除
                                  </button>
                                </div>
                                {task.completedAt && (
                                  <p className="completed-at">
                                    完了: {formatDate(task.completedAt, '---')}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="panel achievements-panel">
          <div className="panel-header">
            <h2>今週のハイライト</h2>
            <p>最新の成果メモは週次レポートや1on1の材料として活用できます。</p>
          </div>

          {stats.thisWeekWins.length === 0 ? (
            <p className="empty-state">
              今週完了したタスクはまだありません。完了ステータスに移すとここへ表示されます。
            </p>
          ) : (
            <ul className="wins-list">
              {stats.thisWeekWins.map((task) => (
                <li key={task.id}>
                  <div>
                    <span className="win-date">{formatDate(task.completedAt)}</span>
                    <h3>{task.title}</h3>
                  </div>
                  <div className="win-notes">
                    {task.notes ? (
                      <p>{task.notes}</p>
                    ) : (
                      <p className="win-placeholder">成果メモが未記入です。</p>
                    )}
                    {task.goal && <p className="win-goal">完了イメージ: {task.goal}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {stats.topCategories.length > 0 && (
            <div className="categories-glance">
              <h3>注力カテゴリ</h3>
              <ul>
                {stats.topCategories.map(([category, count]) => (
                  <li key={category}>
                    <span className="chip prominent">{category}</span>
                    <span className="count">{count}件</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
