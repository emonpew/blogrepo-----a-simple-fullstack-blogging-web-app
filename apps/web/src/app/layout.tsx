import ThemeController from "../components/ThemeController";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="dark" lang="en">
      <body>
        <ThemeController />
        {children}
      </body>
    </html>
  );
}
