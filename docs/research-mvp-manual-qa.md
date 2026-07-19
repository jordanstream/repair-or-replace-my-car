# Research-informed MVP manual QA

## Interaction checks

- At 390 px, entered a valid current-vehicle scenario, advanced to Repair estimate, moved Back, and advanced again. The focused element was the step `h2`, the heading cleared the sticky header, the first field was visible, and the entered year, mileage, make, model, and value persisted.
- At 1280 px, repeated the forward step change. The sticky header ended at 81 px; the focused heading began at 168 px; the first field began at 316 px.
- Submitted the blank first step. The calculator stayed on Step 1, focused the error summary, and exposed a link to the invalid field.
- Completed a limited-confidence quote scenario. Quote-confidence answers changed uncertainty and next-step guidance without changing the financial outcome.
- Opened Results, chose Edit repair assumptions, and verified return to Step 2 with heading focus and the $5,000 repair estimate intact.
- Opened the repair-shop questions disclosure with keyboard-accessible native `details` and `summary` behavior.

## Responsive and accessibility checks

Checked 320, 375, 390, 768, 1024, 1280, and 1440 CSS pixels. No horizontal overflow was present at any width. Radio controls use 44 px containing labels; buttons and form controls are at least 44 px tall. Inline disclaimer links use the WCAG inline-text target-size exception.

Verified:

- Semantic `h1` to `h3` hierarchy and native form controls.
- Programmatically associated field labels and helper text.
- Visible focus and focused step headings.
- Error summary focus and `aria-invalid` on the failing field.
- Progressbar step name and number.
- No input autofocus during step changes.
- `prefers-reduced-motion` uses instant scrolling and disables motion globally.
- Results remain understandable without the chart or color.

## Scenarios covered

- Paid-off vehicle with a moderate repair and no entered additional repairs.
- Large repair estimate without an itemized quote, explained testing, or second confirmation.
- Broader vehicle condition marked Not sure.
- Replacement financing with entered APR, term, down payment, taxes, and fees.
- Close-call and safety outcomes in automated calculator scenarios.
- Negative equity and known additional repair amounts in automated calculation scenarios.

Screen-reader announcement wording and high-contrast mode still merit a final check with the founder's preferred assistive-technology/browser combination before production deployment.
