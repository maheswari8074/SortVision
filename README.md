<div align="center">

# 🌟 **SortVision** 🌟  
### *Empowering users to visualize sorting algorithms in action*

![Build Passing](https://img.shields.io/badge/build-passing-success?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-v16.10.0-green?style=flat-square)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/alienx5499/sortvisioN/blob/main/CONTRIBUTING.md)
[![License: MIT](https://custom-icon-badges.herokuapp.com/github/license/alienx5499/sortvisioN?logo=law&logoColor=white)](https://github.com/alienx5499/sortvisioN/blob/main/LICENSE)
![Platform](https://img.shields.io/badge/platform-Web-brightgreen?style=flat-square)
![Views](https://hits.dwyl.com/alienx5499/sortvisioN.svg)
![⭐ GitHub stars](https://img.shields.io/github/stars/alienx5499/sortvisioN?style=social)
![🍴 GitHub forks](https://img.shields.io/github/forks/alienx5499/sortvisioN?style=social)
![Commits](https://badgen.net/github/commits/alienx5499/sortvisioN)
![🐛 GitHub issues](https://img.shields.io/github/issues/alienx5499/sortvisioN)
![📂 GitHub pull requests](https://img.shields.io/github/issues-pr/alienx5499/sortvisioN)
![💾 GitHub code size](https://img.shields.io/github/languages/code-size/alienx5499/sortvisioN)

</div>

---

## **📱 What is SortVision?**

The **SortVision** is a web-based sorting visualizer built using **React** and **JavaScript** that allows users to:
- Visualize various sorting algorithms in action.
- Customize sorting speed and array sizes.
- Track performance of algorithms visually in real-time.

> *"Visualize your data, understand sorting better!"*

---

## **📚 Table of Contents**
1. [✨ Features](#-features)
2. [🦾 Tech Stack](#-tech-stack)
3. [📸 Screenshots](#-screenshots)
4. [🧩 Try the WebSite](#-try-the-website)
5. [👨‍🔧 Setup Instructions](#-setup-instructions)
6. [🎯 Target Audience](#-target-audience)
7. [🤝 Contributing](#-contributing)
8. [🌟 Awesome Contributors](#-awesome-contributors)
9. [📜 License](#-license)
10. [📬 Feedback & Suggestions](#-feedback--suggestions)

---

## **✨ Features**  

### **Sorting Algorithms**
- Visualize multiple sorting algorithms, such as:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Radix Sort
- Real-time visual representation of sorting steps.
- Adjustable speed controls for better understanding of algorithm performance.

### **Interactive UI**
- Control the speed of sorting.
- Change array size dynamically.
- Pause and resume the algorithm during execution.

### **Customization**
- Modify array elements and view results instantly.
- Reset array to a shuffled state with a click of a button.

---

## **🦾 Tech Stack**

### 🌐 **Frontend Technologies**
- **Frontend Framework**: React.js
- **Build Tool**: Vite
- **Design Components**: ShadCN
- **Icons**: Lucide

### **Backend (optional for future extension)**
- Node.js (Optional for future features, like saving user data or algorithm preferences)

---

## **📂 Project Structure**

Here's a detailed breakdown of the **SortVision** project structure:

```
          # Project documentation and overview
   SortVision
   ├─ .gitignore         # Git ignore rules
   ├─ components.json    # ShadCN UI component configuration
   ├─ eslint.config.js   # ESLint configuration
   ├─ index.html         # Main HTML entry point
   ├─ jsconfig.json      # JavaScript configuration
   ├─ package.json       # Project dependencies and scripts
   ├─ prerender.js       # Static site generation script
   ├─ public/            # Static assets
   │  ├─ favicon.svg     # Website favicon
   │  ├─ manifest.json   # PWA manifest
   │  ├─ mobile-fix.js   # Mobile-specific fixes
   │  ├─ mobile.css      # Mobile-specific styles
   │  ├─ splash.svg      # PWA splash screen
   │  └─ sw.js           # Service worker
   ├─ scripts/           # Build and utility scripts
   │  ├─ build-with-seo.js      # SEO optimization script
   │  └─ generate-sitemap.js    # Sitemap generation
   ├─ src/               # Source code
   │  ├─ algorithms/     # Sorting algorithm implementations
   │  │  ├─ bubbleSort.jsx
   │  │  ├─ insertionSort.jsx
   │  │  ├─ mergeSort.jsx
   │  │  ├─ quickSort.jsx
   │  │  ├─ radixSort.jsx
   │  │  └─ selectionSort.jsx
   │  ├─ components/     # React components
   │  │  ├─ panels/      # UI panels (Config, Details, Metrics)
   │  │  ├─ sortingVisualizer/  # Core visualization components
   │  │  ├─ ui/          # Reusable UI components
   │  │  └─ visualizations/     # Array visualization components
   │  ├─ lib/           # Utility libraries
   │  └─ utils/         # Helper functions
   └─ vite.config.js    # Vite bundler configuration
```

### **Key Directories and Files**:

- **`/src/algorithms/`**: Contains implementations of various sorting algorithms
- **`/src/components/`**: Houses all React components organized by feature
  - **`panels/`**: UI panels for configuration, details, and metrics
  - **`sortingVisualizer/`**: Core visualization components
  - **`ui/`**: Reusable UI components (buttons, cards, etc.)
  - **`visualizations/`**: Array visualization components
- **`/public/`**: Static assets and PWA-related files
- **`/scripts/`**: Build and utility scripts for SEO and sitemap generation
- **`/src/lib/`** and **`/src/utils/`**: Utility functions and helper libraries

---

## **📸 Screenshots**

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

## **🧩 Try the WebSite**

<div align="center">

### **Want to Try the WebSite?**

Head over to the [**Releases**](https://github.com/alienx5499/sortvision/releases) tab on our GitHub repository to try the WebSite. Experience firsthand how the **SortVision** helps you visualize sorting algorithms efficiently!  
**Or click the link below to try the Website:**

[![Try the WebSite](https://img.shields.io/badge/Try%20the%20WebSite-blue?style=flat-square&logo=react)](https://sortvisionx.vercel.app/)

</div>

---

## **👨‍🔧 Setup Instructions**

### **Frontend Setup**
- **Prerequisites**
  - **Node.js** (v16.10.0 or higher)
  - **npm** or **Yarn** for dependency management
  - **Git** for version control

1. **Clone the Repository**
   ```bash
   git clone https://github.com/alienx5499/SortVision.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd SortVision
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Run the Application**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000 in your browser to see the app in action.
---

## **🎯 Target Audience**

1. **Students**: Learn sorting algorithms with a visual aid.
2. **Educators**: Use this tool to demonstrate algorithm performance in class.
3. **Developers**: Improve understanding of sorting algorithm behavior and efficiency.
4. **Data Enthusiasts**: Explore how different algorithms work on different data sets.

---

## **🤝 Contributing**

We ❤️ open source! Contributions are welcome to make this project even better.  

1. Fork the repository.  
2. Create your feature branch.  
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes.  
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch and open a pull request.

---

## <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="30"> Awesome Contributors

<div align="center">
	<h3>Thank you for contributing to our repository</h3><br>
	<p align="center">
		<a href="https://github.com/alienx5499/SortVisioN/contributors">
			<img src="https://contrib.rocks/image?repo=alienx5499/SortVisioN" width="180" height="95" />
		</a>
	</p>
</div>

---

## **📜 License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 📬 **Feedback & Suggestions**
*We value your input! Share your thoughts through [GitHub Issues](https://github.com/alienx5499/sortvisioN/issues).*

💡 *Let's work together to enhance the understanding of sorting algorithms!*

</div>

