# CLAUDE.md - Sistema Multi-Agente LinkedIn Post Pro

---

## 🚨 INSTRUCCIÓN CRÍTICA - LEER ESTO PRIMERO

**Cada vez que inicies una sesión o recibas una nueva tarea, DEBES seguir este proceso en orden:**

---

## §0: MANDATORY PR-DRIVEN WORKFLOW

### PRINCIPIO FUNDAMENTAL: Todo cambio = 1 PR pequeña y desplegable

**ANTES de iniciar CUALQUIER tarea:**

#### 1. Análisis de Scope

```
¿Cuántas líneas de código cambiará esta tarea?

< 300 líneas → 1 PR directa
300-800 líneas → Dividir en 2-3 PRs
> 800 líneas → REQUIERE Feature Flag + múltiples PRs
```

#### 2. Estrategia de Feature Flags

**Cuándo usar Feature Flags:**
- Feature nueva que requiere > 3 PRs
- Cambio arquitectónico significativo
- Cualquier cambio que no pueda completarse en 1 PR sin romper producción

**Cómo implementar Feature Flags:**

```javascript
// 1. Primera PR: Crear el flag en config
// .env.local o config/features.js
export const FEATURE_FLAGS = {
  ENABLE_PRO_PAYMENTS: false,
  ENABLE_POST_HISTORY: false,
  ENABLE_NEW_EDITOR: false,
}

// 2. PRs intermedias: Código detrás del flag
if (FEATURE_FLAGS.ENABLE_PRO_PAYMENTS) {
  // Nuevo código aquí
} else {
  // Código antiguo (fallback)
}

// 3. PR final: Activar flag + eliminar código viejo
```

#### 3. Requisitos OBLIGATORIOS de cada PR

**Toda PR DEBE cumplir estos requisitos:**

✅ **Deployable**: Puede ir a producción tal cual
✅ **Non-breaking**: No rompe funcionalidad existente
✅ **Tested**: Incluye tests (cuando aplique)
✅ **Documented**: Actualiza docs si es necesario
✅ **Small**: < 300 líneas preferiblemente (< 500 máximo)
✅ **Atomic**: Hace UNA cosa bien definida

**Si una PR no cumple estos requisitos, NO PROCEDER.**

#### 4. Git Workflow OBLIGATORIO

```bash
# SIEMPRE seguir este flujo:

1. git checkout main
2. git pull origin main
3. git checkout -b feature/[NOMBRE-DESCRIPTIVO]
   # o bugfix/[NOMBRE]
   # o refactor/[NOMBRE]

4. Hacer cambios incrementales
5. git add .
6. git commit -m "tipo: descripción corta"
   # Conventional Commits obligatorio

7. Cuando PR esté lista:
   - DETENER trabajo
   - SOLICITAR review humana
   - NO continuar hasta aprobación
```

#### 5. Convenciones de Commits

**Formato obligatorio:**
```
tipo: descripción corta

[cuerpo opcional]
[footer opcional]
```

**Tipos válidos:**
- `feat:` Nueva funcionalidad
- `fix:` Bug fix
- `refactor:` Refactorización sin cambio de funcionalidad
- `test:` Agregar/modificar tests
- `docs:` Cambios en documentación
- `style:` Formato, espacios (no CSS)
- `chore:` Tareas de mantenimiento

**Ejemplos correctos:**
```
feat: add email verification on signup
fix: prevent duplicate post generation
refactor: extract Claude API logic to service
test: add unit tests for post counter
```

#### 6. Proceso de Review

**CHECKPOINT HUMANO OBLIGATORIO:**

Después de completar una PR:
1. ✋ **DETENER** todo trabajo
2. 📋 Describir cambios realizados
3. 🔍 Solicitar review
4. ⏸️ **ESPERAR** aprobación antes de continuar

**NO se permite:**
- ❌ Continuar con siguiente tarea sin aprobación
- ❌ Hacer múltiples PRs en paralelo sin review
- ❌ Auto-merge sin revisión humana

---

## PASO 0: Identificar el tipo de tarea

| Tipo | Características | Workflow a seguir |
|------|----------------|-------------------|
| **Bug Fix / Debugging** | Resolver problema existente | → Workflow Bug Fix (ver sección §1) |
| **Feature Pequeña** | < 2 archivos, < 2h, < 300 líneas | → Workflow Feature Pequeña (ver sección §2) |
| **Feature Mediana** | 2-5 archivos, 2-8h, 300-800 líneas | → Workflow Feature Mediana (ver sección §3) |
| **Feature Grande** | 5+ archivos, 8+ horas, > 800 líneas | → Workflow Feature Grande (ver sección §4) |
| **Refactoring** | Mejora de código sin nueva funcionalidad | → Workflow Refactoring (ver sección §5) |
| **Testing** | Crear/actualizar tests | → Workflow Testing (ver sección §6) |
| **Code Review** | Revisar código existente | → Workflow Code Review (ver sección §7) |

