# TICKET-1042 — Discount / checkout flaky on multi-line carts

**Merchant:** Maple Grove Gifts (fictional SMB)
**Storefront SoR:** [yemiade-anysphere/hydrogen-demo-store](https://github.com/yemiade-anysphere/hydrogen-demo-store)
**No CRM ids.** Do not invent HubSpot/Zendesk/Salesforce ticket numbers or real customer names.

## Intake

Applying a discount code on `/cart` is flaky when the cart already has **more than one line**.

- The field sometimes looks applied.
- Totals and checkout still charge **full price**.
- Single-line carts usually apply the code.
- Two units of one SKU is not the repro — need **2+ distinct lines**.

## Support / Eng

Search `DEMO BUG (TICKET-1042)` in `app/routes/($locale).cart.tsx` (`DiscountCodesUpdate`).

`CartForm.ACTIONS.DiscountCodesUpdate` fetches the current cart and returns early when `lineCount > 1`, so `cart.updateDiscountCodes` never runs.

This is **not** TICKET-1105 (quantity / `LinesUpdate`). Do **not** remove `DEMO BUG (TICKET-1105)` when working this ticket.

## Verify (after a real fix)

1. Add two different products so the cart has 2+ line items.
2. Open `/cart`, enter a valid demo discount code, and apply it.
3. Confirm the code appears on the summary and totals/checkout change.
4. Repeat with a single-line cart — still applies.
5. Confirm quantity DEMO BUG (TICKET-1105) is still present.
