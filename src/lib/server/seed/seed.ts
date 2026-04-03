import { db } from '../index';
import { user } from '../db/schema';


async function seed2() {
  	console.log('🌱 Iniciando seed...');

  	await db.insert(user).values({
        username: 'PruebaUser',
        email: 'asd@qwe.com', 
		password: '123'
	});
	

    console.log('✅ Seed completado exitosamente');
    process.exit(0);
}

seed2().catch((err) => {
	console.error('❌ Error en seed:', err);
	process.exit(1);
});





// async function seed() {
//   console.log('🌱 Iniciando seed...');

//   // 1. Categorías
//   const categoriasData = await db.insert(categorias).values([
//     { nombre: 'Vestidos de Noche', slug: 'vestidos-noche', descripcion: 'Elegancia para eventos nocturnos', orden: 1 },
//     { nombre: 'Vestidos de Novia', slug: 'vestidos-novia', descripcion: 'El día más especial', orden: 2 },
//     { nombre: 'Vestidos de Quinceañera', slug: 'vestidos-quinceanera', descripcion: 'Dulces 15', orden: 3 },
//     { nombre: 'Vestidos de Gala', slug: 'vestidos-gala', descripcion: 'Alta costura y eventos formales', orden: 4 },
//     { nombre: 'Vestidos Cortos', slug: 'vestidos-cortos', descripcion: 'Casual y cóctel', orden: 5 },
//   ]).returning();

//   console.log('✅ Categorías creadas:', categoriasData.length);

//   // 2. Producto de ejemplo con variantes
//   const [producto] = await db.insert(productos).values({
//     nombre: 'Vestido Elegancia Nocturna',
//     slug: 'vestido-elegancia-nocturna',
//     descripcion: 'Vestido largo de seda con detalles de encaje',
//     descripcionCorta: 'Seda natural con encaje francés',
//     color: '#1a1a2e', // Azul noche
//     colorNombre: 'Azul Noche',
//     categoriaId: categoriasData[0].id, // Vestidos de Noche
//     material: 'Seda y encaje',
//     estilo: 'Largo',
//     ocasion: 'Gala',
//     destacado: true,
//   }).returning();

//   // Imágenes del producto
//   await db.insert(imagenesProducto).values([
//     { productoId: producto.id, url: 'https://cdn.ejemplo.com/vestido1-1.jpg', esPrincipal: true, orden: 0 },
//     { productoId: producto.id, url: 'https://cdn.ejemplo.com/vestido1-2.jpg', esPrincipal: false, orden: 1 },
//     { productoId: producto.id, url: 'https://cdn.ejemplo.com/vestido1-3.jpg', esPrincipal: false, orden: 2 },
//   ]);

//   // Variantes con diferentes precios por talla
//   await db.insert(variantesProducto).values([
//     {
//       productoId: producto.id,
//       sku: 'VEN-001-XS',
//       tamano: 'adulto',
//       talla: 'XS',
//       tallaDescripcion: 'Extra Small - Talle 34',
//       precio: '15000.00',
//       precioCompare: '18000.00',
//       cantidadTotal: 2,
//       cantidadDisponible: 2,
//       medidasBusto: '82-86 cm',
//       medidasCintura: '62-66 cm',
//       medidasCadera: '90-94 cm',
//       largo: '155 cm',
//     },
//     {
//       productoId: producto.id,
//       sku: 'VEN-001-S',
//       tamano: 'adulto',
//       talla: 'S',
//       tallaDescripcion: 'Small - Talle 36',
//       precio: '15000.00',
//       precioCompare: '18000.00',
//       cantidadTotal: 3,
//       cantidadDisponible: 3,
//       medidasBusto: '86-90 cm',
//       medidasCintura: '66-70 cm',
//       medidasCadera: '94-98 cm',
//       largo: '155 cm',
//     },
//     {
//       productoId: producto.id,
//       sku: 'VEN-001-M',
//       tamano: 'adulto',
//       talla: 'M',
//       tallaDescripcion: 'Medium - Talle 38',
//       precio: '15500.00', // ¡Precio diferente!
//       precioCompare: '18500.00',
//       cantidadTotal: 2,
//       cantidadDisponible: 2,
//       medidasBusto: '90-94 cm',
//       medidasCintura: '70-74 cm',
//       medidasCadera: '98-102 cm',
//       largo: '157 cm',
//     },
//     {
//       productoId: producto.id,
//       sku: 'VEN-001-L',
//       tamano: 'adulto',
//       talla: 'L',
//       tallaDescripcion: 'Large - Talle 40',
//       precio: '16000.00', // ¡Precio diferente!
//       precioCompare: '19000.00',
//       cantidadTotal: 2,
//       cantidadDisponible: 2,
//       medidasBusto: '94-98 cm',
//       medidasCintura: '74-78 cm',
//       medidasCadera: '102-106 cm',
//       largo: '157 cm',
//     },
//     {
//       productoId: producto.id,
//       sku: 'VEN-001-XL',
//       tamano: 'adulto',
//       talla: 'XL',
//       tallaDescripcion: 'Extra Large - Talle 42',
//       precio: '16500.00', // ¡Precio diferente!
//       precioCompare: '19500.00',
//       cantidadTotal: 1,
//       cantidadDisponible: 1,
//       medidasBusto: '98-102 cm',
//       medidasCintura: '78-82 cm',
//       medidasCadera: '106-110 cm',
//       largo: '160 cm',
//     },
//   ]);

//   // 3. Cliente de ejemplo
//   await db.insert(clientes).values({
//     nombre: 'María',
//     apellido: 'González',
//     email: 'maria.gonzalez@email.com',
//     telefono: '+54 11 1234-5678',
//     tipoDocumento: 'dni',
//     numeroDocumento: '12345678',
//     direccion: 'Av. Corrientes 1234',
//     ciudad: 'Buenos Aires',
//     codigoPostal: '1043',
//   });

//   console.log('✅ Seed completado exitosamente');
//   process.exit(0);
// }

