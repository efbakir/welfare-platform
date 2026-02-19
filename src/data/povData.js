const CAREGIVER_BENEFITS = [
  "Backup Care Credits",
  "Meal Delivery Subsidy",
  "Therapy & Stress Support",
  "Hybrid Home-Office Support",
  "Concierge Errands Service",
];

const OPERATOR_BENEFITS = [
  "Transport Pass / Fuel Support",
  "Meal Vouchers Near Workplace",
  "Pharmacy Essentials Credit",
  "Near-work Gym Discount",
  "Micro-rewards Gift Cards",
];

const MANAGER_BENEFITS = [
  "Leadership Coaching Sessions",
  "Learning Stipend",
  "Burnout Recovery Program",
  "Remote Team Circles",
  "Volunteering Day + Donation Match",
];

const RELOCATION_BENEFITS = [
  "Relocation Admin Support",
  "Transport Pass / Fuel Support",
  "Concierge Errands Service",
  "Meal Delivery Subsidy",
  "Learning Stipend",
];

const FALLBACK_BENEFITS = [
  "Learning Stipend",
  "Therapy & Stress Support",
  "Meal Delivery Subsidy",
  "Micro-rewards Gift Cards",
  "Remote Team Circles",
];

export const marketplaceCatalog = [
  {
    id: "b1",
    name: "Backup Care Credits",
    category: "Family",
    points: 180,
    expiry: "2026-12-31",
    eligible: "Subsidy eligible",
    workModes: ["Hybrid", "Remote", "On-site"],
    locations: ["Milan", "Rome", "Remote hub"],
  },
  {
    id: "b2",
    name: "Meal Delivery Subsidy",
    category: "Wellness",
    points: 90,
    expiry: "2026-09-30",
    eligible: "Recommended",
    workModes: ["Hybrid", "Remote", "On-site"],
    locations: ["Milan", "Rome", "Turin", "Remote hub"],
  },
  {
    id: "b3",
    name: "Therapy & Stress Support",
    category: "Wellness",
    points: 110,
    expiry: "2026-11-30",
    eligible: "Subsidy eligible",
    workModes: ["Hybrid", "Remote", "On-site"],
    locations: ["Milan", "Rome", "Remote hub"],
  },
  {
    id: "b4",
    name: "Hybrid Home-Office Support",
    category: "Wellness",
    points: 80,
    expiry: "2026-12-31",
    eligible: "Recommended",
    workModes: ["Hybrid", "Remote"],
    locations: ["Milan", "Rome", "Remote hub"],
  },
  {
    id: "b5",
    name: "Concierge Errands Service",
    category: "Family",
    points: 140,
    expiry: "2026-10-31",
    eligible: "Subsidy eligible",
    workModes: ["Hybrid", "Remote", "On-site"],
    locations: ["Milan", "Rome", "Remote hub"],
  },
  {
    id: "b6",
    name: "Transport Pass / Fuel Support",
    category: "Family",
    points: 100,
    expiry: "2026-12-31",
    eligible: "Recommended",
    workModes: ["On-site", "Hybrid"],
    locations: ["Milan", "Rome", "Turin"],
  },
  {
    id: "b7",
    name: "Meal Vouchers Near Workplace",
    category: "Family",
    points: 70,
    expiry: "2026-08-31",
    eligible: "Subsidy eligible",
    workModes: ["On-site", "Hybrid"],
    locations: ["Milan", "Rome", "Turin"],
  },
  {
    id: "b8",
    name: "Pharmacy Essentials Credit",
    category: "Wellness",
    points: 60,
    expiry: "2026-12-31",
    eligible: "Subsidy eligible",
    workModes: ["On-site", "Hybrid", "Remote"],
    locations: ["Milan", "Rome", "Turin", "Remote hub"],
  },
  {
    id: "b9",
    name: "Near-work Gym Discount",
    category: "Wellness",
    points: 55,
    expiry: "2026-07-31",
    eligible: "Recommended",
    workModes: ["On-site", "Hybrid"],
    locations: ["Milan", "Rome", "Turin"],
  },
  {
    id: "b10",
    name: "Micro-rewards Gift Cards",
    category: "Family",
    points: 45,
    expiry: "2026-06-30",
    eligible: "Subsidy eligible",
    workModes: ["On-site", "Hybrid", "Remote"],
    locations: ["Milan", "Rome", "Turin", "Remote hub"],
  },
  {
    id: "b11",
    name: "Leadership Coaching Sessions",
    category: "Education",
    points: 160,
    expiry: "2026-12-31",
    eligible: "Recommended",
    workModes: ["Remote", "Hybrid", "On-site"],
    locations: ["Remote hub", "Milan", "Rome"],
  },
  {
    id: "b12",
    name: "Learning Stipend",
    category: "Education",
    points: 150,
    expiry: "2026-12-31",
    eligible: "Subsidy eligible",
    workModes: ["Remote", "Hybrid", "On-site"],
    locations: ["Remote hub", "Milan", "Rome", "Turin"],
  },
  {
    id: "b13",
    name: "Burnout Recovery Program",
    category: "Wellness",
    points: 130,
    expiry: "2026-11-30",
    eligible: "Recommended",
    workModes: ["Remote", "Hybrid", "On-site"],
    locations: ["Remote hub", "Milan", "Rome"],
  },
  {
    id: "b14",
    name: "Remote Team Circles",
    category: "Education",
    points: 95,
    expiry: "2026-12-31",
    eligible: "Recommended",
    workModes: ["Remote", "Hybrid"],
    locations: ["Remote hub", "Milan", "Rome"],
  },
  {
    id: "b15",
    name: "Volunteering Day + Donation Match",
    category: "Family",
    points: 85,
    expiry: "2026-12-31",
    eligible: "Subsidy eligible",
    workModes: ["Remote", "Hybrid", "On-site"],
    locations: ["Remote hub", "Milan", "Rome", "Turin"],
  },
  {
    id: "b16",
    name: "Childcare Subsidy",
    category: "Child & Education",
    points: 210,
    expiry: "2026-12-31",
    eligible: "Subsidy eligible",
    workModes: ["Hybrid", "On-site", "Remote"],
    locations: ["Milan", "Rome", "Turin"],
  },
  {
    id: "b17",
    name: "Relocation Admin Support",
    category: "Family",
    points: 120,
    expiry: "2026-10-31",
    eligible: "Recommended",
    workModes: ["Remote", "Hybrid", "On-site"],
    locations: ["Milan", "Rome", "Turin", "Remote hub"],
  },
];

