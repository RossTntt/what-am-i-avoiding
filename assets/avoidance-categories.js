window.AVOIDANCE_CATEGORIES = [
  {
    id: "task-unclear",
    title: "任务本身太模糊",
    icon: "☁️",
    tone: "#4f8f88",
    description: "脑子里只有一团任务，缺少清晰入口。",
    typical: ["不知道第一步是什么", "不知道做到什么程度", "信息太多，理不清"],
    options: [
      "我不知道第一步是什么。",
      "我不知道做到什么程度才算完成。",
      "我不知道先做哪个部分。",
      "我不知道标准是什么。",
      "我不知道对方真正想要什么。",
      "我不知道这个任务最后要交付成什么样。",
      "我脑子里只有一团混乱的任务，没有清楚的小步骤。",
      "我需要先查资料，但不知道查什么。",
      "我需要先整理信息，但信息太多。",
      "我需要先制定计划，可我连计划也不想做。"
    ],
    actions: ["写下任务一句话", "写下完成标准一句话", "打开最相关的文件"]
  },
  {
    id: "task-too-large",
    title: "任务太大，启动成本太高",
    icon: "⛰️",
    tone: "#9a7b3f",
    description: "一想到全部工作量，身体已经想撤退。",
    typical: ["任务看起来会花很久", "想等完整时间再做", "把开始当成必须完成"],
    options: [
      "我一想到全部工作量就想逃。",
      "我觉得这件事会花很久。",
      "我觉得一开始就会被卷进去。",
      "我担心做了五分钟也看不到进展。",
      "我想等有一大段完整时间再做。",
      "我觉得现在开始也做不完。",
      "我把“开始”等同于“必须完成”。",
      "我把“打开任务”等同于“马上进入高强度状态”。"
    ],
    actions: ["只打开任务材料", "计时做 2 分钟", "只写一个标题"]
  },
  {
    id: "fear-of-failure",
    title: "害怕失败",
    icon: "🌧️",
    tone: "#547fa7",
    description: "任务像是在检验能力，越想越紧。",
    typical: ["怕自己做不好", "怕努力后仍然没用", "怕暴露不足"],
    options: [
      "我怕自己做不好。",
      "我怕结果很差。",
      "我怕发现自己能力不够。",
      "我怕努力了也没用。",
      "我怕做出来之后很失望。",
      "我怕暴露自己的不足。",
      "我怕一开始就发现问题比想象中更严重。",
      "我怕已经太晚了。"
    ],
    actions: ["写 3 行粗草稿", "列出 1 个担心的问题", "只补一个小缺口"]
  },
  {
    id: "fear-of-judgment",
    title: "害怕评价",
    icon: "👀",
    tone: "#8b6ca8",
    description: "担心别人怎么看、怎么说、怎么改。",
    typical: ["怕被批评", "怕对方失望", "怕被比较"],
    options: [
      "我怕别人觉得我不专业。",
      "我怕被批评。",
      "我怕被否定。",
      "我怕对方失望。",
      "我怕别人看到我的进度很慢。",
      "我怕交出去后被要求重做。",
      "我怕别人发现我其实没准备好。",
      "我怕被比较。"
    ],
    actions: ["写一版不发送草稿", "只写事实部分", "标出一个可修改处"]
  },
  {
    id: "perfectionism",
    title: "完美主义",
    icon: "✨",
    tone: "#ad8429",
    description: "想等到更清楚、更漂亮、更有把握。",
    typical: ["想等想清楚再开始", "怕第一版粗糙", "一直优化工具资料"],
    options: [
      "我想等想清楚再开始。",
      "我想一开始就做得漂亮。",
      "我怕做出一个很粗糙的东西。",
      "我不想面对“第一版很烂”的感觉。",
      "我总觉得还需要更多准备。",
      "我觉得如果不能做好，就干脆先不做。",
      "我一直在找最佳方法。",
      "我一直在优化工具、环境、资料，却没有真正开始。"
    ],
    actions: ["写 3 行难看版本", "先放一个占位标题", "只改当前一处"]
  },
  {
    id: "uncomfortable-emotion",
    title: "情绪不舒服",
    icon: "🫧",
    tone: "#438ca5",
    description: "焦虑、烦躁、无聊、内疚让你想离开。",
    typical: ["在逃避焦虑", "在逃避无聊", "在逃避内疚"],
    options: [
      "我在逃避焦虑。",
      "我在逃避烦躁。",
      "我在逃避无聊。",
      "我在逃避压力。",
      "我在逃避内疚。",
      "我在逃避羞愧。",
      "我在逃避不确定感。",
      "我在逃避被卡住的感觉。",
      "我在逃避“我怎么又这样”的自责。",
      "我在逃避心里那种沉重感。"
    ],
    actions: ["呼吸三次后打开任务", "写下现在的感觉", "带着感觉做 2 分钟"]
  },
  {
    id: "low-energy",
    title: "身体和精力不足",
    icon: "🌙",
    tone: "#657780",
    description: "身体能量低，刷手机像休息却不恢复。",
    typical: ["太累了", "脑子转不动", "用刷手机假装休息"],
    options: [
      "我太累了。",
      "我睡眠不够。",
      "我脑子转不动。",
      "我身体不舒服。",
      "我饿了、渴了，或者坐太久了。",
      "我今天已经消耗太多。",
      "我需要休息，但我一直用刷手机假装休息。",
      "我没有恢复精力，只是在逃避任务。"
    ],
    actions: ["喝一杯水", "站起来活动 30 秒", "闭眼休息 2 分钟"]
  },
  {
    id: "instant-reward",
    title: "即时奖励太诱人",
    icon: "📱",
    tone: "#5d8c46",
    description: "手机、视频、游戏给出更快的轻松感。",
    typical: ["想先获得一点快乐", "被再看一下带走", "想要马上有反馈"],
    options: [
      "手机马上能让我轻松。",
      "视频、游戏、社交软件比任务舒服。",
      "我想先获得一点快乐。",
      "我想先逃进一个没有压力的地方。",
      "我想要马上有反馈。",
      "我想要马上觉得自己有掌控感。",
      "我不想进入慢、难、没有即时回报的任务。",
      "我被“再看一下”带走了。"
    ],
    actions: ["把手机放到远处", "关掉当前娱乐页面", "先做 2 分钟再休息"]
  },
  {
    id: "decision-load",
    title: "决策负担太重",
    icon: "⚖️",
    tone: "#758742",
    description: "选择本身带来压力，拖延变成暂时不选。",
    typical: ["不想做选择", "怕选错", "一直比较选项"],
    options: [
      "我不想做选择。",
      "我怕选错。",
      "我不知道哪个方案更好。",
      "我一直在比较选项。",
      "我怕做了决定就要承担后果。",
      "我想等信息更完整再决定。",
      "我在用拖延避免取舍。",
      "我在逃避“选了这个，就要放弃那个”的不舒服。"
    ],
    actions: ["写下两个选项", "圈出一个可逆选择", "先选默认方案"]
  },
  {
    id: "relationship-pressure",
    title: "人际压力",
    icon: "💬",
    tone: "#4f8c7d",
    description: "任务背后牵着消息、反馈、冲突或关系压力。",
    typical: ["不想回复某个人", "怕发生冲突", "怕解释进度"],
    options: [
      "我不想回复某个人。",
      "我怕对方不满意。",
      "我怕发生冲突。",
      "我怕提出需求。",
      "我怕拒绝别人。",
      "我怕承认自己还没做完。",
      "我怕解释进度。",
      "我怕别人催我。",
      "我怕这件事牵扯到关系压力。",
      "我不想面对某个群聊、邮件或会议。"
    ],
    actions: ["写一句回复草稿", "只发一个确认问题", "写下目前进展一句话"]
  },
  {
    id: "resistance",
    title: "反感、抵触、委屈",
    icon: "🌵",
    tone: "#986f4d",
    description: "心里有不愿意、被消耗、被安排的感觉。",
    typical: ["其实不想做这件事", "觉得被安排了", "用拖延表达不满"],
    options: [
      "我其实不想做这件事。",
      "我觉得这件事不该由我做。",
      "我觉得被安排了。",
      "我觉得没有选择权。",
      "我觉得这件事没有被公平对待。",
      "我对提出这个任务的人有情绪。",
      "我心里有抵触，所以行动变慢。",
      "我在用拖延表达不满。",
      "我觉得自己被消耗了。"
    ],
    actions: ["写下不愿意的点", "写下愿意做的一小步", "打开任务处理 2 分钟"]
  },
  {
    id: "low-meaning",
    title: "意义感不足",
    icon: "🕯️",
    tone: "#a17c32",
    description: "看不到价值、好处或与目标的关系。",
    typical: ["不知道为什么要做", "觉得做了也没人看", "看不到完成后的好处"],
    options: [
      "我不知道为什么要做。",
      "我觉得做了也没人看。",
      "我觉得这件事没有价值。",
      "我觉得它和我的目标没关系。",
      "我只是被要求完成。",
      "我看不到完成后的好处。",
      "我觉得这件事很机械。",
      "我没有内在动力。"
    ],
    actions: ["写下一个现实理由", "写下完成后的一个好处", "写下不做的一个代价"]
  },
  {
    id: "missing-resources",
    title: "信息、资源或条件不足",
    icon: "🧩",
    tone: "#357f79",
    description: "卡住点可能是缺资料、权限、工具或回复。",
    typical: ["缺资料或工具", "需要确认信息", "在逃避求助"],
    options: [
      "我缺资料。",
      "我缺工具。",
      "我缺权限。",
      "我缺一个人的回复。",
      "我需要确认信息。",
      "我不知道该问谁。",
      "我不知道哪里能找到答案。",
      "我卡住是因为条件没齐。",
      "我在逃避求助。",
      "我在逃避承认自己不知道。"
    ],
    actions: ["列出缺的 1 样东西", "发出一个确认问题", "搜索 1 个关键词"]
  },
  {
    id: "deadline-pressure",
    title: "时间压力和截止日期",
    icon: "⏳",
    tone: "#a06644",
    description: "越接近截止日期，越不想看现实进度。",
    typical: ["觉得已经来不及了", "怕看进度更焦虑", "想假装还有时间"],
    options: [
      "我觉得时间太少了。",
      "我觉得已经来不及了。",
      "我越接近截止日期越想逃。",
      "我怕一看进度就更焦虑。",
      "我不想面对剩余时间。",
      "我想假装还有时间。",
      "我在逃避重新安排计划。",
      "我怕现在开始会发现现实很糟。"
    ],
    actions: ["看一眼截止时间", "写下今天最小交付", "计时做 2 分钟"]
  },
  {
    id: "self-image-pressure",
    title: "自我形象压力",
    icon: "🪞",
    tone: "#7a6998",
    description: "任务结果被大脑解读成对自我的评价。",
    typical: ["不想面对自己又拖延了", "怕打击自信", "任务结果和自我价值绑在一起"],
    options: [
      "我不想面对“我又拖延了”。",
      "我怕承认自己没有自律。",
      "我怕发现自己没有想象中厉害。",
      "我怕这个任务打击我的自信。",
      "我把任务结果和自我价值绑在一起。",
      "我觉得如果做不好，就说明我不行。",
      "我不想看见自己的真实进度。",
      "我宁愿不开始，也不想面对落差。"
    ],
    actions: ["写下当前真实进度", "打开任务做 2 分钟", "记录一个已完成动作"]
  },
  {
    id: "attention-elsewhere",
    title: "注意力被别的事占住",
    icon: "🌀",
    tone: "#4f8ba0",
    description: "表面在拖延，实际心里还挂着别的事情。",
    typical: ["心里惦记另一件事", "刚刚被消息打断", "脑子里有很多未完成的事"],
    options: [
      "我心里惦记另一件事。",
      "我刚刚被消息打断了。",
      "我脑子里有很多未完成的事。",
      "我担心某个结果。",
      "我还在回想刚才的对话。",
      "我情绪还没从上一件事里出来。",
      "我表面在拖延，实际是注意力太分散。",
      "我需要先把脑子里的杂事倒出来。"
    ],
    actions: ["写下惦记的事", "放进稍后清单", "回到当前文件 2 分钟"]
  }
];

