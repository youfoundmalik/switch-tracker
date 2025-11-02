# Testing Checklist - Health Tracker

This document provides a comprehensive testing checklist based on the project requirements and acceptance criteria.

## Pre-Testing Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Verify application loads at `http://localhost:3000`
   - Verify no console errors on initial load

3. **Verify Build**
   ```bash
   npm run build
   ```
   - Verify build completes without errors
   - Verify `dist` directory is created with production files

## Acceptance Criteria Tests

### Application Loads Without Errors
- [ ] Application opens at `/login` route
- [ ] No console errors or warnings
- [ ] Login form is visible and functional
- [ ] No TypeScript compilation errors (`npx tsc --noEmit`)

### Medication Management

#### Add Medication
- [ ] Can navigate to dashboard after login
- [ ] Can open "Add Medication" modal/form
- [ ] Form accepts medication name (e.g., "Lisinopril")
- [ ] Form accepts dosage (e.g., "20mg")
- [ ] Form accepts frequency (e.g., "Once daily in the morning")
- [ ] Submit button is disabled during loading state (1.5s delay)
- [ ] Success toast appears after adding medication
- [ ] New medication appears in medication list immediately (no refresh needed)
- [ ] Form resets after successful submission
- [ ] Modal closes after successful submission

#### View Medications
- [ ] Medication list displays all added medications
- [ ] Each medication shows name, dosage, and frequency clearly
- [ ] Empty state displays when no medications exist
- [ ] Empty state shows "Add Medication" button

#### Remove Medication
- [ ] Each medication has a "Remove" button
- [ ] Remove button shows loading state during removal (1.5s delay)
- [ ] Medication is removed from list immediately after removal
- [ ] Other medications remain intact when one is removed
- [ ] Loading state is per-item (only the removed item shows loading)

#### Medication Persistence
- [ ] Add a medication, refresh browser
- [ ] Medication list loads from localStorage and displays all medications
- [ ] Medications persist across browser sessions
- [ ] Clear localStorage and verify medications are empty

### Vital Signs Logging

#### Log Vitals
- [ ] Can open "Log Vitals" modal/form
- [ ] Form accepts systolic blood pressure (e.g., 120)
- [ ] Form accepts diastolic blood pressure (e.g., 80)
- [ ] Form accepts heart rate in BPM (e.g., 65)
- [ ] Form accepts weight (e.g., 150)
- [ ] Submit button is disabled during loading state (1.5s delay)
- [ ] Success toast appears after logging vitals
- [ ] New vital entry appears in vitals log immediately (no refresh needed)
- [ ] Form resets after successful submission
- [ ] Modal closes after successful submission

#### View Vitals Log
- [ ] Vitals log displays all logged entries
- [ ] Each entry shows date and time (formatted as "2nd November 2025 - 19:44")
- [ ] Each entry shows systolic/diastolic blood pressure
- [ ] Each entry shows heart rate in BPM
- [ ] Each entry shows weight
- [ ] Vitals are sorted with newest entry first (reverse chronological order)
- [ ] Empty state displays when no vitals exist
- [ ] Empty state shows "Log Vitals" button

#### Vitals Persistence
- [ ] Log vitals, refresh browser
- [ ] Vitals log loads from localStorage and displays all entries
- [ ] Vitals persist across browser sessions
- [ ] Clear localStorage and verify vitals log is empty

### User Authentication

#### Login
- [ ] Login page is accessible at `/login`
- [ ] Login form accepts username input
- [ ] Can login with `sarah.johnson`
- [ ] Can login with `michael.chen`
- [ ] Can login with `emily.davis`
- [ ] Login with invalid username shows error toast
- [ ] Login button shows loading state during login (1.5s delay)
- [ ] Success toast appears on successful login
- [ ] After successful login, redirects to `/dashboard` after 2 seconds
- [ ] Authenticated user cannot access `/login` (redirects to `/dashboard`)

#### Logout
- [ ] Logout button is visible in dashboard header
- [ ] Clicking logout shows loading state (1.5s delay)
- [ ] After logout, redirects to `/login`
- [ ] After logout, cannot access `/dashboard` (redirects to `/login`)
- [ ] Current user session is cleared from localStorage