const benefitByName = Object.fromEntries(marketplaceCatalog.map((item) => [item.name, item]));

function toBudgetComfortLevel(value = 50) {
  if (value < 34) return "Low";
  if (value < 67) return "Medium";
  return "High";
}

function toPrivacyLabel(value) {
  if (typeof value === "string") return value;
  if (value > 66) return "High";
  if (value > 33) return "Medium";
  return "Low";
}

function resolveBenefitNames({ lifeEvents = [], roleReality = "ic", workMode = "Hybrid", budgetComfortLevel = "Medium" }) {
  const eventSet = new Set(lifeEvents.filter((event) => event !== "None right now"));

  let pool = [];
  if (eventSet.has("Caregiving") || eventSet.has("Parenthood")) {
    pool = [...CAREGIVER_BENEFITS, "Childcare Subsidy"];
  } else if (eventSet.has("Heavy commute")) {
    pool = [...OPERATOR_BENEFITS];
  } else if (eventSet.has("Burnout risk")) {
    pool = [...MANAGER_BENEFITS];
  } else if (eventSet.has("Relocation")) {
    pool = [...RELOCATION_BENEFITS];
  } else {
    pool = [...FALLBACK_BENEFITS];
  }

  if (roleReality === "manager") {
    pool.unshift("Leadership Coaching Sessions", "Learning Stipend");
  }

  if (workMode === "Remote") {
    pool.unshift("Remote Team Circles");
  }

  if (budgetComfortLevel === "Low") {
    pool.unshift("Micro-rewards Gift Cards", "Transport Pass / Fuel Support", "Meal Vouchers Near Workplace");
  }

  return [...new Set(pool)].filter((name) => benefitByName[name]).slice(0, 5);
}

