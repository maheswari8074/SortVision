<div align="center">
  
# 🌟 **Contributing to SortVision** 🌟

### *Help us improve SortVision and make sorting algorithms more visual and intuitive!*  

![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)
![Platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)
![GitHub Issues](https://img.shields.io/github/issues/alienx5499/sortvisioN?style=flat-square)
![Pull Requests](https://img.shields.io/github/issues-pr/alienx5499/sortvisioN?style=flat-square)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## **🛠️ How to Contribute**

### **1. Fork the Repository**
- Click the **Fork** button on the top-right corner of the repository page to create your copy.

### **2. Clone Your Fork**
- Clone the forked repository to your local machine:
  ```bash
  git clone https://github.com/<your-username>/SortVision.git
  ```
- Replace `<your-username>` with your GitHub username.

### **3. Create a New Branch**
- Create a branch for your feature or bug fix:
  ```bash
  git checkout -b feature-name
  ```
- Use a meaningful branch name (e.g., `improve-ui`, `fix-bug-xyz`).

### **4. Make Changes**
- Implement your changes in the codebase.
- Ensure your code follows best practices and is well-documented.
- Run tests and verify everything is working.

### **5. Commit Your Changes**
- Stage and commit your changes:
  ```bash
  git add .
  git commit -m "Describe your changes (e.g., Improved animation speed)"
  ```

### **6. Push to Your Branch**
- Push the changes to your forked repository:
  ```bash
  git push origin feature-name
  ```

### **7. Submit a Pull Request**
- Go to the original repository and click **New Pull Request**.
- Select your branch, provide a detailed description of your changes, and submit the pull request.

---

## **📂 Project Structure**

Below is an overview of the **SortVision** project structure:

```
SortVision
├─ .gitignore               # Specifies files Git should ignore (node_modules, build files, etc.)
├─ components.json          # Configuration for UI components (ShadCN UI setup)
├─ eslint.config.js         # ESLint configuration for enforcing coding standards
├─ index.html              # Entry HTML file that loads the React application
├─ jsconfig.json           # JavaScript configuration for path aliases and compiler options
├─ package-lock.json       # Lock file for ensuring consistent dependency versions
├─ package.json            # Contains project metadata, dependencies, and scripts
├─ pnpm-lock.yaml         # Lock file for pnpm package manager
├─ public/                # Static assets
│  ├─ favicon.svg        # Website favicon icon
│  ├─ manifest.json      # PWA manifest for app installation settings
│  ├─ mobile-fix.js      # JavaScript fixes for mobile-specific issues
│  ├─ mobile.css        # Mobile-specific CSS styles
│  ├─ splash.svg        # Splash screen image for branding
│  └─ sw.js             # Service Worker for PWA offline functionality
├─ src/                  # Source code directory
│  ├─ App.css           # Global styles for the main App component
│  ├─ App.jsx           # Root React component with routing and layout
│  ├─ algorithms/       # Sorting algorithm implementations
│  │  ├─ bubbleSort.jsx    # Bubble Sort algorithm
│  │  ├─ index.js          # Exports all sorting algorithms
│  │  ├─ insertionSort.jsx # Insertion Sort algorithm
│  │  ├─ mergeSort.jsx     # Merge Sort algorithm
│  │  ├─ quickSort.jsx     # Quick Sort algorithm
│  │  ├─ radixSort.jsx     # Radix Sort algorithm
│  │  └─ selectionSort.jsx # Selection Sort algorithm
│  ├─ components/       # UI components directory
│  │  ├─ ArrayVisualization.jsx  # Handles sorting bar visualization
│  │  ├─ ConfigPanel.jsx         # User interface for selecting sorting parameters
│  │  ├─ MetricsPanel.jsx        # Displays performance metrics like swaps and comparisons
│  │  ├─ SortingVisualizer.jsx   # Main component for sorting execution
│  │  ├─ VisualizationPanel.jsx  # Panel for displaying facts and details
│  │  └─ ui/                     # Reusable UI components (buttons, cards, sliders, etc.)
│  │     ├─ badge.jsx      # Badge component for labels
│  │     ├─ button.jsx     # Styled button component
│  │     ├─ card.jsx       # Card component for UI grouping
│  │     ├─ input.jsx      # Custom input field component
│  │     ├─ select.jsx     # Dropdown selection component
│  │     ├─ slider.jsx     # Slider for adjusting speed and array size
│  │     └─ tabs.jsx       # Tab component for navigation
│  ├─ index.css        # Global styles for the app
│  ├─ lib/            # Utility functions
│  │  └─ utils.js     # Common helper functions
│  └─ main.jsx        # Application entry point
└─ vite.config.js     # Vite bundler configuration
```

### **Why This Structure?**
- **🚀 Organized** → Components, logic, and styles are neatly separated.
- **🔧 Scalable** → Easy to add new features.
- **🛠️ Maintainable** → Clear structure for debugging and collaboration.

---

## **🤝 Code of Conduct**
By contributing to this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful, inclusive, and collaborative in all interactions.

---

## **💡 Tips for Contributing**
1. Check the **Issues** tab for open feature requests or bug reports.
2. Keep your commits small and focused on a single change.
3. Avoid committing unnecessary files.
4. Regularly sync your fork with the main repository:
   ```bash
   git pull upstream main
   ```

---

## **🛠️ Need Help?**
If you have any questions:
1. Open an **Issue** in the repository.
2. Contact the maintainers via the repository discussion section.

---

Thank you for contributing to **SortVision**! 🎉 Let's make sorting **visual, interactive, and fun**! 🚀
