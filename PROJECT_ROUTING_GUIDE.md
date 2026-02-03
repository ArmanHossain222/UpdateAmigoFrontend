# Amigo Fabrics - E-Commerce Frontend Project Routing Guide

## Project Overview

This is a React-based e-commerce frontend application for "Amigo Fabrics" built with:

- **React 18.3.1** - UI library
- **React Router DOM 6.22.1** - Client-side routing
- **Vite 6.0.5** - Build tool and dev server
- **Tailwind CSS 4.0.2** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP requests
- **Swiper/Slick Carousel** - Image carousels

---

## Project Structure

```
UpdateAmigoFrontend/
├── src/
│   ├── main.jsx                 # Entry point (renders App with Navbar & Footer)
│   ├── App.jsx                  # Main app component with routing configuration
│   ├── index.css                # Global styles
│   ├── App.css                  # App component styles
│   │
│   ├── components/              # Reusable UI components
│   │   ├── AllProducts.jsx      # Product listing component
│   │   ├── Banner.jsx           # Sale banner component
│   │   ├── Card.jsx             # Product card component
│   │   ├── Category.jsx         # Category section
│   │   ├── Customer.jsx         # Customer testimonials
│   │   ├── Feature.jsx          # Feature section
│   │   ├── FlashSale.jsx        # Flash sale section
│   │   ├── NewProduct.jsx       # New arrivals product slider
│   │   ├── ProductDetails.jsx   # Individual product detail page
│   │   └── dkjas.js             # (Utility file)
│   │
│   ├── pages/                   # Page components (routed pages)
│   │   ├── About.jsx            # About page
│   │   ├── Billing.jsx          # Billing/checkout details (BillingDetails2)
│   │   ├── Billings.jsx         # Alternate billing page (BillingDetails)
│   │   ├── Cart.jsx             # Shopping cart page
│   │   ├── Contact.jsx          # Contact form page
│   │   ├── Invoice.jsx          # Invoice page
│   │   ├── login.jsx            # Login page
│   │   ├── order.jsx            # Order page (OrderPage)
│   │   ├── order3.jsx           # (Not used in routing)
│   │   ├── orders.jsx           # Orders list page (OrderCart)
│   │   ├── Privacy.jsx          # Privacy policy page
│   │   ├── register.jsx         # Registration page
│   │   ├── Subcategory.jsx      # Subcategory/category products page
│   │   └── Terms.jsx            # Terms and conditions page
│   │
│   ├── Layout/                  # Layout components
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── Footer.jsx           # Footer
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useViewProductPixels.jsx  # Hook for pixel tracking
│   │
│   └── assets/                  # Static assets
│
├── public/                      # Public assets
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
├── index.html                  # HTML entry point
└── _redirects                  # Deploy redirect rules

```

---

## Complete Routing Configuration

### BrowserRouter Setup

The application uses React Router v6 with `BrowserRouter` for client-side routing.

**Location:** [src/App.jsx](src/App.jsx)

### All Routes

