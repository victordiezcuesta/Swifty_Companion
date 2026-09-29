# Swifty Companion

<p align="center">
  <img src="assets/logo-42madrid.png" alt="42 Madrid" width="180">
</p>

<p align="center">
  <strong>Mobile application for browsing 42 student profiles through the 42 API.</strong>
</p>

<p align="center">
  React Native · TypeScript · Expo · 42 API · OAuth2
</p>

---

## 📱 About the project

**Swifty Companion** is a mobile application developed as part of the 42 curriculum.

The goal of the project is to discover mobile application development while working with the **42 API**. The application allows the user to search for a 42 student by login and display their academic information through a dedicated profile view.

The project follows the mandatory requirements of the subject, including:

- At least two views.
- Student search by login.
- Error handling for invalid users and network/API errors.
- Student profile information.
- Profile picture.
- Level and progress.
- Skills with levels and percentages.
- Completed projects, including failed projects.
- Navigation back to the search view.
- Responsive/flexible layouts.
- OAuth2 authentication with the 42 Intra.
- Reuse of the access token instead of requesting a new token for every query.

The project specification requires the use of the latest available version of the 42 API and requires credentials and environment variables to remain outside the Git repository.

---

## ✨ Features

### 🔎 Student search

The main screen provides a simple search interface where a 42 login can be entered.

The application:

1. Validates the entered login.
2. Requests an OAuth2 access token when necessary.
3. Queries the 42 API.
4. Retrieves the student's profile.
5. Navigates to the profile view.
6. Displays an appropriate error when something goes wrong.

### 👤 Student profile

The profile screen displays information retrieved from the 42 API, including:

- Display name
- Login
- Profile picture
- Email
- Location
- Wallet
- Evaluation points
- Common Core level
- Level progress

### 🧠 Skills

The application displays the student's skills associated with the Common Core.

Each skill includes:

- Skill name
- Skill level
- Percentage representation
- Visual progress bar

### 📚 Projects

The projects section displays completed projects and distinguishes between:

- Validated projects
- Failed projects

The final mark is also displayed when available.

### ⏳ Loading state

A custom animated loading indicator is displayed while the application is retrieving the student profile from the API.

### ⚠️ Error handling

The application handles several situations, including:

- Empty login
- Student not found
- Network errors
- API errors
- Missing OAuth credentials

### ↩️ Navigation

The profile view can return to the search view using the application UI or the Android hardware back button.

---

## 🛠️ Technology stack

| Technology | Purpose |
|---|---|
| **React Native** | Mobile application framework |
| **TypeScript** | Typed application development |
| **Expo** | Development and application tooling |
| **Expo AuthSession** | OAuth2 authentication flow |
| **Expo Dev Client** | Development build support |
| **42 API** | Student and cursus information |
| **React Native Animated API** | Loading animation |
| **EAS** | Expo application build configuration |

The subject allows the use of any mobile language and compatible frameworks/libraries provided that their use can be justified during the defense.

---

## 🔐 Authentication

The application communicates with the 42 Intra through **OAuth2**.

The authentication service requests an access token using the application's credentials and keeps the token in memory:

```text
Application
    │
    │ OAuth2 client credentials
    ▼
42 OAuth endpoint
    │
    │ access_token
    ▼
Application
    │
    │ Bearer token
    ▼
42 API
```

Once an access token has been obtained, it is reused for subsequent API requests instead of creating a new token for every student search.

This follows the project requirement:

> Do not create a token for each query.

The subject explicitly requires the use of Intra OAuth2.

### Environment variables

Credentials are stored locally in `.env` and are excluded from Git.

Create a local `.env` file based on `.env.example`:

```env
EXPO_PUBLIC_UID_INTRA_42=your_42_client_id
EXPO_PUBLIC_SECRET_INTRA_42=your_42_client_secret
```

**Never commit real credentials to the repository.**

The subject explicitly states that credentials, API keys and environment variables must be stored locally in a `.env` file and ignored by Git.

---

## 🔄 Application flow

The main application state is intentionally simple:

