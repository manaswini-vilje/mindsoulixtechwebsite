export type ServiceId =
  | "web"
  | "app"
  | "cloud"
  | "uiux"
  | "marketing"
  | "ai"
  | "support";

export type ExpandablePanel =
  | "overview"
  | "features"
  | "tech"
  | "visual"
  | "why"
  | "process";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceData {
  id: ServiceId;
  title: string;
  shortDescription: string;
  overview: string;
  image: string;
  features: ServiceFeature[];
  techStack: string[];
  whyChoose: string[];
  processSteps: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: "web",
    title: "Web Development",
    shortDescription: "High-performance scalable web platforms.",
    overview:
      "We design and engineer enterprise-grade web products focused on speed, resilience, and conversion-driven experiences.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    features: [
      {
        title: "Scalable Architecture",
        description:
          "Modular backend systems built to handle traffic spikes and long-term product growth.",
      },
      {
        title: "Responsive UI",
        description:
          "Pixel-precise interfaces optimized for desktop, tablet, and mobile breakpoints.",
      },
      {
        title: "Secure Backend",
        description:
          "Robust authentication, authorization, and encrypted data flows by default.",
      },
      {
        title: "API Integrations",
        description:
          "Reliable integration with payment gateways, CRMs, and third-party services.",
      },
    ],
    techStack: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    whyChoose: [
      "Architecture built for long-term scalability",
      "Performance and SEO from day one",
      "Secure development lifecycle and standards",
      "Enterprise-ready quality control process",
    ],
    processSteps: [
      "Discovery and requirement mapping",
      "Architecture and sprint planning",
      "UI/UX and system design",
      "Agile development and QA",
      "Deployment and performance hardening",
      "Post-launch iteration and support",
    ],
  },
  {
    id: "app",
    title: "App Development",
    shortDescription: "iOS and Android applications.",
    overview:
      "We build polished mobile applications that deliver fast interactions, stable releases, and measurable user engagement.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    features: [
      {
        title: "Native and Cross Platform",
        description:
          "Balanced implementation strategy using native or cross-platform stacks based on product goals.",
      },
      {
        title: "Secure Authentication",
        description:
          "Secure onboarding, login flows, and session management for consumer and enterprise apps.",
      },
      {
        title: "Push Notifications",
        description:
          "Event-driven communication workflows to improve retention and engagement.",
      },
      {
        title: "Offline-Ready UX",
        description:
          "Reliable experiences even with unstable network conditions and intermittent connectivity.",
      },
    ],
    techStack: ["Flutter", "React Native", "Firebase", "Kotlin", "Swift"],
    whyChoose: [
      "Fast release cycles without quality compromise",
      "Consistent UX across iOS and Android",
      "Strong app security and performance optimization",
      "Production-ready analytics and monitoring",
    ],
    processSteps: [
      "Product strategy and success metrics",
      "Journey mapping and UI prototyping",
      "App development and API integration",
      "QA and device compatibility testing",
      "Store submission and rollout",
      "Version upgrades and lifecycle support",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Integration",
    shortDescription: "Scalable cloud infrastructure.",
    overview:
      "We architect cloud ecosystems that improve reliability, optimize cost, and accelerate engineering delivery.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    features: [
      {
        title: "Cloud Foundations",
        description:
          "Production-ready infrastructure setup with security baselines and governance controls.",
      },
      {
        title: "DevOps Pipelines",
        description:
          "Automated CI/CD workflows for faster and safer software delivery.",
      },
      {
        title: "Observability",
        description:
          "Monitoring, logging, and alerting systems for proactive issue detection.",
      },
      {
        title: "Elastic Scaling",
        description:
          "Dynamic scaling strategies to align infrastructure with demand in real time.",
      },
    ],
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    whyChoose: [
      "Improved uptime and platform reliability",
      "Automated deployment and rollback flows",
      "Cloud cost visibility and optimization",
      "Security-first infrastructure principles",
    ],
    processSteps: [
      "Current-state infrastructure audit",
      "Target architecture blueprinting",
      "IaC implementation and migration",
      "CI/CD and observability setup",
      "Load, resilience, and security validation",
      "Operations playbook handover",
    ],
  },
  {
    id: "uiux",
    title: "UI / UX Design",
    shortDescription: "Beautiful digital experiences.",
    overview:
      "We create intuitive, premium interfaces that improve usability, strengthen brand trust, and increase product adoption.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    features: [
      {
        title: "User Research",
        description:
          "Insights from audience behavior, pain points, and task-based analysis.",
      },
      {
        title: "Wireframing",
        description:
          "Information architecture and interaction structure before visual polish.",
      },
      {
        title: "Interactive Prototypes",
        description:
          "Clickable prototypes that validate flow, hierarchy, and usability assumptions.",
      },
      {
        title: "Design Systems",
        description:
          "Tokenized component systems for consistency and faster product scaling.",
      },
    ],
    techStack: ["Figma", "Framer", "Adobe XD", "Notion", "Maze"],
    whyChoose: [
      "User-first product thinking",
      "High-end visual and interaction quality",
      "Design systems that scale with engineering",
      "Data-informed iteration decisions",
    ],
    processSteps: [
      "Discovery and user insight gathering",
      "Information architecture and wireframes",
      "Visual design and component system",
      "Prototype testing and iteration",
      "Developer handoff and QA support",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    shortDescription: "Growth-focused marketing strategies.",
    overview:
      "We execute performance marketing and organic growth programs designed to generate qualified demand and measurable ROI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    features: [
      {
        title: "SEO Strategy",
        description:
          "Technical and content SEO to improve rankings, discoverability, and inbound traffic.",
      },
      {
        title: "Performance Campaigns",
        description:
          "Data-driven paid campaigns with continuous experimentation and optimization.",
      },
      {
        title: "Conversion Analytics",
        description:
          "End-to-end funnel measurement to identify drop-offs and growth opportunities.",
      },
      {
        title: "Content Positioning",
        description:
          "Messaging frameworks that align brand narrative with customer intent.",
      },
    ],
    techStack: ["Google Analytics", "SEMrush", "Google Ads", "Meta Ads", "Hotjar"],
    whyChoose: [
      "Clear KPIs tied to business outcomes",
      "Channel mix optimized for efficiency",
      "Rapid experimentation cadence",
      "Transparent reporting and insights",
    ],
    processSteps: [
      "Market and audience research",
      "Growth strategy and channel planning",
      "Campaign launch and tracking setup",
      "Weekly optimization cycles",
      "Performance reporting and scaling",
    ],
  },
  {
    id: "ai",
    title: "AI & ML Development",
    shortDescription: "AI automation systems.",
    overview:
      "We build AI-powered products and automation pipelines that unlock operational efficiency and predictive intelligence.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    features: [
      {
        title: "Predictive Models",
        description:
          "Machine learning models for forecasting trends, demand, and user behavior.",
      },
      {
        title: "Automation Workflows",
        description:
          "Intelligent pipelines that reduce manual operations and repetitive tasks.",
      },
      {
        title: "Model Integration",
        description:
          "Seamless embedding of AI systems into existing applications and workflows.",
      },
      {
        title: "Evaluation and Guardrails",
        description:
          "Model quality checks, monitoring, and controls for reliable production usage.",
      },
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain"],
    whyChoose: [
      "Practical AI use-cases tied to business goals",
      "Scalable model deployment patterns",
      "High-quality prompt and data workflows",
      "Ongoing model governance and tuning",
    ],
    processSteps: [
      "Use-case discovery and feasibility analysis",
      "Data preparation and baseline modeling",
      "Model training and evaluation",
      "API and product integration",
      "Monitoring, retraining, and optimization",
    ],
  },
  {
    id: "support",
    title: "Software Support",
    shortDescription: "System maintenance and monitoring.",
    overview:
      "We provide continuous support to keep your software stable, secure, and performant across growth phases.",
    image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
    features: [
      {
        title: "Proactive Monitoring",
        description:
          "Real-time health checks and alerts to catch incidents before they escalate.",
      },
      {
        title: "Issue Resolution",
        description:
          "Structured triage and rapid bug fixing across frontend, backend, and infrastructure.",
      },
      {
        title: "Performance Tuning",
        description:
          "Targeted optimization for response times, throughput, and resource usage.",
      },
      {
        title: "Release Support",
        description:
          "Safe deployments, hotfix workflows, and stability assurance for production releases.",
      },
    ],
    techStack: ["DevOps", "Sentry", "Datadog", "Grafana", "Jira"],
    whyChoose: [
      "Reduced downtime and production risk",
      "Faster incident response times",
      "Predictable maintenance workflow",
      "Long-term reliability and peace of mind",
    ],
    processSteps: [
      "Operational audit and support planning",
      "Monitoring and alerting setup",
      "Issue triage and remediation",
      "Performance and reliability tuning",
      "Continuous review and optimization",
    ],
  },
];

export const servicesById: Record<ServiceId, ServiceData> = servicesData.reduce(
  (acc, service) => {
    acc[service.id] = service;
    return acc;
  },
  {} as Record<ServiceId, ServiceData>
);
