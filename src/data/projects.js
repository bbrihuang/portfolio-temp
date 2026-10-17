// Projects. The Projects page sorts them by `start` (year-month; newest first by
// default), while `date` is the text shown on the card. `featured` projects show in
// the Featured section at the top of the page, in `featuredOrder` below. `label` is the category tag on the card (e.g.
// "Software (AI/ML)"); `categories` drive the Software / Hardware filters.
// `accent` is the project's color (cover art, card rule and label).
// `art` picks a geometric cover from ProjectArt.jsx. To use a photo instead,
// put it in public/projects/<slug>/ and set `image: '/projects/<slug>/cover.jpg'`.
// Covers crop to 16:10 on cards and 21:9 on the project page, so keep the subject
// near the middle; landscape and at least 1600px wide works best.
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
    slug: 'bu-dining-meal-planner',
    start: '2026-09',
    accent: '#34d399',
    title: 'BU Dining Meal Planner',
    org: 'Personal project',
    role: 'Full-stack developer',
    date: 'Sep 2026 – Present',
    year: '2026',
    categories: ['Software', 'AI/ML'],
    label: 'Software (AI/ML)',
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
    // Lives at /projects/setup, which is the Setup page rather than a ProjectDetail page.
    slug: 'setup',
    start: '2026-01',
    accent: '#f97316',
    title: 'Setup',
    org: 'Personal project',
    role: 'Builder & admin',
    date: 'Ongoing',
    year: '2026',
    categories: ['Hardware', 'Software'],
    label: 'Hardware · Software',
    featured: true,
    art: 'homelab',
    short: 'My daily drivers, and the gaming PC that doubles as a homelab: self-hosted services, local LLMs and remote access.',
    summary:
      'Everything I use day to day, plus one Mini-ITX PC that games, builds and serves. It runs self-hosted services in Docker on WSL2, local LLMs on the RTX 5070, and streams to my laptop and phone, all reachable from anywhere over Tailscale.',
    highlights: [],
    stack: ['Docker', 'WSL2', 'Tailscale', 'Sunshine', 'Moonlight', 'Ollama', 'n8n', 'Jellyfin', 'Uptime Kuma', 'Homarr'],
    links: [],
    gallery: [],
  },
  {
    slug: 'burpg-nozzle',
    start: '2026-01',
    accent: '#fb923c',
    title: 'BURPG HIP',
    org: 'BU Rocket Propulsion Group · Project HIP',
    role: 'Nozzle Design Engineer',
    date: 'Jan 2026 – May 2026',
    year: '2026',
    categories: ['Hardware', 'Aerospace'],
    label: 'Hardware (Aerospace)',
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
    start: '2026-09',
    accent: '#22d3ee',
    title: 'Project JetHexa',
    org: 'BU AI Society · Robotics Division',
    role: 'Robotics Simulation Developer',
    date: 'Sep 2026 – Present',
    year: '2026',
    categories: ['Robotics', 'Software'],
    label: 'Robotics · Software',
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
    // Details to come.
    slug: 'llm-research',
    status: 'in-progress',
    start: '2026-09',
    accent: '#a78bfa',
    title: 'LLM Research',
    org: 'BU AI Society · Local LLM Division',
    role: 'LLM Inference Researcher',
    date: 'Sep 2026 – Present',
    year: '2026',
    categories: ['Software', 'AI/ML'],
    label: 'Software (AI/ML)',
    art: 'attention',
    short: 'Research on running large language models locally, with BU AI Society’s Local LLM Division.',
    summary:
      'I’m a researcher in BU AI Society’s Local LLM Division, studying how large language models run on local hardware. The full write-up is still being written.',
    highlights: [],
    stack: ['llama.cpp', 'Ollama', 'Python'],
    links: [],
    gallery: [],
  },
  {
    slug: 'cubic-builds-storefront',
    start: '2023-01',
    accent: '#7c8bff',
    title: 'Cubic Builds Storefront',
    org: 'Cubic Builds',
    role: 'Founder & developer',
    date: 'Jan 2023',
    year: '2023',
    categories: ['Software'],
    label: 'Software',
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
    start: '2024-01',
    accent: '#a3e635',
    title: 'How to Build a PC',
    org: 'Published on Notion',
    role: 'Author',
    date: '2024 – Present',
    year: '2024',
    categories: ['Hardware'],
    label: 'Hardware · Guide',
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
  {
    slug: 'temperature-sensor',
    start: '2026-01',
    accent: '#f87171',
    title: 'Room Temperature Monitor',
    org: 'Boston University · EK 131',
    role: 'Designer & builder',
    date: 'Jan 2026 – May 2026',
    year: '2026',
    categories: ['Hardware'],
    label: 'Hardware',
    featured: true,
    art: 'board',
    image: '/projects/temperature-sensor/cover.jpg',
    short: 'An Arduino monitor in a 3D-printed case that shows the room temperature and sounds an alarm outside 60–80°F.',
    summary:
      'A battery-powered monitor that reads the room temperature with a TMP36 sensor, shows it in °F on an LCD, and lights a red LED and sounds a buzzer when the room drops below 60°F or climbs above 80°F. I picked the parts, did the soldering and wiring, wrote the Arduino code, and designed the ABS enclosure in CAD.',
    highlights: [
      'Built an Arduino UNO temperature monitor with a TMP36 sensor, a 16x2 I2C LCD, a red alarm LED, a buzzer and a green power LED.',
      'Programmed COLD, NORMAL and HIGH states in C++ around a 60–80°F safe window, with a light and sound alert outside it.',
      'Designed and 3D-printed a 160.5 × 117 × 57.4 mm ABS enclosure with cutouts for the display, switch, USB, DC jack and LEDs, plus a battery holder.',
      'Measured a 70.3 mA draw, which gives about 7.8 hours on a 550 mAh 9V battery, and chose 22 AWG wire for a roughly 13x current margin.',
    ],
    stack: ['Arduino UNO', 'Arduino IDE', 'C++', 'TMP36', 'I2C LCD', 'Soldering', 'Onshape', 'Ultimaker Cura', '3D printing (ABS)'],
    links: [{ label: 'GitHub', href: 'https://github.com/bbrihuang/temperature-sensor' }],
    caseStudy: [
      {
        title: 'The problem',
        text: 'Skin is a poor thermometer, and a dorm or lab can drift out of a safe range without anyone noticing. I wanted a device that does more than display a number: one that tells you when the room has become unsafe.',
      },
      {
        title: 'How it works',
        flow: [
          { label: 'TMP36 sensor', note: 'Outputs a voltage that rises with temperature. It goes to analog pin A0.' },
          { label: 'Arduino UNO', note: 'Reads the voltage as a number from 0 to 1023 and converts it to °F in code.' },
          { label: 'LCD', note: 'Shows the live temperature on line 1 and COLD, NORMAL or HIGH on line 2.' },
          { label: 'Alarm', note: 'Outside 60–80°F, the red LED turns on and the buzzer sounds. Inside it, both stay off.' },
        ],
        text: 'The Arduino reads the TMP36 on A0, converts the voltage to °F and prints it on the LCD with a status line. Below 60°F the status reads COLD and above 80°F it reads HIGH; either one turns on the red LED and sounds the buzzer. Between 60°F and 80°F it reads NORMAL and the alarm stays off.',
      },
      {
        title: 'Decisions',
        points: [
          {
            title: '22 AWG solid wire instead of jumper wire',
            text: 'It fits the Arduino’s female headers better and carries far more current than the circuit needs. Against the measured 70.3 mA, 22 AWG gives about a 13x margin, where 26 and 28 AWG jumper wire gives about 5x and 3x.',
          },
          {
            title: 'Sizing the LED resistors with KVL',
            text: 'With a 5V supply and an assumed 2V LED drop, a 220 Ω resistor gives the red alarm LED 13.6 mA and a 1000 Ω resistor keeps the green power LED at 3.0 mA.',
          },
          {
            title: 'Three kinds of connection',
            text: 'Twist nut caps bundle the shared 5V and ground wires, spade connectors hold the switch terminals, and direct solder joints carry 5V, data and ground on the pins.',
          },
        ],
      },
      {
        title: 'What went wrong',
        points: [
          {
            title: 'Loose wiring and poor color coding',
            text: 'Wires inside the twist nut caps worked loose, and my color choices made the harness hard to trace. I redid the connections and settled on a fixed code: red for power, black for ground, orange for data and white for the TMP36 output.',
          },
          {
            title: 'Fragile header and malleable sensor pins',
            text: 'The Arduino’s header connections were fragile during wire management, and the TMP36’s pins bent easily. Next time I would solder the sensor pins properly before it goes into the case.',
          },
        ],
      },
      {
        title: 'Results and next steps',
        text: 'The monitor worked as designed and was demonstrated live. A 9V battery lasts about 7.8 hours, so a wall adapter is the better choice for long-term monitoring. A future version would drop the battery for AC power and could drop the LCD for an LED-only display to shrink the enclosure.',
      },
    ],
    gallery: [
      { src: '/projects/temperature-sensor/build-closed.jpg', alt: 'The finished monitor in its black enclosure with the LCD on top', caption: 'The finished monitor' },
      { src: '/projects/temperature-sensor/build-open.jpg', alt: 'The enclosure open with the LCD lid set beside the Arduino and battery', caption: 'Lid off: LCD on the lid, Arduino and 9V battery in the base' },
      { src: '/projects/temperature-sensor/build-wiring.jpg', alt: 'Top-down view of the wiring inside the enclosure', caption: 'Wiring inside the case: twist nut caps, spade connectors and soldered joints' },
      { src: '/projects/temperature-sensor/cad-closed.png', alt: 'CAD model of the closed enclosure with the LCD window on top', caption: 'Enclosure design in CAD' },
      { src: '/projects/temperature-sensor/cad-open.png', alt: 'CAD model with the lid off, showing the Arduino and the 9V battery holder', caption: 'Inside: Arduino UNO and the battery holder' },
      { src: '/projects/temperature-sensor/cad-top.png', alt: 'Top-down CAD view of the Arduino and battery layout', caption: 'Component layout from above' },
      { src: '/projects/temperature-sensor/cad-front.png', alt: 'Front panel with the power switch, green LED, USB port and DC jack', caption: 'Front panel: switch, power LED, USB and DC jack' },
      { src: '/projects/temperature-sensor/cad-side.png', alt: 'Side panel with the buzzer, red alarm LED and sensor opening', caption: 'Side panel: buzzer, alarm LED and sensor' },
    ],
  },
  {
    // Details to come: dates (set `start` so it sorts), what it does, stack and links.
    slug: 'finance-dashboard',
    status: 'in-progress',
    start: null,
    accent: '#4ade80',
    title: 'Finance Dashboard / Paycheck Splitter',
    org: 'Personal project',
    role: 'Developer',
    date: 'In progress',
    year: '',
    categories: ['Software'],
    label: 'Software',
    art: 'sites',
    short: 'A personal finance dashboard with a paycheck splitter.',
    summary: 'A personal finance dashboard with a paycheck splitter. The full write-up is still being written.',
    highlights: [],
    stack: [],
    links: [],
    gallery: [],
  },
]

