# TICKET-1105 — Quantity update flaky on multi-line carts

**Merchant:** Cedar & Twine Home (fictional SMB, shared hosting)
**Storefront SoR:** [yemiade-anysphere/hydrogen-demo-store](https://github.com/yemiade-anysphere/hydrogen-demo-store)
**No CRM ids.** Do not invent HubSpot/Zendesk/Salesforce ticket numbers or real customer names.

## Intake

After a **cart drawer / AJAX cart plugin** update on shared hosting, changing line quantity on `/cart` is flaky when the cart already has **more than one line**.

- The UI often looks updated (optimistic qty stepper).
- Cart totals and checkout still show the **old quantity**.
- Single-line carts usually work.
- Two units of one SKU is not the repro — need **2+ distinct lines**.

## Support (L2)

Check the plugin **and** escalate storefront code if the action is dropping the mutation.

1. Confirm shared-hosting plugin/theme conflict: disable or roll back the cart-drawer / AJAX cart plugin and retest `/cart` qty change with 2+ lines.
2. If the mismatch survives (UI vs totals/checkout), it is not plugin-only.
3. Escalate **LinesUpdate** in `app/routes/($locale).cart.tsx`. Search `DEMO BUG (TICKET-1105)`.
4. Do **not** remove `DEMO BUG (TICKET-1042)` (discount short-circuit). That is a separate Maple Grove Gifts fixture.

Triage write-up: `demo-artifacts/triage-1105.md`.

## Eng (in-repo)

`CartForm.ACTIONS.LinesUpdate` fetches the current cart and returns early when `lineCount > 1`, so `cart.updateLines` never runs. Quantity is ignored for mixed baskets.

Fix (when asked to ship the code change, not this fixture PR): always call `cart.updateLines(inputs.lines)`. Leave the TICKET-1042 discount early return in place.

PR pack for that fix: `demo-artifacts/github-pr-pack-1105.md`.

## Verify (after a real fix)

1. Add two different products so the cart has 2+ line items.
2. Open `/cart` and change quantity on one line.
3. Confirm quantity **and** subtotal/checkout update (not just the stepper).
4. Repeat with a single-line cart — still updates.
5. Confirm discount DEMO BUG (TICKET-1042) is still present.
