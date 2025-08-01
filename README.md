

-----

# Uiuxyn - Advanced Creative Portfolio & Social Platform

**Uiuxyn** is a state-of-the-art web platform built with Next.js, TypeScript, and Redux, designed to empower creatives to showcase, share, and collaborate on innovative design projects. With a sleek, responsive interface, real-time chat, powerful search, and robust social features, Uiuxyn is a dynamic community hub for designers, developers, and creators to connect, inspire, and elevate their work through an elegant, user-centric experience..



-----

## ✨ Features

  - **Project Showcase & Editing**: Upload and edit projects with rich media (images, videos, side images), customizable metadata (title, description, tags, tools), and visibility settings (public/private).
  - **Real-Time Chat**: Engage with creators via a built-in messaging system, fostering direct collaboration and communication.
  - **Interactive User Engagement**: Follow creators, like posts, save designs, and contact users with intuitive controls.
  - **Responsive Media Gallery**: Display images and videos with side images in a Swiper-based carousel, optimized for all devices (desktop, tablet, mobile).
  - **Advanced Search**: Real-time autocomplete search for discovering projects, powered by a robust backend .
  - **Google Authentication & Authorization**: Secure login and protected routes via Google OAuth for seamless user access.
  - **Admin Panel**: Manage platform content, user interactions, and moderation tasks (assumed based on admin-related logic in code).
  - **User Dashboard**: Manage posts, saved designs, and conversations with a clean, user-friendly interface.
  - **Protected Routes**: Restrict access to sensitive features (e.g., dashboard, messaging) for authenticated users only.
  - **Dynamic UI/UX**: Unique design with circular profile images, animated text effects, and responsive grids, setting it apart from competitors.

-----

## 🛠️ Tech Stack

  - **Frontend**: Next.js, TypeScript, React, Redux Toolkit
  - **Styling**: SCSS for modular, responsive design
  - **Libraries**:
      - Swiper for dynamic carousels
      - React Icons (FaHeart, BsBookmarksFill, IoChatbubblesOutline, etc.)
      - React Simple Typewriter for animated text
      - Next Auth for Google OAuth
  - **Backend**: Node.js/Express (assumed, based on API endpoints)
  - **Fonts**: Poppins (via Next.js font optimization)
  - **Search**: Elasticsearch for real-time search and autocomplete (assumed)
  - **Other**: FormData for file uploads, environment variables for API configuration

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  - Node.js (v16 or higher)
  - `npm` or `yarn`
  - Google OAuth credentials for authentication
  - Backend API server running at `http://localhost:5001` (or your deployed API URL)
  - Elasticsearch for search functionality (optional, if implemented)

### Installation

1.  **Clone the Repository:**

    ```sh
    git clone https://github.com/aryanvalvi/the__Platform
    cd The__platform
    ```

2.  **Install Dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env.local` file in the root directory and add your API URL.

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5001
    ```

4.  **Run the Development Server:**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to view the app.

-----

## ⚙️ Backend Setup

Uiuxyn interacts with a backend API (assumed to be running at `http://localhost:5001`) 

    
     npm install
     npm run server.js
    
  -
**Note**: Ensure your backend is configured and running. Please refer to your backend repository for specific setup instructions.

-----

## 📋 Usage

1.  **Sign In**: Authenticate securely using your Google account via OAuth.
2.  **Interaction about other Design**: Freelancer can contact the designer or uploder for freelance work.
3.  **Upload Projects**: Add your creative work, including images, videos, or side images, along with metadata (title, description, tags, tools) through the upload form.
4.  **Search & Discover**: Use the autocomplete search bar to find inspiring projects by keywords or tags.
5.  **Engage**: Like, save, and follow other creators. Initiate conversations using the built-in chat interface.
6.  **Manage Profile**: Easily edit your posts, view saved designs, and manage conversations from your personal dashboard.
7.  **Admin Tasks**: Authorized users can access the admin panel to moderate content and manage user interactions.

-----


## 📄 License

This project is licensed under the **MIT License**.

-----

## 📞 Contact

For inquiries or feedback, feel free to reach out:

  - **GitHub**: [aryanvalvi](https://github.com/aryanvalvi)
  - **Email**: aryanvalvi323@gmail.com
  - **Project Link**: [Uiuxyn](wwww.uiuxyn.xyz) 
