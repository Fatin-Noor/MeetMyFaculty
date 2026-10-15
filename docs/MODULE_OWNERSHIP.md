# MeetMyFaculty Team Module Ownership

MeetMyFaculty is one integrated application. The files below show who owns each functional requirement for development, demonstrations, and Git commits. A feature can use shared files, but the listed controller and page are the clearest evidence of ownership.

## Module 1: User Access, Home, and Profiles

| Function | Owner | Main backend file(s) | Main frontend file(s) |
| --- | --- | --- | --- |
| 1. User Registration | Fatin Noor Hoque | `server/controllers/registrationController.js` | `client/src/pages/RegisterPage.jsx` |
| 2. Secure Login, Role-Based Access, and Profile Management | Redoan Hasan Rafin | `server/controllers/authenticationController.js`, `server/controllers/profileController.js` | `client/src/pages/LoginPage.jsx`, `client/src/pages/ProfilePage.jsx` |
| 3. Home Page and Dashboard | Makib | Dashboard API use is integrated through existing services | `client/src/pages/HomePage.jsx`, `client/src/pages/DashboardPage.jsx` |
| 4. Admin Account Approval and User Management | Fatin Noor Hoque | `server/controllers/adminUserController.js` | `client/src/pages/UserManagementPage.jsx` |

## Module 2: Routine, Counseling, and Announcements

| Function | Owner | Main backend file(s) | Main frontend file(s) |
| --- | --- | --- | --- |
| 5. Class Routine Viewer | Fatin Noor Hoque | `server/controllers/routineController.js` | `client/src/pages/RoutinePage.jsx` |
| 6. Counseling Request and Slot Booking | Redoan Hasan Rafin | `server/controllers/slotBookingController.js` | `client/src/pages/CounselingPage.jsx` (student booking and faculty slots) |
| 7. Counseling Request Management | Makib | `server/controllers/counselingManagementController.js` | `client/src/pages/CounselingPage.jsx` (faculty request actions) |
| 8. Announcement Management | Redoan Hasan Rafin | `server/controllers/announcementController.js` | `client/src/pages/AnnouncementsPage.jsx` |

## Module 3: Forum, Resources, and Faculty Directory

| Function | Owner | Main backend file(s) | Main frontend file(s) |
| --- | --- | --- | --- |
| 9. Academic Discussion Forum | Fatin Noor Hoque | `server/controllers/forumController.js` | `client/src/pages/ForumPage.jsx` |
| 10. Semester Resource Sharing | Redoan Hasan Rafin | `server/controllers/resourceController.js` | `client/src/pages/ResourcesPage.jsx` |
| 11. Resource Access Approval | Makib | `server/controllers/resourceAccessController.js` | `client/src/pages/ResourcesPage.jsx` |
| 12. Faculty Directory and Profile Viewer | Makib | `server/controllers/facultyController.js` | `client/src/pages/FacultyPage.jsx` |

## Shared integration files

These files are intentionally shared because every feature needs them. They are not an extra function and should not be claimed as one person's separate module:

- `server/app.js`, `server/config/db.js`, `server/middlewares/authMiddleware.js`
- `server/models/User.js`, `server/services/authService.js`
- `client/src/App.jsx`, `client/src/context/AuthContext.jsx`, `client/src/api/services.js`
- Shared layout and UI components in `client/src/components/`

## Suggested Git workflow

1. Create the GitHub repository once from the complete project.
2. Each member creates a personal branch from `main` before editing their assigned function. Suggested names are `feature/fatin`, `feature/rafin`, and `feature/makib`.
3. Only edit your owned feature files unless the group agrees on a shared-file change.
4. Commit with meaningful messages, for example: `feat(forum): add academic discussion post form`.
5. Push the branch, open a pull request, and merge it into `main` after the group checks it.

## Important note for the viva or report

The Counseling page and Resources page are shared screens because they serve two closely related functions. Their backend controllers are separated by owner, and the page comments explain which part belongs to which function. This keeps the application natural for users while still making each member's work distinguishable.
