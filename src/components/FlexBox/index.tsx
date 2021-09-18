import React, { useImperativeHandle, useRef } from "react";
import { RefObject, forwardRef } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import styled, { css, Keyframes, keyframes } from "styled-components";
import { IComponent } from "~/interfaces/Component";

export interface IFlexBoxStair {
    width: string,
    minWidth?: string,
    maxWidth?: string
}

export interface IFlexBoxProps extends IComponent {
    direction?: Direction,
    stairs: IFlexBoxStair[],
    boxRender?: () => React.ReactNode,
    stairAt?: number,
    animTime?: number
}

export interface IFlexBoxRef {
    stairTo: (index: number) => void
}

export type Direction = "row" | "row-reverse" | "column" | "column-reverse";

const FlexBoxBase = (props: IFlexBoxProps, ref: React.ForwardedRef<IFlexBoxRef>) => {

    const { direction = 'row', stairs: initStairs = [], boxRender = () => undefined, stairAt = 0, animTime = 200, className, children } = props;

    const stairs = [{width: '0px'}].concat(initStairs);

    const [stairNext, setStairNext] = useState(stairAt);
    const [stairPrev, setStairPrev] = useState(stairAt);

    const mainRef: RefObject<HTMLDivElement> = React.createRef();

    useImperativeHandle(ref, () => ({
        stairTo: (index: number) => {
            setStairPrev(stairNext);
            setStairNext(index);
        }
    }));

    const animation = (stairs: IFlexBoxStair[], stairNext: number, stairPrev: number) => keyframes`
        from {
            width: ${stairs[stairPrev].width};
            min-width: ${stairs[stairPrev].minWidth};
            max-width: ${stairs[stairPrev].maxWidth};
        }

        to {
            width: ${stairs[stairNext].width};
            min-width: ${stairs[stairNext].minWidth};
            max-width: ${stairs[stairNext].maxWidth};
        }
    `;

    return (
        <Container className={className} direction={direction}>
            <HeadBox stairs={stairs} stairNext={stairNext} stairPrev={stairPrev} animTime={animTime} animation={animation}>
                {boxRender()}
            </HeadBox>
            <TailBox ref={mainRef}>
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

const HeadBox = styled.div.attrs({} as { stairs: IFlexBoxStair[], stairNext: number, stairPrev: number, animTime: number, animation: (stairs: IFlexBoxStair[], stairNext: number, stairPrev: number) => Keyframes })`
    display: flex;
    overflow: hidden;
    width: ${props => props.stairs[props.stairNext].width};
    min-width: ${props => props.stairs[props.stairNext].minWidth};
    max-width: ${props => props.stairs[props.stairNext].maxWidth};
    animation: ${props => props.animation(props.stairs, props.stairNext, props.stairPrev)} ${props => props.animTime}ms ease-out;
`;

const TailBox = styled.div`
    flex: 1;
    display: flex;
`