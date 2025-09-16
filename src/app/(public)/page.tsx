import React from "react";
import PublicHome from "./PublicHome";
import PrivateHome from "../(private)/(dashboard)/(home)/PrivateHome";

const isLoggedIn = false; // change to false to test public homepage

export default function HomePage() {
  if (isLoggedIn) {
    return <PrivateHome />;
  } else {
    return <PublicHome />;
  }
}
