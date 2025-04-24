// lib/auth/custom-prisma-adapter.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

export const CustomPrismaAdapter = (prisma: PrismaClient): Adapter => {
  const baseAdapter = PrismaAdapter(prisma);

  return {
    ...baseAdapter,
    async linkAccount(account) {
      const {
        providerAccountId,
        provider,
        type,
        userId,
        access_token,
        expires_at,
        id_token,
        refresh_token,
        scope,
        session_state,
        token_type,
      } = account;

      await prisma.account.create({
        data: {
          userId,
          provider,
          providerAccountId,
          type,
          accessToken: access_token, // rename to match schema
          expiresAt: expires_at,
          idToken: id_token,
          refreshToken: refresh_token,
          scope,
          sessionState: session_state as string,
          tokenType: token_type,
        },
      });
    },
  };
};
