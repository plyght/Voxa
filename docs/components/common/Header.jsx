import React, { useEffect, useRef, useState } from 'react';
import throttle from "lodash/throttle";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components'
import { ExternalLink } from "react-feather"
import Button from '@/components/common/Button';
import { Container } from '@/components/common/layout';
import { mediaQueries } from '@/styles/breakpoints';
import config from '@/data/config';

const Nav = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  z-index: 9997;
  position: sticky;
  * {
    box-sizing: content-box;
  }
  @media ${mediaQueries.sm} {
    height: 48px;
  }
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: 1;
  transition: background-color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  background-color: var(--material-background-color);
  backdrop-filter: var(--material-filters);
  box-shadow: 0 1px 0 0 var(--material-separator-color);
  .menu-open & {
    background-color: var(--thick-material-background-color);
  }
`;
const HeaderContainer = styled(Container)`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${mediaQueries.sm} {
    flex-direction: column;
    justify-content: stretch;
    align-items: flex-start;
  }
`;
const Title = styled.h2`
  font-size: 22px;
  line-height: 1.14286;
  font-weight: 600;
  letter-spacing: -0.033em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: default;
  display: block;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
  color: var(--glyph-gray);
  display: flex;
  align-items: center;
  padding: 10px 0;
  @media ${mediaQueries.sm} {
    padding: 10px 0;
    font-size: 19px;
    margin-left: 0px;
  }
  a {
    display: inline-block;
    letter-spacing: inherit;
    line-height: inherit;
    margin: 0;
    text-decoration: none;
    white-space: nowrap;
    color: var(--glyph-gray);
    opacity: .92;
  }
  img {
    margin-left: -3px;
    padding-right: 10px;
    cursor: pointer;
    @media ${mediaQueries.sm} {
      margin-left: -2px;
      padding-right: 8px;
      width: 28px;
      height: auto;
    }
  }
  span {
    cursor: pointer;
  }
`;
const Menu = styled.div`
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  letter-spacing: -.01em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  gap: 24px;
  @media ${mediaQueries.sm} {
    width: 100%;
  }
