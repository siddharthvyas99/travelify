"use client";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dropdown, Space } from 'antd';
import Button from "./Button";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import logo from "./../public/images/logo/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const fetchUser = () => {
    return JSON.parse(localStorage.getItem('user_details') || '{}');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details');
    router.push('/login');
  };

  const dropdownItems = [
    {
      label: (
        <div onClick={logout}>
          <i className='bx bxs-log-out-circle'></i> Logout
        </div>
      ),
      key: '0'
    },
  ]

  useEffect(() => {
    setCurrentUser(fetchUser());
  }, []);

  return (
    <nav className="absolute top-0 left-0 z-30 w-full">
      <div className="w-full flexBetween max-container padding-container z-30 py-2 lg:py-5">
        <Link href="/">
          <img
            className="lg:w-[120px] h-auto w-[60px]"
            src={logo.src}
            alt="logo"
            width="150"
            height="143"
          />
        </Link>
        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-16 text-white flexCenter [text-shadow:_0_1px_0_rgb(0_0_0_/_80%)] cursor-pointer transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="lg:flexCenter hidden">
          <a href="#pricing">
            <Button
              type="button"
              title="Pricing"
              icon="./bx-log-in-circle.svg"
              variant="btn_light_lime"
              width="160"
            />
          </a>
          {
            currentUser ? (
              <div>
                <Dropdown
                  menu={{ items: dropdownItems }}
                  className="ml-4 btn_light_lime w-50 duration-150 rounded-md font-medium my-6 mx-auto px-6 py-3"
                >
                  <Space>
                    <div className="cursor-pointer">
                      <i className='bx bxs-user-circle'></i> { currentUser?.email }
                    </div>
                  </Space>
                </Dropdown>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  className="ml-4"
                  type="button"
                  title="Login"
                  icon="./bx-log-in-circle.svg"
                  variant="btn_light_lime"
                  width="160"
                />
              </Link>
            )
          }
        </div>

        <div className="lg:hidden" onClick={toggleMenu}>
          <Image
            src="./bx-menu-alt-right.svg"
            alt="menu"
            width="32"
            height="32"
            className="inline-flex cursor-pointer invert lg:hidden"
          />
          <ul
            className={
              "absolute top-20 left-0 flex flex-col gap-5 p-3 w-full bg-white lg:hidden" +
              (!open ? " hidden" : " flex")
            }
          >
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="regular-16 text-gray-50 flexCenter cursor-pointer transition-all hover:font-bold"
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
