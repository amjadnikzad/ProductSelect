"use client"
import EcommerceTreeManager from "@/components/ecommerce-tree-manager"

export default function Home() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">E-commerce Data Manager</h1>
      <EcommerceTreeManager />
    </div>
  )
}
