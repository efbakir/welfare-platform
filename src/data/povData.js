export const povProfiles = {
  mario: {
    id: "mario",
    name: "Mario Rossi",
    avatar: "MR",
    role: "Junior IC",
    tenure: "1 year",
    lifeStage: "Single",
    workMode: "Hybrid",
    goals: ["Wellbeing", "Learning"],
    familyEnabled: false,
    budget: { total: 450, allocated: 190, remaining: 260 },
    monthlyGoal: 280,
    profileAnswers: {
      lifeStage: "Single",
      workMode: "Hybrid",
      focus: "Learning",
      socialStyle: "Small groups",
    },
    recommended: [
      { id: "r1", title: "Language Classes", reason: "Build skills for your growth path" },
      { id: "r2", title: "Mental Health Support", reason: "Recommended for hybrid routines" },
    ],
    dashboard: {
      feed: [
        { actor: "System", action: "unlocked a recommendation", text: "Because you selected Learning as a priority.", time: "2h ago" },
        { actor: "HR", action: "posted team experience", text: "New career workshop opens Friday.", time: "4h ago" },
        { actor: "12 colleagues", action: "used Learning Credits", text: "This week across engineering.", time: "1d ago" },
      ],
      trending: [
        { label: "Learning classes booked", value: 18, spots: 10 },
        { label: "Wellness sessions used", value: 24, spots: 6 },
      ],
      together: [
        { id: "t1", title: "Career sprint workshop", description: "Peer-led growth planning", spotsLeft: 10, why: "You prefer learning goals" },
        { id: "t2", title: "After-hours climbing", description: "Low-pressure social wellness", spotsLeft: 6, why: "Hybrid teammates nearby" },
      ],
    },
    marketplace: {
      featured: ["Language Classes", "Training Voucher", "Gym Membership"],
      quickNote: "Recommendations based on your profile + work mode",
    },
    ai: {
      starter: "Hi Mario, I can build a learning-first monthly benefit plan.",
      prompts: ["Which courses are best value?", "What expires this month?", "How to balance wellness + learning?"],
    },
  },
  laura: {
    id: "laura",
    name: "Laura Rossi",
    avatar: "LR",
    role: "Mid-level",
    tenure: "5 years",
    lifeStage: "Partnered",
    workMode: "On-site",
    goals: ["Flexibility", "Family planning"],
    familyEnabled: false,
    budget: { total: 700, allocated: 310, remaining: 390 },
    monthlyGoal: 420,
    profileAnswers: {
      lifeStage: "Partnered",
      workMode: "On-site",
      focus: "Flexibility",
      socialStyle: "Team events",
    },
    recommended: [
      { id: "r1", title: "Flexible Transport Pass", reason: "Matches on-site commute" },
      { id: "r2", title: "Family Planning Support", reason: "Based on your selected life context" },
    ],
    dashboard: {
      feed: [
        { actor: "System", action: "unlocked a recommendation", text: "Family planning support now prioritized.", time: "1h ago" },
        { actor: "HR", action: "posted team experience", text: "Wellness day registration opened.", time: "3h ago" },
        { actor: "9 colleagues", action: "used commute benefits", text: "This week in your office location.", time: "1d ago" },
      ],
      trending: [
        { label: "Family planning consultations", value: 11, spots: 7 },
        { label: "Transport passes activated", value: 27, spots: 12 },
      ],
      together: [
        { id: "t1", title: "Team cooking class", description: "Friday social experience", spotsLeft: 7, why: "You prefer team events" },
        { id: "t2", title: "Wellness day", description: "On-site friendly schedule", spotsLeft: 12, why: "Aligned with on-site mode" },
      ],
    },
    marketplace: {
      featured: ["Family Planning Support", "Transport Pass", "Wellness Package"],
      quickNote: "Recommendations based on your profile + work mode",
    },
    ai: {
      starter: "Hi Laura, I can optimize flexible benefits for your on-site schedule.",
      prompts: ["Show best flexibility benefits", "What should I redeem first?", "Compare family planning options"],
    },
  },
  giulia: {
    id: "giulia",
    name: "Giulia Bianchi",
    avatar: "GB",
    role: "Senior IC / Lead",
    tenure: "8 years",
    lifeStage: "Parent",
    workMode: "Hybrid",
    goals: ["Childcare", "Time savings"],
    familyEnabled: true,
    budget: { total: 1100, allocated: 760, remaining: 340 },
    familyMembers: [
      { id: "f1", name: "Marco", relation: "Child", allocation: 280 },
      { id: "f2", name: "Sofia", relation: "Child", allocation: 240 },
      { id: "f3", name: "Partner", relation: "Partner", allocation: 240 },
    ],
    profileAnswers: {
      lifeStage: "Parent",
      workMode: "Hybrid",
      focus: "Childcare",
      socialStyle: "Family activities",
    },
    recommended: [
      { id: "r1", title: "Little Stars Daycare", reason: "High fit for parent + hybrid mode" },
      { id: "r2", title: "After-school Program", reason: "Reduces evening schedule pressure" },
    ],
    dashboard: {
      feed: [
        { actor: "System", action: "unlocked a recommendation", text: "Childcare benefits moved to top priority.", time: "35m ago" },
        { actor: "HR", action: "posted team experience", text: "Family wellness day now open.", time: "2h ago" },
        { actor: "14 colleagues", action: "used daycare subsidy", text: "This week in your location.", time: "1d ago" },
      ],
      trending: [
        { label: "Daycare subsidies redeemed", value: 14, spots: 5 },
        { label: "Family wellness day joins", value: 22, spots: 9 },
      ],
      together: [
        { id: "t1", title: "Family wellness day", description: "Weekend event for kids + parents", spotsLeft: 9, why: "You selected family activities" },
        { id: "t2", title: "Parent support group", description: "Monthly peer exchange", spotsLeft: 5, why: "Relevant for parent life stage" },
      ],
    },
    marketplace: {
      featured: ["Little Stars Daycare", "After-school Program", "Family Wellness Package"],
      quickNote: "Recommendations based on your profile + work mode",
    },
    ai: {
      starter: "Hi Giulia, I can optimize your family allocations and childcare redemptions.",
      prompts: ["Best childcare options now", "How to split budget for family", "Which credits expire first?"],
    },
  },
  ahmed: {
    id: "ahmed",
    name: "Ahmed El-Sayed",
    avatar: "AE",
    role: "Manager",
    tenure: "10 years",
    lifeStage: "Caregiver",
    workMode: "Remote",
    goals: ["Mental health", "Caregiving support"],
    familyEnabled: false,
    budget: { total: 900, allocated: 420, remaining: 480 },
    monthlyGoal: 500,
    profileAnswers: {
      lifeStage: "Caregiver",
      workMode: "Remote",
      focus: "Mental health",
      socialStyle: "Async experiences",
    },
    recommended: [
      { id: "r1", title: "Caregiver Support Sessions", reason: "Directly aligned with caregiving context" },
      { id: "r2", title: "Async Therapy Program", reason: "Optimized for remote/async schedule" },
    ],
    dashboard: {
      feed: [
        { actor: "System", action: "unlocked a recommendation", text: "Caregiver support moved to top priority.", time: "48m ago" },
        { actor: "HR", action: "posted team experience", text: "Async wellbeing challenge started.", time: "2h ago" },
        { actor: "7 colleagues", action: "used mental health credits", text: "This week among remote teams.", time: "1d ago" },
      ],
      trending: [
        { label: "Caregiver sessions booked", value: 9, spots: 4 },
        { label: "Mental health credits used", value: 19, spots: 8 },
      ],
      together: [
        { id: "t1", title: "Async mindfulness cohort", description: "Low-time-commitment wellbeing", spotsLeft: 8, why: "You prefer async experiences" },
        { id: "t2", title: "Caregiver circle", description: "Confidential peer support", spotsLeft: 4, why: "Direct match to caregiver stage" },
      ],
    },
    marketplace: {
      featured: ["Caregiver Support Sessions", "Async Therapy Program", "Remote Wellness Credits"],
      quickNote: "Recommendations based on your profile + work mode",
    },
    ai: {
      starter: "Hi Ahmed, I can suggest low-friction caregiving and mental health benefits.",
      prompts: ["Show async-friendly options", "Compare mental health supports", "Prioritize expiring credits"],
    },
  },
};

export const povOrder = ["mario", "laura", "giulia", "ahmed"];

export const marketplaceCatalog = [
  { id: "b1", name: "Gym Membership", category: "Wellness", points: 50, expiry: "2026-12-31", eligible: "Subsidy eligible" },
  { id: "b2", name: "Mental Health Support", category: "Wellness", points: 80, expiry: "2026-11-30", eligible: "Recommended" },
  { id: "b3", name: "Family Wellness Package", category: "Family", points: 120, expiry: "2026-09-30", eligible: "Subsidy eligible" },
  { id: "b4", name: "Little Stars Daycare", category: "Child & Education", points: 200, expiry: "2026-12-31", eligible: "Subsidy eligible" },
  { id: "b5", name: "After-school Program", category: "Child & Education", points: 140, expiry: "2026-10-31", eligible: "Recommended" },
  { id: "b6", name: "Training Voucher", category: "Education", points: 110, expiry: "2026-08-31", eligible: "Recommended" },
  { id: "b7", name: "Language Classes", category: "Education", points: 90, expiry: "2026-12-31", eligible: "Subsidy eligible" },
  { id: "b8", name: "Caregiver Support Sessions", category: "Family", points: 130, expiry: "2026-12-31", eligible: "Recommended" },
];
