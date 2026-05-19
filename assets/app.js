(function () {
  const categories = window.AVOIDANCE_CATEGORIES;
  const defaultOption = "先选一个最像的答案";
  const defaultAction = "一个小动作";

  const state = {
    query: "",
    activeId: categories[0].id,
    selectedOption: defaultOption,
    selectedAction: defaultAction
  };

  const elements = {
    search: document.getElementById("search"),
    categoryMeta: document.getElementById("categoryMeta"),
    categoryList: document.getElementById("categoryList"),
    emptyState: document.getElementById("emptyState"),
    detailCard: document.getElementById("detailCard"),
    detailIcon: document.getElementById("detailIcon"),
    detailTitle: document.getElementById("detailTitle"),
    detailDescription: document.getElementById("detailDescription"),
    typicalList: document.getElementById("typicalList"),
    optionMeta: document.getElementById("optionMeta"),
    optionList: document.getElementById("optionList"),
    actionList: document.getElementById("actionList"),
    selectedOption: document.getElementById("selectedOption"),
    selectedAction: document.getElementById("selectedAction"),
    copyLine: document.getElementById("copyLine"),
    copyHint: document.getElementById("copyHint"),
    printList: document.getElementById("printList")
  };

  function escapeHtml(text) {
    return String(text).replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;"
    }[character]));
  }

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function normalize(text) {
    return String(text).trim().toLowerCase();
  }

  function stripStop(text) {
    return text.replace(/。$/, "");
  }

  function includesQuery(text, query) {
    return normalize(text).includes(query);
  }

  function categoryText(category) {
    return [
      category.title,
      category.description,
      ...category.typical,
      ...category.options,
      ...category.actions
    ].join(" ");
  }

  function highlight(text) {
    if (!state.query) {
      return escapeHtml(text);
    }

    const pattern = new RegExp(`(${escapeRegExp(state.query)})`, "gi");
    return String(text)
      .split(pattern)
      .map((part) => (normalize(part) === state.query ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
      .join("");
  }

  function getVisibleCategories() {
    if (!state.query) {
      return categories;
    }

    return categories.filter((category) => includesQuery(categoryText(category), state.query));
  }

  function getVisibleOptions(category) {
    if (!state.query) {
      return category.options;
    }

    return category.options.filter((option) => includesQuery(option, state.query));
  }

  function setActiveCategory(id) {
    state.activeId = id;
    elements.copyHint.textContent = "";
    render();
  }

  function setSelectedOption(option, category) {
    state.selectedOption = stripStop(option);
    state.selectedAction = category.actions[0] || defaultAction;
    elements.copyHint.textContent = "";
    render();
  }

  function setSelectedAction(action) {
    state.selectedAction = action;
    elements.copyHint.textContent = "";
    render();
  }

  function renderSummary() {
    elements.selectedOption.textContent = state.selectedOption;
    elements.selectedAction.textContent = state.selectedAction;
  }

  function renderCategoryList(visibleCategories) {
    const total = categories.length;
    elements.categoryMeta.textContent = state.query
      ? `显示 ${visibleCategories.length} / ${total} 类`
      : `共 ${total} 类`;

    elements.categoryList.innerHTML = visibleCategories.map((category) => `
      <button
        class="category-item${category.id === state.activeId ? " is-active" : ""}"
        type="button"
        data-id="${escapeHtml(category.id)}"
        style="--category-color:${escapeHtml(category.tone)}"
        aria-current="${category.id === state.activeId ? "true" : "false"}"
      >
        <span class="category-icon" aria-hidden="true">${category.icon}</span>
        <span class="category-copy">
          <span class="category-title">${highlight(category.title)}</span>
          <span class="category-description">${highlight(category.description)}</span>
        </span>
      </button>
    `).join("");
  }

  function renderTypical(category) {
    elements.typicalList.innerHTML = category.typical
      .map((item) => `<span class="tag">${highlight(item)}</span>`)
      .join("");
  }

  function renderOptions(category) {
    const visibleOptions = getVisibleOptions(category);
    elements.optionMeta.textContent = state.query
      ? `${visibleOptions.length} / ${category.options.length}`
      : `${category.options.length} 项`;

    if (!visibleOptions.length) {
      elements.optionList.innerHTML = "<li class=\"no-options\">当前分类里没有匹配的完整选项。</li>";
      return;
    }

    elements.optionList.innerHTML = visibleOptions.map((option) => {
      const selected = stripStop(option) === state.selectedOption;
      return `
        <li>
          <button
            class="option-choice${selected ? " is-selected" : ""}"
            type="button"
            data-option="${escapeHtml(option)}"
          >
            ${highlight(option)}
          </button>
        </li>
      `;
    }).join("");
  }

  function renderActions(category) {
    elements.actionList.innerHTML = category.actions.map((action) => `
      <button
        class="action-choice${action === state.selectedAction ? " is-selected" : ""}"
        type="button"
        data-action="${escapeHtml(action)}"
      >
        ${highlight(action)}
      </button>
    `).join("");
  }

  function renderPrintList() {
    elements.printList.innerHTML = categories.map((category) => `
      <article class="print-category">
        <h2>${escapeHtml(category.title)}</h2>
        <p>${escapeHtml(category.description)}</p>
        <h3>完整选项</h3>
        <ul>
          ${category.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("")}
        </ul>
        <h3>下一步小动作</h3>
        <p>${category.actions.map((action) => escapeHtml(action)).join(" / ")}</p>
      </article>
    `).join("");
  }

  function renderDetail(visibleCategories) {
    const activeCategory = categories.find((category) => category.id === state.activeId);
    const hasResults = visibleCategories.length > 0 && activeCategory;

    elements.emptyState.hidden = hasResults;
    elements.detailCard.hidden = !hasResults;

    if (!hasResults) {
      return;
    }

    elements.detailCard.style.setProperty("--category-color", activeCategory.tone);
    elements.detailIcon.textContent = activeCategory.icon;
    elements.detailTitle.innerHTML = highlight(activeCategory.title);
    elements.detailDescription.innerHTML = highlight(activeCategory.description);

    renderTypical(activeCategory);
    renderOptions(activeCategory);
    renderActions(activeCategory);
  }

  function render() {
    const visibleCategories = getVisibleCategories();

    if (!visibleCategories.some((category) => category.id === state.activeId)) {
      state.activeId = visibleCategories[0] ? visibleCategories[0].id : null;
    }

    renderSummary();
    renderCategoryList(visibleCategories);
    renderDetail(visibleCategories);
  }

  function currentLine() {
    return `我现在可能在逃避：${state.selectedOption}；我接下来只做：${state.selectedAction}。`;
  }

  elements.search.addEventListener("input", (event) => {
    state.query = normalize(event.target.value);
    elements.copyHint.textContent = "";
    render();
  });

  elements.categoryList.addEventListener("click", (event) => {
    const button = event.target.closest(".category-item");
    if (!button) {
      return;
    }

    setActiveCategory(button.dataset.id);
  });

  elements.optionList.addEventListener("click", (event) => {
    const button = event.target.closest(".option-choice");
    if (!button) {
      return;
    }

    const category = categories.find((item) => item.id === state.activeId);
    setSelectedOption(button.dataset.option, category);
  });

  elements.actionList.addEventListener("click", (event) => {
    const button = event.target.closest(".action-choice");
    if (!button) {
      return;
    }

    setSelectedAction(button.dataset.action);
  });

  elements.copyLine.addEventListener("click", async () => {
    const line = currentLine();

    try {
      await navigator.clipboard.writeText(line);
      elements.copyHint.textContent = "已复制";
    } catch (error) {
      window.alert(line);
      elements.copyHint.textContent = "";
    }
  });

  renderPrintList();
  render();
}());
