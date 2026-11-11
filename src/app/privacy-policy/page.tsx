/**
 * app/privacy-policy/page.tsx  -  Privacy Policy (address: "/privacy-policy").
 * Written around India's Digital Personal Data Protection Act, 2023 (DPDP Act).
 *
 * IMPORTANT: This is a strong starting template, NOT legal advice.
 * Have a lawyer review it, and replace every "CHANGE ME" detail in src/lib/site.ts.
 */
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ruling Mind Tech collects, uses and protects personal data under the Digital Personal Data Protection Act, 2023.",
};

export default function PrivacyPolicyPage() {
  const g = siteConfig.grievanceOfficer;
  return (
    <LegalPage
      title="Privacy Policy"
      updated="11 November 2026"
      intro="We collect very little personal data, we tell you exactly why, and you stay in control. This policy is written to meet India's Digital Personal Data Protection Act, 2023."
    >
      <h2>1. Who we are</h2>
      <p>
        {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) decides why and how your personal data is processed through this website. Under the DPDP Act we are the &quot;Data Fiduciary&quot; and you are the
        &quot;Data Principal&quot;. Contact: <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>. Address: {siteConfig.address}.
      </p>

      <h2>2. What personal data we collect</h2>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, email address, phone number (optional), company (optional), the service you are interested in and your message.
        </li>
        <li>
          <strong>Cookie choice:</strong> a small record in your browser storing your cookie preferences and the time you made them.
        </li>
        <li>
          <strong>Technical logs:</strong> your IP address, browser type and the pages requested, kept briefly by our hosting provider to keep the website secure and working.
        </li>
      </ul>
      <p>We do not ask for sensitive details such as financial account numbers, government ID numbers or health information through this website.</p>

      <h2>3. Why we use your data</h2>
      <ul>
        <li>To reply to your enquiry and discuss your project (based on your consent when you tick the box on the contact form).</li>
        <li>To remember your cookie choices (necessary for the website to respect your consent).</li>
        <li>To protect the website from spam, abuse and attacks (a legitimate use permitted by the Act).</li>
        <li>To improve the website, but only if you accept analytics cookies.</li>
      </ul>
      <p>We use your data only for these purposes. We never sell personal data.</p>

      <h2 id="cookies">4. Cookies and similar storage</h2>
      <p>Optional categories stay switched off until you choose to enable them. You can change your choice at any time using &quot;Cookie Settings&quot; in the footer of every page.</p>
      <ul>
        <li>
          <strong>Necessary (always on):</strong> <code>rmt_consent</code> stores your cookie preferences in your browser for up to 12 months.
        </li>
        <li>
          <strong>Analytics (off until you accept):</strong> help us understand which pages are useful. At the time of writing, no analytics tools are active.
        </li>
        <li>
          <strong>Marketing (off until you accept):</strong> help us measure campaigns. At the time of writing, no marketing tools are active.
        </li>
      </ul>
      <p>If we add such tools in future, they will load only after you give permission, and this policy will be updated.</p>
      <p>
        <strong>Google Maps:</strong> the Contact page can show a map provided by Google. It is never loaded automatically. Only if you click &quot;Load map&quot; does your browser connect to Google, which
        then receives your IP address and may set its own cookies, under Google&apos;s privacy policy. If you prefer, you can use the &quot;Open in Google Maps&quot; link instead.
      </p>

      <h2>5. Who we share data with</h2>
      <p>
        We share data only with service providers who help us run the website and handle enquiries (for example web hosting and email services), under written duties to protect it. If you choose to load the Google map, Google also receives technical data from your browser, as explained above. We may disclose data
        when the law requires it.
      </p>

      <h2>6. How long we keep data</h2>
      <p>
        Enquiries are kept for as long as needed to respond and, if we work together, for the duration of the relationship plus the period required by law. If your enquiry does not lead to a project,
        we delete it within 12 months. Your cookie choice is kept for 12 months. We erase personal data when its purpose has ended or when you withdraw consent, unless a law requires us to keep it.
      </p>

      <h2>7. How we protect your data</h2>
      <p>
        We use encrypted connections (HTTPS), strict security headers, input validation, spam and rate-limit protection, restricted access to enquiries and regular software updates. If a personal data
        breach occurs, we will inform the Data Protection Board of India and the people affected, as the Act requires.
      </p>

      <h2>8. Your rights as a Data Principal</h2>
      <ul>
        <li>
          <strong>Access:</strong> ask for a summary of the personal data we hold and how it is used, and who we shared it with.
        </li>
        <li>
          <strong>Correction and erasure:</strong> ask us to correct, complete, update or erase your data.
        </li>
        <li>
          <strong>Withdraw consent:</strong> you can withdraw consent at any time, and doing so will be as easy as giving it. Withdrawal does not affect what we did lawfully before.
        </li>
        <li>
          <strong>Grievance redressal:</strong> raise a complaint with us first. If you are not satisfied, you may approach the Data Protection Board of India.
        </li>
        <li>
          <strong>Nominate:</strong> name another person to exercise your rights if you die or become unable to do so.
        </li>
      </ul>
      <p>
        To use any of these rights, email <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>. We will respond within a reasonable time and in any case within the period
        prescribed by law.
      </p>

      <h2>9. Children</h2>
      <p>
        This website is meant for businesses and adults. We do not knowingly collect personal data from anyone under 18 years of age. If you believe a child has sent us data, contact us and we will
        delete it. We never track or target children with advertising.
      </p>

      <h2>10. Transfers outside India</h2>
      <p>
        Some of our service providers may process data on servers outside India. We transfer data only to countries that are not restricted by the Government of India under the Act, and we require the
        same level of care.
      </p>

      <h2>11. Grievance Officer</h2>
      <p>
        {g.name}
        <br />
        Email: <a href={`mailto:${g.email}`}>{g.email}</a>
        <br />
        Address: {siteConfig.address}
      </p>

      <h2>12. Changes to this policy</h2>
      <p>When we make an important change, we will update the date above and, where needed, ask for your consent again.</p>
    </LegalPage>
  );
}
