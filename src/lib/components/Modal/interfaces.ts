
import { type Snippet } from "svelte";
import { type HTMLDialogAttributes } from "svelte/elements";


export interface DialogProps extends HTMLDialogAttributes{
    children: Snippet;
    open: boolean
    onaction?: ({ action, data }: {
        action: string;
        data: FormData;
    }) => unknown;
}

export interface ModalProps {
    children: Snippet;
    title?: string;
    footer?: Snippet
    open: boolean
}

export interface ModalDeleteProps {
    open: boolean;
    id: number;
}