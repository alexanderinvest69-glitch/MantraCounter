# Just Counter

## Overview

A React Native mobile application for tracking mantra recitations and meditation practices. The app allows users to manage up to 10 counter configurations, each with customizable goals, colors, and names. Built with Expo and designed for both iOS and Android platforms, it provides haptic feedback and progress tracking for meditation practices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54
- **Navigation**: React Navigation v7 with bottom tab navigation (2 tabs: Enjoying App, About Us)
- **State Management**: React Context API (`CounterContext`) for global counter and settings state
- **UI Components**: Custom themed components with light/dark mode support
- **Animations**: React Native Reanimated v4 for smooth UI transitions and gesture handling
- **Gesture Handling**: React Native Gesture Handler for enhanced touch interactions

**Key Design Patterns**:
- Context Provider pattern for centralized state management (counters, active counter, app settings)
- Custom hooks for theme management (`useTheme`) and screen insets (`useScreenInsets`)
- Component composition with themed wrappers (`ThemedView`, `ThemedText`)
- Error boundaries for graceful error handling

**Screen Structure**:
1. **Counters Screen**: Main counting interface with large tap zone, circular progress indicator, and counter controls
2. **Add Counter Screen**: Form-based interface with name input, goal selection, and color picker
3. **Profile Screen**: User settings including avatar selection, display name, preferences (haptic/sound toggles), and default goal configuration

**Platform-Specific Features**:
- iOS: Blur effects for tab bar and navigation headers
- Android: Edge-to-edge display with predictive back gesture disabled
- Web: Fallback components for keyboard-aware scroll views

### Data Architecture

**Local State Management**:
- Counter data stored in React Context (in-memory)
- No database currently implemented - data resets on app restart
- Future consideration: AsyncStorage or SQLite for persistence

**Data Models**:
- `Counter`: Contains id, name, count, goal, color, createdAt
- `AppSettings`: User preferences including displayName, avatar, haptic/sound toggles, theme, defaultGoal

**Business Logic**:
- Maximum 10 counters per user
- Goal-based counting with modal notification on goal completion
- Increment/decrement operations with haptic feedback
- Reset functionality with confirmation

### Styling System

**Design Tokens**:
- Centralized theme system in `constants/theme.ts`
- Separate light and dark color palettes
- Consistent spacing scale (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48)
- Typography scale (h1-h4, body, small, link variants)
- Border radius scale for consistent component styling

**Theming Approach**:
- Auto-detection of system color scheme
- Manual theme override capability in settings
- Platform-specific blur and transparency effects

## External Dependencies

### Core Framework
- **Expo SDK 54**: Development platform and build tooling
- **React Native 0.81.5**: Core mobile framework
- **React 19.1.0**: UI library

### Navigation & Routing
- **@react-navigation/native**: Core navigation library
- **@react-navigation/bottom-tabs**: Tab-based navigation
- **@react-navigation/native-stack**: Stack-based screen navigation

### UI & Animations
- **react-native-reanimated**: High-performance animations
- **react-native-gesture-handler**: Enhanced gesture recognition
- **react-native-svg**: SVG rendering for circular progress indicators
- **expo-blur**: Blur effects for iOS navigation components
- **expo-haptics**: Haptic feedback on counter interactions

### Utilities
- **react-native-safe-area-context**: Safe area insets handling
- **react-native-keyboard-controller**: Keyboard-aware components
- **@expo/vector-icons**: Icon library (Feather icons)
- **expo-splash-screen**: Splash screen management
- **expo-status-bar**: Status bar customization

### Development Tools
- **TypeScript 5.9.2**: Type safety
- **ESLint**: Code linting with Expo config
- **Prettier**: Code formatting
- **babel-plugin-module-resolver**: Path aliasing (@/ imports)

### Platform-Specific
- **expo-web-browser**: Web browser integration
- **expo-linking**: Deep linking support
- **expo-constants**: Access to app constants
- **expo-font**: Custom font loading
- **expo-image**: Optimized image component

### Future Considerations
- Persistence layer needed (AsyncStorage, SQLite, or Expo FileSystem)
- Potential cloud sync for multi-device support
- Sound feedback implementation (currently toggled but not implemented)
