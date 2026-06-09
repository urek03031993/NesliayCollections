import * as z from 'zod';


export const productSchemaZod = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    color: z.string(),
    category: z.enum(['mommy_and_me', 'boys', 'girls']),
    activo: z.boolean().default(true),
});


export const imageSchemaZod = z.object({
    url: z.url().max(500),
    urlThumbnail: z.url().max(500).optional(),
    file_name: z.string().max(255).optional(),
    short_description: z.string().max(500).optional(),
});


export const sizeSchemaZod = z.object({
    size: z.string().min(2, { error: "Size must be at least 2 characters long" }).max(20, { error: "Size must be at most 20 characters long" }),
    height: z.enum(['child', 'adult'], { error: "Height must be either 'child' or 'adult'" }),
});


export const productSizeSchemaZod = z.object({
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    available_quantity: z.number().int().positive(),
    reserved_quantity: z.number().int().nonnegative().default(0),
});


export const productFormSchemaZod = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(500),				
    color: z.string(),
    category: z.enum(['mommy_and_me', 'boys', 'girls']),
    activo: z.boolean(),
    sizes: z.array(
        z.object({
        size_id: z.number().int(),
        size: z.string(),
        price: z.string(),
        quantity: z.number().int()
    })),
    file: z.file().min(4096,{message: 'The image file is too small or you did not upload any image'}).max(4194304).mime(["image/png", "image/jpeg", "image/jpg"])
});


export const productFormPartialSchemaZod = productFormSchemaZod.partial({file: true})


export type productFormSchema = z.infer<typeof productFormSchemaZod>
export type productFormPartialSchema = z.infer<typeof productFormPartialSchemaZod>
export type productSchema = z.infer<typeof productSchemaZod>
export type imageSchema = z.infer<typeof imageSchemaZod>
export type sizeSchema = z.infer<typeof sizeSchemaZod>
export type productSizeSchema = z.infer<typeof productSizeSchemaZod>

