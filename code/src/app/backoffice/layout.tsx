'use client';

import BackofficeLayout from 'src/layouts/__backoffice__';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <BackofficeLayout>{children}</BackofficeLayout>;
}