`;
const MenuTray = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  @media ${mediaQueries.sm} {
    float: none;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
    width: 100%;
    padding-top: 0;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,visibility 0s linear 1s;
    .menu-open & {
      max-height: 400px;
      max-height: calc(100vh - 48px - 48px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      pointer-events: auto;
      visibility: visible;
      transition-delay: 0.2s, 0s;
    }
  }
`;
const MenuItems = styled.ul`
  @media ${mediaQueries.sm} {
    width: 100%;
    opacity: 0;
    padding: 4px 24px 24px;
    transform: translate3d(0, -150px, 0);
    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.5s,opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;

    .menu-open & {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition-delay: 0.2s, 0.4s;
    }
  }
`;
const MenuItem = styled.li`
  margin-left: 24px;
  float: left;
  list-style: none;
  display: flex;
  gap: 4px;
  align-items: center;
  @media ${mediaQueries.sm} {
    margin-left: 0;
    display: inline-block;
    float: none;
    width: 100%;
    height: 44px;
    
    &:first-child a {
      border: 0;
    }
    
    transition-delay: 0.63s;
    &:nth-child(1) a {
      transition-delay: 0.07s;
    }
    &:nth-child(2) a {
      transition-delay: 0.14s;
    }
    &:nth-child(3) a {
      transition-delay: 0.21s;
    }
    &:nth-child(4) a {
      transition-delay: 0.28s;
    }
    &:nth-child(5) a {
      transition-delay: 0.35s;
    }
    &:nth-child(6) a {
      transition-delay: 0.42s;
    }
    &:nth-child(7) a {
      transition-delay: 0.49s;
    }
    &:nth-child(8) a {
      transition-delay: 0.56s;
    }

    .menu-open & {
      transition-delay: 0s;
      &:nth-child(1) a {
        transition-delay: 0.56s;
      }
      &:nth-child(2) a {
        transition-delay: 0.49s;
      }
      &:nth-child(3) a {
        transition-delay: 0.42s;
      }
      &:nth-child(4) a {
        transition-delay: 0.35s;
      }
      &:nth-child(5) a {
        transition-delay: 0.28s;
      }
      &:nth-child(6) a {
        transition-delay: 0.21s;
      }
      &:nth-child(7) a {
        transition-delay: 0.14s;
      }
      &:nth-child(8) a {
        transition-delay: 0.07s;
      }
      
    }
  }
`;
const MenuLink = styled(Link)`
  color: var( --foreground-color);
  display: inline-block;
  line-height: 22px;
  white-space: nowrap;
  opacity: 0.88;
  &:hover {
    color: var(--glyph-blue);
  }
  ${({ $current }) => $current ? `
    color: var(--foreground-color) !important;
    opacity: 0.56;
  ` : ``}
  @media ${mediaQueries.sm} {
    border-top: 1px solid rgba(0,0,0,0.181818);
    /* border-top: 1px solid var(--separator-color); */
    [data-color-scheme="dark"] & {
      border-color: rgba(255,255,255,0.26087);
    }
    display: flex;
    align-items: center;
    height: 100%;
    line-height: 1.3;
    opacity: 0;
    transform: translate3d(0, -25px, 0);
    transition: 0.5s ease;
    transition-property: transform, opacity;
    width: 100%;
    .menu-open & {
      opacity: ${({ $current }) => $current ? 0.56 : 0.92};
      transform: translate3d(0, 0, 0);
    }
    ${({ $current }) => $current ? `
      border-color: rgba(0,0,0,0.285714);
      [data-color-scheme="dark"] & {
        border-color: rgba(255,255,255,0.428571);
      }
    ` : ``}
  }
`;
const StyledExternalLink = styled(ExternalLink)`
  opacity: 0.5;
  margin-top: -2px;
  margin-left: 0.25em;
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  
  @media ${mediaQueries.sm} {
    right: 0;
    padding: 9px 16px;
    position: absolute;
    top: 0;
    z-index: 1;
  }
`;
const Action = styled.div``;
const MenuToggle = styled.div`
  margin-right: 6px;
  cursor: pointer;
  display: none;
  overflow: hidden;
  width: 40px;
  height: 30px;
  -webkit-tap-highlight-color: transparent;
  @media ${mediaQueries.sm} {
    display: block;
  }
`;
const MenuChevron = styled.span`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1),transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
  transform: translateY(0);
  opacity: 0.8;
  .menu-open & {
    transform: translateY(-8px);
  }

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 18px;
    width: 11px;
    height: 1px;
    z-index: 1;
    transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1),transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
    background: #000;

  }
  &:before {
    right: 50%;
    border-radius: 0.5px 0 0 0.5px;
    transform-origin: 100% 100%;
    transform: rotate(40deg) scaleY(1.1);    
    .menu-open & {
      transform-origin: 100% 0%;
      transform: rotate(-40deg) scaleY(1.1);
    }  
  }
  &:after {
    left: 50%;
    border-radius: 0 0.5px 0.5px 0;
    transform-origin: 0% 100%;
    transform: rotate(-40deg) scaleY(1.1); 
    .menu-open & {
      transform-origin: 0% 0%;
      transform: rotate(40deg) scaleY(1.1);
    }
  }

  html[data-color-scheme='dark'] &::before,
  html[data-color-scheme='dark'] &::after {
    background: var(--glyph-gray);
  }
`;

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => {
      setIsOpen(val => val ? false : val)
    }

    const throttledHandleScroll = throttle(handleScroll, 1000);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', throttledHandleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', throttledHandleScroll);
    }
  }, [menuRef]);

  return (
    <Nav role="navigation" className={isOpen ? "menu-open" : ""} ref={menuRef}>
      <Wrapper>
        <HeaderContainer>
          <Link href="/">
            <Title>
              <Image
                width={32}
                height={32}
                src="/product-icon.png"
                alt="CodeEdit product icon"
              />
              <span>{config.title}</span>
          </Title>
          </Link>
          <Menu>
            <MenuTray>
              <MenuItems>
                {config.navigation.map(href => {
                  const isExternal = href.match(/(https?:\/\/[\w\d.-]+)/gi);
                  const item = config.pages[href];

                  return (
                    <MenuItem key={href} {...(isExternal ? { target: "_blank" } : {})}>
                      <MenuLink onClick={() => setIsOpen(false)} href={href} $current={router.asPath === href || (href !== "/" && router.asPath.startsWith(href))}>
                        {item.title}
                        {isExternal && <StyledExternalLink size={11} />}
                      </MenuLink>
                    </MenuItem>
                  );
                })}
              </MenuItems>
            </MenuTray>
            <Actions>
              <Action>
                <MenuToggle onClick={() => setIsOpen(val => !val)}>
                  <MenuChevron className="codeeditnav-menucta-chevron"></MenuChevron>
                </MenuToggle>
              </Action>
              <Action>
                <Button size="sm" onClick={() => router.push("/download")}>Download</Button>
              </Action>
            </Actions>
          </Menu>
        </HeaderContainer>
      </Wrapper>
    </Nav>
  );
}

export default Header;
