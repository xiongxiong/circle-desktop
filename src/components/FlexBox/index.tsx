import React, { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import styled, { css, Keyframes, keyframes } from "styled-components";
import { IComponent } from "~/interfaces/Component";

export interface IFlexBoxProps extends IComponent {
    direction?: Direction,
    boxRender: () => React.ReactNode,
    stairs: string[],
    stairAt?: number,
    animTime?: number
}

export interface IFlexBoxRef {
    stairTo: (index: number) => void
}

export type Direction = "row" | "row-reverse" | "column" | "column-reverse";

const FlexBoxBase = (props: IFlexBoxProps, ref: React.ForwardedRef<IFlexBoxRef>) => {

    const { direction = 'row', boxRender = () => undefined, stairs: initStairs = [], stairAt = 0, animTime = 300, className, children } = props;

    const stairs = ['0px'].concat(initStairs);

    const [stairNext, setStairNext] = useState(stairAt);
    const [stairPrev, setStairPrev] = useState(stairAt);

    useImperativeHandle(ref, () => ({
        stairTo: (index: number) => {
            setStairPrev(stairNext);
            setStairNext(index);
        }
    }));

    const animation = (stairs: string[], stairNext: number, stairPrev: number) => keyframes`
        from {
            width: ${stairs[stairPrev]};
        }

        to {
            width: ${stairs[stairNext]};
        }
    `;

    return (
    <Container className={className} direction={direction}>
        <HeadBox stairs={stairs} stairNext={stairNext} stairPrev={stairPrev} animTime={animTime} animation={animation}>
            {boxRender()}
        </HeadBox>
        <TailBox>
            {children}
        </TailBox>
    </Container>
    );
}

export const FlexBox = forwardRef(FlexBoxBase);

const Container = styled.div.attrs({} as { direction: Direction })`
    flex: 1;
    display: flex;
    flex-direction: ${({ direction }) => direction};
    align-items: stretch;
`

const HeadBox = styled.div.attrs({} as { stairs: string[], stairNext: number, stairPrev: number, animTime: number, animation: (stairs: string[], stairNext: number, stairPrev: number) => Keyframes })`
    display: ${props => props.stairNext === 0 ? 'none' : 'flex'};
    animation: ${props => props.animation(props.stairs, props.stairNext, props.stairPrev)} ${props => props.animTime}ms linear;

    ${props => props.stairNext > 0 && css`
        width: ${props.stairs[props.stairNext]};
    `}
`;

const TailBox = styled.div`
    flex: 1;
    display: flex;
`