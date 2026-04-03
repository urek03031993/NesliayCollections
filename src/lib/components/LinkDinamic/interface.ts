import type { Snippet } from "svelte";

export interface LinkDinamic {
    children: Snippet;
    title?: string;
    href: string;
    baseClass: string; 
    activeClass: string;
    nonActiveClass: string;
}