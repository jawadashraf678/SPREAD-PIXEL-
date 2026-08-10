import type { Metadata } from "next";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Websites Built for Pakistani Businesses that Need Customers, Not Decoration",
  description: "We build result-oriented websites for Pakistani clinics, real estate, agencies, consultants, and manufacturers. Direct WhatsApp integration, SEO, and lead-generation CRM setup.",
  keywords: "website development pakistan, web designer pakistan, digital agency, lead generation website, web packages pakistan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid-overlay"></div>
        {children}
        
        {/* Floating WhatsApp Button on Left Side */}
        <a
          href="https://wa.me/923316049421?text=Salam,%20I%20want%20to%20get%20started%20with%20a%20website."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 9999,
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
            transition: 'transform 0.3s ease',
          }}
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.13-1.346a9.923 9.923 0 004.882 1.28c5.505 0 9.988-4.478 9.99-9.984 0-2.67-1.037-5.18-2.92-7.062A9.924 9.924 0 0012.012 2zm5.72 14.12c-.244.688-1.22 1.25-1.68 1.302-.45.051-.9.245-2.88-.537-2.374-.937-3.906-3.344-4.025-3.502-.119-.158-.97-1.29-.97-2.46 0-1.171.613-1.745.832-1.983.218-.238.477-.297.636-.297.159 0 .318.002.457.008.145.006.337-.056.528.4.198.473.676 1.644.736 1.762.06.119.099.257.02.416-.08.158-.119.257-.238.396-.119.14-.251.312-.358.42-.12.12-.244.251-.105.489.138.238.614 1.01 1.318 1.637.907.807 1.668 1.057 1.906 1.176.238.119.377.1.516-.06.139-.158.615-.713.78-1.01.16-.297.318-.248.536-.168.219.08 1.392.654 1.63 1.149.238.495.238.93.119 1.618z"/>
          </svg>
        </a>
        <Chatbot />
      </body>
    </html>
  );
}
