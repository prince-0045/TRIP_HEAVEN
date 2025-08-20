# TripHaven 🌍✈️

A modern, responsive Airbnb-like website built with Node.js, Express, MongoDB, and EJS. Features a dark futuristic theme with glassmorphism design, smooth animations, and full CRUD functionality for property listings and reviews.

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen?style=for-the-badge&logo=vercel)](https://triphaven-j2gp.onrender.com/)

## ✨ Features

- **Modern Dark Theme**: Sleek dark futuristic design with glassmorphism effects
- **Responsive Design**: Mobile-first approach that works on all devices
- **User Authentication**: Secure signup/login with Passport.js
- **Property Listings**: Create, read, update, and delete property listings
- **Image Upload**: Cloudinary integration for image storage
- **Reviews System**: Rate and review properties
- **Search & Filters**: Find properties by location and category
- **Interactive Maps**: Mapbox integration for property locations
- **Smooth Animations**: CSS animations and scroll effects
- **User Profiles**: Personal dashboard with listings and reviews

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **Template Engine**: EJS with EJS-Mate
- **File Upload**: Multer + Cloudinary
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Maps**: Mapbox GL JS
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, Poppins)

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/triphaven.git
cd triphaven
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAPBOX_TOKEN=your_mapbox_access_token
```

4. **Initialize the database**
```bash
node init/index.js
```

5. **Start the server**
```bash
node app.js
```

The application will be available at `http://localhost:8080`

## 🗂️ Project Structure

```
triphaven/
├── controllers/          # Route controllers
├── models/              # Database models
├── routes/              # Express routes
├── views/               # EJS templates
├── public/              # Static assets (CSS, JS, images)
├── middleware.js        # Custom middleware
├── app.js              # Main application file
└── README.md           # This file
```

## 🌟 Key Features Explained

### Dark Futuristic Theme
- Deep black backgrounds with light blue accents
- Glassmorphism effects for cards and modals
- Smooth hover animations and transitions
- Responsive grid layouts

### User Experience
- Loading screen with animated spinner
- Scroll-triggered animations
- Interactive hover effects
- Mobile-friendly navigation

### Property Management
- Image upload with preview
- Location-based search
- Category filtering
- Tax calculation toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Cloudinary](https://cloudinary.com/) for image hosting
- [Mapbox](https://www.mapbox.com/) for maps

---

**Built with ❤️ using modern web technologies**
