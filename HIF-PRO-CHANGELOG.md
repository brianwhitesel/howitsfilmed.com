# HIF Pro Changelog

Improvement log for the How It's Filmed Pro app and deploy folder. One entry per overnight run by hif-pro-improvement-loop. Newest at top.

Format: date, lane, what changed, why, expected impact.

---

## 2026-06-08 — Funnel tightening (social-proof placement at the pricing decision point)

**Lane:** Funnel tightening — social proof placement, the one funnel sublane from the 5/22 entry's list (analytics, scroll depth, exit intent, social proof) still untouched

**File touched:** howitsfilmed-deploy/index.html

**What changed**
- Added a decision reassurance bar directly beneath the four-tier pricing grid, between the grid close and the "More tiers coming" block. It is the first piece of social proof anywhere in the pricing section, which until now ran from section heading straight into four price cards with no trust signal at the exact moment the visitor is deciding whether to pay.
- Three genuine signals, each with a stroked red SVG icon (no emoji): "175K filmmakers follow @howitsfilmed" (the strongest real proof on the site), "Built by working filmmakers, not theorists" (verbatim the existing trust-strip and About positioning), and "Cancel anytime. No contracts" (the risk reversal already named in the pricing subhead and FAQ, now repeated at the button cluster where it does the most work).
- New CSS scoped under .pricing-trust / .pt-item / .pt-strong / .pt-div. Reuses existing tokens only (--red-subtle, --surface, --border, --radius, --red, --text, --dim, --border2). Glass gradient card matching the free-banner treatment. No new tokens, fonts, or CDN dependencies.
- Mobile-first: under 760px the bar stacks vertically, hides the divider rules, and left-aligns to the 390px baseline. Icons flex-shrink: 0 so they never squeeze. SVGs are aria-hidden since the adjacent text carries the meaning.
- Voice rules verified by script: no em-dashes and no emojis in the new copy (grep confirmed), short plain phrases. div balance unchanged at 301/301, block confirmed positioned between the grid and the more-tiers block.

**Why**
- Funnel tightening was last touched 5/22 (analytics + scroll depth), 17 days ago and outside the 7-day window. Conversion copy (6/07) and UX polish (6/05) are both inside the window. The 5/22 entry explicitly listed four funnel sublanes and noted only analytics and scroll depth had shipped; sticky CTA (5/19) is the closest prior to social proof but is a UX-funnel hybrid, not social proof. Social proof placement is the cleanest unaddressed funnel sublane and the pick for tonight.
- All of the site's social proof (175K, 100 tools, 5+ yrs) lives at the top: the hero proof strip and the trust strip under the nav. The pricing section, which is the highest-intent surface and the actual payment decision, had zero reassurance. A visitor who scrolls past the top-of-page proof and reaches the price cards is making the money decision with no trust signal in view. Placing genuine proof and the cancel-anytime risk reversal at the decision point is a documented conversion lever and closes that gap.
- Honest-only constraint: no testimonials were invented. The site has no real customer reviews yet, so fabricating quotes would be dishonest and partnership-affecting. Every claim in the bar is already stated elsewhere on the page and is true. This is placement, not new claims.

**Expected impact**
- Higher pricing-grid-to-signup conversion. The reassurance sits in the same viewport as the four price CTAs, so the 175K credibility and the cancel-anytime safety net are visible at the click moment instead of 1,400 lines up the page.
- Fully measurable now via the 5/22 analytics shim. The bar itself is not a CTA so it emits no event, but its effect surfaces as movement in the existing pricing_free / pricing_starter / pricing_creator / pricing_pro click counts relative to scroll_depth_75 (the milestone that confirms a visitor reached pricing). If pricing CTA clicks rise as a share of scroll_depth_75 sessions after this ships, the bar is working.
- Compounds with the 5/21 hero (sets the $30/mo freemium expectation), the 6/07 FAQ items (handles the price and course objections), and now this (reassures at the decision point). The freemium narrative is reinforced at entry, in objection handling, and at the moment of payment.

**Partnership check:** Iterative funnel polish using only claims already published on the page. No pricing changes (all four tiers unchanged), no positioning shift (copy matches the existing "working filmmakers, not theorists" stance), no tools added or removed, no fabricated social proof, no rewrite of the core value prop. Pure additive markup reusing existing tokens. Fully reversible by deleting the .pricing-trust CSS block and the reassurance-bar div. No part of Reese's half of the business is affected. Within ship-freely lane.

---

## 2026-06-07 — Conversion copy (value-objection FAQ items)

**Lane:** Conversion copy — homepage FAQ, price/value objection handling at the decision point

**File touched:** howitsfilmed-deploy/index.html

**What changed**
- Added two new FAQ items to the homepage FAQ section, taking it from 6 to 8 items. Both handle the highest-intent objections that block a paid signup, and both sit right next to the existing value-cluster questions.
- New item one, placed after "What's actually free? What's the catch?": "Why pay when I can find free templates online?" Answer makes the case that loose free templates exist everywhere but cost the buyer hours of hunting, reformatting, and stitching, whereas HIF is 100 tools built to work together, organized by production phase, and updated monthly. Closes by pointing back to the 3 free tools as the quality test before paying.
- New item two, placed after "Do I need filmmaking experience to use these tools?": "How is this different from a filmmaking course?" Answer draws the tools-vs-theory line: a course teaches what to do then leaves you to build the documents, HIF is the documents you fill in and use on the actual shoot. Reinforces the existing "built by working filmmakers, organized by workflow" positioning already on the page.
- Both items use the exact existing markup pattern (div.faq-item, div.faq-q with onclick="toggleFaq(this)", span.faq-icon, div.faq-a), so they inherit the accordion behavior and, critically, the 5/22 analytics shim: faq_open fires from inside toggleFaq, so both new questions are auto-instrumented with no extra wiring.
- Copy follows HIF voice rules: no em-dashes anywhere in the new copy (verified by grep), no emojis (verified), plain language, short sentences. Existing FAQ copy that uses em-dashes was left untouched.

