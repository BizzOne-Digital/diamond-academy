import React from 'react';
import { Helmet } from 'react-helmet-async';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: C.navy, marginBottom: '16px', paddingBottom: '8px', borderBottom: `2px solid ${C.coral}` }}>{title}</h2>
    {children}
  </div>
);

const P = ({ children }) => <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.9, marginBottom: '12px' }}>{children}</p>;
const Li = ({ children }) => <li style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.9, marginBottom: '6px' }}>{children}</li>;

// ─── TERMS & CONDITIONS ───────────────────────────────────────────────────────
export function Terms() {
  return (
    <>
      <Helmet><title>Terms & Conditions | American Diamond Academy</title></Helmet>
      <div className="page-hero"><div className="container"><h1>Terms &amp; Conditions</h1><p>Last updated: June 2025</p></div></div>
      <section className="section" style={{ background: C.light }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '48px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>

            <P>Welcome to American Diamond Academy ("ADA", "we", "us", or "our"). By accessing or purchasing from our website americandiamondacademy.com, you agree to be bound by these Terms and Conditions. Please read them carefully before enrolling in any course.</P>

            <Section title="1. Acceptance of Terms">
              <P>By registering for an account or purchasing a course, you agree to these Terms and Conditions in full. Our courses are open to learners of all ages. Please note that payment processing via Stripe requires the use of a valid credit or debit card. Credit card holders must meet the minimum age requirements set by their card issuer and applicable law in their jurisdiction. If you do not agree to these Terms, please do not use our services.</P>
            </Section>

            <Section title="2. Course Access & Delivery">
              <P>All courses are delivered online via Zoom. Upon successful payment, you will receive access to your enrolled course through your student dashboard. Session details, dates, and Zoom links are updated regularly by the academy and accessible from your dashboard.</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>Live sessions are conducted at scheduled dates and times posted in your dashboard.</Li>
                <Li>Session recordings may be made available after each class at the instructor's discretion.</Li>
                <Li>ADA reserves the right to reschedule sessions with reasonable notice.</Li>
                <Li>Course content is for personal use only and may not be shared or redistributed.</Li>
              </ul>
            </Section>

            <Section title="3. Intellectual Property">
              <P>All course content, materials, videos, images, and resources provided by American Diamond Academy are the exclusive intellectual property of ADA. You may not copy, reproduce, distribute, or create derivative works without prior written consent from ADA.</P>
              <P>No rights or ownership are transferred to you by accessing this website or enrolling in any course.</P>
              <P>Unauthorized use of our name, branding, or materials may result in legal action.</P>
            </Section>

            <Section title="4. User Accounts">
              <P>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. ADA is not liable for any loss or damage arising from your failure to maintain account security.</P>
            </Section>

            <Section title="5. Payment">
              <P>All payments are processed securely via Stripe. Prices are listed in USD and are subject to change without notice. Payment must be completed in full before course access is granted.</P>
            </Section>

            <Section title="6. Prohibited Conduct">
              <P>You agree not to:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>Share your account or course access with any other person.</Li>
                <Li>Record, screenshot, or distribute any course content without permission.</Li>
                <Li>Use our platform for any unlawful purpose.</Li>
                <Li>Attempt to disrupt or interfere with the website or services.</Li>
              </ul>
            </Section>

            <Section title="7. Disclaimer">
              <P>ADA courses are for educational purposes only. ADA does not guarantee specific outcomes, employment, or financial results from completing any course. Diamond grading skills require continued practice and real-world experience.</P>
            </Section>

            <Section title="8. Limitation of Liability">
              <P>To the maximum extent permitted by law, American Diamond Academy shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform or courses.</P>
            </Section>

            <Section title="9. Governing Law">
              <P>These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to conflict of law principles.</P>
            </Section>

            <Section title="10. Changes to Terms">
              <P>ADA reserves the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the revised Terms.</P>
            </Section>

            <Section title="11. Language">
              <P>These Terms, if provided in other languages, are for user convenience. In case of any differences, the English version will prevail.</P>
            </Section>

            <Section title="12. Contact Us">
              <P>For any questions about these Terms, please contact us at: jaswani@angeldiamondinc.com or WhatsApp: +1 (437) 269-7007</P>
            </Section>

          </div>
        </div>
      </section>
    </>
  );
}

// ─── REFUND POLICY ────────────────────────────────────────────────────────────
export function RefundPolicy() {
  return (
    <>
      <Helmet><title>Refund Policy | American Diamond Academy</title></Helmet>
      <div className="page-hero"><div className="container"><h1>Refund Policy</h1><p>Last updated: June 2025</p></div></div>
      <section className="section" style={{ background: C.light }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '48px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>

            <P>At American Diamond Academy, we are committed to delivering a high-quality learning experience. Please read our refund policy carefully before making a purchase.</P>

            <Section title="All Sales Are Final">
              <P>All course purchases are final and non-refundable. Once you have completed your purchase and received access to your course materials and session details, we do not offer refunds or exchanges.</P>
              <P>We encourage you to review all course details, descriptions, and FAQs carefully before enrolling. If you have any questions prior to purchasing, please contact us at jaswani@angeldiamondinc.com or via WhatsApp at +1 (437) 269-7007.</P>
            </Section>

            <Section title="One-Time Session Change">
              <P>We understand that scheduling conflicts can arise. As a courtesy, we offer one (1) complimentary session change per enrollment. This means:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>You may request to move your registered session to a different available date of the same course, at no additional charge.</Li>
                <Li>This session change must be requested at least 48 hours before your scheduled session date.</Li>
                <Li>Only one session change is permitted per course enrollment.</Li>
                <Li>Session changes are subject to availability.</Li>
              </ul>
              <P>To request a session change, please contact us at jaswani@angeldiamondinc.com or WhatsApp +1 (437) 269-7007 with your name, course, and preferred new date.</P>
            </Section>

            <Section title="Session Cancellation by ADA">
              <P>In the rare event that American Diamond Academy must cancel a scheduled session due to unforeseen circumstances, enrolled students will be offered a seat in the next available session of the same course at no additional charge.</P>
            </Section>

            <Section title="Contact Us">
              <P>For any questions regarding this policy, please contact us before making your purchase:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>Email: jaswani@angeldiamondinc.com</Li>
                <Li>WhatsApp: +1 (437) 269-7007</Li>
              </ul>
            </Section>

          </div>
        </div>
      </section>
    </>
  );
}

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
export function PrivacyPolicy() {
  return (
    <>
      <Helmet><title>Privacy Policy | American Diamond Academy</title></Helmet>
      <div className="page-hero"><div className="container"><h1>Privacy Policy</h1><p>Last updated: June 2025</p></div></div>
      <section className="section" style={{ background: C.light }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '48px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>

            <P>American Diamond Academy ("ADA", "we", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use americandiamondacademy.com.</P>

            <Section title="1. Information We Collect">
              <P>We collect the following personal information:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li><strong>Account Information:</strong> Name, email address, phone number, and country when you register.</Li>
                <Li><strong>Payment Information:</strong> Payment is processed by Stripe. ADA does not store your credit card details.</Li>
                <Li><strong>Communication Data:</strong> Messages submitted via our contact form.</Li>
                <Li><strong>Usage Data:</strong> Pages visited, session attendance, and course progress.</Li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <P>We use your information to:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>Process your enrollment and payments.</Li>
                <Li>Provide access to courses and session Zoom links.</Li>
                <Li>Send course-related communications and updates.</Li>
                <Li>Respond to your inquiries and support requests.</Li>
                <Li>Send newsletters if you have subscribed (Diamond Digest).</Li>
                <Li>Improve our website and course offerings.</Li>
              </ul>
            </Section>

            <Section title="3. Sharing of Information">
              <P>We do not sell, rent, or trade your personal information to third parties. We may share information with:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li><strong>Stripe</strong> — for secure payment processing.</Li>
                <Li><strong>Zoom</strong> — for delivering live course sessions.</Li>
                <Li><strong>Cloudinary</strong> — for image storage.</Li>
                <Li>Legal authorities if required by law.</Li>
              </ul>
            </Section>

            <Section title="4. Data Retention">
              <P>We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.</P>
            </Section>

            <Section title="5. Cookies">
              <P>Our website uses essential cookies to maintain your login session. We do not use tracking or advertising cookies. By using our website, you consent to our use of essential cookies.</P>
            </Section>

            <Section title="6. Your Rights (PIPEDA & CASL — Canada)">
              <P>As a user in Canada or North America, you have the right to:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>Access the personal information we hold about you.</Li>
                <Li>Request correction of inaccurate information.</Li>
                <Li>Withdraw consent for marketing communications at any time.</Li>
                <Li>Request deletion of your personal data.</Li>
              </ul>
              <P>To exercise any of these rights, contact us at jaswani@angeldiamondinc.com.</P>
            </Section>

            <Section title="7. Security">
              <P>We implement industry-standard security measures including encrypted connections (HTTPS), secure password hashing, and JWT-based authentication to protect your personal data.</P>
            </Section>

            <Section title="8. Third-Party Links">
              <P>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.</P>
            </Section>

            <Section title="9. Children's Privacy">
              <P>Our courses are open to learners of all ages. We do not knowingly collect personal information from minors without parental consent. Payment processing via Stripe requires a valid credit or debit card, and card holders must meet the minimum age requirements set by their card issuer and applicable law in their jurisdiction.</P>
            </Section>

            <Section title="10. Changes to This Policy">
              <P>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the website constitutes acceptance of the revised policy.</P>
            </Section>

            <Section title="11. Contact Us">
              <P>For any privacy-related questions or requests:</P>
              <ul style={{ paddingLeft: '20px', marginBottom: '12px' }}>
                <Li>Email: jaswani@angeldiamondinc.com</Li>
                <Li>WhatsApp: +1 (437) 269-7007</Li>
              </ul>
            </Section>

          </div>
        </div>
      </section>
    </>
  );
}