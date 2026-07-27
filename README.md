🚀 SocialDash – Social Media Analytics Dashboard

SocialDash is a modern, responsive social media analytics dashboard built with vanilla JavaScript and Tailwind CSS. It provides a clean interface to visualize platform performance, audience insights, and engagement metrics.
✨ Features

📊 Multi-platform overview (Instagram, Twitter, YouTube, LinkedIn)

📈 Engagement, reach, and follower growth tracking

🧭 Interactive dashboard with tab navigation

📉 Analytics view with visual performance summaries

🌍 Audience insights (location, age, gender distribution)

⚙️ User profile settings panel

🌗 Dark and light mode with system preference detection

📱 Fully responsive layout for desktop and mobile

🔔 Toast notifications and modal interactions

All dashboard data is currently mocked in JavaScript for demonstration purposes.

📸 Preview

![image alt](https://github.com/kantubhuktharohith/Social-Media-Management/blob/85672442d6273ce579787ff609fe8ba5f1570dc0/Screenshot%202026-01-28%20202945.png)

![image alt](https://github.com/kantubhuktharohith/Social-Media-Management/blob/211d0b3ce0bdbafdcc43f7734318f2f57b796aa8/Screenshot%202026-01-29%20214519.png)

![image alt](https://github.com/kantubhuktharohith/Social-Media-Management/blob/5fdca552eb925fa093b9116a3ac1f2161f8e79a7/Screenshot%202026-01-29%20214537.png)

🧰 Tech Stack

HTML5

Tailwind CSS (via CDN)

Vanilla JavaScript

Lucide Icons

Google Fonts (Inter)

```
├── index.html     # App layout and structure
├── style.css      # Custom styles and animations
└── index.js       # State management, rendering logic, UI interactions
```

index.html
Contains the main layout, sidebar, header, and content container.

index.js
Controls application state, tab switching, rendering views, and UI behavior.

style.css
Adds custom scrollbars and small animation utilities.

▶️ Getting Started

Clone the repository
```
git clone https://github.com/your-username/socialdash.git
cd socialdash
```

Open the app

Simply open index.html in your browser.

No server. No build step.

🧠 How It Works

The app uses a simple JavaScript state object to manage:

Active navigation tab

Loading state

User profile data

Theme preference stored in localStorage

Each dashboard section is rendered dynamically by injecting HTML into the main content area based on the active tab. After each render, Lucide icons are initialized to replace icon placeholders.


🎨 Customization
🔌 Connect Real Data

Replace the mock data inside index.js (like platform stats and activity) with responses from your own API or analytics service.

🏷️ Change Branding

Update:

The app name in index.html

Color palette in the Tailwind config block

Sidebar labels and icons

➕ Add New Dashboard Sections

Create a new render function in index.js

Add a new tab in the sidebar configuration

Update the tab switch logic to load your new view

📜 License

MIT License. Free to use, modify, and build on.
