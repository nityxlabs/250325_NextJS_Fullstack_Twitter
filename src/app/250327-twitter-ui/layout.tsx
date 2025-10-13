// import Sidebar from "./ui-components/common/sidebar-0";
// import RightPanel from "./ui-components/common/right-panel-0";

import Providers from "./providers";

import "@/app/globals.scss";
// import "@/app/globals.css";
import "./250327-twitter-ui.scss";

export const metadata = {
  title: "250327-twitter-ui",
  description: "Twitter clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="file-250327-twitter-ui">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
