// Projects, newest first. `featured` projects get the wide cards.
// `accent` is the project's color (cover art, card rule and label).
// `art` picks a geometric cover from ProjectArt.jsx. To use a photo instead,
// put it in public/projects/ and set `image: '/projects/<file>'`.
//
// `caseStudy` (optional) is the write-up under the highlights on a project's page.
// Each section has a `title` and any of:
//   text    a paragraph, or an array of paragraphs
//   flow    steps drawn as a pipeline diagram: 'Label' or { label, note }
//   points  a list: 'Plain text' or { title, text }
//
// `gallery` (optional) shows photos and videos at the bottom of the page. Put the
// files in public/projects/<slug>/ and list them in order:
//   gallery: [
//     { src: '/projects/jethexa/stand.mp4', alt: 'Hexapod standing up in Gazebo', caption: 'First stand-up test' },
//     { src: '/projects/jethexa/model.png', alt: 'Robot model with sensors labeled' },
//   ],
// Images (jpg, png, webp, gif) and videos (mp4, webm) both work. `caption` is optional;
// a video can take a `poster` image to show before it plays.
export const projects = [
  {
    slug: 'gradientv-client-sites',
    accent: '#60a5fa',
    title: 'GradientV Client Websites',
    org: 'GradientV LLC',
    role: 'Lead Software Engineer',
    date: 'Oct 2026 – Present',
    year: '2026',
    categories: ['Software'],
    art: 'sites',
    short: 'Three production websites for paying small-business clients: a Filipino cafe, a food truck and a tax advisory firm.',
    summary:
      'As lead engineer at GradientV, I built and shipped websites for three small businesses, each with its own job to do: a Filipino cafe in Elmhurst, Queens that wants regulars on its list, a Filipino food truck in Queens that takes catering requests, and a withholding-tax advisory firm whose site has to earn trust and qualify leads.',
    highlights: [
      'Built and deployed 3 production client websites on Vercel, with SEO and social-share metadata.',
      'Built every site with accessible, mobile-responsive layouts.',
      'Built a self-assessment tool for the tax firm that estimates a business’s IRS penalty exposure by industry.',
      'Added a catering request form for the food truck and an email signup for the cafe’s new drops and events.',
    ],
    stack: ['React', 'Vercel', 'SEO', 'Accessibility', 'Responsive design'],
    links: [
      { label: 'Bukas Cafe', href: 'https://bukascafe.vercel.app/' },
      { label: 'Swabe Foodtruck', href: 'https://www.swabefoodtruck.com/' },
      { label: 'InfoReporting Solutions', href: 'https://inforeportingsolutions.vercel.app/' },
    ],
    caseStudy: [
      {
        title: 'The problem',
        text: 'For a small business, the website has to give someone searching for it a clear, fast answer: what you offer, when you’re open, how to reach you. Each of these clients also needed their site to drive one specific action.',
      },
      {
        title: 'Three clients, three jobs',
        points: [
          {
            title: 'Bukas Cafe: turn visitors into regulars',
            text: 'A Filipino progressive cafe in Elmhurst, Queens, known for its house lattes and the Clouds over Manila espresso series. The site tells that story and centers an email signup so people hear about new drops and events.',
          },
          {
            title: 'Swabe Foodtruck: hours, menu and catering',
            text: 'A Filipino food truck in Queens serving pares mami, tapa and pork belly rice bowls, sandwiches and lumpia. Visitors need the menu and hours at a glance, and the catering form turns the site into a source of bigger orders.',
          },
          {
            title: 'InfoReporting Solutions: earn trust, qualify leads',
            text: 'A withholding-tax advisory practice for nonfinancial businesses (Forms 1099, 1042-S, 1042 and W-8/W-9). The self-assessment tool lets a prospective client estimate their IRS penalty exposure by industry before they ever book a call.',
          },
        ],
      },
      {
        title: 'How they’re built',
        flow: [
          { label: 'Client brief', note: 'Goal and audience' },
          { label: 'Design and build', note: 'React, mobile first' },
          { label: 'SEO and sharing', note: 'Metadata, link previews' },
          { label: 'Deploy', note: 'Vercel' },
        ],
        text: 'Each site is deployed on Vercel with page titles and descriptions for search, and social-share metadata so links look right when they’re posted. Layouts are accessible and mobile-responsive throughout.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'bu-dining-meal-planner',
    accent: '#34d399',
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
    caseStudy: [
      {
        title: 'The problem',
        text: 'BU’s dining halls post a full nutrition label for every dish, but nothing helps you hit a target. If you track macros, that means adding up labels yourself and guessing what “one serving” of a stir-fry looks like on a plate. I wanted to open one page and see exactly what to take at each meal.',
      },
      {
        title: 'How it works',
        flow: [
          { label: 'Hall menu pages', note: 'BU Dining and Sodexo' },
          { label: 'Build-time scraper', note: 'Cheerio, twice a day' },
          { label: 'JSON per hall per day', note: 'Static files on Vercel' },
          { label: 'Planner in the browser', note: 'A whole day in a few ms' },
          { label: 'Your plates', note: 'In amounts you can take' },
        ],
        text: [
          'The menu side has no server and no database. Every Vercel build runs a scraper that reads each hall’s menu pages and writes one small JSON file per hall per day. BU’s pages hold two weeks of menus each, more than 20 MB of HTML, so they’re read once at build time instead of on every visit. A GitHub Action triggers a rebuild at about 5 am and 2 pm Boston time.',
          'The planner is pure TypeScript running in the browser. For each meal it tries every sensible plate shape (protein + starch + vegetable, an entrée + a side, and so on) in every combination of portions you can actually serve yourself, scores each one against that meal’s share of your targets, and keeps the closest few that are genuinely different. Each meal aims at what’s left of the day after the meals before it, so if breakfast runs a little over, dinner comes in lighter.',
        ],
      },
      {
        title: 'Challenges',
        points: [
          {
            title: 'Amounts a person can actually take',
            text: 'Labels say things like “1/2 cup”, “2 link” or “1/8 cut”, and a planner that answers “0.3× chicken” is useless at the counter. A portion model turns every serving into whole pieces, quarter cups from ½ to 2 cups, or whole ounces from 2 to 8 oz, and the planner can only choose from those.',
          },
          {
            title: 'Knowing what counts as a dish',
            text: 'Menus list everything served: sauces, dressings, drinks, desserts and toppings. A classifier decides which items can anchor a plate and what role each plays (protein, starch, entrée or side), so a plan isn’t built out of salad dressing and cookies.',
          },
          {
            title: 'Plates that look like a meal',
            text: 'A pure macro fit will happily suggest four burgers. Scoring adds small realism penalties for oversized scoops, doubling up on big items and overcrowded plates, so the best-scoring plate is also one you’d eat.',
          },
          {
            title: 'Menu sites that go down',
            text: 'Requests retry with backoff, and halls are read one at a time to go easy on BU’s servers. If one hall can’t be read, it’s skipped until the next build. If nothing can be read, the build fails on purpose so Vercel keeps the last good version live.',
          },
        ],
      },
      {
        title: 'Testing',
        text: 'The menu readers are tested against saved copies of BU’s and Sodexo’s pages. The planner is tested on real BU days (a weekday at Warren, a brunch day at West, and Fenway) for four target profiles from a 1,700-calorie day to a 3,200-calorie bulk. Every plan has to land within 10% of the calorie target, reach 85% of the protein target, use only takeable amounts, and leave out any dish you’ve ruled out.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'burpg-nozzle',
    accent: '#fb923c',
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
    // Worth adding as the design firms up: the chamber conditions and target altitude
    // you sized for, the throat and exit dimensions, the material choice and why,
    // and CAD renders and drawings in the gallery.
    caseStudy: [
      {
        title: 'The problem',
        text: 'A nozzle turns the hot, high-pressure gas in the combustion chamber into thrust. Its converging–diverging shape has to match the engine’s chamber conditions and the altitude the rocket is designed for, and it has to survive the heat of the burn long enough to do its job.',
      },
      {
        title: 'Design process',
        flow: [
          { label: 'Requirements', note: 'Engine and target altitude' },
          { label: 'Size the contour', note: 'Converging–diverging' },
          { label: 'CAD model', note: 'SOLIDWORKS' },
          { label: 'Design review', note: 'Geometry and materials' },
          { label: 'Build and test', note: 'Fabrication, static fire' },
        ],
        text: 'I size the converging–diverging contour for the target altitude, model it in SOLIDWORKS, and bring it to team design reviews, where the geometry and materials get refined before anything is machined. I also work with the team on integrating the nozzle and electrical systems toward fabrication and a static-fire test.',
      },
      {
        title: 'Status',
        text: 'The nozzle is in design, heading toward fabrication. The next milestone for Project HIP is a static-fire test of the full engine.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'jethexa',
    accent: '#22d3ee',
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
    caseStudy: [
      {
        title: 'The problem',
        text: 'The JetHexa is a six-legged robot with 18 servos and a Jetson Nano onboard. Teaching it to walk by trial and error on the real robot is slow and hard on the hardware, so the team needed a simulation faithful enough to develop and check a gait first. Training itself happens in MuJoCo on the same robot model; Gazebo is where a policy gets checked against the full ROS 2 stack and sensors.',
      },
      {
        title: 'How it works',
        flow: [
          { label: 'Robot model', note: 'URDF: 18 joints + sensors' },
          { label: 'Gazebo Harmonic', note: 'Physics and sensors' },
          { label: 'ROS 2 Humble', note: 'Topics via gz_ros2_control' },
          { label: 'Controller or policy', note: 'Stance, gait, PPO' },
        ],
        text: 'All 18 joints are position-commanded on a single topic, and joint states, a 360° lidar, an RGB-D camera and an IMU publish back through the ROS–Gazebo bridge. One launch file brings up the robot in a flat-ground world, with or without a GUI for batch runs, and a model-check script runs after every change to the robot description.',
      },
      {
        title: 'Challenges',
        points: [
          {
            title: 'Matching the robot, not the newest release',
            text: 'The robot’s Jetson Nano runs Ubuntu 18.04, so ROS 2 Humble is what can actually run on it. Gazebo Classic and Humble’s default Gazebo pairing have both reached end-of-life, which left Gazebo Harmonic. There’s no prebuilt gz_ros2_control for that combination, so it’s built from source as part of the environment.',
          },
          {
            title: 'Failures that make no noise',
            text: 'Converting the robot description from URDF to SDF renames collisions, so a sensor pointing at the wrong one loads fine and silently publishes nothing, and per-link friction quietly does nothing at all. A model check now asserts that all 18 joints and every sensor survive the conversion, and friction is set on the ground surface instead.',
          },
          {
            title: 'Checking the sim against the math',
            text: 'The body settled at 52.5 mm off the ground when the model said 120 mm. Forward kinematics on the commanded joint angles predicted exactly 52.5 mm, so the sim was right and the hand-picked stance angles were the thing to change.',
          },
          {
            title: 'One setup for eight people',
            text: 'Everyone on the team needs the same ROS, Gazebo and MuJoCo setup on their own machine. One provisioning script builds it in WSL, Docker, a VM or on bare metal, working out where it’s running and adjusting, with setup docs for each path.',
          },
        ],
      },
      {
        title: 'Where it stands',
        text: 'Both controllers come up active, all 18 joints track their commanded positions, and the lidar and IMU publish through the bridge. Next: fold the real robot’s link geometry into the model and bring a PPO-trained walking gait over from MuJoCo.',
      },
    ],
    gallery: [],
  },
  {
    slug: 'local-llm-inference',
    accent: '#a78bfa',
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
    // Add a 'Results' section once the numbers are final: how many times faster
    // prefill ran per token than decode, TTFT at 50 vs. 4K tokens, and the hardware
    // and llama.cpp version you ran on. Put the throughput and TTFT plots in the gallery.
    caseStudy: [
      {
        title: 'The question',
        text: 'Ask a local model a long question and there’s a pause, then the answer streams out at a steady pace. Those are two different phases with two different bottlenecks. I wanted to measure them instead of taking the explanation on faith, and then show a room of people why it happens.',
      },
      {
        title: 'What’s going on',
        flow: [
          { label: 'Prompt', note: '50 to 4K tokens' },
          { label: 'Prefill', note: 'Whole prompt in one pass' },
          { label: 'First token', note: 'Time to first token' },
          { label: 'Decode', note: 'One token per weight read' },
        ],
        text: [
          'Prefill pushes every prompt token through the model at once. That’s large matrix–matrix math, so the hardware stays busy computing and the cost per token is low.',
          'Decode produces one token at a time, and every token needs a read of all ~1.7 billion weights from memory to do comparatively little math. Speed is capped by how fast memory can feed the processor, not by how fast it can compute, which is what “memory-bandwidth-bound” means.',
        ],
      },
      {
        title: 'Method',
        points: [
          'Ran Qwen3-1.7B, quantized to 8 bits, locally in llama.cpp.',
          'Swept prompt lengths from 50 to about 4,000 tokens.',
          'Recorded prefill throughput, decode throughput and time to first token at each length.',
          'Plotted all three against prompt length to compare the per-token cost of each phase.',
        ],
      },
    ],
    gallery: [],
  },
  {
    slug: 'cubic-builds-storefront',
    accent: '#7c8bff',
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
    caseStudy: [
      {
        title: 'The problem',
        text: 'Every Cubic Builds PC is built to order, so the site couldn’t be a normal shop with a checkout. It had to work for visitors who know exactly which GPU they want and for visitors who only know their budget and what they play, and turn both into a request I can quote.',
      },
      {
        title: 'How it works',
        flow: [
          { label: 'Browse or answer 7 steps', note: 'Catalog or configurator' },
          { label: 'Customize parts', note: 'Live pricing' },
          { label: 'Cart or build brief', note: 'Saved on the device' },
          { label: 'Order request', note: 'Sent to me as JSON' },
          { label: 'Invoice by reply', note: 'No payment on the site' },
        ],
        text: [
          'Each build has a base price and a default part for every component group. Swapping a part changes the price by the difference between the new part and the default, so one catalog file drives every build page, the compare view and the cart.',
          'The configurator asks about use case, budget, resolution, refresh rate, cooling, case size, style and peripherals, and maps the answers onto the catalog’s categories. Forms post JSON to a configurable endpoint such as Formspree or a webhook, and fall back to a pre-filled email if none is set.',
        ],
      },
      {
        title: 'Decisions',
        points: [
          {
            title: 'No accounts and no payments',
            text: 'The cart and compare list live in localStorage, and orders are invoiced by reply. The site stays static and never handles payment details.',
          },
          {
            title: 'Filters you can share',
            text: 'Category, budget and GPU filters live in the URL, so a view like /builds?budget=1000-1600&gpu=nvidia can be bookmarked or sent to a friend.',
          },
          {
            title: 'A path for people who don’t know parts',
            text: 'The 7-step configurator speaks in outcomes (“1440p high refresh”, “quiet, simple, reliable”) instead of part numbers, and saves progress so a visitor can come back later.',
          },
        ],
      },
    ],
    gallery: [],
  },
  {
    slug: 'pc-building-guide',
    accent: '#a3e635',
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
    gallery: [],
  },
]

// The filters on the Projects page, and which `categories` each one includes.
// A project shows under every filter it matches (JetHexa is both).
export const filterGroups = {
  Software: ['Software', 'AI/ML'],
  Hardware: ['Hardware', 'Aerospace', 'Robotics'],
}

export const inFilter = (p, filter) =>
  filter === 'All' || p.categories.some((c) => filterGroups[filter]?.includes(c))

// Order cards so the two featured (wide) cards zig-zag in a 3-column grid:
// [F, s] / [s, F] / [s, s, s]. Any other count still packs with grid-flow-dense.
export function arrange(list) {
  const featured = list.filter((p) => p.featured)
  const rest = list.filter((p) => !p.featured)
  if (featured.length !== 2 || rest.length < 2) return [...featured, ...rest]
  return [featured[0], rest[0], rest[1], featured[1], ...rest.slice(2)]
}
