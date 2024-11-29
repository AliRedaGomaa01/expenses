import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Amiri', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                colored: {
                    "0%" : { 'background-color': "#feb6b6" }, 
                    "30%": { 'background-color': "#fefdb6" },
                    "60%": { 'background-color': "#d2fb9d" },
                    "100%": { 'background-color': "#b4ffeb" },
                },
            },
            animation: {
                colored: "colored 3s linear alternate infinite",
            },
        },
    },

    plugins: [forms],
};
