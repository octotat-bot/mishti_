# 📝 CreativeNotes - Advanced Note-Taking Application

A modern, feature-rich note-taking application built with React, featuring authentication, rich text editing, and advanced organization tools.

![CreativeNotes](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-green)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔐 **Authentication & User Management**
- **Secure Authentication** with Clerk
- **User Profiles** with avatars and dropdowns
- **User-Specific Data** - each user's notes are completely separate
- **Social Login Support** (configurable)

### 📝 **Rich Note Editor**
- **Rich Text Formatting** - Bold, italic, underline, strikethrough
- **Advanced Formatting** - Headers, quotes, code blocks, lists
- **Special Insertions** - Date, time, checkboxes, separators
- **Live Preview** - See formatted text while editing
- **Keyboard Shortcuts** - Ctrl+B, Ctrl+I, Ctrl+U

### 📚 **Notebooks Organization**
- **Create Notebooks** with custom names and colors
- **Visual Organization** with color-coded notebook cards
- **Notebook Management** - Edit, delete, and organize
- **Note Assignment** - Assign notes to specific notebooks
- **Smart Filtering** - Filter notes by notebook

### 🏷️ **Tags System**
- **Flexible Tagging** - Multiple tags per note
- **Auto-Complete** - Smart tag suggestions while typing
- **Tag Management** - Create, edit, delete tags with colors
- **Tag Filtering** - Filter notes by one or multiple tags
- **Visual Tags** - Color-coded tag chips on notes

### 🗂️ **Advanced Organization**
- **Pin Notes** - Keep important notes at the top
- **Archive System** - Archive old notes without deleting
- **Trash & Recovery** - Soft delete with restore functionality
- **Search Everything** - Search across titles, content, and tags
- **Multiple Views** - Grid and list view modes

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Beautiful Interface** - Modern design with smooth animations
- **Dark/Light Theme Ready** - Clean, professional appearance
- **Intuitive Navigation** - Easy-to-use sidebar and controls
- **Visual Feedback** - Hover effects and state indicators

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/octotat-bot/mishti_.git
   cd mishti_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Clerk Setup

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your publishable key from the dashboard
4. Add it to your `.env.local` file
5. Configure sign-in methods in Clerk dashboard

## 🏗️ **Project Structure**

```
src/
├── components/           # React components
│   ├── AuthWrapper.jsx      # Authentication wrapper
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── NoteForm.jsx         # Note creation/editing
│   ├── FormattingToolbar.jsx # Text formatting controls
│   ├── NoteCard.jsx         # Individual note display
│   ├── NotesGrid.jsx        # Notes container
│   ├── HomeView.jsx         # Main notes view
│   ├── NotebooksView.jsx    # Notebooks management
│   ├── TagsView.jsx         # Tags management
│   ├── TrashView.jsx        # Deleted notes
│   ├── ArchiveView.jsx      # Archived notes
│   ├── SearchBar.jsx        # Search functionality
│   ├── TagInput.jsx         # Smart tag input
│   ├── UserProfile.jsx      # User profile dropdown
│   └── PlaceholderView.jsx  # Feature placeholders
├── hooks/               # Custom React hooks
│   └── useLocalStorage.js   # Persistent state management
├── utils/               # Utility functions
│   └── textFormatter.js     # Text formatting utilities
├── App.jsx             # Main application component
├── App.css             # Application styles
└── main.jsx            # Application entry point
```

## 🎯 **Usage Guide**

### Creating Your First Note
1. Sign in with your account
2. Click "New Note" in the sidebar
3. Enter a title and content
4. Select a notebook (optional)
5. Add tags (optional)
6. Use the formatting toolbar for rich text
7. Click "Save Note"

### Organizing with Notebooks
1. Click "📚 Notebooks" in sidebar
2. Click "New Notebook"
3. Choose a name and color
4. Use the notebook dropdown when creating notes
5. Filter notes by notebook in the sidebar

### Using Tags
1. Click "🏷️ Tags" in sidebar
2. Create tags with custom colors
3. Add tags when creating/editing notes
4. Use autocomplete for existing tags
5. Filter notes by tags

### Advanced Features
- **Pin Important Notes** - Click the pin icon
- **Archive Old Notes** - Click the archive icon
- **Search Everything** - Use the search bar
- **Switch Views** - Toggle between grid and list
- **Bulk Operations** - Select multiple notes

## 🛠️ **Development**

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Tech Stack

- **Frontend**: React 18, Vite
- **Authentication**: Clerk
- **Styling**: CSS3 with custom properties
- **State Management**: React hooks + localStorage
- **Build Tool**: Vite
- **Package Manager**: npm

### Component Architecture

The application follows a modular component architecture:

- **Container Components** - Handle state and business logic
- **Presentation Components** - Handle UI rendering
- **Custom Hooks** - Reusable state logic
- **Utility Functions** - Pure helper functions

## 🎨 **Customization**

### Themes
The app uses CSS custom properties for easy theming:

```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --background: #ffffff;
  --text: #2d3748;
  /* ... more variables */
}
```

### Adding Features
1. Create new components in `src/components/`
2. Add routes in `App.jsx`
3. Update sidebar navigation
4. Add corresponding styles

## 📱 **Mobile Support**

The application is fully responsive and works on:
- 📱 Mobile phones (iOS/Android)
- 📱 Tablets (iPad, Android tablets)
- 💻 Desktop computers
- 🖥️ Large screens

## 🔒 **Security**

- **Authentication** handled by Clerk (industry standard)
- **Data Isolation** - users can only access their own data
- **Secure Storage** - sensitive data properly handled
- **Environment Variables** - API keys kept secure

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Other Platforms
The app can be deployed to any static hosting service that supports React applications.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [Clerk](https://clerk.com) for authentication
- [Vite](https://vitejs.dev) for build tooling
- [React](https://reactjs.org) for the framework
- Icons from [Heroicons](https://heroicons.com)

## 📞 **Support**

If you have any questions or need help:

1. Check the [Issues](https://github.com/octotat-bot/mishti_/issues) page
2. Create a new issue if needed
3. Check the documentation files in the repository

---

**Built with ❤️ using React and modern web technologies**