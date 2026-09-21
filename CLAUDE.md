# Aussie Savers — Project Brief

This file is the authoritative project brief for Aussie Savers. Refer back to
it throughout development. It is the full, original brief as provided by the
project owner — treat it as the source of truth for scope, flow, and design
intent.

---

## PROJECT OVERVIEW

Aussie Savers is an Australian household bill comparison service.

The goal is to help people find cheaper:
- Electricity plans
- Gas plans
- Internet plans

The service is free for the customer.

The customer uploads their current bill, Aussie Savers analyses it, estimates
their yearly usage/cost, compares it against participating providers, and
shows them how much they could save.

If they choose a cheaper provider, they click a button that takes them
through my tracked affiliate/referral link to that provider.

Example:
Current AGL estimated yearly cost: $1,980
GloBird estimated yearly cost: $1,645
Potential saving: $335/year

Button:
"Choose GloBird"

That button opens my GloBird affiliate/referral URL.

## BRAND

Business name:
Aussie Savers

Tagline:
Same bills. A brighter tomorrow.

Colours:
- Dark Australian green
- Gold/yellow
- White
- Very light mint backgrounds

Logo:
Only the words "Aussie Savers" with the tagline underneath.
Do NOT put a kangaroo inside the logo.

Mascot:
Use the SAME male kangaroo mascot across every page.
He should look like a realistic but friendly Australian kangaroo.
Male, slightly scruffy, masculine face, slim face, approachable.
He wears a dark green Aussie Savers shirt.
Do not recreate a different kangaroo on every page.

The kangaroo image asset is provided separately by the project owner.
Reuse the exact same asset throughout the site.

## DESIGN

Mobile-first.

Most customers will use:
- Their phone
- iPad while door knocking

The website should feel:
- Extremely simple
- Trustworthy
- Friendly
- Australian
- Easy for older users
- Not cluttered
- Large buttons
- Large text
- Minimal things competing for attention

Do NOT overload screens with information.

Reference screenshots (provided by owner) are the main visual direction —
improve responsiveness and polish beyond them.

## USER FLOW

There are 3 main steps:

### STEP 1 — YOUR DETAILS

Page heading:
"Let's see how much you could save"

Progress indicator:
1. Your Details
2. Upload Bills
3. Compare & Save

Collect:
- First name
- Last name
- Email
- Mobile number
- Postcode

Ask:
"Which bills would you like us to check?"

Options:
- Electricity
- Gas
- Internet

Consent checkbox:
"I'd like Aussie Savers to compare my bills and contact me about possible
savings."

CTA:
"Continue to Upload Bills"

### STEP 2 — UPLOAD BILL

Heading:
"Upload your energy bill"

Subheading:
"Upload a recent electricity and/or gas bill and we'll find the best deals
for your home."

The customer needs 2 options:

1. TAKE A PHOTO
   - On mobile, open their camera
   - Let them photograph the bill
   - Upload the image

2. UPLOAD FILE
   - PDF
   - JPG
   - PNG
   - File selected from their device

The interface should say their information is private and secure.

After upload, the system should analyse the bill automatically.

### BILL ANALYSIS

Use an AI/vision API to extract structured data from the bill.

For electricity extract as much of this as possible:
- Retailer
- Plan name
- Supply address
- Postcode
- Billing period start
- Billing period end
- Number of billing days
- Month represented by the bill
- Total electricity usage in kWh
- Daily supply charge
- Usage rate in cents/kWh
- Tariff type
- Controlled load usage/rate if present
- Solar export kWh if present
- Feed-in tariff if present
- Distributor/network if shown
- Total bill amount

For gas extract:
- Retailer
- Plan
- Address
- Billing period
- Usage
- MJ rate / applicable usage rates
- Daily supply charge
- Total bill amount

Return extracted data as structured JSON.

The user should not have to manually type all this.

If confidence is low for an extracted field, ask the user to confirm/correct
it before calculating.

### YEARLY USAGE ESTIMATION

A customer may only upload one bill.

Example:
They upload a June bill.

Monthly seasonal usage ratios/multipliers are provided by the project owner.

The calculator needs to identify which month the uploaded bill represents.

Then calculate estimated usage for the other months using the seasonal
ratios.

Example concept only:

June usage = 500 kWh

If July multiplier relative to June = 1.05:
July estimated usage = 525 kWh

If January multiplier relative to June = 0.70:
January estimated usage = 350 kWh

Do this for all 12 months.

Then add the 12 months together to create:

ESTIMATED ANNUAL USAGE

Store the monthly seasonal multipliers in one easy-to-edit config file so
they can be changed without rewriting the calculator.

Have different multiplier datasets available for:
- Electricity
- Gas

Eventually these could vary by state/region, but initially we are targeting
Victoria.

### COST CALCULATOR

For the customer's CURRENT plan:

Calculate estimated yearly cost using:
- Estimated annual usage
- Current usage tariff
- Daily supply charge × 365
- Controlled load if applicable
- Solar feed-in credits if applicable
- Any relevant plan charges/discounts

