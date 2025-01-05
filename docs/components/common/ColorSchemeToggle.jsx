import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { useSite } from "@/components/common/Site";

const ColorSchemeToggleWrap = styled.div`
  --toggle-border-radius-outer: 12px;
  --toggle-border-radius-inner: 10px;
  --toggle-color-fill: var(--color-button-background-active);
  --toggle-color-text: var(--color-fill-blue);

  font-size: 12px;
  line-height: 1.33337;
  font-weight: 400;
  letter-spacing: -.01em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  border: 1px solid var(--toggle-color-fill);
  border-radius: var(--toggle-border-radius-outer, 2px);
  display: inline-flex;
  padding: 1px;
  input[type="radio"] {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    appearance: none;
  }
`;
const ToggleOptionText = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 1px 6px;
  min-width: 42px;
  border: 1px solid transparent;
  border-radius: var(--toggle-border-radius-inner, 2px);
  text-align: center;
  color: var(--toggle-color-text);

  input[type="radio"]:checked + & {
    --toggle-color-text: var(--color-button-text);
    background: var(--toggle-color-fill);
    border-color: var(--toggle-color-fill);
  }
`;

function ColorSchemeToggle() {
  const [toggleValue, setToggleValue] = useState('auto');
  const { setColorScheme } = useSite();

  useEffect(() => {
    const theme = window.localStorage.getItem('colorScheme');

    if (theme) setToggleValue(theme)
  }, []);

  useEffect(() => {
    setColorScheme(toggleValue)
  }, [setColorScheme, toggleValue])

  const handleChange = (e) => setToggleValue(e.target.value)

  return (
    <ColorSchemeToggleWrap role="radiogroup" tabIndex={0} aria-label="Select a color scheme preference.">
      <label data-color-scheme-option="light">
        <input type="radio" name="colorToggle" value="light" autoComplete="off" checked={toggleValue === 'light'} onChange={handleChange} />
        <ToggleOptionText>Light</ToggleOptionText>
      </label>
      <label data-color-scheme-option="dark">
        <input type="radio" name="colorToggle" value="dark" autoComplete="off" checked={toggleValue === 'dark'} onChange={handleChange} />
        <ToggleOptionText>Dark</ToggleOptionText>
      </label>
      <label data-color-scheme-option="auto">
        <input type="radio" name="colorToggle" value="auto" autoComplete="off" checked={toggleValue === 'auto'} onChange={handleChange} />
        <ToggleOptionText>Auto</ToggleOptionText>
      </label>
    </ColorSchemeToggleWrap>
  )
}

export default ColorSchemeToggle;
