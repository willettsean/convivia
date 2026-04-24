import ManageCookiesButton from '@/components/ManageCookiesButton'

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 space-y-10">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#fe904d]">Legal</p>
          <h1 className="font-display text-6xl text-[#0c0c0c]">Privacy Policy</h1>
          <p className="text-sm text-black/40">Last updated: April 2026</p>
        </div>

        <div className="space-y-8 text-black/70 leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Overview</h2>
            <p>
              Convivia Work ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and protect information when you visit conviviawork.com or interact
              with our services. It also describes your rights under the California Consumer Privacy Act (CCPA).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Information we collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="space-y-2 list-none pl-4">
              {[
                'Information you provide directly — name, email address, phone number, company name, and any messages you send us through our contact or tour request forms.',
                'Membership and billing data — collected and managed through our third-party platform, CoWorks.',
                'Usage and analytics data — pages visited, time on site, browser type, device type, and referring URL, collected via cookies and tracking technologies.',
                'Marketing interaction data — whether you clicked on an ad or visited our site through a paid channel, collected via the pixels described below.',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#fe904d]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Cookies and tracking technologies</h2>
            <p>
              We use cookies and similar tracking technologies to operate and improve our website, and to serve
              relevant advertising. Tracking scripts are only activated after you provide consent via the cookie
              banner. You may withdraw consent at any time using the Manage Cookies link in the footer.
            </p>
            <p>We currently use the following third-party tracking services when you accept cookies:</p>
            <div className="space-y-4 rounded-3xl bg-[#f5f0eb] p-6">
              <div>
                <p className="font-semibold text-[#0c0c0c]">Google Analytics 4</p>
                <p className="text-sm">Tracks website visits, page views, and user behavior to help us understand how people use our site. Data is processed by Google LLC. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#fe904d] hover:underline">Google Privacy Policy →</a></p>
              </div>
              <div>
                <p className="font-semibold text-[#0c0c0c]">Meta Pixel (Facebook)</p>
                <p className="text-sm">Allows us to measure the effectiveness of our Facebook and Instagram advertising and reach people who have visited our site. Data is processed by Meta Platforms, Inc. <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-[#fe904d] hover:underline">Meta Privacy Policy →</a></p>
              </div>
              <div>
                <p className="font-semibold text-[#0c0c0c]">LinkedIn Insight Tag</p>
                <p className="text-sm">Tracks conversions, enables retargeting, and provides analytics about professionals who interact with our LinkedIn ads. Data is processed by LinkedIn Corporation. <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#fe904d] hover:underline">LinkedIn Privacy Policy →</a></p>
              </div>
              <div>
                <p className="font-semibold text-[#0c0c0c]">Nextdoor Pixel</p>
                <p className="text-sm">Measures ad performance and enables retargeting on the Nextdoor platform for local community advertising. Data is processed by Nextdoor, Inc. <a href="https://help.nextdoor.com/s/article/Privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#fe904d] hover:underline">Nextdoor Privacy Policy →</a></p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul className="space-y-2 list-none pl-4">
              {[
                'Respond to tour requests, membership inquiries, and other communications.',
                'Manage memberships, billing, and access through CoWorks.',
                'Send service-related communications and, where you have opted in, marketing updates.',
                'Analyze website usage and improve our site and services.',
                'Measure the performance of our advertising campaigns.',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#fe904d]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">California privacy rights (CCPA)</h2>
            <p>
              If you are a California resident, you have the following rights under the California Consumer
              Privacy Act (CCPA):
            </p>
            <ul className="space-y-2 list-none pl-4">
              {[
                'Right to Know — You may request information about the categories and specific pieces of personal data we have collected about you.',
                'Right to Delete — You may request that we delete personal information we have collected from you, subject to certain exceptions.',
                'Right to Opt Out of Sale — We do not sell your personal information to third parties. We do share data with advertising platforms (Google, Meta, LinkedIn) for remarketing purposes. You may opt out of this data sharing by declining cookies.',
                'Right to Non-Discrimination — We will not discriminate against you for exercising any of your CCPA rights.',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#fe904d]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@conviviawork.com" className="text-[#fe904d] hover:underline font-semibold">
                hello@conviviawork.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Data retention</h2>
            <p>
              We retain personal information for as long as necessary to provide our services and fulfill the
              purposes outlined in this policy, or as required by law. Membership and billing data is managed
              by CoWorks and subject to their data retention policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Third-party links</h2>
            <p>
              Our website contains links to third-party platforms including CoWorks, LinkedIn, Meta, and Google.
              We are not responsible for the privacy practices of these services and encourage you to review
              their privacy policies directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date at the top of this page reflects
              the most recent revision. Continued use of the site after changes constitutes your acceptance
              of the updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0c0c0c]">Contact us</h2>
            <p>
              Questions about this Privacy Policy or your personal data? Contact us at:
            </p>
            <div className="rounded-3xl bg-[#f5f0eb] p-6 space-y-1">
              <p className="font-semibold text-[#0c0c0c]">Convivia Work</p>
              <p>1485 Treat Blvd, Walnut Creek, CA 94597</p>
              <a href="mailto:hello@conviviawork.com" className="text-[#fe904d] hover:underline">hello@conviviawork.com</a>
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-black/10">
            <h2 className="text-base font-bold text-[#0c0c0c]">Manage your cookie preferences</h2>
            <p className="text-sm">
              You can update your cookie consent at any time.
            </p>
            <ManageCookiesButton />
          </section>

        </div>
      </div>
    </div>
  )
}
