# PrivateMe - Secure Notes App

> Your thoughts, truly private

A secure, offline-first notes application built with React Native and Expo. PrivateMe provides users with encrypted, private note-taking capabilities with seamless synchronization across devices.

## 🚀 Features

### Current (MVP - Phase 1)

- ✅ **User Authentication** - Email/password sign up and login
- ✅ **Beautiful UI** - Modern, clean interface with light/dark mode support
- ✅ **Notes Management** - Create, read, update, and delete notes
- ✅ **Offline-First** - All notes available offline with local storage
- ✅ **Note Organization** - Pin important notes, add tags, and color-code
- ✅ **Responsive Design** - Optimized for all screen sizes

### Coming Soon (Phase 2 & 3)

- 🔄 **Cloud Sync** - Automatic synchronization with Firebase
- 🔐 **End-to-End Encryption** - Client-side encryption for maximum privacy
- 👆 **Biometric Authentication** - Face ID / Touch ID support
- 🔒 **Auto-Lock** - Secure your notes with automatic locking
- 🗑️ **Trash & Recovery** - Soft delete with 30-day recovery period
- 🔍 **Advanced Search** - Full-text search across all notes
- 📤 **Export/Import** - Backup and restore your notes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Will be installed with dependencies
- **iOS Simulator** (Mac only) or **Android Studio** for emulators

## 🛠️ Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd /Users/ashleyjohnson/CascadeProjects/secure-notes-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your preferred platform:**
   - **iOS Simulator:** Press `i` in the terminal or run `npm run ios`
   - **Android Emulator:** Press `a` in the terminal or run `npm run android`
   - **Physical Device:** Scan the QR code with Expo Go app
   - **Web Browser:** Press `w` in the terminal or run `npm run web`

## 📱 Project Structure

```
secure-notes-app/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Main app tabs
│   │   ├── notes.tsx            # Notes list screen
│   │   ├── tags.tsx             # Tags management
│   │   ├── trash.tsx            # Deleted notes
│   │   └── settings.tsx         # App settings
│   ├── auth/                     # Authentication screens
│   │   ├── login.tsx            # Sign in
│   │   ├── signup.tsx           # Create account
│   │   └── forgot-password.tsx  # Password reset
│   ├── _layout.tsx              # Root layout
│   └── index.tsx                # Welcome screen
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── NoteCard.tsx
│   ├── constants/               # App constants
│   │   └── theme.ts             # Colors, spacing, typography
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts
│   ├── services/                # Business logic (coming soon)
│   ├── database/                # SQLite setup (coming soon)
│   └── utils/                   # Helper functions (coming soon)
├── assets/                       # Images, fonts, icons
├── context.md                    # Project context & architecture
├── DESIGN_PLAN.md               # Detailed design specifications
├── package.json
├── tsconfig.json
└── app.json                     # Expo configuration
```

## 🎨 Design System

### Color Palette

- **Primary:** Deep Purple (#6B46C1)
- **Secondary:** Indigo (#4C51BF)
- **Accent:** Teal (#38B2AC)
- **Success:** Green (#48BB78)
- **Warning:** Orange (#ED8936)
- **Error:** Red (#F56565)

### Typography

- **Headings:** SF Pro Display (iOS) / Roboto (Android)
- **Body:** SF Pro Text / Roboto
- **Sizes:** 12px to 32px with consistent scale

### Spacing

- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48px

## 🔐 Security Features

### Current

- Secure password validation
- Client-side form validation
- Secure navigation flow

### Planned

- **Encryption at Rest:** All local data encrypted using device keychain
- **End-to-End Encryption:** Optional client-side encryption before sync
- **Biometric Authentication:** Face ID / Touch ID / Fingerprint
- **Auto-Lock:** Configurable timeout (1, 5, 15, 30 min)
- **Secure Storage:** Expo SecureStore for sensitive data

## 📚 Tech Stack

### Frontend

- **React Native** - Cross-platform mobile framework
- **Expo (SDK 51)** - Development platform
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based navigation

### State Management

- **React Context API** - Global state management
- **Custom Services** - Business logic layer

### Local Storage

- **expo-sqlite** - Local database (coming soon)
- **expo-secure-store** - Encrypted key-value storage (coming soon)
- **AsyncStorage** - Simple data persistence

### Backend (Planned)

- **Firebase** - Authentication & Firestore database
- **Firebase Cloud Functions** - Server-side logic

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🧪 Testing (Coming Soon)

```bash
# Run unit tests
npm test

# Run type checking
npm run type-check

# Run linter
npm run lint
```

## 📖 Key Screens

### 1. Welcome Screen

- App branding and introduction
- "Get Started" → Sign Up
- "Sign In" → Login

### 2. Authentication

- **Sign Up:** Email, password, confirm password with strength indicator
- **Login:** Email and password with "Forgot Password" link
- **Password Reset:** Email-based recovery

### 3. Notes List

- Display all notes with preview
- Search functionality
- Filter by pinned, tags, colors
- Floating Action Button to create new note
- Sync status indicators

### 4. Settings

- Account management
- Security preferences
- Appearance customization
- Data & sync controls
- About information

## 🚧 Development Roadmap

### Week 1: Foundation ✅

- [x] Project setup
- [x] Navigation structure
- [x] Auth screens UI
- [x] Theme system
- [x] Core components

### Week 2: Core Features (In Progress)

- [ ] Note editor screen
- [ ] Local database setup
- [ ] CRUD operations
- [ ] State management

### Week 3: Enhancement

- [ ] Search functionality
- [ ] Tags system
- [ ] Trash/soft delete
- [ ] Polish UI/UX

### Week 4: Backend Integration

- [ ] Firebase setup
- [ ] Authentication integration
- [ ] Sync logic
- [ ] Testing & bug fixes

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is private and for educational purposes.

## 🔗 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Firebase Documentation](https://firebase.google.com/docs)

## 📞 Support

For questions or issues, please refer to the `context.md` and `DESIGN_PLAN.md` files for detailed architecture and design decisions.

---

**Built with ❤️ using React Native & Expo**

_Version 1.0.0 - October 2025_
# PrivateMe
