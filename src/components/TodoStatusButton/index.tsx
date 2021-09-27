import React from "react";
import styled, { css } from "styled-components";
import { IClassName } from "~/interfaces/Component";
import { IconProps } from "../IconButton";

export interface ITodoStatusButtonProps {
    icon: React.FunctionComponent<IconProps>;
    iconSize: number;
    bgColor?: string;
    bgColorHover?: string;
    enabled?: boolean;
    checked?: boolean;
    colorChecked?: string;
    colorUnchecked?: string;
    onClick?: () => void;
}

export const TodoStatusButton = (props: ITodoStatusButtonProps & IClassName) => {
    const {iconSize = 12, icon, bgColor, bgColorHover="lightcyan", enabled = false, checked = false, colorChecked = "green", colorUnchecked = "white", onClick, className} = props;
    const Icon = React.createElement(icon);
    return (
        <Container className={className} color={bgColor} enabled={enabled} bgColorHover={bgColorHover} onClick={enabled ? onClick : undefined}>
            {enabled && <Icon.type size={iconSize} color={checked ? colorChecked : colorUnchecked} />}
        </Container>
    );
}

const Container = styled.div.attrs({} as {color: string, enabled: boolean, bgColorHover: string})`
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.color};

    ${props => props.enabled && css`
        &:hover {
            cursor: pointer;
            background-color: ${props.bgColorHover};
        }
    `}
`
