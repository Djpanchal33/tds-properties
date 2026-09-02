import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { navy: "#0F2547", gold: "#C9973F", cream: "#F7F5F2", ink: "#0A0F1A" },
      fontFamily: { display: ["var(--font-display)", "serif"], body: ["var(--font-body)", "sans-serif"] },
      boxShadow: { card: "0 24px 70px rgba(10,15,26,.12)" }
    }
  },
  plugins: []
};
export default config;
