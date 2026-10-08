import type { Guide } from "./guides";

const dates = { publishedDate: "2026-09-06", lastReviewedDate: "2026-09-06" };
const repairSource = {
  label: "Federal Trade Commission: Auto Repair Basics",
  url: "https://consumer.ftc.gov/articles/0211-auto-repair-basics",
  note: "Consumer guidance on estimates, replacement parts, diagnostic charges, and written repair warranties."
};
const buyingSource = {
  label: "Federal Trade Commission: Buying a Used Car From a Dealer",
  url: "https://consumer.ftc.gov/articles/buying-used-car-dealer",
  note: "Explains independent inspections, vehicle history reports, and the dealer Buyers Guide."
};
const warrantySource = {
  label: "Federal Trade Commission: Auto Warranties and Auto Service Contracts",
  url: "https://consumer.ftc.gov/articles/auto-warranties-and-auto-service-contracts",
  note: "Questions to ask about coverage, exclusions, authorization, and who handles a claim."
};

export const septemberGuides: Guide[] = [
  {
    ...dates,
    slug: "does-engine-replacement-increase-car-value",
    title: "Does Engine Replacement Increase Car Value?",
    seoTitle: "Does Engine Replacement Increase Car Value?",
    description: "Before replacing an engine to sell your car, compare as-is offers with its likely repaired value. See a worked example and what buyers need to know.",
    targetQuery: "does engine replacement increase car value",
    category: "Sell, trade, or get another opinion",
    directAnswer: "An engine replacement can raise the value of a car with a failed engine, but that does not mean you will recover the repair bill when you sell. Compare what someone will pay for the car today with what they would pay after the work, then subtract the full repair cost.",
    intro: [
      "A $6,000 engine does not automatically add $6,000 to your car's price. A buyer is still getting the same body, transmission, suspension, and mileage on the rest of the vehicle. The repair may make the car usable again without making it worth enough more to pay you back.",
      "There are two different decisions here: fixing the car so you can keep driving it, and fixing it to sell. Years of useful transportation might justify an expense that a quick sale would not. Decide which of those you are trying to accomplish before approving the work."
    ],
    summary: "For a sale, use this calculation: realistic repaired proceeds minus as-is proceeds minus all repair and selling expenses. A positive result is possible, but asking prices alone are weak evidence. Get actual offers wherever you can.",
    sectionLabels: {
      repairMakesSense: "When fixing it before a sale could pay",
      replaceMakesSense: "When an as-is sale deserves a look",
      numbersToCompare: "Build a resale calculation",
      safetyFactors: "What a buyer will want explained",
      example: "A $6,000 engine and a $5,000 increase in value",
      nextSteps: "Get two values before approving one repair"
    },
    repairMakesSense: [
      "A credible repaired-value estimate exceeds the as-is offer by more than the complete installed price, with room for surprises. A narrow margin can disappear if the job uncovers another expense.",
      "You can document the replacement engine's origin, the installation, and any warranty a later owner can actually use. Ask the warranty provider whether coverage transfers before mentioning it in a listing.",
      "You would be willing to keep the car if it takes longer to sell or buyers offer less than expected. That gives the repair a use beyond one optimistic sale price."
    ],
    replaceMakesSense: [
      "The repaired-value estimate comes from the highest advertised car you found online. Compare the same trim, vehicle mileage, condition, and local market; an asking price is not a completed sale.",
      "Other work would still be needed before a buyer would pay the projected price. Add those repairs to the engine bill rather than assuming they will be overlooked.",
      "You need to sell quickly and would have to pay storage, rental, or borrowing costs while waiting. Those expenses belong in the sale calculation too."
    ],
    numbersToCompare: [
      "As-is proceeds: ask more than one buyer for an offer that reflects the known engine failure, pickup arrangements, and any deductions.",
      "Repaired proceeds: ask how the engine replacement would affect the offer. Label an estimate as an estimate if nobody will commit to it.",
      "Repair outlay: include installation, required related work, taxes, transport, and any nonrefundable diagnostic charge. Keep loan payoff separate so you can also see the cash left after selling."
    ],
    safetyFactors: [
      "Ask the installer to document why the original engine failed and what work addresses that cause. A replacement invoice alone does not explain the diagnosis.",
      "Keep the odometer reading and replacement-engine mileage separate in your records and listing. Installing an engine does not reset the mileage of the vehicle.",
      "Expect a careful buyer to request an independent inspection. The FTC recommends one when buying a used car; a repair receipt does not substitute for that inspection."
    ],
    example: [
      "Illustrative figures, not market prices: a nonrunning car has a $2,000 as-is offer. You estimate it could sell for $7,000 after a $6,000 installed engine replacement.",
      "The repair would add an estimated $5,000 in sale proceeds but cost $6,000. Selling after the repair leaves $1,000 before any other expenses; selling as-is brings $2,000. The repair-to-sell route is $1,000 behind.",
      "Keeping the repaired car is a separate calculation. If you need transportation, compare the repair and expected upkeep with a specific replacement car over the same period. Do not use the resale loss alone to decide whether keeping it makes sense."
    ],
    nextStepIntro: "Start with the offer you can get today. Then test whether the repaired price is realistic.",
    nextSteps: [
      "Get as-is offers and a complete installed estimate before spending money to improve the sale price.",
      "Ask about engine documentation and warranty transfer terms in writing.",
      "If keeping the car remains an option, run a repair-versus-replacement comparison using your own quote."
    ],
    faqs: [
      { question: "Is a car with a replaced engine worth more than one with its original engine?", answer: "There is no fixed premium. Buyers may value the documented work, or they may have questions about the failure and installation. Compare similar running cars and seek offers that account for the replacement." },
      { question: "Does a replacement engine reset car mileage?", answer: "No. Record vehicle mileage and replacement-engine mileage separately. The rest of the car has still traveled the distance shown by the vehicle's odometer." },
      { question: "Should I replace the engine before trading in the car?", answer: "Ask the dealer for an as-is offer and an estimated offer after the repair. If the increase is smaller than your complete repair bill, the work would not pay for itself through that trade-in." },
      { question: "What paperwork should I keep?", answer: "Keep the diagnosis, itemized invoice, engine identification and reported mileage, installation date, vehicle mileage at installation, and warranty terms. Do not describe a used engine as new." }
    ],
    related: ["is-engine-replacement-worth-it", "should-i-trade-in-a-car-that-needs-repairs", "should-i-sell-my-car-instead-of-fixing-it"],
    sources: [buyingSource]
  },
  {
    ...dates,
    slug: "used-vs-rebuilt-vs-remanufactured-transmission",
    title: "Used vs. Rebuilt vs. Remanufactured Transmission: Compare the Quotes",
    seoTitle: "Used vs. Rebuilt vs. Remanufactured Transmission",
    description: "Compare used, rebuilt, and remanufactured transmission quotes by installed price, repair scope, labor coverage, and what happens if the unit fails.",
    targetQuery: "used vs rebuilt vs remanufactured transmission",
    category: "Major repair types",
    directAnswer: "Choose between a used, rebuilt, and remanufactured transmission by comparing the specific unit, complete installed price, and written warranty. The label alone does not tell you how much work was done or who pays to remove and reinstall it if something goes wrong.",
    intro: [
      "One shop offers a used transmission. Another wants to rebuild yours. A third quotes a remanufactured unit. The totals can look far apart even before you find out that one quote excludes programming or covers the part without covering replacement labor.",
      "Start with the diagnosis. Ask what evidence supports replacing or rebuilding the transmission and what alternatives the shop considered. Once the required work is clear, compare the options against the same repair scope."
    ],
    summary: "A used unit may reduce today's bill; a documented rebuild or remanufactured unit may offer a different scope of work and coverage. Neither price nor terminology proves reliability. Ask the seller to describe exactly what you are buying.",
    sectionLabels: {
      repairMakesSense: "Questions about a used transmission",
      replaceMakesSense: "Questions about rebuilding or remanufacturing",
      numbersToCompare: "Compare the installed totals",
      safetyFactors: "Read the failure and warranty terms",
      example: "The cheaper part can carry a second labor bill",
      nextSteps: "Ask each shop for the same information"
    },
    repairMakesSense: [
      "What vehicle did the unit come from, what mileage is documented, and how was compatibility checked? Record an unknown history as unknown rather than accepting a guessed mileage.",
      "What inspection or testing was performed? A description such as 'tested' needs an explanation of what the supplier actually checked.",
      "Who supplies the unit, and who handles a claim? Ask whether the installing shop will help if the supplier disputes a failure."
    ],
    replaceMakesSense: [
      "For a rebuild, what is included in the initial price and what depends on teardown? Ask for an approval limit and the cost to stop if the revised estimate is too high.",
      "For a remanufactured unit, ask for the supplier's written process and exact product details. Do not assume every seller uses the same replacement or testing standards.",
      "Ask whether the quote includes any work the installer says is required on connected systems. Have the shop explain the reason for each related item."
    ],
    numbersToCompare: [
      "Put the part or rebuild charge, removal and installation, fluids, required programming, taxes, and transport on one page. Mark included items so you do not count them twice.",
      "Ask about the core charge: money tied to returning the old unit. Confirm when it is refunded and what condition or return deadline the supplier requires.",
      "Price the days without your car. A lower quote that takes longer may still work for you, but only if you can cover transportation during the wait."
    ],
    safetyFactors: [
      "Read time and mileage limits together. Also check deductibles, labor reimbursement limits, claim authorization, and which shop must do warranty work.",
      "Ask who pays diagnostic, removal, reinstallation, shipping, and fluid costs after a covered failure. The FTC cautions that some replacement-parts warranties do not cover installation labor.",
      "Have the shop tell you whether the car can be driven or needs transport. Do not use an online cost comparison to decide whether a slipping or unresponsive transmission is safe."
    ],
    example: [
      "Hypothetical quotes: a used unit costs $2,800 installed, while a remanufactured option costs $4,100 installed. Both include the same related work, so the immediate difference is $1,300.",
      "Suppose the used-unit warranty would supply another part after a covered failure but leave you paying $1,500 in removal and installation. One such event would bring your spending to $4,300, before any transport or other excluded costs.",
      "That is a stress test, not a forecast that the used unit will fail. Ask whether the more expensive option actually covers those expenses. Without that answer, you cannot treat the extra $1,300 as protection against them."
    ],
    nextStepIntro: "A useful quote lets you identify the product, the finished price, and your responsibilities after a failure.",
    nextSteps: ["Request the unit details and written warranty before paying a deposit.", "Get any missing installation items added to each quote.", "Compare the complete repair with keeping or replacing the car, including other known repairs."],
    faqs: [
      { question: "Is remanufactured always better than rebuilt?", answer: "The word alone is not enough. Compare the supplier's documented work, testing, warranty, and installer. Ask for specifics rather than relying on a blanket ranking." },
      { question: "Is a used transmission worth buying?", answer: "It can be an option when the installed price fits your budget and you understand its history and coverage. Check whether you could afford excluded labor if a replacement becomes necessary." },
      { question: "Why is one transmission quote much cheaper?", answer: "The unit, repair scope, installation items, or warranty may differ. Ask both shops for itemized totals before concluding that they are offering the same job." },
      { question: "Should I buy the transmission myself?", answer: "First ask whether the shop installs customer-supplied parts and what it would cover. You may have to resolve a dispute between the seller and installer yourself; get those responsibilities clear before ordering." }
    ],
    related: ["is-transmission-replacement-worth-it", "how-to-compare-auto-repair-estimates", "repair-costs-more-than-car-value"],
    sources: [repairSource]
  },
  {
    ...dates,
    slug: "new-vs-refurbished-hybrid-battery",
    title: "New vs. Refurbished Hybrid Battery: What Are You Paying For?",
    seoTitle: "New vs. Refurbished Hybrid Battery: What to Compare",
    description: "Choosing a new or refurbished hybrid battery? Compare pack details, installed quotes, warranty exclusions, and how long you plan to keep the car.",
    targetQuery: "new vs refurbished hybrid battery",
    category: "Major repair types",
    directAnswer: "Compare a new and refurbished hybrid battery by what is actually being replaced, the installed price, and the written warranty. A cheaper quote may fit a short ownership plan, but you need to know what a repeat visit would cost. Neither a new pack nor a long warranty guarantees the rest of an older car.",
    intro: [
      "This guide concerns the high-voltage traction battery in a hybrid, not its smaller 12-volt battery. Confirm which battery the shop diagnosed before comparing prices. A dashboard warning by itself is not an itemized diagnosis.",
      "The difficult part is often the wording. A quote may say 'new,' 'refurbished,' 'reconditioned,' or simply 'replacement battery.' Have the seller describe the assembly and whether its cells or modules are new or previously used. Keep that description with the estimate."
    ],
    summary: "Buy a documented repair with understandable coverage. Match it to the time you hope to keep the car, and run a shorter ownership scenario too. Nobody can promise a fixed number of extra years from a price quote.",
    sectionLabels: {
      repairMakesSense: "When to consider the higher-priced option",
      replaceMakesSense: "When to consider the lower-priced option",
      numbersToCompare: "Get both quotes onto the same page",
      safetyFactors: "Coverage and diagnosis come first",
      example: "Compare two ownership plans",
      nextSteps: "Get the pack details in writing"
    },
    repairMakesSense: [
      "You expect to keep the car for several years and the rest of it has been inspected for upcoming expenses. A battery purchase should leave room for tires, brakes, and other known work.",
      "The seller documents new cells or modules, the manufacturer, and compatibility with your car. If the description is vague, resolve it before treating the higher price as a quality difference.",
      "The warranty and service arrangements reduce expenses you would otherwise face, such as covered labor. Check the actual terms rather than comparing only the advertised number of years."
    ],
    replaceMakesSense: [
      "You have a shorter ownership plan and the lower installed price matters to your budget. That is a reason to examine the option, not evidence that the battery will last for your planned period.",
      "The provider explains the refurbishment and testing performed on the specific product. Ask what is reused and what is replaced instead of assuming refurbishment means all-new internals.",
      "You can reach a shop that will honor the coverage and can manage the cost and inconvenience of another visit. A distant warranty provider can be difficult to use even when a part is covered."
    ],
    numbersToCompare: [
      "Request the complete installed price, including diagnosis, taxes, travel or mobile-service charges, and any old-pack return deposit or credit.",
      "Write down warranty duration, mileage limits, deductibles, transfer rules, and who covers testing and labor. Ask whether repeat replacements change the original expiration date.",
      "Add known non-battery work to the repair plan. Compare that spending with a specific replacement vehicle rather than a guessed monthly payment."
    ],
    safetyFactors: [
      "Check your VIN and original manufacturer warranty documents before paying. Eligibility depends on the vehicle and governing terms; do not assume an online mileage limit applies to your car.",
      "Ask a technician trained for your hybrid to explain the tests supporting traction-battery replacement and any other faults still needing attention. This article is not a battery diagnosis or a high-voltage repair procedure.",
      "Read claim procedures before authorizing work elsewhere. Service-contract coverage can depend on prior authorization and other conditions, as the FTC explains."
    ],
    example: [
      "For illustration only, suppose the installed quotes are $2,000 for a refurbished pack and $3,600 for a new pack. These are invented comparison figures, not national price estimates.",
      "If you hope to keep the car 24 months, dividing the purchase prices by that period gives $83.33 and $150 per planned month. That $66.67 difference spreads the purchase price across your plan; it does not predict battery life or include future repairs.",
      "Now shorten the plan to 12 months. The same purchases represent $166.67 and $300 per planned month. If another problem could make you sell soon, spending more on the battery has less time to serve you. Check what either option might add to an actual sale offer rather than assuming you will recover the difference."
    ],
    nextStepIntro: "Before deciding, make sure both sellers are pricing the same scope of work and can explain the coverage.",
    nextSteps: ["Confirm the diagnosed battery and check manufacturer coverage.", "Request product details, an installed total, and the complete warranty.", "Compare repair and replacement with both your hoped-for ownership period and a shorter one."],
    faqs: [
      { question: "Is a refurbished hybrid battery the same as a new one?", answer: "Do not assume it is. Ask whether the cells or modules are new or reused and what work the supplier performs. The product description should resolve that before you buy." },
      { question: "How long will a refurbished hybrid battery last?", answer: "A generic article cannot predict the life of the particular pack being offered. Ask for product-specific testing information and coverage, and keep an allowance for downtime or uncovered expenses." },
      { question: "Does a lifetime warranty make the cheaper battery a better deal?", answer: "Read what 'lifetime' means in that contract, who is covered, and which expenses are excluded. Ask what happens if you sell the car, move away, or need another installation." },
      { question: "Will a new hybrid battery make the whole car like new?", answer: "No. The purchase addresses the battery work described in the quote. Budget separately for the engine, transmission, chassis, and other systems based on an inspection and service history." }
    ],
    related: ["is-a-hybrid-battery-replacement-worth-it", "check-recalls-and-warranty-before-car-repair", "is-it-worth-fixing-a-car-with-200000-miles"],
    sources: [warrantySource]
  },
  {
    ...dates,
    slug: "car-diagnostic-fee-vs-repair-estimate",
    title: "Car Diagnostic Fee vs. Repair Estimate: What Should You Pay For?",
    seoTitle: "Car Diagnostic Fee vs. Repair Estimate: What to Ask",
    description: "A free repair estimate and a paid diagnosis may cover different work. Ask these questions about diagnostic fees, authorization, and second opinions.",
    targetQuery: "car diagnostic fee vs repair estimate",
    category: "Sell, trade, or get another opinion",
    directAnswer: "A repair estimate prices proposed work. A diagnostic fee pays for the investigation described by the shop. Before authorizing either, ask what you will receive, what the charge covers, and whether more testing requires your approval. A free estimate does not necessarily include a diagnosis.",
    intro: [
      "You call about a warning light and ask how much the repair will cost. The shop says it needs to charge for diagnosis first. That can be frustrating when you are trying to find out whether the car is worth fixing at all.",
      "The useful question is what the fee buys. Is the shop offering a code read, an inspection, a defined block of testing, or a more involved investigation? Ask for the scope and a spending limit before leaving the keys."
    ],
    summary: "Agree on the diagnostic work, charge, and approval process up front. Ask for the findings and a separate repair estimate afterward. If another shop needs to repeat testing, include that fee and any transport costs in your second-opinion budget.",
    sectionLabels: {
      repairMakesSense: "What to ask before paying a diagnostic fee",
      replaceMakesSense: "When to pause before authorizing more work",
      numbersToCompare: "Separate testing from fixing",
      safetyFactors: "Arrange a useful second opinion",
      example: "Compare final spending, including both diagnostic bills",
      nextSteps: "Use this short phone script"
    },
    repairMakesSense: [
      "Ask: 'What testing does this charge cover, and what written findings will I receive?' You need enough information to understand the recommendation even if you take the car elsewhere.",
      "Ask: 'Is this a fixed charge or an initial block of time?' If more investigation might be needed, agree on when the shop must contact you and what the next stage would cost.",
      "Ask: 'Will any of this fee be credited if I approve the repair?' Get the answer on the estimate. Do not assume every shop applies the same policy."
    ],
    replaceMakesSense: [
      "The next step involves teardown and you do not know the reassembly charge if you decline the repair. Ask what condition the car will be returned in and what you would owe.",
      "The explanation jumps from a warning or symptom directly to an expensive part without describing the supporting findings. Ask the shop to walk through its reasoning.",
      "You are being asked to authorize additional time without an updated limit. Request the price and purpose of the next step before agreeing."
    ],
    numbersToCompare: [
      "List the diagnostic amount already owed, any credit, the proposed repair total, and transport charges separately. Subtract a credit once; do not subtract the same fee again from another quote.",
      "Treat money already spent and nonrefundable as a past expense when comparing what to do next. It belongs in your record of total spending, but it does not make a poor repair worthwhile.",
      "Ask each shop whether its estimate includes taxes and related work. A lower repair line can be outweighed by a second diagnostic bill or towing."
    ],
    safetyFactors: [
      "Before moving the car, ask the current shop whether it can be driven or needs towing. Include that answer in your transport plan.",
      "Give the second shop the symptoms, timing, service history, first estimate, and test results you received. Explain that you want the diagnosis checked, not just the quoted part priced.",
      "Expect that another shop may charge for its own testing. The FTC recommends considering a second opinion for expensive or complicated work and checking diagnostic charges in advance."
    ],
    example: [
      "Illustrative example: Shop A has charged $180 for diagnosis. Its $1,600 repair quote is separate, but it will credit the $180 if you proceed. Your combined diagnostic and repair spending there would be $1,600.",
      "Shop B offers the same repair scope for $1,350, plus $150 for its own diagnosis, with no credit. Add the $180 already paid to Shop A and you reach $1,680. If transport costs another $100, the combined spending is $1,780.",
      "Shop B's repair line is lower, yet the switch would cost $180 more overall. You might still choose a second opinion because the diagnosis is uncertain. Just separate paying for better information from saving money on the identical repair."
    ],
    nextStepIntro: "You can ask these questions without debating the technician's hourly rate.",
    nextSteps: ["'What does the diagnostic charge include, and will I get the findings in writing?'", "'Please contact me before exceeding this amount or starting repairs.'", "'If I decline the repair, what is the complete amount I owe, including reassembly or storage?'"],
    faqs: [
      { question: "Should a car repair estimate be free?", answer: "Ask the shop's policy. Pricing a known job and investigating an unexplained fault involve different work. Confirm any charge before authorizing the appointment." },
      { question: "Is a free code scan the same as a diagnosis?", answer: "A code scan and a paid diagnostic service may have very different scopes. Ask what the scan established and what further tests support the proposed repair; do not assume the code alone settles it." },
      { question: "Do I pay a diagnostic fee if I decline the repair?", answer: "Check the agreement you authorized. Ask about the fee and any repair credit before testing begins, and request an itemized bill if the amount is unclear." },
      { question: "Can I take the diagnostic report to another mechanic?", answer: "Request a copy of the findings to share. The next mechanic may still need to inspect and test the car before accepting responsibility for a repair." }
    ],
    related: ["how-to-compare-auto-repair-estimates", "is-it-worth-getting-a-second-opinion-on-a-car-repair", "is-a-3000-dollar-car-repair-worth-it"],
    sources: [repairSource]
  },
  {
    ...dates,
    slug: "used-car-inspection-before-replacing-your-car",
    title: "Before Replacing Your Old Car, Get the Used Car Inspected",
    seoTitle: "Used Car Inspection Before Replacing Your Old Car",
    description: "Trading a repair bill for a used car? Use an independent pre-purchase inspection to compare immediate repairs, purchase expenses, and the car you already own.",
    targetQuery: "used car inspection before buying",
    category: "Mileage and ownership situation",
    directAnswer: "Before buying a used car to avoid repairing your current one, get an independent pre-purchase inspection and a written purchase total. Add the replacement's immediate repair needs to its price. Otherwise, you are comparing known problems in your car with unknown problems in another one.",
    intro: [
      "A car on a dealer's lot can look like an escape from the repair shop. It starts, the seats are clean, and the payment sounds manageable. But you still need to know what it will need after you bring it home.",
      "An inspection gives you another set of numbers to work with. It cannot promise trouble-free ownership, but it can help you decide whether this particular replacement is worth pursuing. The FTC recommends an independent inspection and says a vehicle history report is not a substitute."
    ],
    summary: "Compare your current car after its proposed repair with the replacement after its purchase and known immediate work. Use the same period, such as 24 months. Keep affordability today separate from spending over that period.",
    sectionLabels: {
      repairMakesSense: "What to request from the inspecting shop",
      replaceMakesSense: "What to request from the seller",
      numbersToCompare: "Put the replacement's repairs in the budget",
      safetyFactors: "Know the inspection's limits",
      example: "An $8,000 replacement is not an $8,000 switch",
      nextSteps: "Choose the car after you have the report"
    },
    repairMakesSense: [
      "Tell the shop you are deciding whether this car is a better option than repairing yours. Ask for a written account of findings, items needing prompt attention, and estimated costs for the work it identifies.",
      "Ask what the inspection includes and what cannot be assessed. Confirm whether the appointment permits a road test, a lift inspection, and checks relevant to the particular model; do not assume every package is identical.",
      "Share the seller's disclosures and available service records. Ask the shop to distinguish observed defects from scheduled maintenance and areas it could not verify."
    ],
    replaceMakesSense: [
      "Get the full purchase total, including taxes, fees, and any products you agreed to buy. Keep the trade-in figure separate so it is clear what the replacement itself costs.",
      "At a dealership, read the Buyers Guide and ask for the written warranty or as-is terms. Have promises documented rather than relying on a conversation about what the dealer will take care of later.",
      "Arrange independent inspection access before committing. If the seller will not allow it, consider whether you have enough evidence to take on the uncertainty, especially when avoiding surprise repairs is your reason for buying."
    ],
    numbersToCompare: [
      "For keeping your car, add the current repair quote and expected upkeep during your comparison period. List transport during the repair and any current loan payments separately.",
      "For a cash replacement, add the purchase price, taxes and fees, inspection, and immediate work, then subtract net proceeds from your old car. A remaining loan can reduce those proceeds.",
      "For a financed replacement, use upfront cash and payments during the comparison period instead of adding the entire purchase price to those payments. Show the remaining loan balance separately; do not count principal twice."
    ],
    safetyFactors: [
      "An inspection is a snapshot with limits. Ask about inaccessible areas or intermittent symptoms and leave room in your budget for things the inspection cannot predict.",
      "Check the VIN for open recalls using NHTSA and read any manufacturer instructions that apply. A recall search complements the inspection; it does not establish overall condition.",
      "If the inspection identifies a safety concern, ask a qualified professional what must happen before the car is driven. A seller's discount does not resolve the defect."
    ],
    example: [
      "Hypothetical cash purchase: repairing your current paid-off car costs $2,400. You allow another $1,200 for upkeep over 24 months, making that repair-and-upkeep budget $3,600.",
      "A replacement is $8,000, plus $700 in taxes and fees, a $200 inspection, and $900 of immediate work identified by the shop. Selling your current car as-is brings $1,500. The initial net outlay is $8,300: $8,000 + $700 + $200 + $900 - $1,500.",
      "Allow $1,000 for additional replacement upkeep, excluding that immediate work, and the replacement budget reaches $9,300. That is $5,700 more cash than the repair plan. This simplified example leaves out equal operating expenses and both cars' ending values; it is not a complete ownership-cost comparison. A real insurance or fuel difference also belongs in your figures."
    ],
    nextStepIntro: "Use a real candidate car and a real inspection. A generic replacement budget is easy to underestimate.",
    nextSteps: ["Arrange an independent inspection and get the seller's complete purchase total.", "Add the report's immediate work to the replacement budget without counting it again as future upkeep.", "Compare both paths using the same period, then decide whether the additional spending fits your needs and available cash."],
    faqs: [
      { question: "Do I need an inspection if the vehicle history report is clean?", answer: "A history report does not replace an independent inspection. Use the report for recorded history and the inspection for the condition the technician can assess now." },
      { question: "Should I inspect a used car that has a warranty?", answer: "An inspection still provides information about condition and upcoming work. Read the warranty separately to understand covered repairs, exclusions, and the steps for a claim." },
      { question: "Can an inspection guarantee that I will avoid repair bills?", answer: "No. It can identify findings within its scope at that time. Ask what was not checked and budget for uncertainty rather than treating the report as a promise." },
      { question: "Should I repair my car if the replacement also needs work?", answer: "Compare the complete figures and the seriousness of both cars' problems. A replacement needing tires is a different proposition from one with an unresolved major fault; the inspection should help you understand that difference." }
    ],
    related: ["should-i-fix-my-old-car-or-buy-another-one", "should-i-repair-a-paid-off-car", "car-needs-multiple-repairs-what-to-fix-first"],
    sources: [buyingSource, { label: "National Highway Traffic Safety Administration: Recalls", url: "https://www.nhtsa.gov/recalls", note: "Official VIN lookup for open safety recalls and instructions about recall information." }]
  }
];
