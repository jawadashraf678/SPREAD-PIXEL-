'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Target,
  Smile,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Code,
  Smartphone,
  Sparkles,
  Search,
  MessageCircle,
  Clock,
  Layers,
  Database,
  Star,
  Users,
  ChevronDown,
  Bot
} from 'lucide-react';


export default function Home() {
  const nichesSectionRef = useRef<HTMLDivElement>(null);
  const nichesLeftRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. MouseMove listener for Custom Cursor Follower
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorFollowerRef.current) return;
      cursorFollowerRef.current.style.left = `${e.clientX}px`;
      cursorFollowerRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. Scroll Parallax Listener for Niches
    const handleScroll = () => {
      if (nichesSectionRef.current && nichesLeftRef.current) {
        const rect = nichesSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (window.innerWidth >= 991) {
          if (rect.top < windowHeight && rect.bottom > 0) {
            const rightCol = nichesSectionRef.current.querySelector('.niches-right-col');
            const leftCol = nichesLeftRef.current;
            if (rightCol && leftCol) {
              const rightHeight = rightCol.getBoundingClientRect().height;
              const leftHeight = leftCol.getBoundingClientRect().height;
              const maxTravel = rightHeight - leftHeight;
              
              if (maxTravel > 0) {
                const scrolled = 140 - rect.top;
                let translateVal = 0;
                if (scrolled > 0) {
                  // Drift downwards at 75% of the scroll speed, capped at maxTravel
                  translateVal = Math.min(scrolled * 0.75, maxTravel);
                }
                leftCol.style.transform = `translateY(${translateVal}px)`;
              }
            }
          }
        } else {
          nichesLeftRef.current.style.transform = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // 3. Scroll Reveal Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-slide-left, .reveal-slide-right, .reveal-zoom, .reveal-flip, .reveal-fade');
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  // State for Accordion FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How long does it take?",
      answer: "Basic takes around 2 weeks, Standard 3 to 4 weeks, and Premium depends on the final page count. The exact timeline is confirmed in your written scope."
    },
    {
      question: "Do I have to provide the content?",
      answer: "No. Content writing is included in every package. We ask a short set of questions about your business and handle the rest."
    },
    {
      question: "Do you take full payment in advance?",
      answer: "No. Payments are split into milestones tied to delivered work. We only charge for what has been completed and verified."
    },
    {
      question: "Will my website come on the first page of Google?",
      answer: "Keyword research and clean site structure are the foundation of ranking, and both Standard and Premium include it. Competitive terms also need ongoing SEO work over several months. We will tell you upfront which of your terms are realistic and which are not. (Jhooti guarantee dene se behtar hai sach bata dena.)"
    },
    {
      question: "Can you work with me if I am in another city?",
      answer: "Yes. Everything runs on WhatsApp, calls and email. Location makes no difference. We work with clients across Pakistan and overseas."
    },
    {
      question: "Who owns the website after launch?",
      answer: "You do, completely. Domain, hosting, source code and files are all yours. We transfer full credentials upon handover."
    },
    {
      question: "Can I upgrade my package later?",
      answer: "Yes. Whatever you have already paid is adjusted toward the upgrade. There are no penalty charges."
    },
    {
      question: "What about changes after launch?",
      answer: "Revisions during the review stage are included. After handover you can take a support package, or pay for one time changes as needed."
    }
  ];

  const portfolioItems = [
    {
      title: "Faseeh Lall",
      desc: "Premium Creative Portfolio & Agency Build",
      img: "/faseehlall_mockup.png",
      url: "https://www.faseehlall.com/"
    },
    {
      title: "Online Quran College",
      desc: "Clean Educational Portal & Student Dashboard",
      img: "/quran_college_mockup.png",
      url: "https://www.onlinequrancollege.com/"
    },
    {
      title: "Unique Mineral",
      desc: "E-Commerce Showcase for Minerals & Marble Export",
      img: "/unique_mineral_mockup.png",
      url: "https://unique-mineral.vercel.app/"
    },
    {
      title: "Unizconnect 1-on-1",
      desc: "High-Converting Interactive Mentoring Portal",
      img: "/unizconnect_mockup.png",
      url: "https://1on1.unizconnect.com/"
    },
    {
      title: "ZeroX Agency",
      desc: "Advanced AI Automation Systems & Scheduling Portal",
      img: "/zerox_mockup.png",
      url: "https://meet.zerox.agency/"
    },
    {
      title: "SpreadPixel",
      desc: "Bold Creative Design & High-Impact Brand Showcase",
      img: "/spreadpixel_mockup.png",
      url: "https://spreadpixel.com/"
    }
  ];

  const niches = [
    "Clinics & Dental Practices", "Real Estate Agencies", "Law & Tax Consultants",
    "Schools & Academies", "Salons & Spas", "Construction & Interior Firms",
    "Exporters & Manufacturers", "Restaurants & Cafes", "Gyms & Fitness Centres",
    "Service Businesses of every kind"
  ];

  return (
    <>
      {/* Header/Navbar */}
      <header className="navbar" style={{ backgroundColor: 'transparent', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src="/spreadpixels_logo.png" 
              alt="SpreadPixels Marketing Agency Logo" 
              style={{ height: '90px', width: 'auto', display: 'block' }} 
            />
          </div>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="desktop-nav">
            <a href="#problem" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>Problem</a>
            <a href="#who-this-is-for" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>Who We Serve</a>
            <a href="#what-you-get" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>Services</a>
            <a href="#contact" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>Packages</a>
            <a href="#faq" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}>FAQs</a>
          </nav>
          <a
            href="#contact"
            style={{ color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.05em' }}
          >
            Let's Talk
          </a>
        </div>
      </header>
 
      <main style={{ position: 'relative' }}>
        {/* Glow Effects */}
        <div className="gradient-glow" style={{ top: '10%', left: '5%' }}></div>
        <div className="gradient-glow" style={{ top: '40%', right: '5%' }}></div>
        <div className="gradient-glow" style={{ top: '80%', left: '10%' }}></div>
        {/* HERO SECTION */}
        <section style={{ 
          borderBottom: '1px solid var(--border-color)', 
          position: 'relative', 
          overflow: 'hidden', 
          minHeight: 'auto',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '0',
          background: 'transparent'
        }}>
          <div className="section-container" style={{ textAlign: 'center', position: 'relative', zIndex: 2, width: '100%', paddingTop: '20px', paddingBottom: '40px' }}>
            <div className="badge hero-animate hero-delay-1" style={{ marginBottom: '24px' }}>PAKISTANI BUSINESSES ONLY</div>
            
            {/* Kyne Style Heading Box */}
            <div style={{
              position: 'relative',
              display: 'inline-block',
              margin: '0 auto 10px auto',
              textAlign: 'center',
              padding: '20px 40px',
              maxWidth: '960px',
              width: '100%'
            }} className="hero-box-container hero-animate hero-delay-2">
              
              {/* Corner Sparkle Icons */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--text-muted)', opacity: 0.4, fontSize: '1.25rem', userSelect: 'none' }}>✦</div>
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'var(--text-muted)', opacity: 0.4, fontSize: '1.25rem', userSelect: 'none' }}>＋</div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'var(--text-muted)', opacity: 0.4, fontSize: '1.25rem', userSelect: 'none' }}>＋</div>



              {/* Serif Headline */}
              <h1 style={{
                fontFamily: 'var(--font-headings)',
                fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
                lineHeight: '1.1',
                fontWeight: 450,
                color: 'var(--text-primary)',
                letterSpacing: '-0.04em',
                margin: 0,
                textAlign: 'center'
              }}>
                hi, we build <br />
                <span style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent-orange)' }}>High-Converting</span> <br />
                <span style={{ fontWeight: 800 }}>Websites.</span>
              </h1>
            </div>

            {/* Divider line with diamond */}
            <div className="hero-animate hero-delay-3" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '16px auto 24px auto',
              maxWidth: '360px',
              width: '80%'
            }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-color))' }}></div>
              <div style={{ margin: '0 12px', color: 'var(--accent-orange)', fontSize: '8px' }}>◆</div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--border-color))' }}></div>
            </div>

            {/* Subheading Body Text */}
            <p className="hero-animate hero-delay-3" style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              maxWidth: '750px',
              margin: '0 auto 28px auto',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              textAlign: 'center'
            }}>
              Strategic websites that turn visitors into customers.<br />
              Designed for Pakistani businesses. Built for real results.
            </p>

            {/* Action Buttons */}
            <div className="hero-animate hero-delay-4" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '28px'
            }}>
              <a
                href="https://wa.me/923316049421?text=Salam,%20I%20want%20to%20discuss%20a%20website%20packages%20and%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--accent-orange)',
                  color: 'white',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '16px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(255, 85, 0, 0.2)'
                }}
                className="btn-primary"
              >
                <MessageCircle size={18} />
                Get Started on WhatsApp
              </a>
              <a 
                href="#contact" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f1f1f3',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '16px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="btn-secondary"
              >
                See Packages
              </a>
            </div>

            {/* Trust checkmarks list */}
            <div className="hero-animate hero-delay-4" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              marginBottom: '32px',
              fontWeight: 500
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-orange)' }} /> Conversion Focused
              </span>
              <span style={{ color: 'rgba(0,0,0,0.15)' }} className="desktop-nav">|</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-orange)' }} /> Modern & Responsive
              </span>
              <span style={{ color: 'rgba(0,0,0,0.15)' }} className="desktop-nav">|</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent-orange)' }} /> Made for Pakistani Businesses
              </span>
            </div>

            {/* Scroll Indicator */}
            <div style={{ 
              marginTop: '36px', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              letterSpacing: '0.15em', 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase',
              animation: 'bounce 2s infinite'
            }}>
              (Scroll Down & Explore)
            </div>

          </div>  
          {/* Kyne Style Soft Peachy Orange Bottom Glow */}
          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 85, 0, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 1,
            pointerEvents: 'none'
          }}></div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section id="problem" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
          <div className="section-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div className="problem-card reveal-slide-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-orange)' }}>
                  <TrendingUp size={20} />
                  <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Reality Check</span>
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '24px', lineHeight: '1.2' }}>
                  Website Ban Gayi. <span style={{ color: 'var(--accent-orange)' }}>Business Kitna Barha?</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '1.1rem' }}>
                    You paid for a website. It looks decent enough. But the contact form goes nowhere, Google has never heard of you, it takes eight seconds to open on mobile data, and the person who built it stopped replying two months ago.
                  </p>
                  <p style={{ fontSize: '1.1rem' }}>
                    Design was never the problem. Nobody ever asked what this website was supposed to do for your business.
                  </p>
                </div>
                
                <div className="attention-line">
                  Website kharcha nahi honi chahiye. Investment honi chahiye.
                </div>

                <p style={{ fontSize: '1.1rem', marginTop: '24px' }}>
                  We start with the result you need, whether that is WhatsApp messages, calls, form enquiries or bookings, and then build backwards from it. Every page gets one job.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR SECTION */}
        <section 
          ref={nichesSectionRef}
          id="who-this-is-for" 
          style={{ borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
        >
          <div className="section-container" style={{ maxWidth: '1400px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: '60px',
              alignItems: 'start'
            }} className="niches-layout-grid">
              
              {/* Left Column (Sticky Heading Outer) */}
              <div style={{ position: 'sticky', top: '140px', zIndex: 2 }} className="niches-left-col">
                <div 
                  ref={nichesLeftRef}
                  style={{ 
                    transition: 'transform 0.1s ease-out',
                    willChange: 'transform'
                  }}
                >
                  <div className="badge">Ideal Partnerships</div>
                  <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '24px', fontWeight: 800, lineHeight: '1.1' }}>
                    We Build For <br />
                    <span style={{ color: 'var(--accent-orange)', fontStyle: 'italic', fontWeight: 400 }}>Businesses</span> That <br />
                    <span>Sell Something.</span>
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    If your customer finds you through Google, Instagram or a reference, and then checks your website before deciding to contact you, this page is for you.
                  </p>
                </div>
              </div>

              {/* Right Column (Vertical Animated Cards) */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px'
                }}
                className="niches-right-col"
              >
                {niches.map((niche, idx) => (
                  <div key={idx} className="niche-item reveal-slide-right" style={{ width: '100%', margin: 0, transitionDelay: `${idx * 50}ms` }}>
                    <div style={{
                      backgroundColor: 'var(--accent-orange-dim)',
                      border: '1px solid rgba(255, 85, 0, 0.2)',
                      color: 'var(--accent-orange)',
                      borderRadius: '10px',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontFamily: 'var(--font-headings)'
                    }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{niche}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* WHAT YOU GET SECTION */}
        <section 
          id="what-you-get" 
          style={{ 
            borderBottom: '1px solid var(--border-color)', 
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            padding: '40px 0'
          }}
        >
          <div className="section-container" style={{ textAlign: 'left', marginBottom: '48px' }}>
            {/* Top Left Header */}
            <div style={{ width: '100%' }} className="reveal-zoom">
              <div className="badge" style={{ marginBottom: '12px' }}>No Headache Deliverables</div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '16px', fontWeight: 800 }}>
                Everything Done For You, <br />
                <span style={{ color: 'var(--accent-orange)' }}>Start to Handover</span>
              </h2>
              <p style={{ maxWidth: '850px', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                You do not need to hire a writer, then a designer, then a developer, and then chase all three every second day. <br />
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>One team. One timeline. One point of contact.</span>
              </p>
            </div>
          </div>

          {/* Infinite Marquee Carousel */}
          <div className="marquee-container">
            <div className="marquee-track">
              {/* Set 1 of Cards */}
              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Code style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Website Content Written For You</h3>
                <p>We write every page in clean, professional English, aimed at the customers you actually want. No blank templates.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Sparkles style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Custom Graphics and Design</h3>
                <p>No recycled templates that others run. Your brand, your colours, and custom visuals built from scratch.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Smartphone style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Built Mobile First</h3>
                <p>More than eighty percent of your visitors will open your site on a phone. We optimize it to load instantly on mobile data.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <CheckCircle style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Contact Forms That Reach You</h3>
                <p>Tested and wired directly to your inbox so no enquiry or customer lead disappears into nowhere.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <MessageSquare style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>WhatsApp Integration</h3>
                <p>One tap and the customer is in your chat with a pre-typed message. Zero friction chat setup.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Search style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>SEO Keyword Research</h3>
                <p>We find the exact terms people in your city are searching on Google, and align your page content around them.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Bot style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>AI Chatbot</h3>
                <p>Answers common questions, handles enquiries at 2am, and captures lead names and numbers dynamically.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Database style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>CRM Integration</h3>
                <p>Every lead lands in your system automatically, tagged and ready for instant follow-up without notebooks.</p>
              </div>

              {/* Set 2 of Cards (Exact Duplicate for Seamless Loop) */}
              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Code style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Website Content Written For You</h3>
                <p>We write every page in clean, professional English, aimed at the customers you actually want. No blank templates.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Sparkles style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Custom Graphics and Design</h3>
                <p>No recycled templates that others run. Your brand, your colours, and custom visuals built from scratch.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Smartphone style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Built Mobile First</h3>
                <p>More than eighty percent of your visitors will open your site on a phone. We optimize it to load instantly on mobile data.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <CheckCircle style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Contact Forms That Reach You</h3>
                <p>Tested and wired directly to your inbox so no enquiry or customer lead disappears into nowhere.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <MessageSquare style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>WhatsApp Integration</h3>
                <p>One tap and the customer is in your chat with a pre-typed message. Zero friction chat setup.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Search style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>SEO Keyword Research</h3>
                <p>We find the exact terms people in your city are searching on Google, and align your page content around them.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Bot style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>AI Chatbot</h3>
                <p>Answers common questions, handles enquiries at 2am, and captures lead names and numbers dynamically.</p>
              </div>

              <div className="service-grid-card" style={{ width: '360px', flexShrink: 0 }}>
                <Database style={{ color: 'var(--accent-orange)', marginBottom: '16px' }} size={32} />
                <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>CRM Integration</h3>
                <p>Every lead lands in your system automatically, tagged and ready for instant follow-up without notebooks.</p>
              </div>
            </div>
          </div>
        </section>


        {/* PACKAGES SECTION */}
        <section id="packages" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="section-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }} className="reveal-flip">
              <div className="badge">Transparent Pricing</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '20px' }}>
                Teen Packages. Jo Aap Ke Business Pe Fit Aaye, Wohi Lein.
              </h2>
              <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
                Price is agreed in writing before we start. No extra invoices halfway through the project.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'stretch',
              marginBottom: '40px'
            }}>
              {/* BASIC PACKAGE */}
              <div className="package-card reveal-slide-left">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Basic</span>
                <h3 style={{ fontSize: '1.75rem', margin: '8px 0 16px 0' }}>PKR 50,000</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  <strong>Best for:</strong> New businesses getting online properly for the first time.
                </p>
                <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> 4 to 5 pages</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Full website content written by us</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Contact form integration</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> WhatsApp integration</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Custom graphics for your website</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Mobile optimised build</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>SEO keyword research</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>AI chatbot</li>
                </ul>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '12px', fontSize: '0.9rem', color: 'white', marginBottom: '24px' }}>
                  Jo customer aap ka naam already jaanta hai, woh ab confidently contact karega.
                </div>
                <a
                  href="#contact"
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Start With Basic
                </a>
              </div>

              {/* STANDARD PACKAGE */}
              <div className="package-card highlight reveal-zoom">
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Standard</span>
                <h3 style={{ fontSize: '1.75rem', margin: '8px 0 16px 0' }}>PKR 75,000</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  <strong>Best for:</strong> Businesses that want new customers coming in from Google, and every lead captured automatically.
                </p>
                <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> 8 to 10 pages</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Full website content written by us</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Contact form integration</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> WhatsApp integration</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Custom graphics for your website</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Mobile optimised build</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> SEO keyword research</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> AI chatbot</li>
                </ul>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '12px', fontSize: '0.9rem', color: 'white', marginBottom: '24px' }}>
                  Naye log Google se aayenge, aur office band hone ke baad bhi lead handle hoti rahegi.
                </div>
                <a
                  href="#contact"
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Go With Standard
                </a>
              </div>

              {/* PREMIUM PACKAGE */}
              <div className="package-card reveal-slide-right">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Premium</span>
                <h3 style={{ fontSize: '1.75rem', margin: '8px 0 16px 0' }}>PKR 100,000</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  <strong>Best for:</strong> Established businesses with a sales team, multiple services or multiple locations.
                </p>
                <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> 15 or more pages</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Full website content written by us</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Contact form integration</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> WhatsApp integration</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Custom graphics for your website</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> Mobile optimised build</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> SEO keyword research</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> AI chatbot</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}><CheckCircle size={16} style={{ color: 'var(--accent-orange)' }} /> CRM integration</li>
                </ul>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '12px', fontSize: '0.9rem', color: 'white', marginBottom: '24px' }}>
                  Har service aur har location ka apna page, aur har lead seedha CRM mein, follow up ke liye ready.
                </div>
                <a
                  href="#contact"
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  Get Premium
                </a>
              </div>
            </div>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Samajh nahi aa raha kaunsa package sahi hai?{' '}
              <a
                href="#contact"
                style={{ color: 'var(--accent-orange)', textDecoration: 'underline', fontWeight: 600 }}
              >
                Message karein, hum sach bata denge, chahe sasta wala hi kyun na ho.
              </a>
            </p>
          </div>
        </section>

        {/* HOW WE WORK SECTION */}
        <section id="how-it-works" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
          <div className="section-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }} className="reveal-slide-right">
              <div className="badge">The Process</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '20px' }}>How It Works</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
                Simple, structured steps that ensure transparency and keep you informed.
              </p>
            </div>

            {/* Top row: Steps 1, 2, 3 */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <div className="service-grid-card reveal-on-scroll" style={{ flex: '1 1 320px', maxWidth: '360px', display: 'flex', flexDirection: 'column' }}>
                <div className="step-number">1</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>We Talk</h3>
                <p style={{ fontSize: '0.95rem' }}>Fifteen minutes on WhatsApp or a call. You tell us your business, your customers, and what the website needs to bring in.</p>
              </div>

              <div className="service-grid-card reveal-on-scroll" style={{ flex: '1 1 320px', maxWidth: '360px', display: 'flex', flexDirection: 'column', transitionDelay: '100ms' }}>
                <div className="step-number">2</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>We Send a Written Scope</h3>
                <p style={{ fontSize: '0.95rem' }}>Pages, features, timeline and price in one document, before you pay anything.</p>
              </div>

              <div className="service-grid-card reveal-on-scroll" style={{ flex: '1 1 320px', maxWidth: '360px', display: 'flex', flexDirection: 'column', transitionDelay: '200ms' }}>
                <div className="step-number">3</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>We Build & Keep Updated</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '12px' }}>Content, design, graphics and integrations, with regular progress updates as we go.</p>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '8px', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>
                  Mahina bhar ki khamoshi nahi milegi, update milta rahega.
                </div>
              </div>
            </div>

            {/* Bottom row: Steps 4, 5 */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'center'
            }}>
              <div className="service-grid-card reveal-on-scroll" style={{ flex: '1 1 320px', maxWidth: '360px', display: 'flex', flexDirection: 'column', transitionDelay: '300ms' }}>
                <div className="step-number">4</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>You Review</h3>
                <p style={{ fontSize: '0.95rem' }}>You see the complete site before it goes live. Revisions at this stage are included.</p>
              </div>

              <div className="service-grid-card reveal-on-scroll" style={{ flex: '1 1 320px', maxWidth: '360px', display: 'flex', flexDirection: 'column', transitionDelay: '400ms' }}>
                <div className="step-number">5</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>We Launch & Hand Over</h3>
                <p style={{ fontSize: '0.95rem' }}>Site goes live, forms tested, WhatsApp connected, and every file, login and access transferred to you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="section-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div className="badge">No Risks</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '20px' }}>
                Pehle Kisi Ne Nuqsan Diya Hoga. <span style={{ color: 'var(--accent-orange)' }}>Hum Aise Kaam Nahi Karte.</span>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}>
              <div className="problem-card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--accent-orange)' }} />
                  Everything in writing
                </h3>
                <p style={{ fontSize: '0.95rem' }}>Scope, price and timeline in one document. If it is not in that document, you are not paying for it.</p>
              </div>

              <div className="problem-card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--accent-orange)' }} />
                  Payment in milestones
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}>Poora advance nahi lete. You pay as work gets delivered.</p>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '8px', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>
                  No full advance.
                </div>
              </div>

              <div className="problem-card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--accent-orange)' }} />
                  You own everything
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}>Domain, hosting, source code and files, all transferred to you at handover.</p>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '8px', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>
                  Renewal ke naam pe yerghamal nahi banaye ga.
                </div>
              </div>

              <div className="problem-card">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--accent-orange)' }} />
                  No fake guarantees
                </h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}>Anyone promising you number one ranking in thirty days is selling you something they cannot deliver.</p>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '8px', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>
                  Hum sach bolte hain, chahe order chala jaye.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US SECTION */}
        <section style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
          <div className="section-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'center'
            }} className="why-us-grid">
              <div className="why-us-left-col">
                <div className="badge">Why Us</div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '24px' }}>
                  Why Businesses Choose Us
                </h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
                  We don't build decoration. We build websites that convert visitors into active leads, phone calls, and WhatsApp enquiries for Pakistani service businesses.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent-orange)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>We write the content</h3>
                    <p style={{ fontSize: '0.95rem' }}>Your project never stalls waiting for text from your end.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent-orange)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>Built for enquiries</h3>
                    <p style={{ fontSize: '0.95rem' }}>We design to push visitors toward contacting you, not to win designer awards.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent-orange)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>Fixed scope, fixed price</h3>
                    <p style={{ fontSize: '0.95rem' }}>No surprise invoices in the middle of the project.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent-orange)' }}><CheckCircle size={24} /></div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>One team, all bases</h3>
                    <p style={{ fontSize: '0.95rem' }}>Copy, design, development, SEO, and automation managed by one point of contact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section id="selected-work" style={{ borderBottom: '1px solid var(--border-color)', background: '#ffffff' }}>
          <div className="section-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
              <div>
                <div className="badge" style={{ backgroundColor: 'rgba(255, 85, 0, 0.15)', color: '#ff661a', borderColor: 'rgba(255, 85, 0, 0.3)' }}>PORTFOLIO</div>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, position: 'relative', color: 'var(--text-primary)' }}>
                  Checkout Our Portfolio<span style={{ color: 'var(--accent-orange)' }}>.</span>
                </h2>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '64px',
              marginTop: '40px'
            }}>
              {portfolioItems.map((item, index) => {
                const isEven = index % 2 === 1;
                return (
                  <div
                    key={index}
                    className="portfolio-item-row"
                    style={{
                      display: 'flex',
                      flexDirection: isEven ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      gap: '48px',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Link Card holding image */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', textDecoration: 'none', flex: '1.2', width: '100%' }}
                      className="portfolio-link-card"
                    >
                      <div
                        style={{
                          borderRadius: '20px',
                          overflow: 'hidden',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-secondary)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                          position: 'relative'
                        }}
                        className="portfolio-card-inner"
                      >
                        <div style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}>
                          <img
                            src={item.img}
                            alt={`${item.title} Mockup`}
                            style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.5s ease' }}
                            className="portfolio-img"
                          />
                        </div>
                      </div>
                    </a>

                    {/* Description Text */}
                    <div style={{ flex: '1', width: '100%', textAlign: 'left' }} className="portfolio-desc">
                      <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--text-primary)', fontFamily: 'var(--font-headings)' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                        {item.desc}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          color: 'var(--text-primary)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Visit Website <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="section-container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }} className="reveal-zoom">
              <div className="badge">Questions & Answers</div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="reveal-on-scroll"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
                  >
                    <button className="faq-question" onClick={() => toggleFaq(index)}>
                      <span>{item.question}</span>
                      <ChevronDown className="faq-icon" size={20} />
                    </button>
                    <div className="faq-answer">
                      <p style={{ margin: 0, paddingBottom: '8px' }}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section id="contact" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: 'linear-gradient(180deg, #09090b 0%, #030304 100%)' }}>
          <div className="section-container" style={{ textAlign: 'center', maxWidth: '800px', paddingBottom: '120px' }}>
            <div className="badge" style={{ backgroundColor: 'rgba(255, 85, 0, 0.15)', color: '#ff661a', borderColor: 'rgba(255, 85, 0, 0.3)' }}>Let's Get Started</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '24px', lineHeight: '1.1', color: '#ffffff' }}>
              Next Month, Let Your Website Answer That Question
            </h2>
            <p style={{ fontSize: '1.15rem', marginBottom: '32px', color: 'rgba(255, 255, 255, 0.75)' }}>
              Send us one message telling us what your business does. We will tell you which package fits and what results you can realistically expect. No pressure, no long sales process.
            </p>

            <div style={{ borderLeft: '3px solid var(--accent-orange)', padding: '12px 24px', backgroundColor: '#18181b', borderRadius: '0 8px 8px 0', textAlign: 'left', marginBottom: '40px', fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>
              Ek message ki baat hai. Baaki hum sambhal lete hain.
            </div>

            <div className="enquiry-form-card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              backgroundColor: '#121214',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '40px',
              borderRadius: '16px',
              textAlign: 'left'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#ffffff' }}>Send a Quick Enquiry</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const inputs = form.querySelectorAll('input, textarea');
                const name = (inputs[0] as HTMLInputElement)?.value || '';
                const email = (inputs[1] as HTMLInputElement)?.value || '';
                const phone = (inputs[2] as HTMLInputElement)?.value || '';
                const message = (inputs[3] as HTMLTextAreaElement)?.value || '';

                try {
                  await fetch("https://services.leadconnectorhq.com/hooks/y9oH1m3G7bRgqjei9FD2/webhook-trigger/083bd9cf-7b0b-4aee-aef9-94f39c950aed", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, phone, message, source: "Quick Enquiry Form" })
                  });
                } catch (err) {
                  console.error("Webhook Error:", err);
                }

                window.location.href = '/thank-you';
                form.reset();
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <input type="text" placeholder="Your Name" className="form-input" style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }} required />
                  <input type="email" placeholder="Email Address" className="form-input" style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <input type="tel" placeholder="WhatsApp / Phone Number" className="form-input" style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }} required />
                </div>
                <textarea placeholder="Tell us briefly about your business..." className="form-input" style={{ minHeight: '120px', resize: 'vertical', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }} required></textarea>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    Send Enquiry
                  </button>
                  <a
                    href="https://wa.me/923316049421?text=Salam,%20I%20want%20to%20discuss%20a%20website%20packages%20and%20enquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, backgroundColor: '#25D366', borderColor: '#25D366', color: '#ffffff' }}
                  >
                    <MessageCircle size={20} />
                    WhatsApp Pe Message Karein
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#09090b',
        padding: '24px 24px'
      }}>
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, margin: 0 }}>
            Websites built for Pakistani businesses that want customers, not compliments.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            © {new Date().getFullYear()} SpreadPixels. All rights reserved. Source code & ownership transferred completely to you.
          </p>
        </div>
      </footer>

      {/* Custom Cursor Follower */}
      <div ref={cursorFollowerRef} className="custom-cursor-follower" />

      {/* Responsive styles helper */}
      <style jsx global>{`
        @media (max-width: 991px) {
          .what-you-get-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .what-you-get-left {
            position: relative !important;
            top: 0 !important;
          }
          .what-you-get-right {
            overflow-x: auto !important;
          }
          .what-you-get-track {
            transform: none !important;
          }
        }
        @media (max-width: 768px) {
          .why-us-grid {
            grid-template-columns: 1fr !important;
          }
          .why-us-left-col {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .why-us-left-col .badge {
            margin: 0 auto 12px auto !important;
          }
          .why-us-grid h3, .why-us-grid p {
            text-align: left !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .portfolio-item-row {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .portfolio-desc {
            text-align: center !important;
          }
          .niche-item {
            justify-content: flex-start !important;
            text-align: left !important;
          }
          .enquiry-form-card {
            padding: 24px 18px !important;
          }
        }
      `}</style>
    </>
  );
}
