/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        az: {
          bg:     '#131A22',
          nav:    '#232F3E',
          nav2:   '#37475A',
          orange: '#FF9900',
          hover:  '#F0C040',
          blue:   '#49C8DF',
          link:   '#C7EBFF',
          text:   '#FFFFFF',
          muted:  '#CCCCCC',
          subtle: '#888888',
          border: '#3B4A5A',
          card:   '#1B2836',
          green:  '#3DBE29',
          red:    '#FF4D4D',
        },
      },
      fontFamily: { sans: ['Arial', 'Helvetica', 'sans-serif'] },
      animation: {
        'fade-in':  'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.4s ease-out',
      },
      keyframes: {
        'fade-in':  { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'slide-in': { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
