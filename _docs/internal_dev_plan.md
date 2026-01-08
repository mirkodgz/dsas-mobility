# Internal Development Plan: DSAS Mobility Platform
> **CONFIDENTIAL**: For Development Team Only. Based on `implementation_plan.md.resolved`.

## Tech Stack & Environment
- **Framework**: Astro (SSG/SSR hybrid) + React (Islands).
- **Styling**: Tailwind CSS v4 (Alpha/Beta considerations or bleeding edge usage).
- **DB**: Supabase (PostgreSQL) + RLS.
- **Automation**: n8n (External instances).
- **Hosting**: Netlify/Vercel (Edge Functions compatible).

## 🎨 DESIGN BENCHMARK & UX
> **Primary Reference**: [subnoleggiami.it](https://subnoleggiami.it/)
> *Detailed Note*: We are cloning the *structure* and *cleanliness* of this site, but implementing it with our superior tech stack (Astro/React vs WordPress).

**Key Visual Elements to Replicate:**
1.  **Header**: Clean white background, sticky behavior, clear "WhatsApp" CTA.
2.  **Hero Section**: High-impact usage of vehicle imagery with a clear value proposition overlaid.
3.  **Cards**: The specific card layout from Subnoleggiami (Image top, Price highlight bottom-left, Specs icons bottom-right) is the target.


---

## EXECUTION ROADMAP (10 Days SPRINT)

### 🚀 PHASE 1: Architecture & Data (Days 1-2)
**Goal**: Functional Database & UI Design System.

#### 1.1 Database Schema (Supabase)
*Action*: Run SQL migrations.
- **`vehicles`**: `id`, `make`, `model`, `year`, `category` (enum), `monthly_price`, `deposit`, `availability_status`, `specs` (JSONB), `images` (array/bucket_paths).
- **`leads`**: `id`, `vehicle_id`, `customer_data` (JSONB), `status`, `created_at`.
- **`content_pages`**: (Optional) If we need dynamic CMS for static pages.
- **RLS Policies**: Public read for `vehicles`. Insert-only for `leads`. 

#### 1.2 Setup & Design System
- Init Astro + Tailwind v4.
- **Design Tokens (Extracted from Scan)**:
    - **Primary**: `#004080` (Deep Trust Blue) - Headers, Text.
    - **Secondary**: `#FF8C00` (Vibrant Orange) - CTAs, Buttons, Highlights.
    - **Background**: `#F5F5F5` (Light Gray) - Section divers.
    - **Typography**: `Figtree` (Google Font) - Geometric sans-serif.
    - **Radius**: `20px` (Cards), `9999px` (Buttons/Pills).
- **Components Guidelines**:
    - `Layout.astro`: Max-width `1440px`. Font `Figtree`.
    - `Header.tsx`: Sticky, White bg, Shadow `sm`.
    - `VehicleCard.tsx`: **Visual Clone**.
        - Radius: `20px`.
        - Shadow: `0 10px 25px -5px rgba(0, 0, 0, 0.05)`.
        - Structure: Image Top -> Title/Price Middle -> Icons Bottom.
    - `Badge.tsx`: Pill-shaped (Full radius).



---

### 🔨 PHASE 2: Core Development (Days 3-6)
**Goal**: Working Catalog & Dynamic Pages.

#### 2.1 Vehicle Catalog (`/catalogo`)
- **Grid Component**: `VehicleGrid.tsx` with hydration `client:visible`.
- **State Management**: React `useState` for filters (Make, Price Range).
- **Data Fetching**: Supabase JS client inside `getStaticPaths` (if SSG) or API endpoints (if SSR).

#### 2.2 Vehicle Detail Page (`/catalogo/[slug]`)
- **Benchmark Feature**: Replicate the "Sticky Sidebar" for the contact form seen on modern rentals.
- **SSR Strategy**: Use `export const prerender = false` (or `getStaticPaths` if catalog is small <1000 items for speed).
- **Gallery**: Embla Carousel or Swiper. **Requirement**: Thumbnails below main image, swipe support on mobile.
- **Specs Grid**: Use lucide-react icons for: Fuel, Transmission, Seats, CO2.
- **Calculator Island**: `LeasingCalculator.tsx`.
    - **Visual**: Slider UI inputs (Range sliders) for intuitive adjustment, similar to the benchmark's ease of use.
    - Logic: Client-side formula based on `vehicle.base_price`.


#### 2.3 Lead Capture Forms
- **Component**: `ContactForm.tsx`.
- **Action**: POS request to `/api/leads`.
- **Validation**: Zod (client + server).

---

### 🔌 PHASE 3: Integration & Connectors (Days 7-9)
**Goal**: Hook up the "Brain" (n8n).

#### 3.1 Webhooks & API
- **Endpoint**: `POST /api/webhooks/n8n-lead`.
- **Payload**:
  ```json
  {
    "lead_id": "uuid",
    "vehicle": "Audi Q3",
    "user_email": "...",
    "source": "web_v2"
  }
  ```
- **n8n Workflow**:
    - Trigger: Webhook.
    - Action: Store in CRM / Send Email / Slack Notification (Existing flows).

#### 3.2 AI Context
- **Data Export**: Create a simplified JSON feed or API endpoint (`/api/ai/inventory`) for the AI assistant to read current stock status specifically.

---

### ✅ PHASE 4: Polish & Launch (Day 10)
**Goal**: Production Ready.

#### 4.1 Technical SEO
- **Sitemap**: `@astrojs/sitemap`.
- **Schema.org**: JSON-LD for `Product` and `Car` on detail pages.
- **Robots.txt**: Allow indexing.

#### 4.2 Performance Audit
- **Lighthouse**: Check LCP < 0.8s.
- **Image Optimization**: Ensure `<Image />` component usage from Astro.

#### 4.3 Deployment
- Connect Repo to Hosting Provider.
- Set ENV vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `N8N_WEBHOOK_URL`.
