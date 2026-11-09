HARVESTLINK - HTML + CSS + JAVASCRIPT PROTOTYPE

Open index.html in a browser to begin (no server needed).

JAVASCRIPT FILES (js/)
- utils.js      validation, formatting, DOM helpers, toast messages, image resize
- store.js      browser "database" (localStorage) + demo data. Replace with API calls later.
- auth.js       register, login, logout, role-based page guards, navigation
- script.js     footer year, active menu link, mobile menu, back-to-top
- products.js   home featured products, search/filter/sort/pagination, product details,
                place order, farmer add/edit product
- orders.js     consumer orders, farmer order management, order details workflow
- dashboard.js  farmer, consumer, collector, driver and admin dashboards
- messages.js   conversations and chat
- profile.js    profile, location, settings, change password
- complaints.js complaints + admin responses, contact form

DEMO ACCOUNTS (password for all: Harvest123)
- farmer@harvestlink.test
- consumer@harvestlink.test
- collector@harvestlink.test
- driver@harvestlink.test
- admin@harvestlink.test

ORDER WORKFLOW TO TRY
1. Consumer places an order on a product page.
2. Farmer accepts it (Manage Orders or Order Details).
3. Collector: Start Collection, then Confirm Collection.
4. Driver: Start Delivery, then Confirm Delivery.
5. Consumer: Confirm Receipt -> order Completed, payment Paid.

IMPORTANT
Data is stored only in this browser (localStorage). Clearing site data resets everything;
run HL.resetDemoData() in the browser console to restore the demo data.
Passwords are hashed in the browser for prototype purposes only - real authentication and
authorization must be implemented on the server (Node.js/Express + MySQL, next stage).
Never use real payment credentials or sensitive banking details in this prototype.

BACKEND ROADMAP
Stage 1 (included): Node.js/Express + MySQL foundation and secure authentication API. See backend/README.md.
Stage 2: Connect login/register pages to API and replace browser-only sessions.
Stage 3: Move products and inventory to MySQL.
Stage 4: Move orders and delivery workflow to transactional API endpoints.
Stage 5: Messages, complaints, admin tools, uploads, deployment and production hardening.

STAGE 2: Login and registration connect to the Express/MySQL API using an HttpOnly cookie. See backend/README.md.
