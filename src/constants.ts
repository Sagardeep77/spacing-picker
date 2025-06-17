export enum TYPES {
  MARGIN = "margin",
  PADDING ="padding"
};

export enum OPTIONS {
  SET_VALUE_TO_20PX = 'set value to 20px',
  SET_ALL_VALUE_TO_VALUE = 'set all value to value',
  SET_VALUE_TO_AUTO = 'set value to auto',
  SET_ALL_VALUE_TO_AUTO = 'set all value to auto',
  REMOVE_CURRENT_VALUE = 'remove current value',
  REMOVE_ALL_VALUE ='remove all value'
};

export type InputType  = {
    type : string;
    subType? : string;
    value?: string;
    shouldUpdateInput?:boolean
}
