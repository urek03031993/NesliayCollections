// export async function GET({ url }) {
//     try {
//         const featured = url.searchParams.get('featured') === 'true';
//         const category = url.searchParams.get('category');
//         const limit = parseInt(url.searchParams.get('limit')) || 50;
//         const search = url.searchParams.get('search');
        
//         const where = {
//             active: true
//         };
        
//         if (featured) {
//             where.featured = true;
//         }
        
//         if (category) {
//             where.category = {
//                 slug: category
//             };
//         }
        
//         if (search) {
//             where.OR = [
//                 { name: { contains: search, mode: 'insensitive' } },
//                 { description: { contains: search, mode: 'insensitive' } }
//             ];
//         }
        
//         const products = await db.product.findMany({
//             where,
//             take: limit,
//             orderBy: { createdAt: 'desc' },
//             include: {
//                 category: {
//                     select: {
//                         name: true,
//                         slug: true
//                     }
//                 }
//             }
//         });
        
//         return json({ products });
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         return json({ error: 'Failed to fetch products' }, { status: 500 });
//     }
// }