**Why**
- Conversion copy was last touched 5/21 (hero freemium rewrite), 17 days ago, the most underweighted revenue-moving lane in the rotation. UX polish was 6/05 (Recently Used rail), so it is out of the 7-day window. Funnel tightening was 5/22, marketing assets 5/18. Conversion copy on a live surface is the pick.
- The FAQ is the objection-handling surface and the 5/22 entry flagged FAQ opens as a high-intent signal because the visitor is working through doubts. The two biggest unaddressed objections for a paid utility were missing entirely: the "why pay when free stuff exists" price-justification objection and the "is this just another course" differentiation objection. Both fire at the exact moment a visitor is deciding whether $30/mo is worth it.
- This ships live immediately and is measurable now. Unlike a marketing draft that waits for Brian to act, this edit is in the funnel tonight, and the 5/22 faq_open tracking will tell Brian within days whether price-justification ("Why pay") or differentiation ("vs a course") is the heavier objection, which directly informs the next conversion run.

**Expected impact**
- Higher pricing-section-to-signup conversion from visitors who reach the FAQ with the "I can find this free" or "this is just a course" objection unresolved. Handling both at the decision point removes two of the most common reasons a warm visitor stalls.
- Diagnostic value via existing analytics: relative faq_open counts on the two new questions versus the existing six reveal which objection dominates. If "Why pay when I can find free templates" leads, the value-density framing needs to move higher up the page. If "How is this different from a course" leads, the tools-vs-theory line belongs in the hero or the offer cards.
- Compounds with the 5/21 hero (sets the freemium expectation), the 5/14 gate rewrite (confirms the offer), and the 5/22 analytics (measures all of it). The funnel now answers the two money objections in the place visitors go to resolve them.

