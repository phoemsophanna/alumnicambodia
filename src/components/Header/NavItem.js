import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const NavItem = ({ navItem = {} }) => {
  const { pathname } = useRouter();

  const { name, href, subNavItems } = navItem;
  const subHref = subNavItems.map((item) => item.href);
  const current = pathname === href || subHref.includes(pathname);
  const { t } = useTranslation();

  return (
    <li className={`dropdown${current ? " current" : ""}`}>
      <Link href={href}>
        <a href={href}>{t(`header.${name}`)}</a>
      </Link>
      <ul>
        {subNavItems.map((subItem) => (
          <li key={subItem.id}>
            <Link href={subItem.href}>
              <a href={href}>{t(`header.${subItem.name}`)}</a>
            </Link>
            <ul>
              {subItem.subItems?.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <a href={href}>{t(`header.${item.name}`)}</a>
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