#### Auto-Logout (Inactivity)
- [ ] Login and navigate to dashboard
- [ ] Do not interact with the page for 5 minutes
- [ ] Verify user is automatically logged out
- [ ] Verify redirect to `/login` after auto-logout
- [ ] Verify activity tracking works (move mouse, type, scroll resets timer)

#### Route Protection
- [ ] Access `/dashboard` without logging in → redirects to `/login`
- [ ] Access `/login` while logged in → redirects to `/dashboard`
- [ ] Access `/` → redirects to `/login` (if not authenticated) or `/dashboard` (if authenticated)

### User-Specific Data Isolation

#### Data Separation
- [ ] Login as `sarah.johnson`, add a medication
- [ ] Logout and login as `michael.chen`
- [ ] Verify `michael.chen` does not see `sarah.johnson`'s medications
- [ ] Add medication for `michael.chen`
- [ ] Logout and login as `sarah.johnson` again
- [ ] Verify `sarah.johnson` still has their original medication
- [ ] Verify `sarah.johnson` does not see `michael.chen`'s medication
- [ ] Repeat same test with vitals logging

### Component Architecture

#### Code Structure
- [ ] Components are well-organized in logical folders
- [ ] Components are reusable and composable
- [ ] No single "giant" component doing everything
- [ ] Clear separation between route components, feature components, and base UI components
- [ ] Custom hooks are used for state management (`useMedications`, `useVitals`)

## Additional Feature Tests

### Toast Notifications

#### Login Scope
- [ ] Error toast appears below login card for invalid login
- [ ] Success toast appears below login card for successful login
- [ ] Toast animates in from bottom
- [ ] Toast auto-closes after 3 seconds
- [ ] Toast does not appear in dashboard after navigation

#### Dashboard Scope
- [ ] Success toast appears on left side when adding medication
- [ ] Success toast appears on left side when logging vitals
- [ ] Toast animates in from left
- [ ] Toast auto-closes after 3 seconds
- [ ] Toast does not appear in login page

### Loading States

- [ ] Login button shows "Logging in..." during login
- [ ] Add Medication button shows "Adding..." during add operation
- [ ] Remove button shows "Removing..." for the specific item being removed
- [ ] Log Vitals button shows "Logging..." during log operation
- [ ] Logout button shows loading state during logout

### Timestamps

- [ ] Vital entry timestamps display in format: "2nd November 2025 - 19:44"
- [ ] Date shows with ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
- [ ] Time shows in 24-hour format (HH:MM)
- [ ] Timestamps are accurate to when vitals were logged

### Responsive Design

- [ ] Application works on mobile viewport (test with browser dev tools)
- [ ] Application works on tablet viewport
- [ ] Application works on desktop viewport
- [ ] Layout adjusts appropriately for different screen sizes
- [ ] Forms are usable on mobile devices

## Local Storage Tests

### Storage Keys
- [ ] Verify `switch-health-current-user` key exists after login
- [ ] Verify `switch-health-meds-{username}` key exists after adding medication
- [ ] Verify `switch-health-vitals-{username}` key exists after logging vitals
- [ ] Verify storage keys use correct prefix (`switch-health-`)

### Data Format
- [ ] Current user data includes `username` and `lastActivity` fields
- [ ] Medication data is array of objects with `id`, `name`, `dosage`, `frequency`
- [ ] Vitals data is array of objects with `id`, `systolic`, `diastolic`, `heartRate`, `weight`, `timestamp`
- [ ] All data is properly JSON serialized/deserialized

## Browser Compatibility

- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Verify localStorage works in all browsers
- [ ] Verify no browser-specific errors

## Edge Cases

- [ ] Handle empty form submissions (should not add empty data)
- [ ] Handle invalid numeric inputs in vitals form
- [ ] Handle very long medication names/dosages/frequencies (UI doesn't break)
- [ ] Handle rapid clicking of buttons (should not cause duplicate entries)
- [ ] Handle browser back/forward navigation
- [ ] Handle page refresh during loading states

## Performance

- [ ] Application loads quickly (< 2 seconds on decent connection)
- [ ] Interactions feel responsive (loading states provide feedback)
- [ ] No memory leaks (test by repeatedly adding/removing items)
- [ ] No unnecessary re-renders (check React DevTools Profiler if available)

## Final Verification

- [ ] All acceptance criteria are met
- [ ] README.md is accurate and complete
- [ ] All features are functional
- [ ] No console errors or warnings
- [ ] Application is ready for deployment