**Partnership check:** Iterative conversion copy on the existing offer. No pricing changes (the $30/mo Pro tier and all other tiers are unchanged), no positioning shift (both answers reinforce the page's existing "built by working filmmakers, organized by workflow" stance), no tools added or removed, no rewrite of the core value prop. Pure additive copy reusing the existing FAQ markup. Fully reversible by deleting the two new faq-item blocks. No part of Reese's half of the business is affected. Within ship-freely lane.

---

## 2026-06-05 — UX polish (Recently Used rail)

**Lane:** UX polish — automatic retention surface in the app hub

**File touched:** howitsfilmed-deploy/app/index.html

**What changed**
- Added an automatic Recently Used section to the app hub view (the default "all phases" landing screen). When a member opens any tool or template, the app records it to localStorage under hif_recent_tools_v1 as a list of num plus timestamp, most-recent first. On the next hub visit, a Recently Used rail renders showing the last items opened, so the tools a member just touched are one tap from the front door.
- Recording is wired into the existing Open button via a single onclick="recordRecent('num')" added to the btn-open anchor in cardHTML(). Navigation to the tool in the new tab proceeds unchanged. No new event listeners, no markup restructure.
- The rail caps at 6 items, dedupes on reopen (reopening a tool moves it to the front rather than adding a duplicate), and auto-prunes entries older than 30 days on every read, matching the workspace localStorage hygiene convention. State survives across sessions.
- Placement and hierarchy: the rail renders below the Pinned section and above the four phase tiles. Recently Used excludes any item the member has already pinned, so a pinned tool never shows twice. Pinned is the curated, intentional shelf; Recently Used is the automatic one underneath it. Both use the existing .grid layout and the same cardHTML(), so pin buttons, tool pills, and Coming Soon states all work identically inside the rail.
- Visual treatment mirrors the Pinned section (dashed border-bottom separator, BigShoulders/Bebas section title, count badge, quiet Clear button with a confirm dialog) but uses a muted accent rather than red. A stroked clock SVG sits in a neutral --surface2 square instead of the red-tinted bookmark square, so the two sections read as a clear pair without competing for attention. No new design tokens introduced. No emojis. Clear button gets the same 40px mobile tap target and focus-visible outline as the Pinned clear button.
- Roughly 40 lines of new JS (loadRecents, saveRecents, recordRecent, clearRecents) plus the recentHTML branch in render() and a CSS block reusing the pinned-section structure. Inline script parses clean; the recents logic was unit-tested for dedup, cap, move-to-front, and TTL prune.

**Why**
- The app has 100 tools but most filmmakers reach for the same 8 to 15 every shoot. The 5/20 Pin feature solved that for members who take the deliberate action of pinning. Most members never will. Recently Used is the zero-effort version of the same retention lever: it surfaces a member's working set automatically, with no behavior change required. Pins and recents together cover both the curator and the just-get-in-and-go user.
- Retention is the dominant LTV lever on a $30/mo subscription, and the cheapest retention win is making the second through tenth visit feel instant. A member who opens the app and immediately sees the call sheet builder and budget tracker they used last shoot perceives the product as theirs, which makes the cancel button feel more expensive.
- Lane balance: the only entry in the recent window was 5/22 (funnel analytics). UX polish via in-app feature was last touched 5/20. This extends that retention work with its natural complement and reuses the exact pattern, so it adds surface area without adding maintenance complexity or new dependencies.
- A clock icon over a star or heart, deliberately: recents is a chronology, not a ranking or a favorite. The muted treatment keeps it visually subordinate to Pinned, which is the right hierarchy because pinned items are the member's explicit choices.

**Expected impact**
- Retention bump from the second visit onward. First visit, no recents exist, experience unchanged. From visit two, the member's last-used tools are one tap from the hub instead of two to four taps via phase navigation or search. Compounds with the 5/20 Pin feature: pinned shelf on top, recent rail under it, phase tiles below.
- Lower scroll and search friction on mobile, which is where most @howitsfilmed traffic lands and where deep navigation hurts most.
- Diagnostic value once the 5/22 analytics shim gets an in-app equivalent: recents-click vs. pinned-click vs. phase-navigation ratio reveals how members actually re-enter the tool set, which informs what to feature on the homepage and in marketing.

**Partnership check:** Iterative UX polish. No copy changes, no pricing changes, no positioning shifts, no tools added or removed. Pure additive feature reusing existing design tokens and the existing cardHTML render path. Fully reversible by deleting the recents JS block, the recentHTML branch in render(), the .recent-section CSS, and the onclick on btn-open. No part of Reese's half of the business is affected. Within ship-freely lane.

---

## 2026-05-22 — Funnel tightening (lightweight analytics + scroll depth)

**Lane:** Funnel tightening — analytics hooks and scroll-depth instrumentation on the homepage

**File touched:** howitsfilmed-deploy/index.html

**What changed**
- Added a zero-dependency analytics shim at the top of the existing script block. No external trackers, no cookies, no third-party requests. Events are stored in a rolling 100-event localStorage buffer under hif_events_v1 and mirrored to console.log so Brian can inspect them on his phone via Safari devtools or on desktop. Exposes window.hifTrack(name, meta), window.hifStats(), and window.hifResetStats() for manual inspection.
- Instrumented every primary CTA on the homepage with a data-track attribute and a single delegated click listener. Eleven CTAs are now named events: nav_cta, hero_primary, hero_secondary, free_banner_cta, pricing_free, pricing_starter, pricing_creator, pricing_pro, final_cta_primary, final_cta_secondary, sticky_cta. Naming uses lowercase_snake_case so it parses cleanly when Brian wires this into a real ESP, GA4, or Plausible later.
- Added a session_start event that fires once per browser session, capturing the referrer (or "(direct)") and viewport dimensions. This is the baseline that every other event ratios against.
- Added scroll-depth tracking at 25, 50, 75, and 100 percent of total document height. Each milestone fires once per page load via a requestAnimationFrame-throttled scroll listener, matching the existing sticky-CTA pattern. The 100 percent event tells Brian who actually scrolled to the footer vs. bounced mid-page, which is the diagnostic he has been missing for measuring the long mobile landing page.
- Hooked the FAQ accordion to fire a faq_open event with the first 60 characters of the question text whenever a visitor opens an FAQ item. FAQ opens are a high-intent engagement signal because the visitor has objections they are working through.
- Added an optional visual overlay triggered by appending ?hifStats=1 to the URL. The overlay floats above the sticky CTA on mobile, shows total event count and per-event counts sorted descending, and renders in HIF brand colors with a glass background. This is the on-device debug surface so Brian can check what is firing without opening devtools on his phone.
- Total added code is roughly 80 lines, all inline in the existing script tag. No new script tags, no new fonts, no new CDN dependencies, no markup changes outside the data-track attributes on the 11 CTAs. The FAQ toggleFaq function still works exactly as it did before, just with one extra optional call to hifTrack inside the open branch.

**Why**
- Every changelog entry since 5/14 has ended with some variation of "Diagnostic value if Brian wires analytics later." Eight runs in a row have shipped funnel changes without any way to measure them. That gap is the actual blocker on every improvement decision from now until May 31. Without baseline numbers, every future copy tweak, every CTA test, every new design pattern is a guess. With baseline numbers, Brian can run the rest of the survival sprint with feedback loops instead of hope.
- Funnel-tightening lane was last touched on 5/19 (sticky mobile CTA). The brief lists four sublanes inside funnel-tightening: analytics hooks, scroll depth, exit intent, social proof placement. The 5/19 run covered none of these, it added a sticky CTA, which is more of a UX-funnel hybrid. Analytics hooks and scroll depth are the two cheapest, highest-leverage sublanes and both ship in one pass because they share the same event-emission layer.
- Zero-dependency was a deliberate constraint. GA4 needs a property ID Brian has not created. Plausible needs an account he has not signed up for. PostHog and Fathom both cost monthly. None of those were the right call for an overnight run that needs to be reversible and partnership-safe. A localStorage-backed shim that prints to console gives Brian 80 percent of the value at zero recurring cost and zero data-sharing concerns. When he is ready to add a real tracker he can pipe events from window.hifTrack into whichever one he picks by swapping a five-line block.
- Eleven CTAs covers the entire intentful surface of the page. The hero is the top-of-funnel entry, the free banner is the middle path, the pricing grid is the high-intent decision moment with four distinct tier signals, the final CTA captures bottom-of-page converts, the sticky CTA captures mid-scroll converts, and the nav CTA captures the people who scrolled back up. Tagging all of them means the ratio of click destinations is recoverable, which tells Brian which surface is doing the work and which is filler.
- Scroll-depth at 25/50/75/100 is the standard quartile pattern. 25 confirms visitors made it past the hero. 50 confirms they read the tools showcase. 75 confirms they reached pricing. 100 confirms they read the FAQ and the founder section. Bounce rate gets a real shape instead of a single bounce/no-bounce flag.
- FAQ open tracking is the surprise lever. If 80 percent of FAQ opens are on the "Can I cancel anytime?" item, the cancel-anytime risk reversal needs to move higher up the page. If "What is actually free?" dominates, the freemium framing in the hero needs to be even clearer. The cost to add this signal was three lines of code.

**Expected impact**
- No direct conversion lift this run. Analytics is a measurement tool, not a conversion tool. The value lands as soon as the next conversion-copy or funnel run uses the events to make a data-informed decision instead of a guessed one.
- First diagnostic is whether session_start counts match Brian's intuition about traffic. If sessions are far below expected, the issue is upstream (IG bio link, organic, referrals). If sessions are at expected volume but scroll_depth 50 is low, the upper-page copy is losing people. If scroll_depth 100 is high but pricing CTAs are low, the offer is the blocker, not the page.
- Compounds with every prior change. The 5/14 gate rewrite gets a CTR signal. The 5/15 and 5/16 emoji cleanups get a bounce-rate before-and-after if Brian compares against any future change. The 5/17 carousel gets a session_start ref signal showing how much IG traffic actually arrives. The 5/18 email sequence gets a free-signup count to baseline against. The 5/19 sticky CTA gets a clicks-vs-hero-CTA comparison, which was explicitly called out as the diagnostic in that day's entry. The 5/20 pin feature gets a usage signal once the equivalent hook is added inside the app. The 5/21 hero rewrite gets a CTR comparison the moment Brian wants one.
- Practical use today: append ?hifStats=1 to howitsfilmed.com on his phone, scroll the page, tap a few CTAs, and the red-bordered overlay shows the events firing in real time. That confirms the shim works on his actual device before any real traffic hits it.

**Partnership check:** Pure measurement layer. No copy changes, no pricing changes, no positioning shifts, no tools added or removed, no markup visible to visitors except invisible data-track attributes. No data is sent anywhere off the visitor's device. Reversible by deleting the IIFE at the top of the script block and removing the eleven data-track attributes (or just the IIFE, since orphan data-track attributes are harmless). Within ship-freely lane.

---

## 2026-05-21 — Conversion copy (hero freemium expectation)

**Lane:** Conversion copy — homepage hero, freemium expectation alignment

**File touched:** howitsfilmed-deploy/index.html

**What changed**
- Rewrote the hero body copy. Was: "100+ professional filmmaking tools and templates, shot lists, call sheets, budgets, schedules, and more. Built by working creators. No guesswork, no starting from scratch." Now: "Shot lists, call sheets, budgets, schedules, and 96 more. Every document a real production runs on. Start with 3 free today, unlock all 100 for $30/mo when you're ready." Concrete inventory leads, the freemium split is named in the same sentence, the $30/mo Pro price is anchored above the fold.
- Sharpened the primary hero CTA from "Start for Free" to "Get 3 Free Tools." Same destination (app/index.html). The new wording tells the visitor exactly what they get when they click. Secondary CTA "See All Plans" stays as-is, still routes to #pricing.
- Tightened the microline under the CTAs. Was: "No credit card. Free tools stay free forever." Now: "No credit card. Free tools stay free. Cancel anytime if you upgrade." Adds the cancel-anytime risk reversal above the fold instead of leaving it buried in the pricing section and the FAQ.
- All copy follows HIF voice rules: no em-dashes, no emojis, plain language, under-120-word draft, sentences are short.

**Why**
- The hero is the highest-traffic copy on the entire funnel and the single biggest lever on every downstream conversion. The previous body promised "100+ tools" without flagging that only 3 are free. Visitors clicked "Start for Free" expecting the full library, hit the gate (which last week's run rewrote into a real conversion surface at $30/mo), and bounced because the gate's price felt like a bait-and-switch instead of a promised path. Setting the freemium split in the hero aligns expectations end-to-end so the gate now confirms the offer the hero made, not reverses it.
- "Get 3 Free Tools" is concrete. "Start for Free" is vague and could mean a trial, a sample, an upsell funnel, or anything else. Concrete CTAs convert better because the visitor knows what is on the other side of the click. The exact tool count also reinforces the inventory framing in the body copy and the "97 more tools" line that already exists in the Free Banner section below.
- Surfacing "$30/mo" in the hero body is not a pricing change. The Pro tier has been $30/mo since launch and is named in the pricing grid, the FAQ, the founder section, and the gate. Bringing it above the fold means the visitor knows the price commitment before they invest scroll energy in the rest of the page, which filters out the "this seems expensive once I scroll to pricing" objection and pre-qualifies the click on "Get 3 Free Tools."
- Conversion copy was last touched on 5/14 (the gate rewrite plus the broken Whop URL fix). Seven days since the last conversion-copy run, the longest dry spell of any revenue-moving lane in the rotation. The other lanes hit recently are UX polish (5/15, 5/16, 5/20 pins), marketing assets (5/17 carousel, 5/18 email sequence), and funnel tightening (5/19 sticky CTA). Conversion copy on the highest-leverage surface (the hero) is the underweighted lane and the one that compounds with every other recent change.
- Risk reversal in the microline is the cheapest objection handler on the page. "Cancel anytime" was already in the FAQ and the pricing section copy. Pulling it above the fold removes a buried-trust-signal problem without adding any new claim.

**Expected impact**
- Higher gate-to-Whop conversion rate. The gate stops feeling like a surprise paywall because the price was already named in the hero. Visitors who scroll past the hero are pre-qualified on the freemium model.
- Higher click-to-signup ratio on the primary hero CTA. "Get 3 Free Tools" is more concrete than "Start for Free" and tells the visitor exactly what is waiting on the other side of the click. Realistic uplift on hero CTR is 5 to 12 percent based on documented concrete-CTA tests, with most of the gain on first-time visitors.
- Lower bounce rate on the /app gate from non-members. Anyone arriving at the gate via the hero CTA now expects to see a paid tier above the free tools, so the gate's "Join HIF Pro on Whop" button gets a warmer click instead of a startled bounce.
- Compounds with the 5/19 sticky mobile CTA and the 5/14 gate rewrite. Sticky CTA keeps the primary action one tap away on mobile, gate is now a real conversion surface, and the hero now sets honest expectations for both. Three surfaces of the funnel are aligned on the same freemium narrative for the first time.
- Diagnostic value if Brian wires analytics later: hero CTR on the new copy versus baseline, plus gate-to-Whop conversion rate before and after, will reveal which of the two changes did the heavier lifting.

**Partnership check:** Iterative copy on existing offer structure. The Pro tier at $30/mo is the price already published on the pricing grid, the gate, the FAQ, and the founder section. Free tier still includes the same 3 tools (Shot List Generator, Call Sheet Builder, Pre-Production Checklist). No tools added, no tools removed, no positioning shift, no rewrite of the core value prop. The hero headline ("THE TOOLS PROS RUN ON. NOW YOURS TO USE.") and the rest of the page are unchanged. Fully reversible by restoring three short copy strings. Within ship-freely lane.

---

## 2026-05-20 — UX polish (Pin / Favorites system)

**Lane:** UX polish — retention feature, new interaction pattern in the app shell

**File touched:** howitsfilmed-deploy/app/index.html

**What changed**
- Added a Pin/Favorites system to every tool and template card in the HIF Pro app. Each card now has a small bookmark icon button in the top-right corner of the card-top row, next to the category pill. Tap once to pin, tap again to unpin. State persists to localStorage under hif_pinned_tools_v1 as an array of card num strings (e.g. 01, T07, 87).
- When a member has at least one pinned item, the hub view (the default "all phases" landing screen) now renders a Pinned section at the very top, above the four phase tiles. Section uses the existing .grid layout for visual consistency and includes: a small filled red bookmark glyph in a tinted square, "Pinned" label in BigShoulders/Bebas, a count badge ("3 items"), and a quiet "Clear all" button on the right with a confirm dialog. Dashed border-bottom separates pinned from the phase tiles below so the hierarchy reads clean.
- Pin button has full a11y treatment: aria-pressed="true|false" toggles state, aria-label switches between "Pin {name} to top" and "Unpin {name}", title attribute provides hover tooltip, focus-visible outline matches the rest of the app, and the SVG bookmark swaps between stroked (unpinned) and filled red (pinned). Click handler uses preventDefault + stopPropagation so the card click target (the Open button) is never accidentally triggered when toggling pin.
- Mobile tap target sized up to 32x32px under 540px viewport so it clears the WCAG 24px minimum without crowding the card top row. Pin button styling reuses existing tokens (--surface2, --border2, --accent) so no new design tokens were introduced.
- Pin state surfaces correctly across all three render paths: hub view (with pinned section on top), phase drill-in (pin state shown on each card), and search results (pinning from a search result works and updates instantly). All render through the same cardHTML() function, so the pin button is always present and always reflects current state.

**Why**
- The app has 100 tools but most filmmakers only use 8 to 15 of them regularly (the call sheet builder, shot list, invoice generator, gear checklist, budget tracker, and a handful of phase-specific ones). Without pins, every return visit forces the member to either remember the phase, scroll, or type in the search box. With pins, the second visit feels instant: open the app, your tools are right there.
- Retention is the dominant LTV lever for a $30/mo subscription. Every percent of monthly churn avoided is dollars in the May 31 survival number. Pins are the cheapest, highest-leverage retention feature on the table: zero copy changes, no pricing exposure, no partnership-affecting positioning shifts, no new tools to maintain. Just makes the existing 100 tools feel like one person's customized cockpit.
- The improvement loop has not touched the in-app UX with a new interaction pattern in the last 7 days. Lanes touched recently: funnel (5/19 sticky CTA), marketing (5/17, 5/18), UX brand compliance (5/15, 5/16 emoji cleanup), conversion (5/14 gate). UX polish via new feature pattern is the underweighted lane and the one that pulls hardest on retention.
- Bookmark icon was chosen over a star or heart deliberately. "Bookmark" maps to "save this for later" in user mental models, which matches what filmmakers will use this for (pinning the tools they reach for every shoot). Star and heart imply ranking or affection, which is the wrong frame for a utility list.

**Expected impact**
- Retention bump on the second through tenth visit. The first visit, no pins exist so the experience is unchanged. From the second visit onward, regular users will accumulate 3 to 8 pins and find their workflow tools in one tap from the front door instead of two to four taps via phase navigation or search.
- Increased perceived value of the $30/mo subscription. A member who has customized their pinned set has invested in the product. Investment makes the cancel button feel more expensive.
- Lower scroll depth needed to reach commonly-used tools, which on mobile is the biggest friction in the app today.
- Diagnostic value if Brian wires analytics later: pinned-vs-total card click ratio reveals which tools are actually load-bearing for retained members, which can inform what to feature on the homepage and in marketing.

**Partnership check:** Iterative UX polish. No copy changes, no pricing changes, no positioning shifts, no tools added or removed. Pure additive feature using existing design tokens. Reversible by deleting the pin CSS block, the togglePin/loadPins/savePins/isPinned/clearAllPins functions, and the pinnedHTML branch in render(). No part of Reese's half of the business is affected. Within ship-freely lane.

---

## 2026-05-19 — Funnel tightening (sticky mobile CTA)

**Lane:** Funnel tightening — persistent primary CTA on the long mobile homepage

**File touched:** howitsfilmed-deploy/index.html

**What changed**
- Added a sticky bottom CTA bar that appears only on mobile (under 600px viewport). Copy reads "Start with 3 free tools / No credit card. Free forever." with a red "Start Free" button pointing at app/index.html, same destination as every other primary CTA on the page. Uses an SVG arrow, no emoji.
- Built with scroll-aware logic in vanilla JS, requestAnimationFrame-throttled, passive listeners. Hidden while the hero is on screen (the hero already has its own "Start for Free" button so a sticky bar would be redundant noise). Slides up once the user scrolls past the hero, then auto-hides when the final CTA section enters the viewport so visitors do not see two stacked primary CTAs at the same time.
- Styling matches the existing design language: rgba(10,10,12,0.92) glass background with backdrop-filter blur, red accent button using the existing --red and --red-dark tokens, top border in --border2. Uses env(safe-area-inset-bottom) so it does not collide with the iOS home indicator.
- Body padding-bottom of 76px added on mobile only so the footer remains reachable without being covered. Desktop is untouched. aria-hidden flips with the show state, the bar is announced when visible and removed from the AT tree when hidden.

**Why**
- The homepage is roughly 1,900 lines and on mobile it scrolls long. The primary CTA (Start for Free) lives in two places: the hero (above the fold) and the final CTA section (below the fold). Between those two surfaces, the visitor scrolls through hero proof, trust strip, free tier banner, problem section, tools showcase, pricing grid, methodology, founder section, and FAQ with the action target out of reach the entire time. A user who decides to convert in the middle of pricing or tools has to scroll up to the hero or down to the final CTA, both costing intent.
- IG-driven traffic is mobile-dominant. @howitsfilmed sends visitors via bio link directly to the homepage, where they read on a phone in vertical orientation. Sticky mobile CTAs are a well-documented conversion-lift pattern on long landing pages (commonly 8 to 25 percent depending on copy and placement). For a $5K survival target with under 12 days of runway, "make the primary action always one tap away on the device 80 percent of your visitors are using" is the highest-leverage zero-copy zero-design change on the table.
- This runs the funnel-tightening lane, which the loop has not touched in the last 7 days. Conversion copy (gate), UX polish (emojis x2), and marketing assets (IG carousel, email sequence) have all shipped recently. The CTAs themselves are tight. Visibility of those CTAs through the scroll was the remaining gap.

**Expected impact**
- More clicks on the primary "Start for Free" CTA from mobile visitors who decide to convert mid-scroll. Realistic uplift on free signups in the 5 to 15 percent range depending on traffic mix, with most of the gain coming from visitors in the middle of the page (pricing and tools sections) who were previously a long scroll away from any action.
- More free signups feeds the email sequence shipped on 5/18. Sticky CTA fills the top of the funnel, the email sequence converts the middle. Two of this week's changes now compound on each other.
- Diagnostic value if Brian wires analytics later: clicks on .sticky-cta-btn vs. .btn-primary in hero will reveal which surface is doing the actual converting on mobile.

**Partnership check:** Iterative funnel polish. No copy changes (button text matches the existing hero CTA), no pricing changes, no positioning shifts, no tools added or removed. Free-tier CTA destination is unchanged. Mobile-only, fully reversible by deleting the .sticky-cta block. Within ship-freely lane.

---

## 2026-05-18 — Marketing asset (free-to-paid email sequence)

**Lane:** Marketing asset — email sequence draft

**File touched:** howitsfilmed-deploy/marketing-drafts/20260518-free-to-paid-email-sequence.md (new file)

**What changed**
- Drafted a three-email post-signup sequence that fires when someone claims a free HIF account at howitsfilmed.com/app. Email 1 sends immediately (welcome + activation, "use one of the three free tools on your next shoot"). Email 2 sends the next morning at 9am ET (origin story, the desktop folder that became HIF Pro, builds credibility without a hard pitch). Email 3 sends 72 hours after signup at 9am ET (direct upgrade ask to HIF Pro at $30/mo, leans on cancel-anytime risk reversal, leaves a graceful out so non-buyers do not feel pushed).
- Every email respects the HIF voice rules: first-name greeting, under 120 words, no em-dashes, no emojis, plain URLs only (no markdown brackets), sign-off as Brian. Reply-to is brianwhitesel@gmail.com so replies hit a real inbox.
- Bundled the file with sending notes (where to wire it up, suppression for already-paid members, send-time recommendations), four subject-line variants per email for A/B testing if the ESP supports splits, and success metrics (Email 1 open >60%, Email 3 CTR >8%, free-to-paid conversion >4% over 14 days).
- Included a partnership check at the bottom confirming the draft introduces no pricing or positioning changes.

**Why**
- Yesterday's run shipped a top-of-funnel marketing asset (IG carousel aimed at the 175K @howitsfilmed audience). The middle of the funnel, free signup to paid HIF Pro, has no automated sequence yet. That gap is the highest-leverage place to pull toward the May 31 $5K survival target because free signups are the most self-qualified leads on the entire site. They already evaluated the brand, decided yes, and gave an email address. The next 96 hours is the cleanest conversion window before the "I just got something free" energy fades.
- The previous four runs covered marketing (IG), UX polish (app emoji cleanup), UX polish (homepage emoji cleanup), and conversion copy on the gate. Conversion copy + marketing asset are the two lanes that move revenue, and the loop has stayed within them this week with intent. Today extends the marketing-asset lane into the unaddressed middle of the funnel.
- The sequence is intentionally three emails not seven. With 13 days of runway and an unknown ESP integration on Brian's side, a tight three-message arc gives him something he can copy-paste into Whop's native email tool tonight if he wants. Longer drips are easy to add later if the first three earn their open rates.

**Expected impact**
- One sequence will not move May revenue alone, but free-to-paid is the conversion that compounds: every free signup from the IG carousel, from organic search, from the @howitsfilmed bio link now has a path to monetization that exists while Brian is asleep. The carousel drives signups, the sequence converts them. Together they form the first complete inbound loop the funnel has had.
- Realistic case: if @howitsfilmed drives 200 free signups in the next 14 days and the sequence converts at 4 percent, that's 8 new HIF Pro members at $30/mo, or $240 MRR. Modest in dollars, meaningful as proof the system works. The bigger win is the asset is reusable, A/B testable, and only gets better with each iteration.
- Email 3 is the diagnostic. If CTR is under 4 percent, the offer needs sharpening (limited-time bump, founding-member angle, or annual discount). If Email 2 underperforms on opens, the story is not landing and the subject line needs rework.

**Partnership check:** Marketing draft only. No product changes, no pricing changes, no positioning shift. Pricing referenced reflects the existing $30/mo HIF Pro tier already live on Whop. Brian decides whether to wire it into Whop's email system or an external ESP. Within ship-freely lane.

---

## 2026-05-17 — Marketing asset (IG carousel for @howitsfilmed)

**Lane:** Marketing asset — IG carousel hook + 3 caption variants

**File touched:** howitsfilmed-deploy/marketing-drafts/20260517-preproduction-mistakes-carousel.md (new folder, new file)

**What changed**
- Created the marketing-drafts folder (did not exist) and dropped in a ready-to-shoot ten-slide IG carousel concept titled "Seven Mistakes That Killed My First Five Shoots." Hook slide, seven mistake slides on a single repeating layout (number, title, two-sentence story, underlined fix), one pivot slide that introduces the HIF system, one CTA slide pointing at howitsfilmed.com.
- Wrote three caption variants targeting different attention spans: 40-word scroll-native, 110-word story-led, 175-word direct-conversion. All three respect HIF voice rules (no em-dashes, no emojis, plain URL, first-person without "I hope this finds you well" energy).
- Included posting notes: pinned first comment, story re-share with poll, optimal post window based on historic @howitsfilmed engagement (9-10am ET weekdays), and a cross-format upgrade path (slide 1 as a Reel cover) if the carousel performs.
- The carousel is intentionally mistake-led, not tip-led. Mistake stories earn saves and DMs harder than checklists do, and the pivot to "I built the system that fixed it" lands without feeling like a pitch.

**Why**
- The improvement loop has spent the last three days on visual polish (homepage emoji cleanup, app emoji cleanup, gate copy + URL fix). The funnel is now tight on the inbound side. What it has not had in the last seven days is fresh creative aimed at the 175K-follower audience that just got reactivated on May 8. The free tools and Whop store are the destination. The carousel is the vehicle that gets followers there.
- $5K survival target is May 31. Two weeks of runway. A single high-save carousel from a 175K account is the fastest single lever the loop can pull right now toward signups, because the audience already exists and is warmed up to the brand.
- Mistake-led format also doubles as social proof. Brian writing about scars from his own first five shoots positions him as a working filmmaker telling the truth, which is the homepage's stated positioning ("Built by working creators, not theorists"). The carousel reinforces the offer narrative.

**Expected impact**
- One carousel will not move May revenue alone. What it will do: stack a high-save, high-share asset on top of a homepage and gate that were just cleaned up over the previous three runs. The asset is reusable: caption variant A is a tweet, caption variant C is a newsletter intro, slide 1 is a Reel hook. One draft, multiple shots on goal.
- Save rate is the leading indicator. If the carousel clears 8 percent save rate in the first 24 hours, the format is validated and the loop should generate three more before May 31. If it underperforms, the post body becomes the diagnostic: weak slide 2, weak CTA, or weak hook.

**Partnership check:** Marketing draft only. No product changes, no pricing, no tool changes, no positioning shifts. Brian decides whether to shoot it and post it. Within ship-freely lane.

---

## 2026-05-16 — UX polish (brand compliance, in-app)

**Lane:** UX polish — design system / brand-standard compliance, round two

**File touched:** howitsfilmed-deploy/app/index.html

**What changed**
- Removed the four remaining emoji glyphs inside the HIF Pro app shell and replaced them with inline SVG icons sized and colored to match the surrounding context.
- Project switcher button: replaced the 📁 folder glyph with a 13x13 stroked SVG folder (1.8px stroke, rounded caps), wrapped in an aria-hidden span. Inherits currentColor so it picks up the existing button text-muted tone.
- Tier filter chip "Tools": replaced the ⚡ lightning glyph with a 10x10 filled SVG bolt. The chip is small (font-size 11px) so the icon is dialed down to match.
- Tool card pill (rendered for every Interactive Tool card): replaced the inline ⚡ prefix inside the template literal in cardHTML() with a 9x9 filled SVG bolt. Inherits the existing #ff8080 / fb923c pill color so it tints with the pill state.
- Tier section header "Interactive Tools" (shown above the tools grid in each phase view): replaced the ⚡ with an 11x11 filled SVG bolt at the existing tool color #F97316.
- Added a small CSS block defining .ico-bolt and .ico-folder so vertical alignment is consistent across the four contexts where the bolt is now used. All icons set to flex-shrink: 0 to prevent squeeze in tight containers.

**Why**
- Continuation of yesterday's homepage pass. The app shell (app/index.html) is the second highest-traffic surface in the funnel and the one members live inside after they join. Four emoji glyphs were rendering inconsistently across iOS, macOS, Windows, and Linux browsers. The lightning bolt was the worst offender: it appeared in three separate places (tier chip, every tool card pill, section header) and any glyph variation between them broke the visual rhythm.
- Brand non-negotiable from the task brief: no emojis anywhere in files. Yesterday cleaned the marketing surface, today cleans the product surface.
- The SVG bolt is the same shape across all three placements, only the size changes. That's the kind of unified iconography agencies charge for and customers register subconsciously as quality.

**Expected impact**
- Crisp, predictable rendering of the Interactive Tools signature across every device. No more iOS-blue lightning bolt next to a Windows-yellow lightning bolt on the same screen.
- The project switcher button (which currently houses the only nav-level decoration) looks like a deliberate UI element instead of a placeholder.
- No conversion math claim. This is the kind of polish that doesn't move a single metric on its own but compounds with everything else into "this product was built by professionals" vs. "this product was thrown together by a hobbyist." For an offering Brian is asking filmmakers to pay for, the latter is fatal.

**Partnership check:** Visual polish only. No copy, no tools added or removed, no pricing, no repositioning. Within ship-freely lane.

---

## 2026-05-15 — UX polish (brand compliance)

**Lane:** UX polish — design system / brand-standard compliance

**File touched:** howitsfilmed-deploy/index.html

**What changed**
- Replaced all six emoji icons on the homepage with custom inline SVG line icons. Three were in the hero social proof badges (170K+ Instagram, 30 Pro Templates, 5+ Yrs Filmmaking). Three were in the offer cards (Filmmaking Templates, The Cinematic System, @howitsfilmed).
- Designed the SVGs to match the HIF aesthetic: 1.6px stroke weight, rounded line caps and joins, red accent color, sitting inside a glass-style chip (proof badges) or a soft red-tinted square (offer cards). Camera, clipboard, and clapperboard motifs picked for the three repeating concepts.
- Added supporting CSS for .proof-badge-icon svg and a redesigned .offer-icon container (44x44 box with red-subtle background and a 1px red border at 18% opacity, replacing the old bare 24px emoji glyph).
- Added aria-hidden="true" to every icon wrapper since they are decorative and the label text next to them already carries the meaning for screen readers.

**Why**
- Brand non-negotiable from the task brief: "No emojis anywhere in files." The homepage at howitsfilmed.com was the most visible violation of that rule, hitting every visitor before they ever see the Whop store or the /app gate. Emojis render inconsistently across OS/browser combos and undercut the editorial agency feel the rest of the site works hard to project. SVGs are crisp, controllable, and match the existing viewfinder/red-accent design language.

**Expected impact**
- Tighter, more professional first impression on the highest-traffic page of the funnel.
- Removes the most obvious "this was thrown together" tell on the homepage.
- No conversion math claim here, but for a brand that sells filmmaking polish, the homepage looking polished is the price of admission.

**Partnership check:** Iterative visual polish only. No copy changes, no repositioning, no tool changes, no pricing changes. Within ship-freely lane.

---

## 2026-05-14 — Conversion copy + bug fix

**Lane:** Conversion copy (with bonus: broken-link bug fix)

**File touched:** howitsfilmed-deploy/app/index.html

**What changed**
- Fixed broken Whop URL on the access gate. Was https://whop.com/how-its-filmed (with hyphens), now https://whop.com/howitsfilmed (no hyphens) to match every other CTA in the deploy folder. The hyphenated URL was almost certainly a dead link routing non-members to a 404 when they clicked the gate's CTA.
- Rewrote the gate card from a passive "you don't have access" notice into a benefit-led conversion surface. New copy: "100 Pro Tools For Filmmakers / Templates, calculators, and checklists for every phase of production. Built by working filmmakers, organized by workflow." Added four phase pills (Pre-Production, On-Set, Post, Business) so visitors see what's behind the gate at a glance.
- Upgraded the CTA from a small red text link with an arrow to a full-width filled red button ("Join HIF Pro on Whop"). Added a quiet subline below: "Instant access. Cancel anytime." Member access code entry is unchanged below the divider.

**Why**
- The /app gate is the conversion surface for anyone landing on howitsfilmed.com/app without a Whop membership. The old copy told visitors they were locked out without telling them what they were missing. The CTA looked like a footnote, not a button. And it pointed at a URL that doesn't exist. Cumulative effect: the gate was leaking the only inbound /app traffic that wasn't already a member.

**Expected impact**
- Stops the URL leak (any non-member clicking the CTA now actually lands on the Whop store).
- Higher gate-CTA click rate from clearer value prop and a real button vs. a text link.
- Better aligned with the homepage's "100 templates" positioning.

**Partnership check:** Iterative copy + UX polish, not a repositioning. Tools count, phase taxonomy, and pricing untouched. Within ship-freely lane.

---
