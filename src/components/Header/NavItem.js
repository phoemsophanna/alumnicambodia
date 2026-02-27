import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "src/config";

const NavItem = ({ navItem = {} }) => {
  const { pathname } = useRouter();

  const { name, href, subNavItems } = navItem;
  const subHref = subNavItems.map((item) => item.href);
  const current = pathname === href || subHref.includes(pathname);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  const fetchMember = async () => {
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/member-count`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setCount(response.data.count);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

  useEffect(() => {
    fetchMember();
  },[]);

  if(name == "MEMBER" && count <= 0) return null;

  return (
    <li className={`dropdown${current ? " current" : ""}`}>
      <Link href={href}>
        <span>{t(`header.${name}`)}</span>
      </Link>
      <ul>
        {subNavItems.map((subItem) => (
          <li key={subItem.id}>
            <Link href={subItem.href}>
              <span>{t(`header.${subItem.name}`)}</span>
            </Link>
            <ul>
              {subItem.subItems?.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <span>{t(`header.${item.name}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavItem;
