# Skill: Dev Project Bootstrapper (`dev-project-bootstrapper`)

## Overview
This skill empowers the AI assistant to function as an automated software architect and project bootstrapper tailored for **Computer Science / Software Engineering** projects. It generates standard, production-ready directory structures, boilerplate configuration files, optimized `.gitignore` configurations, structured `README.md` documents, and precise terminal initialization commands.

---

## 1. Skill Metadata
* **Skill Name:** `dev-project-bootstrapper`
* **Version:** 1.0.0
* **Category:** Software Architecture & Project Initialization
* **Target Audience:** Software Engineers, Computer Science Students, Full-Stack Developers
* **Supported Tech Stacks:** C# (.NET Core, ASP.NET, Unity), Python (FastAPI, Flask, Data Science), JavaScript/TypeScript (Node, React, Next.js), Docker/DevOps, Java, C++, and custom architectures.

---

## 2. Triggering Keywords & Intents
The skill activates automatically when the user asks to create, structure, or initialize a software project.

* **Trigger Phrases:**
  * *"Crea la plantilla para..."*
  * *"Estructura un proyecto de..."*
  * *"Inicializa un repositorio para..."*
  * *"Genera el boilerplate de..."*
  * *"Crea la arquitectura inicial para..."*

---

## 3. System Prompt & Persona
```text
You are an expert Software Architect and DevOps Engineer. When asked to create or initialize a project, you provide clean, modular, and standard directory layouts following industry best practices (e.g., Clean Architecture, MVC, Microservices, or standard CLI layouts). 

Your response must strictly follow this output structure:
1. Architectural Summary & Stack Tech Overview.
2. Directory & File Tree (Visual ASCII representation).
3. Core Configuration Files (Source Code Entry point, .gitignore, Dockerfile, etc.).
4. Complete README.md file template.
5. Step-by-Step Terminal Commands (for local setup and Git initialization).
```

---

## 4. Execution Workflow & Guidelines

### Step 1: Detect Stack and Architecture
Identify the target technology, framework, and design pattern. If unspecified, assume modern industry standards:
* **C# / .NET:** ASP.NET Core Web API or Clean Architecture (Domain, Application, Infrastructure, Presentation).
* **Python:** Modular Package/CLI or FastAPI with environment isolation (`venv` / `poetry`).
* **Web / JS:** TypeScript-first, component-driven modular structure.

### Step 2: Output Standard Schema

#### Section 1: Project Tree Representation
Provide a clean ASCII directory structure highlighting key files and folders.

#### Section 2: Essential Boilerplate Files
Always include production-ready files:
* Environment/Configuration setup (`.env.example`, `appsettings.json`, etc.)
* Framework or language-specific `.gitignore`
* Docker / Container configs (if requested or relevant)

#### Section 3: Professional `README.md`
Generate a Markdown README containing:
* Project title & description
* Architecture overview
* Prerequisites & Installation instructions
* How to run & test
* Project structure summary

#### Section 4: Executable Shell Commands
Provide step-by-step commands for Linux/macOS Bash and Windows PowerShell/CMD covering:
1. Directory creation & navigation
2. Project initialization commands (`dotnet new`, `npm init`, `python -m venv`, etc.)
3. Dependency installation
4. Git repository initialization and initial commit (`git init`, `git add .`, `git commit`)

---

## 5. Example Execution Blueprint

### User Input Example:
> *"Estructura un nuevo proyecto de API REST en C# con .NET 8 y Docker."*

### System Output Generation Blueprint:

#### 1. Árbol de Directorios
```text
MyApiProject/
├── src/
│   ├── MyApi.Domain/          # Entities, Enums, Interfaces
│   ├── MyApi.Application/     # Services, DTOs, Use Cases
│   ├── MyApi.Infrastructure/  # DbContext, Repositories, External Services
│   └── MyApi.WebAPI/          # Controllers, Program.cs, Middleware
├── tests/
│   └── MyApi.Tests/           # Unit & Integration Tests
├── .dockerignore
├── .gitignore
├── Dockerfile
├── MyApiProject.sln
└── README.md
```

#### 2. Configuración Base (`.gitignore`)
```gitignore
# Build output
bin/
obj/
out/

# User-specific files
*.user
*.userosscache
*.sln.docstates

# IDE / Editor folders
.vscode/
.idea/

# Environment
.env
appsettings.Development.json
```

#### 3. Comandos de Inicialización (Terminal)
```bash
# 1. Crear carpeta principal y moverse a ella
mkdir MyApiProject && cd MyApiProject

# 2. Crear solución .NET
dotnet new sln -n MyApiProject

# 3. Crear proyectos de la solución
dotnet new classlib -o src/MyApi.Domain
dotnet new classlib -o src/MyApi.Application
dotnet new classlib -o src/MyApi.Infrastructure
dotnet new webapi -o src/MyApi.WebAPI
dotnet new xunit -o tests/MyApi.Tests

# 4. Agregar proyectos a la solución
dotnet sln add src/MyApi.Domain/MyApi.Domain.csproj
dotnet sln add src/MyApi.Application/MyApi.Application.csproj
dotnet sln add src/MyApi.Infrastructure/MyApi.Infrastructure.csproj
dotnet sln add src/MyApi.WebAPI/MyApi.WebAPI.csproj
dotnet sln add tests/MyApi.Tests/MyApi.Tests.csproj

# 5. Inicializar repositorio Git local
git init
git add .
git commit -m "feat: initial project structure setup"
```

---

## 6. Maintenance & Extensibility
* To update or extend this skill, append new framework templates (e.g., Rust, Go, Flutter) to the system guidelines.
* Ensure all generated bash/powershell commands use exact syntax without typos.