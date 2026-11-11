/**
 * app/terms/page.tsx  -  Terms of Use (address: "/terms").
 * Starting template only. Have a lawyer review before launch.
 */
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the Ruling Mind Tech website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="11 November 2026" intro="Simple rules for using our website. By browsing it, you agree to them.">
      <h2>1. About this website</h2>
      <p>This website is operated by {siteConfig.name}. It describes our services and lets you contact us. Information here is general and does not form an offer or contract by itself.</p>

      <h2>2. Acceptable use</h2>
      <ul>
        <li>Do not attempt to break, overload or gain unauthorised access to the website or its servers.</li>
        <li>Do not send spam, malicious code or unlawful content through our forms.</li>
        <li>Do not copy or reuse our content or branding without written permission.</li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>The text, logo, design and code of this website belong to {siteConfig.name} unless stated otherwise. All rights are reserved.</p>

      <h2>4. Projects and contracts</h2>
      <p>Any project we undertake is governed by a separate written agreement that sets out scope, price, timelines and ownership of deliverables.</p>

      <h2>5. Liability</h2>
      <p>We work hard to keep this website accurate and available, but it is provided &quot;as is&quot;. To the extent the law allows, we are not liable for losses arising from its use.</p>

      <h2>6. Privacy</h2>
      <p>
        How we handle personal data is explained in our <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at the location of our registered office will have jurisdiction.</p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPage>
  );
}
