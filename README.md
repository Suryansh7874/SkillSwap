SkillMesh
Connect Skills. Exchange Knowledge. Grow Together.
SkillMesh is a peer-to-peer skill exchange and collaborative learning platform designed to help students learn from one another. Students can showcase the skills they are willing to teach, discover skills they want to learn, connect with suitable learning partners, and organise structured learning sessions.
The project is developed under the academic problem statement “SkillSwap: The Alliance of Olympus”.
Project status: Under development. Features listed below describe the planned system and should be updated as they are implemented.
Table of Contents
Overview
Problem Statement
How It Works
Features
Technology Stack
System Architecture
Repository Structure
Getting Started
Environment Variables
Development Workflow
Contributing
Project Scope and Future Work
Overview
Students have different strengths, interests, and learning goals. One student may be comfortable with Python but want to learn UI/UX design, while another may know UI/UX design and want to improve their Python skills.
SkillMesh aims to connect such students and make knowledge exchange more organised.
Rather than treating learning as a one-way process, the platform encourages students to act as both learners and teachers. It combines skill discovery, partner matching, communication, session management, progress tracking, and AI-assisted learning support.
Problem Statement
Finding suitable learning partners within an academic community can be difficult. Students may not know who can teach a particular skill, whether that person's claimed proficiency is reliable, or how to coordinate and evaluate a learning session.
SkillMesh aims to address these challenges through a centralised platform for:
Discovering students by the skills they can teach and want to learn.
Finding compatible learning partners.
Managing connections and communication.
Organising learning sessions and availability.
Tracking progress and collecting feedback.
Supporting skill credibility through evidence and assessments.
How It Works
The intended learning journey is:
Create a profile — Register and add academic details, interests, skills to teach, and skills to learn.
Discover skills and students — Search profiles and filter by relevant skills or categories.
Find a learning partner — Use skill compatibility and learning goals to identify potential matches.
Connect and communicate — Send a connection request and discuss learning objectives after it is accepted.
Arrange a learning session — Coordinate availability and book an online or offline session.
Learn and practise — Exchange explanations, resources, exercises, and assignments.
Review and track progress — Share feedback, submit practical work, and update learning progress.
Get learning assistance — Use recommendations and AI-generated roadmaps to support further learning.
Features
Features are grouped by their intended level of functionality. Their implementation status should be updated as development progresses.
Core Features
Student authentication: Registration and login with personalised student profiles.
Skill profiles: Maintain skills a student can teach and skills they want to learn.
Profile discovery: Explore student profiles and interests.
Search and filtering: Find potential learning partners by skill and relevant criteria.
Connection management: Send, accept, and reject connection requests.
Messaging: Communicate with connected students.
Advanced Features
Skill-based matching: Identify students with compatible teaching and learning requirements.
Availability management: Define available days and time slots.
Session management: Schedule, book, reschedule, and cancel learning sessions.
Reviews and ratings: Provide feedback after completed sessions.
Learning progress: Track development in selected skills.
Notifications: Receive updates about connections and learning sessions.
Community learning groups: Learn collaboratively with multiple students.
AI-Assisted Features
AI skill matching: Recommend potential partners using skills, interests, goals, and proficiency.
Personalised recommendations: Suggest relevant skills and learning partners.
AI learning roadmaps: Generate structured learning paths based on a learner's current level and goals.
Reputation scoring: Assess contributions using session activity, reviews, and learning participation.
Smart session recommendations: Suggest suitable timings using participant availability.
Skill Verification
Students should be able to support their skill profiles with evidence such as project submissions, practical assessments, demonstrations, and peer endorsements. The intention is to make skill claims more transparent and help students choose suitable learning partners.
Technology Stack
Layer
Technology
Frontend
React.js, TypeScript
UI and styling
Tailwind CSS
Backend
Node.js, Express.js, TypeScript
Database
PostgreSQL
ORM
Prisma
Authentication
JWT, bcrypt
Real-time communication
Socket.IO
AI integration
Gemini API
Semantic skill matching
Embeddings, pgvector
API testing
Postman
Version control
Git and GitHub
Planned deployment
Vercel, Render or Railway
The application is intended to use a modular architecture. This allows features to be developed, tested, and maintained in separate modules while remaining part of one application.
System Architecture
The backend is planned around the following request flow:
Client (React)
     |
     | HTTP / WebSocket
     v
Express API
     |
     +---- Routes
     |       |
     |       v
     |    Controllers
     |       |
     |       v
     |    Services (business logic)
     |       |
     |       v
     |    Prisma ORM
     |       |
     |       v
     |    PostgreSQL
     |
     +---- Middleware (authentication, validation, error handling)
     |
     +---- Socket.IO (real-time communication)
     |
     +---- Gemini API (AI-assisted functionality)
