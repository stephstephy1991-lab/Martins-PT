// Open and close the mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation' : 'Open navigation'
  );
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Health tips shown when a visitor clicks a topic
const tips = {
  sleep: {
    eyebrow: 'SLEEP · ONE SMALL CHANGE',
    title: 'Try a calmer bedtime.',
    intro: 'A regular bedtime routine can help you get ready for sleep. You could try:',
    items: [
      'Go to bed and wake up at about the same time each day.',
      'Do something quiet before bed, like reading.',
      'Keep your room comfortable, quiet, and dark.',
      'If you often have trouble sleeping, talk to a trusted adult or health professional.'
    ]
  },
  food: {
    eyebrow: 'FOOD · CHOOSE A VARIETY',
    title: 'Choose a variety of foods.',
    intro: 'A healthy diet includes different foods. Here are a few ideas:',
    items: [
      'Eat fruits and vegetables in different colors.',
      'Choose foods like beans, eggs, fish, or meat, and add rice or bread.',
      'Drink water during the day.',
      'Ask a health professional if you have questions about your diet.'
    ]
  },
  move: {
    eyebrow: 'EXERCISE · FIND AN ACTIVITY',
    title: 'Find ways to be active.',
    intro: 'Exercise helps keep your body strong. Try an activity you enjoy:',
    items: [
      'Take a walk or stretch during a break.',
      'Dance, play a sport, or ride a bike.',
      'Start slowly and take breaks when you need them.',
      'Ask an adult or health professional if you have questions about exercise.'
    ]
  }
};

// Fill and open the tips window
const dialog = document.querySelector('#tip-dialog');

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const tip = tips[button.dataset.open];

    document.querySelector('#dialog-eyebrow').textContent = tip.eyebrow;
    document.querySelector('#dialog-title').textContent = tip.title;
    document.querySelector('#dialog-intro').textContent = tip.intro;

    const list = document.querySelector('#dialog-list');
    list.replaceChildren(
      ...tip.items.map(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        return listItem;
      })
    );

    dialog.showModal();
  });
});

// Close the tips window
document.querySelector('.dialog-close').addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// Check the sample registration form and show its welcome message
const form = document.querySelector('#signup-form');
const successPanel = document.querySelector('#success-panel');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

form.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.querySelector('#full-name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const hasAgreed = document.querySelector('#consent').checked;

  document.querySelector('#name-error').textContent =
    name.length < 2 ? 'Please enter your name.' : '';

  document.querySelector('#email-error').textContent =
    emailPattern.test(email) ? '' : 'Please enter a valid email address.';

  document.querySelector('#consent-error').textContent =
    hasAgreed ? '' : 'Please check this box to try the demo.';

  if (name.length < 2 || !emailPattern.test(email) || !hasAgreed) {
    return;
  }

  document.querySelector('#success-name').textContent = name.split(/\s+/)[0];
  form.hidden = true;
  successPanel.hidden = false;
  successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Let the visitor return to the form
document.querySelector('.edit-signup').addEventListener('click', () => {
  successPanel.hidden = true;
  form.hidden = false;
  document.querySelector('#full-name').focus();
});