// The Featured section at the top of the Projects page, in this order.
// Only projects with a finished write-up belong here. LLM Research goes back in once it has one.
export const featuredOrder = ['setup', 'bu-dining-meal-planner', 'temperature-sensor']

// Sort options on the Projects page, kept apart from the filters. Projects with
// no `start` yet go last; ties keep their order in the list above.
const byStart = (dir) => (a, b) => {
  if (a.start === b.start) return 0
  if (!a.start) return 1
  if (!b.start) return -1
  return a.start < b.start ? dir : -dir
}
// Projects marked status: 'in-progress' always come after finished ones.
const finishedFirst = (order) => (a, b) =>
  (a.status === 'in-progress') - (b.status === 'in-progress') || order(a, b)
export const sorts = {
  Newest: finishedFirst(byStart(1)),
  Oldest: finishedFirst(byStart(-1)),
  'A–Z': finishedFirst((a, b) => a.title.localeCompare(b.title)),
}

// The filters on the Projects page, and which `categories` each one includes.
// A project shows under every filter it matches (JetHexa is both).
export const filterGroups = {
  Software: ['Software', 'AI/ML'],
  Hardware: ['Hardware', 'Aerospace', 'Robotics'],
}

export const inFilter = (p, filter) =>
  filter === 'All' || p.categories.some((c) => filterGroups[filter]?.includes(c))

