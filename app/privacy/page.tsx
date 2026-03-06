export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: February 2026</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p>
          Convivia (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and protect your data when you use our services.
        </p>
        <h2 className="text-xl font-bold text-[#2C2C2C]">What we collect</h2>
        <p>
          We collect information you provide directly (name, email, phone, company), as well as usage data
          to improve our services. We do not sell your personal data to third parties.
        </p>
        <h2 className="text-xl font-bold text-[#2C2C2C]">How we use your data</h2>
        <p>
          Your data is used to manage your membership, send service communications, and (with your consent)
          marketing updates about Convivia events and offers.
        </p>
        <h2 className="text-xl font-bold text-[#2C2C2C]">Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data at any time by
          contacting us at <strong>privacy@convivia.co</strong>.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <strong>Note:</strong> Full privacy policy coming soon. This is a placeholder for the POC.
        </div>
      </div>
    </div>
  )
}
