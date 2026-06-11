"use client";
import { useState, useEffect } from "react";
import LoggedInDropdown from "./logged-in-dropdown";
import DefaultDropdown from "./default-dropdown";

const DropdownAction = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenName");
    setIsLoggedIn(!!token);
  }, []);

  return <div>{isLoggedIn ? <LoggedInDropdown /> : <DefaultDropdown />}</div>;
};

export default DropdownAction;
