# 📱 Task Manager App

**Author:** Sebastian Varghese  
**Tech Stack:** React Native (Expo), TypeScript, AsyncStorage, Expo Notifications

---

## 📌 Project Overview

**Task Manager** is a clean, minimal productivity app that allows users to add, complete, delete, and receive reminders for their tasks. The project demonstrates advanced React Native architecture, clean component abstraction, asynchronous storage, and scheduled local notifications using Expo.

> ⚡ This project was developed as a part of a React Native Developer Interview Assignment.

---

## 🚀 Features

- ✅ Add new tasks with priority (default: medium)
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks with one tap
- ✅ Auto-scheduled local notifications for each task
- ✅ Cancel pending notifications upon completion
- ✅ Tasks persist using AsyncStorage
- ✅ Clean and responsive UI
- ✅ Typed using TypeScript
- 🧠 Modular and scalable codebase for enterprise use

---

## 🛠️ Tech & Libraries

| Feature              | Stack / Library                    |
|----------------------|------------------------------------|
| Framework            | React Native with Expo             |
| Language             | TypeScript                         |
| Storage              | @react-native-async-storage        |
| Notifications        | expo-notifications                 |
| UI Components        | NativeBase / Custom Styles (manual)|
| Icons                | @expo/vector-icons (AntDesign, MaterialIcons) |

---

## 📁 Folder Structure


MyTasksApp/

├── src/

│   ├── components/       # Reusable components like TaskItem

│   ├── screens/          # Screens (HomeScreen)

│   ├── storage/          # AsyncStorage logic

│   ├── types/            # Global TypeScript interfaces

│   └── utils/            # Notification utilities

├── App.tsx              # Entry point

├── tsconfig.json        # TypeScript config

└── README.md


---

## 📱 How to Run the App

1. **Install Expo CLI**  
   
   npm install -g expo-cli
   

2. **Clone this repository**
   
   https://github.com/sebastianvarghesepm/task-manager.git

   cd task-manager
   

3. **Install dependencies**
   
   npm install
   

4. **Start the app**
   
   npx expo start
   

5. **Scan the QR code** in Expo Go app (Android/iOS) and test the app.

---

## 🧠 Developer Notes

### 🔍 Design Considerations
- **Separation of concerns**: Business logic, UI, and utilities are well isolated.
- **Scalability**: Easily extendable to support task editing, tagging, filtering, etc.
- **Notifications**: Proper lifecycle handling using \`expo-notifications\`.

### 🧪 Challenges & Solutions
- ⏰ Cancelling scheduled notifications on task completion required careful state mapping and ID tracking.
- 💾 Persistent task data was implemented using AsyncStorage with automatic syncing.

---

## 📌 Bonus Features

- 🧠 Cancel local notifications when a task is marked complete
- 💾 AsyncStorage for persistent storage
- ✅ Typed task model with priority support
- ✏️ Project structure that supports future enhancements like Firebase, Realm, Redux, etc.

---

## 📸 Screenshots

_You can include screenshots here if needed using markdown:_


![Home Screen](./assets/images/react-logo.png)


---

## 📬 Contact

If you have any questions or would like to collaborate, feel free to connect with me.

**Sebastian Varghese**  
📧 Email: [sebastianvarghesepm@gmail.com]  
🌐 LinkedIn: [https://www.linkedin.com/in/sebastian-varghese-268a78178/](https://www.linkedin.com/in/sebastian-varghese-268a78178/)

---
