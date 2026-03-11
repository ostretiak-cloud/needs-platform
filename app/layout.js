import "./globals.css";
import Header from "../components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { getServerLanguage } from "@/app/lib/server-language";

export const metadata = {
  title: "єПотреба",
  description: "Єдиний каталог потреб громад",
};

export default async function RootLayout({ children }) {
  const language = await getServerLanguage();

  return (
    <html lang={language}>
      <body className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
        <LanguageProvider initialLanguage={language}>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
