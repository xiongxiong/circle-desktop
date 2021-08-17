import { useEffect } from "react";
import { useState } from "react";
import styled, { css } from "styled-components"

export interface IButtonGroupProps {
    buttons: IButton[],
    radio?: boolean,
    checkedIdx?: number
}

export interface IButton {
    name: string,
    func: () => void
}

export const ButtonGroup = (props: IButtonGroupProps) => {

    const { buttons = [], radio = false, checkedIdx: initCheckedIdx = 0 } = props;

    const [checkedIdx, setCheckedIdx] = useState(initCheckedIdx);

    const onClick = (idx: number, func: () => void) => {
        if (radio) {
            setCheckedIdx(idx);
            if (idx !== checkedIdx) {
                func();
            }
        } else {
            func();
        }
    }

    const elems: React.ReactNode[] = buttons.reduce((els, { name, func }, idx, arr) => {
        els.push(
            <ButtonBox key={idx} checked={radio ? idx === checkedIdx : false} onClick={() => onClick(idx, func)}>
                {name}
            </ButtonBox>
        );
        if (idx < arr.length - 1) {
            els.push(<Divider key={-1} />);
        }
        return els;
    }, [] as JSX.Element[]);

    return (
        <Container>
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
    cursor: default;
    padding: 4px 8px;
    font-size: 11px;
    color: ${props => props.checked ? props.theme._1 : props.theme._2};
    background-color: ${props => props.checked ? props.theme._3 : props.theme._1};

    ${props => {
        if (props.checked) {
            return css`
                font-weight: bold;
            `
        } else {
            return css`
                &:hover {
                    cursor: pointer;
                    color: ${props.theme._1};
                    background-color: ${props.theme._3};
                }
            `
        }
    }}
`

const Divider = styled.div`
    width: 2px;
`