# Playguard

## Description
Playguard is a full-stack mobile application that serves as a demonstration of modern software development using a Backend-as-a-Service (BaaS) approach. Built with **React Native** and the **Expo** framework, the app provides a seamless user experience across iOS, Android, and web. It leverages **Firebase**, Google's comprehensive app development platform, for its entire backend, handling user authentication and data persistence.

## System Architecture

### 1. Presentation Tier (Frontend - React Native with Expo)
The user interface is a cross-platform mobile application developed with **React Native** and the **Expo** framework. This layer is responsible for rendering the native user interface, managing the application's state, and handling all user interactions. It communicates directly with Firebase services, eliminating the need for a custom-built API.

### 2. Logic and Data Tier (Backend - Firebase BaaS)
Playguard's backend is powered by **Firebase**, which provides a scalable and robust BaaS solution. The core functionality is handled by the following services:
*   **Firebase Authentication:** Manages user registration, login, and sessions, providing a secure and reliable way to handle user identity.
*   **Cloud Firestore:** A NoSQL cloud database that allows the app to store, sync, and query data in real-time. It replaces the traditional custom backend and PostgreSQL database setup.

## Features
*   **Full-Stack Mobile App:** A complete application built for multiple platforms from a single codebase.
*   **Firebase BaaS:** Utilizes Firebase for a scalable, reliable, and secure backend, abstracting away server-side development.
*   **Cross-Platform UI:** Built with React Native and Expo for a consistent experience on iOS, Android, and web.
*   **Real-Time Data:** Leverages Cloud Firestore to provide instant data synchronization for a responsive user experience.
*   **Secure Authentication:** Integrates Firebase Authentication to manage users securely.

## Getting Started
To get a local copy of the project up and running, follow these simple steps.

### Prerequisites
*   **Node.js** and **npm** (for the React Native/Expo frontend).
*   A **Firebase Project**: You must create your own Firebase project and obtain the configuration details.
*   **Expo Go app**: Installed on a physical mobile device or a mobile emulator.

### Installation
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/JGamez17/PGApp.git
    cd PGApp
    ```

2.  **Add your Firebase configuration:**
    *   Navigate to your Firebase console and create a new project.
    *   Add a web app to your Firebase project.
    *   Copy your `firebaseConfig` object.
    *   Replace the placeholder `firebaseConfig` object in your local project's configuration file with your own.

3.  **Run the frontend (React Native with Expo):**
    ```sh
    # Navigate to the frontend directory
    cd frontend/
    
    # Install dependencies
    npm install
    
    # Start the Expo development server
    npm start
    ```
    This will open the Expo DevTools in your browser and display a QR code in the terminal.

4.  **Access the mobile application:**
    *   Scan the QR code with the Expo Go app on your physical device.
    *   Alternatively, use a mobile emulator (iOS Simulator or Android Emulator) to view and test the app.

## Contributing
Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
JGamez17 - [jpg.swift@gmail.com]

Project Link: [https://github.com/JGamez17/PGApp](https://github.com/JGamez17/PGApp)

