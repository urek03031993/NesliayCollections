import * as z from 'zod';


// SIZE
export const sizeSchemaZod = z.object({
    size: z.string().min(1, { error: "Size must be at least 2 characters long" }).max(20, { error: "Size must be at most 20 characters long" }),
    height: z.enum(['child', 'adult'], { error: "Height must be either 'child' or 'adult'" }),
});

export const configurationSchemaZod = z.object({
    key: z.string().min(1, { error: "Key must be at least 2 characters long" }).max(100, { error: "Key must be at most 100 characters long" }),
    value: z.string().min(1, { error: "Value must be at least 2 characters long" }).max(255, { error: "Value must be at most 255 characters long" }),
});







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


export const productSizeSchemaZod = z.object({
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    available_quantity: z.number().int().positive(),
    reserved_quantity: z.number().int().nonnegative().default(0),
});


const price = z.union([
        z.number().positive("Debe ser positivo"),
        z.string().regex(/^\d+(\.\d+)?$/).transform(Number)
    ])
    .refine(val => typeof val === 'number' && val > 0, "Precio inválido")
    .transform(val => String(val))


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];


export const imageFileSchemaZod = z
  .instanceof(File, { message: "Debe ser un archivo" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `El tamaño máximo es ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: `Tipo no soportado. Usa: ${ACCEPTED_IMAGE_TYPES.join(", ")}`,
  });


export const sizeFormSchemaZod = z.object({
    size_id: z.coerce.number().int().positive(),
    price: price,
    quantity: z.coerce.number().int().positive()
});


export const productFormSchemaZod = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(500),				
    color: z.string(),
    category: z.enum(['mommy_and_me', 'boys', 'girls']),
    activo: z.boolean(),
    sizes: z.array(sizeFormSchemaZod),
    files: z.array(imageFileSchemaZod).min(1, "Debes subir al menos una imagen").max(5, "Máximo 5 imágenes permitidas")
});


export const productApiSchemaZod = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(500),				
    color: z.string(),
    category: z.enum(['mommy_and_me', 'boys', 'girls']),
    activo: z.boolean(),
    sizes: z.array(sizeFormSchemaZod),
    imagesData: z.array(imageSchemaZod)
});


export const productFormPartialSchemaZod = productFormSchemaZod.partial({files: true})

export type sizeFormSchema = z.infer<typeof sizeFormSchemaZod>
export type imageFormSchema = z.infer<typeof imageFileSchemaZod>
export type productFormSchema = z.infer<typeof productFormSchemaZod>
export type productFormPartialSchema = z.infer<typeof productFormPartialSchemaZod>
export type productSchema = z.infer<typeof productSchemaZod>
export type imageSchema = z.infer<typeof imageSchemaZod>
export type sizeSchema = z.infer<typeof sizeSchemaZod>
export type productSizeSchema = z.infer<typeof productSizeSchemaZod>

