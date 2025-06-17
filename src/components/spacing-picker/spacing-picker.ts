import spacingPicker from "./spacing-picker.template.html?raw";
import { OPTIONS, TYPES, type InputType } from "../../constants";
import { isValidMargin, isValidPadding } from "../../utilities";

export class SpacingPicker extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _grandParent!: HTMLElement;
  private _parent!: HTMLElement;
  private _inputElements!: HTMLElement[];
  private _selectElements!: HTMLElement[];
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
  }
  connectedCallback() {
    // this.shadowRoot.addEventListener
  }

  disconnectedCallback() {}

  getType = (str: string) => {
    return str.split("-").map((e) => e.toLowerCase());
  };

  getTypeFromSelect = (str: string) => {
    return str
      .split("-")
      .map((e) => e.toLowerCase())
      .slice(1);
  };

  setValue = ({
    type,
    subType,
    value,
    shouldUpdateInput = false,
  }: InputType) => {
    this._parent.style.setProperty(`${type}-${subType}`, value ?? "");
    if (!shouldUpdateInput) return;
    const input = this._inputElements.find(
      (ele) => (ele as HTMLInputElement).name === "margin-top"
    ) as HTMLInputElement | undefined;
    if (input) {
      input.value = value ?? "";
    }
  };

  setAllValue = ({ type, value }: InputType) => {
    this._parent.style.setProperty(type, value ?? "");

    for (const input of this._inputElements) {
      input.setAttribute("value", value ?? "");
    }
  };

  removeValue = ({ type, subType }: InputType) => {
    this._parent.style.removeProperty(`${type}-${subType}`);
  };

  removeAllValue = ({ type }: InputType) => {
    this._parent.style.removeProperty(type);
  };

  getCurrentValue = ({ type, subType }: InputType) => {
    return this._parent.style.getPropertyValue(`${type}-${subType}`);
  };

  handleDropdown = (event: Event) => {
    event.stopPropagation();
    const { name, value } = event.target as HTMLInputElement;
    const [type, subType] = this.getTypeFromSelect(name);

    switch (value) {
      case OPTIONS.SET_VALUE_TO_20PX: {
        this.setValue({
          type,
          subType,
          value: "20px",
          shouldUpdateInput: true,
        });
        break;
      }

      case OPTIONS.SET_ALL_VALUE_TO_VALUE: {
        const currentValue = this.getCurrentValue({ type, subType });
        this.setAllValue({
          type,
          value: currentValue,
        });
        break;
      }

      case OPTIONS.SET_VALUE_TO_AUTO: {
        this.setValue({
          type,
          subType,
          value: "auto",
          shouldUpdateInput: true,
        });
        break;
      }

      case OPTIONS.SET_ALL_VALUE_TO_AUTO: {
        this.setAllValue({
          type,
          value: "auto",
        });
        break;
      }

      case OPTIONS.REMOVE_CURRENT_VALUE: {
        this.removeValue({ type, subType });
        break;
      }

      case OPTIONS.REMOVE_ALL_VALUE: {
        this.removeAllValue({ type });
        break;
      }
    }

    if (
      type === TYPES.PADDING &&
      !isValidPadding(this.getCurrentValue({ type, subType }))
    ) {
      throw new Error("Not a valid Padding value");
    }
  };

  handleInput = (event: Event) => {
    console.log("Input triggered");
    event.stopPropagation();
    if (!event.target) return;
    const { name, value } = event.target as HTMLInputElement;
    const [type, subType] = this.getType(name);

    if (type === TYPES.MARGIN && !isValidMargin(value)) {
      throw new Error("Not a valid Margin value");
    }

    if (type === TYPES.PADDING && !isValidPadding(value)) {
      throw new Error("Not a valid Padding value");
    }

    const inputOptions = {
      type,
      subType,
      value,
    };
    this.setValue(inputOptions);
  };

  createOptions = (selectElement: HTMLElement) => {
    OPTIONS;
    for (const value of Object.values(OPTIONS)) {
      const optionElement = document.createElement("option");
      optionElement.value = value;
      optionElement.innerHTML = value;
      selectElement.appendChild(optionElement);
    }
  };

  renderAllSelect = () => {
    if (!this._grandParent) {
      throw new Error("No  html element with id grandParent");
    }
    const selectElements = this._grandParent.getElementsByTagName("select");
    this._selectElements = Array.from(selectElements);
    for (const select of this._selectElements) {
      this.createOptions(select);
      select.addEventListener("change", this.handleDropdown);
    }

    const inputElements = this._grandParent.getElementsByTagName("input");
    this._inputElements = Array.from(inputElements);
    for (const input of inputElements) {
      input.addEventListener("input", this.handleInput);
    }
  };

  render = () => {
    this._shadowRoot.innerHTML = spacingPicker;
    const grandParent = this._shadowRoot.getElementById("grandParent");
    const parent = this._shadowRoot.getElementById("parent");

    if (!grandParent) throw new Error("No  html element with id grandParent");
    if (!parent) throw new Error("No  html element with id parent");

    this._grandParent = grandParent;
    this._parent = parent;
    this.renderAllSelect();
  };
}

customElements.define("spacing-picker", SpacingPicker);
