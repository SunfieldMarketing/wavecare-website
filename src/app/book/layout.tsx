import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Strategy Session | Wavecare',
  description: 'Schedule your free strategy session with Wavecare.',
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
