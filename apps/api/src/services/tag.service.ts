import prisma from "../utils/prisma";

class TagServices {
  async findOrCreateTags(tagname: string[]) {
    // tag slug should be verified
    const tags = await Promise.all(
      tagname.map(async (name) => {
        return await prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {},
        });
      })
    );
    return tags;
  }

  async syncPostTags(postId: number, tagname: string[]) {
    const tags = await this.findOrCreateTags(tagname);

    const currentTags = await prisma.tagOnPost.findMany({
      where: { postId },
      select: { tagId: true },
    });

    const currentTagsIds = currentTags.map((t) => t.tagId);
    const newTagIds = tags.map((t) => t.id);

    const tagsToRemove = currentTagsIds.filter((id) => !newTagIds.includes(id));
    const tagsToAdd = newTagIds.filter((id) => !currentTagsIds.includes(id));

    await prisma.$transaction([
      prisma.tagOnPost.deleteMany({
        where: {
          postId,
          tagId: { in: tagsToRemove },
        },
      }),

      ...tagsToAdd.map((tagId) =>
        prisma.tagOnPost.create({
          data: { postId, tagId },
        })
      ),
    ]);
    return tags;
  }
}

export default new TagServices();
