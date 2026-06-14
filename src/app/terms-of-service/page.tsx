import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Wavecare Marketing',
  description: 'Terms of Service for Wavecare Marketing, a healthcare marketing agency.',
};

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Terms of Service</h1>
        <p><strong>Effective Date: June 15, 2026</strong></p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the Wavecare Marketing website (the "Site") and services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        </section>

        <section>
          <h2>2. Description of Services</h2>
          <p>Wavecare Marketing is a specialized healthcare marketing agency that provides a range of services including but not limited to brand development, video production, photography, design, print, and web design ("Services"). The specific deliverables and scope of Services will be outlined in a separate Statement of Work (SOW) or Service Agreement signed by both parties.</p>
        </section>

        <section>
          <h2>3. Client Responsibilities</h2>
          <p>In order for Wavecare Marketing to effectively perform the Services, the Client agrees to:</p>
          <ul>
            <li>Provide necessary access to websites, hosting accounts, social media accounts, and other relevant platforms.</li>
            <li>Provide timely feedback and approvals on deliverables.</li>
            <li>Provide necessary content, assets, and information required for the execution of the Services unless otherwise stated in the SOW.</li>
            <li>Ensure that all content provided to Wavecare Marketing does not infringe on the intellectual property rights of any third party.</li>
          </ul>
        </section>

        <section>
          <h2>4. Payment Terms</h2>
          <p>Payment terms are determined in the specific Service Agreement or SOW. Generally, invoices are due upon receipt unless otherwise specified. Failure to make payment within the agreed-upon timeframe may result in a suspension of Services or late fees as detailed in the Service Agreement.</p>
        </section>

        <section>
          <h2>5. Intellectual Property Rights</h2>
          <p>Upon final and full payment, the Client shall retain ownership of all final deliverables created specifically for the Client. Wavecare Marketing retains the right to use the completed project and any preliminary designs for the purpose of design competitions, future publications on design, educational purposes, and the marketing of Wavecare Marketing's business.</p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>In no event shall Wavecare Marketing, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
        </section>

        <section>
          <h2>7. Termination</h2>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <p>Email address: <a href="mailto:info@wavecare.io">info@wavecare.io</a></p>
          <p>Telephone number: <a href="tel:+17329301934">+1 732 930 1934</a></p>
        </section>

        <div className="back-link">
          <Link href="/">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