Main Domain Modules
The domain model is organised around these areas:
User and Skill Management — users, skills, and user-skill relationships.
Connections and Messaging — connection requests and messages.
Learning Sessions and Scheduling — availability, sessions, participants, and reviews.
Learning Progress and Verification — progress records, skill verification, assignments, and submissions.
AI Matching and Recommendations — skill matches, learning roadmaps, and recommendations.
Community Groups and Notifications — learning groups, group membership, and notifications.
The exact models, fields, relationships, and API contracts should be maintained alongside the implementation as the design evolves.
Repository Structure
The repository is intended to use a single-repository (monorepo-style) layout:
skillmesh/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── skills/
│   │   │   ├── matching/
│   │   │   ├── connections/
│   │   │   ├── messaging/
│   │   │   ├── sessions/
│   │   │   ├── reviews/
│   │   │   ├── learning/
│   │   │   ├── verification/
│   │   │   ├── communities/
│   │   │   └── notifications/
│   │   ├── middleware/
│   │   ├── sockets/
│   │   ├── utils/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── docs/
│   ├── class-diagram/
│   ├── api-contracts/
│   └── project-notes/
│
├── .gitignore
└── README.md
This is a proposed structure; folders can be added as the corresponding features are implemented.
Getting Started
Prerequisites
Install the following tools before setting up the project:
Node.js (LTS version recommended)
npm (included with Node.js)
Git
PostgreSQL
Visual Studio Code or another code editor
You should also have access to a PostgreSQL database for local development.
1. Clone the repository
git clone https://github.com/<your-github-username>/skillmesh.git
cd skillmesh
Replace <your-github-username> with the GitHub account or organisation that owns the repository.
2. Set up the backend
cd backend
npm install
Create a .env file in the backend/ directory. Add the required environment variables as described in Environment Variables.
Backend scripts and Prisma commands will be documented here once the initial backend configuration and package.json scripts have been committed. Do not assume the project is runnable until those files are present.
3. Set up the frontend
Open a second terminal:
cd frontend
npm install
Frontend run and build commands will be added after the frontend application has been scaffolded and its scripts are defined.
Environment Variables
Keep credentials and API keys in local environment files. Never commit .env files or paste secrets into issues, pull requests, or chat messages.
A future backend .env file is expected to contain variables similar to:
# Application
PORT=5000
NODE_ENV=development

# PostgreSQL
DATABASE_URL="postgresql://<db_user>:<db_password>@localhost:5432/skillmesh_dev"

# Authentication
JWT_SECRET="<generate-a-long-random-secret>"

# AI integration
GEMINI_API_KEY="<your-gemini-api-key>"
These names are proposed placeholders. The actual variable names must match the backend configuration. Add .env to .gitignore and commit a .env.example containing placeholders only.
Development Workflow
To keep frontend and backend development coordinated, each feature should follow this workflow:
Discuss the feature — Agree on its behaviour and acceptance criteria.
Define the API contract — Document the endpoint, method, authentication requirement, request body, response, and possible errors.
Develop in parallel — Backend and frontend members can work independently using the agreed contract and mock data where needed.
Test the API — Verify backend behaviour with Postman.
Integrate — Connect the frontend to the tested API.
Review and test — Check success cases, validation failures, permissions, and edge cases.
Merge — Submit a pull request and merge after review.
Suggested Branch Naming
main
develop
feature/auth-registration
feature/skill-profiles
feature/skill-matching
fix/login-validation
Use descriptive commit messages, for example:
feat(auth): add student registration endpoint
fix(skills): validate duplicate user skills
docs(api): document connection endpoints
Contributing
Contributions from the project team are welcome.
Before starting work:
Check the existing issues and project board.
Coordinate changes with the team.
Follow the agreed API contracts and folder structure.
Avoid committing secrets, generated build files, or local environment files.
Test your changes before opening a pull request.
Explain what changed and how it was tested in the pull request description.
Project Scope and Future Work
Potential extensions include:
Collaborative coding environments and virtual whiteboards.
Inter-college learning communities.
A skill-credit system for non-reciprocal exchanges.
Advanced learning analytics.
These are future possibilities, not claims about currently implemented functionality.
Project Identity
Product: SkillMesh
Academic problem statement: SkillSwap: The Alliance of Olympus
Tagline: Connect Skills. Exchange Knowledge. Grow Together.
Built to encourage a culture where everyone has something to teach and something new to learn.