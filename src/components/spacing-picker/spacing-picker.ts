import spacingPicker from "./spacing-picker.template.html?raw";
import {
  defaultStatePropValue,
  OPTIONS,
  SubTypeEnum,
  type InputType,
  type InputValueType,
  type SubType,
  type Type,
} from "../../constants";
import { ComponentState } from "./spacing-picker-logic";

export class SpacingPicker extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _grandParent!: HTMLElement;
  private _parent!: HTMLElement;
  private _inputElements!: HTMLElement[];
  private _selectElements!: HTMLElement[];
  private _state = new ComponentState();

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

  getTypeFromSelect = (str: string): [Type, SubType] => {
    const [type, subType] = str
      .split("-")
      .map((e) => e.toLowerCase())
      .slice(1);

    return [type as Type, subType as SubType];
  };

  setValue = ({ type, subType, value, shouldUpdateInput }: InputValueType) => {
    this._state.updateValue({ type, subType, value });
    const key = `${type}-${subType}`;

    const statePropValue = this._state.getValue(type, subType) ?? "";
    this._parent.style.setProperty(key, statePropValue);
    if (!shouldUpdateInput) return; // if triggered from input, no need to update

    const input = this._inputElements.find(
      (ele) => (ele as HTMLInputElement).name === key
    ) as HTMLInputElement | undefined;
    if (input) {
      //update the input value if coming from dropdown
      input.value = statePropValue;
    }
  };

  setAllValue = ({ type, value }: InputValueType) => {

    this._state.updateAllValue({ type, value });
    const statePropValue = this._state.getValue(type,SubTypeEnum.TOP) ?? "";
    this._parent.style.setProperty(type, statePropValue);
    const filteredInputElements = this._inputElements.filter((input) =>
      input.getAttribute("name")?.includes(type)
    );
    for (const input of filteredInputElements) {
      input.setAttribute("value", statePropValue);
    }
  };

  removeValue = ({ type, subType }: InputValueType) => {
    this._parent.style.removeProperty(`${type}-${subType}`);
    this._state.removeValue({ type, subType, value: "" });
  };

  removeAllValue = (type : Type) => {
    for(const subType of Object.values(SubTypeEnum)){
        this._parent.style.removeProperty(`${type}-${subType}`);
        this._state.removeValue({type, subType: subType as SubType, value : ""});
        this.setAllValue({type, subType: subType as SubType, value : ""})
    }
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
        const currentValue = this._state.getValue(type,subType);
        if(!currentValue) return ;
        this.setAllValue({
          type,
          subType,
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
          subType,
          value: "auto",
          shouldUpdateInput: true,
        });
        break;
      }

      case OPTIONS.REMOVE_CURRENT_VALUE: {
        this.removeValue({ type, subType, value: "" });
        break;
      }

      case OPTIONS.REMOVE_ALL_VALUE: {
        this.removeAllValue(type);
        break;
      }
    }
  };

  handleInput = (event: Event) => {
    event.stopPropagation();
    if (!event.target) return;
    const { name, value } = event.target as HTMLInputElement;
    const [type, subType] = this.getType(name);

    const inputOptions = {
      type: type as Type,
      subType: subType as SubType,
      value,
    };
    this.setValue(inputOptions);
  };

  createOptions = (selectElement: HTMLElement) => {
    OPTIONS;
    for (const value of Object.values(OPTIONS)) {
      if (
        value === OPTIONS.SET_ALL_VALUE_TO_AUTO ||
        value === OPTIONS.SET_VALUE_TO_AUTO
      ) {
        const isPaddingSelect = selectElement
          .getAttribute("name")
          ?.includes("padding");
        if (isPaddingSelect) return;
      }
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
      input.setAttribute("value", defaultStatePropValue);
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


/* Pending items */


/* 
1. don't set invalid values
2. 

*/