**⚠️ IMPORTANTE**: Una vez identificado el tipo, ve DIRECTAMENTE a la sección correspondiente y sigue su workflow COMPLETO.

---

## §1. WORKFLOW: BUG FIX / DEBUGGING

**Este workflow es OBLIGATORIO para resolver bugs.**

### Paso 1.1: Git Branch Setup
```bash
git checkout main
git pull origin main
git checkout -b bugfix/[NOMBRE-BUG]
```

### Paso 1.2: Leer Contextos (SIEMPRE primero)
```
DEBES leer estos archivos en orden:
1. .claude/contexts/project-context.md
2. .claude/contexts/architecture-guidelines.md
3. .claude/contexts/coding-standards.md
```

### Paso 1.3: Leer el Prompt de Bug Fix
```
LEE: .claude/prompts/prompt-fix-bug.md
Este archivo contiene el workflow específico para debugging
```

### Paso 1.4: Ejecutar Product Agent (OBLIGATORIO)

**NO saltes este paso. El Product Agent debe analizar el bug primero.**

```
PROCESO OBLIGATORIO:
1. LEE: .claude/agents/product-agent.md
2. LEE: .claude/skills/product-agent/SKILL.md
3. EJECUTA el análisis del bug:
   - Hacer preguntas clarificadoras (mínimo 3-5)
   - Identificar el impacto
   - Definir criterios de éxito
   - Generar PRD del bug en .claude/features/bug-[NOMBRE]-PRD.md
```

**Resultado esperado**: Archivo PRD creado en `.claude/features/bug-[NOMBRE]-PRD.md`

### Paso 1.5: Ejecutar Architect Agent (OBLIGATORIO)

**El Architect Agent investiga la causa raíz.**

```
PROCESO OBLIGATORIO:
1. LEE: .claude/agents/architect-agent.md
2. LEE: .claude/skills/architect-agent/SKILL.md
3. LEE el PRD generado: .claude/features/bug-[NOMBRE]-PRD.md
4. EJECUTA la investigación:
   - Analizar archivos relevantes del codebase
   - Formular hipótesis sobre causas raíz
   - Identificar archivos a modificar
   - Crear plan de fix en .claude/features/bug-[NOMBRE]-PLAN.md
```

**Resultado esperado**: Plan de implementación en `.claude/features/bug-[NOMBRE]-PLAN.md`

### Paso 1.6: Implementar Fix

```
SEGÚN EL TIPO DE CÓDIGO A MODIFICAR:

Frontend (Next.js, React, componentes, UI):
1. LEE: .claude/agents/frontend-agent.md
2. LEE: .claude/skills/frontend-specialist/SKILL.md
3. Implementa el fix siguiendo el plan

Backend (APIs, Next.js API routes, lógica):
1. LEE: .claude/agents/backend-agent.md
2. LEE: .claude/skills/backend-specialist/SKILL.md
3. Implementa el fix siguiendo el plan
```

### Paso 1.7: Code Review (OBLIGATORIO)

```
DESPUÉS de implementar:
1. LEE: .claude/agents/code-review-agent.md
2. LEE: .claude/skills/code-reviewer/SKILL.md
3. Revisa el código implementado
4. Corrige cualquier issue encontrado
```

### Paso 1.8: Testing (OBLIGATORIO)

```
DESPUÉS del code review:
1. LEE: .claude/agents/testing-agent.md
2. LEE: .claude/skills/testing-specialist/SKILL.md
3. Crea/actualiza tests para el bug fix
4. Verifica que no hay regresiones
```

### Paso 1.9: QA Final (OBLIGATORIO)

```
VALIDACIÓN final:
1. LEE: .claude/agents/qa-agent.md
2. LEE: .claude/skills/qa-specialist/SKILL.md
3. Valida:
   - El bug está resuelto
   - No hay regresiones
   - Edge cases cubiertos
   - Código cumple estándares
```

### Paso 1.10: Preparar PR (OBLIGATORIO)

```
1. git add .
2. git commit -m "fix: [descripción del bug resuelto]"
3. DETENER y solicitar review
4. Preparar descripción de PR con:
   - Qué bug se resolvió
   - Cómo se resolvió
   - Qué se probó
   - Screenshots/videos si aplica
```

