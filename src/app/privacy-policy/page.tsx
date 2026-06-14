import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Wavecare Marketing',
  description: 'Privacy Policy for Wavecare Marketing, a healthcare marketing agency.',
};

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date: June 15, 2026</strong></p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to Wavecare Marketing ("Company", "we", "our", "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
        </section>

        <section>
          <h2>2. The Data We Collect About You</h2>
          <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, and company name.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products, and services.</li>
            <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
          </ul>
        </section>

        <section>
          <h2>3. How Is Your Personal Data Collected?</h2>
          <p>We use different methods to collect data from and about you including through:</p>
          <ul>
            <li><strong>Direct interactions.</strong> You may give us your Identity and Contact data by filling in forms or by corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you:
              <ul>
                <li>apply for our products or services;</li>
                <li>subscribe to our service or publications;</li>
                <li>request marketing to be sent to you;</li>
                <li>give us feedback or contact us.</li>
              </ul>
            </li>
            <li><strong>Automated technologies or interactions.</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.</li>
          </ul>
        </section>

        <section>
          <h2>4. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
        </section>

        <section>
          <h2>6. Data Retention</h2>
          <p>We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.</p>
        </section>

        <section>
          <h2>7. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:</p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          <p>If you wish to exercise any of the rights set out above, please contact us.</p>
        </section>

        <section>
          <h2>8. Contact Details</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us in the following ways:</p>
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
