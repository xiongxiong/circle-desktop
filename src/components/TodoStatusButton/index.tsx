import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { IClassName } from "~/interfaces/Component";

export interface ITodoStatusButtonViewProps {
    color?: string,
    bgColor?: string,
}

export interface ITodoStatusButtonProps {
    width?: string,
    height?: string,
    enabled?: boolean,
    onClick?: () => void,
    contentNormal?: ReactNode,
    contentHover?: ReactNode,
    contentDisabled?: ReactNode,
    vpNormal?: ITodoStatusButtonViewProps,
    vpHover?: ITodoStatusButtonViewProps,
    vpDisabled?: ITodoStatusButtonViewProps,
}

export const TodoStatusButton = (props: ITodoStatusButtonProps & IClassName) => {
    const { width, height, enabled, onClick, contentNormal, contentHover, contentDisabled, vpNormal, vpHover, vpDisabled, className } = props;

    return (
        <Container className={className} width={width} height={height} enabled={enabled} vpNormal={vpNormal} vpHover={vpHover} vpDisabled={vpDisabled} onClick={enabled ? onClick : undefined}>
            {enabled ? (
                <>
                    <Layer className="stat-btn-fore">{contentNormal}</Layer>
                    <Layer className="stat-btn-back">{contentHover}</Layer>
                </>
            ) : (
                <Layer>{contentDisabled}</Layer>
            )}
        </Container>
    );
}

const Container = styled.div.attrs({} as { enabled: boolean, width: string, height: string, vpNormal: ITodoStatusButtonViewProps, vpHover: ITodoStatusButtonViewProps, vpDisabled: ITodoStatusButtonViewProps })`
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => css`
        width: ${props.width};
        height: ${props.height};
    `}

    ${props => props.enabled ? css`
        color: ${props.vpNormal?.color};
        background-color: ${props.vpNormal?.bgColor};

        & .stat-btn-fore {
            display: flex;
        }
        & .stat-btn-back {
            display: none;
        }
        
        &:hover {
            cursor: pointer;
            color: ${props.vpHover?.color};
            background-color: ${props.vpHover?.bgColor};

            & .stat-btn-fore {
                display: none;
            }
            & .stat-btn-back {
                display: flex;
            }
        }
    ` : css`
        color: ${props.vpDisabled?.color};
        background-color: ${props.vpDisabled?.bgColor};
    `}
`

const Layer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
