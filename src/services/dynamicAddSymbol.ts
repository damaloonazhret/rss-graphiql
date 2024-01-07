export default function dynamicAddSymbol(event: React.KeyboardEvent<HTMLInputElement>) {
  function addSymbol(symbol: string) {
    event.preventDefault();

    const getSelection = window.getSelection();

    if (getSelection) {
      const range = getSelection.getRangeAt(0);
      const tab = document.createTextNode(symbol);
      range.insertNode(tab);
      range.setStartAfter(tab);

      const selection = window.getSelection();
      if (selection) {
        selection.modify('move', 'backward', 'character');
      }
    }
  }

  if (event.key === 'Tab') {
    addSymbol('\u00a0\u00a0\u00a0\u00a0');
  }

  if (event.key === "'") {
    addSymbol("''");
  }

  if (event.key === '"') {
    addSymbol('""');
  }

  if (event.key === '(') {
    addSymbol('()');
  }

  if (event.key === '{') {
    addSymbol('{}');
  }

  if (event.key === '[') {
    addSymbol('[]');
  }
}
