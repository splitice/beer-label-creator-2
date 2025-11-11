const LABEL_COUNT = 18;

const form = document.getElementById('label-form');
const styleInput = document.getElementById('style');
const packagedInput = document.getElementById('packaged');
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

function createLine(label, value, modifier) {
  const wrapper = document.createElement('div');
  wrapper.className = `label__line label__line--${modifier}`;

  const labelText = document.createElement('span');
  labelText.className = 'label__line-label';
  labelText.textContent = label;

  const valueText = document.createElement('span');
  valueText.className = 'label__line-value';

  if (value) {
    valueText.textContent = value;
  } else {
    valueText.classList.add('label__line-value--empty');
    valueText.innerHTML = '&nbsp;';
  }

  wrapper.append(labelText, valueText);
  return wrapper;
}

function createLabelElements(styleValue, packagedValue) {
  labelsContainer.innerHTML = '';

  const styleText = styleValue || '';
  const packagedText = formatDate(packagedValue);

  for (let index = 0; index < LABEL_COUNT; index += 1) {
    const label = document.createElement('article');
    label.className = 'label';
    label.setAttribute('role', 'group');
    label.setAttribute('aria-label', `Label ${index + 1}`);

    const header = document.createElement('header');
    header.className = 'label__header';

    const logo = document.createElement('div');
    logo.className = 'label__logo';
    logo.setAttribute('aria-hidden', 'true');

    const brand = document.createElement('div');
    brand.className = 'label__brand';

    const brandName = document.createElement('span');
    brandName.className = 'label__brand-name';
    brandName.textContent = 'Heards Holy Water';

    const brandMeta = document.createElement('span');
    brandMeta.className = 'label__brand-meta';
    brandMeta.textContent = 'est. 1992';

    brand.append(brandName, brandMeta);
    header.append(logo, brand);

    const lines = document.createElement('div');
    lines.className = 'label__lines';

    const styleLine = createLine('style', styleText, 'style');
    const packagedLine = createLine('packaged', packagedText, 'packaged');

    lines.append(styleLine, packagedLine);

    label.append(header, lines);
    labelsContainer.append(label);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  createLabelElements(styleInput.value.trim(), packagedInput.value.trim());
}

function handleInputChange() {
  createLabelElements(styleInput.value.trim(), packagedInput.value.trim());
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', handleInputChange);

printButton.addEventListener('click', () => {
  window.print();
});

createLabelElements('', '');
