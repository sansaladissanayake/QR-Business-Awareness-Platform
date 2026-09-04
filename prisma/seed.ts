import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert Console Items LK
  const existing = await prisma.business.findUnique({ where: { slug: 'console-items-lk' } });
  if (!existing) {
    await prisma.business.create({
      data: {
        slug: 'console-items-lk',
        name: 'Console Items LK',
        description: 'Your one-stop shop for gaming consoles, accessories and more in Sri Lanka.',
        logo: 'https://ui-avatars.com/api/?name=Console+Items+LK&background=101010&color=fff&size=200',
        links: {
          create: [
            { platform: 'maps', title: 'Find Us on Google Maps', url: 'https://maps.app.goo.gl/tiQGa2LszrMQVgdM8?g_st=ic', order: 0 },
            { platform: 'facebook', title: 'Facebook', url: 'https://www.facebook.com/ConsoleiTems.LK?mibextid=wwXIfr', order: 1 },
            { platform: 'whatsapp', title: 'WhatsApp', url: 'https://wa.me/94705269699', order: 2 },
            { platform: 'phone', title: 'Call Us', url: 'tel:+94705269699', order: 3 },
            { platform: 'email', title: 'Email', url: 'mailto:consoleitemlk@gmail.com', order: 4 },
          ],
        },
      },
    });
    console.log('✅ Seeded: Console Items LK');
  } else {
    console.log('ℹ️  Console Items LK already exists, skipping seed.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
