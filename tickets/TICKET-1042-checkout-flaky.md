# TICKET-1042 — Discount ignored on multi-line carts

Fixture: Maple Grove Gifts demo store only. Do not use real customer names or CRM ids.

## Symptoms

Applying a discount code on `/cart` is ignored when the cart has more than one line item. The cart JSON comes back unchanged: no discount code, same subtotal. Single-line carts apply the code as expected.

## Root cause

`CartForm.ACTIONS.DiscountCodesUpdate` in `app/routes/($locale).cart.tsx` fetched the current cart and returned early when `lineCount > 1`, so `cart.updateDiscountCodes` never ran.

## Fix

Always call `cart.updateDiscountCodes(discountCodes)` for DiscountCodesUpdate. Line count does not gate the mutation.

## Verify

1. Add two different products so the cart has 2+ line items (not just quantity 2 of one SKU).
2. Open `/cart`, enter a valid demo discount code, and apply it.
3. Confirm the discount appears on the cart summary and the totals change.
4. Repeat with a single-line cart and confirm the code still applies.
5. Run unit coverage: `npm run test:unit`.