function buildRecommendationItems({ benefitNames, reason, chipsByBenefit }) {
  return benefitNames.map((name, index) => {
    const benefit = benefitByName[name];
    return {
      id: `rec-${index + 1}`,
      title: name,
      reason,
      points: benefit?.points ?? 100,
      chips: chipsByBenefit[name] ?? [],
      policyFit: benefit?.eligible === "Subsidy eligible" ? "Policy fit: subsidy eligible" : null,
    };
  });
}

function buildCommunityCards(communityPreference, workMode) {
  if (communityPreference === "Solo") {
    return [
      {
        id: "cm-optional",
        title: "Optional groups",
        description: "Community suggestions are minimized based on your preference.",
        spotsLeft: 12,
        why: "Shown only as optional",
      },
    ];
  }

  if (communityPreference === "Small groups") {
    return [
      {
        id: "cm-small-1",
        title: workMode === "Remote" ? "Remote leadership circle" : "Small peer support circle",
        description: "Curated, low-noise group with practical agendas.",
        spotsLeft: 6,
        why: "You selected small groups",
      },
      {
        id: "cm-small-2",
        title: "Join a group discount",
        description: "Value-based group offer with shared savings.",
        spotsLeft: 9,
        why: "Small group + cost efficiency",
      },
    ];
  }

  return [
    {
      id: "cm-open-1",
      title: "Open community challenge",
      description: "Broader social participation with recognition rewards.",
      spotsLeft: 18,
      why: "You selected open community",
    },
    {
      id: "cm-open-2",
      title: "Cross-team benefit exchange",
      description: "Discover what peers use and join quickly.",
      spotsLeft: 11,
      why: "Open feed enabled",
    },
  ];
}

function buildDashboardFeed({ focus, lifeEvents = [], workMode, communityPreference }) {
  const topEvent = lifeEvents[0] || "current context";
  return [
    {
      actor: "System",
      action: "updated your recommendation stack",
      text: `Because you selected ${topEvent} and ${focus}.`,
      time: "42m ago",
    },
    {
      actor: "HR",
      action: "published a relevant support path",
      text: `${workMode}-friendly benefits were prioritized for this cycle.`,
      time: "2h ago",
    },
    {
      actor: communityPreference === "Solo" ? "Optional groups" : "9 colleagues",
      action: communityPreference === "Solo" ? "are minimized for you" : "used similar benefits this week",
      text: communityPreference === "Solo" ? "You can enable more social touchpoints in Profile." : "Social proof is shown because your community setting allows it.",
      time: "1d ago",
    },
  ];
}

function buildHero({ lifeEvents = [], workMode, roleReality, budgetComfortLevel }) {
  const eventSet = new Set(lifeEvents.filter((event) => event !== "None right now"));

  if (eventSet.has("Caregiving") || eventSet.has("Parenthood")) {
    return {
      title: "Make this month easier",
      subtitle: "Time-saving benefits are prioritized so support feels immediate and low-friction.",
    };
  }

  if (eventSet.has("Heavy commute") || budgetComfortLevel === "Low") {
    return {
      title: "Maximize your credits this month",
      subtitle: "Best-value support is surfaced first, optimized for commute and daily essentials.",
    };
  }

  if (eventSet.has("Burnout risk") || (roleReality === "manager" && workMode === "Remote")) {
    return {
      title: "Sustainable pace; grow your impact",
      subtitle: "Quarter-focused support combines growth, recovery, and curated connection.",
    };
  }

  return {
    title: "Your personalized welfare cockpit",
    subtitle: "Recommendations adapt continuously to your profile, context, and constraints.",
  };
}

