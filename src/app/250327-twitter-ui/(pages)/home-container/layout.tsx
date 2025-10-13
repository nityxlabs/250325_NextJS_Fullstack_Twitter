import "@/app/globals.scss";
// import "@/app/globals.css";

import Sidebar from "@/app/250327-twitter-ui/ui-components/common/sidebar-0";
import RightPanel from "@/app/250327-twitter-ui/ui-components/common/right-panel-0";

import "@/app/250327-twitter-ui/250327-twitter-ui.scss";

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
    <div className="relative h-screen w-screen max-w-6xl flex mx-auto">
      <Sidebar />
      {children}
      <RightPanel />
    </div>
  );
}
