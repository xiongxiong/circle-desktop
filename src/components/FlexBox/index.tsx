import React, { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import styled, { css, Keyframes, keyframes } from "styled-components";
import { IComponent } from "~/interfaces/Component";

export interface IFlexBoxProps extends IComponent {
    direction?: Direction,
    stairs: string[],
    stairAt?: number,
    animTime?: number
}

export interface IFlexBoxRef {
    stairTo: (index: number) => void
}

export type Direction = "row" | "row-reverse" | "column" | "column-reverse";

const FlexBoxBase = (props: IFlexBoxProps, ref: React.ForwardedRef<IFlexBoxRef>) => {

    const { direction = 'row', stairs: initStairs = [], stairAt = 0, animTime = 200, className, children: initChildren } = props;

    const stairs = ['0px'].concat(initStairs);
    const [head, ...tail] = initChildren instanceof Array ? initChildren : [undefined, initChildren];

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
                {head}
            </HeadBox>
            <TailBox>
                {tail}
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
    display: flex;
    overflow: hidden;
    width: ${props => props.stairs[props.stairNext]};
    animation: ${props => props.animation(props.stairs, props.stairNext, props.stairPrev)} ${props => props.animTime}ms ease-out;
`;

const TailBox = styled.div`
    flex: 1;
    display: flex;
`