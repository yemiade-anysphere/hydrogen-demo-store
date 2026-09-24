# TICKET-1105 — Quantity update flaky on multi-line carts

**Merchant:** Cedar & Twine Home (fictional SMB, shared hosting)
**Storefront SoR:** [yemiade-anysphere/hydrogen-demo-store](https://github.com/yemiade-anysphere/hydrogen-demo-store)
**No CRM ids.** Do not invent HubSpot/Zendesk/Salesforce ticket numbers or real customer names.

## Symptoms

After a **cart drawer / AJAX cart plugin** update on shared hosting, changing line quantity on `/cart` is ignored when the cart already has **more than one line**.

- The UI often looks updated (optimistic qty stepper via `UpdateCartButton` in `app/components/Cart.tsx`).
- Cart JSON, totals, and checkout still show the **old quantity**.
- Single-line carts usually work.
- Two units of one SKU is not the repro — need **2+ distinct lines**.

## Root cause

`CartForm.ACTIONS.LinesUpdate` in `app/routes/($locale).cart.tsx` fetched the current cart and returned early when `lineCount > 1`, so `cart.updateLines` never ran. Search: `DEMO BUG (TICKET-1105)`.

This is **not** TICKET-1042 (`DiscountCodesUpdate` / Maple Grove Gifts). Leave that early return in place.

## Fix

Always call `cart.updateLines(inputs.lines)` for LinesUpdate. Line count does not gate the mutation. Do **not** remove `DEMO BUG (TICKET-1042)`.

## Verify

1. Add two different products so the cart has 2+ line items (not quantity 2 of one SKU).
2. Open `/cart` and change quantity on one line (increase or decrease).
3. Confirm quantity **and** subtotal/checkout update (not just the stepper).
4. Repeat with a single-line cart — still updates.
5. Confirm discount DEMO BUG (TICKET-1042) is still present.
6. Run unit coverage: `npm run test:unit`.