For each participating alternative provider:

Use the SAME estimated annual usage and calculate what the customer would
have paid on that provider's plan.

Example:

Current:
AGL Value Saver
Estimated annual cost:
$1,980

Alternative:
GloBird Market Offer
Estimated annual cost:
$1,645

Saving:
$335/year

FORMULA:

Saving = Current estimated annual cost − Alternative estimated annual cost

### PROVIDER DATABASE

Create a database/table for participating plans.

Fields should include things such as:
- Provider name
- Plan name
- State
- Postcodes/network/distributor eligibility
- Electricity or gas
- Supply charge
- Usage rate
- Tariff type
- Feed-in tariff
- Discounts
- Fees
- Affiliate URL
- Active/inactive
- Last updated date

Must be very easy to add or change retailer rates.

Initially use example/demo data.

Do NOT hard-code all plan data directly into the UI.

### RESULTS PAGE

Step 3: Compare & Save

Keep this screen VERY simple.

At the top:
"Good news — you could save $335 a year"

Then:
"A cheaper electricity plan is available for your household."

Show basic context:
- Current provider
- Estimated yearly usage
- Network/distributor

Then tabs:
- Electricity
- Gas
- Internet

For each service, only show:

1. CURRENT PLAN — red border/background accents.

Example:
Your current plan
AGL Value Saver
Estimated annual cost: $1,980/year

2. BEST DEAL — green border/background accents.

Example:
Best deal
GloBird Market Offer
Estimated annual cost: $1,645/year
10 min to switch | Save $335 a year

Large yellow button:
"Choose GloBird"

Do NOT show second cheapest options in the initial version.

The contrast between current plan and best deal should be obvious
immediately.

### AFFILIATE LINKS

Each provider plan has an affiliate/referral URL stored in the database.

When the user clicks "Choose GloBird", open the correct tracked affiliate
URL.

Example structure:
provider: GloBird
affiliateUrl: https://example.com/my-globird-affiliate-link

This should be dynamic, not hard-coded into the button.

### INTERNET

Internet comparison is simpler.

Store plans with:
- Provider
- Plan
- Download speed
- Upload speed
- Monthly cost
- Introductory pricing
- Ongoing pricing
- Setup/modem fees if any
- Affiliate URL

Compare the customer's current internet cost against available plans.

For MVP, matching the same or better speed should be prioritised rather than
simply showing a slower plan that costs less.

## TECHNICAL REQUIREMENTS

Build this as a proper standalone web application.

Recommended stack:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase for database/storage
- Vercel for deployment

Architecture should be clean enough that the site can later live at:
compare.aussiesavers.com.au

Bills should be uploaded securely.

Do not expose API keys in frontend code.

Use environment variables.

Create clean reusable components.

Make the project fully responsive for:
- iPhone
- Android
- Portrait iPad
- Desktop

## MVP PRIORITY

Do NOT try to build every advanced energy tariff in Australia immediately.

Initial MVP should support:
- Victorian customers
- Standard single-rate electricity
- Basic solar/feed-in calculations
- Standard residential gas
- Standard residential internet

If the system encounters something it does not support, such as a
complicated time-of-use tariff, show:

"We need to review this bill manually."

Do not silently calculate an inaccurate result.

## DEVELOPMENT ORDER

Build this in stages.

Stage 1: Create the 3 pages visually and navigation between them.
Stage 2: Make contact form state persist between pages.
Stage 3: Make take-photo and upload-file functionality work.
Stage 4: Create demo bill parsing using structured sample data.
Stage 5: Build seasonal annual-usage calculation.
Stage 6: Build provider database and comparison calculator.
Stage 7: Connect real AI bill extraction.
Stage 8: Connect affiliate links.
Stage 9: Security, validation and testing.

## IMPORTANT

Do not redesign the concept into a generic comparison website.

The main experience should remain:

DETAILS → UPLOAD BILL → AI READS BILL → ESTIMATE YEARLY USAGE →
COMPARE PROVIDERS → SHOW CURRENT PLAN VS BEST DEAL → SHOW YEARLY SAVING →
CUSTOMER CLICKS AFFILIATE SWITCH LINK

The core selling point is:

It takes only a few minutes to check and could save households hundreds of
dollars per year.

---

## Assets & Inputs Still Needed From Project Owner

- [ ] Kangaroo mascot image asset (final file, transparent background
      preferred, high-res)
- [ ] 3 reference screenshots (not present in this repo/session — need to be
      supplied as files)
- [ ] Monthly seasonal usage multipliers for electricity (12 months, VIC)
- [ ] Monthly seasonal usage multipliers for gas (12 months, VIC)
- [ ] Initial demo/example provider plan data (electricity, gas, internet)
      including affiliate URLs, or confirmation to use placeholder demo data
- [ ] Confirmation of AI/vision API provider for bill extraction (e.g.
      Claude vision) and API key provisioning approach
- [ ] Supabase project credentials (or confirmation to scaffold locally
      first with env var placeholders)