| Route Path                    | Component                | File Location                                                          | Purpose                                                                                            |
| ----------------------------- | ------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/`                           | `<Home />`               | Inline in App.jsx                                                      | Home page with banner, categories, new products, flash sale, products grid, testimonials, features |
| `/products`                   | `<Products />`           | [src/components/AllProducts.jsx](src/components/AllProducts.jsx)       | Browse all products with filtering/search                                                          |
| `/login`                      | `<LoginPage />`          | [src/pages/login.jsx](src/pages/login.jsx)                             | User login page                                                                                    |
| `/register`                   | `<RegisterPage />`       | [src/pages/register.jsx](src/pages/register.jsx)                       | User registration/signup page                                                                      |
| `/billing`                    | `<BillingDetails />`     | [src/pages/Billings.jsx](src/pages/Billings.jsx)                       | Billing address and checkout page                                                                  |
| `/billings`                   | `<BillingDetails2 />`    | [src/pages/Billing.jsx](src/pages/Billing.jsx)                         | Alternate billing/checkout page                                                                    |
| `/new-arrivals`               | `<ProductSlider />`      | [src/components/NewProduct.jsx](src/components/NewProduct.jsx)         | New arrival products slider page                                                                   |
| `/about`                      | `<About />`              | [src/pages/About.jsx](src/pages/About.jsx)                             | About company page                                                                                 |
| `/cart`                       | `<CartPage />`           | [src/pages/Cart.jsx](src/pages/Cart.jsx)                               | Shopping cart page - manage items, quantities, checkout                                            |
| `/contact`                    | `<Contact />`            | [src/pages/Contact.jsx](src/pages/Contact.jsx)                         | Contact form page                                                                                  |
| `/category/:category_name`    | `<SubCategoryPage />`    | [src/pages/Subcategory.jsx](src/pages/Subcategory.jsx)                 | Category-specific products page (dynamic route)                                                    |
| `/order`                      | `<OrderPage />`          | [src/pages/order.jsx](src/pages/order.jsx)                             | Order placement/confirmation page                                                                  |
| `/orders`                     | `<OrderCart />`          | [src/pages/orders.jsx](src/pages/orders.jsx)                           | User's orders list page                                                                            |
| `/terms&condition`            | `<TermsAndConditions />` | [src/pages/Terms.jsx](src/pages/Terms.jsx)                             | Terms and conditions page                                                                          |
| `/privacy&policy`             | `<PrivacyPolicy />`      | [src/pages/Privacy.jsx](src/pages/Privacy.jsx)                         | Privacy policy page                                                                                |
| `/productDetails/:product_id` | `<ProductDetails />`     | [src/components/ProductDetails.jsx](src/components/ProductDetails.jsx) | Individual product details page (dynamic route)                                                    |

---

## Layout Structure

Every page includes:

- **Navbar** - [src/Layout/Navbar.jsx](src/Layout/Navbar.jsx) - Navigation menu
- **Page Content** - Specific route component
- **Footer** - [src/Layout/Footer.jsx](src/Layout/Footer.jsx) - Footer with links

**Rendered from:** [src/main.jsx](src/main.jsx)

---

## Home Page Components (Route: `/`)

The home page (`<Home />` component) includes multiple sections:

1. **SaleBanner** - [src/components/Banner.jsx](src/components/Banner.jsx)
   - Displays promotional banners
2. **CategorySection** - [src/components/Category.jsx](src/components/Category.jsx)
   - Product categories navigation
3. **NewProductCard** - [src/components/NewProduct.jsx](src/components/NewProduct.jsx)
   - Carousel of new arrival products
4. **FlashSale** - [src/components/FlashSale.jsx](src/components/FlashSale.jsx)
   - Limited time sale products
5. **ProductGrid** - [src/components/Card.jsx](src/components/Card.jsx)
   - Grid of featured products
6. **CustomerSlider** - [src/components/Customer.jsx](src/components/Customer.jsx)
   - Customer testimonials carousel
7. **FeatureSection** - [src/components/Feature.jsx](src/components/Feature.jsx)
   - Key features/benefits section

---

## Dynamic Routes

### 1. Category Route

**Route:** `/category/:category_name`

- **Component:** `SubCategoryPage` - [src/pages/Subcategory.jsx](src/pages/Subcategory.jsx)
- **Parameter:** `category_name` - The name of the product category
- **Purpose:** Display products filtered by category
- **Example URLs:**
  - `/category/fabrics`
  - `/category/dresses`
  - `/category/accessories`

### 2. Product Details Route

**Route:** `/productDetails/:product_id`

- **Component:** `ProductDetails` - [src/components/ProductDetails.jsx](src/components/ProductDetails.jsx)
- **Parameter:** `product_id` - The unique ID of the product
- **Purpose:** Display detailed information about a specific product
- **Features:**
  - Product images with zoom functionality
  - Price and availability
  - Size guide
  - Add to cart functionality
  - Product reviews/ratings
  - Related products
- **Example URLs:**
  - `/productDetails/12345`
  - `/productDetails/prod-001`

---

## Navigation Flow

```
Home (/)
├── Categories → /category/:category_name
├── New Arrivals → /new-arrivals
├── Products → /products
└── Product Card → /productDetails/:product_id

Navbar Navigation:
├── Home → /
├── Products → /products
├── Cart → /cart
├── About → /about
├── Contact → /contact
├── Login → /login
├── Register → /register
└── Footer Links:
    ├── Terms → /terms&condition
    ├── Privacy → /privacy&policy
    ├── About → /about
    └── Contact → /contact

Shopping Flow:
Products (/products or /productDetails/:id)
    ↓
Add to Cart → Cart (/cart)
    ↓
Checkout → Billing (/billing or /billings)
    ↓
Order → Order (/order)
    ↓
