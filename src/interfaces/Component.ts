import React from "react";

export interface IClassName {
    className?: string
}

export interface IChildren {
    children?: React.ReactNode
}

export interface IComponent extends IClassName, IChildren {}