window.AVOIDANCE_GROUPS = [
  {
    id: "clarity",
    title: "任务不清",
    icon: "🧭",
    tone: "#397f78",
    description: "入口、条件或取舍还没有清楚。",
    categoryIds: ["task-unclear", "missing-resources", "decision-load"]
  },
  {
    id: "load",
    title: "压力太重",
    icon: "⏱️",
    tone: "#8f7440",
    description: "工作量、截止日期或身体能量让你想退开。",
    categoryIds: ["task-too-large", "deadline-pressure", "low-energy"]
  },
  {
    id: "outcome",
    title: "害怕结果",
    icon: "🎯",
    tone: "#7563a0",
    description: "担心失败、评价、粗糙版本或自我落差。",
    categoryIds: ["fear-of-failure", "fear-of-judgment", "perfectionism", "self-image-pressure"]
  },
  {
    id: "mood",
    title: "情绪动机",
    icon: "🪫",
    tone: "#3f8298",
    description: "情绪不舒服、即时奖励或意义感不足。",
    categoryIds: ["uncomfortable-emotion", "instant-reward", "low-meaning"]
  },
  {
    id: "external",
    title: "外部牵扯",
    icon: "🔗",
    tone: "#7d7f3d",
    description: "关系压力、抵触感或别的事情占住注意力。",
    categoryIds: ["relationship-pressure", "resistance", "attention-elsewhere"]
  }
];

