import React from "react";
import styled, { css } from "styled-components";
import { IClassName } from "~/interfaces/Component";

export interface IIconProps {
    size?: number,
    color?: string,
    padding?: string,
}

export interface IIconButtonProps extends IIconProps, IClassName {
    disabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
}

export const IconButton = (Icon: React.FunctionComponent) => (props: IIconButtonProps) => {

    const {disabled = false, onClick = () => {}, size, color, padding, className} = props;
    const icon = React.createElement(Icon, {size, color} as JSX.IntrinsicAttributes);

    return (
        <Container className={className} disabled={disabled} padding={padding} onClick={disabled ? undefined : (event) => onClick(event)}>
            <icon.type />
        </Container>
    );
}

const Container = styled.div.attrs({} as {disabled: boolean, padding: string})`
    padding: ${props => props.padding ? props.padding : '4px'};
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