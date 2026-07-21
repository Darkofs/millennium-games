"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 1,
      title: "1. Information We Collect",
      content: (
        <div className="space-y-4 text-xs text-slate-600">
          <p>We may collect the following types of information:</p>
          <div className="space-y-2">
            <h3 className="font-bold text-[#0f172a] text-xs">Personal Information</h3>
            <p>When you create an account, place an order, or contact us, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Billing Information</li>
              <li>Country or Region</li>
              <li>Phone Number (if provided)</li>
              <li>Account Username</li>
              <li>Order History</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-[#0f172a] text-xs">Payment Information</h3>
            <p>Payments are securely processed through trusted third-party payment providers.</p>
            <p className="font-semibold bg-slate-200/40 border border-slate-300/30 p-3 rounded-xl">
              ⚠️ Millennium Games does not store your complete credit card, debit card, UPI PIN, CVV, or banking credentials on our servers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-[#0f172a] text-xs">Technical Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Website Usage Data</li>
              <li>Referral Source</li>
              <li>Date and Time of Visits</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Your information may be used to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and deliver orders</li>
            <li>Verify payments</li>
            <li>Prevent fraud and unauthorized transactions</li>
            <li>Provide customer support</li>
            <li>Send purchase confirmations</li>
            <li>Respond to inquiries</li>
            <li>Improve website performance and user experience</li>
            <li>Comply with legal obligations</li>
            <li>Maintain the security of our platform</li>
          </ul>
          <p className="font-semibold text-mint">We do not sell your personal information to third parties.</p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Cookies",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Our website may use cookies and similar technologies to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Keep you signed in</li>
            <li>Remember your preferences</li>
            <li>Improve website performance</li>
            <li>Analyze website traffic</li>
            <li>Prevent fraudulent activity</li>
          </ul>
          <p>You can disable cookies through your browser settings, although some features of the website may not function properly.</p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. Third-Party Services",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>We may use trusted third-party providers for services including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payment Processing</li>
            <li>Fraud Detection</li>
            <li>Website Analytics</li>
            <li>Cloud Hosting</li>
            <li>Customer Support</li>
            <li>Email Delivery</li>
          </ul>
          <p>These providers only receive the information necessary to perform their services and are required to protect your data.</p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Data Security",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>We implement reasonable administrative, technical, and organizational safeguards to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>
          <p>However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Data Retention",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>We retain personal information only for as long as necessary to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Complete your orders</li>
            <li>Maintain transaction records</li>
            <li>Meet legal, accounting, and tax obligations</li>
            <li>Resolve disputes</li>
            <li>Prevent fraud</li>
          </ul>
          <p>When information is no longer required, it is securely deleted or anonymized where appropriate.</p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Children's Privacy",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Our services are not intended for children under the age of <strong className="text-[#0f172a]">13</strong>.</p>
          <p>We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take reasonable steps to delete it.</p>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Your Privacy Rights",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Depending on applicable law, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of eligible personal information</li>
            <li>Object to certain data processing activities</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p>To exercise these rights, please contact us using the details provided on our website.</p>
        </div>
      ),
    },
    {
      id: 9,
      title: "9. International Data Transfers",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>If you access Millennium Games from outside India, your information may be transferred to and processed in countries where our service providers operate. By using our services, you consent to such transfers in accordance with applicable law.</p>
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Third-Party Links",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>Our website may contain links to third-party websites or gaming platforms.</p>
          <p>We are not responsible for the privacy practices, content, or policies of those external websites. We encourage you to review their privacy policies before providing any personal information.</p>
        </div>
      ),
    },
    {
      id: 11,
      title: "11. Policy Updates",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business practices.</p>
          <p>The updated version will be posted on this page with a revised Effective Date. Continued use of the website after changes become effective constitutes acceptance of the updated Privacy Policy.</p>
        </div>
      ),
    },
    {
      id: 12,
      title: "12. Contact Us",
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <p>If you have any questions about this Privacy Policy or how your personal information is handled, please contact us through the contact information provided on the Millennium Games website.</p>
          <p className="font-semibold">We will make reasonable efforts to respond to privacy-related inquiries as promptly as possible.</p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#cbdce3]/85 z-10" />
        <div className="abstract-shape abstract-shape-emerald w-[600px] h-[600px] -top-32 left-[15%] opacity-20" />
        <div className="abstract-shape abstract-shape-mint w-[500px] h-[500px] bottom-[10%] right-[10%] opacity-15" />
      </div>

      <div className="flex-1 container-custom pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Effective Date: July 21, 2026
            </p>
          </div>

          {/* Card */}
          <div className="glass-card p-8 sm:p-12 border-white/20 shadow-2xl relative overflow-hidden space-y-8 text-[#0f172a] leading-relaxed">
            <p className="text-sm text-slate-600 font-medium">
              At <strong className="text-[#0f172a]">Millennium Games</strong> (&quot;Millennium Games,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information when you use our website or purchase our products.
            </p>
            <p className="text-xs text-slate-600 font-semibold">
              By accessing or using our website, you agree to the practices described in this Privacy Policy.
            </p>

            <hr className="border-slate-300/40" />

            {sections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h2 className="text-lg font-bold uppercase tracking-wide text-[#0f172a]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {section.title}
                </h2>
                {section.content}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
