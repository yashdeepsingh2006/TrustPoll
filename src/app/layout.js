import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/Nav";
import { AccountProvider } from "./context/AccountContext";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Trustpoll - A Decentralized Polling Platform",
  description: "TrustPoll is a decentralized polling platform built on the Ethereum blockchain, allowing users to create, vote on, and explore polls transparently and securely. Developed using Solidity and Next.js, TrustPoll ensures each vote is stored on the blockchain, making it tamper-proof and auditable. Users can connect their Ethereum wallet to participate in polls or create new ones with custom options. With real-time voting results and an intuitive interface, TrustPoll offers a modern approach to trust-based polling in Web3.",
  author: "Yashdeep singh"
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AccountProvider>
          <Nav />
          {children}
        </AccountProvider>
        <Footer />
      </body>
    </html>
  );
}
