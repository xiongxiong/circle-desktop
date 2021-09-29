import { useState } from "react";
import styled, { css } from "styled-components"

export interface IButtonGroupProps {
    buttons: IButton[],
    radio?: boolean,
    checkedIdx?: number
}

export interface IButton {
    render: (checked: boolean) => React.ReactNode,
    func: () => void
}

export const ButtonGroup = (props: IButtonGroupProps) => {

    const { buttons = [], radio = false, checkedIdx } = props;

    const elems: React.ReactNode[] = buttons.reduce((els, { render, func }, idx, arr) => {
        const checked = radio ? idx === checkedIdx : false;
        els.push(
            <ButtonBox key={idx} checked={checked} onClick={() => func()}>
                {render && render(checked)}
            </ButtonBox>
        );
        if (idx < arr.length - 1) {
            els.push(<Divider key={-1 * (idx + 1)} />);
        }
        return els;
    }, [] as JSX.Element[]);

    return (
        <Container onClick={e => e.stopPropagation()}>
            {elems}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-radius: 4px;
    overflow: hidden;
`

const ButtonBox = styled.div.attrs({} as {checked: boolean})`
    display: flex;
    cursor: default;
    padding: 4px 8px;
    color: ${props => props.checked ? props.theme.color.white : props.theme.color.mariner};
    background-color: ${props => props.checked ? props.theme.color.periwinkle : props.theme.color.white};

    ${props => {
        if (props.checked) {
            return css`
                font-weight: bold;
            `
        } else {
            return css`
                &:hover {
                    cursor: pointer;
                    color: ${props.theme.color.white};
                    background-color: ${props.theme.color.periwinkle};
                }
            `
        }
    }}
`

const Divider = styled.div`
    width: 2px;
`