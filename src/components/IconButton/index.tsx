import styled, { css } from "styled-components";
import { IClassName, IClickable } from "~/interfaces/Component";
import { getIconColor } from "../@iconfont/helper";
import IconDuigouWeigouxuan from "../@iconfont/IconDuigouWeigouxuan";
import IconDuigouzhong from "../@iconfont/IconDuigouzhong";
import IconJinrujiantou from "../@iconfont/IconJinrujiantou";
import IconLiebiao from "../@iconfont/IconLiebiao";
import IconShanchu from "../@iconfont/IconShanchu";
import IconZengjia from "../@iconfont/IconZengjia";

export interface IIconButtonProps extends IClassName, IClickable {
    name: string;
    size?: number;
    color?: string | string[];
    disabled?: boolean;
}

export const IconButton = (props: IIconButtonProps) => {

    const { name, size, color: initColor, disabled, onClick, className } = props;

    const color = () => disabled ? getIconColor(initColor, 2, 'lightgray') : getIconColor(initColor, 0, 'black');

    const icon = () => {
        switch (name) {
            case 'duigouzhong':
                return <IconDuigouzhong size={size} color={color()} />;
            case 'duigouweigouxuan':
                return <IconDuigouWeigouxuan size={size} color={color()} />;
            case 'liebiao':
                return <IconLiebiao size={size} color={color()} />;
            case 'zengjia':
                return <IconZengjia size={size} color={color()} />;
            case 'shanchu':
                return <IconShanchu size={size} color={color()} />;
            case 'jinrujiantou':
                return <IconJinrujiantou size={size} color={color()} />;
            default: return undefined;
        }
    }

    return (
        <Container className={className} disabled={disabled} onClick={disabled ? undefined : onClick}>
            {icon()}
        </Container>
    );
}

const Container = styled.div.attrs({} as {disabled: boolean})`
    cursor: ${props => props.disabled ? 'default' : 'pointer'};

    ${props => !props.disabled && css`
        &:hover {
            background-color: ${props.theme._3};
        }
    `}
`