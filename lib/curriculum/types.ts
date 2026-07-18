import type { LessonBlock } from "@/lib/curriculum/blocks";

export interface CurriculumLesson {
  id: string;
  title: string;
  estMinutes: number;
  status: "not_started" | "in_progress" | "done";
  contentBlocks: LessonBlock[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumCourse {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  modules: CurriculumModule[];
}
