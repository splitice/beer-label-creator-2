const LABEL_COUNT = 18;

const form = document.getElementById('label-form');
const styleInput = document.getElementById('style');
const bottledInput = document.getElementById('bottled');
const labelsContainer = document.getElementById('labels');
const printButton = document.getElementById('print');

function formatDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function createLabelElements(styleValue, bottledValue) {
  labelsContainer.innerHTML = '';
  const styleText = styleValue || 'Beer Style';
  const bottledText = formatDate(bottledValue) || 'Bottled on';

  for (let index = 0; index < LABEL_COUNT; index += 1) {
    const label = document.createElement('article');
    label.className = 'label';
    label.setAttribute('role', 'group');
    label.setAttribute('aria-label', `Label ${index + 1}`);

    const content = document.createElement('div');
    content.className = 'label__content';

    const title = document.createElement('h2');
    title.className = 'label__title';
    title.textContent = styleText;

    const bottled = document.createElement('p');
    bottled.className = 'label__meta';
    bottled.textContent = bottledText;

    content.append(title, bottled);
    label.append(content);
    labelsContainer.append(label);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  createLabelElements(styleInput.value.trim(), bottledInput.value.trim());
}

function handleInputChange() {
  createLabelElements(styleInput.value.trim(), bottledInput.value.trim());
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', handleInputChange);

printButton.addEventListener('click', () => {
  window.print();
});

createLabelElements('', '');
