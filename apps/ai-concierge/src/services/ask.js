import { PRODUCTS, getFallbackProduct } from '../data/products.js'

const KEYWORD_RULES = [
  {
    keywords: ['保湿', '乾燥'],
    productId: 'hydration-toner',
    followUp: {
      topic: 'hydration',
      question:
        '乾燥対策でお探しのカテゴリはどれですか？化粧水・クリーム・記事など、知りたい内容を入力してください。',
      options: ['化粧水が知りたい', 'クリームが知りたい', '美容液が知りたい', '乾燥対策の記事を知りたい'],
    },
  },
  {
    keywords: ['ニキビ', '角質'],
    productId: 'clarifying-toner',
  },
  {
    keywords: ['日焼け', 'uv', 'UV'],
    productId: 'uv-milk',
  },
]

function cloneProduct(product) {
  return JSON.parse(JSON.stringify(product))
}

function findProductById(id) {
  const product = PRODUCTS.find((item) => item.id === id)
  return product ? cloneProduct(product) : null
}

function matchRule(prompt) {
  const normalized = prompt.toLowerCase()
  return KEYWORD_RULES.find((rule) =>
    rule.keywords.some((kw) => normalized.includes(kw.toLowerCase())),
  )
}

export function selectProductsByPrompt(prompt) {
  const rule = matchRule(prompt)
  if (rule) {
    const matchedProduct = findProductById(rule.productId)
    if (matchedProduct) {
      return matchedProduct
    }
  }
  return cloneProduct(getFallbackProduct())
}

/**
 * 疑似 AI ロジック（簡易ルール）
 * @param {import('../types.js').AskRequest} req
 * @returns {Promise<import('../types.js').AskResponse>}
 */
export async function ask(req) {
  const rule = matchRule(req.query)
  const product =
    (rule && findProductById(rule.productId)) ||
    cloneProduct(getFallbackProduct())

  return new Promise((resolve) => {
    setTimeout(() => {
      if (rule?.followUp) {
        resolve({
          type: 'follow-up',
          followUpQuestion: `了解しました。${rule.followUp.question}`,
          product,
          topic: rule.followUp.topic,
          options: rule.followUp.options ?? [],
        })
        return
      }

      resolve({
        type: 'final',
        answer: `${product.brand}の「${product.name}」をおすすめします。理由: ${product.reason}`,
        product,
        evidence: product.evidence,
      })
    }, 250)
  })
}
