"use client";
import React, { useEffect, useState } from "react";
import Headers from "./headers/headers";
import { usePathname, useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Loading } from "@/components/loading/lading";
import { BsTelegram } from "react-icons/bs";
import "./loyat.scss";
import { API } from "@/api/api";
import Link from "next/link";

const Layout = ({ children }) => {
  const router = usePathname();
  const [tt, setTT] = useState(true);
  const routers = useRouter();
  useEffect(() => {
    setTT(true);
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}users`, {
        headers: {
          token,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 201) {
            localStorage.removeItem("token");
            routers.push("/login");
          }
        });
    } else {
      routers.push("/login");
    }
    setTT(false);
  }, [routers]);
  let t = true;
  if (
    router == "/login" ||
    router == "/register" ||
    router == "/password" ||
    router == "/password2"
  ) {
    t = false;
  }
  return (
    <div>
      <Loading setTrue={tt} />
      {t ? <Headers /> : ""}
      <div className="container px-5 m-auto">{children}</div>
      {t ? (
        <Link
        target="_blank"
          href={"https://t.me/kitob_mutolaa5"}
          className="group cursor-pointer absolute bottom-10 right-5 flex items-center gap-3 rounded-2xl hover:bg-blue-950"
        >
          <BsTelegram size={30} color="#3d9be7" />
          <p className="text-white hidden pr-5 group-hover:block  group-hover:opacity-100 transition-opacity duration-1000">
            Bizning sahifamiz
          </p>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
