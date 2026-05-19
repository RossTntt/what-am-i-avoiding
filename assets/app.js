(function () {
  const categories = window.AVOIDANCE_CATEGORIES;
  const groups = window.AVOIDANCE_GROUPS;
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const defaultOption = "先选一个最像的答案";
  const defaultAction = "一个小动作";

  const state = {
    query: "",
    activeGroupId: groups[0].id,
    activeCategoryId: groups[0].categoryIds[0],
    draftOption: null,
    draftAction: null,
    selectedOption: defaultOption,
    selectedAction: defaultAction
  };

  const elements = {
    search: document.getElementById("search"),
    groupMeta: document.getElementById("groupMeta"),
    groupList: document.getElementById("groupList"),
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
    draftLine: document.getElementById("draftLine"),
    confirmLine: document.getElementById("confirmLine"),
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

  function groupCategories(group) {
    return group.categoryIds
      .map((id) => categoryById.get(id))
      .filter(Boolean);
  }

  function groupOwnText(group) {
    return [
      group.title,
      group.description
    ].join(" ");
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

  function groupText(group) {
    return [
      groupOwnText(group),
      ...groupCategories(group).map(categoryText)
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

  function clearDraft() {
    state.draftOption = null;
    state.draftAction = null;
    elements.copyHint.textContent = "";
  }

  function getVisibleGroups() {
    if (!state.query) {
      return groups;
    }

    return groups.filter((group) => includesQuery(groupText(group), state.query));
  }

  function getVisibleCategories(group) {
    if (!group) {
      return [];
    }

    const groupCategoriesList = groupCategories(group);

    if (!state.query || includesQuery(groupOwnText(group), state.query)) {
      return groupCategoriesList;
    }

    return groupCategoriesList.filter((category) => includesQuery(categoryText(category), state.query));
  }

  function getVisibleOptions(category, group) {
    if (!state.query) {
      return category.options;
    }

    const categoryIdentityText = [
      category.title,
      category.description,
      ...category.typical
    ].join(" ");

    if (includesQuery(groupOwnText(group), state.query) || includesQuery(categoryIdentityText, state.query)) {
      return category.options;
    }

    return category.options.filter((option) => includesQuery(option, state.query));
  }

  function findActiveGroup(visibleGroups) {
    return visibleGroups.find((group) => group.id === state.activeGroupId) || null;
  }

  function findActiveCategory(visibleCategories) {
    return visibleCategories.find((category) => category.id === state.activeCategoryId) || null;
  }

  function setActiveGroup(id) {
    const group = groups.find((item) => item.id === id);
    const firstCategory = getVisibleCategories(group)[0] || groupCategories(group)[0] || null;

    state.activeGroupId = id;
    state.activeCategoryId = firstCategory ? firstCategory.id : null;
    clearDraft();
    render();
  }

  function setActiveCategory(id) {
    state.activeCategoryId = id;
    clearDraft();
    render();
  }

  function setDraftOption(option) {
    state.draftOption = stripStop(option);
    elements.copyHint.textContent = "";
    render();
  }

  function setDraftAction(action) {
    state.draftAction = action;
    elements.copyHint.textContent = "";
    render();
  }

  function renderSummary() {
    elements.selectedOption.textContent = state.selectedOption;
    elements.selectedAction.textContent = state.selectedAction;
  }

  function renderGroupList(visibleGroups) {
    const total = groups.length;
    elements.groupMeta.textContent = state.query
      ? `显示 ${visibleGroups.length} / ${total} 组`
      : `共 ${total} 组`;

    elements.groupList.innerHTML = visibleGroups.map((group) => `
      <button
        class="group-item${group.id === state.activeGroupId ? " is-active" : ""}"
        type="button"
        data-id="${escapeHtml(group.id)}"
        style="--category-color:${escapeHtml(group.tone)}"
        aria-current="${group.id === state.activeGroupId ? "true" : "false"}"
      >
        <span class="group-icon" aria-hidden="true">${group.icon}</span>
        <span class="group-copy">
          <span class="group-title">${highlight(group.title)}</span>
          <span class="group-description">${highlight(group.description)}</span>
        </span>
      </button>
    `).join("");
  }

  function renderCategoryList(visibleCategories, activeGroup) {
    const total = activeGroup ? groupCategories(activeGroup).length : categories.length;
    elements.categoryMeta.textContent = state.query
      ? `显示 ${visibleCategories.length} / ${total} 类`
      : `本组 ${visibleCategories.length} 类`;

    elements.categoryList.innerHTML = visibleCategories.map((category) => `
      <button
        class="category-item${category.id === state.activeCategoryId ? " is-active" : ""}"
        type="button"
        data-id="${escapeHtml(category.id)}"
        style="--category-color:${escapeHtml(category.tone)}"
        aria-current="${category.id === state.activeCategoryId ? "true" : "false"}"
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

  function renderOptions(category, group) {
    const visibleOptions = getVisibleOptions(category, group);
    elements.optionMeta.textContent = state.query
      ? `${visibleOptions.length} / ${category.options.length}`
      : `${category.options.length} 项`;

    if (!visibleOptions.length) {
      elements.optionList.innerHTML = "<li class=\"no-options\">当前分类里没有匹配的完整选项。</li>";
      return;
    }

    elements.optionList.innerHTML = visibleOptions.map((option) => {
      const selected = stripStop(option) === state.draftOption;
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
        class="action-choice${action === state.draftAction ? " is-selected" : ""}"
        type="button"
        data-action="${escapeHtml(action)}"
      >
        ${highlight(action)}
      </button>
    `).join("");
  }

  function renderDraft() {
    const hasCompleteDraft = Boolean(state.draftOption && state.draftAction);
    const alreadyConfirmed = hasCompleteDraft
      && state.draftOption === state.selectedOption
      && state.draftAction === state.selectedAction;

    if (hasCompleteDraft) {
      elements.draftLine.textContent = currentDraftLine();
    } else if (state.draftOption) {
      elements.draftLine.textContent = `我现在可能在逃避：${state.draftOption}；我接下来只做：先选择一个小动作。`;
    } else if (state.draftAction) {
      elements.draftLine.textContent = `先选择完整选项；已选小动作：${state.draftAction}。`;
    } else {
      elements.draftLine.textContent = "先选择完整选项和下一步小动作。";
    }

    elements.confirmLine.disabled = !hasCompleteDraft || alreadyConfirmed;
  }

  function renderPrintList() {
    elements.printList.innerHTML = groups.map((group) => `
      <section class="print-group">
        <h2>${escapeHtml(group.title)}</h2>
        <p>${escapeHtml(group.description)}</p>
        ${groupCategories(group).map((category) => `
          <article class="print-category">
            <h3>${escapeHtml(category.title)}</h3>
            <p>${escapeHtml(category.description)}</p>
            <h4>完整选项</h4>
            <ul>
              ${category.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("")}
            </ul>
            <h4>下一步小动作</h4>
            <p>${category.actions.map((action) => escapeHtml(action)).join(" / ")}</p>
          </article>
        `).join("")}
      </section>
    `).join("");
  }

  function renderDetail(activeGroup, visibleCategories) {
    const activeCategory = findActiveCategory(visibleCategories);
    const hasResults = Boolean(activeGroup && activeCategory);

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
    renderOptions(activeCategory, activeGroup);
    renderActions(activeCategory);
    renderDraft();
  }

  function render() {
    const visibleGroups = getVisibleGroups();
    let activeGroup = findActiveGroup(visibleGroups);

    if (!activeGroup) {
      state.activeGroupId = visibleGroups[0] ? visibleGroups[0].id : null;
      activeGroup = visibleGroups[0] || null;
      clearDraft();
    }

    const visibleCategories = getVisibleCategories(activeGroup);
    let activeCategory = findActiveCategory(visibleCategories);

    if (!activeCategory) {
      state.activeCategoryId = visibleCategories[0] ? visibleCategories[0].id : null;
      activeCategory = visibleCategories[0] || null;
      clearDraft();
    }

    renderSummary();
    renderGroupList(visibleGroups);
    renderCategoryList(visibleCategories, activeGroup);
    renderDetail(activeGroup, visibleCategories);
  }

  function currentDraftLine() {
    return `我现在可能在逃避：${state.draftOption}；我接下来只做：${state.draftAction}。`;
  }

  function currentLine() {
    return `我现在可能在逃避：${state.selectedOption}；我接下来只做：${state.selectedAction}。`;
  }

  elements.search.addEventListener("input", (event) => {
    state.query = normalize(event.target.value);
    clearDraft();
    render();
  });

  elements.groupList.addEventListener("click", (event) => {
    const button = event.target.closest(".group-item");
    if (!button) {
      return;
    }

    setActiveGroup(button.dataset.id);
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

    setDraftOption(button.dataset.option);
  });

  elements.actionList.addEventListener("click", (event) => {
    const button = event.target.closest(".action-choice");
    if (!button) {
      return;
    }

    setDraftAction(button.dataset.action);
  });

  elements.confirmLine.addEventListener("click", () => {
    if (!state.draftOption || !state.draftAction) {
      return;
    }

    state.selectedOption = state.draftOption;
    state.selectedAction = state.draftAction;
    elements.copyHint.textContent = "已填入";
    render();
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
