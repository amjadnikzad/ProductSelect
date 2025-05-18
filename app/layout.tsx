import type React from "react"
import { ConfigProvider } from 'antd';

import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "E-commerce Tree Manager",
  description: "Manage your e-commerce data structure with a tree view",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir='rtl' lang="en">
    <ConfigProvider direction="rtl">
      <body>{children}</body>
      </ConfigProvider>
    </html>
  )
}