window.AVOIDANCE_QUICK_STATES = [
  {
    id: "dont-know-start",
    label: "不知道怎么开始",
    description: "先从入口、条件或选择里找一个卡点。",
    tone: "#397f78",
    categoryIds: ["task-unclear", "missing-resources", "decision-load"]
  },
  {
    id: "feels-too-tiring",
    label: "一想到就累",
    description: "先把工作量、时间压力或身体能量拆小。",
    tone: "#8f7440",
    categoryIds: ["task-too-large", "deadline-pressure", "low-energy"]
  },
  {
    id: "afraid-bad-result",
    label: "怕做不好",
    description: "先把失败、评价和粗糙版本分开看。",
    tone: "#7563a0",
    categoryIds: ["fear-of-failure", "fear-of-judgment", "perfectionism", "self-image-pressure"]
  },
  {
    id: "avoid-people",
    label: "不想面对人",
    description: "先处理回复、评价或关系里的压力。",
    tone: "#4f8c7d",
    categoryIds: ["relationship-pressure", "fear-of-judgment", "resistance"]
  },
  {
    id: "want-comfort-now",
    label: "只想舒服一下",
    description: "先承认想逃开的感觉，再接一个小动作。",
    tone: "#3f8298",
    categoryIds: ["instant-reward", "uncomfortable-emotion", "low-energy"]
  },
  {
    id: "inner-resistance",
    label: "心里很抵触",
    description: "先看见不愿意、没意义或分心的部分。",
    tone: "#7d7f3d",
    categoryIds: ["resistance", "low-meaning", "attention-elsewhere"]
  }
];
