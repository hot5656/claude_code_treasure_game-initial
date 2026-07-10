# Graph Report - .  (2026-07-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 456 nodes · 827 edges · 25 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 1% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.64)
- Token cost: 28,072 input · 393 output

## Community Hubs (Navigation)
- Alert Dialog Component
- Project Dependencies
- Game App Core Logic
- Input & Sidebar UI
- Avatar & Breadcrumb UI
- Chart Component
- Auth & Session Backend
- Docs & Attributions
- Command & Dialog UI
- Build Scripts & Tooling
- Menubar Component
- Context Menu Component
- Dropdown Menu Component
- Carousel Component
- Form Field Component
- Drawer Component
- Select Component
- Sheet Component
- Navigation Menu Component
- Toggle Component
- Sidebar Navigation
- Accordion Component
- Alert Component

## God Nodes (most connected - your core abstractions)
1. `cn()` - 223 edges
2. `App()` - 19 edges
3. `react` - 15 edges
4. `buttonVariants` - 9 edges
5. `Button()` - 8 edges
6. `scripts` - 6 edges
7. `useCarousel()` - 6 edges
8. `useFormField()` - 6 edges
9. `useSidebar()` - 6 edges
10. `ChartTooltipContent()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Flaticon key icon` --conceptually_related_to--> `Gold key icon`  [INFERRED]
  Attributions.md → src/assets/key.png
- `Carousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Sign-in/sign-out authentication flow** — src_app_handleauthenticated, src_app_handlesignout, src_lib_api_storesession, src_lib_api_clearsession, src_lib_api_signout, src_components_authscreen [INFERRED 0.80]
- **Treasure chest visual state assets** — src_assets_treasure_closed, src_assets_treasure_opened, src_assets_treasure_opened_skeleton, src_assets_key [INFERRED 0.85]
- **Score submission and retrieval for signed-in players** — src_app_app, src_lib_api_submitscore, src_lib_api_fetchmyscores, src_lib_api_scoresummary [EXTRACTED 0.85]

## Communities (25 total, 0 thin omitted)

### Community 0 - "Alert Dialog Component"
Cohesion: 0.05
Nodes (27): AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay(), AlertDialogTitle() (+19 more)

### Community 1 - "Project Dependencies"
Cohesion: 0.04
Nodes (45): dependencies, bcryptjs, better-sqlite3, class-variance-authority, clsx, cmdk, embla-carousel-react, express (+37 more)

### Community 2 - "Game App Core Logic"
Cohesion: 0.09
Nodes (37): App(), Box, handleAuthenticated, handlePlayAsGuest, handleSignOut, initializeGame, resetGame, Closed treasure chest icon (+29 more)

### Community 3 - "Input & Sidebar UI"
Cohesion: 0.08
Nodes (27): Input(), Separator(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+19 more)

### Community 4 - "Avatar & Breadcrumb UI"
Cohesion: 0.12
Nodes (23): Avatar(), AvatarFallback(), AvatarImage(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+15 more)

### Community 5 - "Chart Component"
Cohesion: 0.11
Nodes (18): input-otp, react, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent() (+10 more)

### Community 6 - "Auth & Session Backend"
Cohesion: 0.11
Nodes (19): bcrypt, createSession(), crypto, db, deleteSession(), getUserByToken(), hashPassword(), requireAuth() (+11 more)

### Community 7 - "Docs & Attributions"
Cohesion: 0.12
Nodes (13): Flaticon key icon, freesound.org miksmusic sound (497707), freesound.org steprock sound (771164), Pixabay sound effects (115095), deploy_github_page.md (custom command), deploy_vercel.md (custom command), graphify knowledge graph tool, SQLite (Node.js docs) (+5 more)

### Community 8 - "Command & Dialog UI"
Cohesion: 0.12
Nodes (14): Command(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator(), CommandShortcut(), Dialog() (+6 more)

### Community 9 - "Build Scripts & Tooling"
Cohesion: 0.12
Nodes (16): devDependencies, concurrently, @types/better-sqlite3, @types/express, @types/node, vite, @vitejs/plugin-react-swc, name (+8 more)

### Community 10 - "Menubar Component"
Cohesion: 0.12
Nodes (11): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarItem(), MenubarLabel(), MenubarRadioItem(), MenubarSeparator(), MenubarShortcut() (+3 more)

### Community 11 - "Context Menu Component"
Cohesion: 0.12
Nodes (9): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+1 more)

### Community 12 - "Dropdown Menu Component"
Cohesion: 0.12
Nodes (9): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 13 - "Carousel Component"
Cohesion: 0.20
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 14 - "Form Field Component"
Cohesion: 0.22
Nodes (10): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItemContext, FormItemContextValue, FormLabel(), FormMessage() (+2 more)

### Community 15 - "Drawer Component"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 16 - "Select Component"
Cohesion: 0.18
Nodes (7): SelectContent(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator(), SelectTrigger()

### Community 17 - "Sheet Component"
Cohesion: 0.18
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 18 - "Navigation Menu Component"
Cohesion: 0.22
Nodes (9): NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList(), NavigationMenuTrigger(), navigationMenuTriggerStyle (+1 more)

### Community 19 - "Toggle Component"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 20 - "Sidebar Navigation"
Cohesion: 0.33
Nodes (6): Sidebar(), SidebarMenuButton(), sidebarMenuButtonVariants, SidebarRail(), SidebarTrigger(), useSidebar()

### Community 21 - "Accordion Component"
Cohesion: 0.40
Nodes (3): AccordionContent(), AccordionItem(), AccordionTrigger()

### Community 22 - "Alert Component"
Cohesion: 0.50
Nodes (4): Alert(), AlertDescription(), AlertTitle(), alertVariants

## Ambiguous Edges - Review These
- `README.md` → `deploy_github_page.md (custom command)`  [AMBIGUOUS]
  README.md · relation: references
- `README.md` → `deploy_vercel.md (custom command)`  [AMBIGUOUS]
  README.md · relation: references
- `chest_open.mp3` → `freesound.org steprock sound (771164)`  [AMBIGUOUS]
  Attributions.md · relation: conceptually_related_to
- `chest_open.mp3` → `Pixabay sound effects (115095)`  [AMBIGUOUS]
  Attributions.md · relation: conceptually_related_to
- `chest_open_with_evil_laugh.mp3` → `freesound.org miksmusic sound (497707)`  [AMBIGUOUS]
  Attributions.md · relation: conceptually_related_to

## Knowledge Gaps
- **100 isolated node(s):** `name`, `version`, `private`, `@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `README.md` and `deploy_github_page.md (custom command)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `README.md` and `deploy_vercel.md (custom command)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `chest_open.mp3` and `freesound.org steprock sound (771164)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `chest_open.mp3` and `Pixabay sound effects (115095)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `chest_open_with_evil_laugh.mp3` and `freesound.org miksmusic sound (497707)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `Avatar & Breadcrumb UI` to `Alert Dialog Component`, `Game App Core Logic`, `Input & Sidebar UI`, `Chart Component`, `Command & Dialog UI`, `Menubar Component`, `Context Menu Component`, `Dropdown Menu Component`, `Carousel Component`, `Form Field Component`, `Drawer Component`, `Select Component`, `Sheet Component`, `Navigation Menu Component`, `Toggle Component`, `Sidebar Navigation`, `Accordion Component`, `Alert Component`?**
  _High betweenness centrality (0.663) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Project Dependencies` to `Build Scripts & Tooling`, `Chart Component`?**
  _High betweenness centrality (0.239) - this node is a cross-community bridge._