// TODO: create a redux store and wrap around "children"
// import Providers from "@/app/_redux/providers";

import "@/app/globals.scss";
// import "@/app/globals.css";

export const metadata = {
  title: "25.3.25 - Fullstack Twitter App",
  description: "Practice Fullstack: Twitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
