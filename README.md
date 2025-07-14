# GeoMonitor – AI-Powered Geospatial Forecast Simulator

**GeoMonitor** is a frontend simulation of an AI-assisted dashboard for analyzing satellite-based geospatial data, inspired by real-world use cases like in cases were data is analyzed from ESA-backed platforms.

The application allows users to:

- Select a location and observation type (e.g. deformation or water level)
- Fetch historical data via a simulated API
- View values plotted on a time-series chart
- Choose how many months into the future they want to forecast
- Receive an AI-style forecast prediction based on recent trends

> This is a personal side project created to sharpen my frontend engineering, data handling, and forecasting logic skills.

---

## 🌍 Features

- ✅ React + TypeScript (fully typed)
- ✅ Modular, reusable component structure
- ✅ Custom dropdown for user-driven forecast length
- ✅ Clean UI with conditional rendering (loading, data, error)
- ✅ Smart forecast logic based on linear trend projection
- ✅ Responsive layout with accessible markup

---

## 🧠 How Forecasting Works

The app calculates the difference between the last two values in the dataset and continues that trend into the future.

Example:
```txt
Last two values: 5.0 → 5.4 (delta = 0.4)
User selects "3 months ahead"
Forecast: 5.8 → 6.2 → 6.6 mm
