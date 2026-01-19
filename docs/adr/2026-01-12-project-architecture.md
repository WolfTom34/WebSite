# ADR: Project Architecture - 2026-01-12

## Context
The Kolth Orbital OS project requires a high-performance, maintainable, and scalable 3D web environment. The technical specifications are extremely strict (120 FPS, specific optical pipelines, complex shader logic).

## Decision
We will implement the project using **Hexagonal Architecture** (Ports and Adapters) to decouple business logic (Orbital Telemetry, Topology Physics) from the delivery mechanism (React Three Fiber, WebGL).

### Technical Stack
- **Framework**: React 18+ with Vite.
- **3D Engine**: Three.js.
- **R3F Ecosystem**: `@react-three/fiber`, `@react-three/drei` for abstracted component logic.
- **Post-Processing**: `@react-three/postprocessing` with `postprocessing` for high-performance optical effects.
- **Styling**: Vanilla CSS for HUD elements, leveraging CSS Variables for the strict color hierarchy.
- **State Management**: Simple React state (for now), likely migrating to `zustand` if complexity increases.

### Directory Structure
```
src/
├── core/             # Business Logic / Domain Model (Pure TS)
│   ├── domain/       # Entities and Value Objects
│   └── use-cases/    # Application Logic
├── infrastructure/   # Adapters (Three.js components, API calls)
│   ├── scene/        # R3F Scene elements
│   ├── shaders/      # GLSL Shader source
│   └── ui/           # React HUD components
├── shared/           # Utils, Constants, Types
└── App.tsx           # Entry Point / Orchestrator
```

## Consequences
- **Positive**: High testability of core logic, easy swap of rendering engines if needed, clear separation of concerns.
- **Negative**: Initial overhead in boilerplate setup.
- **Performance**: We must ensure that the hexagonal abstraction doesn't introduce frame-rate bottlenecks in the hot loop (GPGPU, Shader updates).
