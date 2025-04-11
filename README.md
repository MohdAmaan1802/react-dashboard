# Step sto set up project

# npm install

# npm run dev

#Deployed [Link](https://warm-cranachan-861ef6.netlify.app/)

1.Project Setup

-Initialized a React project using Vite for fast development.
-Configured Tailwind CSS for styling and responsiveness.
-Installed Recharts for charting and Axios for API requests.

2.API Integration with Rate Limiting

-Created a custom hook useRateLimitedFetch that fetches data from the API while ensuring no more than 20 requests per 120 seconds are made.
-Stored timestamps of API calls and filtered old ones to manage rate-limiting logic.

3.UI Structure & Design

-Designed a responsive layout using Tailwind's grid and flex utilities.

-Built reusable components:
-Card.jsx for displaying key-value data
-ChartView.jsx for rendering analytics with Pie and Area charts
-Switcher1.jsx as a custom toggle for switching analytics mode

4.Analytics Mode Toggle

-A toggle switch allows switching between:
-Card View: Displays raw data in card layout
-Analytics View: Displays data using Recharts charts (Pie, Area)

5.Dark Mode Toggle

-A button to toggle between light and dark themes, applied globally using conditional Tailwind classes.

6.Performance Optimization

-Used useMemo to memoize transformed chart data to avoid unnecessary recalculations.
-Used useCallback to memoize toggle handlers for better render performance.
