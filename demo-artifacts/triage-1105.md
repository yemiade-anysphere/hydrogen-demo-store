# L2 triage — TICKET-1105 (Cedar & Twine Home)

**Queue:** Hosting Support → storefront
**Merchant:** Cedar & Twine Home (fictional SMB, shared hosting)
**No CRM ids.** Ticket lives in-repo only: `tickets/TICKET-1105-quantity-update-flaky.md`.

## Reported

After a **cart drawer / AJAX cart plugin** update, changing quantity on `/cart` is flaky when the basket has more than one line. Stepper / drawer UI looks updated; subtotal and checkout still show the previous qty. Single-line carts usually succeed.

## Plugin check (shared hosting)

| Check | Result |
| --- | --- |
| Cart drawer / AJAX cart plugin recently updated | Yes (merchant report) |
| Repro with plugin enabled, 2+ distinct lines | Qty UI changes; totals/checkout stay old |
| Repro after plugin disable / rollback, 2+ lines | Same mismatch |
| Repro with a single-line cart (plugin on or off) | Quantity persists |

Plugin conflict would typically fail in the drawer only, or fail regardless of line count. This fails on the `/cart` page action too, and only when `lineCount > 1`. Not plugin-only.

## App check

`CartForm.ACTIONS.LinesUpdate` in `app/routes/($locale).cart.tsx`:

1. `cart.get()` → `lineCount`
2. If `lineCount > 1`, return the current cart with empty `userErrors`
3. `cart.updateLines` never runs

That matches optimistic UI (looks updated) vs server snapshot (old qty on totals/checkout). Search string: `DEMO BUG (TICKET-1105)`.

Sibling short-circuit `DEMO BUG (TICKET-1042)` (`DiscountCodesUpdate`) is a different merchant/story (Maple Grove Gifts). Leave it.

## Escalation

**Escalate to Product Eng — storefront code.** LinesUpdate ignores quantity on multi-line carts.

Ask Eng for:

1. In-repo fix of TICKET-1105 only (always `cart.updateLines`).
2. Do not remove the TICKET-1042 discount DEMO BUG.
3. GitHub-ready PR description + test plan + review checklist (`demo-artifacts/github-pr-pack-1105.md`).

## Not doing

- No CRM / helpdesk ticket ids
- No plugin rollback as the fix (ruled out)
- No change to DiscountCodesUpdate
