<div align="center">

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

Here's a detailed breakdown of the **SortVision** project structure:

```
📦 SortVision
├─ .github                     # GitHub configuration files
│  ├─ ISSUE_TEMPLATE           # Templates for GitHub issues
│  │  ├─ bug_report.md         # Template for bug reports
│  │  └─ feature_request.md    # Template for feature requests
│  └─ dependabot.yml           # Dependabot configuration for automated dependency updates
├─ CODE_OF_CONDUCT.md          # Code of conduct for contributors
├─ CONTRIBUTING.md             # Guidelines for contributing to the project
├─ LICENSE                     # MIT License file
├─ README.md                   # Project documentation (this file)
└─ SortVision                  # Main project directory
   ├─ .gitignore               # Git ignore rules
   ├─ components.json          # ShadCN UI component configuration
   ├─ eslint.config.js         # ESLint configuration
   ├─ index.html               # Main HTML entry point
   ├─ jsconfig.json            # JavaScript configuration
   ├─ package-lock.json        # npm dependency lock file
   ├─ package.json             # Project dependencies and scripts
   ├─ pnpm-lock.yaml           # pnpm dependency lock file
   ├─ prerender.js             # Static site generation script
   ├─ public                   # Static assets
   │  ├─ debug.js              # Debugging utilities
   │  ├─ favicon.svg           # Website favicon
   │  ├─ google12e2679e2ea95334.html  # Google site verification
   │  ├─ manifest.json         # PWA manifest
   │  ├─ mobile-fix.js         # Mobile-specific fixes
   │  ├─ mobile.css            # Mobile-specific styles
   │  ├─ og-image.png          # OpenGraph image for social sharing
   │  ├─ robots.txt            # Search engine crawling instructions
   │  ├─ sitemap.xml           # Site structure for search engines
   │  ├─ splash.svg            # PWA splash screen
   │  └─ sw.js                 # Service worker for offline functionality
   ├─ scripts                  # Build and utility scripts
   │  ├─ build-with-seo.js     # SEO optimization script
   │  └─ generate-sitemap.js   # Sitemap generation
   ├─ src                      # Source code
   │  ├─ App.css               # Main application styles
   │  ├─ App.jsx               # Main application component
   │  ├─ algorithms            # Sorting algorithm implementations
   │  │  ├─ bubbleSort.jsx     # Bubble Sort implementation
   │  │  ├─ bucketSort.jsx     # Bucket Sort implementation
   │  │  ├─ heapSort.jsx       # Heap Sort implementation
   │  │  ├─ index.js           # Algorithm export file
   │  │  ├─ insertionSort.jsx  # Insertion Sort implementation
   │  │  ├─ mergeSort.jsx      # Merge Sort implementation
   │  │  ├─ quickSort.jsx      # Quick Sort implementation
   │  │  ├─ radixSort.jsx      # Radix Sort implementation
   │  │  └─ selectionSort.jsx  # Selection Sort implementation
   │  ├─ components            # React components
   │  │  ├─ SortingVisualizer.jsx  # Main visualization component
   │  │  ├─ panels             # UI panels
   │  │  │  ├─ ConfigPanel.jsx       # Configuration panel
   │  │  │  ├─ DetailsPanel.jsx      # Algorithm details panel
   │  │  │  ├─ MetricsPanel.jsx      # Performance metrics panel
   │  │  │  ├─ config               # Configuration components
   │  │  │  │  ├─ AlgorithmSelector.jsx  # Algorithm selection component
   │  │  │  │  ├─ ArraySizeControl.jsx   # Array size control
   │  │  │  │  ├─ ComplexityInfo.jsx     # Algorithm complexity info
   │  │  │  │  ├─ ControlButtons.jsx     # Control buttons (start, pause, etc.)
   │  │  │  │  ├─ SpeedControl.jsx       # Animation speed control
   │  │  │  │  └─ index.js               # Config components export
   │  │  │  ├─ details                # Details panel components
   │  │  │  │  ├─ AlgorithmDetails.jsx   # Detailed algorithm description
   │  │  │  │  ├─ AlgorithmInfo.jsx      # Algorithm information
   │  │  │  │  ├─ AlgorithmSelector.jsx  # Algorithm selection for details
   │  │  │  │  ├─ DataPanel.jsx          # Data visualization panel
   │  │  │  │  ├─ FunFact.jsx            # Fun facts about algorithms
   │  │  │  │  ├─ InteractiveTip.jsx     # Interactive usage tips
   │  │  │  │  └─ index.js               # Details components export
   │  │  │  ├─ index.js              # Panels export
   │  │  │  └─ metrics               # Metrics panel components
   │  │  │     ├─ AlgorithmComparison.jsx # Algorithm comparison
   │  │  │     ├─ CurrentRunMetrics.jsx   # Current run performance
   │  │  │     ├─ RankingCard.jsx         # Algorithm ranking card
   │  │  │     ├─ TestControls.jsx        # Performance test controls
   │  │  │     ├─ WinnerSummary.jsx       # Best algorithm summary
   │  │  │     └─ index.js                # Metrics components export
   │  │  ├─ sortingVisualizer      # Core visualization components
   │  │  │  ├─ PerformanceMetrics.jsx  # Performance metrics display
   │  │  │  ├─ SortingControls.jsx     # Sorting controls
   │  │  │  ├─ SortingHeader.jsx       # Header for visualization
   │  │  │  ├─ SortingVisualizer.jsx   # Main visualizer component
   │  │  │  └─ index.js                # Visualizer components export
   │  │  ├─ ui                    # Reusable UI components
   │  │  │  ├─ badge.jsx              # Badge component
   │  │  │  ├─ button.jsx             # Button component
   │  │  │  ├─ card.jsx               # Card component
   │  │  │  ├─ input.jsx              # Input component
   │  │  │  ├─ select.jsx             # Select dropdown component
   │  │  │  ├─ slider.jsx             # Slider component
   │  │  │  └─ tabs.jsx               # Tabs component
   │  │  └─ visualizations        # Array visualization components
   │  │     ├─ ArrayVisualization.jsx  # Array visualization
   │  │     └─ index.js                # Visualization components export
   │  ├─ index.css               # Global CSS styles
   │  ├─ lib                     # Utility libraries
   │  │  └─ utils.js             # Common utility functions
   │  ├─ main.jsx                # Application entry point
   │  └─ utils                   # Helper functions
   │     └─ seo.js               # SEO optimization utilities
   └─ vite.config.js            # Vite bundler configuration
```

