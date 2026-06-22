import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhoneSVG, EmailSVG, WhatsAppSVG, LocationSVG, MessageSVG, CelebrationSVG } from '../components/Icons';
import api from '../utils/api';

const C = { navy: '#2C3E50', coral: '#E8835A', light: '#E8F6F8' };

// ---------- ABOUT PAGE ----------
export function About() {
  const timeline = [
    { year: '2025', title: 'The Lab Precision Era', desc: 'Archana sharpens her technical edge with the GIA Gem Identification Lab, adding lab-grade accuracy to her growing gemmological toolkit.' },
    { year: '2024', title: 'The Bench Skills Expansion', desc: 'She steps deeper into the craft: jewellery basics, gem setting, and the full Professional Jewellery Appraiser program (GJ201–203).' },
    { year: '2023', title: 'The Diamond Eye Refines', desc: 'Her focus tightens with GIA Diamond Grading — the course that elevates her technical intuition into a trained, calibrated eye.' },
    { year: '2022–Present', title: 'The Industry Voice', desc: 'She joins the Board of Directors of the Canadian Gemmological Association as Director of Communications.' },
    { year: '2021', title: 'The Industry Credentials Stack', desc: 'She becomes a CPAA Graduate and earns her FCGmA Fellowship.' },
    { year: '2020–2021', title: 'The Gemmology Pivot', desc: "She enters gemmology with full force — graduating with Honours, earning the Dean's Medal, and receiving the Sarah & Arthur Frankel Award." },
    { year: '1998–2019', title: 'The Global Builder Era', desc: 'She leads multi-country fashion and textile operations across Dubai, Guangzhou, Seoul, Mumbai, and Surat.' },
    { year: '1991–1994', title: 'The Commerce Foundation', desc: 'She completes her Bachelor of Commerce in Mumbai.' },
  ];

  return (
    <>
      <Helmet><title>About | American Diamond Academy</title></Helmet>
      <div className="page-hero" style={{ background: `linear-gradient(rgba(44,62,80,0.85), rgba(44,62,80,0.85)), url(https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1600&q=80) center/cover` }}>
        <div className="container"><h1>Behind the Shift</h1><p>Because the diamond world is changing, meet the gemmologist who decided learning should change with it.</p></div>
      </div>

      {/* FOUNDER SECTION */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'start' }}>

            {/* about1.webp image */}
            <div style={{ textAlign: 'center' }}>
              <img
                src="/about1.webp"
                alt="Archana Jaswani - Founder"
                style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', display: 'block' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback if image not found */}
              <div style={{ display: 'none', width: '100%', aspectRatio: '3/4', background: C.light, borderRadius: '8px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '60px', opacity: 0.3 }}>👩</span>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>about1.webp</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: C.navy, marginTop: '16px' }}>Archana Jaswani</h3>
              <p style={{ color: C.coral, fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>FCGmA, PJA, CPAA</p>
              <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Founder, American Diamond Academy</p>
            </div>

            <div>
              <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px,2.5vw,26px)', color: C.navy, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '32px', borderLeft: `4px solid ${C.coral}`, paddingLeft: '24px' }}>
                "American Diamond Academy reimagines diamond learning with an online experience built for the industry's next era."
              </blockquote>
              <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>Where classroom learning stops at theory, ADA teaches diamond grading through advanced 360° visuals that mirror how diamonds are actually bought, sold, and evaluated in today's digital marketplace.</p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, marginBottom: '16px', fontSize: '16px' }}>At the helm is Archana Jaswani, a credentialed gemmologist, certified appraiser, and respected industry educator. Her background combines formal gemmological training with over two decades of global business leadership across Dubai, Guangzhou, Seoul, Mumbai, and Toronto.</p>
              <p style={{ color: '#4b5563', lineHeight: 1.9, fontSize: '16px' }}>She holds multiple professional designations including graduating with Honours in Gemmology, receiving the Dean's Medal and the Sarah & Arthur Frankel Award, and completing the GIA's laboratory training. As Director of Communications for the Canadian Gemmological Association, Archana stays closely connected to the gem community.</p>
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
                { org: 'GIA - Gemological Institute of America', detail: 'Diamond Grading Lab · Gem Identification Lab' },
                { org: 'The Canadian Gemmological Association', detail: 'Fellowship Certificate (FCGmA)' },
                { org: 'Professional Jewellery Appraiser', detail: 'with Sonja Sanders, GIA & Accredited Appraiser/Certified Appraisal Professional' },
                { org: 'Cultured Pearls Association of America Inc.', detail: 'Pearls as One - Cultured Pearls Specialist' },
                { org: 'American Society of Appraisers', detail: 'Core Principles · Gems & Jewelry Appraisal · Advanced Assignments' },
              ].map(cert => (
                <div key={cert.org} style={{ borderLeft: `3px solid ${C.coral}`, paddingLeft: '16px' }}>
                  <div style={{ fontWeight: 700, color: C.navy, marginBottom: '4px' }}>{cert.org}</div>
                  <div style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.7 }}>{cert.detail}</div>
                </div>
              ))}
            </div>

            {/* Certificates.webp image */}
            <div>
              <img
                src="/Certificates.webp"
                alt="Certifications"
                style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', display: 'block', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div style={{ display: 'none', background: 'white', borderRadius: '8px', padding: '40px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', minHeight: '200px', color: '#9ca3af', textAlign: 'center' }}>
                <span style={{ fontSize: '40px', opacity: 0.3 }}>📜</span>
                <span style={{ fontSize: '13px' }}>Certificates.webp</span>
              </div>
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
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { Icon: PhoneSVG, title: 'Phone', detail: '+1 (437) 269-7007', href: 'tel:+14372697007' },
    { Icon: WhatsAppSVG, title: 'WhatsApp', detail: '+1 (437) 269-7007', href: 'https://wa.me/14372697007' },
    { Icon: EmailSVG, title: 'Email', detail: 'jaswani@angeldiamondinc.com', href: 'mailto:jaswani@angeldiamondinc.com' },
    { Icon: LocationSVG, title: 'Location', detail: 'USA — Online Worldwide', href: '#' },
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
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px', lineHeight: 1.7 }}>For quick replies about enrollment, courses, and session schedules — message us on WhatsApp.</p>
                <a href="https://wa.me/14372697007" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
                  <WhatsAppSVG size={18} color="white" />Chat on WhatsApp
                </a>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: C.navy, marginBottom: '16px' }}>Business Hours</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Monday – Friday', '9:00 AM – 6:00 PM EST'], ['Saturday', '10:00 AM – 4:00 PM EST'], ['Sunday', 'WhatsApp only']].map(([day, hours]) => (
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
  const faqs = [
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
      a: 'ADA courses are not accredited by a gemological institution such as the GIA or CGA. They are designed as practical, skills-based learning programs focused on real-world application — specifically visual evaluation in digital environments. Completion certificates are issued by American Diamond Academy.'
    },
    {
      q: 'Who are these courses designed for?',
      a: 'Our courses are designed for buyers, sellers, jewelry professionals, enthusiasts, and anyone working in or entering the diamond trade who wants to build visual evaluation skills relevant to today’s online marketplace.'
    },
    {
      q: 'What is the difference between Diamond Grading: Fundamentals and Diamond Grading: Intelligence?',
      a: 'Diamond Grading: Fundamentals introduces the core concepts of how diamonds are visually assessed beyond certificates — focusing on light performance, structure, and the 4Cs as they apply in real buying and selling situations. Diamond Grading: Intelligence is designed for those who already understand the fundamentals and want to build speed, consistency, and confidence in applying those skills in a digital trade environment.'
    },
    {
      q: 'Can I take Diamond Grading: Intelligence without completing Fundamentals first?',
      a: 'We strongly recommend completing Diamond Grading: Fundamentals before enrolling in Intelligence. The Intelligence course assumes a working knowledge of the content covered in Fundamentals.'
    },
    {
      q: 'How long do I have access to the course after purchasing?',
      a: 'Once enrolled, you have ongoing access to your course materials. We do not set an expiry date on course access.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer a 7-day satisfaction guarantee. If you are not satisfied within 7 days of purchase and have attended no more than one live session, you may request a full refund. Please see our Refund Policy page for full details.'
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
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((f, i) => (
              <div key={i} className="card" style={{ padding: '24px 28px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: C.navy, marginBottom: '10px' }}>{f.q}</h3>
                <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: 1.8 }}>{f.a}</p>
              </div>
            ))}
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