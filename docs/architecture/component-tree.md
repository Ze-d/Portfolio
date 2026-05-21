# Component Tree

## Structure

```
App.vue
├── NavBar.vue
└── <router-view>
    ├── HomePage.vue
    │   ├── HeroSection.vue
    │   └── ProjectGrid.vue
    │       └── ProjectCard.vue × N
    │           └── TechTag.vue × N
    └── ProjectDetail.vue
        ├── ImageGallery.vue
        └── TechTag.vue × N
```

## Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| NavBar | Fixed top navigation with site name and external links |
| HeroSection | Avatar, name, tagline, social links |
| ProjectGrid | Fetches projects via useProjects, renders grid of ProjectCards |
| ProjectCard | Clickable card: cover image, name, summary, tech tags, featured badge |
| TechTag | Small pill badge for a single technology name |
| ImageGallery | Large image + clickable thumbnail strip |
| HomePage | Composes HeroSection + ProjectGrid |
| ProjectDetail | Fetches project by route param, renders ImageGallery + info |
