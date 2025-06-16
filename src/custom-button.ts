import button from './custom-button.template.html?raw';

class CustomButtonComponent extends HTMLElement{
  private _shadow : ShadowRoot;
  private _buttonClickCount : number;
  constructor(){
    super();
    this._buttonClickCount = 0;
    this._shadow = this.attachShadow({mode: 'open'});
    this.render();
  }

  connectedCallback(){
    this.shadowRoot?.addEventListener('click', this.handleInput);
  }
  disconnectedCallback(){
    this.shadowRoot?.removeEventListener('click',this.handleInput);
  }

  handleInput = (event : Event) => {
    this._buttonClickCount++;
    const customButton = this._shadow.getElementById("customButton") as HTMLButtonElement;
    customButton.innerHTML = `Clicked : ${this._buttonClickCount}`
    event.stopPropagation();
  }

  render(){
    this._shadow.innerHTML = button;
  }
}

customElements.define('custom-button', CustomButtonComponent);