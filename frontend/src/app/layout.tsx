import { AuthProvider } from "@/app/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="p-4">{children}</main>
          <Toaster
            position="top-right"
            richColors
            expand={true}
            
          />
        </AuthProvider>
      </body>
    </html>
  );
}
