<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Millennium Games — Platform Architecture & Project Standards

## Project Overview
Millennium Games is a premium digital game marketplace delivering instant, verified Steam, Epic, EA, Ubisoft, Rockstar, and Battle.net accounts and digital licenses.

## Core Routes & Navigation
- `/` — Homepage with Hero, Trust badges, Featured Games with filters, Video Catalogue, Trending Carousel, Upcoming Releases with trailers, Reviews, Deals, Support, and Footer.
- `/cart` — Dedicated full-page shopping cart & checkout flow:
  - **Step 1: Review Cart** (play mode offline/online switch, quantity adjustment, order summary)
  - **Step 2: UPI Payment** (QR Code scan, official UPI ID copy, screenshot proof upload, optional UTR)
  - **Step 3: Order Confirmation** (instant account credentials allocation, auto-generated PDF tax invoice download, WhatsApp support link, jump to library)
- `/checkout` — Direct alias route redirecting to `/cart?step=upi_payment`.
- `/games/[id]` — Dynamic game details page with system requirements, play mode selection, instant add-to-cart and buy-now buttons.
- `/library` — User's permanent game collection with account credentials, Steam Guard 2FA codes generator, and order history.
- `/auth` — Sign in and registration with localStorage persistence.

## Pricing Rules & Calculations
- **Offline Story / Campaign Mode**: Base game price (`game.price`, e.g., ₹399).
- **Online Multiplayer Mode**: `Math.round(game.price * 2.5)` (e.g., ₹998).
- **Deals & Preorders**: `dealPrice` / `preorderPrice` (e.g., ₹399).
- **Cart Calculations**: Automatically computed in `AppContext.tsx` and displayed in `/cart`.

## Payment & Verification Details
- **Merchant Name**: Millennium Games
- **Official UPI ID**: `bllalwhdn@ptaxis`
- **QR Code Asset**: `/images/sidharth_shibu_qr.jpg`
- **Customer Support WhatsApp**: `+91 80894 06346` (`https://wa.me/918089406346`)
- **Verification Flow**: Requires payment screenshot attachment and creates instant purchase record with invoice generation.

## Performance & Smoothness Standards
- **Smooth Momentum Scrolling**: Handled by `Lenis` in `SmoothScrollProvider.tsx` (`lerp: 0.1`, `smoothWheel: true`, native touch bypass for mobile).
- **Offscreen Section Caching**: `content-visibility: auto` and `contain-intrinsic-size` applied to offscreen sections in `globals.css` for 60/120 FPS rendering.
- **Hardware Compositing**: `transform: translateZ(0)` and `backface-visibility: hidden` on glass cards and interactive buttons.
- **Fast Single-Click Routing**: All links use `<Link prefetch={true}>` for sub-50ms instant page loads without click interceptors.
- **Snappy Micro-interactions**: `0.15s` CSS transitions with active press micro-feedback (`scale(0.96)`) and `touch-action: manipulation`.
