import React from "react";

export interface IClassName {
    className?: string
}

export interface IChildren {
    children?: React.ReactNode
}

export interface IClickable {
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export interface IComponent extends IClassName, IChildren {}