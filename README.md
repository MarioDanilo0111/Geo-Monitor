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

```

## Forecast Visualization

To clearly separate real observations from predictions, the app uses two chart datasets:

- Observed data is shown as a solid line.
- Forecasted values are rendered as a dashed line, beginning just after the last observation.
- This approach ensures a clean visual transition between actual and projected values, without the need for null padding inside a single dataset.

The timeline (X-axis) is unified and fully synced across both datasets.

## 🚀 Try It Live

👉 [Geo Monitor a netlify.app](https://geo-monitor.netlify.app/)
