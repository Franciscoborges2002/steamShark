/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        "bg-overlay": "rgba(var(--background-overlay))",
        "bg-secondary": "rgba(var(--background-secondary))",
        "bg-header": "rgba(var(--background-header))",
        "bg-footer": "rgba(var(--background-footer))",
        "bg-footer-bottom": "rgba(var(--background-footer-bottom))",
        "t-primary": "rgba(var(--text-primary))",
        "t-secondary": "rgba(var(--text-secondary))",
        "t-third": "rgba(var(--text-third))",
        "t-link": "rgba(var(--text-link))",
        "t-oposite": "rgba(var(--text-oposite))",
        "btn-header-primary": "rgba(var(--buton-primary-header))",
      },
    },
  },
  plugins: [],
}

