import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.string('id')
    t.int('index')
    t.string('title')
    t.string('url')
    t.string('description')
    t.string('imageUrl')
    t.string('category')
  }
})

export const LinksQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('links', {
      type: 'Link',
      resolve(_root, _args, ctx) {
        return ctx.prisma.link.findMany()
      }
    })
  }
})

export const createLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createLink', {
      type: Link,
      args: {
        title: nonNull(stringArg()),
        url: nonNull(stringArg()),
        category: nonNull(stringArg()),
        description: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const newLink = {
          title: args.title,
          url: args.url,
          category: args.category,
          description: args.description,
          imageUrl: args.imageUrl,
        }
        return await ctx.prisma.link.create({
          data: newLink
        })
      }
    })
  }
})

export const editLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editLink', {
      type: Link,
      args: {
        id: nonNull(stringArg()),
        title: nonNull(stringArg()),
        url: nonNull(stringArg()),
        category: nonNull(stringArg()),
        description: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        
        return await ctx.prisma.link.update({
          where: {
            id: args.id
          },
          data: {
            title: args.title,
            url: args.url,
            category: args.category,
            description: args.description,
            imageUrl: args.imageUrl,
          }
        })
      }
    })
  }
})

export const deleteLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteLink', {
      type: Link,
      args: {
        id: nonNull(stringArg())
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.link.delete({
          where: {
            id: args.id
          }
        })
      }
    })
  }
})