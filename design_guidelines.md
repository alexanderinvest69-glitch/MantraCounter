# Mantra Counter App - Design Guidelines

## Architecture Decisions

### Authentication
**No authentication required** - This is a single-user utility app with local data storage.

**Profile/Settings Screen Required:**
- User-customizable avatar (generate 3 meditation-themed preset avatars: lotus flower, Om symbol, meditation pose silhouette)
- Display name field (default: "Practitioner")
- App preferences:
  - Haptic feedback toggle
  - Sound feedback toggle
  - Theme selection (light/dark/sepia)
  - Default goal count (108, 216, 432, 1008, custom)

### Navigation
**Tab Navigation (3 tabs):**
1. **Counters** (Home) - Main counter interface and quick-access list
2. **Add Counter** (Center, primary action) - Create new counter configuration
3. **Profile** - Settings and customization

**Information Architecture:**
- Primary flow: Select counter → Count → Reach goal → Reset
- Secondary flow: Manage counter configurations
- Settings flow: Customize app preferences

## Screen Specifications

### 1. Counters Screen (Home)
**Purpose:** Active counting and counter management

**Layout:**
- **Header:** Transparent, custom navigation header
  - Left: Counter name (tappable dropdown)
  - Right: Info icon (shows counter stats)
  - No search bar
- **Main Content:** Non-scrollable, fixed layout
  - Top third: Current count display (extra large typography)
  - Middle: Large circular progress indicator (fills to goal)
  - Center: Massive tap zone for increment (70% of screen)
  - Bottom: Control buttons row (reset, -1, settings)
- **Floating Elements:** None
- **Safe Area Insets:**
  - Top: headerHeight + Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Animated count display (scales on increment)
- Circular progress ring (strokeWidth: 8)
- Haptic feedback trigger at goal
- Reset confirmation modal
- Counter switcher dropdown (appears from header)

### 2. Add/Edit Counter Screen
**Purpose:** Configure new counter or edit existing

**Layout:**
- **Header:** Default navigation header
  - Left: Cancel button
  - Right: Save button
  - Title: "New Counter" or "Edit Counter"
- **Main Content:** Scrollable form
- **Safe Area Insets:**
  - Top: Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Text input: Counter name (max 20 chars)
- Number input: Goal count (stepper interface)
- Color picker: Theme color (8 preset colors)
- Preview card: Shows how counter will appear
- Delete button (edit mode only, bottom of form)

### 3. Profile/Settings Screen
**Purpose:** App customization and preferences

**Layout:**
- **Header:** Default navigation header
  - Title: "Profile"
  - No buttons
- **Main Content:** Scrollable list
- **Safe Area Insets:**
  - Top: Spacing.xl
  - Bottom: tabBarHeight + Spacing.xl

**Components:**
- Avatar selector (horizontally scrollable)
- Text input: Display name
- Toggle switches: Haptic, Sound, Notifications
- Segmented control: Theme selection
- Number picker: Default goal count
- List item: About/Help (opens modal)

## Design System

### Color Palette
**Primary:** Deep meditation purple (#6B4BA6)
**Accent:** Warm gold (#D4A574)
**Success:** Soft green (#4CAF50) - for goal completion
**Background (Light):** Off-white (#F8F7F4)
**Background (Dark):** Deep navy (#1A1A2E)
**Text Primary:** #1F1F1F / #F5F5F5 (light/dark)
**Text Secondary:** #666666 / #B0B0B0

### Typography
- **Count Display:** SF Pro Display, 96pt, Bold
- **Counter Name:** SF Pro Text, 18pt, Semibold
- **Goal Progress:** SF Pro Text, 14pt, Regular
- **Body:** SF Pro Text, 16pt, Regular
- **Button Labels:** SF Pro Text, 16pt, Medium

### Spacing Scale
- xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48

### Touch Targets
- Minimum: 44x44pt (Apple HIG)
- Primary action (increment zone): Full screen width, 60% height
- Secondary actions: 56x56pt

## Visual Design

### Icons
- Use SF Symbols for iOS / Feather icons for cross-platform
- Tab bar icons: grid (counters), plus-circle (add), user (profile)
- Action icons: rotate-ccw (reset), minus-circle, info

### Interaction Design
**Primary Counter Button:**
- No drop shadow (integrated into screen)
- Press state: Scale down to 0.98, opacity 0.9
- Ripple animation on tap (expanding circle from touch point)
- Number scales up 1.1x briefly on increment

**Floating Action (if used):**
- Drop shadow specifications:
  - shadowOffset: {width: 0, height: 2}
  - shadowOpacity: 0.10
  - shadowRadius: 2

**Haptic Feedback:**
- Light impact: On each count increment
- Medium impact: On decrement
- Heavy impact + sustained vibration (0.5s): On reaching goal
- Success notification: On reset confirmation

**Animations:**
- Count increment: Spring animation (tension: 300, friction: 20)
- Progress ring: Linear fill with easeOut
- Goal celebration: Confetti particle effect (brief, subtle)
- Screen transitions: Slide from right (standard iOS)

### Accessibility
- VoiceOver labels: "Count: [number]", "Increment counter", "Reset counter"
- Dynamic Type support: Scale count display (max 120pt)
- High contrast mode: Increase border widths, boost color saturation
- Reduce motion: Disable particle effects, use fade instead of scale
- Color blindness: Don't rely solely on color for progress indication

### Required Assets
**Generated Assets (meditation-themed):**
1. Lotus flower avatar (minimalist line art, primary color)
2. Om symbol avatar (circular, gold accent)
3. Meditation pose avatar (silhouette, calming gradient)

**System Icons Only:**
- All UI actions use SF Symbols/Feather icons
- No custom navigation icons needed

### Edge Cases & Confirmations
- Reset confirmation: Alert dialog with "Cancel" and "Reset" (destructive)
- Accidental volume button press: No confirmation, allow quick undo with opposite button
- Reaching goal: Celebratory modal with "Continue Counting" and "Reset" options
- Maximum count: Cap at 9999, show gentle alert
- Delete counter: Requires swipe-to-delete gesture + confirmation alert