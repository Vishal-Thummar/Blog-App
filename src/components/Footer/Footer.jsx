import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="py-10 bg-gray-400 border-t-2  border-t-black text-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-gray-600">
              &copy; Copyright 2024. All Rights Reserved by Blog.
            </p>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-gray-900">
              The Project
            </h3>
            <ul>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  About
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Iconothon
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-gray-900">
              Learn More
            </h3>
            <ul>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Mac App
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Creators
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-gray-900">
              Support
            </h3>
            <ul>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                  to="/"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
