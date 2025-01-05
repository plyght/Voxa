import styled from "styled-components";

const Button = styled.a`
  cursor: ${({ disabled }) => disabled ? `default` : `pointer`};
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  line-height: 1.17648;
  font-weight: 400;
  letter-spacing: -.022em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  min-width: 28px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 18px;
  background: var(${({ disabled }) => disabled ? `--glyph-gray-tertiary` : `--color-fill-blue`});
  color: #fff;
  border: 0;
  outline: 0;

  ${({ size }) => size === "sm" ? `
    font-size: 12px;
    line-height: 1.33337;
    font-weight: 400;
    letter-spacing: -.01em;
    min-width: 23px;
    padding-left: 11px;
    padding-right: 11px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 12px;
  ` : size === "lg" ? `
    padding-left: 21px;
    padding-right: 21px;
    padding-top: 11px;
    padding-bottom: 11px;
    border-radius: 21px;
  ` : ``}
  svg {
    width: 1em;
    height: 1em;
    vertical-align: center;
    margin: 0 -0.25em;
  }
`;

export default Button;
