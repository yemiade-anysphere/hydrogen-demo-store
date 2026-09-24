---
name: hydrogen-demo-tickets
description: Work TICKET-1042 / TICKET-1105 on hydrogen-demo-store without removing the other DEMO BUG.
---

# Hydrogen demo tickets

Repo SoR: `yemiade-anysphere/hydrogen-demo-store` (not agenticyemi). Read `DEMO.md` first.

Both short-circuits live on `main` in `app/routes/($locale).cart.tsx`:

| Search | Action | Ticket |
| --- | --- | --- |
| `DEMO BUG (TICKET-1105)` | `LinesUpdate` | Cedar & Twine Home quantity |
| `DEMO BUG (TICKET-1042)` | `DiscountCodesUpdate` | Maple Grove Gifts discount |

When fixing one ticket, **leave the other early return in place**. Do not invent CRM ids.
