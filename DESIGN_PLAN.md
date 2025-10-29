# PrivateMe - Design Plan

## App Identity

**Name:** PrivateMe  
**Tagline:** "Your thoughts, truly private"  
**Color Scheme:**

- Primary: Deep Purple (#6B46C1)
- Secondary: Indigo (#4C51BF)
- Accent: Teal (#38B2AC)
- Background: Dark (#1A202C) / Light (#F7FAFC)
- Success: Green (#48BB78)
- Warning: Orange (#ED8936)
- Error: Red (#F56565)

---

## Screen Architecture

### 1. Authentication Screens

#### Welcome Screen (`/index.tsx`)

- App logo and name
- Tagline
- "Get Started" button → Sign Up
- "Sign In" link → Login

#### Sign Up Screen (`/auth/signup.tsx`)

- Email input
- Password input (with strength indicator)
- Confirm password input
- "Create Account" button
- "Already have an account?" → Login link
- Optional: Social auth buttons (Google, Apple)

#### Login Screen (`/auth/login.tsx`)

- Email input
- Password input
- "Sign In" button
- "Forgot Password?" link
- "Create Account" link → Sign Up

#### Forgot Password Screen (`/auth/forgot-password.tsx`)

- Email input
- "Send Reset Link" button
- Back to login link

---

### 2. Main App Screens (Authenticated)

#### Notes List Screen (`/(tabs)/notes.tsx`)

**Layout:**

- Header:
  - App name/logo
  - Search icon (top right)
  - Sync status indicator
  - Profile icon (top right)
- Search bar (expandable)
- Filter chips: All, Pinned, Tags
- Notes grid/list:
  - Note card showing:
    - Title (bold)
    - Preview (2 lines)
    - Date
    - Tags (chips)
    - Pin indicator
    - Color accent (left border)
- Floating Action Button (FAB): "+" to create note
- Bottom tab bar

**Empty State:**

- Illustration
- "No notes yet"
- "Tap + to create your first note"

#### Note Editor Screen (`/notes/[id].tsx`)

**Layout:**

- Header:
  - Back button
  - Note title (editable)
  - More menu (⋮):
    - Pin/Unpin
    - Change color
    - Add tags
    - Delete
    - Share (future)
- Content area:
  - Rich text editor (starts simple, can enhance)
  - Auto-save indicator
- Footer:
  - Last edited timestamp
  - Word/character count
  - Sync status

#### Search Screen (`/search.tsx`)

- Search input (auto-focus)
- Recent searches
- Search results:
  - Highlighted matches
  - Same card format as notes list
- Filter options:
  - By date range
  - By tags
  - By color

#### Tags Screen (`/(tabs)/tags.tsx`)

- List of all tags with note counts
- Tap tag → filtered notes view
- Add/edit/delete tags
- Tag color customization

#### Trash Screen (`/(tabs)/trash.tsx`)

- List of deleted notes
- Each note shows:
  - Title
  - Deleted date
  - "Days until permanent deletion" countdown
- Actions:
  - Restore note
  - Delete permanently
- "Empty Trash" button (with confirmation)

#### Settings Screen (`/(tabs)/settings.tsx`)

**Sections:**

1. **Account**

   - Email
   - Display name
   - Change password
   - Sign out

2. **Security**

   - Enable biometric unlock
   - Set up PIN
   - Auto-lock timer (1, 5, 15, 30 min, Never)
   - Enable E2EE (future)

3. **Appearance**

   - Theme: Light, Dark, System
   - Note view: Grid, List
   - Font size

4. **Data & Sync**

   - Last sync time
   - Sync now button
   - Pending changes count
   - Export notes
   - Import notes (future)

5. **About**
   - App version
   - Privacy policy
   - Terms of service
   - Contact support

---

## UI Components Library

### Core Components

#### NoteCard

```typescript
Props: {
  note: Note;
  onPress: () => void;
  onLongPress: () => void;
}
```

- Displays note preview
- Shows pin, tags, color
- Swipe actions: Delete, Pin

#### Button

- Primary (filled)
- Secondary (outlined)
- Ghost (text only)
- Sizes: small, medium, large
- Loading state
- Disabled state

#### Input

- Text input
- Secure input (password)
- Search input
- Multiline (textarea)
- With icons
- Error state
- Helper text

#### Tag Chip

- Colored background
- Removable (X icon)
- Clickable

#### EmptyState

- Icon/illustration
- Title
- Description
- Optional action button

#### LoadingSpinner

- Full screen overlay
- Inline spinner
- Pull-to-refresh

#### Modal/BottomSheet

- Confirmation dialogs
- Action sheets
- Form modals

#### Toast/Snackbar

- Success messages
- Error messages
- Info messages
- Undo actions

---

## Navigation Structure

```
Root
├── index (Welcome)
├── auth/
│   ├── signup
│   ├── login
│   └── forgot-password
└── (authenticated)/
    ├── (tabs)/
    │   ├── notes (default)
    │   ├── tags
    │   ├── trash
    │   └── settings
    ├── notes/
    │   ├── [id] (edit)
    │   └── new
    └── search
```

---

## User Interactions

### Gestures

- **Swipe left on note**: Quick delete
- **Swipe right on note**: Pin/Unpin
- **Long press on note**: Multi-select mode
- **Pull down**: Refresh/sync
- **Pinch**: Zoom text (accessibility)

### Animations

- **Screen transitions**: Slide in/out
- **Note creation**: Scale up from FAB
- **Delete**: Fade out + slide
- **Sync**: Rotating icon
- **Success**: Checkmark animation

---

## Offline Experience

### Visual Indicators

- **Offline banner**: "You're offline. Changes will sync when connected."
- **Sync status icons**:
  - ✓ Synced (green)
  - ⟳ Syncing (animated)
  - ⚠ Pending sync (orange)
  - ✗ Sync failed (red)

### Behavior

- All CRUD operations work offline
- Queue changes for sync
- Show pending count in settings
- Retry failed syncs automatically

---

## Accessibility

- **Screen readers**: Full VoiceOver/TalkBack support
- **Dynamic text**: Respect system font size
- **Color contrast**: WCAG AA compliant
- **Touch targets**: Minimum 44x44pt
- **Keyboard navigation**: Tab order, shortcuts

---

## Onboarding Flow

### First Launch

1. Welcome screen with app intro
2. Sign up / Sign in
3. Optional: Quick tutorial (3 screens):
   - "Create notes instantly"
   - "Your data is encrypted"
   - "Access offline anytime"
4. Optional: Enable biometrics
5. → Notes list (empty state)

---

## Error Handling

### Error States

- **Network error**: "Can't connect. Check your internet."
- **Auth error**: "Invalid credentials. Try again."
- **Sync conflict**: "This note was edited elsewhere. Choose version."
- **Storage full**: "Device storage full. Free up space."

### Error UI

- Toast for minor errors
- Modal for critical errors
- Inline errors for form validation
- Retry buttons where applicable

---

## Performance Targets

- **App launch**: < 2 seconds
- **Note open**: < 100ms (from local DB)
- **Search results**: < 300ms
- **Sync**: Background, non-blocking
- **Smooth scrolling**: 60fps

---

## MVP Feature Checklist

### Phase 1 (Current)

- [ ] Welcome/Auth screens
- [ ] Notes list with basic UI
- [ ] Note editor (plain text)
- [ ] Create/edit/delete notes
- [ ] Local storage (SQLite)
- [ ] Basic search
- [ ] Settings screen
- [ ] Light/dark theme

### Phase 2

- [ ] Firebase integration
- [ ] Sync functionality
- [ ] Tags system
- [ ] Trash/soft delete
- [ ] Pin notes
- [ ] Color coding
- [ ] Offline indicator

### Phase 3

- [ ] Biometric auth
- [ ] Auto-lock
- [ ] Rich text editor
- [ ] Note sharing
- [ ] Export/import

---

## Design Mockup Notes

### Typography

- **Headings**: SF Pro Display (iOS) / Roboto (Android)
- **Body**: SF Pro Text / Roboto
- **Monospace**: SF Mono / Roboto Mono (for code blocks)

### Spacing

- Base unit: 4px
- Common spacing: 8px, 12px, 16px, 24px, 32px

### Border Radius

- Small: 4px (chips)
- Medium: 8px (cards, buttons)
- Large: 12px (modals)
- XL: 16px (bottom sheets)

### Shadows

- Small: elevation 2
- Medium: elevation 4
- Large: elevation 8

---

## Development Phases

### Week 1: Foundation

- Project setup
- Navigation structure
- Auth screens UI
- Theme system

### Week 2: Core Features

- Notes list
- Note editor
- Local database
- CRUD operations

### Week 3: Enhancement

- Search
- Tags
- Settings
- Polish UI

### Week 4: Backend

- Firebase setup
- Auth integration
- Sync logic
- Testing

---

## Success Metrics

- User can create account in < 30 seconds
- User can create first note in < 10 seconds
- 99% of operations work offline
- Zero data loss during sync
- App feels fast and responsive
