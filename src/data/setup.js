// The Setup page, in five sections:
//   daily     Daily Drivers: the devices I carry
//   pc        The PC / Homelab: one photo, a PCPartPicker-style parts list,
//             and what the machine does (uses)
//   why       Why This Setup: the reasoning, then the trade-offs
//   whyNot    Why Not: what I deliberately don't self-host, and why
//   software  Software & Architecture: a layer diagram, then software by purpose
//
// `icon` names map to icons in Setup.jsx. Leave any `why` empty to hide it.

export const setup = {
  intro:
    'What I use every day, and the PC I built that’s both my gaming rig and my homelab.',

  daily: [
    {
      kind: 'Laptop',
      icon: 'laptop',
      name: 'Lenovo Yoga 7a 2-in-1',
      spec: '14″ 2K OLED touch · Ryzen AI 7 445 · 24 GB · 512 GB',
      why: 'My machine away from the desk. Moonlight streams my PC to it when I need the RTX 5070.',
    },
    {
      kind: 'Phone',
      icon: 'phone',
      name: 'iPhone 17 Pro Max',
      spec: '512 GB · Deep Blue',
      why: 'Also runs Moonlight, so my PC and homelab are a tap away over Tailscale.',
    },
    {
      kind: 'Audio',
      icon: 'earbuds',
      name: 'AirPods Pro 3',
      spec: '',
      why: '',
    },
  ],

  pc: {
    // Drop a photo at public/setup/pc.jpg (portrait works best) and set it here.
    photo: null,
    // Must be a PUBLIC list link (pcpartpicker.com/list/...). The saved-build
    // link asks visitors to sign in, so the button stays hidden until this is set.
    pcpartpicker: null,
    parts: [
      { kind: 'CPU', icon: 'cpu', name: 'AMD Ryzen 7 3700X', spec: '8 cores · 3.6 GHz' },
      { kind: 'CPU Cooler', icon: 'fan', name: 'Thermalright RK120 SE', spec: 'Dual Tower Cooler' },
      { kind: 'Motherboard', icon: 'board', name: 'ASUS ROG Strix B450-I Gaming', spec: 'Mini-ITX · AM4' },
      { kind: 'Memory', icon: 'memory', name: 'G.Skill Trident Z Royal 16 GB', spec: '2 × 8 GB · DDR4-3200 · CL16' },
      { kind: 'Storage', icon: 'drive', name: 'Crucial P3 Plus 1 TB', spec: 'M.2 2280 NVMe · PCIe 4.0 x4' },
      { kind: 'Storage', icon: 'drive', name: 'Inland Professional 240 GB', spec: '2.5″ SATA SSD' },
      { kind: 'Graphics', icon: 'gpu', name: 'Zotac Gaming GeForce RTX 5070 Twin Edge OC', spec: '12 GB VRAM' },
      { kind: 'Case', icon: 'tower', name: 'NZXT H200', spec: 'Mini-ITX tower' },
      { kind: 'Power Supply', icon: 'plug', name: 'Lian Li EDGE Gold 750 W', spec: '80+ Gold · fully modular' },
      { kind: 'Case Fans', icon: 'fan', name: 'Thermalright TL-C12C-S', spec: '120 mm · 3-pack' },
    ],
    uses: [
      {
        icon: 'gamepad',
        title: 'Gaming',
        text: '1080p at 144 Hz on the RTX 5070, and streamed to my laptop and phone with Sunshine and Moonlight.',
      },
      {
        icon: 'code',
        title: 'Development',
        text: 'WSL2 runs ROS 2 and Gazebo for the JetHexa sim, alongside Docker and local LLMs in Ollama.',
      },
      {
        icon: 'server',
        title: 'Homelab',
        text: 'Docker runs n8n, Jellyfin, Uptime Kuma, Homarr and SnapOtter, reachable anywhere over Tailscale.',
      },
    ],
  },

  // Why This Setup: the reasoning behind the build. DRAFT: written from how
  // the setup is put together; the motives are yours to confirm or rewrite.
  why: {
    intro:
      'I wanted one machine that could game, build and serve, instead of three that each do one thing. Every choice follows from that.',
    reasons: [
      {
        title: 'One machine, three jobs',
        text: 'Instead of a separate gaming PC, server and dev box, one PC does all three. That means one set of parts to buy, power and maintain, and everything I learn about it applies everywhere.',
      },
      {
        title: 'The GPU earns its keep twice',
        text: 'The RTX 5070’s 12 GB of VRAM runs games and local LLMs. The same card that plays at 144 Hz also runs the models I profile for my inference research.',
      },
      {
        title: 'Small, but not compromised',
        text: 'The NZXT H200 is Mini-ITX, so the whole build stays compact on a desk. It still fits a full-size RTX 5070, a dual-tower cooler and a 750 W power supply, so size didn’t cost performance.',
      },
      {
        title: 'A light laptop, a heavy PC',
        text: 'Rather than carry a gaming laptop, I carry a thin 2-in-1 and stream the PC to it with Sunshine and Moonlight. The heavy lifting stays at home; I get it anywhere.',
      },
      {
        title: 'Private by default',
        text: 'Everything is reached over Tailscale’s private network, so none of my services are exposed to the public internet, and I still get to them from anywhere.',
      },
      {
        title: 'Isolated, so nothing breaks the rest',
        text: 'Each homelab service runs in its own Docker container on top of WSL2, so updating one can’t take down another, and I get Linux on a Windows PC without ever dual-booting.',
      },
    ],
    tradeoffs: [
      'Mini-ITX means two RAM slots and one PCIe slot, so there’s less room to expand than on a full-size board.',
      'Games and local LLMs share one GPU, so I don’t run heavy models while gaming.',
      'When the PC restarts, the homelab restarts with it. It’s a homelab, not a data center.',
    ],
  },

  // Why Not: things I deliberately don't self-host, and what I use instead.
  // Add more entries in the same shape.
  whyNot: [
    {
      icon: 'cloud',
      question: 'Why not host my own storage?',
      instead: 'iCloud+ · 2 TB',
      text: [
        'I don’t run a NAS or keep my backups on my own drives. I pay for iCloud+ with 2 TB instead.',
        'Since I have an iPhone, one service backs up my entire digital life, and I don’t have to worry about a drive failing. Apple’s servers are far more reliable than anything I could set up myself. iCloud Drive also works on Windows, so my files are right there on this PC too.',
      ],
    },
  ],

  software: {
    // The diagram, top to bottom. `split` draws boxes side by side.
    layers: [
      { title: 'My laptop & phone', detail: 'Moonlight · browser', note: 'over Tailscale' },
      { title: 'Windows 11 Pro', detail: 'Games · Sunshine · Ollama · VS Code' },
      { title: 'WSL2', detail: 'A real Linux kernel running inside Windows' },
      {
        split: [
          { title: 'Ubuntu', detail: 'ROS 2 · Gazebo (JetHexa)' },
          { title: 'Docker', detail: 'n8n · Jellyfin · Uptime Kuma · Homarr · SnapOtter' },
        ],
      },
      { title: 'Hardware', detail: 'Ryzen 7 3700X · RTX 5070 · 16 GB · 1.24 TB', hardware: true },
    ],
    groups: [
      {
        title: 'System',
        items: [
          { name: 'Windows 11 Pro', why: 'Runs games and everyday apps directly on the hardware.' },
          {
            name: 'WSL2',
            why: 'Runs a real Linux kernel inside Windows, so I get Linux without dual-booting or a separate machine. It hosts the Ubuntu environment for the JetHexa ROS 2 and Gazebo sim, and it’s what Docker runs on.',
          },
        ],
      },
      {
        title: 'Containers & AI',
        items: [
          {
            name: 'Docker',
            why: 'Uses WSL2 as its Linux backend, so Linux containers run on this Windows PC just like on a Linux server. Each homelab service lives in its own container with everything it needs, so it’s easy to update, rebuild or move to another machine.',
          },
          { name: 'Ollama & llama.cpp', why: 'Runs and profiles local LLMs on the RTX 5070 for my inference research.' },
        ],
      },
      {
        title: 'Homelab services',
        note: 'in Docker',
        items: [
          { name: 'n8n', why: 'Workflow automation that connects apps and runs scheduled jobs.' },
          { name: 'Jellyfin', why: 'Media server that streams my library to any device.' },
          { name: 'Uptime Kuma', why: 'Watches every service and tells me when something goes down.' },
          { name: 'Homarr', why: 'One dashboard with every service in one place.' },
          { name: 'SnapOtter', why: 'A self-hosted file-processing toolkit, so files never leave my hardware.' },
        ],
      },
      {
        title: 'Remote access',
        items: [
          { name: 'Tailscale', why: 'A private network linking the PC, laptop and phone, so services are reachable anywhere without exposing them to the internet.' },
          { name: 'Sunshine + Moonlight', why: 'Sunshine streams the PC; Moonlight plays it on my laptop and phone.' },
        ],
      },
    ],
  },

  // Photos of the build: same format as a project's gallery in projects.js.
  gallery: [],
}
