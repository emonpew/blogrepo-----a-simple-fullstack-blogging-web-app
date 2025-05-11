// prisma/seed.ts
import { faker } from "@faker-js/faker";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.tagOnPost.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create 10 users
  const users: any = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }

  // Create some tags
  const tags: any = [];
  const tagNames = [
    "technology",
    "programming",
    "design",
    "business",
    "science",
  ];
  for (const name of tagNames) {
    const tag = await prisma.tag.create({
      data: { name },
    });
    tags.push(tag);
  }

  // Create 50 posts with random tags and authors
  for (let i = 0; i < 50; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
        content: faker.lorem.paragraphs(5),
        published: faker.datatype.boolean(),
        authorId: randomUser.id,
        tags: {
          create: getRandomTags(tags),
        },
      },
    });

    // Create some comments for each post
    const commentCount = faker.datatype.number({ min: 0, max: 5 });
    for (let j = 0; j < commentCount; j++) {
      const randomCommenter = users[Math.floor(Math.random() * users.length)];
      await prisma.comment.create({
        data: {
          content: faker.lorem.paragraph(),
          postId: post.id,
          authorId: randomCommenter.id,
        },
      });
    }

    // Create some likes for each post
    const likeCount = faker.datatype.number({ min: 0, max: 10 });
    const likedUsers = new Set(); // To ensure a user only likes once
    for (let j = 0; j < likeCount; j++) {
      const randomLiker = users[Math.floor(Math.random() * users.length)];
      if (!likedUsers.has(randomLiker.id)) {
        likedUsers.add(randomLiker.id);
        await prisma.like.create({
          data: {
            userId: randomLiker.id,
            postId: post.id,
          },
        });
      }
    }
  }
}

// Helper function to get 1-3 random tags
function getRandomTags(tags: any[]) {
  const count = faker.datatype.number({ min: 1, max: 3 });
  const shuffled = [...tags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((tag) => ({
    tag: { connect: { id: tag.id } },
  }));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
