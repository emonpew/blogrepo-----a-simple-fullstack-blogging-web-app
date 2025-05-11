import ThemeController from "../components/ThemeController";
import "./global.css";
import AuthProvider from "../contexts/AuthProvider";
import Navigation from "../components/Navigation";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="dark" lang="en">
      <body>
        <ThemeController />
        <AuthProvider>
          <Navigation />
          <NextTopLoader color="#0070f3" height={3} showSpinner={false} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