**✅ COMPLETADO**: Bug fix terminado y listo para review.
**⏸️ PAUSA OBLIGATORIA**: Esperar aprobación antes de continuar.

---

## §2. WORKFLOW: FEATURE PEQUEÑA (< 300 líneas)

### Paso 2.1: Git Branch Setup
```bash
git checkout main
git pull origin main
git checkout -b feature/[NOMBRE-FEATURE]
```

### Paso 2.2: Leer Contextos
```
1. .claude/contexts/project-context.md
2. .claude/contexts/architecture-guidelines.md
3. .claude/contexts/coding-standards.md
```

### Paso 2.3: Leer Prompt
```
LEE: .claude/prompts/prompt-create-feature.md
```

### Paso 2.4: Implementar

```
Frontend:
1. LEE: .claude/skills/frontend-specialist/SKILL.md
2. Implementa

Backend:
1. LEE: .claude/skills/backend-specialist/SKILL.md
2. Implementa
```

### Paso 2.5: Code Review → Testing → QA
```
Igual que en §1.7, §1.8, §1.9
```

### Paso 2.6: Preparar PR
```
1. git add .
2. git commit -m "feat: [descripción de la feature]"
3. DETENER y solicitar review
```

**⏸️ PAUSA OBLIGATORIA**: Esperar aprobación antes de continuar.

---

## §3. WORKFLOW: FEATURE MEDIANA (300-800 líneas)

### Paso 3.1: Git Branch Setup
```bash
git checkout main
git pull origin main
git checkout -b feature/[NOMBRE-FEATURE]
```

### Paso 3.2: Leer Contextos
```
(Igual que §2.2)
```

### Paso 3.3: Product Agent (OBLIGATORIO)

```
1. LEE: .claude/agents/product-agent.md
2. LEE: .claude/skills/product-agent/SKILL.md
3. Genera PRD completo (con preguntas exhaustivas)
4. Crea: .claude/features/[NOMBRE]-PRD.md
```

### Paso 3.4: Dividir en PRs

**CRITICAL**: Si el PRD indica > 300 líneas:

```
1. Dividir en 2-3 PRs atómicas
2. Cada PR debe ser independiente y desplegable
3. Orden lógico: infraestructura → lógica → UI

Ejemplo para "Email Verification":
  PR1: Add email verification schema + migrations
  PR2: Add email sending service
  PR3: Add verification UI + integration
```

### Paso 3.5: Por cada PR
```
1. Implementar según §2.4
2. Code Review (§1.7)
3. Testing (§1.8)
4. QA (§1.9)
5. Commit y DETENER
6. ⏸️ Esperar aprobación
7. Continuar con siguiente PR
```

---

## §4. WORKFLOW: FEATURE GRANDE (> 800 líneas)

### Paso 4.1: Feature Flag Setup (OBLIGATORIO)

```bash
git checkout main
git pull origin main
git checkout -b feature/[NOMBRE]-infrastructure
```

**Primera PR (Infrastructure PR):**
```typescript
// config/features.ts
export const FEATURE_FLAGS = {
  ...existing,
  ENABLE_[FEATURE_NAME]: false, // ← Nueva feature desactivada
}
```

**Commit:**
```bash
git add .
git commit -m "feat: add [FEATURE_NAME] feature flag"
# DETENER y solicitar review
```

### Paso 4.2: Leer Contextos
```
(Igual que §2.2)
```

### Paso 4.3: Product Agent (OBLIGATORIO)
```
(Igual que §3.3)
```

### Paso 4.4: Architect Agent (OBLIGATORIO)

```
1. LEE: .claude/agents/architect-agent.md
2. LEE: .claude/skills/architect-agent/SKILL.md
3. LEE el PRD: .claude/features/[NOMBRE]-PRD.md
4. Divide en subtareas (< 300 líneas cada una)
5. Crea plan de PRs en: .claude/features/[NOMBRE]-PLAN.md

Plan debe incluir:
  - PR1: Infrastructure (feature flag)
  - PR2-N: Implementación incremental (cada PR < 300 líneas)
  - PRN+1: Activation (activar flag + cleanup)
```

**Resultado esperado**: Plan de PRs en `.claude/features/[NOMBRE]-PLAN.md`

### Paso 4.5: Por Cada PR del Plan

