import type { Snippet } from "svelte";


export interface toastContainerProps {
    children: Snippet;
}


export interface toastProps {
    id: string;
    text: string;
    type: 'info' | 'success' | 'error';
    duration?: number;
    showToast?: boolean;
}