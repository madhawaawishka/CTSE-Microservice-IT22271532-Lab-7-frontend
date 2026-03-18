'use client'

import { useState } from 'react'
import type { OrderEntry } from '@/app/page'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gateway.proudbush-b4fa9af7.southeastasia.azurecontainerapps.io'

const SAMPLE_ORDERS = [
  '{"productId":"PROD-001","quantity":2,"customerId":"CUST-123","price":49.99}',
  '{"productId":"PROD-042","quantity":1,"customerId":"CUST-456","price":199.00}',
  '{"productId":"PROD-007","quantity":5,"customerId":"CUST-789","price":9.99}',
]

type Props = { onOrderPlaced: (entry: OrderEntry) => void }

export default function OrderForm({ onOrderPlaced }: Props) {
  const [payload, setPayload] = useState(SAMPLE_ORDERS[0])
  const [loading, setLoading] = useState(false)
  const [last, setLast] = useState<OrderEntry | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setLast(null)

    const entry: OrderEntry = {
      id: crypto.randomUUID(),
      payload,
      status: 'success',
      response: '',
      timestamp: new Date().toLocaleTimeString(),
    }

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
      entry.response = await res.text()
      entry.status = res.ok ? 'success' : 'error'
    } catch (err: unknown) {
      entry.status = 'error'
      entry.response = err instanceof Error ? err.message : 'Network error – is the API Gateway running?'
    }

    setLast(entry)
    onOrderPlaced(entry)
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quick Samples</label>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_ORDERS.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPayload(s)}
              className="text-xs px-3 py-1 rounded-full border border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition"
            >
              Sample {i + 1}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="payload" className="block text-sm font-medium text-gray-700 mb-1">
            Order Payload <span className="text-gray-400">(JSON string)</span>
          </label>
          <textarea
            id="payload"
            rows={5}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full font-mono text-sm border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder='{"productId":"PROD-001","quantity":1,"customerId":"CUST-001","price":10.00}'
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || !payload.trim()}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium px-6 py-2.5 rounded-lg transition"
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {loading ? 'Sending…' : 'Place Order'}
          </button>
          <span className="text-xs text-gray-400">POST → {API_URL}/orders</span>
        </div>
      </form>

      {last && (
        <div
          className={`rounded-lg px-4 py-3 text-sm font-medium flex items-start gap-3 ${
            last.status === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <span className="mt-0.5 text-lg">{last.status === 'success' ? '✅' : '❌'}</span>
          <div>
            <div className="font-semibold">{last.status === 'success' ? 'Order submitted!' : 'Request failed'}</div>
            <div className="font-normal text-xs mt-0.5 opacity-80">{last.response}</div>
          </div>
        </div>
      )}
    </div>
  )
}
