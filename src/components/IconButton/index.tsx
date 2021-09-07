import React from "react";
import styled, { css } from "styled-components";
import { IClassName } from "~/interfaces/Component";

export interface IIconProps {
    size?: number,
    color?: string,
}

export interface IIconButtonProps extends IIconProps, IClassName {
    disabled?: boolean,
    onClick?: () => void,
}

export const IconButton = (Icon: React.FunctionComponent) => (props: IIconButtonProps) => {

    const {disabled = false, onClick, size, color, className} = props;
    const icon = React.createElement(Icon, {size, color} as JSX.IntrinsicAttributes);

    return (
        <Container className={className} disabled={disabled} onClick={disabled ? undefined : onClick}>
            <icon.type />
        </Container>
    );
}

const Container = styled.div.attrs({} as {disabled: boolean})`
    padding: 4px;
    border-radius: 2px;
    ${props => props.disabled && css`
        cursor: default;
        color: ${props => props.theme.color5};
    `}
    ${props => !props.disabled && css`
        &:hover {
            cursor: pointer;
            background-color: ${props => props.theme.color3};
        }
    `}
`