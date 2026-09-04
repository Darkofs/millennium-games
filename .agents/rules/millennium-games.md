# Millennium Games Architecture & System Rules

## Key Architecture & Conventions
1. **Cart & Payment Flow**:
   - The cart and checkout are hosted on dedicated pages: `/cart` and `/checkout`.
   - Never reintroduce pop-up side drawer overlays for checkout.
   - Payment method: Direct UPI with QR code `/images/sidharth_shibu_qr.jpg`, UPI ID `bllalwhdn@ptaxis`, and payment proof screenshot attachment.
   - Instant invoice generation via `InvoiceModal.tsx` / `downloadInvoice`.

2. **Pricing Structure**:
   - Standard Offline mode price: ₹399 base price
   - Online multiplayer mode: `Math.round(basePrice * 2.5)`
   - All games use original production pricing from `gameData.ts`.

3. **Performance Standards**:
   - Maintain butter-smooth scrolling using `SmoothScrollProvider.tsx` (`lerp: 0.1`).
   - Use `prefetch={true}` on all Next.js `<Link>` components for instant single-click page opening.
   - Keep CSS transitions fast (`0.15s`) with `:active` tactile micro-feedback.
   - Offscreen sections must use `content-visibility: auto` to maintain 60-120 FPS.
