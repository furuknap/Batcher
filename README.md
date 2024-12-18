
# Batcher

A simple app in English and Spanish to manages batches of home based food businesses. Batcher is free, released under MIT license, and a gift from https://almendras.co/ to the world. 

NOTE: This readme was mostly written by an LLM, which is why it looks a bit ridiculous and sounds llike a sales pitch. 

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/almendras.co/batcher/build.yml?branch=main)](https://github.com/almendras.co/batcher/actions)
[![GitHub Issues](https://img.shields.io/github/issues/almendras.co/batcher)](https://github.com/almendras.co/batcher/issues)
[![GitHub Forks](https://img.shields.io/github/forks/almendras.co/batcher)](https://github.com/almendras.co/batcher/network)
[![GitHub Stars](https://img.shields.io/github/stars/almendras.co/batcher)](https://github.com/almendras.co/batcher/stargazers)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing PWA](#testing-pwa)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Description

**Batcher** is a Progressive Web App (PWA) that we originally designed to help manage batches of candied almonds and cookies efficiently. However, it can be used for any home based business to track batches of products, including sell-by dates and shelf-life.

Built with Vue.js, Vite, and Pinia, Batcher offers a seamless experience for creating, tracking, and managing product batches. With offline capabilities and an intuitive interface, Batcher ensures that your batch management is always at your fingertips.

![Batcher Screenshot](public/screenshot.png)

## Features

- **Product Management:** Add, edit, and manage products with detailed information.
- **Batch Creation:** Create new batches with automatic numbering and comments.
- **Localization:** Supports multiple languages (English and Spanish) for a global user base.
- **Progressive Web App:** Installable on devices, offline functionality, and enhanced performance.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Data Persistence:** Stores data locally to ensure information is retained across sessions.
- **Notifications:** Schedule notifications for batch-related events.

## Technologies Used

- [Vue.js](https://vuejs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Pinia](https://pinia.vuejs.org/) - State management
- [Vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) - PWA support
- [Vue I18n](https://kazupon.github.io/vue-i18n/) - Internationalization

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/almendras.co/batcher.git
   cd batcher
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Run the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   Open your browser and navigate to `http://localhost:5173` to view the app.

4. **Build for Production**

   Using npm:

   ```bash
   npm run build
   ```

   Or using yarn:

   ```bash
   yarn build
   ```

5. **Serve the Production Build Locally (Optional)**

   Using npm:

   ```bash
   npm run serve
   ```

   Or using yarn:

   ```bash
   yarn serve
   ```

   Open your browser and navigate to the provided local URL (e.g., `http://localhost:5000`).

## Usage

Once the app is running, you can:

- **Manage Products:** Navigate to the "Manage Products" section to add, edit, or view your products.
- **Create Batches:** Go to the "Home" view to create new batches by selecting a product and adding comments.
- **View Batches:** The last 3 batches are displayed on the Home view for quick reference.
- **Install as PWA:** Use the browser's install prompt to add Batcher to your device for an app-like experience.

## Testing PWA

Ensuring that Batcher functions correctly as a PWA involves testing various features such as installability, offline functionality, and responsiveness.

### Using Chrome DevTools

1. **Open DevTools**
   
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux).
   - Press `Cmd+Option+I` (Mac).

2. **Check Manifest**

   - Navigate to the **Application** tab.
   - Click on **Manifest** in the sidebar.
   - Verify that all icons are loaded correctly and there are no missing fields.

3. **Verify Service Worker**

   - In the **Application** tab, click on **Service Workers**.
   - Ensure that the Service Worker is registered and active without errors.

4. **Run Lighthouse Audit**

   - Navigate to the **Lighthouse** tab.
   - Select the **Progressive Web App** category.
   - Click **Generate report**.
   - Review the scores and address any identified issues.

### Installability

1. **Use the Install Button**

   - In the browser's address bar, look for an install button (usually a plus icon).
   - Click it to install Batcher on your device.

2. **Manual Installation**

   - Click on the browser's menu (three dots).
   - Select **Install Batcher**.
   - Follow the prompts to add it to your home screen or application list.

### Offline Functionality

1. **Simulate Offline Mode**

   - Open DevTools.
   - Go to the **Network** tab.
   - Select **Offline** from the throttling dropdown.
   - Navigate through the app to ensure previously visited pages load correctly.

2. **Verify Cached Assets**

   - In the **Application** tab, under **Cache Storage**, ensure that necessary assets are cached.

## Contributing

Contributions are welcome! To contribute to Batcher, please follow these steps:

1. **Fork the Repository**

   Click the **Fork** button at the top-right corner of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/almendras.co/batcher.git
   cd batcher
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**

   Implement your feature or bug fix.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Open a Pull Request**

   Navigate to the original repository and click **New Pull Request**.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact:

- **Email:** [furuknap+github@gmail.com](mailto:furuknap+github@gmail.com)
- **Organization:** [almendras.co](https://almendras.co)

## Acknowledgments

- Inspired by the need to efficiently manage candied almonds and cookie batches.
- Special thanks to the contributors of the open-source libraries used in this project.

---
