// Condensed content for the plain-text mirror of the homepage (see src/lib/plain.ts).
// Output is unformatted plain text. Publications are chosen by PLAIN_PUBLICATION_IDS.
import type { Lang } from "./profile";

export interface PlainContent {
  biographyTitle: string;
  biography: string[];
  /** Homepage lines, placed right after the biography. */
  homepage: string[];
  researchTitle: string;
  research: string[];
  admissionsTitle: string;
  admissions: string[];
  publicationsTitle: string;
  /** Joins the last two authors. */
  and: string;
}

/**
 * Publications to include, as BibTeX citation keys from publications.bib,
 * in the order they should appear.
 */
export const PLAIN_PUBLICATION_IDS: string[] = [
  "chi2026tocolo",
  "chi2026yourcolo",
  "niu2024evaluating",
  "niu2024fair",
  "niu2023empirical",
  "niu2023crosscodebench",
  "niu2022deep",
  "niu2022sptcode"
];

export const SITE_URL = "https://nougatca.github.io";

export const plain: Record<Lang, PlainContent | null> = {
  zh: {
    biographyTitle: "个人简介",
    biography: [
      "牛长安，南京大学软件学院毓秀青年学者。2025年6月于南京大学获软件工程博士学位，2025年7月至2026年7月在华为终端BG担任高级工程师。",
      "研究聚焦智能软件工程（AI for Software Engineering），并积极探索具身智能。在国际高水平会议/期刊发表多篇论文，以第一作者获ICSE 2024 ACM SIGSOFT杰出论文奖（Distinguished Paper Award）。",
    ],
    homepage: [
      `中文主页：${SITE_URL}/zh/`,
      `English: ${SITE_URL}/`,
    ],
    researchTitle: "研究方向",
    research: [
      "二进制程序理解与反编译：从无源码、无调试信息的二进制程序中恢复高层语义，包括高保真反编译、符号与数据类型恢复等。",
      "智能代码优化：利用AI提升程序运行速度、内存占用、能耗等执行效率，同时保证功能正确。",
      "代码智能与程序表征学习：代码表示学习、代码大模型预训练与评估。",
      "具身智能：研究智能体在真实环境中的感知、推理、规划与行动，探索基础模型与机器人系统的结合。",
    ],
    admissionsTitle: "招生",
    admissions: [
      "欢迎对人工智能、软件工程及具身智能感兴趣的本科生、研究生联系我！",
      "我会提供手把手、全过程的科研指导，涵盖选题、文献阅读、方案设计、实验、论文写作与投稿修改，以发表符合毕业要求的高水平论文为培养目标。团队在具身智能方向投入了大量资源，可提供企业级研发平台以及相关企业的实习和就业机会。",
      "如果你编程基础扎实、积极主动并愿意认真投入科研，欢迎发送邮件至 nca {at} nju.edu.cn。",
    ],
    publicationsTitle: "代表论文",
    and: ", ",
  },
  // Set to null to leave a language out of the generated file.
  en: null,
};
