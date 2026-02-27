export const metadata = {
  title: "Єдина цифрова платформа потреб громад",
  description:
    "Єдиний електронний майданчик для прозорого розміщення потреб громад та ефективного залучення донорської й інвестиційної підтримки.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}