Orders List → /orders
```

---

## Key Components Details

### 1. AllProducts.jsx

**Route:** `/products`

- Displays all products with search and filter functionality
- Product cards show:
  - Product image
  - Name and price
  - Star rating
  - Add to cart button
  - Favorite/wishlist button
  - Quick view option
- Links to `/productDetails/:product_id` for detailed view

### 2. ProductDetails.jsx

**Route:** `/productDetails/:product_id`

- Detailed product information page
- Features:
  - Multiple product images with zoom
  - Product description
  - Size guide
  - Size selector
  - Quantity selector
  - Add to cart button
  - Share functionality
  - Related/recommended products

### 3. Cart.jsx

**Route:** `/cart`

- Shopping cart management
- Features:
  - List all cart items
  - Adjust quantities
  - Remove items
  - Size guide modal
  - Promo code input
  - Cart total calculation
  - Proceed to checkout button (navigates to `/billing`)

### 4. Billing.jsx (BillingDetails2)

**Route:** `/billing`

- Billing address form
- Features:
  - Recipient details
  - Address information
  - Delivery options
  - Additional notes
  - Order summary
  - Place order button

### 5. Billings.jsx (BillingDetails)

**Route:** `/billings`

- Alternate checkout page
- Similar to `/billing` with different styling/layout

### 6. Order.jsx

**Route:** `/order`

- Order confirmation/placement page
- Features:
  - Order details display
  - Order number
  - Estimated delivery
  - Continue shopping option

### 7. Orders.jsx

**Route:** `/orders`

- User's order history
- Features:
  - List of all user orders
  - Order status
  - Order date
  - Order total
  - Track order option

### 8. Subcategory.jsx

**Route:** `/category/:category_name`

- Products filtered by category
- Dynamic route parameter: `category_name`
- Displays products specific to selected category

### 9. Contact.jsx

**Route:** `/contact`

- Contact form for customer inquiries
- Features:
  - Contact form with name, email, subject, message
  - Company contact information
  - Business hours
  - Location map (if available)

### 10. About.jsx

**Route:** `/about`

- Company information page
- Features:
  - Company story
  - Mission/vision
  - Team information
  - Values

### 11. Login.jsx

**Route:** `/login`

- User authentication page
- Features:
  - Email/username input
  - Password input
  - Login button
  - Registration link

### 12. Register.jsx

**Route:** `/register`

- User account creation page
- Features:
  - Name, email, password inputs
  - Password confirmation
  - Terms acceptance
  - Register button
  - Login link

### 13. Privacy.jsx

**Route:** `/privacy&policy`

- Privacy policy page
- Legal/compliance information

### 14. Terms.jsx

**Route:** `/terms&condition`

- Terms and conditions page
- Legal/compliance information

---

## Contact Section (Floating Widget)

**Location:** [src/App.jsx](src/App.jsx) - `ContactSection` component

- Floating chat bubble in bottom-right corner
- Expandable contact options:
  - **Phone:** Call support at +8801734734246
  - **WhatsApp:** Chat on WhatsApp at +8801734734246
- Animated with Framer Motion
- Auto-hides after 5 seconds

---

## LocalStorage Data Management

The application uses browser localStorage for:

1. **Cart Data:** `cart` key
   - Stores product objects with quantities
   - Cleared on home page mount
   - Used in Cart page calculations

2. **Order Data:** `carts` key (referenced in code)
   - May store completed orders or pending data

---

## Hooks

### useViewProductPixels

**Location:** [src/hooks/useViewProductPixels.jsx](src/hooks/useViewProductPixels.jsx)

- Custom hook for pixel/analytics tracking
- Used in ProductDetails component
- Tracks product view events

---

## Animation & UI Libraries

1. **Framer Motion** - Complex animations and transitions
2. **Lucide React** - Icon library
3. **React Hot Toast** - Notification toasts
4. **React Toastify** - Alternative toast library
5. **Swiper** - Image carousels
6. **React Slick** - Alternative carousel
7. **React Multi Carousel** - Additional carousel option
8. **React Inner Image Zoom** - Product image zoom functionality

---

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Fix audit vulnerabilities
npm audit fix
```

---

## Build Configuration

- **Build Tool:** Vite 6.0.5
- **Config File:** [vite.config.js](vite.config.js)
- **Plugins:** React, Tailwind CSS
- **Output:** Optimized static files

---

## Deployment

- **Netlify Redirects:** [\_redirects](_redirects) file handles SPA routing redirects

---

## Summary

This e-commerce frontend has 16 main routes covering:

- ✅ Product browsing and search
- ✅ Product details with dynamic parameters
- ✅ Shopping cart management
- ✅ Multi-step checkout (billing)
- ✅ Order management
- ✅ User authentication
- ✅ Category filtering
- ✅ Contact and support
- ✅ Legal pages (Terms, Privacy)
- ✅ Company information (About)

All pages are wrapped with consistent navigation (Navbar) and footer layout, with smooth animations and modern UI design using Tailwind CSS and Framer Motion.
