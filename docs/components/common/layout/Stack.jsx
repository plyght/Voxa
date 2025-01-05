import React from "react";
import styled from "styled-components";
import spacing from "@/styles/spacing";

const StackWrap = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === "vertical" ? `column` : `row`)}${({ $reverse }) => ($reverse ? `-reverse` : ``)};
  ${({ $gap }) =>
    $gap !== undefined && $gap !== null && $gap !== false
      ? `gap: ${Array.isArray($gap) ? spacing(...$gap) : spacing($gap)};`
      : ``}
  align-items: ${({ $align }) =>
    `${$align === "center" || $align === "stretch" || $align === "space-around" || $align === "space-between" ? `` : `flex-`}${
      $align || "start"
    }`};
  justify-content: ${({ $distribute }) =>
    `${
      $distribute === "center" || $distribute === "stretch" || $distribute === "space-around" || $distribute === "space-between"
        ? ``
        : `flex-`
    }${$distribute || "start"}`};
  ${({ $fill }) => ($fill ? `flex: 1;` : ``)}
  ${({ $wrap }) => ($wrap ? `flex-wrap: wrap;` : ``)}
  ${({ $distribute }) =>
    $distribute === "stretch"
      ? `
    & > * {
      flex: 1;
    }
  `
      : ``}

  && > hr {
    align-self: stretch;
    margin: 0;
    flex: 0;
    border: 0;
    ${({ $direction, theme }) =>
      $direction === "horizontal"
        ? `
        border-left: 1px solid var(--fill-gray-tertiary);
        width: 0;
        flex-shrink: 0;
        height: auto;
    `
        : `
        border-top: 1px solid var(--fill-gray-tertiary);
        height: 0;
    `}
  }
`;

const Divider = () => <hr />;

function divideChildren(children) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return childrenArray.reduce((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(<Divider />, { key: `divider-${index}` }));
    }

    return output;
  }, []);
}

// eslint-disable-next-line react/display-name
const Stack = React.forwardRef(({ children, className, align, distribute, direction, divide, fill, gap, reverse, wrap, style }, ref) => {
  const childrenWithDividers = divide ? divideChildren(children) : children;

  return (
    <StackWrap
      className={className}
      style={style}
      ref={ref}
      $align={align}
      $distribute={distribute}
      $direction={direction}
      $fill={fill}
      $gap={gap}
      $reverse={reverse}
      $wrap={wrap}
    >
      {childrenWithDividers}
    </StackWrap>
  );
})

Stack.defaultProps = {
  align: "stretch",
  direction: "vertical"
};

export default Stack;
