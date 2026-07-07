const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "InlineDoc-Nav",

	DefaultRenderable: "InlineDoc-Nav-Display",
	DefaultContentDestinationAddress: "#InlineDoc-Nav-Container",

	AutoRender: false,

	CSS: /*css*/`
		.pict-inline-doc-nav {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
		.pict-inline-doc-nav-collapsed-header {
			display: flex;
			align-items: center;
			padding: 0.5em 0.8em;
			cursor: pointer;
			border-bottom: 1px solid var(--theme-color-border-light, #EAE3D8);
			background: var(--theme-color-background-secondary, #F7F5F0);
			user-select: none;
		}
		.pict-inline-doc-nav-collapsed-header:hover {
			background: var(--theme-color-background-tertiary, #EDE8DF);
		}
		.pict-inline-doc-nav-chevron {
			font-size: 0.6em;
			transition: transform 0.2s ease;
			color: var(--theme-color-text-muted, #8A7F72);
			display: inline-flex;
			align-items: center;
			margin-right: 0.5em;
		}
		.pict-inline-doc-nav-chevron.expanded {
			transform: rotate(90deg);
		}
		.pict-inline-doc-nav-current-title {
			font-size: 0.9em;
			font-weight: 500;
			color: var(--theme-color-text-primary, #3D3229);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			flex: 1;
		}
		.pict-inline-doc-nav-outline {
			display: none;
			overflow-y: auto;
		}
		.pict-inline-doc-nav-outline.expanded {
			display: block;
		}
		.pict-inline-doc-nav-filter {
			padding: 0.3em 0.6em;
			border-bottom: 1px solid var(--theme-color-border-light, #EAE3D8);
		}
		.pict-inline-doc-nav-filter input {
			width: 100%;
			box-sizing: border-box;
			padding: 0.3em 0.5em;
			border: 1px solid var(--theme-color-border-default, #DDD6CA);
			border-radius: 3px;
			font-size: 0.85em;
			outline: none;
		}
		.pict-inline-doc-nav-filter input:focus {
			border-color: var(--theme-color-brand-primary, #2E7D74);
		}
		.pict-inline-doc-nav-group {
			margin-bottom: 0;
		}
		.pict-inline-doc-nav-group-header {
			display: flex;
			align-items: center;
			padding: 0.4em 0.8em;
			font-weight: 600;
			font-size: 0.7em;
			color: var(--theme-color-text-secondary, #5E5549);
			text-transform: uppercase;
			letter-spacing: 0.03em;
			cursor: pointer;
			user-select: none;
		}
		.pict-inline-doc-nav-group-header:hover {
			color: var(--theme-color-text-primary, #3D3229);
			background: var(--theme-color-background-tertiary, #F0ECE4);
		}
		.pict-inline-doc-nav-group-toggle {
			margin-right: 0.35em;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 0.85em;
			height: 0.85em;
			color: currentColor;
			transition: transform 0.15s ease;
		}
		.pict-inline-doc-nav-group-toggle svg {
			width: 100%;
			height: 100%;
			display: block;
		}
		.pict-inline-doc-nav-group-toggle.collapsed {
			transform: rotate(-90deg);
		}
		.pict-inline-doc-nav-group.collapsed .pict-inline-doc-nav-group-items {
			display: none;
		}
		.pict-inline-doc-nav-item {
			display: block;
			padding: 0.25em 0.8em 0.25em calc(1.6em + var(--doc-nav-level, 0) * 0.85em);
			color: var(--theme-color-text-secondary, #5E5549);
			text-decoration: none;
			font-size: 0.85em;
			cursor: pointer;
			border-left: 3px solid transparent;
			transition: background 0.1s ease, border-color 0.1s ease;
		}
		.pict-inline-doc-nav-item:hover {
			background: var(--theme-color-background-tertiary, #EDE8DF);
		}
		.pict-inline-doc-nav-folder {
			font-weight: 600;
			color: var(--theme-color-text-primary, #3D3229);
		}
		.pict-inline-doc-nav-folder-icon {
			margin-right: 0.4em;
			vertical-align: -0.12em;
			opacity: 0.65;
		}
		.pict-inline-doc-nav-file-icon {
			margin-right: 0.4em;
			vertical-align: -0.12em;
			opacity: 0.55;
		}
		.pict-inline-doc-nav-section-dot {
			margin-right: 0.4em;
			vertical-align: -0.12em;
			opacity: 0.3;
		}
		.pict-inline-doc-nav-item.active {
			background: var(--theme-color-background-hover, #E8E3D8);
			color: var(--theme-color-brand-primary, #2E7D74);
			border-left-color: var(--theme-color-brand-primary, #2E7D74);
			font-weight: 500;
		}
		.pict-inline-doc-nav-heading {
			display: block;
			padding: 0.15em 0.8em 0.15em calc(2.4em + var(--doc-nav-level, 0) * 0.85em);
			color: var(--theme-color-text-muted, #8A7F72);
			font-size: 0.78em;
			cursor: pointer;
			border-left: 3px solid transparent;
			transition: background 0.1s ease, color 0.1s ease;
		}
		.pict-inline-doc-nav-heading:hover {
			background: var(--theme-color-background-tertiary, #EDE8DF);
			color: var(--theme-color-text-secondary, #5E5549);
		}
		.pict-inline-doc-nav-heading.h3 {
			padding-left: calc(3.2em + var(--doc-nav-level, 0) * 0.85em);
			font-size: 0.72em;
		}
		/* Search icon in collapsed header */
		.pict-inline-doc-nav-search-icon {
			display: inline-flex;
			align-items: center;
			color: var(--theme-color-text-muted, #8A7F72);
			opacity: 0.5;
			transition: opacity 0.2s;
			flex-shrink: 0;
			margin-left: 0.3em;
		}
		.pict-inline-doc-nav-search-icon:hover {
			opacity: 1;
			color: var(--theme-color-brand-primary, #2E7D74);
		}
		/* Search results section */
		.pict-inline-doc-nav-search-results {
			border-bottom: 1px solid var(--theme-color-border-light, #EAE3D8);
			padding: 0.3em 0;
		}
		.pict-inline-doc-nav-search-status {
			padding: 0.2em 0.8em;
			font-size: 0.7em;
			color: var(--theme-color-text-muted, #8A7F72);
			text-transform: uppercase;
			letter-spacing: 0.03em;
		}
		.pict-inline-doc-nav-search-result {
			display: flex;
			align-items: baseline;
			padding: 0.25em 0.8em 0.25em 1.2em;
			cursor: pointer;
			font-size: 0.82em;
			color: var(--theme-color-text-primary, #3D3229);
			text-decoration: none;
			transition: background 0.1s ease;
			gap: 0.5em;
		}
		.pict-inline-doc-nav-search-result:hover {
			background: var(--theme-color-background-tertiary, #EDE8DF);
		}
		.pict-inline-doc-nav-search-result-title {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.pict-inline-doc-nav-search-result-group {
			font-size: 0.75em;
			color: var(--theme-color-text-muted, #8A7F72);
			white-space: nowrap;
		}
		/* External link indicator */
		.pict-inline-doc-nav-item-external {
			color: var(--theme-color-text-muted, #8A7F72);
		}
		.pict-inline-doc-nav-item-external:hover {
			color: var(--theme-color-brand-primary, #2E7D74);
		}
		.pict-inline-doc-nav-external-icon {
			display: inline;
			margin-left: 0.3em;
			opacity: 0.5;
			vertical-align: -0.05em;
		}
		.pict-inline-doc-nav-topic-badge {
			display: inline-block;
			margin: 0.5em 1em;
			padding: 0.3em 0.7em;
			background: var(--theme-color-brand-primary, #2E7D74);
			color: var(--theme-color-text-on-brand, #fff);
			border-radius: 4px;
			font-size: 0.8em;
			font-weight: 500;
		}
		.pict-inline-doc-nav-topic-clear {
			margin-left: 0.5em;
			cursor: pointer;
			opacity: 0.8;
		}
		.pict-inline-doc-nav-topic-clear:hover {
			opacity: 1;
		}
		.pict-inline-doc-nav-toolbar {
			display: flex;
			align-items: center;
			gap: 0.3em;
			padding: 0.3em 1em;
			border-bottom: 1px solid var(--theme-color-border-light, #EAE3D8);
		}
		.pict-inline-doc-nav-toolbar-btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 28px;
			height: 28px;
			border: 1px solid var(--theme-color-border-default, #DDD6CA);
			border-radius: 3px;
			background: var(--theme-color-background-panel,    #fff);
			color: var(--theme-color-text-secondary, #5E5549);
			font-size: 0.9em;
			cursor: pointer;
			transition: background 0.1s, border-color 0.1s;
		}
		.pict-inline-doc-nav-toolbar-btn:hover {
			background: var(--theme-color-background-tertiary, #F0ECE4);
			border-color: var(--theme-color-border-default, #C4BDB3);
		}
		.pict-inline-doc-nav-toolbar-btn.accent {
			border-color: var(--theme-color-brand-primary, #2E7D74);
			color: var(--theme-color-brand-primary, #2E7D74);
		}
		.pict-inline-doc-nav-toolbar-btn.accent:hover {
			background: var(--theme-color-background-hover, #F0F9F7);
		}
		.pict-inline-doc-nav-toolbar-btn.active {
			background: var(--theme-color-brand-primary, #2E7D74);
			color: var(--theme-color-text-on-brand, #fff);
			border-color: var(--theme-color-brand-primary, #2E7D74);
		}
		.pict-inline-doc-nav-toolbar-btn.active:hover {
			background: var(--theme-color-brand-primary-hover, #266D65);
		}
		.pict-inline-doc-nav-toolbar-spacer {
			flex: 1;
		}
		/* Structure management: per-node hover actions (rename / delete) */
		.pict-inline-doc-nav-item,
		.pict-inline-doc-nav-group-header {
			position: relative;
		}
		.pict-inline-doc-nav-node-actions {
			position: absolute;
			right: 0.35em;
			top: 50%;
			transform: translateY(-50%);
			display: none;
			align-items: center;
			gap: 0.1em;
		}
		.pict-inline-doc-nav-item:hover > .pict-inline-doc-nav-node-actions,
		.pict-inline-doc-nav-group-header:hover > .pict-inline-doc-nav-node-actions {
			display: inline-flex;
		}
		.pict-inline-doc-nav-node-action {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 1.4em;
			height: 1.4em;
			border-radius: 3px;
			color: var(--theme-color-text-muted, #8A7F72);
			background: var(--theme-color-background-panel, #fff);
			cursor: pointer;
			opacity: 0.85;
		}
		.pict-inline-doc-nav-node-action:hover {
			background: var(--theme-color-background-tertiary, #EDE8DF);
			color: var(--theme-color-text-primary, #3D3229);
			opacity: 1;
		}
		.pict-inline-doc-nav-node-action.danger:hover {
			color: var(--theme-color-status-error, #B3261E);
		}
		/* Drag-and-drop reorder / move affordances */
		.pict-inline-doc-nav-item[draggable="true"],
		.pict-inline-doc-nav-group-header[draggable="true"] {
			cursor: grab;
		}
		.pict-inline-doc-nav-dragging {
			opacity: 0.45;
		}
		.pict-inline-doc-nav-drop-into {
			background: var(--theme-color-background-hover, #E8E3D8) !important;
			outline: 1px dashed var(--theme-color-brand-primary, #2E7D74);
			outline-offset: -1px;
		}
		.pict-inline-doc-nav-drop-before {
			box-shadow: inset 0 2px 0 0 var(--theme-color-brand-primary, #2E7D74);
		}
		.pict-inline-doc-nav-drop-after {
			box-shadow: inset 0 -2px 0 0 var(--theme-color-brand-primary, #2E7D74);
		}
	`,

	Templates:
	[
		{
			Hash: "InlineDoc-Nav-Template",
			Template: /*html*/`<div class="pict-inline-doc-nav" id="InlineDoc-Nav-Body"></div>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "InlineDoc-Nav-Display",
			TemplateHash: "InlineDoc-Nav-Template",
			ContentDestinationAddress: "#InlineDoc-Nav-Container",
			RenderMethod: "replace"
		}
	]
};

class InlineDocumentationNavView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender()
	{
		this._renderNavigation();
		return super.onAfterRender();
	}

	/**
	 * Build and inject the navigation HTML into the nav body.
	 */
	_renderNavigation()
	{
		if (typeof document === 'undefined')
		{
			return;
		}

		let tmpContainer = document.getElementById('InlineDoc-Nav-Body');
		if (!tmpContainer)
		{
			return;
		}

		let tmpState = this.pict.AppData.InlineDocumentation;
		if (!tmpState)
		{
			return;
		}

		let tmpProvider = this.pict.providers['Pict-InlineDocumentation'];
		let tmpHeadings = [];
		if (tmpProvider && typeof tmpProvider._extractHeadings === 'function')
		{
			tmpHeadings = tmpProvider._extractHeadings();
		}

		let tmpCurrentPath = tmpState.CurrentPath || '';
		let tmpIsCollapsed = tmpState.NavCollapsed !== false;
		let tmpFilterText = tmpState.NavFilterText || '';
		let tmpCurrentDocName = this._resolveCurrentDocName(tmpState, tmpCurrentPath);

		// Reflect the collapsed state on the nav CONTAINER (the layout owns its
		// width). Collapsing then shrinks the whole panel to a thin strip and hands
		// the freed width back to the content, instead of hiding the outline while
		// the container stays full-width.
		let tmpNavContainer = document.getElementById('InlineDoc-Nav-Container');
		if (tmpNavContainer)
		{
			tmpNavContainer.classList.toggle('pict-inline-doc-nav-collapsed', tmpIsCollapsed);
		}

		let tmpHTML = '';

		let tmpSearchQuery = tmpState.SearchQuery || '';
		let tmpSearchResults = tmpState.SearchResults || [];

		// 1. Collapsed header with search icon
		let tmpChevronClass = 'pict-inline-doc-nav-chevron' + (tmpIsCollapsed ? '' : ' expanded');
		tmpHTML += '<div class="pict-inline-doc-nav-collapsed-header">';
		tmpHTML += '<span class="' + tmpChevronClass + '" id="InlineDoc-Nav-CollapseToggle">';
		tmpHTML += '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,3 11,8 6,13"/></svg>';
		tmpHTML += '</span>';
		tmpHTML += '<span class="pict-inline-doc-nav-current-title" id="InlineDoc-Nav-TitleToggle">' + this._escapeHTML(tmpCurrentDocName) + '</span>';
		tmpHTML += '<span class="pict-inline-doc-nav-search-icon" id="InlineDoc-Nav-SearchBtn" title="Search documentation">';
		tmpHTML += '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg>';
		tmpHTML += '</span>';
		tmpHTML += '</div>';

		// 2. Outline body
		let tmpOutlineClass = 'pict-inline-doc-nav-outline' + (tmpIsCollapsed ? '' : ' expanded');
		tmpHTML += '<div class="' + tmpOutlineClass + '" id="InlineDoc-Nav-Outline">';

		// Search / filter input
		let tmpPlaceholder = tmpState.SearchIndexLoaded ? 'Search documentation...' : 'Filter...';
		tmpHTML += '<div class="pict-inline-doc-nav-filter">';
		tmpHTML += '<input type="text" id="InlineDoc-Nav-FilterInput" placeholder="' + tmpPlaceholder + '" value="' + this._escapeHTML(tmpSearchQuery || tmpFilterText) + '" />';
		tmpHTML += '</div>';

		// Search results (when full-text search is active)
		if (tmpSearchResults.length > 0 && tmpSearchQuery)
		{
			tmpHTML += '<div class="pict-inline-doc-nav-search-results">';
			tmpHTML += '<div class="pict-inline-doc-nav-search-status">' + tmpSearchResults.length + ' result' + (tmpSearchResults.length !== 1 ? 's' : '') + '</div>';
			for (let i = 0; i < tmpSearchResults.length && i < 15; i++)
			{
				let tmpResult = tmpSearchResults[i];
				tmpHTML += '<a class="pict-inline-doc-nav-search-result" data-search-path="' + this._escapeHTML(tmpResult.DocPath) + '">';
				tmpHTML += '<span class="pict-inline-doc-nav-search-result-title">' + this._escapeHTML(tmpResult.Title) + '</span>';
				if (tmpResult.Group)
				{
					tmpHTML += '<span class="pict-inline-doc-nav-search-result-group">' + this._escapeHTML(tmpResult.Group) + '</span>';
				}
				tmpHTML += '</a>';
			}
			tmpHTML += '</div>';
		}

		// Topic badge
		tmpHTML += this._renderTopicBadge(tmpState);

		// Toolbar
		tmpHTML += this._renderToolbar(tmpState);

		// Group tree
		tmpHTML += this._renderGroupTree(tmpState, tmpCurrentPath, tmpHeadings, tmpFilterText);

		tmpHTML += '</div>';

		tmpContainer.innerHTML = tmpHTML;

		// Wire up click handlers
		this._wireClickHandlers(tmpContainer);
	}

	/**
	 * Resolve the display name for the currently loaded document.
	 *
	 * Searches SidebarGroups for a matching item name; falls back to the path.
	 *
	 * @param {object} pState - The InlineDocumentation state
	 * @param {string} pCurrentPath - The current document path
	 * @returns {string} The resolved document name
	 */
	_resolveCurrentDocName(pState, pCurrentPath)
	{
		if (!pCurrentPath)
		{
			return 'Documentation';
		}

		let tmpGroups = pState.SidebarGroups || [];

		for (let i = 0; i < tmpGroups.length; i++)
		{
			let tmpGroup = tmpGroups[i];

			// Check if the group itself matches
			if (tmpGroup.Path && tmpGroup.Path === pCurrentPath)
			{
				return tmpGroup.Name || pCurrentPath;
			}

			let tmpItems = tmpGroup.Items || [];
			for (let j = 0; j < tmpItems.length; j++)
			{
				if (tmpItems[j].Path === pCurrentPath)
				{
					return tmpItems[j].Name || pCurrentPath;
				}
			}
		}

		return pCurrentPath;
	}

	/**
	 * Render the topic badge HTML if a topic is active.
	 *
	 * @param {object} pState - The InlineDocumentation state
	 * @returns {string} HTML string for the topic badge, or empty string
	 */
	_renderTopicBadge(pState)
	{
		let tmpActiveTopic = pState.Topic;

		if (!tmpActiveTopic || !pState.Topics || !pState.Topics[tmpActiveTopic])
		{
			return '';
		}

		let tmpTopicDef = pState.Topics[tmpActiveTopic];
		let tmpTopicName = tmpTopicDef.TopicTitle || tmpTopicDef.Name || tmpActiveTopic;

		let tmpHTML = '<div class="pict-inline-doc-nav-topic-badge">'
			+ this._escapeHTML(tmpTopicName)
			+ '<span class="pict-inline-doc-nav-topic-clear" id="InlineDoc-Nav-ClearTopic">'
			+ '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">'
			+ '<line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>'
			+ '</svg></span>'
			+ '</div>';

		return tmpHTML;
	}

	/**
	 * The host-wired structure capabilities (create/delete/move/reorder). Falls back
	 * to an all-false shape when the provider or the API is unavailable, so callers
	 * can read it unconditionally.
	 *
	 * @returns {object} capability flags
	 */
	_structureCaps()
	{
		let tmpProvider = this.pict.providers['Pict-InlineDocumentation'];
		if (tmpProvider && typeof tmpProvider.getStructureCapabilities === 'function')
		{
			return tmpProvider.getStructureCapabilities();
		}
		return { create: false, createFolder: false, createDocument: false, delete: false, move: false, reorder: false, any: false };
	}

	/**
	 * Render the toolbar HTML: structure controls (New Folder / New Doc) when the
	 * host wired them, plus the topic-management controls when TopicManagerEnabled.
	 *
	 * @param {object} pState - The InlineDocumentation state
	 * @returns {string} HTML string for the toolbar, or empty string
	 */
	_renderToolbar(pState)
	{
		let tmpCaps = this._structureCaps();

		if (!pState.TopicManagerEnabled && !tmpCaps.any)
		{
			return '';
		}

		let tmpHTML = '<div class="pict-inline-doc-nav-toolbar">';

		// Structure buttons — only the ones the host actually wired.
		if (tmpCaps.createFolder)
		{
			tmpHTML += '<button class="pict-inline-doc-nav-toolbar-btn" id="InlineDoc-Nav-NewFolder" title="New folder">'
				+ '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
				+ '<path d="M1.5 4.5a1 1 0 0 1 1-1h3.2l1.3 1.4h5.5a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z"/>'
				+ '<line x1="8" y1="7" x2="8" y2="11"/><line x1="6" y1="9" x2="10" y2="9"/>'
				+ '</svg></button>';
		}
		if (tmpCaps.createDocument)
		{
			tmpHTML += '<button class="pict-inline-doc-nav-toolbar-btn" id="InlineDoc-Nav-NewDoc" title="New document">'
				+ '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
				+ '<path d="M4 2.5H9L12 5.5V13.5H4Z"/><polyline points="9 2.5 9 5.5 12 5.5"/>'
				+ '<line x1="8" y1="8" x2="8" y2="11.5"/><line x1="6.25" y1="9.75" x2="9.75" y2="9.75"/>'
				+ '</svg></button>';
		}

		if (!pState.TopicManagerEnabled)
		{
			tmpHTML += '<span class="pict-inline-doc-nav-toolbar-spacer"></span>';
			tmpHTML += '</div>';
			return tmpHTML;
		}

		tmpHTML += '<button class="pict-inline-doc-nav-toolbar-btn" id="InlineDoc-Nav-ManageTopics" title="Manage Topics">'
			+ '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
			+ '<circle cx="8" cy="8" r="2.5"/>'
			+ '<path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>'
			+ '</svg></button>';

		if (pState.CurrentRoute)
		{
			tmpHTML += '<button class="pict-inline-doc-nav-toolbar-btn accent" id="InlineDoc-Nav-BindTopic" title="Bind topic to current route">'
				+ '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
				+ '<path d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1"/>'
				+ '<path d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1"/>'
				+ '</svg></button>';
		}

		let tmpTooltipEditActive = pState.TooltipEditMode ? ' active' : '';
		tmpHTML += '<button class="pict-inline-doc-nav-toolbar-btn' + tmpTooltipEditActive + '" id="InlineDoc-Nav-TooltipEditMode" title="Toggle tooltip edit mode">'
			+ '<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'
			+ '<path d="M14 10a1.5 1.5 0 01-1.5 1.5H4l-3 3V3A1.5 1.5 0 012.5 1.5h10A1.5 1.5 0 0114 3z"/>'
			+ '</svg></button>';

		tmpHTML += '<span class="pict-inline-doc-nav-toolbar-spacer"></span>';
		tmpHTML += '</div>';

		return tmpHTML;
	}

	/**
	 * Drag attributes for a movable / reorderable node. Emitted only when the host
	 * wired move or reorder and the node has a real path.
	 *
	 * @param {string} pPath - The node's real lake path
	 * @param {string} pType - 'file' or 'folder'
	 * @param {object} pCaps - Structure capabilities
	 * @returns {string} An attribute fragment (leading space) or ''
	 */
	_dragAttrs(pPath, pType, pCaps)
	{
		if (!pPath || (!pCaps.move && !pCaps.reorder))
		{
			return '';
		}
		return ' draggable="true" data-node-path="' + this._escapeHTML(pPath) + '" data-node-type="' + pType + '"';
	}

	/**
	 * Per-node hover actions (rename / delete), gated by capabilities. Requires a
	 * real path; a legacy pathless folder gets no actions.
	 *
	 * @param {string} pPath - The node's real lake path
	 * @param {string} pType - 'file' or 'folder'
	 * @param {object} pCaps - Structure capabilities
	 * @returns {string} HTML for the actions cluster, or ''
	 */
	_nodeActionsHTML(pPath, pType, pCaps)
	{
		if (!pPath || (!pCaps.move && !pCaps.delete))
		{
			return '';
		}
		// Actions carry their own data-action-path / data-action-type (NOT data-node-path)
		// so the drag / reorder queries, which select real nodes by [data-node-path], never
		// match these buttons.
		let tmpHTML = '<span class="pict-inline-doc-nav-node-actions">';
		if (pCaps.move)
		{
			tmpHTML += '<span class="pict-inline-doc-nav-node-action" data-action="rename" data-action-path="' + this._escapeHTML(pPath) + '" data-action-type="' + pType + '" title="Rename">'
				+ '<svg width="0.85em" height="0.85em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5l2 2L6 12l-2.5.5L4 10z"/></svg>'
				+ '</span>';
		}
		if (pCaps.delete)
		{
			tmpHTML += '<span class="pict-inline-doc-nav-node-action danger" data-action="delete" data-action-path="' + this._escapeHTML(pPath) + '" data-action-type="' + pType + '" title="Delete">'
				+ '<svg width="0.85em" height="0.85em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2.5 4 13.5 4"/><path d="M5.5 4V2.8h5V4M6.5 7v4M9.5 7v4M4 4l0.7 9h6.6L12 4"/></svg>'
				+ '</span>';
		}
		tmpHTML += '</span>';
		return tmpHTML;
	}

	/**
	 * Build the group/item/heading tree HTML.
	 *
	 * @param {object} pState - The InlineDocumentation state
	 * @param {string} pCurrentPath - The current document path
	 * @param {Array} pHeadings - Array of { Text, Slug, Level } from _extractHeadings
	 * @param {string} pFilterText - The current filter text
	 * @returns {string} HTML string for the group tree
	 */
	_renderGroupTree(pState, pCurrentPath, pHeadings, pFilterText)
	{
		let tmpCaps = this._structureCaps();
		let tmpHTML = '';
		let tmpGroups = pState.SidebarGroups || [];
		let tmpActiveTopic = pState.Topic;
		let tmpTopicDocuments = null;
		let tmpFilterLower = (pFilterText || '').toLowerCase();

		// Resolve topic document filter
		if (tmpActiveTopic && pState.Topics && pState.Topics[tmpActiveTopic])
		{
			let tmpTopicDef = pState.Topics[tmpActiveTopic];

			if (tmpTopicDef.TopicHelpFilePath)
			{
				tmpTopicDocuments = [tmpTopicDef.TopicHelpFilePath];
			}
			else if (tmpTopicDef.Documents)
			{
				tmpTopicDocuments = tmpTopicDef.Documents;
			}
			else
			{
				tmpTopicDocuments = [];
			}
		}

		for (let i = 0; i < tmpGroups.length; i++)
		{
			let tmpGroup = tmpGroups[i];
			let tmpGroupItems = tmpGroup.Items || [];

			// Apply topic filter
			if (tmpTopicDocuments)
			{
				tmpGroupItems = tmpGroupItems.filter((pItem) =>
				{
					return tmpTopicDocuments.indexOf(pItem.Path) >= 0;
				});

				let tmpGroupMatches = tmpTopicDocuments.indexOf(tmpGroup.Path) >= 0;

				if (tmpGroupItems.length < 1 && !tmpGroupMatches)
				{
					continue;
				}
			}

			// Apply text filter — match item names AND headings of the active document
			if (tmpFilterLower)
			{
				tmpGroupItems = tmpGroupItems.filter((pItem) =>
				{
					if ((pItem.Name || '').toLowerCase().indexOf(tmpFilterLower) >= 0)
					{
						return true;
					}
					// For the active document, also check heading text
					if (pItem.Path === pCurrentPath && pHeadings.length > 0)
					{
						for (let h = 0; h < pHeadings.length; h++)
						{
							if ((pHeadings[h].Text || '').toLowerCase().indexOf(tmpFilterLower) >= 0)
							{
								return true;
							}
						}
					}
					return false;
				});

				let tmpGroupNameMatches = (tmpGroup.Name || '').toLowerCase().indexOf(tmpFilterLower) >= 0;

				if (tmpGroupItems.length < 1 && !tmpGroupNameMatches)
				{
					continue;
				}
			}

			let tmpGroupKey = tmpGroup.Key || tmpGroup.Name || ('group-' + i);
			let tmpIsGroupCollapsed = pState.CollapsedGroups && pState.CollapsedGroups[tmpGroupKey];
			let tmpGroupClass = 'pict-inline-doc-nav-group' + (tmpIsGroupCollapsed ? ' collapsed' : '');
			let tmpToggleClass = 'pict-inline-doc-nav-group-toggle' + (tmpIsGroupCollapsed ? ' collapsed' : '');

			// A top-level group is a root node: a folder (its real FolderPath) or a
			// root document (its Path). Drag attrs on the header enable root reorder /
			// drop-into-folder; the hover actions enable rename/delete of the top node.
			let tmpGroupPath = tmpGroup.FolderPath || tmpGroup.Path || '';
			let tmpGroupType = tmpGroup.FolderPath ? 'folder' : 'file';

			tmpHTML += '<div class="' + tmpGroupClass + '" data-group="' + this._escapeHTML(tmpGroupKey) + '">';
			tmpHTML += '<div class="pict-inline-doc-nav-group-header"' + this._dragAttrs(tmpGroupPath, tmpGroupType, tmpCaps) + '>';
			tmpHTML += '<span class="' + tmpToggleClass + '" aria-hidden="true">'
				+ '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" '
				+ 'stroke-linecap="round" stroke-linejoin="round">'
				+ '<polyline points="3 6 8 11 13 6"/>'
				+ '</svg></span>';
			tmpHTML += this._escapeHTML(tmpGroup.Name);
			tmpHTML += this._nodeActionsHTML(tmpGroupPath, tmpGroupType, tmpCaps);
			tmpHTML += '</div>';

			tmpHTML += '<div class="pict-inline-doc-nav-group-items">';

			// If the group itself has a path, show it as the first item
			if (tmpGroup.Path)
			{
				let tmpActive = (pCurrentPath === tmpGroup.Path) ? ' active' : '';
				tmpHTML += '<a class="pict-inline-doc-nav-item' + tmpActive
					+ '" data-doc-path="' + this._escapeHTML(tmpGroup.Path) + '"'
					+ this._dragAttrs(tmpGroup.Path, 'file', tmpCaps) + '>'
					+ this._fileIconSVG()
					+ this._escapeHTML(tmpGroup.Name)
					+ this._nodeActionsHTML(tmpGroup.Path, 'file', tmpCaps)
					+ '</a>';

				// If this is the active item, render heading sub-items
				if (pCurrentPath === tmpGroup.Path)
				{
					tmpHTML += this._renderHeadingSubItems(pHeadings, tmpFilterLower, 0);
				}
			}

			for (let j = 0; j < tmpGroupItems.length; j++)
			{
				let tmpItem = tmpGroupItems[j];
				let tmpIndent = ' style="--doc-nav-level:' + (tmpItem.Level || 0) + '"';

				// Sub-folder node (no document of its own). Indent it by its
				// level and, when it has descendants, make it clickable so it
				// opens its first child document; mark it with a folder glyph.
				// A real FolderPath (trailing-slash sidebar link) makes it a drag
				// source, a drop target, and rename/delete-able.
				if (!tmpItem.Path)
				{
					let tmpFolderPath = tmpItem.FolderPath || '';
					let tmpFolderDrag = this._dragAttrs(tmpFolderPath, 'folder', tmpCaps);
					let tmpFolderActions = this._nodeActionsHTML(tmpFolderPath, 'folder', tmpCaps);
					if (tmpItem.FirstChildPath)
					{
						// Folders are navigational shortcuts to their first child; the
						// child item carries the active highlight, so the folder doesn't.
						tmpHTML += '<a class="pict-inline-doc-nav-item pict-inline-doc-nav-folder'
							+ '" data-doc-path="' + this._escapeHTML(tmpItem.FirstChildPath) + '"' + tmpIndent + tmpFolderDrag + '>'
							+ this._folderIconSVG()
							+ this._escapeHTML(tmpItem.Name)
							+ tmpFolderActions
							+ '</a>';
					}
					else
					{
						// An empty folder (marker-only) still gets its path, so it is a
						// valid drop target and can be renamed / removed.
						tmpHTML += '<span class="pict-inline-doc-nav-item pict-inline-doc-nav-folder"' + tmpIndent + tmpFolderDrag + '>'
							+ this._folderIconSVG()
							+ this._escapeHTML(tmpItem.Name)
							+ tmpFolderActions
							+ '</span>';
					}
					continue;
				}

				if (tmpItem.External && tmpItem.ExternalURL)
				{
					// External link — opens in a new tab
					tmpHTML += '<a class="pict-inline-doc-nav-item pict-inline-doc-nav-item-external'
						+ '" data-external-url="' + this._escapeHTML(tmpItem.ExternalURL) + '"' + tmpIndent + '>'
						+ this._fileIconSVG()
						+ this._escapeHTML(tmpItem.Name)
						+ '<svg class="pict-inline-doc-nav-external-icon" width="0.75em" height="0.75em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4"/><polyline points="8,2 14,2 14,8"/><line x1="14" y1="2" x2="7" y2="9"/></svg>'
						+ '</a>';
				}
				else
				{
					let tmpActive = (pCurrentPath === tmpItem.Path) ? ' active' : '';
					tmpHTML += '<a class="pict-inline-doc-nav-item' + tmpActive
						+ '" data-doc-path="' + this._escapeHTML(tmpItem.Path) + '"' + tmpIndent
						+ this._dragAttrs(tmpItem.Path, 'file', tmpCaps) + '>'
						+ this._fileIconSVG()
						+ this._escapeHTML(tmpItem.Name)
						+ this._nodeActionsHTML(tmpItem.Path, 'file', tmpCaps)
						+ '</a>';

					// If this is the active item, render heading sub-items
					if (pCurrentPath === tmpItem.Path)
					{
						tmpHTML += this._renderHeadingSubItems(pHeadings, tmpFilterLower, tmpItem.Level || 0);
					}
				}
			}

			tmpHTML += '</div>';
			tmpHTML += '</div>';
		}

		return tmpHTML;
	}

	/**
	 * A small folder glyph for sub-folder nav nodes. Uses currentColor so it
	 * follows the theme like the other inline nav icons.
	 *
	 * @returns {string} inline SVG HTML
	 */
	_folderIconSVG()
	{
		return '<svg class="pict-inline-doc-nav-folder-icon" width="0.85em" height="0.85em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 5a1 1 0 0 1 1-1h3.2l1.3 1.4h5.5a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z"/></svg>';
	}

	/**
	 * A small document glyph (a page with a folded corner) for markdown file
	 * nodes. Same footprint as the folder glyph so files and folders line up at
	 * the same depth.
	 *
	 * @returns {string} inline SVG HTML
	 */
	_fileIconSVG()
	{
		return '<svg class="pict-inline-doc-nav-file-icon" width="0.85em" height="0.85em" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2.5H9L12 5.5V13.5H4Z"/><polyline points="9 2.5 9 5.5 12 5.5"/></svg>';
	}

	/**
	 * A small filled dot marking an in-document section (a heading sub-item shown
	 * beneath the active document). currentColor + low opacity keeps it quiet.
	 *
	 * @returns {string} inline SVG HTML
	 */
	_sectionDotSVG()
	{
		return '<svg class="pict-inline-doc-nav-section-dot" width="0.85em" height="0.85em" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="2.3" fill="currentColor"/></svg>';
	}

	/**
	 * Render heading sub-items (h2 and h3) beneath the active nav item.
	 *
	 * @param {Array} pHeadings - Array of { Text, Slug, Level }
	 * @param {string} pFilterText - Lowercase filter text
	 * @returns {string} HTML string for heading sub-items
	 */
	_renderHeadingSubItems(pHeadings, pFilterText, pBaseLevel)
	{
		if (!pHeadings || pHeadings.length < 1)
		{
			return '';
		}

		// Indent the headings relative to their (possibly nested) parent
		// document item, so they line up one notch under it at any tree depth.
		let tmpLevelStyle = ' style="--doc-nav-level:' + (pBaseLevel || 0) + '"';
		let tmpHTML = '';

		for (let i = 0; i < pHeadings.length; i++)
		{
			let tmpHeading = pHeadings[i];
			let tmpText = tmpHeading.Text || '';

			// Apply filter
			if (pFilterText && tmpText.toLowerCase().indexOf(pFilterText) < 0)
			{
				continue;
			}

			let tmpLevelClass = (tmpHeading.Level === 3) ? ' h3' : '';
			tmpHTML += '<a class="pict-inline-doc-nav-heading' + tmpLevelClass
				+ '" data-heading-slug="' + this._escapeHTML(tmpHeading.Slug) + '"' + tmpLevelStyle + '>'
				+ this._sectionDotSVG()
				+ this._escapeHTML(tmpText)
				+ '</a>';
		}

		return tmpHTML;
	}

	/**
	 * Wire click handlers on navigation items, group headers, and controls.
	 *
	 * @param {HTMLElement} pContainer - The nav container element
	 */
	_wireClickHandlers(pContainer)
	{
		let tmpProvider = this.pict.providers['Pict-InlineDocumentation'];
		let tmpState = this.pict.AppData.InlineDocumentation;

		let tmpSelf = this;

		// Collapse toggle (chevron)
		let tmpCollapseToggle = pContainer.querySelector('#InlineDoc-Nav-CollapseToggle');
		if (tmpCollapseToggle)
		{
			tmpCollapseToggle.addEventListener('click', () =>
			{
				if (tmpState)
				{
					tmpState.NavCollapsed = !tmpState.NavCollapsed;
				}
				tmpSelf._renderNavigation();
			});
		}

		// Title click also toggles
		let tmpTitleToggle = pContainer.querySelector('#InlineDoc-Nav-TitleToggle');
		if (tmpTitleToggle)
		{
			tmpTitleToggle.addEventListener('click', () =>
			{
				if (tmpState)
				{
					tmpState.NavCollapsed = !tmpState.NavCollapsed;
				}
				tmpSelf._renderNavigation();
			});
		}

		// Search icon — expands outline and focuses search input
		let tmpSearchBtn = pContainer.querySelector('#InlineDoc-Nav-SearchBtn');
		if (tmpSearchBtn)
		{
			tmpSearchBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				if (tmpState)
				{
					tmpState.NavCollapsed = false;
				}
				tmpSelf._renderNavigation();

				let tmpInput = document.getElementById('InlineDoc-Nav-FilterInput');
				if (tmpInput)
				{
					tmpInput.focus();
				}
			});
		}

		// Search / filter input
		let tmpFilterInput = pContainer.querySelector('#InlineDoc-Nav-FilterInput');
		if (tmpFilterInput)
		{
			let tmpDebounceTimer = null;

			tmpFilterInput.addEventListener('input', (pEvent) =>
			{
				let tmpValue = pEvent.target.value || '';

				if (tmpState)
				{
					tmpState.NavFilterText = tmpValue;
				}

				// If search index is loaded, debounce full-text search
				if (tmpState && tmpState.SearchIndexLoaded && tmpProvider && typeof tmpProvider.search === 'function')
				{
					if (tmpDebounceTimer) clearTimeout(tmpDebounceTimer);
					tmpDebounceTimer = setTimeout(() =>
					{
						tmpState.SearchQuery = tmpValue;
						tmpState.SearchResults = tmpValue.trim() ? tmpProvider.search(tmpValue) : [];
						tmpSelf._renderNavigation();

						let tmpNewInput = document.getElementById('InlineDoc-Nav-FilterInput');
						if (tmpNewInput)
						{
							tmpNewInput.focus();
							let tmpLen = tmpNewInput.value.length;
							tmpNewInput.setSelectionRange(tmpLen, tmpLen);
						}
					}, 250);
				}
				else
				{
					// No search index — immediate client-side filter only
					tmpSelf._renderNavigation();

					let tmpNewInput = document.getElementById('InlineDoc-Nav-FilterInput');
					if (tmpNewInput)
					{
						tmpNewInput.focus();
						let tmpLen = tmpNewInput.value.length;
						tmpNewInput.setSelectionRange(tmpLen, tmpLen);
					}
				}
			});
		}

		// Search result clicks
		let tmpSearchResults = pContainer.querySelectorAll('.pict-inline-doc-nav-search-result[data-search-path]');
		for (let i = 0; i < tmpSearchResults.length; i++)
		{
			let tmpResult = tmpSearchResults[i];
			tmpResult.addEventListener('click', (pEvent) =>
			{
				pEvent.preventDefault();
				let tmpPath = tmpResult.getAttribute('data-search-path');
				if (tmpProvider && tmpPath)
				{
					if (tmpState)
					{
						tmpState.SearchQuery = '';
						tmpState.SearchResults = [];
						tmpState.NavFilterText = '';
					}
					tmpProvider.loadDocument(tmpPath);
				}
			});
		}

		// External links — open in new tab
		let tmpExternalLinks = pContainer.querySelectorAll('[data-external-url]');
		for (let i = 0; i < tmpExternalLinks.length; i++)
		{
			let tmpExtLink = tmpExternalLinks[i];
			tmpExtLink.addEventListener('click', (pEvent) =>
			{
				pEvent.preventDefault();
				let tmpURL = tmpExtLink.getAttribute('data-external-url');
				if (tmpURL)
				{
					window.open(tmpURL, '_blank');
				}
			});
		}

		// Document links
		let tmpLinks = pContainer.querySelectorAll('.pict-inline-doc-nav-item[data-doc-path]');
		for (let i = 0; i < tmpLinks.length; i++)
		{
			let tmpLink = tmpLinks[i];
			tmpLink.addEventListener('click', (pEvent) =>
			{
				pEvent.preventDefault();
				let tmpPath = tmpLink.getAttribute('data-doc-path');
				if (tmpProvider && tmpPath)
				{
					// Clear filter when navigating
					if (tmpState)
					{
						tmpState.NavFilterText = '';
					}
					tmpProvider.loadDocument(tmpPath);
				}
			});
		}

		// Heading links
		let tmpHeadingLinks = pContainer.querySelectorAll('.pict-inline-doc-nav-heading[data-heading-slug]');
		for (let i = 0; i < tmpHeadingLinks.length; i++)
		{
			let tmpHeadingLink = tmpHeadingLinks[i];
			tmpHeadingLink.addEventListener('click', (pEvent) =>
			{
				pEvent.preventDefault();
				let tmpSlug = tmpHeadingLink.getAttribute('data-heading-slug');
				if (tmpProvider && tmpSlug)
				{
					tmpProvider._scrollToAnchor(tmpSlug);
				}
			});
		}

		// Group collapse toggle
		let tmpHeaders = pContainer.querySelectorAll('.pict-inline-doc-nav-group-header');
		for (let i = 0; i < tmpHeaders.length; i++)
		{
			let tmpHeader = tmpHeaders[i];
			tmpHeader.addEventListener('click', () =>
			{
				let tmpGroup = tmpHeader.parentElement;
				if (tmpGroup)
				{
					tmpGroup.classList.toggle('collapsed');

					// Persist collapse state
					let tmpGroupKey = tmpGroup.getAttribute('data-group');
					if (tmpState && tmpGroupKey)
					{
						if (!tmpState.CollapsedGroups)
						{
							tmpState.CollapsedGroups = {};
						}
						let tmpToggle = tmpGroup.querySelector('.pict-inline-doc-nav-group-toggle');
						if (tmpGroup.classList.contains('collapsed'))
						{
							tmpState.CollapsedGroups[tmpGroupKey] = true;
							if (tmpToggle)
							{
								tmpToggle.classList.add('collapsed');
							}
						}
						else
						{
							delete tmpState.CollapsedGroups[tmpGroupKey];
							if (tmpToggle)
							{
								tmpToggle.classList.remove('collapsed');
							}
						}
					}
				}
			});
		}

		// Topic clear button
		let tmpClearBtn = pContainer.querySelector('#InlineDoc-Nav-ClearTopic');
		if (tmpClearBtn && tmpProvider)
		{
			tmpClearBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				tmpProvider.clearTopic();
			});
		}

		// Topic manager button
		let tmpManageBtn = pContainer.querySelector('#InlineDoc-Nav-ManageTopics');
		if (tmpManageBtn)
		{
			tmpManageBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				let tmpTopicManagerView = this.pict.views['InlineDoc-TopicManager'];
				if (tmpTopicManagerView)
				{
					tmpTopicManagerView.showTopicManager();
				}
			});
		}

		// Tooltip edit mode toggle
		let tmpTooltipEditBtn = pContainer.querySelector('#InlineDoc-Nav-TooltipEditMode');
		if (tmpTooltipEditBtn)
		{
			tmpTooltipEditBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				let tmpDocProvider = this.pict.providers['Pict-InlineDocumentation'];
				if (tmpDocProvider)
				{
					let tmpCurrentState = this.pict.AppData.InlineDocumentation;
					tmpDocProvider.setTooltipEditMode(!tmpCurrentState.TooltipEditMode);
				}
			});
		}

		// Bind topic to route button
		let tmpBindBtn = pContainer.querySelector('#InlineDoc-Nav-BindTopic');
		if (tmpBindBtn)
		{
			tmpBindBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				let tmpTopicManagerView = this.pict.views['InlineDoc-TopicManager'];
				if (tmpTopicManagerView)
				{
					tmpTopicManagerView.showBindTopicToRoute();
				}
			});
		}

		// Structure management: toolbar create buttons, per-node rename/delete, drag reorder/move.
		this._wireStructureHandlers(pContainer);
		this._wireDragDrop(pContainer);
	}

	// ─── structure management wiring ─────────────────────────────────────
	_provider() { return this.pict.providers['Pict-InlineDocumentation']; }
	_modal() { return this.pict.views['Pict-Section-Modal']; }
	_dirname(pPath) { let p = String(pPath || ''); let i = p.lastIndexOf('/'); return i >= 0 ? p.slice(0, i) : ''; }
	_basename(pPath) { let p = String(pPath || ''); let i = p.lastIndexOf('/'); return i >= 0 ? p.slice(i + 1) : p; }

	/**
	 * Prompt for a single line of text via the modal (no native prompt()). Resolves
	 * to the trimmed value, or null if cancelled / empty.
	 */
	_promptForName(pTitle, pLabel, pDefault, pPlaceholder)
	{
		let tmpModal = this._modal();
		if (!tmpModal || typeof tmpModal.show !== 'function')
		{
			return Promise.resolve(null);
		}
		let tmpDefault = this._escapeHTML(pDefault || '');
		let tmpContent = '<p style="margin:0 0 0.4em">' + this._escapeHTML(pLabel || 'Name') + '</p>'
			+ '<input type="text" id="InlineDoc-Structure-Prompt" class="pict-input" style="width:100%;box-sizing:border-box;padding:0.4em 0.5em" '
			+ 'value="' + tmpDefault + '" placeholder="' + this._escapeHTML(pPlaceholder || '') + '" '
			+ 'onkeydown="if(event.key===\'Enter\'){event.preventDefault();}" />';
		return tmpModal.show(
			{
				title: pTitle || 'Name',
				content: tmpContent,
				closeable: true,
				width: '420px',
				buttons:
				[
					{ Hash: 'cancel', Label: 'Cancel' },
					{ Hash: 'ok', Label: 'OK', Style: 'primary' }
				],
				onOpen: () =>
				{
					let tmpInput = document.getElementById('InlineDoc-Structure-Prompt');
					if (tmpInput) { tmpInput.focus(); tmpInput.select(); }
				}
			}).then((pChoice) =>
			{
				if (pChoice !== 'ok') { return null; }
				let tmpInput = document.getElementById('InlineDoc-Structure-Prompt');
				let tmpValue = tmpInput ? String(tmpInput.value || '').trim() : '';
				return tmpValue || null;
			});
	}

	/**
	 * Wire the toolbar create buttons and the per-node rename / delete actions.
	 *
	 * @param {HTMLElement} pContainer - The nav container element
	 */
	_wireStructureHandlers(pContainer)
	{
		let tmpSelf = this;
		let tmpProvider = this._provider();
		if (!tmpProvider) { return; }

		// New Folder
		let tmpNewFolderBtn = pContainer.querySelector('#InlineDoc-Nav-NewFolder');
		if (tmpNewFolderBtn)
		{
			tmpNewFolderBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				tmpSelf._promptForName('New folder', 'Folder name (a path like guides/setup nests it):', '', 'folder-name').then((pName) =>
				{
					if (pName) { tmpProvider.requestCreateFolder('', pName); }
				});
			});
		}

		// New Document
		let tmpNewDocBtn = pContainer.querySelector('#InlineDoc-Nav-NewDoc');
		if (tmpNewDocBtn)
		{
			tmpNewDocBtn.addEventListener('click', (pEvent) =>
			{
				pEvent.stopPropagation();
				tmpSelf._promptForName('New document', 'Document name (.md is added if omitted):', '', 'my-document').then((pName) =>
				{
					if (pName) { tmpProvider.requestCreateDocument('', pName); }
				});
			});
		}

		// Rename / Delete actions on every node
		let tmpActions = pContainer.querySelectorAll('.pict-inline-doc-nav-node-action[data-action]');
		for (let i = 0; i < tmpActions.length; i++)
		{
			let tmpAction = tmpActions[i];
			tmpAction.addEventListener('click', (pEvent) =>
			{
				pEvent.preventDefault();
				pEvent.stopPropagation();
				let tmpKind = tmpAction.getAttribute('data-action');
				let tmpPath = tmpAction.getAttribute('data-action-path');
				let tmpType = tmpAction.getAttribute('data-action-type') || 'file';
				if (!tmpPath) { return; }
				if (tmpKind === 'rename')
				{
					let tmpParent = tmpSelf._dirname(tmpPath);
					let tmpOldName = tmpSelf._basename(tmpPath);
					tmpSelf._promptForName('Rename', 'New name:', tmpOldName, '').then((pName) =>
					{
						if (!pName) { return; }
						let tmpNewName = pName.replace(/^\/+|\/+$/g, '');
						if (!tmpNewName || tmpNewName === tmpOldName) { return; }
						let tmpNewPath = tmpParent ? (tmpParent + '/' + tmpNewName) : tmpNewName;
						tmpProvider.requestMoveNode(tmpPath, tmpNewPath);
					});
				}
				else if (tmpKind === 'delete')
				{
					let tmpModal = tmpSelf._modal();
					let tmpName = tmpSelf._basename(tmpPath);
					let tmpMessage = (tmpType === 'folder')
						? ('Delete the folder "' + tmpName + '" and everything inside it? This cannot be undone.')
						: ('Delete "' + tmpName + '"? This cannot be undone.');
					if (tmpModal && typeof tmpModal.confirm === 'function')
					{
						tmpModal.confirm(tmpMessage, { title: 'Delete', confirmLabel: 'Delete', cancelLabel: 'Cancel', dangerous: true }).then((pOk) =>
						{
							if (pOk) { tmpProvider.requestDeleteNode(tmpPath, tmpType); }
						});
					}
					else
					{
						tmpProvider.requestDeleteNode(tmpPath, tmpType);
					}
				}
			});
		}
	}

	/**
	 * Collect the ordered basenames of every node sharing a parent, in DOM order
	 * (deduped by path so a group whose header and inner item share a path counts
	 * once). Used to persist a drag reorder.
	 *
	 * @param {HTMLElement} pContainer - The nav container
	 * @param {string} pParent - The parent path ('' for root)
	 * @returns {Array<string>} Ordered basenames
	 */
	_gatherSiblingNames(pContainer, pParent)
	{
		let tmpNodes = pContainer.querySelectorAll('[data-node-path]');
		let tmpNames = [];
		let tmpSeen = {};
		for (let i = 0; i < tmpNodes.length; i++)
		{
			let tmpPath = tmpNodes[i].getAttribute('data-node-path');
			if (!tmpPath || this._dirname(tmpPath) !== pParent) { continue; }
			if (tmpSeen[tmpPath]) { continue; }
			tmpSeen[tmpPath] = true;
			tmpNames.push(this._basename(tmpPath));
		}
		return tmpNames;
	}

	/**
	 * Wire HTML5 drag-and-drop: reorder within a parent (-> requestReorder) and drop
	 * onto a folder to move into it (-> requestMoveNode). Optimistic visual cues; the
	 * server rewrite + reloadSidebar make it authoritative.
	 *
	 * @param {HTMLElement} pContainer - The nav container element
	 */
	_wireDragDrop(pContainer)
	{
		let tmpSelf = this;
		let tmpProvider = this._provider();
		if (!tmpProvider) { return; }
		let tmpCaps = this._structureCaps();
		if (!tmpCaps.move && !tmpCaps.reorder) { return; }

		let tmpDraggables = pContainer.querySelectorAll('[data-node-path][draggable="true"]');
		let fClearMarks = () =>
		{
			let tmpMarked = pContainer.querySelectorAll('.pict-inline-doc-nav-drop-into, .pict-inline-doc-nav-drop-before, .pict-inline-doc-nav-drop-after');
			for (let i = 0; i < tmpMarked.length; i++)
			{
				tmpMarked[i].classList.remove('pict-inline-doc-nav-drop-into', 'pict-inline-doc-nav-drop-before', 'pict-inline-doc-nav-drop-after');
			}
		};

		for (let i = 0; i < tmpDraggables.length; i++)
		{
			let tmpEl = tmpDraggables[i];

			tmpEl.addEventListener('dragstart', (pEvent) =>
			{
				let tmpPath = tmpEl.getAttribute('data-node-path');
				tmpSelf._dragState =
				{
					Path: tmpPath,
					Type: tmpEl.getAttribute('data-node-type') || 'file',
					Parent: tmpSelf._dirname(tmpPath),
					Name: tmpSelf._basename(tmpPath)
				};
				tmpEl.classList.add('pict-inline-doc-nav-dragging');
				if (pEvent.dataTransfer)
				{
					pEvent.dataTransfer.effectAllowed = 'move';
					try { pEvent.dataTransfer.setData('text/plain', tmpPath); } catch (pErr) { /* IE guard */ }
				}
			});

			tmpEl.addEventListener('dragend', () =>
			{
				tmpEl.classList.remove('pict-inline-doc-nav-dragging');
				fClearMarks();
				tmpSelf._dragState = null;
			});

			tmpEl.addEventListener('dragover', (pEvent) =>
			{
				let tmpDrag = tmpSelf._dragState;
				if (!tmpDrag) { return; }
				let tmpTargetPath = tmpEl.getAttribute('data-node-path');
				let tmpTargetType = tmpEl.getAttribute('data-node-type') || 'file';
				let tmpMode = tmpSelf._dropModeFor(tmpDrag, tmpTargetPath, tmpTargetType, pEvent, tmpEl, tmpCaps);
				if (!tmpMode) { return; }
				pEvent.preventDefault();
				if (pEvent.dataTransfer) { pEvent.dataTransfer.dropEffect = 'move'; }
				tmpEl.classList.remove('pict-inline-doc-nav-drop-into', 'pict-inline-doc-nav-drop-before', 'pict-inline-doc-nav-drop-after');
				tmpEl.classList.add('pict-inline-doc-nav-drop-' + tmpMode);
			});

			tmpEl.addEventListener('dragleave', () =>
			{
				tmpEl.classList.remove('pict-inline-doc-nav-drop-into', 'pict-inline-doc-nav-drop-before', 'pict-inline-doc-nav-drop-after');
			});

			tmpEl.addEventListener('drop', (pEvent) =>
			{
				let tmpDrag = tmpSelf._dragState;
				if (!tmpDrag) { return; }
				let tmpTargetPath = tmpEl.getAttribute('data-node-path');
				let tmpTargetType = tmpEl.getAttribute('data-node-type') || 'file';
				let tmpMode = tmpSelf._dropModeFor(tmpDrag, tmpTargetPath, tmpTargetType, pEvent, tmpEl, tmpCaps);
				pEvent.preventDefault();
				pEvent.stopPropagation();
				fClearMarks();
				if (!tmpMode) { return; }

				if (tmpMode === 'into')
				{
					// Move the dragged node into the target folder (keeping its basename).
					let tmpDestination = tmpTargetPath + '/' + tmpDrag.Name;
					tmpProvider.requestMoveNode(tmpDrag.Path, tmpDestination);
					return;
				}

				// Reorder within the shared parent: rebuild the sibling name list with the
				// dragged node repositioned before/after the target, then persist.
				let tmpNames = tmpSelf._gatherSiblingNames(pContainer, tmpDrag.Parent);
				let tmpFromIdx = tmpNames.indexOf(tmpDrag.Name);
				let tmpTargetName = tmpSelf._basename(tmpTargetPath);
				if (tmpFromIdx < 0) { return; }
				tmpNames.splice(tmpFromIdx, 1);
				let tmpTargetIdx = tmpNames.indexOf(tmpTargetName);
				if (tmpTargetIdx < 0) { return; }
				let tmpInsertIdx = (tmpMode === 'after') ? tmpTargetIdx + 1 : tmpTargetIdx;
				tmpNames.splice(tmpInsertIdx, 0, tmpDrag.Name);
				tmpProvider.requestReorder(tmpDrag.Parent, tmpNames);
			});
		}
	}

	/**
	 * Decide the drop mode for a hovered target: 'into' (move into a folder),
	 * 'before' / 'after' (reorder within the same parent), or null (not a valid drop).
	 */
	_dropModeFor(pDrag, pTargetPath, pTargetType, pEvent, pTargetEl, pCaps)
	{
		if (!pTargetPath || pTargetPath === pDrag.Path) { return null; }
		// Never drop a folder into itself or a descendant.
		if (pDrag.Type === 'folder' && (pTargetPath === pDrag.Path || pTargetPath.indexOf(pDrag.Path + '/') === 0)) { return null; }

		// Drop onto a different folder that is not already this node's parent -> move in.
		if (pCaps.move && pTargetType === 'folder' && pTargetPath !== pDrag.Parent)
		{
			return 'into';
		}

		// Same-parent nodes -> reorder (before/after by pointer position).
		if (pCaps.reorder && this._dirname(pTargetPath) === pDrag.Parent)
		{
			let tmpRect = pTargetEl.getBoundingClientRect();
			let tmpMidpoint = tmpRect.top + (tmpRect.height / 2);
			return (pEvent.clientY >= tmpMidpoint) ? 'after' : 'before';
		}

		return null;
	}

	/**
	 * Escape HTML special characters.
	 *
	 * @param {string} pText - Text to escape
	 * @returns {string} Escaped text
	 */
	_escapeHTML(pText)
	{
		if (!pText)
		{
			return '';
		}
		return pText
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}
}

module.exports = InlineDocumentationNavView;

module.exports.default_configuration = _ViewConfiguration;
