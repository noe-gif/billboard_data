'use client';
// ----------------------------------------------------------------------

import { BackofficeView } from 'src/sections/__backoffice__/view';
import BackofficeLayout from 'src/layouts/__backoffice__';

export default function HomePage() {
  return (
    <BackofficeLayout>
      <BackofficeView />
    </BackofficeLayout>
  );
}
