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

  /**
   * Splits a string by '-' and returns an array of lowercase strings.
   * @param str - The input string.
   * @returns An array of lowercase strings.
   */
  getType = (str: string) => {
    return str.split("-").map((e) => e.toLowerCase());
  };

  /**
   * Extracts the type and subtype from a select element's name attribute.
   * @param str - The select element's name.
   * @returns A tuple containing the type and subtype.
   */
  getTypeFromSelect = (str: string): [Type, SubType] => {
    const [type, subType] = str
      .split("-")
      .map((e) => e.toLowerCase())
      .slice(1);

    return [type as Type, subType as SubType];
  };

  /**
   * Sets the value for a specific type and subtype, updates the state and input if needed.
   * @param params - Object containing type, subType, value, and shouldUpdateInput.
   */
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

  /**
   * Sets the same value for all subtypes of a given type.
   * @param params - Object containing type and value.
   */
  setAllValue = ({ type, value }: InputValueType) => {
    this._state.updateAllValue({ type, value });
    const statePropValue = this._state.getValue(type, SubTypeEnum.TOP) ?? "";
    this._parent.style.setProperty(type, statePropValue);
    const filteredInputElements = this._inputElements.filter((input) =>
      input.getAttribute("name")?.includes(type)
    );
    for (const input of filteredInputElements) {
      input.setAttribute("value", statePropValue);
    }
  };

  /**
   * Removes the value for a specific type and subtype.
   * @param params - Object containing type and subType.
   */
  removeValue = ({ type, subType }: InputValueType) => {
    this._parent.style.removeProperty(`${type}-${subType}`);
    this._state.removeValue({ type, subType, value: "" });
  };

  /**
   * Removes all values for a given type.
   * @param type - The type for which all values should be removed.
   */
  removeAllValue = (type: Type) => {
    for (const subType of Object.values(SubTypeEnum)) {
      this._parent.style.removeProperty(`${type}-${subType}`);
      this._state.removeValue({ type, subType: subType as SubType, value: "" });
      this.setAllValue({ type, subType: subType as SubType, value: "" });
    }
  };

  /**
   * Gets the current value for a specific type and subtype from the parent style.
   * @param params - Object containing type and subType.
   * @returns The current value as a string.
   */
  getCurrentValue = ({ type, subType }: InputType) => {
    return this._parent.style.getPropertyValue(`${type}-${subType}`);
  };

  /**
   * Handles dropdown (select) change events and updates values accordingly.
   * @param event - The change event from the select element.
   */
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
        const currentValue = this._state.getValue(type, subType);
        if (!currentValue) return;
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

  /**
   * Handles input events for value changes in input elements.
   * @param event - The input event from the input element.
   */
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

  /**
   * Creates and appends option elements to a select element.
   * @param selectElement - The select element to populate.
   */
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

  /**
   * Renders all select and input elements, attaches event listeners, and sets default values.
   */
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

  /**
   * Renders the component's HTML template and initializes elements and event listeners.
   */
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
