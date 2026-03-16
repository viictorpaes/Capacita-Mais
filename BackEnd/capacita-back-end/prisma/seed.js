const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const senhaPadrao = await bcrypt.hash('123456', 10);

  const usuariosBase = [
    {
      name: 'Administrador Capacita',
      email: 'admin@capacita.com',
      password: senhaPadrao,
      role: 'ADMIN',
    },
    {
      name: 'Ana Souza',
      email: 'ana@capacita.com',
      password: senhaPadrao,
      role: 'STUDENT',
    },
    {
      name: 'Bruno Lima',
      email: 'bruno@capacita.com',
      password: senhaPadrao,
      role: 'STUDENT',
    },
    {
      name: 'Carla Mendes',
      email: 'carla@capacita.com',
      password: senhaPadrao,
      role: 'STUDENT',
    },
  ];

  const cursosBase = [
    {
      title: 'Introducao ao TEA em Sala de Aula',
      description: 'Fundamentos praticos para acolhimento de estudantes com TEA.',
      price: 0,
      isPublished: true,
    },
    {
      title: 'Metodologias para TDAH',
      description: 'Estrategias de atencao, rotina e avaliacao para estudantes com TDAH.',
      price: 79.9,
      isPublished: true,
    },
    {
      title: 'Praticas Inclusivas para Dislexia',
      description: 'Adaptacoes de conteudo e avaliacao com foco em aprendizagem inclusiva.',
      price: 59.9,
      isPublished: true,
    },
    {
      title: 'Plano Educacional Individualizado (PEI)',
      description: 'Como estruturar e acompanhar um PEI efetivo na escola.',
      price: 99.9,
      isPublished: true,
    },
  ];

  await prisma.$transaction(async (tx) => {
    // Mantem a seed deterministica para sempre criar o mesmo estado.
    await tx.enrollment.deleteMany();
    await tx.course.deleteMany();
    await tx.user.deleteMany();

    await tx.user.createMany({ data: usuariosBase });
    await tx.course.createMany({ data: cursosBase });

    const usuarios = await tx.user.findMany({
      where: {
        email: { in: usuariosBase.map((u) => u.email) },
      },
    });

    const cursos = await tx.course.findMany({
      where: {
        title: { in: cursosBase.map((c) => c.title) },
      },
    });

    const usuarioPorEmail = new Map(usuarios.map((u) => [u.email, u]));
    const cursoPorTitulo = new Map(cursos.map((c) => [c.title, c]));

    const matriculas = [
      ['ana@capacita.com', 'Introducao ao TEA em Sala de Aula'],
      ['ana@capacita.com', 'Plano Educacional Individualizado (PEI)'],
      ['bruno@capacita.com', 'Metodologias para TDAH'],
      ['bruno@capacita.com', 'Praticas Inclusivas para Dislexia'],
      ['carla@capacita.com', 'Introducao ao TEA em Sala de Aula'],
      ['carla@capacita.com', 'Metodologias para TDAH'],
    ];

    const dadosMatricula = matriculas
      .map(([email, titulo]) => {
        const usuario = usuarioPorEmail.get(email);
        const curso = cursoPorTitulo.get(titulo);

        if (!usuario || !curso) {
          return null;
        }

        return {
          userId: usuario.id,
          courseId: curso.id,
        };
      })
      .filter(Boolean);

    await tx.enrollment.createMany({ data: dadosMatricula });
  });

  console.log('Seed concluida com sucesso.');
  console.log('Admin: admin@capacita.com');
  console.log('Usuarios de teste: ana@capacita.com, bruno@capacita.com, carla@capacita.com');
  console.log('Senha padrao para todos: 123456');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
