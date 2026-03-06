export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: February 2026</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <p>
          By signing up for Convivia, you agree to these terms. Please read them carefully.
        </p>
        <h2 className="text-xl font-bold text-[#2C2C2C]">Membership</h2>
        <p>
          Membership is billed monthly and can be paused or canceled at any time from your member portal.
          Refunds are issued on a case-by-case basis.
        </p>
        <h2 className="text-xl font-bold text-[#2C2C2C]">Space use</h2>
        <p>
          Members agree to use the space respectfully, follow house rules, and treat fellow members and
          staff with courtesy. Convivia reserves the right to revoke membership for violations.
        </p>
        <h2 className="text-xl font-bold text-[#2C2C2C]">Liability</h2>
        <p>
          Convivia is not responsible for loss, theft, or damage to personal property. Members use the
          space at their own risk.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <strong>Note:</strong> Full terms of service coming soon. This is a placeholder for the POC.
        </div>
      </div>
    </div>
  )
}
