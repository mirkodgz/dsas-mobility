/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#004080', // Deep Trust Blue
                secondary: '#FF8C00', // Vibrant Orange
                background: '#F5F5F5', // Light Gray
            },
            fontFamily: {
                sans: ['Figtree', 'sans-serif'],
            },
            borderRadius: {
                'card': '20px',
                'pill': '9999px',
            },
            boxShadow: {
                'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
