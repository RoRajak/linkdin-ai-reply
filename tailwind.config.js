/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./entrypoints/**/*.{js,ts,jsx,tsx,html}", // Correct path for entrypoints folder
    "./entrypoints/content/**/*.{js,ts,jsx,tsx,html}", // Specific path to ensure it covers subdirectories
    "./components/**/*.{js,ts,jsx,tsx,html}", // Include components folder

  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
