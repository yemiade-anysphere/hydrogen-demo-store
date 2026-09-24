# GitHub PR pack — TICKET-1105 (do not merge this as a fix)

Draft for the **future** Eng fix PR. This fixture pack does **not** remove `DEMO BUG (TICKET-1105)` or `DEMO BUG (TICKET-1042)`.

Repo: https://github.com/yemiade-anysphere/hydrogen-demo-store
Base: `main`
Search: `DEMO BUG (TICKET-1105)` in `app/routes/($locale).cart.tsx`

---

## Title

Fix TICKET-1105: quantity updates ignored on multi-line carts

---

## Body

Cedar & Twine Home (shared hosting) storefront: after the cart drawer / AJAX cart plugin update, changing quantity on `/cart` is a no-op whenever the cart already has more than one line. The stepper / drawer often looks updated (optimistic UI), but cart JSON, totals, and checkout keep the old qty. Single-line carts update as expected.

Root cause is the `CartForm.ACTIONS.LinesUpdate` short-circuit in `app/routes/($locale).cart.tsx`: the action fetches the current cart and returns that snapshot when `lineCount > 1` without calling `cart.updateLines`. Search `DEMO BUG (TICKET-1105)`.

This PR should **only** remove that LinesUpdate early return. Always persist `inputs.lines` via `cart.updateLines`.

**Do not remove `DEMO BUG (TICKET-1042)`** — DiscountCodesUpdate still returns early on multi-line carts (Maple Grove Gifts / Path A). That is a separate fixture.

Merchant write-up: `tickets/TICKET-1105-quantity-update-flaky.md`. No CRM ids.

---

## Test plan

- [ ] Add two different products so the cart has 2+ lines (not quantity 2 of one SKU)
- [ ] Open `/cart` and change quantity on one line
- [ ] Confirm quantity **and** subtotal update (not only the stepper)
- [ ] Checkout / cart JSON show the new qty
- [ ] Repeat with a single-line cart; quantity still updates
- [ ] Confirm `DEMO BUG (TICKET-1042)` / `DiscountCodesUpdate` early return is still in `app/routes/($locale).cart.tsx`
- [ ] Unit coverage that LinesUpdate does not short-circuit when `lineCount > 1`

---

## Review checklist

- [ ] Only TICKET-1105 LinesUpdate behavior changed
- [ ] TICKET-1042 discount DEMO BUG untouched
- [ ] No CRM ids, no real customer names
- [ ] Stays on `yemiade-anysphere/hydrogen-demo-store`
- [ ] Test plan covers multi-line vs single-line and totals/checkout (not UI-only)
- [ ] Comments / ticket still searchable via `DEMO BUG (TICKET-1105)` until the fix lands
