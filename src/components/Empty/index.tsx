import styled from "styled-components"

export interface IEmpty {
    width?: string,
    height?: string
}

export const Empty = (props: IEmpty) => {
    const {width, height} = props;
    return (
        <Container>
            <Img src="./assets/images/empty.svg" width={width} height={height} />
        </Container>
    );
}

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Img = styled.img`
    & svg path {
        fill: "white";
    }
`