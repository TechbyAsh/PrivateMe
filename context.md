# Secure Notes App - Project Context

## Project Overview

A secure, offline-first notes application built with React Native/Expo that provides users with private, encrypted note-taking capabilities with robust synchronization.

**Created:** 2025-10-17  
**Tech Stack:** React Native, Expo (managed), TypeScript, Expo Router, Firebase

---

## Core Goals & Assumptions

### Primary Goal

Each user can create, read, update, and delete notes with complete privacy - only they can see their notes.

### Key Principles

1. **Security & Privacy First**: Strong access control + encryption at rest, with optional E2EE
2. **Offline-First Architecture**: Notes available offline, sync when online
3. **User Experience**: Seamless, fast, and intuitive note-taking
4. **Data Ownership**: Users have full control over their data

---

## Technical Stack

### Frontend

- **Framework**: React Native with Expo (managed workflow)
- **Language**: TypeScript (strict mode)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API + custom services
- **Local Storage**:
  - SQLite (expo-sqlite) for structured data
  - Expo SecureStore for sensitive data (encryption keys, tokens)
  - Expo FileSystem for attachments (future)

### Backend

- **Primary Option**: Firebase
  - Firestore (database)
  - Firebase Authentication
  - Firebase Cloud Functions (server-side logic)
- **Alternative Options**: Supabase, Backendless, or custom REST API

### Security & Encryption

- **At-Rest Encryption**: All local data encrypted using device keychain
- **E2EE (Optional)**: Client-side encryption before server sync
- **Biometric Auth**: Face ID / Touch ID / Fingerprint
- **Local PIN**: Fallback authentication method

---

## User Flows

### 1. Authentication Flow

#### Sign Up

1. User enters email + password (or OAuth: Apple/Google)
2. Optional: Email verification sent
3. Backend creates user record
4. Initialize encryption keys (if E2EE enabled)
5. Create local database
6. Navigate to main app

#### Login

1. User authenticates (email/password or OAuth)
2. Receive and store session tokens securely
3. Initialize user encryption state
4. Load local notes from SQLite
5. Trigger background sync
6. Navigate to notes list

#### Forgot Password

1. User requests password reset
2. Backend sends reset email
3. User follows link and sets new password
4. Re-authenticate and sync

#### Biometric/PIN Setup

1. After initial login, prompt for biometric enrollment
2. Store biometric preference in SecureStore
3. Optional: Set up backup PIN
4. For subsequent app opens: biometric → unlock local DB
5. Server operations still require valid session token

---

### 2. Note Lifecycle

#### Create Note

```
User creates note
  ↓
Generate unique ID (UUID)
  ↓
Encrypt content (if E2EE enabled)
  ↓
Save to local SQLite (status: 'pending_sync')
  ↓
Update UI immediately
  ↓
Background: Sync to server when online
  ↓
Update status to 'synced'
```

#### Read Note

```
User opens note
  ↓
Load from local SQLite
  ↓
If not found locally → fetch from server
  ↓
Decrypt content (if E2EE)
  ↓
Display to user
```

#### Update Note

```
User edits note
  ↓
Update local copy immediately
  ↓
Mark as 'dirty' with updatedAt timestamp
  ↓
Increment version number
  ↓
Background: Sync changes to server
  ↓
Handle conflicts if server version differs
```

#### Delete Note

```
User deletes note
  ↓
Soft delete: Set deletedAt timestamp
  ↓
Move to "Trash" folder
  ↓
Sync deletion to server
  ↓
After 30 days: Permanent deletion (background job)
```

---

### 3. Sync Flow (Offline-First)

#### Sync Strategy

- **Local DB is source of truth** between syncs
- **Optimistic UI updates**: Changes appear immediately
- **Background sync**: Automatic when network available
- **Conflict resolution**: Last-write-wins with version tracking

#### Sync Process

```
App comes online
  ↓
Collect local changes (dirty records)
  ↓
Push to server with metadata:
  - noteId
  - userId (for ownership validation)
  - updatedAt
  - version
  - encrypted content
  ↓
Server validates ownership
  ↓
Server applies changes
  ↓
Server returns deltas (changes from other devices)
  ↓
Client reconciles conflicts
  ↓
Update local DB
  ↓
Mark records as 'synced'
```

#### Conflict Resolution

1. **No conflict**: Server version == client version → apply change
2. **Client ahead**: Client version > server → push wins
3. **Server ahead**: Server version > client → server wins (with user notification)
4. **Diverged**: Different updatedAt, same version → last-write-wins
5. **User choice** (advanced): Present both versions, let user merge

