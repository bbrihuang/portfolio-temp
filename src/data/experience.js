// Work experience, newest first. Current roles (end: null) are listed before
// past ones. Dates are 'YYYY-MM' so durations can be computed.
export const experience = [
  {
    slug: 'gradientv',
    role: 'Lead Software Engineer',
    org: 'GradientV LLC',
    orgNote: 'Technology & systems integration agency',
    url: 'https://gradientv.com/',
    location: 'New York, NY',
    start: '2026-10',
    end: null,
    type: 'Engineering',
    points: [
      'Lead engineering at an AI and custom software agency serving 3+ paying small-business clients.',
      'Built and deployed 3 production client websites on Vercel for a tax advisory firm, a Filipino cafe, and a food truck, with custom domains, SEO and social-share metadata, and accessible, mobile-responsive layouts.',
      'Built a self-assessment tool that estimates IRS penalty exposure by industry, plus catering and signup forms.',
      'Developed AI tooling (LLM agents, RAG, API integrations) that lets owners query their own business data.',
    ],
    skills: ['React', 'Vercel', 'LLM agents', 'RAG', 'SEO', 'Accessibility'],
  },
  {
    slug: 'bu-techops',
    role: 'Student TechOps Assistant',
    org: 'Boston University',
    orgNote: 'College of Communication · TechOps Center',
    url: 'https://www.bu.edu/comtech/',
    location: 'Boston, MA',
    start: '2026-09',
    end: null,
    type: 'Operations',
    points: [
      'Run evening operations for COM’s broadcast studios, podcast suites, editing bay, and classrooms.',
      'Troubleshoot classroom AV, Zoom, and macOS editing workstations running Adobe Creative Cloud.',
      'Provide customer-facing tech support to students and faculty as the evening point of contact.',
    ],
    skills: ['AV systems', 'macOS', 'Adobe Creative Cloud', 'Zoom', 'Tech support'],
  },
  {
    slug: 'cubic-builds',
    role: 'Founder & Website Developer',
    org: 'Cubic Builds',
    orgNote: 'Custom PC building business',
    url: 'https://cubicbuilds.vercel.app',
    location: 'New York, NY',
    start: '2023-01',
    end: null,
    type: 'Founder',
    points: [
      'Founded a custom PC building business, selling 10+ systems at a $1,000 average for $10K+ revenue.',
      'Tailor each build to the client’s budget and use case (gaming, streaming), balancing speed and aesthetics.',
      'Source, build, and stress-test each PC (Prime95, MemTest86, OCCT, FurMark) for clients across the US.',
      'Designed and built the storefront, with a live part customizer and a guided configurator.',
    ],
    skills: ['PC assembly', 'Stress testing', 'Overclocking', 'Watercooling', 'React'],
  },
  {
    slug: 'babel-audio',
    role: 'Audio & Video Recorder',
    org: 'Babel Audio',
    orgNote: 'AI training data',
    url: null,
    location: 'Remote',
    start: '2026-02',
    end: '2026-05',
    type: 'Contract',
    points: [
      'Recorded structured audio and video conversations to build AI training datasets for speech and audio models.',
      'Kept audio clarity and data usability consistent across 500+ sessions by following detailed recording protocols.',
    ],
    skills: ['AI training data', 'Audio/video capture', 'Quality assurance'],
  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatMonth(ym) {
  if (!ym) return 'Present'
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export function formatRange(start, end) {
  return `${formatMonth(start)} – ${formatMonth(end)}`
}

// Inclusive month count, e.g. Jan–May is 5 mos.
export function duration(start, end) {
  const [sy, sm] = start.split('-').map(Number)
  const now = new Date()
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1]
  const total = Math.max(1, (ey - sy) * 12 + (em - sm) + 1)
  const yrs = Math.floor(total / 12)
  const mos = total % 12
  const parts = []
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`)
  if (mos) parts.push(`${mos} mo${mos > 1 ? 's' : ''}`)
  return parts.join(' ')
}
