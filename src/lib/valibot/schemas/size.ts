import * as v from 'valibot';


export const heights: string[] = ['child', 'adult'];

export const sizeValiSchema = v.object({
    size: v.pipe(
        v.string(),
        v.minLength(2, 'The size must have at least 2 characters.'), 
        v.maxLength(20, 'The size should not exceed 20 characters.')
    ),
    height: v.pipe(
        v.picklist(heights, 'Select a valid option')
    )
});


export type SizeFormData = v.InferOutput<typeof sizeValiSchema>;