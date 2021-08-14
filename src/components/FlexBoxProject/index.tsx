import { useState } from "react";
import { IClassName, IComponent } from "~/interfaces/Component";
import { FlexBox } from "../FlexBox"

export interface IFlexBoxProject extends IComponent {
    
}

export const FlexBoxProject = (props: IFlexBoxProject) => {

    const {className, children} = props;

    const [stairNext, setstairNext] = useState(0 as number);
    const [stairPrev, setstairPrev] = useState(0 as number);

    const stairs = ['0%', '30%'];

    const boxRender = () => undefined;

    return (
        <FlexBox className={className} boxRender={boxRender} stairs={stairs} stairNext={stairNext} stairPrev={stairPrev}>
            {children}
        </FlexBox>
    );
}