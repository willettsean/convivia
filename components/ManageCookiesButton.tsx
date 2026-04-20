'use client'

export default function ManageCookiesButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('convivia:manage-cookies'))}
      className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-sm"
    >
      Manage Cookies
    </button>
  )
}