```text
                  ┌─────────────────┐
                  │  Search Screen  │
                  └────────┬────────┘
                           │
                    Enter 42 login
                           │
                           ▼
                  ┌─────────────────┐
                  │  Get OAuth2     │
                  │  access token   │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   42 API        │
                  │  GET /users/... │
                  └────────┬────────┘
                           │
                    User found
                           │
                           ▼
                  ┌─────────────────┐
                  │ Profile Screen  │
                  ├─────────────────┤
                  │ Level           │
                  │ Skills          │
                  │ Projects        │
                  │ Personal data   │
                  └────────┬────────┘
                           │
                       Back
                           │
                           ▼
                  ┌─────────────────┐
                  │  Search Screen  │
                  └─────────────────┘
```

The mandatory part of the subject requires at least two views, navigation back to the first view, user details, skills and completed projects.

---

## 📸 Screenshots

### Search Screen

The initial view allows the user to enter a 42 login.

<p align="center">
  <img src="assets/screenshots/screenshotsSearchScreen.jpg" alt="Search Screen" width="280">
</p>

### Loading Screen

While the profile is being retrieved, the application displays an animated three-dot loading indicator.

<p align="center">
  <img src="assets/screenshots/screenshotsLoadingScreen.jpg" alt="Loading Screen" width="280">
</p>

### Profile Screen

The profile view displays the student's main information, including their identity, level, wallet, evaluation points, email and location.

<p align="center">
  <img src="assets/screenshots/screenshotsProfileScreen.jpg" alt="Profile Screen" width="280">
</p>

### Skills

The skills section shows the student's skills, levels and percentage progress.

<p align="center">
  <img src="assets/screenshots/screenshotsProfileScreenSkills.jpg" alt="Profile Skills" width="280">
</p>

### Projects

The projects section shows completed projects, including validated and failed projects, together with their final marks.

<p align="center">
  <img src="assets/screenshots/screenshotsProfileScreenProjects.jpg" alt="Profile Projects" width="280">
</p>

---

## 🚀 Installation

### Requirements

Make sure the following are installed:

- Node.js
- npm
- Expo
- Android development environment if building/running a native Android application
- A 42 Intra application with OAuth2 credentials

### Clone the repository

```bash
git clone <your-repository-url>
cd Swifty_Companion
```

### Install dependencies

```bash
npm install
```

### Configure credentials

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Then add your own 42 OAuth2 credentials.

### Start the project

Using the Makefile:

```bash
make start
```

For a development client connected through ADB:

```bash
make cluster
```

Other available commands:

```bash
npm run start
npm run android
npm run ios
npm run web
```

---

## 🧰 Makefile

The project includes a small Makefile to simplify the development workflow.

| Command | Description |
|---|---|
| `make start` | Starts Expo with the development client |
| `make cluster` | Configures ADB reverse and starts Expo locally |
| `make clean` | Removes Expo generated files |
| `make fclean` | Removes Expo files and `node_modules` |

---

## 📊 42 API data

The application retrieves the student's data through the 42 API.

The main information used by the application includes:

```text
User
├── login
├── displayname
├── email
├── wallet
├── correction_point
├── location
├── image
├── cursus_users
│   ├── level
│   └── skills
└── projects_users
    ├── project
    ├── final_mark
    ├── status
    └── validated?
```

The project specification requires the second view to display login information and at least four additional user details, as well as skills and completed projects including failed ones.

---

## 🔒 Security

Sensitive credentials are deliberately excluded from version control.

The repository ignores:

```text
.env
.env.local
*.key
*.p12
*.jks
*.pem
```

Only `.env.example` should be committed, using placeholder values.

**Do not commit your real 42 client ID or client secret.**

---

## 🧹 Development notes

The project uses TypeScript in strict mode:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

The UI is built with React Native components and `StyleSheet`, with a shared theme to keep colors, spacing and visual elements consistent.

The profile screen also uses the Common Core cursus when available (`cursus_id === 21`) and falls back to the latest available cursus.

---

## 📄 License

This project is distributed under the license included in this repository.

---

## 👨‍💻 Author

**Víctor Díez Cuesta**

42 Madrid — Software Engineering

Built as part of the **42 Common Core** curriculum.
