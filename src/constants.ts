export enum OPTIONS {
  SET_VALUE_TO_20PX = "set value to 20px",
  SET_ALL_VALUE_TO_VALUE = "set all value to value",
  SET_VALUE_TO_AUTO = "set value to auto",
  SET_ALL_VALUE_TO_AUTO = "set all value to auto",
  REMOVE_CURRENT_VALUE = "remove current value",
  REMOVE_ALL_VALUE = "remove all value",
}

export type InputType = {
  type: string;
  subType?: string;
  value?: string;
  shouldUpdateInput?: boolean;
};

export type PropertyValueType = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};
export type Margin = PropertyValueType;
export type Padding = PropertyValueType;

export type State = {
  changed: {
    margin?: Margin;
    padding?: Padding;
  };
  value: {
    margin: Margin;
    padding: Padding;
  };
};

export enum TypeEnum {
  MARGIN = "margin",
  PADDING = "padding",
}
export type Type = TypeEnum.MARGIN | TypeEnum.PADDING;

export enum SubTypeEnum {
  TOP = "top",
  BOTTOM = "bottom",
  RIGHT = "right",
  LEFT = "left",
}
export type SubType =
  | SubTypeEnum.TOP
  | SubTypeEnum.RIGHT
  | SubTypeEnum.BOTTOM
  | SubTypeEnum.LEFT;

export type ValueType = {
  type: "margin" | "padding";
  subType: SubType;
  value: string;
};

export type InputValueType = ValueType & {
  shouldUpdateInput?: boolean;
};
export const defaultStatePropValue = "20px";

export const defaultState = {
  changed: {
    margin: {},
    padding: {},
  },
  value: {
    margin: {
      top: defaultStatePropValue,
      right: defaultStatePropValue,
      bottom: defaultStatePropValue,
      left: defaultStatePropValue,
    },
    padding: {
      top: defaultStatePropValue,
      right: defaultStatePropValue,
      bottom: defaultStatePropValue,
      left: defaultStatePropValue,
    },
  },
};

export const fields = [
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-bottom",
  "padding-left",
  "padding-right",
  "padding-top",
  "padding-bottom",
];
