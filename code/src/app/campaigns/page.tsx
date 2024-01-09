'use client';

import { PostListView } from 'src/sections/__backoffice__/blog/view';
import BackofficeLayout from 'src/layouts/__backoffice__';

// ----------------------------------------------------------------------

export default function CampaignsPage() {
  return (
    <BackofficeLayout>
      <PostListView />
    </BackofficeLayout>
  );
}
