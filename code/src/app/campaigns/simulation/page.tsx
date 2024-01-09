'use client';

import BackofficeLayout from 'src/layouts/__backoffice__';
import SimulationView from 'src/sections/__backoffice__/simulation/simulation-view';

// ----------------------------------------------------------------------

export default function CampaignSimulationPage() {
  return (
    <BackofficeLayout>
      <SimulationView />
    </BackofficeLayout>
  );
}
