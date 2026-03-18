'use client'

import { useState } from 'react'
import OrderForm from '@/components/OrderForm'
import OrderHistory from '@/components/OrderHistory'

export type OrderEntry = {
  id: string
  payload: string
  status: 'success' | 'error'
  response: string
  timestamp: string
}

export default function Home() {
  const [orders, setOrders] = useState<OrderEntry[]>([])

  function addOrder(entry: OrderEntry) {
    setOrders((prev) => [entry, ...prev])
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-1">Place an Order</h1>
        <p className="text-gray-500 text-sm mb-6">
          Orders are published to Kafka and processed by the Order, Inventory, and Billing services.
        </p>
        <OrderForm onOrderPlaced={addOrder} />
      </section>

      {orders.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Session History</h2>
          <OrderHistory orders={orders} />
        </section>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Order Service', port: '8081', color: 'indigo', desc: 'Publishes order events to Kafka' },
          { label: 'Inventory Service', port: '8082', color: 'emerald', desc: 'Consumes events, updates stock' },
          { label: 'Billing Service', port: '8083', color: 'amber', desc: 'Consumes events, processes payment' },
        ].map((svc) => (
          <div key={svc.port} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className={`text-xs font-semibold uppercase tracking-wide text-${svc.color}-600 mb-1`}>
              :{svc.port}
            </div>
            <div className="font-semibold text-gray-800">{svc.label}</div>
            <div className="text-xs text-gray-500 mt-1">{svc.desc}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