```
Para cada PR (PR2, PR3, PR4...):

1. Nueva branch desde main:
   git checkout main
   git pull origin main
   git checkout -b feature/[NOMBRE]-part-[N]

2. Implementar SOLO esa parte (detrás del flag)
3. Code Review (§1.7)
4. Testing (§1.8)
5. QA (§1.9)
6. Commit:
   git commit -m "feat: [NOMBRE] - part [N] - [descripción]"
7. ⏸️ DETENER y esperar aprobación
8. Después de merge, continuar con siguiente PR
```

### Paso 4.6: PR Final de Activación

```bash
git checkout main
git pull origin main
git checkout -b feature/[NOMBRE]-activation

# Activar flag
# config/features.ts
ENABLE_[FEATURE_NAME]: true,

# Eliminar código viejo/fallbacks si existen

git add .
git commit -m "feat: activate [FEATURE_NAME]"
# DETENER y solicitar review
```

### Paso 4.7: QA Final del Feature Completo
```
(Igual que §1.9)
```

**✅ COMPLETADO**: Feature grande terminado con múltiples PRs seguras.

---

## §5. WORKFLOW: REFACTORING

### Paso 5.1: Git Branch Setup
```bash
git checkout main
git pull origin main
git checkout -b refactor/[NOMBRE-REFACTOR]
```

### Paso 5.2: Leer Contextos
```
(Igual que §2.2)
```

### Paso 5.3: Leer Prompt
```
LEE: .claude/prompts/prompt-refactor-code.md
```

### Paso 5.4: Architect Agent Analiza
```
1. LEE: .claude/agents/architect-agent.md
2. LEE: .claude/skills/architect-agent/SKILL.md
3. Analiza código actual
4. Propone mejoras arquitectónicas
5. Si refactor > 300 líneas → dividir en PRs
```

### Paso 5.5: Implementar → Review → Testing → QA
```
Igual que workflows anteriores
CRITICAL: Refactoring NUNCA debe cambiar funcionalidad
Todos los tests existentes deben pasar
```

### Paso 5.6: Preparar PR
```
git add .
git commit -m "refactor: [descripción del refactor]"
# DETENER y solicitar review
```

---

## §6. WORKFLOW: TESTING

### Paso 6.1: Git Branch Setup
```bash
git checkout main
git pull origin main
git checkout -b test/[NOMBRE-TESTS]
```

### Paso 6.2: Leer Prompt
```
LEE: .claude/prompts/prompt-generate-tests.md
```

### Paso 6.3: Testing Agent
```
1. LEE: .claude/agents/testing-agent.md
2. LEE: .claude/skills/testing-specialist/SKILL.md
3. Genera tests
```

### Paso 6.4: Preparar PR
```
git add .
git commit -m "test: [descripción de tests añadidos]"
# DETENER y solicitar review
```

---

## §7. WORKFLOW: CODE REVIEW

### Paso 7.1: Code Review Agent
```
1. LEE: .claude/agents/code-review-agent.md
2. LEE: .claude/skills/code-reviewer/SKILL.md
3. Revisa código
4. Reporta findings
5. NO hacer commits (solo review)
```

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
.claude/
├── CLAUDE.md (este archivo)
├── agents/
│   ├── product-agent.md
│   ├── architect-agent.md
│   ├── frontend-agent.md
│   ├── backend-agent.md
│   ├── code-review-agent.md
│   ├── testing-agent.md
│   └── qa-agent.md
├── skills/
│   ├── product-agent/SKILL.md
│   ├── architect-agent/SKILL.md
│   ├── frontend-specialist/SKILL.md
│   ├── backend-specialist/SKILL.md
│   ├── code-reviewer/SKILL.md
│   ├── testing-specialist/SKILL.md
│   └── qa-specialist/SKILL.md
├── contexts/
│   ├── project-context.md
│   ├── architecture-guidelines.md
│   ├── coding-standards.md
│   └── testing-strategy.md
├── prompts/
│   ├── prompt-fix-bug.md
│   ├── prompt-create-feature.md
│   ├── prompt-refactor-code.md
│   ├── prompt-generate-tests.md
│   └── prompt-code-review.md
└── features/
    ├── [NOMBRE]-PRD.md
    └── [NOMBRE]-PLAN.md
