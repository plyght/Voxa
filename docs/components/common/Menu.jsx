import React, { useState, useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { detectOverflow } from '@popperjs/core';

import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { mediaQueries } from '@/styles/breakpoints';

const MenuWrap = styled.div`
  min-width: 160px;
  display: flex;
  flex-direction: column;
  z-index: 9996;
  max-height: 400px;

  @media ${mediaQueries.sm} {
    position: fixed;
    inset: auto auto 0 0 !important;
    transform: none !important;
    display: block;
    /* height: calc(100% - 6rem); */
    max-height: calc(100vh - 10rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    width: 100vw;
    box-sizing: border-box;
    z-index: 9999;
    &:before {
      background-color: #00000052;
      content: "";
      display: block;
      height: 100vh;
      left: 0;
      position: fixed;
      top: 0;
      transition: opacity .4s cubic-bezier(.19,1,.22,1);
      width: 100vw;
      z-index: -1;
      pointer-events: none;
    }
  }
`
const MenuInside = styled.div`
  overflow-y: auto;
  width: 100%;
  background: var(--background-tertiary-color);
  border: 1px solid var(--separator-color);;
  padding: 5px;
  border-radius: 10px;
  align-items: stretch;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media ${mediaQueries.sm} {
    border: 0;
    max-height: calc(100vh - 10rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    border-radius: 10px 10px 0 0;
  }
`

const MenuItemWrap = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 6px 10px;
  border-radius: 5px;
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  &:hover, &:focus {
    background: var(--fill-gray-quaternary);
  }
  &:active {
    background: var(--fill-gray-tertiary);
  }
  @media ${mediaQueries.sm} {
    padding: 14px 15px;
    border-top: 1px solid --var(--separator-color);
    font-size: 14px;
    &:has(svg) {
      flex-direction: row-reverse;
      justify-content: space-between;      
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`
const MenuCancel = styled.div`
  display: none;
  position: sticky;
  bottom: 0;
  padding-bottom: 5px;
  margin-top: -5px;
  transform: translateY(5px);
  background: var(--background-tertiary-color);
  ${MenuItemWrap} {
    justify-content: center;
  }
  @media ${mediaQueries.sm} {
    display: block;
  }
`

const MenuDivider = styled.hr`
  margin: 5px;
  border: 0;
  border-top: 1px solid var(--separator-color);;
  border-left: 1px solid var(--separator-color);;
`

const Menu = ({ trigger, children, placement = 'bottom-end', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState(null);
  const [popperEl, setPopperEl] = useState(null);

  const { styles, attributes } = usePopper(triggerEl, popperEl, {
    placement,
    strategy: 'fixed',
    modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 5],
      },
    },
  ],
  });

  const menuTrigger = trigger();

  const TriggerComponent = React.cloneElement(menuTrigger, {
    ref: setTriggerEl,
    onClick: () => setIsOpen(true),
    style: {
      ...menuTrigger.props.style,
      ...(isOpen ? { pointerEvents: 'none' } : {})
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popperEl && !popperEl.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popperEl]);

  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onCloseMenu: () => setIsOpen(false) });
    }
    return child;
  });

  const menu = (
    <MenuWrap ref={setPopperEl} style={styles.popper} {...attributes.popper} {...props}>
      <MenuInside>
        {clonedChildren}
        <MenuCancel>
          <MenuDivider />
          <MenuItemWrap onClick={() => setIsOpen(false)}>Cancel</MenuItemWrap>
        </MenuCancel>
      </MenuInside>
    </MenuWrap>
  )

  return (
    <>
      {TriggerComponent}
      {isOpen ? (
        ReactDOM.createPortal(menu, document.body)
      ) : null}
    </>
  )
}

// MenuItem Component
const MenuItem = ({ icon: Icon, onClick, children, onCloseMenu }) => (
  <MenuItemWrap onClick={(e) => {
    onClick?.(e);
    onCloseMenu();
  }}>
    {Icon && <Icon />}
    {children}
  </MenuItemWrap>
);

export { Menu, MenuItem, MenuDivider };
