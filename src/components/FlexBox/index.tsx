import styled, { Keyframes, keyframes } from "styled-components";
import { IComponent } from "~/interfaces/Component";

export interface IFlexBoxProps extends IComponent {
    direction?: Direction,
    boxRender: () => React.ReactNode,
    stairs: string[],
    stairNext: number,
    stairPrev?: number
}

export type Direction = "row" | "column";

export const FlexBox = (props: IFlexBoxProps) => {

    const { direction = 'row', boxRender = () => undefined, stairs = [], stairNext = 0, stairPrev = stairNext, className, children } = props;

    const headWidth = stairs[stairNext];

    const animation = keyframes`
        from {
            width: ${stairs[stairPrev]};
        }

        to {
            width: ${stairs[stairNext]};
        }
    `;

    return (
    <Container className={className} direction={direction}>
        <HeadBox width={headWidth} animation={animation}>
            {boxRender()}
        </HeadBox>
        <TailBox>
            {children}
        </TailBox>
    </Container>
    );
}

const Container = styled.div.attrs({} as { direction: Direction })`
    display: flex;
    flex-direction: ${({ direction }) => direction};
    align-items: stretch;
`

const HeadBox = styled.div.attrs({} as { width: string, animation: Keyframes })`
    display: flex;
    width: ${props => props.width};
    animation: ${props => props.animation} 700ms linear;
`;

const TailBox = styled.div`
    flex: 1;
    display: flex;
`