'use client';

import BackofficeLayout from 'src/layouts/__backoffice__';
import MetricsView from 'src/sections/__backoffice__/metrics/metrics-view';

// ----------------------------------------------------------------------

export default function CampaignMetricsPage() {
  return (
    <BackofficeLayout>
      <MetricsView />
    </BackofficeLayout>
  );
}