### 📁 **Key Directories and Files**:

- **`.github/`**: Contains GitHub-specific configuration files for issues, PRs, and automated workflows
- **`CODE_OF_CONDUCT.md`** & **`CONTRIBUTING.md`**: Guidelines for community participation
- **`LICENSE`**: MIT License file defining terms of use
- **`SortVision/`**: Main project directory containing the application code
  - **`public/`**: Static assets, SEO files, and PWA configuration
  - **`scripts/`**: Build automation and utility scripts
  - **`src/`**: Source code for the application
    - **`algorithms/`**: Implementation of each sorting algorithm with visualization steps
    - **`components/`**: React components organized by feature and function
      - **`panels/`**: Different UI panels (Configuration, Details, Metrics)
      - **`sortingVisualizer/`**: Core visualization components
      - **`ui/`**: Reusable UI components following design system
      - **`visualizations/`**: Visual representation components for arrays
    - **`lib/`** & **`utils/`**: Utility functions, helpers, and shared code

### 📊 **Component Organization**:

1. **Algorithm Implementation**: Each sorting algorithm is implemented in its own file in the `algorithms/` directory
2. **UI Components**: Organized into logical groups based on functionality
3. **Panels**: Three main panels provide different views of the sorting process:
   - **Config Panel**: Controls for algorithm selection and visualization settings
   - **Details Panel**: Educational information about algorithms
   - **Metrics Panel**: Performance data and algorithm comparisons
4. **Core Visualization**: Components that handle the array visualization and animation

---

## 📸 **Screenshots**

<div align="center">

### **Visualizer & Metric Selection Screens**

<table>
<tr>
  <td><img src="https://github.com/user-attachments/assets/ad19ce9d-8296-4191-a622-c1aa4b779c81" alt="Visualizer Screen" width="1600px"></td>
  <td><img src="https://github.com/user-attachments/assets/02c5eeb7-f4d6-4dcc-9d76-0c2e15891014" alt="Metric Screen" width="1600px"></td>
  <td><img src="https://github.com/user-attachments/assets/e9e486a4-8b53-429a-8d0d-1722262ec60a" alt="Metric Screen" width="1600px"></td>
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

