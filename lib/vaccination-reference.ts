/**
 * Parent-facing transcription of the first four age rows on the Mamta Super
 * Speciality Hospital printed immunisation card supplied on 23 October 2026.
 *
 * IMPORTANT:
 * - The pictured card is a blank TEMPLATE, not proof any vaccine was administered.
 * - Its labels are not a validated, current hospital protocol or product inventory.
 * - Do not derive individual due dates, dose validity, reminder triggers or
 *   prescribing decisions from this display data.
 * - Hospital clinicians must review protocol/version and each child's records.
 * - India's public UIP and the IAP clinical schedule are different frameworks.
 */
export type PrintedCardMilestone = {
  key: string;
  label: string;
  familyNote: string;
  recordedLabels: readonly string[];
  symbol: 'sprout' | 'sun' | 'heart' | 'shield';
  tone: 'peach' | 'blue' | 'mint' | 'lavender';
};

export const mamtaPrintedCardEarlyMilestones: readonly PrintedCardMilestone[] = [
  {
    key: 'birth',
    label: 'At birth',
    familyNote: 'The beginning of your baby’s vaccination record.',
    recordedLabels: ['BCG', 'Hepatitis B (HB1)', 'Oral polio (OPV 0)'],
    symbol: 'sprout',
    tone: 'peach',
  },
  {
    key: 'six-weeks',
    label: '6 weeks',
    familyNote: 'Early protection is commonly delivered through several vaccine components.',
    recordedLabels: ['Hepatitis B (HB2)', 'IPV 1', 'DTP 1', 'Hib 1', 'PCV 1', 'Rotavirus 1'],
    symbol: 'sun',
    tone: 'blue',
  },
  {
    key: 'ten-weeks',
    label: '10 weeks',
    familyNote: 'The record continues with follow-on dose labels.',
    recordedLabels: ['Hepatitis B (HB3)', 'IPV 2', 'DTP 2', 'Hib 2', 'PCV 2', 'Rotavirus 2'],
    symbol: 'heart',
    tone: 'mint',
  },
  {
    key: 'fourteen-weeks',
    label: '14 weeks',
    familyNote: 'A clinician checks earlier doses and the specific vaccine products.',
    recordedLabels: ['Hepatitis B (HB4)', 'IPV 3', 'DTP 3', 'Hib 3', 'PCV 3', 'Rotavirus 3'],
    symbol: 'shield',
    tone: 'lavender',
  },
] as const;

export const vaccinationEditorialReferences = [
  'Mamta Hospital vaccination guidance',
  'Indian Academy of Pediatrics immunisation recommendations',
  'Government of India National Immunisation Schedule',
  'World Health Organization and UNICEF research',
] as const;
