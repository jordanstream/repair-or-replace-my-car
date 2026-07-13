export type Guide = {
  slug: string;
  title: string;
  description: string;
  directAnswer: string;
  summary: string;
  repairMakesSense: string[];
  replaceMakesSense: string[];
  numbersToCompare: string[];
  safetyFactors: string[];
  example: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "is-a-car-worth-fixing",
    title: "Is a Car Worth Fixing?",
    description: "A practical way to compare a major repair bill with the real cost of replacing your car.",
    directAnswer:
      "A car may be worth fixing when the repair is clearly diagnosed, the vehicle is safe, and the repair path is likely to cost less than replacing the car over the next 12 to 36 months.",
    summary:
      "The question is not only whether the repair costs more than the car is worth. A paid-off car with a large repair can still be less expensive than a replacement once you include taxes, fees, loan interest, insurance changes, and maintenance assumptions. On the other hand, a repair that only solves one problem on an unsafe or unreliable car can turn into a costly delay. Compare total estimated costs, not just the repair invoice.",
    repairMakesSense: [
      "The shop can explain the diagnosis in writing and the repair is likely to solve the main problem.",
      "The car has been maintained, does not have major safety concerns, and has no obvious second expensive repair coming soon.",
      "You can reasonably expect enough usable months after the repair to make the upfront cost worthwhile.",
      "Replacement would require a loan, higher insurance, taxes, registration fees, or other costs that materially change your monthly budget.",
      "You have a practical reason to avoid shopping for a replacement right now, such as work, caregiving, school, or limited local inventory."
    ],
    replaceMakesSense: [
      "The repair estimate is uncertain, the shop cannot explain what it fixes, or the same issue has already returned.",
      "The car has structural rust, flood history, airbag problems, brake or steering concerns, or other safety questions.",
      "Several major systems are aging at the same time, such as engine, transmission, suspension, cooling, and electrical systems.",
      "You would still owe money on a car that may not be reliable after the repair.",
      "A realistic used replacement would give you more dependable transportation at a similar total cost over your comparison period."
    ],
    numbersToCompare: [
      "Written repair quote, diagnostic fees, taxes, and whether the estimate includes related parts and labor.",
      "Expected additional repairs over the next year, even if they are not urgent today.",
      "Current vehicle value, remaining loan balance, and whether you have equity or negative equity.",
      "Replacement down payment, loan payment, interest rate, taxes, fees, registration, and likely insurance change.",
      "Your comparison period: 12 months for a near-term decision, 24 months for a balanced view, or 36 months for a longer ownership comparison."
    ],
    safetyFactors: [
      "Do not let a spreadsheet override brake, steering, airbag, structural, rust, or flood-related concerns.",
      "Ask whether the car is safe to drive before delaying a repair or driving it to another shop.",
      "A reliable repair matters more if the vehicle is essential for commuting, caregiving, school, or medical appointments.",
      "If the repair affects drivability, ask what could happen if it fails again and whether towing risk should be included in your estimate."
    ],
    example: [
      "Suppose your paid-off car needs a $2,400 repair. If the shop is confident, the vehicle is otherwise solid, and you expect two more years of use, repairing may cost much less than buying another car with a loan and taxes.",
      "Now change the assumptions: the same car also needs tires, suspension work, and has intermittent warning lights. If those additional repairs could add another $2,500 within a year, replacing may become more reasonable even if the first repair looks affordable by itself."
    ],
    faqs: [
      {
        question: "Should I fix a car that is paid off?",
        answer:
          "Often it is worth considering because avoiding a new payment is valuable. Still compare the repair, likely follow-up repairs, safety concerns, and replacement costs over the same time period."
      },
      {
        question: "Is the 50% rule enough?",
        answer:
          "No. Comparing repair cost to vehicle value is a useful warning light, but it ignores taxes, fees, financing, insurance, reliability needs, and whether the repair actually buys dependable time."
      },
      {
        question: "What should I do before approving a major repair?",
        answer:
          "Get a written estimate, ask what is included, ask what the repair will not fix, compare replacement costs, and get a second opinion if the diagnosis or price feels unclear."
      }
    ],
    related: ["is-a-3000-dollar-repair-worth-it", "is-a-5000-dollar-repair-worth-it"]
  },
  {
    slug: "is-a-3000-dollar-repair-worth-it",
    title: "Is a $3,000 Repair Worth It?",
    description: "How to think through a $3,000 repair before approving the work.",
    directAnswer:
      "A $3,000 repair can be worth it when the car is otherwise sound, the repair is well explained, and replacing the car would cost more over your chosen comparison period.",
    summary:
      "A $3,000 repair is large enough to pause, but it is not automatically a bad decision. For many households, replacing a car can cost more than $3,000 once a down payment, monthly payment, taxes, fees, insurance changes, and maintenance assumptions are included. The key is whether the repair buys dependable use or merely postpones another expensive decision.",
    repairMakesSense: [
      "The repair addresses a specific, confirmed problem rather than a broad guess.",
      "The car has a strong maintenance history and no major engine, transmission, safety, or structural concerns.",
      "You expect the vehicle to remain useful for at least a year or two after the repair.",
      "Replacement would create a payment or upfront cost that is harder on your budget than the repair.",
      "The repair includes a meaningful parts and labor warranty, and the shop can explain what is covered."
    ],
    replaceMakesSense: [
      "The $3,000 repair is one of several known repairs, not the only major issue.",
      "The vehicle already has warning signs such as repeated overheating, slipping transmission, severe rust, or electrical problems.",
      "The car is worth very little and would still be unreliable after the repair.",
      "You depend on the car daily and another breakdown would create serious work, school, caregiving, or safety problems.",
      "A replacement within your budget would reduce downtime and uncertainty enough to justify the higher upfront cost."
    ],
    numbersToCompare: [
      "The $3,000 estimate plus diagnostic charges, taxes, shop fees, and any related maintenance due soon.",
      "Likely repairs in the next 12 months, including tires, brakes, battery, suspension, fluids, or warning-light issues.",
      "Replacement purchase price, down payment, loan term, APR, taxes, title, registration, and insurance changes.",
      "Monthly fuel and maintenance differences between your current car and the replacement you are considering.",
      "How long you need the repaired car to last before the repair feels worthwhile."
    ],
    safetyFactors: [
      "If the repair involves brakes, steering, suspension, tires, airbags, or structural damage, ask about safe driving first.",
      "If the car is not safe now, do not use the calculator as permission to keep driving it.",
      "A cheaper repair path is not useful if the car remains unpredictable for essential daily transportation.",
      "Ask whether waiting on the repair could create more damage or leave you stranded."
    ],
    example: [
      "A $3,000 suspension and brake repair on a paid-off car with 110,000 miles may be reasonable if the vehicle has no other major issues and replacing it would mean a new loan.",
      "The same $3,000 repair feels different on a high-mileage car with transmission symptoms and a check-engine light. In that case, the repair may not buy enough reliable time to justify the risk."
    ],
    faqs: [
      {
        question: "Should I get a second estimate for a $3,000 repair?",
        answer:
          "Yes, especially if the diagnosis is unclear, the car is drivable, or the shop cannot explain what the repair will and will not solve."
      },
      {
        question: "What if my car is worth less than $3,000?",
        answer:
          "That is a warning sign, not an automatic answer. A low-value car may still be cheaper to keep for a short period, but safety, reliability, and future repairs matter."
      },
      {
        question: "Is it better to use the $3,000 as a down payment?",
        answer:
          "Sometimes. Compare the repair path with the full replacement path, including loan payments, taxes, fees, insurance, maintenance, and the risk of buying another used car."
      }
    ],
    related: ["is-a-car-worth-fixing", "is-a-5000-dollar-repair-worth-it"]
  },
  {
    slug: "is-a-5000-dollar-repair-worth-it",
    title: "Is a $5,000 Repair Worth It?",
    description: "A balanced framework for evaluating a very large repair bill.",
    directAnswer:
      "A $5,000 repair usually needs a strong case: a clear diagnosis, a solid vehicle around the failed part, and replacement costs that are meaningfully higher over time.",
    summary:
      "A $5,000 estimate is not just a repair decision; it is a transportation budget decision. The repair may make sense on a newer or well-maintained car when the failed component is isolated. It becomes harder to justify when the vehicle has multiple aging systems, safety concerns, negative equity, or a repair warranty that leaves you exposed to another large bill.",
    repairMakesSense: [
      "The repair is for one isolated failure and the rest of the car has been inspected recently.",
      "The vehicle has enough value, history, and expected life to make the repair more than a short-term patch.",
      "The repair includes clear warranty terms for both parts and labor.",
      "Replacing the car would require financing, higher insurance, or upfront costs that are materially more expensive.",
      "You have realistic confidence that the car can serve your needs for 24 to 36 months after the repair."
    ],
    replaceMakesSense: [
      "The $5,000 repair is paired with other known issues such as transmission symptoms, engine problems, severe rust, or electrical faults.",
      "The shop cannot confidently diagnose the failure or cannot warranty the work in a way you understand.",
      "You would need to borrow for the repair and still have an unreliable car afterward.",
      "The car has safety concerns that would not be fully resolved by the repair.",
      "A replacement option gives you more predictable transportation at a similar monthly cost."
    ],
    numbersToCompare: [
      "The full repair quote, warranty details, diagnostic fees, rental or rideshare costs during repair, and taxes.",
      "Remaining loan balance and whether the repair increases the chance of being stuck with negative equity.",
      "Replacement purchase price, down payment, monthly payment, loan term, interest, taxes, fees, and insurance change.",
      "Maintenance and repair reserve for the current car even after the $5,000 repair.",
      "What the decision looks like over 12, 24, and 36 months, because large repairs can look different as the time horizon changes."
    ],
    safetyFactors: [
      "Large repairs should trigger a broader inspection, especially on older cars or vehicles with previous collision, rust, or flood concerns.",
      "Ask whether the failed system could affect safe driving if it fails again.",
      "Consider the stress and practical cost of downtime if your household relies on one vehicle.",
      "If the car feels unsafe, get a professional inspection before weighing repair savings against replacement costs."
    ],
    example: [
      "A $5,000 engine-related repair on a seven-year-old car with good service records may be more reasonable than replacing it with an uncertain used car and a new loan.",
      "A $5,000 repair on a 17-year-old car with rust, worn suspension, and electrical issues is different. Even if the repair works, the next major failure may arrive before the repair has paid off."
    ],
    faqs: [
      {
        question: "Is $5,000 too much to put into an old car?",
        answer:
          "It can be too much if the repair does not buy reliable time. Compare the total repair path with realistic replacement costs over the same period."
      },
      {
        question: "Can financing a replacement be cheaper?",
        answer:
          "Sometimes, but include the full cost of replacement: interest, taxes, fees, insurance, maintenance differences, and depreciation risk."
      },
      {
        question: "Should I finance a $5,000 repair?",
        answer:
          "Be careful. Financing a repair can make sense in limited cases, but it adds interest to a car that may still have age-related risk. Compare monthly and total costs first."
      }
    ],
    related: ["is-a-3000-dollar-repair-worth-it", "is-an-engine-replacement-worth-it"]
  },
  {
    slug: "is-a-transmission-replacement-worth-it",
    title: "Is a Transmission Replacement Worth It?",
    description: "Compare a transmission replacement with the cost and risk of replacing the vehicle.",
    directAnswer:
      "A transmission replacement may be worth it when the rest of the vehicle is sound, the repair option and warranty are clear, and replacement would cost significantly more.",
    summary:
      "Transmission work is stressful because the repair is expensive and the symptoms can make the car hard or unsafe to drive. The decision depends on the type of replacement unit, warranty, mileage, overall vehicle condition, and whether other major systems are likely to fail soon. Do not compare only the transmission quote to the car's value; compare the repaired-car path with the full replacement path.",
    repairMakesSense: [
      "The shop has confirmed the transmission problem and ruled out lower-cost causes such as fluid, sensor, or software issues where applicable.",
      "You understand whether the quote uses a used, rebuilt, or remanufactured transmission.",
      "The warranty clearly covers parts, labor, time, mileage, and where warranty work can be performed.",
      "The engine, frame, electrical system, suspension, and interior condition are strong enough to justify keeping the vehicle.",
      "A replacement car would require a loan or upfront cash that is meaningfully more expensive over your comparison period."
    ],
    replaceMakesSense: [
      "The vehicle also has engine, electrical, structural, rust, or safety problems.",
      "The transmission quote uses a high-risk option with limited warranty protection.",
      "The car has very high mileage and several maintenance items are overdue.",
      "You cannot tolerate another drivability failure because the car is essential transportation.",
      "A realistic replacement would give you a more predictable ownership path for a similar total cost."
    ],
    numbersToCompare: [
      "Transmission quote, diagnostic fees, fluid/cooler lines, mounts, software programming, taxes, and any required related repairs.",
      "Warranty length, mileage limit, labor coverage, and whether towing or rental costs are covered.",
      "Expected remaining life of the vehicle outside the transmission.",
      "Replacement purchase costs, financing, taxes, fees, insurance changes, and likely first-year maintenance.",
      "A repair reserve for the current car after the transmission work, because an expensive transmission does not renew the whole vehicle."
    ],
    safetyFactors: [
      "A slipping, delayed, or failing transmission can affect drivability and may leave you stranded.",
      "Ask a qualified professional whether the vehicle is safe to drive before delaying the repair.",
      "If the transmission failure happened suddenly, ask whether other drivetrain parts were damaged.",
      "Consider towing or rental costs if the car cannot be driven safely."
    ],
    example: [
      "A $4,200 remanufactured transmission with a strong warranty may be reasonable for a paid-off SUV that is otherwise well maintained and expensive to replace.",
      "The same repair is harder to defend if the vehicle has severe rust, recurring electrical faults, and overdue suspension work. In that case, the transmission may be only the first major bill."
    ],
    faqs: [
      {
        question: "Should I buy a used transmission?",
        answer:
          "A used transmission can lower upfront cost, but it may carry more uncertainty. Compare mileage, source, warranty, labor coverage, and what happens if it fails."
      },
      {
        question: "What should I ask the repair shop?",
        answer:
          "Ask what failed, what replacement unit is being used, what is covered by warranty, whether labor is covered, and whether related components should be serviced."
      },
      {
        question: "Does a new transmission make the car reliable again?",
        answer:
          "It may solve the transmission problem, but the rest of the vehicle still has its existing age, mileage, maintenance history, and wear."
      }
    ],
    related: ["is-a-5000-dollar-repair-worth-it", "is-an-engine-replacement-worth-it"]
  },
  {
    slug: "is-an-engine-replacement-worth-it",
    title: "Is an Engine Replacement Worth It?",
    description: "A plain-language framework for deciding whether to replace an engine.",
    directAnswer:
      "An engine replacement can be worth it only when the rest of the car is in good condition, the engine option is well documented, and replacement costs are clearly higher.",
    summary:
      "Engine replacement can sound like giving a car a fresh start, but it does not reset the entire vehicle. The transmission, cooling system, suspension, electronics, interior, body, and safety systems still have their original age and wear. Before approving the repair, understand why the engine failed, what kind of engine is being installed, what is covered by warranty, and what other systems might need attention soon.",
    repairMakesSense: [
      "The cause of engine failure is understood and related problems have been addressed.",
      "The car is otherwise solid, with no major transmission, structural, electrical, cooling, or safety concerns.",
      "The replacement engine source is clear: used, rebuilt, or remanufactured, with mileage or build details when available.",
      "Parts and labor warranty terms are understandable and strong enough for the size of the repair.",
      "Replacing the vehicle would cost substantially more over 24 to 36 months."
    ],
    replaceMakesSense: [
      "The engine failed because of a broader issue that may damage the replacement engine too.",
      "The vehicle has additional high-cost repairs pending, such as transmission, hybrid system, rust, or electrical problems.",
      "The repair warranty is short, unclear, or excludes labor in a way that leaves you exposed.",
      "You would need to borrow heavily for the engine and still own an aging vehicle with uncertain reliability.",
      "A replacement vehicle fits your budget and reduces the risk of repeated downtime."
    ],
    numbersToCompare: [
      "Engine replacement quote, diagnostic charges, fluids, belts, hoses, mounts, taxes, and any required cooling or emissions work.",
      "Warranty coverage for the engine, labor, related parts, and failure caused by supporting systems.",
      "Current vehicle value and loan balance before and after the repair.",
      "Replacement vehicle purchase price, financing, taxes, fees, insurance, fuel, and maintenance differences.",
      "The cost of transportation while the car is being repaired, since engine jobs can take time."
    ],
    safetyFactors: [
      "Do not continue driving a vehicle with engine failure symptoms if a qualified professional says it is unsafe or could cause sudden loss of power.",
      "Ask whether the vehicle could stall, overheat, leak fluids, or create a fire or roadway hazard.",
      "Make sure related systems are inspected so the replacement engine is not damaged by the same underlying problem.",
      "Reliability matters more if the vehicle is your only way to get to work, school, caregiving, or medical appointments."
    ],
    example: [
      "A $6,000 engine replacement on a newer, otherwise reliable vehicle may be competitive with buying a replacement, especially if comparable cars are expensive and the warranty is strong.",
      "On an older car with a slipping transmission and worn suspension, the engine quote may only solve one part of the ownership problem. The better comparison is the total likely cost over the next two or three years."
    ],
    faqs: [
      {
        question: "Is replacing an engine like getting a new car?",
        answer:
          "No. It can solve one major problem, but the rest of the vehicle still has its existing age, mileage, condition, and maintenance needs."
      },
      {
        question: "Should I choose a used or remanufactured engine?",
        answer:
          "It depends on price, availability, warranty, and your plans for the car. A cheaper used engine may make sense for short-term use, while a remanufactured option may offer more protection."
      },
      {
        question: "Should I repair the engine before selling the car?",
        answer:
          "Only after comparing repair cost with likely sale value. In some cases selling as-is is more practical than paying for a repair you may not recover."
      }
    ],
    related: ["is-a-5000-dollar-repair-worth-it", "is-a-transmission-replacement-worth-it"]
  },
  {
    slug: "is-a-hybrid-battery-replacement-worth-it",
    title: "Is a Hybrid Battery Replacement Worth It?",
    description: "How to compare hybrid battery replacement cost with keeping or replacing the car.",
    directAnswer:
      "A hybrid battery replacement may be worth it when the vehicle is otherwise reliable, the battery option has a clear warranty, and the repaired car remains cheaper than replacing it.",
    summary:
      "Hybrid battery decisions are different from many repairs because battery options vary widely. New, reconditioned, and used packs can have different costs, expected life, and warranties. The right comparison includes the battery quote, the condition of the rest of the vehicle, realistic fuel savings, replacement costs, and whether the car still fits your household after the repair.",
    repairMakesSense: [
      "A qualified technician has confirmed the battery issue and checked for related hybrid-system problems.",
      "The vehicle is otherwise dependable, safe, and useful for your daily needs.",
      "The battery option, expected life, and warranty are clear enough for the price.",
      "Fuel economy savings remain meaningful compared with your likely replacement vehicle.",
      "Replacement would add financing, taxes, fees, or insurance costs that outweigh the repair path."
    ],
    replaceMakesSense: [
      "The hybrid battery is one of several expensive issues, such as engine, transmission, inverter, brake, or electrical problems.",
      "The battery option has limited warranty coverage or unclear testing standards.",
      "The car has high mileage and other age-related maintenance needs that could arrive soon.",
      "You no longer trust the vehicle for essential transportation after the repair.",
      "A replacement vehicle gives you better reliability, range, safety features, or cargo needs at a reasonable total cost."
    ],
    numbersToCompare: [
      "Battery quote, diagnostic fees, taxes, programming, installation, and whether core charges apply.",
      "New, reconditioned, or used battery warranty terms, including labor coverage and mileage limits.",
      "Expected fuel savings versus the replacement car you would actually buy.",
      "Likely upcoming repairs on the current hybrid outside the battery system.",
      "Replacement purchase price, down payment, loan terms, taxes, fees, insurance, maintenance, and fuel differences."
    ],
    safetyFactors: [
      "Hybrid systems involve high voltage, so diagnosis and repair should be handled by qualified professionals.",
      "Ask whether warning lights indicate the car should not be driven until inspected.",
      "Consider whether a battery failure could leave you stranded or reduce performance unexpectedly.",
      "If the vehicle also has brake, steering, structural, rust, airbag, or flood concerns, get a safety inspection before relying on a cost comparison."
    ],
    example: [
      "A $3,800 hybrid battery replacement can be attractive if the car is paid off, efficient, and otherwise solid. If the warranty is clear and you expect two more years of reliable use, repair may compare well against buying another car.",
      "If the same hybrid also needs suspension work, has warning lights, and the battery option has limited coverage, the replacement path may deserve more weight even if the repair is less expensive upfront."
    ],
    faqs: [
      {
        question: "Are reconditioned hybrid batteries risky?",
        answer:
          "They can cost less, but expected life and warranty coverage vary. Ask what was tested, what was replaced, and what happens if the battery fails again."
      },
      {
        question: "Should fuel savings affect the decision?",
        answer:
          "Yes, but use realistic monthly estimates. Compare your actual driving, fuel prices, and the replacement vehicle you would likely buy."
      },
      {
        question: "Can I keep driving with a hybrid battery warning?",
        answer:
          "Ask a qualified professional. The calculator cannot evaluate whether the vehicle is safe or reliable to drive with warning lights."
      }
    ],
    related: ["is-a-car-worth-fixing", "is-a-3000-dollar-repair-worth-it"]
  }
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
