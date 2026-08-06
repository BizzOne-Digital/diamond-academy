import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhoneSVG, EmailSVG, WhatsAppSVG, LocationSVG, MessageSVG, CelebrationSVG } from '../components/Icons';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const C = { navy: '#1B2B4B', coral: '#E8835A', light: '#EAF0F8' };

// ---------- ABOUT PAGE ----------
export function About() {
  const timeline = [
    { year: '2025', title: 'The Lab Precision Era', desc: 'Archana sharpens her technical edge with the GIA Gem Identification Lab, adding lab\u2011grade accuracy to her growing gemmological toolkit.' },
    { year: '2024', title: 'The Bench Skills Expansion', desc: 'She steps deeper into the craft: jewellery basics, gem setting, and the full Professional Jewellery Appraiser program (GJ201\u2013203). A year of hands\u2011on mastery.' },
    { year: '2023', title: 'The Diamond Eye Refines', desc: 'Her focus tightens with GIA Diamond Grading \u2014 the course that elevates her technical intuition into a trained, calibrated eye.' },
    { year: '2022\u2013Present', title: 'The Industry Voice', desc: 'She joins the Board of Directors of the Canadian Gemmological Association as Director of Communications, shaping messaging, teaching diamond grading, and staying plugged into the pulse of the gem community.' },
    { year: '2021\u20132022', title: 'The Business Brain Evolves', desc: 'She completes Entrepreneurship Management with Honours, layering analytics, supply chain, finance, and omni\u2011channel strategy onto her gemmology foundation.' },
    { year: '2021', title: 'The Industry Credentials Stack', desc: "She becomes a CPAA Graduate and earns her FCGmA Fellowship, officially stepping into Canada's gemmological community as a recognized professional." },
    { year: '2020\u20132021', title: 'The Gemmology Pivot', desc: "She enters gemmology with full force \u2014 graduating with Honours, earning the Dean's Medal, and receiving the Sarah & Arthur Frankel Award. This is where the loupe becomes part of her story." },
    { year: '1998\u20132019', title: 'The Global Builder Era', desc: 'She leads multi\u2011country fashion and textile operations across Dubai, Guangzhou, Keqiao, Seoul, Mumbai, and Surat.' },
    { year: '1991\u20131994', title: 'The Commerce Foundation', desc: 'She completes her Bachelor of Commerce in Mumbai.' },
  ];

  return (
    <>
      <Helmet><title>About | American Diamonds Academy</title></Helmet>
      <div className="page-hero" style={{ background: `linear-gradient(rgba(27,43,75,0.82), rgba(27,43,75,0.82)), url(/hero-diamonds.jpg) center/cover`, backgroundSize: 'cover' }}>
        <div className="container"><h1>Behind the Shift</h1><p>Because the diamond world is changing, meet the gemmologist who decided learning should change with it.</p></div>
      </div>

      {/* FOUNDER SECTION — full-bleed edge-to-edge (photo | text), matching CDA
          instead of a padded, boxed two-column grid. */}
      <section style={{ background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div style={{ minHeight: '520px', background: `url(/about1.webp) center/cover no-repeat`, backgroundColor: C.light }} />
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: C.navy, marginBottom: '4px' }}>Archana Jaswani</h3>
            <p style={{ color: C.coral, fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>FCGmA, PJA, CPAA — Founder, American Diamonds Academy</p>
            <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px,2.5vw,26px)', color: C.navy, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '24px', borderLeft: `4px solid ${C.coral}`, paddingLeft: '24px' }}>
              "American Diamonds Academy reimagines diamond learning with an online experience built for the industry's next era."
            </blockquote>
            <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>Where classroom learning stops at theory, ADA teaches diamond grading through advanced 360&deg; visuals that mirror how diamonds are actually bought, sold, and evaluated in today&apos;s digital marketplace &mdash; where decisions rely on trained eyes, not controlled lab setups.</p>
            <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>At the helm is Archana Jaswani, a credentialed gemmologist, certified appraiser, and respected industry educator. Her background combines formal gemmological training with over two decades of global business leadership across Dubai, Guangzhou, Seoul, Mumbai, and Toronto &mdash; pairing technical discipline and real&#8209;world intuition.</p>
            <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>She holds multiple professional designations and academic distinctions, including graduating with Honours in Gemmology, receiving the Dean&apos;s Medal and the Sarah &amp; Arthur Frankel Award, and completing the GIA&apos;s laboratory training.</p>
            <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: '16px' }}>As Director of Communications for the Canadian Gemmological Association, Archana stays closely connected to the gem community and the evolving needs of students and professionals. Her work reflects the industry&apos;s digital shift and the future of diamond grading &mdash; a future where the screen is the new loupe.</p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION — same full-bleed row pattern; the certificate image
          runs edge-to-edge instead of being boxed inside a padded container. */}
      <section style={{ background: C.light }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '32px' }}>My Certifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { org: 'George Brown College', detail: "Graduate Gemmologist (Dean's Award Medal, Honors, Sarah and Arthur Frankel Gemmology Award)" },
                { org: 'GIA - Gemological Institute of America', detail: 'Diamond Grading Lab\nGem Identification Lab' },
                { org: 'The Canadian Gemmological Association', detail: 'Fellowship Certificate (FCGmA)' },
                { org: 'Professional Jewellery Appraiser', detail: 'with Sonja Sanders, Graduate Gemologist (GIA) and an Accredited Appraiser/Certified Appraisal Professional' },
                { org: 'Cultured Pearls Association of America Inc.', detail: 'Pearls as One - Cultured Pearls Specialist' },
                { org: 'George Brown College', detail: 'Jewellery Basics Workshop\nGem Setting Workshop' },
                { org: 'American Society of Appraisers \u2014 Educational Coursework', detail: 'Core Principles of Appraising Gems and Jewelry\nGems and Jewelry Appraisal for Insurance Scheduling\nAppraising Gems & Jewelry for Advanced Assignments: Development and Report Writing' },
              ].map((cert, idx) => (
                <div key={idx} style={{ borderLeft: `3px solid ${C.coral}`, paddingLeft: '16px' }}>
                  <div style={{ fontWeight: 700, color: C.navy, marginBottom: '4px' }}>{cert.org}</div>
                  <div style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{cert.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'white', display: 'flex', alignItems: 'center' }}>
            <img src="/Certificates.webp" alt="Certifications" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* AFFILIATION LOGOS MARQUEE — GIA Alumni Collective (built with CSS/type since
          it's a typographic lockup, no image asset needed) + a second logo slot for
          when the client sends it. */}
      <section style={{ background: 'white', padding: '40px 0', borderTop: '1px solid #eef0f3', borderBottom: '1px solid #eef0f3', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '100px', width: 'max-content', animation: 'affiliationMarquee 24s linear infinite' }}>
          {[...Array(2)].map((_, dup) => (
            <div key={dup} style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', color: C.navy }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '46px', lineHeight: 1 }}>GIA</span>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, marginBottom: '4px' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '15px' }}>Alumni</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '26px' }}>Collective&reg;</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', lineHeight: 1 }}>Member</span>
            </div>
          ))}
          {/* Second partner logo — placeholder until the client sends the file */}
          {[...Array(2)].map((_, dup) => (
            <div key={`slot2-${dup}`} style={{ display: 'flex', alignItems: 'center', height: '56px' }}>
              <img src="/partner-logo-2.webp" alt="Partner" style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
        <style>{`@keyframes affiliationMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{ background: C.navy, color: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, marginBottom: '48px', textAlign: 'center' }}>Journey</h2>
          <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: `2px solid ${C.coral}` }}>
            {timeline.map((m, i) => (
              <div key={m.year} style={{ marginBottom: i < timeline.length - 1 ? '40px' : 0, position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-40px', width: '14px', height: '14px', background: C.coral, borderRadius: '50%', top: '6px', border: `3px solid ${C.navy}` }} />
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '4px' }}>{m.year}</div>
                <div style={{ color: C.coral, fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{m.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.8 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY ENGAGEMENT PHOTO — full-bleed edge-to-edge, matching CDA (not
          boxed inside the narrow .container like before). */}
      <section style={{ background: 'white', padding: '80px 0 0' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '40px', textAlign: 'center' }}>Industry Engagement</h2>
        <div>
          <img src="/industry.webp" alt="Industry Engagement"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
          <div style={{ display: 'none', height: '300px', background: C.light, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>Place industry.webp in the public folder</p>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- CONTACT PAGE ----------
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      await api.post('/leads', form);
      setSent(true);
      toast.success('Message sent! We will contact you soon.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try WhatsApp instead.');
    } finally { setLoading(false); }
  };

  const contactInfo = [
    { Icon: PhoneSVG, title: 'Phone', detail: '+1 (212) 470-1321', href: 'tel:+12124701321' },
    { Icon: PhoneSVG, title: 'Toll-Free', detail: '+1 (888) 921-1786', href: 'tel:+18889211786' },
    { Icon: WhatsAppSVG, title: 'WhatsApp', detail: '+1 (437) 269-7007', href: 'https://wa.me/14372697007' },
    { Icon: EmailSVG, title: 'Email', detail: 'jaswani@angeldiamondinc.com', href: 'mailto:jaswani@angeldiamondinc.com' },
    { Icon: LocationSVG, title: 'Location', detail: 'USA \u2014 Online Worldwide', href: '#' },
  ];

  return (
    <>
      <Helmet><title>Contact | American Diamonds Academy</title></Helmet>
      <div className="page-hero"><div className="container"><h1>Contact Us</h1><p>Get in touch about courses, enrollment, or any questions.</p></div></div>
      <section className="section" style={{ background: C.light }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {contactInfo.map(({ Icon, title, detail, href }) => (
              <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card" style={{ padding: '28px 20px', textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                <div style={{ width: '52px', height: '52px', background: C.light, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Icon size={24} color={C.coral} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: C.navy, marginBottom: '6px' }}>{title}</h3>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>{detail}</p>
              </a>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <MessageSVG size={22} color={C.coral} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy }}>Send a Message</h3>
              </div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CelebrationSVG size={56} color={C.coral} style={{ margin: '0 auto 20px', display: 'block' }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: C.navy, marginBottom: '12px' }}>Message Sent!</h4>
                  <p style={{ color: '#6b7280', lineHeight: 1.7 }}>Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} style={{ marginTop: '20px', background: 'none', border: `1px solid ${C.coral}`, color: C.coral, padding: '10px 24px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group"><label>Full Name *</label><input placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
                  <div className="form-group"><label>Email Address *</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
                  <div className="form-group"><label>Phone Number</label><input placeholder="+1 (xxx) xxx-xxxx" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                      <option value="">Select a subject</option>
                      <option value="Course Enrollment">Course Enrollment</option>
                      <option value="Course Information">Course Information</option>
                      <option value="Payment Query">Payment Query</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Message *</label><textarea placeholder="How can we help you?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ minHeight: '120px' }} /></div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: C.navy, borderRadius: '12px', padding: '36px', textAlign: 'center', color: 'white' }}>
                <WhatsAppSVG size={40} color={C.coral} style={{ margin: '0 auto 16px', display: 'block' }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '12px' }}>Fastest Response</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px', lineHeight: 1.7 }}>For quick replies about enrollment, courses, and session schedules &mdash; message us on WhatsApp.</p>
                <a href="https://wa.me/14372697007" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
                  <WhatsAppSVG size={18} color="white" />Chat on WhatsApp
                </a>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '16px' }}>Business Hours</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Monday \u2013 Friday', '9:00 AM \u2013 6:00 PM EST'], ['Saturday', '10:00 AM \u2013 4:00 PM EST'], ['Sunday', 'WhatsApp only']].map(([day, hours]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                      <span style={{ color: '#374151', fontWeight: 500 }}>{day}</span>
                      <span style={{ color: '#6b7280' }}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- FAQ PAGE ----------
export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      q: 'What is Diamond Learning Reimagined?',
      a: 'This course teaches modern diamond grading through a digital-first lens, combining traditional gemmology principles with real-world visual analysis using high-resolution imagery, video assets, and structured grading frameworks.'
    },
    {
      q: 'How is this different from traditional diamond grading courses?',
      a: "Traditional courses rely heavily on in-person stones and lab access. This program is built for today's trade reality\u2014where diamonds are evaluated digitally before they are ever seen physically. You'll learn how to grade, compare, and assess diamonds using the same digital 360\u00b0 videos used in modern sourcing."
    },
    {
      q: 'Is an American Diamonds Academy course the same as formal diamond education? Will I be able to grade diamonds professionally after this?',
      a: 'This is an independent applied training program focused on modern trade practice and digital evaluation methods. It complements traditional gemmological education rather than replacing institutional certification pathways. The course is designed to build professional-level analytical capability, in digital evaluation environments. It equips you with trade-relevant grading literacy and decision-making skills used in sourcing, retail, and education contexts. While you will be able to evaluate and interpret diamonds with confidence for personal and commercial understanding, you will not be able to issue formal certification, which remains the domain of accredited grading laboratories.'
    },
    {
      q: 'Do I need prior gemmology experience?',
      a: 'No! The course is structured across three tiers, allowing complete beginners of any industry, or students, to start at the foundational level. Experienced professionals can enter at advanced, analytical levels.'
    },
    {
      q: "What if I can't make it to my class date?",
      a: 'If you are unable to attend a scheduled class, a one-time date change will be offered at no additional cost. This is permitted once per enrolment to ensure fairness and scheduling integrity. Beyond this, additional rescheduling or refunds will not be available.'
    },
    {
      q: 'Is there a hands-on component?',
      a: 'No. The entire course is delivered digitally. There is no hands-on or physical diamond handling involved. All grading and analysis is taught using curated digital assets, designed to reflect how diamonds are evaluated in modern online and trade environments.'
    },
    {
      q: 'What is the format of the courses?',
      a: 'All ADA courses are delivered online. Course content includes video lessons, visual examples, and reference materials that you can access at your own pace. Select courses also include live Q&A sessions.'
    },
    {
      q: 'Do I need any special equipment or tools to take these courses?',
      a: 'No special equipment is required. You will need a computer, tablet, or smartphone with internet access and a web browser. Some courses may recommend optional tools for practice, which we make available through our store.'
    },
    {
      q: 'Are these courses accredited?',
      a: 'ADA courses are not accredited by a gemological institution such as the GIA or CGA. They are designed as practical, skills-based learning programs focused on real-world application \u2014 specifically visual evaluation in digital environments. Completion certificates are issued by American Diamonds Academy.'
    },
    {
      q: 'How long do I have access to the course after purchasing?',
      a: 'Your enrollment provides access to your course workbook and supporting digital resources available through the American Diamonds Academy website. These resources may be updated and expanded over time to reflect evolving industry knowledge and developments. Live instruction is delivered during scheduled sessions and is not recorded or provided for later viewing. Your workbook and course materials are yours to retain and revisit as you continue your diamond education journey.'
    },
    {
      q: 'What is your refund policy?',
      a: 'All course purchases are final and non-refundable. We offer one complimentary session change per enrolment. Please see our Refund Policy page for full details.'
    },
    {
      q: 'Do you offer payment plans?',
      a: 'Yes. We understand that investing in professional education is an important decision. Flexible payment options may be available at checkout through our secure payment provider, subject to eligibility and availability. Students may also choose to complete payment in full at the time of enrollment.'
    },
    {
      q: 'I have a problem with my purchase. What should I do?',
      a: 'If you experience any issues with your order, course access, or payment, please contact us first. Our team is committed to resolving concerns as quickly as possible. Most issues can be resolved directly without the need for a payment dispute. If a chargeback is initiated without first contacting us, we reserve the right to provide supporting documentation to the payment processor to verify the transaction and the services provided.'
    },
    {
      q: 'I have more questions. How can I reach you?',
      a: 'You can contact us through our Contact page, by email at jaswani@angeldiamondinc.com, or via WhatsApp at +1 (437) 269-7007. We are happy to help.'
    },
  ];

  return (
    <>
      <Helmet><title>FAQ | American Diamonds Academy</title></Helmet>
      <div className="page-hero"><div className="container"><h1>Frequently Asked Questions</h1></div></div>
      <section className="section" style={{ background: C.light }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '22px 28px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}
                >
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: openIndex === i ? C.coral : C.navy, lineHeight: 1.4 }}>{f.q}</span>
                  <span style={{ fontSize: '22px', color: C.coral, flexShrink: 0, lineHeight: 1, transform: openIndex === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>+</span>
                </button>
                {openIndex === i && (
                  <div style={{ padding: '0 28px 22px' }}>
                    <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.9 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px', padding: '36px', background: 'white', borderRadius: '12px' }}>
            <p style={{ color: C.navy, fontFamily: "'Playfair Display', serif", fontSize: '20px', marginBottom: '16px' }}>Still didn&apos;t find what you&apos;re looking for?</p>
            <a href="mailto:jaswani@angeldiamondinc.com" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------- PAYMENT SUCCESS ----------
export function PaymentSuccess() {
  const [status, setStatus] = React.useState('checking'); // checking | needsPassword | done | error
  const [setupToken, setSetupToken] = React.useState(null);
  const [pw, setPw] = React.useState({ password: '', confirm: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const { setSession } = useAuth();

  React.useEffect(() => {
    localStorage.removeItem('ada_guest_cart');
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) { setStatus('done'); return; }
    api.get(`/payments/verify/${sessionId}`)
      .then(({ data }) => {
        if (data.passwordSetupToken) {
          setSetupToken(data.passwordSetupToken);
          setStatus('needsPassword');
        } else {
          setStatus('done');
        }
      })
      .catch(() => setStatus('done'));
  }, []);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (pw.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (pw.password !== pw.confirm) { toast.error('Passwords do not match'); return; }
    setSubmitting(true);
    try {
      const { data } = await api.post('/auth/set-password', { token: setupToken, password: pw.password });
      setSession(data.token, data.user);
      toast.success('Login credentials created!');
      setStatus('done');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not set your password. Please contact us.');
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <Helmet><title>Payment Successful | American Diamonds Academy</title></Helmet>
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.light, padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px 48px', textAlign: 'center', maxWidth: '500px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <CelebrationSVG size={72} color={C.coral} style={{ margin: '0 auto 24px', display: 'block' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '16px' }}>Enrollment Successful!</h1>

          {status === 'needsPassword' ? (
            <>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
                Your payment was received. Please create your login credentials to access your student dashboard.
              </p>
              <form onSubmit={handleSetPassword} style={{ textAlign: 'left' }}>
                <div className="form-group"><label>Password</label><input type="password" required minLength={6} value={pw.password} onChange={e => setPw(p => ({ ...p, password: e.target.value }))} /></div>
                <div className="form-group"><label>Confirm Password</label><input type="password" required minLength={6} value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} /></div>
                <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Creating account...' : 'Create Login & Continue'}
                </button>
              </form>
            </>
          ) : (
            <>
              <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>Welcome to American Diamonds Academy. Your course access has been activated. Check your dashboard for session details and Zoom links.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                <Link to="/education" className="btn btn-outline">Browse More Courses</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