function buildModuleOrdering({ lifeEvents = [], roleReality, budgetComfortLevel }) {
  const eventSet = new Set(lifeEvents.filter((event) => event !== "None right now"));

  if (eventSet.has("Caregiving") || eventSet.has("Parenthood")) {
    return ["timeSavers", "credits", "supportRequests", "community"];
  }
  if (eventSet.has("Heavy commute") || budgetComfortLevel === "Low") {
    return ["valuePicks", "expiringCredits", "localMoments", "community"];
  }
  if (eventSet.has("Burnout risk") || roleReality === "manager") {
    return ["growthPlan", "teamView", "wellbeing", "community"];
  }
  return ["valuePicks", "credits", "community"];
}

function buildLayoutVariant({ lifeEvents = [], roleReality, budgetComfortLevel }) {
  const eventSet = new Set(lifeEvents.filter((event) => event !== "None right now"));

  if (eventSet.has("Caregiving") || eventSet.has("Parenthood")) return "list-first";
  if (eventSet.has("Heavy commute") || budgetComfortLevel === "Low") return "grid-first";
  if (eventSet.has("Burnout risk") || roleReality === "manager") return "plan-first";
  return "grid-first";
}

function buildDefaultFilters({ workMode, location }) {
  return {
    workMode,
    location,
  };
}

function buildProfile({
  id,
  name,
  avatar,
  role,
  tenure,
  lifeStage,
  workMode,
  roleReality,
  goals,
  focus,
  socialStyle,
  lifeEvents,
  budget,
  monthlyGoal,
  familyEnabled = false,
  familyMembers = [],
  timePressure,
  budgetComfortLevel,
  privacyLevel,
  goalHorizon,
  communityPreference,
  aiConsent,
  location,
  country,
  branchDetail,
}) {
  const reason = `Matched to ${lifeEvents[0] || "your current context"} and ${focus.toLowerCase()} priorities.`;
  const recommendedBenefitNames = resolveBenefitNames({ lifeEvents, roleReality, workMode, budgetComfortLevel });

  const chipsTemplate = [
    workMode,
    lifeEvents[0] || "Context-based",
    timePressure === "High" ? "High workload" : `${timePressure} workload`,
    privacyLevel === "High" ? "High privacy" : `${privacyLevel} privacy`,
  ];

  const recommendationChipsByBenefit = Object.fromEntries(
    recommendedBenefitNames.map((benefitName) => [benefitName, chipsTemplate.slice(0, 3)])
  );

  const recommended = buildRecommendationItems({
    benefitNames: recommendedBenefitNames,
    reason,
    chipsByBenefit: recommendationChipsByBenefit,
  });

  const hero = buildHero({ lifeEvents, workMode, roleReality, budgetComfortLevel });
  const dashboardModules = buildModuleOrdering({ lifeEvents, roleReality, budgetComfortLevel });
  const layoutVariant = buildLayoutVariant({ lifeEvents, roleReality, budgetComfortLevel });

  const communityModule =
    communityPreference === "Solo" ? "collapsed" : communityPreference === "Small groups" ? "minimized" : "expanded";

  const communityCards = buildCommunityCards(communityPreference, workMode);

  const feed = buildDashboardFeed({ focus, lifeEvents, workMode, communityPreference });

  return {
    id,
    name,
    avatar,
    role,
    tenure,
    lifeStage,
    workMode,
    roleReality,
    goals,
    familyEnabled,
    familyMembers,
    budget,
    monthlyGoal,
    location,
    country,
    lifeEvents,
    goalHorizon,
    communityPreference,
    aiConsent,
    branchDetail,
    constraints: {
      timePressure,
      budgetComfort: budgetComfortLevel,
      privacyLevel,
    },
    hero,
    layoutVariant,
    dashboardModules,
    communityModule,
    defaultFilters: buildDefaultFilters({ workMode, location }),
    recommendationChipsByBenefit,
    profileAnswers: {
      lifeStage,
      workMode,
      focus,
      socialStyle,
    },
    recommended,
    dashboard: {
      feed,
      trending: [
        { label: "Personalized benefits activated", value: 21, spots: 8 },
        { label: "Credits used by similar peers", value: 14, spots: 5 },
      ],
      together: communityCards,
    },
    marketplace: {
      featured: recommendedBenefitNames.slice(0, 4),
      quickNote: "Recommendations based on your profile + work mode + constraints",
    },
    requestsEmphasis: {
      title:
        id === "caregiver"
          ? "Support requests"
          : id === "operator"
            ? "Costed value proposals"
            : "Learning budget approvals",
      copy:
        id === "caregiver"
          ? "Prioritize practical care bundles with fast review timelines."
          : id === "operator"
            ? "Frame requests with savings impact and on-site utility."
            : "Bundle growth requests with quarter outcomes for faster alignment.",
    },
    walletCallout:
      id === "caregiver"
        ? "Reduce friction first: allocate credits to time-saving support."
        : id === "operator"
          ? "Value-first mode: prioritize essentials before discretionary spend."
          : "Quarter planning mode: pace credits across growth and recovery.",
    ai: {
      starter:
        id === "caregiver"
          ? `Hi ${name}, I can help you reduce weekly admin load with faster support options.`
          : id === "operator"
            ? `Hi ${name}, I can optimize your credits for near-work and cost-saving benefits.`
            : `Hi ${name}, I can build a quarter plan balancing leadership growth and burnout prevention.`,
      prompts:
        id === "caregiver"
          ? [
              "Show me the fastest time-saving benefits",
              "Which care credits expire first?",
              "Minimize social recommendations",
            ]
          : id === "operator"
            ? [
                "What gives the best value this month?",
                "Show commute-friendly benefits near me",
                "How many credits can I save before expiry?",
              ]
            : [
                "Build my quarter growth plan",
                "Compare coaching vs burnout support",
                "Find remote-friendly small group circles",
              ],
    },
  };
}

