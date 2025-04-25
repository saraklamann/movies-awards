# Movie Awards

This is a responsive Angular application that displays analytics and a paginated list of movies retrieved from a public API. The app also supports multi-language functionality with dynamic translations from JSON files.

## Features

- **Dashboard View**: Displays analytics such as:
  - Years with multiple winners
  - Studios with most wins
  - Producers with longest/shortest intervals between wins
  - Search for winners by year

- **All Movies View**:
  - Paginated table of movies (15 per page)
  - Filters by year and winner status

- 🌐 **i18n Translation System**:
  - Custom-built translation service using JSON files
  - Lazy loading of translation files per page

- 📱 **Responsive Design**:
  - Mobile-friendly (minimum resolution 768x1280)

## Getting Started

### Prerequisites

- Node.js v18+
- Angular CLI v17+

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/movies-awards.git
cd movies-awards
```

2. **Install dependencies**

```bash
npm install
```

3. **Start a local development server**

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

3. **To build the project run:**

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

