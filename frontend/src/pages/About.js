import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhoneSVG, EmailSVG, WhatsAppSVG, LocationSVG, MessageSVG, CelebrationSVG } from '../components/Icons';
import api from '../utils/api';

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
      <Helmet><title>About | American Diamond Academy</title></Helmet>
      <div className="page-hero" style={{ background: `linear-gradient(rgba(27,43,75,0.82), rgba(27,43,75,0.82)), url(/industry.webp) center/cover`, backgroundSize: 'cover' }}>
        <div className="container"><h1>Behind the Shift</h1><p>Because the diamond world is changing, meet the gemmologist who decided learning should change with it.</p></div>
      </div>

      {/* FOUNDER SECTION */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'start' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/about1.webp" alt="Archana Jaswani - Founder"
                style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div style={{ display: 'none', width: '100%', aspectRatio: '3/4', background: C.light, borderRadius: '8px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '60px', opacity: 0.3 }}>👩</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginTop: '16px' }}>Archana Jaswani</h3>
              <p style={{ color: C.coral, fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>FCGmA, PJA, CPAA</p>
              <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Founder, American Diamond Academy</p>
            </div>
            <div>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px,2.5vw,26px)', color: C.navy, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '24px', borderLeft: `4px solid ${C.coral}`, paddingLeft: '24px' }}>
                "American Diamond Academy reimagines diamond learning with an online experience built for the industry's next era."
              </blockquote>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: C.navy, marginBottom: '24px', fontWeight: 500 }}>&mdash; Archana Jaswani (FCGmA, PJA, CPAA), Founder of the ADA.</p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>Where classroom learning stops at theory, ADA teaches diamond grading through advanced 360&deg; visuals that mirror how diamonds are actually bought, sold, and evaluated in today&apos;s digital marketplace &mdash; where decisions rely on trained eyes, not controlled lab setups.</p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>At the helm is Archana Jaswani, a credentialed gemmologist, certified appraiser, and respected industry educator. Her background combines formal gemmological training with over two decades of global business leadership across Dubai, Guangzhou, Seoul, Mumbai, and Toronto &mdash; pairing technical discipline and real&#8209;world intuition.</p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>She holds multiple professional designations and academic distinctions, including graduating with Honours in Gemmology, receiving the Dean&apos;s Medal and the Sarah &amp; Arthur Frankel Award, and completing the GIA&apos;s laboratory training.</p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: '16px' }}>As Director of Communications for the Canadian Gemmological Association, Archana stays closely connected to the gem community and the evolving needs of students and professionals. Her work reflects the industry&apos;s digital shift and the future of diamond grading &mdash; a future where the screen is the new loupe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className="section" style={{ background: C.light }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '40px' }}>My Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
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
            <div>
              <img src="/Certificates.webp" alt="Certifications"
                style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', display: 'block', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div style={{ display: 'none', background: 'white', borderRadius: '8px', padding: '40px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', minHeight: '200px', color: '#9ca3af', textAlign: 'center' }}>
                <span style={{ fontSize: '40px', opacity: 0.3 }}>📜</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY ENGAGEMENT PHOTO */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '40px', textAlign: 'center' }}>Industry Engagement</h2>
          <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/industry.webp" alt="Industry Engagement"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div style={{ display: 'none', height: '300px', background: C.light, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', borderRadius: '12px' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>Place industry.webp in the public folder</p>
            </div>
          </div>
        </div>
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
    { Icon: PhoneSVG, title: 'Phone', detail: '+1 (437) 269-7007', href: 'tel:+14372697007' },
    { Icon: WhatsAppSVG, title: 'WhatsApp', detail: '+1 (437) 269-7007', href: 'https://wa.me/14372697007' },
    { Icon: EmailSVG, title: 'Email', detail: 'jaswani@angeldiamondinc.com', href: 'mailto:jaswani@angeldiamondinc.com' },
    { Icon: LocationSVG, title: 'Location', detail: 'USA \u2014 Online Worldwide', href: '#' },
  ];

  return (
    <>
      <Helmet><title>Contact | American Diamond Academy</title></Helmet>
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
      q: 'Is an American Diamond Academy course the same as formal diamond education? Will I be able to grade diamonds professionally after this?',
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
      a: 'ADA courses are not accredited by a gemological institution such as the GIA or CGA. They are designed as practical, skills-based learning programs focused on real-world application \u2014 specifically visual evaluation in digital environments. Completion certificates are issued by American Diamond Academy.'
    },
    {
      q: 'How long do I have access to the course after purchasing?',
      a: 'Once enrolled, you have ongoing access to your course materials. We do not set an expiry date on course access.'
    },
    {
      q: 'What is your refund policy?',
      a: 'All course purchases are final and non-refundable. We offer one complimentary session change per enrolment. Please see our Refund Policy page for full details.'
    },
    {
      q: 'Do you offer payment plans?',
      a: 'At this time, we accept full payment at the time of enrollment. All payments are processed securely through Stripe.'
    },
    {
      q: 'I have more questions. How can I reach you?',
      a: 'You can contact us through our Contact page, by email at jaswani@angeldiamondinc.com, or via WhatsApp at +1 (437) 269-7007. We are happy to help.'
    },
  ];

  return (
    <>
      <Helmet><title>FAQ | American Diamond Academy</title></Helmet>
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
  return (
    <>
      <Helmet><title>Payment Successful | American Diamond Academy</title></Helmet>
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.light }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px 48px', textAlign: 'center', maxWidth: '500px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <CelebrationSVG size={72} color={C.coral} style={{ margin: '0 auto 24px', display: 'block' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 400, color: C.navy, marginBottom: '16px' }}>Enrollment Successful!</h1>
          <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>Welcome to American Diamond Academy. Your course access has been activated. Check your dashboard for session details and Zoom links.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            <Link to="/education" className="btn btn-outline">Browse More Courses</Link>
          </div>
        </div>
      </div>
    </>
  );
}