---

## Data Models

### User

```typescript
interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  updatedAt: Date;
  encryptionPublicKey?: string; // For E2EE
  preferences: {
    biometricEnabled: boolean;
    e2eeEnabled: boolean;
    autoLockMinutes: number;
  };
}
```

### Note

```typescript
interface Note {
  id: string; // UUID
  userId: string; // Owner
  title: string;
  content: string; // Encrypted if E2EE
  tags: string[];
  isPinned: boolean;
  color?: string;

  // Sync metadata
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  syncStatus: "synced" | "pending_sync" | "conflict";

  // E2EE metadata
  isEncrypted: boolean;
  encryptionIV?: string; // Initialization vector
}
```

### Local Sync State

```typescript
interface SyncState {
  lastSyncAt: Date;
  pendingChanges: number;
  conflictCount: number;
}
```

---

## Security Architecture

### Layers of Security

1. **Network Layer**

   - HTTPS only
   - Certificate pinning (optional, advanced)
   - Token-based authentication (JWT)

2. **Server Layer**

   - Firebase Security Rules / Row-Level Security
   - Ownership validation on all operations
   - Rate limiting

3. **Client Layer**

   - Biometric authentication
   - Auto-lock after inactivity
   - Encrypted local storage
   - Optional E2EE

4. **Data Layer**
   - Encryption at rest (server-side)
   - Optional client-side encryption (E2EE)
   - Secure key storage (device keychain)

### E2EE Implementation (Optional)

**Key Generation**

- On signup with E2EE enabled:
  - Generate master key from password (PBKDF2)
  - Generate data encryption key (AES-256)
  - Encrypt data key with master key
  - Store encrypted data key on server
  - Store master key locally in SecureStore

**Encryption Flow**

```
User creates/edits note
  ↓
Retrieve data encryption key from SecureStore
  ↓
Encrypt note content (AES-256-GCM)
  ↓
Store encrypted content + IV locally
  ↓
Sync encrypted content to server
```

**Decryption Flow**

```
Retrieve encrypted note
  ↓
Get data encryption key from SecureStore
  ↓
Decrypt content using key + IV
  ↓
Display to user
```

---

## Feature Roadmap

### MVP (Phase 1)

- [x] User authentication (email/password)
- [x] Create, read, update, delete notes
- [x] Offline-first with local SQLite
- [x] Basic sync with Firebase
- [x] Soft delete (trash)
- [x] Simple search

### Phase 2

- [ ] Biometric authentication
- [ ] Auto-lock
- [ ] Tags and filtering
- [ ] Note pinning
- [ ] Color coding

### Phase 3

- [ ] End-to-end encryption
- [ ] Rich text editing
- [ ] Attachments (images, files)
- [ ] Note sharing
- [ ] Export/backup

### Phase 4

- [ ] Collaboration features
- [ ] Note versioning history
- [ ] Advanced search
- [ ] Cross-platform (web)

---

## Development Guidelines

### Code Organization

```
src/
├── app/              # Expo Router pages
├── components/       # Reusable UI components
├── contexts/         # React Context providers
├── services/         # Business logic
│   ├── auth/
│   ├── notes/
│   ├── sync/
│   └── encryption/
├── database/         # SQLite schemas and queries
├── types/            # TypeScript definitions
├── utils/            # Helper functions
└── constants/        # App constants
```

### Best Practices

- **TypeScript strict mode**: Catch errors early
- **Error boundaries**: Graceful error handling
- **Loading states**: Always show feedback
- **Optimistic updates**: Immediate UI response
- **Offline indicators**: Clear network status
- **Security first**: Never log sensitive data

---

## Performance Considerations

- **Lazy loading**: Load notes on demand
- **Pagination**: Limit initial load
- **Debounced search**: Reduce unnecessary queries
- **Memoization**: Cache expensive computations
- **Background sync**: Don't block UI
- **Image optimization**: Compress attachments

---

## Testing Strategy

- **Unit tests**: Services and utilities
- **Integration tests**: Sync logic, encryption
- **E2E tests**: Critical user flows
- **Security tests**: Penetration testing for E2EE
- **Offline tests**: Airplane mode scenarios

---

## Deployment

- **Development**: Expo Go for rapid testing
- **Staging**: Internal TestFlight/Play Console
- **Production**: App Store + Google Play
- **Updates**: OTA updates via Expo for JS changes

---

## References

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [React Native Security](https://reactnative.dev/docs/security)
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