export function createCustomProfileFromAnswers(answers) {
  const budgetComfortLevel = toBudgetComfortLevel(answers.budgetComfort);
  const lifeEvents = (answers.lifeEvents || []).filter((event) => event && event !== "None right now");

  return buildProfile({
    id: "custom",
    name: answers.preferredName?.trim() || "Custom User",
    avatar: (answers.preferredName || "CU")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "CU",
    role: answers.roleReality === "manager" ? "Manager" : "Individual Contributor",
    tenure: "Custom setup",
    lifeStage: answers.lifeEvents?.includes("Caregiving")
      ? "Caregiver"
      : answers.lifeEvents?.includes("Parenthood")
        ? "Parent"
        : "Employee",
    workMode: answers.workMode,
    roleReality: answers.roleReality,
    goals: [answers.goalHorizon === "This quarter" ? "Quarter outcomes" : "Monthly outcomes", answers.recognitionPreference],
    focus:
      answers.lifeEvents?.includes("Heavy commute") || budgetComfortLevel === "Low"
        ? "Financial support"
        : answers.lifeEvents?.includes("Burnout risk")
          ? "Sustainable growth"
          : answers.lifeEvents?.includes("Caregiving") || answers.lifeEvents?.includes("Parenthood")
            ? "Time savings"
            : "Balanced wellbeing",
    socialStyle: answers.communityPreference,
    lifeEvents: lifeEvents.length > 0 ? lifeEvents : ["None right now"],
    budget: {
      total: 820,
      allocated: Math.round(820 * (answers.goalHorizon === "This quarter" ? 0.44 : 0.58)),
      remaining: 0,
    },
    monthlyGoal: answers.goalHorizon === "This quarter" ? 320 : 460,
    familyEnabled: answers.lifeEvents?.includes("Parenthood") || answers.lifeEvents?.includes("Caregiving"),
    familyMembers:
      answers.lifeEvents?.includes("Parenthood") || answers.lifeEvents?.includes("Caregiving")
        ? [
            { id: "cf1", name: "Dependent A", relation: "Dependent", allocation: 180 },
            { id: "cf2", name: "Dependent B", relation: "Dependent", allocation: 120 },
          ]
        : [],
    timePressure: answers.timePressure,
    budgetComfortLevel,
    privacyLevel: toPrivacyLabel(answers.privacyComfort),
    goalHorizon: answers.goalHorizon,
    communityPreference: answers.communityPreference,
    aiConsent: answers.aiConsent,
    location: answers.locationMode === "Remote hub" ? "Remote hub" : answers.city || "Milan",
    country: answers.country,
    branchDetail: answers.lifeEventFollowUp,
  });
}

