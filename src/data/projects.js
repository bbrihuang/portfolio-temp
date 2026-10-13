// Projects, newest first. `featured` projects get the wide cards.
// `art` picks a geometric cover from ProjectArt.jsx. To use a photo instead,
// put it in public/projects/ and set `image: '/projects/<file>'`.
export const projects = [
  {
    slug: 'bu-dining-meal-planner',
    title: 'BU Dining Meal Planner',
    org: 'Personal project',
    role: 'Full-stack developer',
    date: 'Sep 2026 – Present',
    year: '2026',
    categories: ['Software', 'AI/ML'],
    featured: true,
    art: 'meals',
    short: 'Turns live menus from BU’s four dining halls into meal plans that hit your macros.',
    summary:
      'Tell it your calories, protein, carbs and fat, and it builds a plate for every meal from what your dining hall is actually serving today, with real serving amounts like “1½ cups” or “3 links”. Swap a plate or rule out a dish and the rest of the day re-plans around it.',
    highlights: [
      'Built a web app that turns live menus from BU’s 4 dining halls into macro-based meal plans.',
      'Wrote scrapers for BU Dining and Sodexo menus, auto-refreshed twice daily with GitHub Actions.',
      'Designed a meal-planning algorithm averaging 4% calorie error across 92 automated test scenarios.',
      'Integrated the Claude API so students can adjust their plans in plain English without fake menu items.',
    ],
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Node.js', 'Cheerio', 'GitHub Actions', 'Claude API', 'Vercel'],
    links: [
      { label: 'Live site', href: 'https://bumeals.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/bbrihuang/bu-dining-meals-planner' },
    ],
  },
  {
    slug: 'burpg-nozzle',
    title: 'Hybrid Rocket Nozzle',
    org: 'BU Rocket Propulsion Group · Project HIP',
    role: 'Nozzle Design Engineer',
    date: 'Jan 2026 – Present',
    year: '2026',
    categories: ['Hardware', 'Aerospace'],
    featured: true,
    art: 'nozzle',
    short: 'Nozzle geometry for a student-built hybrid rocket engine, headed for a static fire.',
    summary:
      'Project HIP is BURPG’s student-built hybrid rocket engine. I design the nozzle: sizing the converging–diverging contour for the target altitude, modeling it in SOLIDWORKS, and refining geometry and materials through design reviews before fabrication.',
    highlights: [
      'Designed nozzle geometry for a student-built hybrid rocket engine in SOLIDWORKS, sized for target altitude.',
      'Refined nozzle geometry and materials through team design reviews ahead of fabrication and testing.',
      'Integrated nozzle and electrical systems with the team toward engine fabrication and a static-fire test.',
    ],
    stack: ['SOLIDWORKS', 'MATLAB', 'Python', 'Propulsion', 'Thermal analysis'],
    links: [],
  },
  {
    slug: 'jethexa',
    title: 'Project JetHexa',
    org: 'BU AI Society · Robotics Division',
    role: 'Robotics Simulation Developer',
    date: 'Sep 2026 – Present',
    year: '2026',
    categories: ['Robotics', 'Software'],
    art: 'hexapod',
    short: 'A ROS 2 and Gazebo simulation of an 18-DOF hexapod robot for training a walking gait.',
    summary:
      'A full simulation of the JetHexa hexapod so an 8-person team can train a reinforcement-learning walking gait before it ever touches hardware. The sim carries the real robot’s sensors and joint limits, so what works there should transfer.',
    highlights: [
      'Built a ROS 2 and Gazebo simulation of an 18-DOF hexapod robot with lidar, RGB-D camera, and IMU.',
      'Validated the sim against hardware specs: servo limits, forward kinematics, and URDF-to-SDF sensors.',
      'Documented reproducible Docker, WSL, and VM setups for an 8-person team training a PPO walking gait.',
    ],
    stack: ['ROS 2', 'Gazebo', 'Python', 'Docker', 'WSL', 'URDF / SDF'],
    links: [{ label: 'GitHub', href: 'https://github.com/buaiml/Robotics-Group-Proj' }],
  },
  {
    slug: 'local-llm-inference',
    title: 'Local LLM Inference',
    org: 'BU AI Society · Local LLM Division',
    role: 'LLM Inference Researcher',
    date: 'Sep 2026 – Present',
    year: '2026',
    categories: ['AI/ML'],
    art: 'attention',
    short: 'Measuring why LLM text generation is memory-bandwidth-bound.',
    summary:
      'Profiling a quantized small model running locally in llama.cpp to show where the time actually goes: the prompt is processed in one parallel pass, then every new token waits on a full read of the weights.',
    highlights: [
      'Profiled 8-bit Qwen3-1.7B in llama.cpp, measuring prefill vs. decode speed and TTFT on 50 to 4K-token prompts.',
      'Plotted throughput and time-to-first-token against prompt length to compare prefill and decode per token.',
      'Presented a live demo to a 20+ member group on why LLM text generation is memory-bandwidth-bound.',
    ],
    stack: ['llama.cpp', 'Ollama', 'Python', 'Qwen3', 'Profiling'],
    links: [],
  },
  {
    slug: 'cubic-builds-storefront',
    title: 'Cubic Builds Storefront',
    org: 'Cubic Builds',
    role: 'Founder & developer',
    date: 'Oct 2026',
    year: '2026',
    categories: ['Software'],
    art: 'cube',
    short: 'Storefront for my PC business, with a live part customizer and a 7-step configurator.',
    summary:
      'The storefront for Cubic Builds. Visitors browse builds, swap parts with live pricing, compare builds side by side, or answer a short questionnaire for a recommendation, then send an order or quote request straight to me.',
    highlights: [
      'Built a part customizer that swaps CPU, GPU, memory, storage, cooling, and more with live pricing.',
      'Designed a 7-step guided configurator that turns answers into a build brief, with progress saved on-device.',
      'Added a filterable catalog with shareable URL filters, side-by-side compare for up to 4 builds, and quick search.',
      'Kept it account-free: the cart and compare list persist in localStorage and orders are invoiced by reply.',
    ],
    stack: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Vercel'],
    links: [{ label: 'Live site', href: 'https://cubicbuilds.vercel.app' }],
  },
  {
    slug: 'pc-building-guide',
    title: 'How to Build a PC',
    org: 'Published on Notion',
    role: 'Author',
    date: '2024 – Present',
    year: '2024',
    categories: ['Hardware'],
    art: 'board',
    short: 'A free beginner’s guide to choosing parts, assembling, and troubleshooting a PC.',
    summary:
      'A free public guide that walks first-time builders through choosing compatible parts, assembling them, and troubleshooting the build.',
    highlights: [
      'Wrote a beginner-friendly guide covering part selection, assembly, and troubleshooting.',
      'Published it free and public on Notion.',
    ],
    stack: ['Technical writing', 'Hardware diagnostics', 'Notion'],
    links: [],
  },
]

export const categories = ['Software', 'Hardware', 'AI/ML', 'Robotics', 'Aerospace']

// Order cards so the two featured (wide) cards zig-zag in a 3-column grid:
// [F, s] / [s, F] / [s, s, s]. Any other count still packs with grid-flow-dense.
export function arrange(list) {
  const featured = list.filter((p) => p.featured)
  const rest = list.filter((p) => !p.featured)
  if (featured.length !== 2 || rest.length < 2) return [...featured, ...rest]
  return [featured[0], rest[0], rest[1], featured[1], ...rest.slice(2)]
}
