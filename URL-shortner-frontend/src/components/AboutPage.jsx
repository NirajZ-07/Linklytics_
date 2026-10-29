import React from "react";
import { FaLink, FaChartLine, FaLock, FaBolt } from "react-icons/fa";
const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8  ">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic  mb-3">
          About Linklytics
        </h1>
        <p className="text-gray-700 text-sm  mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          Linklytics is a URL shortener with built-in click analytics. Paste a
          long link and Linklytics turns it into a short, shareable one in
          seconds. Every time someone opens your short link, the click is
          recorded, so you can see how each of your links is performing. Create
          a free account to shorten links, keep them all in one dashboard, and
          track their clicks over time.
        </p>
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          <div className="flex items-start">
            <FaLink className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Simple URL Shortening
              </h2>
              <p className="text-gray-600">
                Paste any long URL and get a short link in seconds. The new
                link is copied to your clipboard automatically, and you can
                copy it again anytime from your dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaChartLine className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Click Analytics
              </h2>
              <p className="text-gray-600">
                Every click on your short links is recorded. Your dashboard
                shows a daily click graph across all your links, and each link
                has its own click count and click graph.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaLock className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Secure Accounts
              </h2>
              <p className="text-gray-600">
                Your links belong to your account. Passwords are stored as
                secure hashes, and every dashboard request is checked with a
                login token (JWT), so only you can see and manage your links.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaBolt className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Fast and Reliable
              </h2>
              <p className="text-gray-600">
                Opening a short link takes visitors straight to the original
                page. Your links and their click history are saved in a
                PostgreSQL database, so they keep working whenever you share
                them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
