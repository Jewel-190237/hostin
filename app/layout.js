import { Toaster } from "react-hot-toast";
import "./globals.scss";
import UserProviders from "./providers/userProvider";
import I18nProvider from "./context/i18n";
import SiteProviders from "./providers/siteProvider";
import AuthModalProvider from "./providers/authmodalProvider";

export const metadata = {
    title: "Martstick",
    description: "Ecommerce platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased" suppressHydrationWarning>
                {/* <AuthModalProvider>
                <SiteProviders>
                    <I18nProvider>
                        <UserProviders> */}
                            {children}
                        {/* </UserProviders>
                        <Toaster />
                    </I18nProvider>
                </SiteProviders>
                </AuthModalProvider> */}
            </body>
        </html>
    );
}