```

---

## 🎯 DIFERENCIA CLAVE: Agents vs Skills

### Agents (archivos .md en .claude/agents/)
- Definen el **ROL y RESPONSABILIDADES** del agente
- Contienen el **WORKFLOW específico** que debe seguir
- Son **documentos de proceso**

### Skills (archivos SKILL.md en .claude/skills/)
- Contienen **EXPERTISE y CONOCIMIENTO** especializado
- Son la **BASE DE CONOCIMIENTOS** del agente
- Son **documentos de referencia técnica**

**Debes leer AMBOS** cuando ejecutes un agente:
1. Primero el Agent (para saber QUÉ hacer)
2. Luego el Skill (para saber CÓMO hacerlo)

---

## ⚠️ RECORDATORIOS CRÍTICOS

1. **NUNCA saltes el workflow obligatorio**
2. **SIEMPRE lee los agentes Y skills completos**
3. **NO asumas - sigue el proceso paso a paso**
4. **Documenta decisiones en PRDs y PLANs**
5. **Code Review y Testing NO son opcionales**
6. **🔴 TODA PR debe ser desplegable a producción**
7. **🔴 Features grandes REQUIEREN Feature Flags**
8. **🔴 DETENER después de cada PR para review**

---

## 🚫 EXCEPCIONES (Cuándo NO usar el sistema completo)

**Cambios triviales** (sin agents ni skills, pero SÍ con PR):
- Typos en strings o comentarios
- Ajustes de configuración sin código (< 10 líneas)
- Cambios de estilos CSS simples (< 10 líneas)
- Actualizar README o documentación

**IMPORTANTE**: Incluso estos cambios triviales requieren:
- Branch dedicada
- Commit con conventional commit
- PR (aunque sea pequeña)

---

## 📊 LÍMITES DE TOKENS

- **Lectura inicial:** Máximo 15K tokens
- **Planificación:** Máximo 5K tokens
- **Implementación por PR:** Máximo 10K tokens
- **Implementación total feature:** Máximo 50K tokens
- **Documentación:** Máximo 10K tokens

---

## 📋 DESCRIPCIÓN DEL PROYECTO

**LinkedIn Post Pro** es una aplicación web SaaS para generar posts optimizados de LinkedIn en español usando IA (Claude Sonnet 4).

### Características Principales
- Generación de posts en español (España y LATAM)
- 3 tonos diferentes (profesional, cercano, inspiracional)
- Plan Free: 5 posts/mes
- Plan Pro (waitlist): 50 posts/mes, €8/mes
- Email verification obligatoria
- Rate limiting anti-abuso

### Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Autenticación**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Emails**: Resend
- **Pagos**: Stripe (futuro)
- **IA**: Claude API (Sonnet 4)
- **Deploy**: Vercel

### Estructura del Proyecto (planeada)

```
linkedin-post-pro/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── pricing/
│   ├── (auth)/
│   │   └── app/
│   │       ├── dashboard/         # Main app
│   │       └── settings/
│   └── api/
│       ├── generate-post/         # POST generation
│       ├── verify-email/
│       └── webhook/              # Stripe (futuro)
├── components/
│   ├── ui/                       # Shadcn components
│   ├── layout/
│   └── features/
├── lib/
│   ├── claude/                   # Claude API client
│   ├── supabase/                 # DB client
│   ├── clerk/                    # Auth helpers
│   └── utils/
├── config/
│   ├── features.ts               # Feature flags
│   └── constants.ts
└── types/
```

### Consideraciones Técnicas
- Mobile-first responsive
- SEO optimizado en landing pública
- Email verification OBLIGATORIA antes de usar
- Rate limiting: 1 generación cada 10 segundos
- Feature flags para funcionalidad en desarrollo
- Conventional commits obligatorios

### Paleta de Colores
- Primary: #0A66C2 (azul LinkedIn)
- Secondary: #057642 (verde profesional)
- Neutral dark: #191919
- Neutral medium: #666666
- Neutral light: #F3F2EF
- White: #FFFFFF
- Error: #CC1016

---

## 🎯 COMPORTAMIENTO GENERAL

- ✅ Preguntar antes de cambios mayores
- ✅ Mostrar plan ANTES de implementar
- ✅ **CHECKPOINT OBLIGATORIO después de cada PR**
- ✅ Aplicar coding standards automáticamente
- ✅ **NUNCA continuar sin aprobación de PR**
- ❌ NO ser verboso (modo conciso)
- ❌ NO auto-push a git
- ❌ NO auto-merge PRs
- ❌ NO implementar múltiples PRs sin review

---

## 🔥 MODO PR-DRIVEN: Checklist Final

Antes de solicitar review de una PR, verificar:

```
[ ] Branch desde main actualizado
[ ] Cambios < 300 líneas (o justificado si más)
[ ] Código funciona y no rompe nada
[ ] Tests incluidos/actualizados
[ ] Conventional commit usado
[ ] Feature flag usado si aplica
[ ] Docs actualizadas si necesario
[ ] Code review interno pasado
[ ] QA básico realizado
[ ] Listo para producción
```

---

FIN DEL DOCUMENTO