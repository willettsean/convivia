'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const GA_ID             = 'G-FHHBM6SVZH'
const META_PIXEL_ID     = '1649642579458577'
const LINKEDIN_ID       = '9151116'
const NEXTDOOR_ID       = '8da5aa42-d4da-4f64-aa5b-024e1f57e123'
const CONSENT_KEY       = 'convivia_cookie_consent'

export default function CookieManager() {
  const [consent, setConsent]       = useState<'accepted' | 'declined' | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored as 'accepted' | 'declined')
    } else {
      // Small delay so the page paints before the banner appears
      const t = setTimeout(() => setShowBanner(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  // Allow footer "Manage Cookies" button to reopen the banner
  useEffect(() => {
    const handler = () => {
      localStorage.removeItem(CONSENT_KEY)
      setConsent(null)
      setShowBanner(true)
    }
    window.addEventListener('convivia:manage-cookies', handler)
    return () => window.removeEventListener('convivia:manage-cookies', handler)
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setShowBanner(false)
  }

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setConsent('declined')
    setShowBanner(false)
  }

  return (
    <>
      {/* ── Tracking scripts — only after explicit accept ── */}
      {consent === 'accepted' && (
        <>
          {/* Google Analytics 4 */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}</Script>

          {/* Meta / Facebook Pixel */}
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');
            fbq('track','PageView');
          `}</Script>

          {/* LinkedIn Insight Tag */}
          <Script id="linkedin-insight" strategy="afterInteractive">{`
            _linkedin_partner_id="${LINKEDIN_ID}";
            window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s=document.getElementsByTagName("script")[0];
            var b=document.createElement("script");
            b.type="text/javascript";b.async=true;
            b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b,s)})(window.lintrk);
          `}</Script>

          {/* Nextdoor Pixel */}
          <Script id="nextdoor-pixel" strategy="afterInteractive">{`
            !function(e,n){var t,p;e.ndp||((t=e.ndp=function(){
            t.handleRequest?t.handleRequest.apply(t,arguments):t.queue.push(arguments)
            }).queue=[],t.v=1,(p=n.createElement(e="script")).async=!0,
            p.src="https://ads.nextdoor.com/public/pixel/ndp.js?id=${NEXTDOOR_ID}",
            (n=n.getElementsByTagName(e)[0]).parentNode.insertBefore(p,n))
            }(window,document);
            ndp('init','${NEXTDOOR_ID}',{});
            ndp('track','PAGE_VIEW');
          `}</Script>
        </>
      )}

      {/* ── Cookie consent banner ── */}
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white shadow-2xl"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-[#0c0c0c]">We use cookies</p>
              <p className="text-sm text-black/60 leading-relaxed">
                Convivia Work uses analytics and marketing cookies (Google Analytics, Meta, LinkedIn, Nextdoor) to understand
                how visitors use our site and serve relevant ads. Under California law (CCPA) you may opt out of
                marketing cookies at any time.{' '}
                <a href="/privacy" className="font-semibold text-[#fe904d] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <button
                onClick={decline}
                className="rounded-full border border-black/20 px-5 py-2 text-sm font-semibold text-black/60 transition hover:border-black/40 hover:text-black"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded-full bg-[#fe904d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#d6773d]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
