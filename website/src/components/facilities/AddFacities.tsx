'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  facilityName: string;
  country: string;
  region: string;
}

interface FormErrors {
  facilityName?: string;
  country?: string;
  region?: string;
}

'use client';
export { default } from './AddFacilityModal';