const caregiverPreset = buildProfile({
  id: "caregiver",
  name: "Elena Rossi",
  avatar: "ER",
  role: "People Operations Specialist",
  tenure: "6 years",
  lifeStage: "Caregiver",
  workMode: "Hybrid",
  roleReality: "ic",
  goals: ["Time savings", "Wellbeing"],
  focus: "Time savers",
  socialStyle: "Solo",
  lifeEvents: ["Caregiving"],
  budget: { total: 980, allocated: 590, remaining: 390 },
  monthlyGoal: 520,
  familyEnabled: true,
  familyMembers: [
    { id: "fm1", name: "Marta", relation: "Dependent", allocation: 230 },
    { id: "fm2", name: "Luca", relation: "Dependent", allocation: 180 },
  ],
  timePressure: "High",
  budgetComfortLevel: "Medium",
  privacyLevel: "High",
  goalHorizon: "This month",
  communityPreference: "Solo",
  aiConsent: true,
  location: "Milan",
  country: "Italy",
  branchDetail: "Eldercare",
});

const operatorPreset = buildProfile({
  id: "operator",
  name: "Marco Bianchi",
  avatar: "MB",
  role: "Plant Operator",
  tenure: "4 years",
  lifeStage: "Employee",
  workMode: "On-site",
  roleReality: "ic",
  goals: ["Financial support", "Daily essentials"],
  focus: "Best value",
  socialStyle: "Small groups",
  lifeEvents: ["Heavy commute"],
  budget: { total: 720, allocated: 420, remaining: 300 },
  monthlyGoal: 480,
  familyEnabled: false,
  timePressure: "Medium",
  budgetComfortLevel: "Low",
  privacyLevel: "Medium",
  goalHorizon: "This month",
  communityPreference: "Small groups",
  aiConsent: true,
  location: "Turin",
  country: "Italy",
  branchDetail: "Cost",
});

const managerPreset = buildProfile({
  id: "manager",
  name: "Amina El-Sayed",
  avatar: "AE",
  role: "Remote Team Manager",
  tenure: "9 years",
  lifeStage: "Partnered",
  workMode: "Remote",
  roleReality: "manager",
  goals: ["Sustainable growth", "Impact"],
  focus: "Growth plan",
  socialStyle: "Small groups",
  lifeEvents: ["Burnout risk"],
  budget: { total: 1050, allocated: 470, remaining: 580 },
  monthlyGoal: 360,
  familyEnabled: false,
  timePressure: "High",
  budgetComfortLevel: "High",
  privacyLevel: "Medium",
  goalHorizon: "This quarter",
  communityPreference: "Small groups",
  aiConsent: true,
  location: "Remote hub",
  country: "Italy",
  branchDetail: "Manager coaching",
});

for (const preset of [caregiverPreset, operatorPreset, managerPreset]) {
  preset.budget.remaining = Math.max(0, preset.budget.total - preset.budget.allocated);
}

export const povProfiles = {
  caregiver: caregiverPreset,
  operator: operatorPreset,
  manager: managerPreset,
};

export const povOrder = ["caregiver", "operator", "manager"];

export const CUSTOM_PROFILE_ID = "custom";
