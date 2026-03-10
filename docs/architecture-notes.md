# BioDesk Architecture Notes

## Major Decisions

1. **Expo-managed React Native app for fast runnable scaffold**
   - Chosen to keep setup simple (`npm install && npm start`) without native project bootstrapping overhead.

2. **SQLite as the only persistence layer**
   - `expo-sqlite` powers all local storage: products, FTS index, and leads.
   - No backend or auth wiring added by design.

3. **FTS5 virtual table for product search**
   - Created `products_fts` virtual table linked to the `products` content table.
   - Search is implemented against `name` and `active_ingredient` with prefix matching.

4. **Admin PIN as local gate for protected actions**
   - Added a PIN gate screen before utilities like seed-data import.
   - PIN is static demo data and intentionally local-only for this scaffold.

5. **Simple stack navigation + home grid**
   - Home screen is a grid launcher for all modules.
   - Product list/detail, lead capture, admin utility, and document/video placeholders are separate screens.

6. **Seed data strategy**
   - Seeds are imported on app startup so product screens are usable immediately.
   - Admin utility can re-import/refresh seeds when needed.

7. **No binary app assets in repo**
   - Removed icon/splash PNG files and kept `app.json` minimal to avoid PR tooling failures that reject binary files.
   - Expo can still run with default generated assets in development.

8. **Graceful startup + search fallback**
   - Wrapped DB bootstrap in app-level readiness/error UI so users no longer see a blank screen if local DB init fails.
   - Added fallback `LIKE` search when FTS5 is unavailable on a runtime/device.
