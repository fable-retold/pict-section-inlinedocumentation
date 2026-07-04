# pict-section-inlinedocumentation

> Embed context-aware documentation and tooltip help directly inside any Pict application.

`pict-section-inlinedocumentation` is a Pict section that turns a folder of Markdown topics into in-app help. It spans the full spectrum from "a sidebar with a table of contents" to "every editable control on every screen has a live, editable tooltip" -- and you pick the level that matches your product.

Part of the [Retold](https://github.com/fable-retold/retold) suite. Uses [`pict-view`](https://fable-retold.github.io/pict-view/) as its base, optionally consumes catalogs from [`pict-docuserve`](https://fable-retold.github.io/pict-docuserve/), and at the deepest level pairs with [`manyfest`](https://fable-retold.github.io/manyfest/) to auto-generate tooltips for every descriptor in your model.

## Four Levels of Embeddedness

<!-- bespoke diagram: edit diagrams/four-levels-of-embeddedness.mmd or .hints.json, then: npx pict-renderer-graph build modules/pict/pict-section-inlinedocumentation/docs -->
![Four Levels of Embeddedness](diagrams/four-levels-of-embeddedness.svg)

Each level is a strict superset of the one before it.

## Documentation

Published with [`pict-docuserve`](https://fable-retold.github.io/pict-docuserve/). Open `docs/index.html` locally, or browse the source Markdown:

- **[Overview](overview.md)** -- what it does and why
- **[Quickstart](quickstart.md)** -- sidebar running in five minutes
- **[Architecture](architecture.md)** -- services, views, lifecycle, with a Mermaid diagram
- **[Implementation Reference](reference.md)** -- source tree tour
- **[API Reference](api-reference.md)** -- every exposed function with a runnable snippet

### Embedding Guides

- **[Level 1 -- Sidebar + ToC](embedding-level1-sidebar.md)** -- least embedded
- **[Level 2 -- Route-Mapped Content](embedding-level2-routes.md)** -- more embedded
- **[Level 3 -- Hand-Authored Tooltips](embedding-level3-tooltips.md)** -- somewhat embedded
- **[Level 4 -- Auto-Generated Tooltips](embedding-level4-autogen.md)** -- most embedded

## Installation

```bash
npm install pict-section-inlinedocumentation
```

## Tiny Example

```js
const libPict = require('pict');
const libInlineDocs = require('pict-section-inlinedocumentation');

const _Pict = new libPict({ Product: 'My App', Version: '1.0.0' });

_Pict.addSection('InlineDocumentation', libInlineDocs,
{
    DocumentationRoot: '/docs/',
    CatalogURL: '/docs/retold-catalog.json',
    DefaultTopic: 'overview',
    SidebarContainer: '#AppHelpSidebar'
});

_Pict.onAfterInitializeAsync = async () =>
{
    await _Pict.views.InlineDocumentation.renderAsync();
};
```

## Relationship to Other Modules

| Module | Role |
|---|---|
| [pict](https://fable-retold.github.io/pict/) | Application framework |
| [pict-view](https://fable-retold.github.io/pict-view/) | Base view class |
| [pict-router](https://fable-retold.github.io/pict-router/) | Source of route change events for Level 2 |
| [pict-docuserve](https://fable-retold.github.io/pict-docuserve/) | Produces the catalog and keyword index consumed by this section |
| [pict-template-markdown](https://fable-retold.github.io/pict-template-markdown/) | Markdown -> HTML renderer |
| [manyfest](https://fable-retold.github.io/manyfest/) | Descriptors walked by Level 4 auto-generation |

## License

MIT -- same as the rest of the Retold suite.
