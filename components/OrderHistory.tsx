'use client'

import type { OrderEntry } from '@/app/page'

type Props = { orders: OrderEntry[] }

export default function OrderHistory({ orders }: Props) {
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div
          key={o.id}
          className={`flex items-start gap-4 bg-white border rounded-xl px-5 py-4 shadow-sm ${
            o.status === 'success' ? 'border-gray-200' : 'border-red-200'
          }`}
        >
          <span className="text-lg mt-0.5">{o.status === 'success' ? '✅' : '❌'}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  o.status === 'success'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {o.status.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">{o.timestamp}</span>
            </div>
            <pre className="text-xs text-gray-600 truncate">{o.payload}</pre>
            {o.response && (
              <p className="text-xs text-gray-500 mt-1 italic">{o.response}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
