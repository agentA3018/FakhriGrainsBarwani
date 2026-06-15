# Fakhri Grains Barwani — Premium Organic Tea Landing Page

A beautifully designed, premium landing page for **Fakhri Grains Barwani**, showcasing organic teas from around the world. This web application features an elegant aesthetic, an interactive product catalog, a fully functional shopping cart system, and direct email inquiry submissions.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Logic**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **Animations**: Custom Tailwind transitions, Micro-animations, and Lucide icons
- **Form Submissions**: [@emailjs/browser](https://www.emailjs.com/)
- **Analytics**: [@vercel/analytics](https://vercel.com/analytics)

---

## 🛠️ Getting Started

First, ensure dependencies are installed (this project uses `pnpm` as its package manager):

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Build the project for production
pnpm build

# Start the production build locally
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📧 EmailJS Configuration & Setup

Inquiries from the cart and contact form are sent directly to your email using **EmailJS**. To customize the email recipient or setup your own EmailJS service, follow these steps:

### 1. Create a Free Account
Register at [EmailJS.com](https://www.emailjs.com/).

### 2. Add an Email Service
Connect your email service (e.g., Gmail for `fakhrigrainsbarwani53@gmail.com`) under **Email Services** and retrieve the **Service ID**.

### 3. Create an Email Template
Under **Email Templates**, create a template with the exact variables mapping to the contact form:
- `{{customer_name}}` — Full name of the customer
- `{{customer_company}}` — Customer's company name (optional)
- `{{customer_phone}}` — Customer's phone number
- `{{customer_email}}` — Customer's email address
- `{{customer_location}}` — Customer's city/location (optional)
- `{{customer_message}}` — Message content
- `{{product_list}}` — List of selected products and quantities
- `{{submission_date}}` — Date of submission (dd/mm/yyyy)
- `{{submission_time}}` — Time of submission (e.g. 17:30 IST)

Under the **To Email** field in the template settings, set the recipient email (e.g., `fakhrigrainsbarwani53@gmail.com`). Copy the **Template ID**.

### 4. Public Key
Obtain your **Public Key** from the **Account / API Keys** tab.

### 5. Add Environment Variables
Create a `.env.local` file locally or set these environment variables directly in your **Vercel Project Settings**:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_INQUIRY_EMAIL=fakhrigrainsbarwani53@gmail.com
```

*Note: If no environment variables are defined, the project defaults to the pre-configured sandbox variables in [emailjs-config.ts](file:///c:/Users/saife/Downloads/tea-landing-page/lib/emailjs-config.ts).*

---

## 🌐 Deployment to Vercel (Free Hosting)

This project is fully ready for deployment. Follow this checklist to publish the project:

1. **Commit & Push to GitHub**: Create a new repository on GitHub and push your local commits.
2. **Import to Vercel**: Connect your GitHub account to [Vercel](https://vercel.com/) and import your repository.
3. **Configure Settings**:
   - **Framework Preset**: Next.js (automatically detected)
   - **Build Command**: `next build` (automatically detected)
   - **Install Command**: `pnpm install` (automatically detected)
4. **Environment Variables**: Add the variables from your `.env.local` or `.env.example` in the Project Settings under "Environment Variables".
5. **Deploy**: Click "Deploy". Vercel will build the project and provide a secure, free production URL (e.g., `*.vercel.app`).
