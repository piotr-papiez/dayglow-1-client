import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Dayglow",
  description: "Empower your daily tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={IBMPlexSans.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
