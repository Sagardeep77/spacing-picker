import {
  defaultState,
  SubTypeEnum,
  TypeEnum,
  type Type,
  type PropertyValueType,
  type State,
  type SubType,
  type ValueType,
} from "../../constants";
import { isValidMargin, isValidPadding } from "../../utilities";

/**
 * Manages the state for spacing (margin/padding) values and provides methods to update, validate, and remove them.
 * @remarks
 * Used internally by the SpacingPicker component to synchronize UI and CSS state.
 */
export class ComponentState {
  private _state: State;

  /**
   * Creates a new ComponentState instance with the default state.
   */
  constructor() {
    this._state = defaultState;
  }

  /**
   * Returns the current state object.
   * @returns The current state.
   */
  getState = (): State => {
    return this._state;
  };

  /**
   * Gets the value for a specific type and subtype.
   * @param type - The spacing type ("margin" or "padding").
   * @param subType - The subtype (top, right, bottom, left).
   * @returns The value as a string.
   */
  getValue = (type: "margin" | "padding", subType: SubType): string => {
    return this._state.value[type][subType as keyof PropertyValueType] ?? "";
  };

  /**
   * Validates a value for the given spacing type.
   * @param type - The spacing type.
   * @param value - The value to validate.
   */
  validateValue = (type: Type, value: string): void => {
    if (type === TypeEnum.MARGIN && !isValidMargin(value)) {
      throw new Error("Not a valid Margin value");
    }
    if (type === TypeEnum.PADDING && !isValidPadding(value)) {
      throw new Error("Not a valid Padding value");
    }
  };

  /**
   * Updates the value for a specific type and subtype.
   * @param params - Object containing type, subType, and value.
   * @returns The updated state.
   */
  updateValue = ({ type, subType, value }: ValueType): State => {
    try {
      this.validateValue(type as Type, value);
    } catch (error) {
      return this._state;
    }

    this._state.value[type][subType as keyof PropertyValueType] = value;

    this._state.changed = { margin: {}, padding: {} };
    if (!this._state.changed[type]) {
      this._state.changed[type] = {};
    }
    // Log the state for debugging
    console.log(this._state);
    this._state.changed[type][subType] = value;
    return this._state;
  };

  /**
   * Updates all subtypes for a given type with the same value.
   * @param params - Object containing type and value.
   * @returns The updated state.
   */
  updateAllValue = ({
    type,
    value,
  }: {
    type: "margin" | "padding";
    value: string;
  }): State => {
    this.validateValue(type as Type, value);

    for (const enumValue of Object.values(SubTypeEnum)) {
      this._state.value[type][enumValue as keyof PropertyValueType] = value;
    }
    this._state.changed = { margin: {}, padding: {} };
    if (!this._state.changed[type]) {
      this._state.changed[type] = {
        [SubTypeEnum.TOP]: value,
        [SubTypeEnum.RIGHT]: value,
        [SubTypeEnum.BOTTOM]: value,
        [SubTypeEnum.LEFT]: value,
      };
    }
    for (const enumValue of Object.values(SubTypeEnum)) {
      this._state.changed[type][enumValue as keyof PropertyValueType] = value;
    }
    // Log the state for debugging
    console.log(this._state);
    return this._state;
  };

  /**
   * Removes the value for a specific type and subtype.
   * @param params - Object containing type and subType.
   * @returns The updated state.
   */
  removeValue = ({ type, subType }: ValueType): State => {
    if (type === TypeEnum.MARGIN && type && subType) {
      this._state.value[type][subType as keyof PropertyValueType] = "";
    }
    return this._state;
  };

  /**
   * Removes all values for a given type, resetting to default.
   * @param params - Object containing type.
   * @returns The updated state.
   */
  removeAllValue = ({ type }: { type: "margin" | "padding" }): State => {
    this._state.value[type] = defaultState.value[type];
    return this._state;
  };
}
