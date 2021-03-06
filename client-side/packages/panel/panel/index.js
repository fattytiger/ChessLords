// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  // html template for panel
  template: `
    <h2>panel</h2>
    <hr />
    <div>State: <span id="label">--</span></div>
    <hr />
    <ui-button id="btn">Send To Main</ui-button>
  `,

  // element and variable binding
  $: {
    btn: '#btn',
    label: '#label',
  },

  // method executed when template and styles are successfully loaded and initialized
  ready () {
    this.$btn.addEventListener('confirm', () => {
      this.$label.innerText = 'Hello World';
      setTimeout(() => {
        this.$label.innerText = '--';
      }, 500);
      Editor.Ipc.sendToMain('panel:clicked');
    });
  },

  // register your ipc messages here
  messages: {
    'panel:hello' (event) {
      this.$label.innerText = 'Hello!';
    }
  }
});