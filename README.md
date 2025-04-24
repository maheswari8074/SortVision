<img width="1512" alt="Screenshot 2025-04-25 at 1 22 48 AM" src="https://github.com/user-attachments/assets/ece9d813-a3ff-4212-8496-226d221a3d03" /><div align="center">

# 🌟 **SortVision** 🌟  
### *Interactive Sorting Algorithm Visualizer*

[![Build Passing](https://img.shields.io/badge/build-passing-success?style=flat-square)](https://github.com/alienx5499/sortvisioN/actions)
[![Node.js](https://img.shields.io/badge/Node.js-v16.10.0-green?style=flat-square)](https://nodejs.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/alienx5499/sortvisioN/blob/main/CONTRIBUTING.md)
[![License: MIT](https://custom-icon-badges.herokuapp.com/github/license/alienx5499/sortvisioN?logo=law&logoColor=white)](https://github.com/alienx5499/sortvisioN/blob/main/LICENSE)
[![Platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)](https://sortvision.vercel.app/)
[![Views](https://hits.dwyl.com/alienx5499/sortvisioN.svg)](https://hits.dwyl.com/alienx5499/sortvisioN)
[![⭐ GitHub stars](https://img.shields.io/github/stars/alienx5499/sortvisioN?style=social)](https://github.com/alienx5499/sortvisioN/stargazers)
[![🍴 GitHub forks](https://img.shields.io/github/forks/alienx5499/sortvisioN?style=social)](https://github.com/alienx5499/sortvisioN/network)
[![Commits](https://badgen.net/github/commits/alienx5499/sortvisioN)](https://github.com/alienx5499/sortvisioN/commits/main)
[![🐛 GitHub issues](https://img.shields.io/github/issues/alienx5499/sortvisioN)](https://github.com/alienx5499/sortvisioN/issues)
[![📂 GitHub pull requests](https://img.shields.io/github/issues-pr/alienx5499/sortvisioN)](https://github.com/alienx5499/sortvisioN/pulls)
[![💾 GitHub code size](https://img.shields.io/github/languages/code-size/alienx5499/sortvisioN)](https://github.com/alienx5499/sortvisioN)

</div>

---

## 🎯 **What is SortVision?**

SortVision is an interactive web application that brings sorting algorithms to life through real-time visualization. Built with modern web technologies, it provides an engaging platform for learning and understanding various sorting algorithms.

### 🌟 **Key Features**

- **Interactive Visualizations**: Watch sorting algorithms in action with real-time animations
- **Multiple Algorithms**: Explore 8 different sorting algorithms
- **Customizable Parameters**: Adjust speed, array size, and more
- **Performance Metrics**: Track comparisons, swaps, and time complexity
- **Educational Insights**: Learn about algorithm behavior and efficiency
- **Responsive Design**: Works seamlessly on desktop and mobile devices

> *"Visualize your data, understand sorting better!"*

---

## 📚 **Table of Contents**
1. [✨ Features](#-features)
2. [🦾 Tech Stack](#-tech-stack)
3. [📂 Project Structure](#-project-structure)
4. [📸 Screenshots](#-screenshots)
5. [🚀 Quick Start](#-quick-start)
6. [👨‍🔧 Detailed Setup](#-detailed-setup)
7. [🎯 Target Audience](#-target-audience)
8. [🤝 Contributing](#-contributing)
9. [🌟 Awesome Contributors](#-awesome-contributors)
10. [📜 License](#-license)
11. [📬 Feedback & Suggestions](#-feedback--suggestions)

---

## ✨ **Features**

### 🎮 **Interactive Visualization**
- Real-time visual representation of sorting steps
- Adjustable animation speed
- Pause and resume functionality
- Array size customization
- Random array generation

### 📊 **Supported Algorithms**
- **Bubble Sort**: Simple comparison-based algorithm
- **Selection Sort**: In-place comparison sorting
- **Insertion Sort**: Adaptive sorting algorithm
- **Merge Sort**: Divide-and-conquer algorithm
- **Quick Sort**: Efficient, in-place sorting
- **Heap Sort**: Comparison-based sorting using binary heap data structure
- **Radix Sort**: Non-comparative integer sorting
- **Bucket Sort**: Distribution sort that groups elements into buckets

### 📈 **Performance Tracking**
- Real-time comparison count
- Swap operation tracking
- Time complexity visualization
- Algorithm efficiency metrics

### 🎨 **User Interface**
- Modern, responsive design
- Dark mode support
- Mobile-friendly interface
- Intuitive controls

---

## 🦾 **Tech Stack**

### 🌐 **Frontend Technologies**
- **Framework**: React.js with Vite
- **UI Components**: ShadCN
- **Styling**: TailwindCSS
- **Icons**: Lucide
- **Animations**: Framer Motion
- **State Management**: React Hooks

### 🛠️ **Development Tools**
- **Build Tool**: Vite
- **Package Manager**: npm/pnpm
- **Code Quality**: ESLint
- **Version Control**: Git
- **Deployment**: Vercel

### 🔧 **Future Enhancements**
- Backend integration with Node.js
- User preferences storage
- Algorithm performance history
- Custom algorithm support

---

## 📂 **Project Structure**

```
SortVision/                  # Main project repository
├── src/                     # Source code directory
│   ├── algorithms/          # Sorting algorithm implementations
│   ├── components/          # React components
│   ├── styles/              # CSS styles
│   ├── utils/               # Utility functions
│   └── App.js               # Main application component
├── public/                  # Public assets and static files
│   ├── devTools/            # Development & debugging tools
│   │   ├── core.js          # Core utilities & initialization
│   │   ├── device-info.js   # Device information display
│   │   ├── index.js         # Entry point for debug tools
│   │   ├── monitoring.js    # Performance monitoring
│   │   ├── performance.js   # Performance metrics tracking
│   │   └── ui.js            # Debug UI components
│   ├── assets/              # Static assets (images, fonts)
│   └── index.html           # HTML entry point
└── docs/                    # Documentation files
```

### 📁 **Key Directories and Files**:

- **src/algorithms/**: Contains implementations of various sorting algorithms, including merge sort, quick sort, bubble sort, etc.
- **src/components/**: React components that make up the user interface.
- **src/styles/**: CSS files for styling components.
- **src/utils/**: Utility functions used across the application.
- **public/devTools/**: Development and debugging tools for monitoring performance and device information.
  - **core.js**: Core utilities and initialization logic for debug tools.
  - **device-info.js**: Detects and displays device-specific information.
  - **index.js**: Main entry point that loads and initializes the debug tools.
  - **monitoring.js**: Monitors application performance and logs issues.
  - **performance.js**: Tracks and displays performance metrics.
  - **ui.js**: Provides the UI components for the debug panel.
- **public/assets/**: Static assets like images and fonts.
- **docs/**: Documentation files, including algorithm explanations.

### 📁 **Detailed Project Structure**:

```
📦 SortVision                # Root project directory
├─ .github                   # GitHub specific configurations
│  ├─ ISSUE_TEMPLATE         # Templates for GitHub issues
│  │  ├─ bug_report.md       # Bug report template
│  │  └─ feature_request.md  # Feature request template
│  └─ dependabot.yml         # Dependabot configuration
├─ .vite                     # Vite build tool cache
│  └─ deps                   # Dependency optimization cache
│     ├─ _metadata.json      # Dependency metadata
│     └─ package.json        # Dependency package information
├─ CODE_OF_CONDUCT.md        # Community code of conduct
├─ CONTRIBUTING.md           # Contribution guidelines
├─ LICENSE                   # MIT license file
├─ README.md                 # Project documentation (this file)
└─ SortVision                # Main application directory
   ├─ .gitignore             # Git ignore configuration
   ├─ components.json        # Component configuration
   ├─ eslint.config.js       # ESLint configuration
   ├─ index.html             # Main HTML entry point
   ├─ jsconfig.json          # JavaScript configuration
   ├─ package-lock.json      # NPM package lock
   ├─ package.json           # NPM package definition
   ├─ pnpm-lock.yaml         # PNPM package lock
   ├─ prerender.js           # Prerendering logic for SEO
   ├─ public                 # Public static assets
   │  ├─ devTools            # Developer tools directory
   │  │  ├─ core.js          # Core utilities and initialization
   │  │  ├─ device-info.js   # Device detection and information
   │  │  ├─ index.js         # Main entry point for debug tools
   │  │  ├─ monitoring.js    # Performance monitoring utilities
   │  │  ├─ performance.js   # Performance metrics tracking
   │  │  └─ ui.js            # Debug UI components and panel
   │  ├─ favicon.svg         # Site favicon
   │  ├─ google12e2679e2ea95334.html # Google site verification
   │  ├─ manifest.json       # PWA manifest
   │  ├─ mobile.css          # Mobile-specific styles
   │  ├─ og-image.png        # Open Graph image for sharing
   │  ├─ robots.txt          # Search engine crawling instructions
   │  ├─ sitemap.xml         # Site map for search engines
   │  ├─ splash.svg          # App splash screen
   │  └─ sw.js               # Service worker for offline support
   ├─ scripts                # Build and utility scripts
   │  ├─ build-with-seo.js   # Build script with SEO optimization
   │  └─ generate-sitemap.js # Sitemap generator
   ├─ src                    # Source code
   │  ├─ App.css             # App-level styles
   │  ├─ App.jsx             # Main App component
   │  ├─ algorithms          # Sorting algorithm implementations
   │  │  ├─ bubbleSort.jsx   # Bubble sort implementation
   │  │  ├─ bucketSort.jsx   # Bucket sort implementation
   │  │  ├─ heapSort.jsx     # Heap sort implementation
   │  │  ├─ index.js         # Algorithm exports
   │  │  ├─ insertionSort.jsx # Insertion sort implementation
   │  │  ├─ mergeSort.jsx    # Merge sort implementation
   │  │  ├─ quickSort.jsx    # Quick sort implementation
   │  │  ├─ radixSort.jsx    # Radix sort implementation
   │  │  └─ selectionSort.jsx # Selection sort implementation
   │  ├─ components          # UI components
   │  │  ├─ MobileOverlay.jsx # Mobile device support
   │  │  ├─ SortingVisualizer.jsx # Main visualization component
   │  │  ├─ panels           # UI panels
   │  │  │  ├─ ConfigPanel.jsx # Configuration panel
   │  │  │  ├─ DetailsPanel.jsx # Algorithm details panel
   │  │  │  ├─ MetricsPanel.jsx # Performance metrics panel
   │  │  │  ├─ config        # Configuration components
   │  │  │  │  ├─ AlgorithmSelector.jsx # Algorithm selection
   │  │  │  │  ├─ ArraySizeControl.jsx # Array size controls
   │  │  │  │  ├─ ComplexityInfo.jsx # Complexity information
   │  │  │  │  ├─ ControlButtons.jsx # Control buttons
   │  │  │  │  ├─ SpeedControl.jsx # Animation speed control
   │  │  │  │  └─ index.js   # Config component exports
   │  │  │  ├─ details       # Detail components
   │  │  │  │  ├─ AlgorithmDetails.jsx # Algorithm detail display
   │  │  │  │  ├─ AlgorithmInfo.jsx # Algorithm information
   │  │  │  │  ├─ AlgorithmSelector.jsx # Algorithm selection
   │  │  │  │  ├─ DataPanel.jsx # Data display panel
   │  │  │  │  ├─ FunFact.jsx # Fun facts about algorithms
   │  │  │  │  ├─ InteractiveTip.jsx # Interactive tips
   │  │  │  │  └─ index.js   # Detail component exports
   │  │  │  ├─ index.js      # Panel component exports
   │  │  │  └─ metrics       # Metric components
   │  │  │     ├─ AlgorithmComparison.jsx # Algorithm comparisons
   │  │  │     ├─ CurrentRunMetrics.jsx # Current run metrics
   │  │  │     ├─ RankingCard.jsx # Algorithm ranking display
   │  │  │     ├─ TestControls.jsx # Testing controls
   │  │  │     ├─ WinnerSummary.jsx # Algorithm comparison results
   │  │  │     └─ index.js   # Metric component exports
   │  │  ├─ sortingVisualizer # Visualization components
   │  │  │  ├─ PerformanceMetrics.jsx # Performance display
   │  │  │  ├─ SortingControls.jsx # Sorting control buttons
   │  │  │  ├─ SortingHeader.jsx # Visualization header
   │  │  │  ├─ SortingVisualizer.jsx # Main visualizer
   │  │  │  └─ index.js      # Visualizer component exports
   │  │  ├─ ui               # UI component library
   │  │  │  ├─ badge.jsx     # Badge component
   │  │  │  ├─ button.jsx    # Button component
   │  │  │  ├─ card.jsx      # Card component
   │  │  │  ├─ input.jsx     # Input component
   │  │  │  ├─ select.jsx    # Select dropdown component
   │  │  │  ├─ slider.jsx    # Slider component
   │  │  │  └─ tabs.jsx      # Tabs component
   │  │  └─ visualizations   # Visualization components
   │  │     ├─ ArrayVisualization.jsx # Array visual representation
   │  │     └─ index.js      # Visualization component exports
   │  ├─ index.css           # Global styles
   │  ├─ lib                 # Library utilities
   │  │  └─ utils.js         # Shared utility functions
   │  ├─ main.jsx            # Application entry point
   │  └─ utils               # Utility modules
   │     └─ seo.js           # SEO optimization utilities
   └─ vite.config.js         # Vite configuration
```

---

## 📸 **Screenshots**

<div align="center">

### **Visualizer & Metric Selection Screens**

<table>
<tr>
  <td><img src="https://github.com/user-attachments/assets/c409c51b-341b-4c91-9739-8e074abc8d95" alt="Visualizer Screen" width="1600px"></td>
  <td><img src="https://github.com/user-attachments/assets/d5d9c1ed-1687-457f-bae6-0101537d4200" alt="Metric Screen" width="1600px"></td>
  <td><img src="https://github.com/user-attachments/assets/20ec634a-ffb9-4b1a-8b03-1ceb003a2001" alt="Metric Screen" width="1600px"></td>
</tr>
<tr>
  <td><b>Visualizer Screen</b></td>
  <td><b>Metric Screen</b></td>
  <td><b>Details Screen</b></td>
</tr>
<tr>
  <td><img src="https://github.com/user-attachments/assets/e5164c6e-78bf-444f-a41a-e36b91a6527c" alt="Visualizer Screen" width="1600px"></td>
  <td><img src="https://github.com/user-attachments/assets/671f67f9-53db-4dab-a4d3-003f53134307" alt="Metric Screen" width="1600px"></td>
  <td><img src="https://github.com/user-attachments/assets/962b2e79-1f63-4a04-a36a-67d53c7b2561" alt="Metric Screen" width="1600px"></td>
</tr>
<tr>
  <td><b>Visualizer Screen</b></td>
  <td><b>Metric Screen</b></td>
  <td><b>Details Screen</b></td>
</tr>
</table>

</div>

---

## 🚀 **Quick Start**

1. **Visit the Website**
   [![Try the WebSite](https://img.shields.io/badge/Try%20the%20WebSite-blue?style=flat-square&logo=react)](https://sortvision.vercel.app/)

2. **Choose an Algorithm**
   - Select from the available sorting algorithms
   - Adjust visualization parameters

3. **Start Visualizing**
   - Click "Start" to begin the visualization
   - Use controls to adjust speed and pause/resume

---

## 👨‍🔧 **Detailed Setup**

### **Prerequisites**
- **Node.js** (v16.10.0 or higher)
- **npm** or **pnpm** package manager
- **Git** for version control

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/alienx5499/SortVision.git
   ```

2. **Navigate to Project Directory**
   ```bash
   cd SortVision
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open in Browser**
   - Visit `http://localhost:3000`
   - Start exploring sorting algorithms!

---

## 🎯 **Target Audience**

### 👨‍🎓 **Students**
- Visual learning of sorting algorithms
- Understanding time complexity
- Algorithm comparison and analysis

### 👨‍🏫 **Educators**
- Interactive teaching tool
- Algorithm demonstration
- Performance visualization

### 👨‍💻 **Developers**
- Algorithm implementation reference
- Performance optimization insights
- Code structure examples

### 📊 **Data Enthusiasts**
- Algorithm behavior analysis
- Performance comparison
- Data structure visualization

---

## 🤝 **Contributing**

We ❤️ open source! Your contributions make this project better.

### **How to Contribute**

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/SortVision.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**

### **Contribution Guidelines**
- Follow the existing code style
- Add tests for new features
- Update documentation
- Keep commits clean and meaningful

---

## <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="30"> **Awesome Contributors**

<div align="center">
	<h3>Thank you for contributing to our repository</h3><br>
	<p align="center">
		<a href="https://github.com/alienx5499/SortVisioN/contributors">
			<img src="https://contrib.rocks/image?repo=alienx5499/SortVisioN" width="180" height="95" />
		</a>
	</p>
</div>

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 📬 **Feedback & Suggestions**
*We value your input! Share your thoughts through [GitHub Issues](https://github.com/alienx5499/sortvisioN/issues).*

💡 *Let's work together to enhance the understanding of sorting algorithms!*

</div>
