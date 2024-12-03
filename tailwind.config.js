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
                    "25%": { 'background-color': "#fefdb6" },
                    "50%": { 'background-color': "#d2fb9d" },
                    "75%": { 'background-color': "#b4ffeb" },
                    "100%" : { 'background-color': "#feb6b6" }, 
                },
                rotating : {
                    "0%" : { 'transform': "rotate(0deg)" },
                    "25%": {  'transform': "rotate(-5deg)" },
                    "50%": { 'transform': "rotate(0deg)" },
                    "75%": { 'transform': "rotate(5deg)" },
                    "100%" : { 'transform': "rotate(0deg)" },
                },
                scaling : {
                    "0%" : { 'transform': "scale(1)" },
                    "25%": {  'transform': "scale(0.9)" },
                    "50%": { 'transform': "scale(1)" },
                    "75%": { 'transform': "scale(1.1)" },
                    "100%" : { 'transform': "scale(1)" },
                },
            },
            animation: {
                colored: "colored 3s linear forwards infinite",
                rotating: "rotating 3s linear forwards infinite",
                scaling: "scaling 3s linear forwards infinite",
            },
        },
    },

    plugins: [forms],
};
