// All bilingual text content of the homepage lives here.
// Replace every "TODO" placeholder with your real information.
//
// Text fields (affiliation, address, email, paragraphs, items) accept inline
// Markdown: **bold**, *italic*, [link text](https://example.com). A "\n"
// inside a string is a line break. Anything else is shown literally.

export type Lang = "en" | "zh";

export interface Link {
  label: string;
  url: string;
}

export interface Entry {
  /** Optional date range, shown in a left column. */
  period?: string;
  /** Optional bold heading; the text is then shown on the next line. */
  heading?: string;
  text: string;
}

/** A heading followed by paragraphs, a list of items, or both. */
export interface Block {
  /** Anchor used by the section navigation (#id). */
  id: string;
  title: string;
  paragraphs?: string[];
  items?: Entry[];
}

export interface Profile {
  htmlLang: string;
  name: string;
  /** Lines shown under the name. */
  affiliation: string[];
  address: string;
  email: string;
  links: Link[];
  /** Headings shown above Publications, in order. */
  about: Block[];
  publicationsTitle: string;
  /** Shown after Publications, as a list of clickable links. */
  relatedLinksTitle: string;
  relatedLinks: Link[];
}

export const profile: Record<Lang, Profile> = {
  en: {
    htmlLang: "en",
    name: "Changan Niu",
    affiliation: ["Yuxiu Young Scholar", "Software Institute", "State Key Laboratory for Novel Software Technology", "Nanjing University"],
    address: "22 Hankou Road, Nanjing, China",
    email: "nca {at} nju.edu.cn",
    links: [
      { label: "GitHub", url: "https://github.com/nougatca" },
      { label: "DBLP", url: "https://dblp.uni-trier.de/pid/289/8542.html" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=vlc3KBMAAAAJ" },
    ],
    about: [
      { id: "biography", title: "Biography", paragraphs: [
        "I am currently a Yuxiu Young Scholar at the Software Institute, Nanjing University. I received my Ph.D. in Software Engineering from Nanjing University in June 2025. From July 2025 to July 2026, I worked as a Senior R&D Engineer at Huawei Consumer Business Group.",
        "My research primarily focuses on **AI for Software Engineering**, including binary program understanding and decompilation, AI-driven code optimization, and code intelligence and program representation learning. I am also actively exploring **embodied AI**, supported by the research expertise and resources of our team. I have published several papers in top-tier international conferences and journals, and as the first author, I received the ACM SIGSOFT Distinguished Paper Award at ICSE 2024.",
        "I welcome students interested in software engineering, artificial intelligence, and embodied AI to contact me!"
      ] },
      {
        id: "experience", title: "Experience",
        items: [
          { period: "2026.7 - present", text: "Yuxiu Young Scholar, Nanjing University" },
          { period: "2025.7 - 2026.7", text: "Senior R&D Engineer, Huawei Consumer Business Group" },
          { period: "2022.10 - 2023.10", text: "Visiting Scholar, Singapore Management University, Singapore (Advisor: [David Lo](http://www.mysmu.edu/faculty/davidlo/))" },
          { period: "2021.9 - 2025.6", text: "Ph.D. in Software Engineering, Nanjing University (Advisor: [Bin Luo](https://software.nju.edu.cn//luobin/index.html), [Chuanyi Li](https://lichuanyi.site/))" },
        ],
      },
      {
        id: "research", title: "Research Interests",
        paragraphs: [
          "My research lies at the intersection of artificial intelligence and software engineering. I am interested in teaching machines to understand, generate, and optimize programs, from source code to compiled binaries, and in making such AI-driven techniques accurate, efficient, and practical. Currently, my work centers on the following directions."
        ],
        items: [
          { heading: "◆ Binary Program Understanding & Decompilation", text: "I study the recovery of high-level program semantics from binaries without source code or debugging information, including high-fidelity decompilation, symbol and data type recovery, and program structure and behavior understanding. My research combines static program analysis, compiler techniques, and machine learning to improve the accuracy and practical utility of binary analysis and decompilation." }, 
          { heading: "◆ AI-Driven Code Optimization", text: "I investigate AI-driven techniques for improving program execution efficiency while preserving functional correctness. This includes optimizing for various performance metrics such as runtime speed, memory usage, and energy consumption, and exploring methods that combine static analysis, dynamic analysis, and machine learning for intelligent code optimization." },
          { heading: "◆ Code Intelligence & Program Representation Learning", text: "I study code representation learning, pre-training of code models, cross-task generalization, and model evaluation for software engineering tasks. My previous work includes SPT-Code and FAIR, covering program representations from source code to compiler intermediate representations." },
          { heading: "◆ Embodied AI", text: "I am interested in embodied intelligence, particularly how intelligent agents perceive, reason, plan, and act in real-world environments. This research explores the integration of foundation models with robotic systems to bridge AI and the physical world. Our research team has committed substantial resources to embodied AI, providing students with access to industry-grade research infrastructure, practical development platforms, and internship and career opportunities through industry collaborations. These resources support both fundamental research and real-world applications." },
        ],
      },
      { id: "admissions", title: "Admissions", paragraphs: [
        "I welcome motivated undergraduate and graduate students interested in AI, software engineering, and embodied AI!",
        "I am committed to providing hands-on research mentorship throughout the entire research process, from identifying research problems and reviewing the literature to designing methods, conducting experiments, writing papers, and addressing reviewer feedback. I work directly with students to help them develop strong and independent research skills. Drawing on my experience in publishing multiple first-author papers at top-tier conferences, I help students identify promising research problems, develop feasible research plans, and work toward publishing high-quality first-author papers that meet their degree requirements.",
        "Our research team has also made substantial investments in embodied AI, offering access to industry-grade research resources, practical development platforms, and internship and career opportunities through industry collaborations. These opportunities help students pursue both academic excellence and professional development.",
        "Whether you plan to pursue a Ph.D., build an academic career, or work on cutting-edge technologies in industry, I encourage you to reach out if you have solid programming skills, intellectual curiosity, and a strong commitment to research."
      ] },
    ],
    publicationsTitle: "Publications",
    relatedLinksTitle: "Related Links",
    relatedLinks: [
      { label: "Nanjing University", url: "https://www.nju.edu.cn/" },
      { label: "Software Institute, Nanjing University", url: "https://software.nju.edu.cn/" },
      { label: "State Key Laboratory for Novel Software Technology", url: "https://keysoftlab.nju.edu.cn/" },
      { label: "Language Intelligence Processing Lab (LIP Lab)", url: "https://liplab.site/index-en.html" },
      { label: "Vincent Ng", url: "https://personal.utdallas.edu/~vince/" }
    ],
  },
  zh: {
    htmlLang: "zh-CN",
    name: "牛长安",
    affiliation: ["毓秀青年学者", "软件学院", "计算机软件新技术国家重点实验室", "南京大学"],
    address: "南京市汉口路22号",
    email: "nca {at} nju.edu.cn",
    links: [
      { label: "GitHub", url: "https://github.com/nougatca" },
      { label: "DBLP", url: "https://dblp.org/pid/289/8542.html" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=vlc3KBMAAAAJ" },
    ],
    about: [
      { id: "biography", title: "个人简介", paragraphs: [
        "我目前是南京大学的毓秀青年学者。2025年6月于南京大学获得软件工程博士学位，随后于2025年7月至2026年7月在华为终端BG担任高级工程师，从事软件研发工作。",
        "我的研究主要集中于**智能软件工程**（AI for Software Engineering），包括二进制程序理解与反编译、智能代码优化、代码智能与程序表征学习。同时，我也依托团队的研究资源，积极探索**具身智能**领域的前沿研究。我发表了多篇国际高水平会议/期刊论文，并以第一作者身份获得了ICSE 2024 ACM SIGSOFT Distinguished Paper Award（杰出论文奖）。",
        "**欢迎对软件工程、人工智能及具身智能感兴趣的同学与我联系！**"
      ] },
      {
        id: "experience", title: "经历",
        items: [
          { period: "2026.7 - 至今", text: "毓秀青年学者, 南京大学" },
          { period: "2025.7 - 2026.7", text: "高级工程师, 华为终端BG" },
          { period: "2022.10 - 2023.10", text: "访问学者, 新加坡管理大学（导师：[David Lo](http://www.mysmu.edu/faculty/davidlo/)）" },
          { period: "2021.9 - 2025.6", text: "南京大学软件工程博士（导师：[骆斌](https://software.nju.edu.cn//luobin/index.html)，[李传艺](https://lichuanyi.site/)）" },
        ],
      },
      {
        id: "research", title: "研究方向",
        paragraphs: [
          "我的研究位于软件工程与人工智能的交叉领域，关注如何让机器理解、生成并优化程序，涵盖从源代码到二进制程序的多个层面，并致力于提升相关智能技术的准确性、效率与实用性。目前的研究主要围绕以下几个方向展开："
        ],
        items: [
          { heading: "◆ 二进制程序理解与反编译（Binary Program Understanding & Decompilation）", text: "研究如何从缺乏源码和调试信息的二进制程序中恢复高层语义信息，包括高保真反编译、符号与数据类型恢复，以及程序结构与行为理解。重点探索结合程序静态分析、编译器技术和机器学习的方法，提高二进制程序分析与反编译的准确性和实用性。" }, 
          { heading: "◆ 智能代码优化（AI-Driven Code Optimization）", text: "研究如何利用人工智能技术自动提升程序的执行效率，同时保障程序的功能正确性。执行效率包含程序的运行速度、内存占用、能耗等多个方面，针对不同的优化目标，探索结合静态分析、动态分析与机器学习的方法，实现对程序的智能优化。" },
          { heading: "◆ 代码智能与程序表征学习（Code Intelligence & Program Representation Learning）", text: "研究面向软件工程任务的代码表示学习、代码大模型预训练、跨任务泛化及模型评估。代表性研究成果包括 SPT-Code 和 FAIR 等，涵盖从源代码到编译器中间表示的程序建模与学习。" },
          { heading: "◆ 具身智能（Embodied AI）", text: "研究具身智能体在真实环境中的感知、推理、规划与行动，探索基础模型与机器人系统的结合，推动人工智能从数字环境走向物理世界。我们的研究团队在具身智能领域投入了大量资源，能够为学生提供企业级的研发资源、实践平台，以及相关企业的实习与就业机会，支持从前沿算法研究到真实场景应用的完整研究与实践过程。" }
        ],
      },
      { id: "admissions", title: "招生", paragraphs: [
        "**欢迎对人工智能、软件工程及具身智能感兴趣的同学联系我！**",
        "我高度重视学生的学术成长，致力于提供手把手、全过程的科研指导。从研究选题、文献阅读、技术方案设计，到实验实现、论文写作与投稿修改，我都会亲自参与并持续提供指导，帮助学生逐步建立独立科研能力。凭借多篇顶级会议第一作者论文的研究、写作与投稿经验，我能够帮助学生识别具有发表潜力的研究问题，制定切实可行的研究计划，并以发表符合毕业要求的第一作者高水平学术论文为明确培养目标。",
        "此外，我们的团队在具身智能方向投入了大量科研与产业资源，能够提供企业级的研发资源与实践平台，以及相关企业的实习和就业机会，帮助学生兼顾学术研究与职业发展。",
        "无论你希望继续攻读博士学位、从事学术研究，还是进入企业开展前沿技术研发，只要你具备良好的编程基础、积极主动的学习态度，并愿意认真投入科研，都欢迎与我联系。"
      ] },
    ],
    publicationsTitle: "发表论文",
    relatedLinksTitle: "相关链接",
    relatedLinks: [
      { label: "南京大学", url: "https://www.nju.edu.cn/" },
      { label: "南京大学软件学院", url: "https://software.nju.edu.cn/" },
      { label: "计算机软件新技术国家重点实验室", url: "https://keysoftlab.nju.edu.cn/" },
      { label: "语言智能处理实验室（Liplab）", url: "https://liplab.site/" },
      { label: "Vincent Ng", url: "https://personal.utdallas.edu/~vince/" },
    ],
  },
};
