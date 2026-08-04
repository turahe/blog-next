import "server-only";
import { apiCache } from "@/lib/api/cache";
import { apiRequest } from "@/lib/api/client";
import type { Experience, Profile, Skill } from "@/lib/api/types";
import { ApiEnvelope } from "@/types/post";

export type {
  Experience,
  Profile,
  Skill,
  SocialLink,
} from "@/lib/api/types";

/**
 * Profile, experience, and skills APIs.
 */
export const profileApi = {
  async getProfile(): Promise<Profile> {
    const envelope = await apiRequest<ApiEnvelope<Profile>>("/profile", {
      revalidate: apiCache.profile.revalidate,
      tags: [...apiCache.profile.tags],
    });
    return envelope.data;
  },

  async getProfileSafe(): Promise<Profile | null> {
    try {
      return await this.getProfile();
    } catch {
      return null;
    }
  },

  async getExperience(): Promise<Experience[]> {
    const envelope = await apiRequest<ApiEnvelope<Experience[]>>(
      "/experience",
      {
        revalidate: apiCache.experience.revalidate,
        tags: [...apiCache.experience.tags],
      },
    );
    return Array.isArray(envelope.data) ? envelope.data : [];
  },

  async getExperienceSafe(): Promise<Experience[]> {
    try {
      return await this.getExperience();
    } catch {
      return [];
    }
  },

  async getSkills(): Promise<Skill[]> {
    const envelope = await apiRequest<ApiEnvelope<Skill[]>>("/skills", {
      revalidate: apiCache.skills.revalidate,
      tags: [...apiCache.skills.tags],
    });
    return Array.isArray(envelope.data) ? envelope.data : [];
  },

  async getSkillsSafe(): Promise<Skill[]> {
    try {
      return await this.getSkills();
    } catch {
      return [];
    }
  },
};
