# Grok Bot team Show — storefront SoR

This repo is the **demo system of record** for the Grok Bot team Show (not `agenticyemi`).

- GitHub: https://github.com/yemiade-anysphere/hydrogen-demo-store
- Org / name: `yemiade-anysphere` / `hydrogen-demo-store`
- Branch of truth: `main`

`main` ships **two intentional DEMO BUGs** in `app/routes/($locale).cart.tsx`. Do not "clean up" the other one while working a ticket.

| Ticket | Merchant | Action | Search string |
| --- | --- | --- | --- |
| [TICKET-1042](tickets/TICKET-1042-checkout-flaky.md) | Maple Grove Gifts | `DiscountCodesUpdate` early return when `lineCount > 1` | `DEMO BUG (TICKET-1042)` |
| [TICKET-1105](tickets/TICKET-1105-quantity-update-flaky.md) | Cedar & Twine Home | `LinesUpdate` early return when `lineCount > 1` | `DEMO BUG (TICKET-1105)` |

Path A is the **group room** story (1042). Path B is the **Chief of Staff 1:1** story (1105). Stay on this repo for both.

---

## Path A — group room (TICKET-1042)

Paste into the group room:

```
Maple Grove Gifts — applying a discount code on /cart is flaky when the cart has more than one line. The field sometimes looks applied, but totals/checkout still charge full price; single-line carts usually OK.
See tickets/TICKET-1042-checkout-flaky.md in hydrogen-demo-store.

Need:
1) Support: confirm repro (1 line vs 2+ lines) and whether it's theme/plugin vs Hydrogen cart action.
2) Product Eng: fix the storefront DiscountCodesUpdate bug in-repo (discount ignored when cart has >1 item). Search DEMO BUG (TICKET-1042) in app/routes/($locale).cart.tsx — do not remove the TICKET-1105 quantity DEMO BUG.
3) GitHub PR: open a fix PR against this repo with a test plan.

Stay on this one repo (https://github.com/yemiade-anysphere/hydrogen-demo-store).
```

---

## Path B — CoS 1:1 (TICKET-1105)

Paste into the Chief of Staff 1:1:

```
Cedar & Twine Home (shared hosting) — after their cart drawer / AJAX cart plugin update, changing line quantity on /cart is flaky when the cart has more than one line. UI looks updated but totals/checkout still show the old qty; single-line carts usually OK.
See tickets/TICKET-1105-quantity-update-flaky.md in hydrogen-demo-store.

Need:
1) Hosting Support: L2 triage (plugin conflict vs app) + escalate if code.
2) Product Eng: fix the storefront LinesUpdate bug in-repo (quantity ignored when cart has >1 item). Search DEMO BUG (TICKET-1105) in app/routes/($locale).cart.tsx — do not remove the TICKET-1042 discount DEMO BUG.
3) GitHub PR: draft a GitHub-ready PR description + test plan + review checklist for that fix.

Stay on this one repo (https://github.com/yemiade-anysphere/hydrogen-demo-store). Summarize back when Support triage and the PR pack are ready.
```

Expected Path B write-ups (fixtures, not the code fix):

- Support L2: `demo-artifacts/triage-1105.md`
- Eng PR pack: `demo-artifacts/github-pr-pack-1105.md`
