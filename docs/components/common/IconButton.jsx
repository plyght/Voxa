import styled from "styled-components";

const Button = styled.a`
  cursor: ${({ disabled }) => disabled ? `default` : `pointer`};
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  line-height: 1.17648;
  font-weight: 400;
  letter-spacing: -.022em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  min-width: 28px;
  padding: 4px;
  border-radius: 18px;
  color: var(${({ disabled }) => disabled ? `--glyph-gray-tertiary` : `--color-fill-blue`});
  border: 0;
  outline: 0;
  transition: 200ms;

  &:hover {
    opacity: 0.66;
  }

  &:active {
    opacity: 0.33;
  }

  ${({ compact }) => compact ? `
    font-size: 12px;
    line-height: 1.33337;
    font-weight: 400;
    letter-spacing: -.01em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    min-width: 23px;
    padding: 0;
    border-radius: 12px;
  ` : ``}
`;

export default Button;
