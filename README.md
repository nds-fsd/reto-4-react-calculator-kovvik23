# React Calculator

## About the Project

This is a simple React-based calculator that supports basic arithmetic operations. It features a responsive design, allowing for easy interaction on various devices. The calculator can be operated via the keyboard or by clicking the on-screen buttons.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division).
- Keyboard support for all calculator functions.
- Real-time visual feedback for user input.
- Dark mode.


## How to Use

### Prerequisites

- You need to have [Node.js](https://nodejs.org/) installed on your computer.
- [Git](https://git-scm.com/) is required to clone the repository.
- Alternatively, the website is also deployed at [https://nds-fsd.github.io/reto-4-react-calculator-kovvik23/](https://nds-fsd.github.io/reto-4-react-calculator-kovvik23/).


### Cloning the Repository

1. Open Terminal.
2. Change the current working directory to the location where you want the cloned directory.
3. Type `git clone https://github.com/nds-fsd/reto-4-react-calculator-kovvik23.git` and press Enter.

### Installation

After cloning the project, you need to install its dependencies:

```
npm install
```

### Running the Project

This command starts a NodeJS process in your terminal and serves the project on http://localhost:5173 by default.

To start the development server, run 
```
npm run dev
```

## Structure of the Code

The project is organized as follows:

```plaintext
├── .github
│   └── workflows
│       └── jekyll-gh-pages.yml          # GitHub Actions for deployment
├── public
│   └── calculator-svgrepo-com.svg       # SVG icon for the calculator
├── src
│   ├── assets
│   │   └── react.svg                    # React logo SVG image
│   ├── components
│   │   ├── Calculator
│   │   │   └── index.jsx                # Main Calculator component
│   │   ├── DigitButton
│   │   │   └── index.jsx                # Digit button component
│   │   ├── OperationButton
│   │   │   └── index.jsx                # Operation button component
│   │   └── DarkModeToggle
│   │       ├── index.jsx                # Dark mode toggle component
│   │       └── styles.css               # Styles for the dark mode toggle
│   ├── App.jsx                          # Root React component
│   ├── main.jsx                         # Entry point for React application
│   └── styles.css                       # Global styles
├── vite.config.js                       # Vite configuration
├── index.html                           # Entry point HTML for development
├── package-lock.json                    # Auto-generated package lock file
├── package.json                         # NPM package and build script definitions
└── README.md                            # Project information and usage
```

## Further Development and Improvements

1. Implementing advanced mathematical functions like exponents, square roots, etc.
2. Adding a history feature to track and revisit previous calculations.
3. Enhancing the UI with themes and customizable settings.
