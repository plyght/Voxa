import { visit } from 'unist-util-visit';

const remarkAlerts = () => {
  const alertTypes = [
    { id: 'note', label: 'Note', code: '[!NOTE]' },
    { id: 'tip', label: 'Tip', code: '[!TIP]' },
    { id: 'important', label: 'Important', code: '[!IMPORTANT]' },
    { id: 'warning', label: 'Warning', code: '[!WARNING]' },
    { id: 'caution', label: 'Caution', code: '[!CAUTION]' },
  ];

  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      // Check if the first child is a paragraph with the alert syntax code
      const firstChild = node.children[0];
      alertTypes.forEach((alertType) => {
        if (
          firstChild.type === 'paragraph' &&
          firstChild.children[0].value.startsWith(alertType.code)
        ) {
          // Remove the alertType.code marker
          firstChild.children[0].value = firstChild.children[0].value
            .replace(alertType.code, '')
            .trim();

          if (firstChild.children[0].value == '') {
            firstChild.children.shift();
          }

          if (firstChild.children[0]?.type === 'break') {
            firstChild.children.shift();
          }

          // Add an alert label at the top
          node.children.unshift({
            type: 'paragraph',
            children: [{ type: 'text', value: alertType.label }],
            data: { hProperties: { className: 'alert-label' } },
          });

          // Add classes to blockquote
          node.data = { hProperties: { className: `alert ${alertType.id}` } };
        }
      });
    });
  };
};

export default remarkAlerts;
