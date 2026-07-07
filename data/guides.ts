export type Guide = {
  slug: string;
  title: string;
  description: string;
  directAnswer: string;
  factors: string[];
  safety: string;
  example: string;
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "is-a-car-worth-fixing",
    title: "Is a Car Worth Fixing?",
    description: "A practical way to compare a major repair bill with the real cost of replacing your car.",
    directAnswer:
      "A car may be worth fixing when the repair gives you dependable use for long enough that the total repair path costs less than replacing it.",
    factors: [
      "Repair quote compared with the car's current value",
      "Expected usable months after the repair",
      "Other repairs likely in the next year",
      "Your remaining loan balance or equity",
      "Reliability needs for work, caregiving, school, or commuting"
    ],
    safety:
      "Financial math should not override safety. Structural damage, brake or steering issues, flood damage, airbag concerns, or severe rust deserve professional review.",
    example:
      "If a $2,400 repair gives a paid-off car two more years of reliable use, it may cost less than taking on a replacement loan. If the same repair comes with another $2,500 in likely repairs, the comparison can narrow quickly.",
    faqs: [
      {
        question: "Should I fix a car that is paid off?",
        answer:
          "Often it is worth considering because you avoid a new loan payment, but the repair still needs to be compared with likely future repairs and safety concerns."
      },
      {
        question: "Is the 50% rule enough?",
        answer:
          "No. Comparing repair cost to vehicle value is useful, but it should be weighed with reliability, safety, replacement financing, taxes, fees, and your household needs."
      }
    ],
    related: ["is-a-3000-dollar-repair-worth-it", "is-a-transmission-replacement-worth-it"]
  },
  {
    slug: "is-a-3000-dollar-repair-worth-it",
    title: "Is a $3,000 Repair Worth It?",
    description: "How to think through a $3,000 repair before approving the work.",
    directAnswer:
      "A $3,000 repair can be worth it when the car is otherwise sound, safe, and likely to avoid another major repair soon.",
    factors: [
      "Whether the repair solves the main problem or only one symptom",
      "Mileage and maintenance history",
      "The cost of replacing the car after taxes and fees",
      "Insurance and fuel changes if you replace",
      "How disruptive another breakdown would be"
    ],
    safety:
      "Ask whether the issue affects safe driving. If the car is not safe now, do not rely on a cost comparison alone.",
    example:
      "A $3,000 air conditioning or suspension repair on a reliable paid-off car can be reasonable. A $3,000 repair on a high-mileage car with warning lights and transmission symptoms may call for a second opinion.",
    faqs: [
      {
        question: "Should I get a second estimate for a $3,000 repair?",
        answer:
          "Yes, especially if the diagnosis is unclear, the repair is not urgent, or the shop cannot explain what the repair will and will not solve."
      },
      {
        question: "What if the car is worth less than $3,000?",
        answer:
          "That is a warning sign, not an automatic answer. Safety, usable life, loan balance, and replacement costs still matter."
      }
    ],
    related: ["is-a-car-worth-fixing", "is-a-5000-dollar-repair-worth-it"]
  },
  {
    slug: "is-a-5000-dollar-repair-worth-it",
    title: "Is a $5,000 Repair Worth It?",
    description: "A balanced framework for evaluating a very large repair bill.",
    directAnswer:
      "A $5,000 repair needs a strong reason to approve: clear diagnosis, meaningful usable life, and replacement costs that are materially higher.",
    factors: [
      "Repair certainty and warranty coverage",
      "Current value and whether you have positive or negative equity",
      "Expected future repairs",
      "Replacement monthly payment and upfront fees",
      "Reliability needs and tolerance for downtime"
    ],
    safety:
      "Large repair decisions should include a safety review if the car has rust, collision damage, braking issues, or steering concerns.",
    example:
      "A $5,000 engine repair may make sense on a well-maintained vehicle with high replacement costs. It is much harder to justify if a second major system is also failing.",
    faqs: [
      {
        question: "Is $5,000 too much to put into an old car?",
        answer:
          "It may be too much if it does not buy reliable time. The key question is the total cost over the next 12 to 36 months."
      },
      {
        question: "Can financing a replacement be cheaper?",
        answer:
          "Sometimes, but replacement also includes taxes, fees, interest, insurance changes, maintenance differences, and depreciation."
      }
    ],
    related: ["is-an-engine-replacement-worth-it", "is-a-car-worth-fixing"]
  },
  {
    slug: "is-a-transmission-replacement-worth-it",
    title: "Is a Transmission Replacement Worth It?",
    description: "Compare a transmission replacement with the cost and risk of replacing the vehicle.",
    directAnswer:
      "A transmission replacement may be worth it when the rest of the vehicle is sound and the repair has a clear warranty.",
    factors: [
      "Rebuilt, remanufactured, or used transmission details",
      "Warranty length and what labor is covered",
      "Vehicle mileage and maintenance history",
      "Other drivetrain or electrical problems",
      "Replacement car financing and ownership costs"
    ],
    safety:
      "Transmission issues can affect drivability. Ask a qualified professional whether the car is safe to drive before delaying the repair.",
    example:
      "A $4,200 transmission with a strong warranty may be reasonable for a paid-off vehicle. If the same car also has severe rust or recurring electrical faults, replacement may deserve more weight.",
    faqs: [
      {
        question: "Should I buy a used transmission?",
        answer:
          "A used transmission can lower upfront cost but may carry more uncertainty. Compare warranty terms and labor risk carefully."
      },
      {
        question: "What should I ask the shop?",
        answer:
          "Ask what failed, what replacement unit is being used, what is covered by warranty, and whether related components need service."
      }
    ],
    related: ["is-a-5000-dollar-repair-worth-it", "is-an-engine-replacement-worth-it"]
  },
  {
    slug: "is-an-engine-replacement-worth-it",
    title: "Is an Engine Replacement Worth It?",
    description: "A plain-language framework for deciding whether to replace an engine.",
    directAnswer:
      "An engine replacement can be worth it only when the rest of the car is in good condition and the replacement path is well documented.",
    factors: [
      "Cause of engine failure",
      "Used, rebuilt, or remanufactured engine choice",
      "Labor warranty and parts warranty",
      "Cooling, electrical, transmission, and emissions condition",
      "Cost of replacing the car instead"
    ],
    safety:
      "Do not continue driving a vehicle with engine failure symptoms if a mechanic says it is unsafe or could cause sudden loss of power.",
    example:
      "A $6,000 engine replacement on a newer, otherwise reliable vehicle may be competitive with replacement. On an aging car with multiple worn systems, the risk of follow-up costs is higher.",
    faqs: [
      {
        question: "Is replacing an engine like getting a new car?",
        answer:
          "No. It can solve one major problem, but the rest of the vehicle still has its existing age, mileage, and wear."
      },
      {
        question: "Should I repair before selling?",
        answer:
          "That depends on the repair cost, expected sale value, and whether selling as-is is practical. Get written numbers before deciding."
      }
    ],
    related: ["is-a-5000-dollar-repair-worth-it", "is-a-transmission-replacement-worth-it"]
  },
  {
    slug: "is-a-hybrid-battery-replacement-worth-it",
    title: "Is a Hybrid Battery Replacement Worth It?",
    description: "How to compare hybrid battery replacement cost with keeping or replacing the car.",
    directAnswer:
      "A hybrid battery replacement may be worth it when the vehicle is otherwise reliable, efficient, and likely to remain useful after the repair.",
    factors: [
      "New, reconditioned, or used battery option",
      "Warranty terms and diagnostic certainty",
      "Age and mileage of the hybrid system",
      "Fuel savings compared with a replacement vehicle",
      "Other expected repairs"
    ],
    safety:
      "Hybrid systems involve high voltage. Diagnosis and repair should be handled by qualified professionals.",
    example:
      "A $3,800 hybrid battery replacement can be attractive if the car is paid off and otherwise solid. If the car also needs suspension and electrical work, compare the full 24-month cost.",
    faqs: [
      {
        question: "Are reconditioned hybrid batteries risky?",
        answer:
          "They can cost less, but warranty coverage and expected life vary. Ask what is replaced, tested, and covered."
      },
      {
        question: "Should fuel savings affect the decision?",
        answer:
          "Yes, but use realistic monthly estimates rather than assuming perfect savings."
      }
    ],
    related: ["is-a-car-worth-fixing", "is-a-3000-dollar-repair-worth-it"]
  }
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
