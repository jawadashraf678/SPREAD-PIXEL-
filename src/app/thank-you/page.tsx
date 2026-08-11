'use strict';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, Clock } from 'lucide-react';

export const metadata = {
  title: 'Thank You | SpreadPixels Marketing Agency',
  description: 'Thank you for reaching out to SpreadPixels. We have received your enquiry and will contact you shortly.',
};

export default function ThankYouPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#09090b',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Landing Page Ambient Glow Effects */}
      <div className="gradient-glow" style={{ top: '15%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', opacity: 0.08 }}></div>

      <div style={{
        maxWidth: '650px',
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '24px',
        padding: '48px 32px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Highlighted Logo Container */}
        <div style={{
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src="/spreadpixels_logo.png"
            alt="SpreadPixels Logo"
            style={{
              height: '110px',
              width: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>

        {/* Animated Check Icon with Orange Accent Glow */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 102, 0, 0.08)',
          border: '2px solid var(--accent-orange)',
          color: 'var(--accent-orange)',
          marginBottom: '24px',
          boxShadow: '0 0 30px rgba(255, 102, 0, 0.15)'
        }}>
          <CheckCircle2 size={50} />
        </div>

        {/* Section Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <span className="badge" style={{ backgroundColor: 'rgba(255, 85, 0, 0.1)', color: '#ff661a', borderColor: 'rgba(255, 85, 0, 0.2)' }}>
            Enquiry Received
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3rem)',
          fontWeight: 800,
          lineHeight: '1.1',
          marginBottom: '16px',
          color: '#09090b',
          fontFamily: 'var(--font-headings)'
        }}>
          Inquiry Received <span style={{ color: 'var(--accent-orange)', fontStyle: 'italic' }}>Successfully!</span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(0, 0, 0, 0.65)',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Thank you! We have received your business details. Our team is reviewing your requirements and will reach out to you on WhatsApp shortly.
        </p>

        {/* Feature Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '36px',
          padding: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '14px',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'rgba(0, 0, 0, 0.8)' }}>
            <Clock size={18} style={{ color: 'var(--accent-orange)' }} />
            <span>Response within 15-30 mins</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'rgba(0, 0, 0, 0.8)' }}>
            <ShieldCheck size={18} style={{ color: '#10B981' }} />
            <span>100% Free Project Estimate</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a
            href="https://wa.me/923316049421?text=Salam,%20I%20just%20submitted%20my%20enquiry%20on%20the%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              width: '100%',
              padding: '16px 24px',
              backgroundColor: '#25D366',
              borderColor: '#25D366',
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 700,
              fontFamily: 'var(--font-body), sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(37, 211, 102, 0.2)'
            }}
          >
            <MessageCircle size={22} />
            Need Faster Response? WhatsApp Us Directly
          </a>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#555559',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '8px',
              transition: 'color 0.2s ease'
            }}
          >
            <ArrowLeft size={18} />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
