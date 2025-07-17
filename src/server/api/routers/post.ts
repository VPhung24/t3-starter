import { z } from "zod";

import { createSchema, getByIdSchema } from "~/lib/schemas/post";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: protectedProcedure
		.input(createSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.post.create({
				data: {
					name: input.name,
					createdBy: { connect: { id: ctx.session.user.id } },
				},
			});
		}),

	getLatest: protectedProcedure.query(async ({ ctx }) => {
		const post = await ctx.db.post.findFirst({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } },
		});

		return post ?? null;
	}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.post.findMany({
			orderBy: { createdAt: "desc" },
			where: { createdBy: { id: ctx.session.user.id } },
		});
	}),

	getById: protectedProcedure.input(getByIdSchema).query(async ({ ctx, input }) => {
		const post = await ctx.db.post.findUnique({
			where: { id: input.id, createdBy: { id: ctx.session.user.id } },
		});

		return post ?? null;
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});
