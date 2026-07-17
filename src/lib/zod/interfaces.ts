
export interface sizeParseErrors {
    size_id?: string[] | undefined;
    price?: string[] | undefined;
    quantity?: string[] | undefined;
}

export interface newImagesPreviewList {
    id?: number;
    file_name?: string;
    uuid: string;
    file?: File;
    urlPreview: string;
};