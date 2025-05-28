# 🌍 Travel Itinerary Planner

A full-stack MERN travel itinerary app that allows users to plan domestic or international trips with real-time data for flights, hotels, and activities — all visualized through an interactive global map.

---

## ✨ Features

### 🗓️ Trip Dates

* Users can set **start and end dates** for their trips.
* These dates will automatically filter **flights**, **hotel vacancies**, and **activities** within the selected timeframe (e.g., 01/01/2025 – 01/15/2025).

### 📍 Locations

* A **global interactive map** allows users to visually build their itinerary.
* Users can:

  * Select a **country** to view and choose from a list of major cities.
  * Assign dates for each selected **city**.
* **Stretch goal:** Offer smart city suggestions based on season, weather, or major local events.

### ✈️ Flights

* Flights are automatically suggested based on the user’s **dates and selected cities**.
* Users can **sort by price or total travel time**.

### 🏨 Hotels

* Hotel vacancies are suggested based on the selected **dates and locations**.
* Users can **sort by price or rating**.

### 🍡 Activities

* Each city in the itinerary will show relevant **activities, events, and places to visit**.
* Filtered based on trip dates.

### 👥 User Accounts & Collaboration

* Users can:

  * Sign up / log in
  * **Save multiple itineraries**
  * **Invite collaborators** to edit the same trip plan (potentially using WebSockets for real-time sync)

---

## 💠 Tech Stack

**Frontend**

* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [Redux](https://redux.js.org/)

**Backend**

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)

**Database**

* [MongoDB (NoSQL)](https://www.mongodb.com/)

---

## 🌐 External APIs Used

| API                        | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| **Amadeus for Developers** | Flight & hotel search based on user input                |
| **Mapbox**                 | Interactive global map for itinerary building            |
| **GeoDB Cities API**       | City info, population, and location data                 |
| **Foursquare Places API**  | Points of interest and activity suggestions in each city |

---

## 🌟 Target Audience

This app is designed for **travelers of all ages**, with a special focus on users in their **20s and 30s**. The UI/UX will be clean, modern, and visually engaging to attract casual planners and seasoned travelers alike.
