import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "єПотреба",
  description: "Єдиний каталог потреб громад",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}