---
description: How to add a new CV template to EliteCV
---

# Adding a New CV Template

To add a new template to EliteCV, follow these steps:

1. **Define the Template ID**:
   - Choose a unique name (e.g., `modern-dark`).
   - Add it to the `TemplateType` union in `types.ts`.

2. **Add Template Options**:
   - Open `App.tsx`.
   - Add a new entry to the `TEMPLATE_OPTIONS` array.
   - Example: `{ id: 'modern-dark', title: 'Modern Dark', description: 'Description here', category: 'Modern' }`

3. **Map the CSS Class**:
   - in `App.tsx`, update the `getModelClass` function to map your `TemplateType` to a CSS class name (e.g., `model-modern-dark`).

4. **Create the Template Component**:
   - If it fits in an existing group, add it to one of the `CVPreview_*.tsx` files.
   - If it's a new style, consider creating a new file in `components/templates/`.
   - **Recommendation**: Use shared components from `components/CVAtoms.tsx` to maintain consistency and speed up development.

5. **Update Rendering Logic**:
   - in `App.tsx`, update the `renderCVPreview` function to return your new component when your template ID is selected.

6. **Add Styles**:
   - Open `index.css`.
   - Add styles scoped to your class (e.g., `.model-modern-dark .cv-preview-container { ... }`).
   - Ensure you use `-webkit-print-color-adjust: exact !important;` for all colors meant to be preserved in PDF.

7. **Verify**:
   - Open the web app, go to Step 1 (Template Selection), and check if your template appears and renders correctly.
   - Test the "Finalize" step and click "Export to PDF" to verify print styles.
