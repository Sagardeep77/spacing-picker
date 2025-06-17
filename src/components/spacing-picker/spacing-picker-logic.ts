// import { OPTIONS, TYPES } from "../../constants";
// import { isValidMargin, isValidPadding } from "../../utilities";

// const grandParentElement = document.getElementById('grandParent') as HTMLElement;
// const parentElement = document.getElementById('parent') as HTMLElement;

// Reference point is parent element.
// We will modify the margin of parent and padding of parent element.

// function getType(str : string) {
//   return str.split('-').map(e => e.toLowerCase());
// }

// function getTypeFromSelect(str : string) {
//   return str.split('-').map(e => e.toLowerCase()).slice(1);
// }

// function createOptions(selectElement : HTMLElement) {
//     OPTIONS
//   for (const value of Object.values(OPTIONS)) {
//     const optionElement = document.createElement('option');
//     optionElement.value = value;
//     optionElement.innerHTML = value;
//     selectElement.appendChild(optionElement);
//   }
// }

// function renderAllSelect() {
//   const selectElements = grandParentElement.getElementsByTagName('select');
//   for (const select of selectElements) {
//     createOptions(select);
//     select.addEventListener('change', handleDropdown);
//   }

//   const inputElements = grandParentElement.getElementsByTagName('input');
//   for (const input of inputElements) {
//     input.addEventListener('input', handleInput);
//   }
// }

// const handleInput = function (event:Event) {
//   console.log("Input triggered")
//   event.stopPropagation();
//   if(!event.target) return;
//   const { name, value } = event.target as HTMLInputElement;
//   const [type, subType] = getType(name);

//   if (type === TYPES.MARGIN && !isValidMargin(value)) {
//     throw new Error("Not a valid Margin value");
//   }

//   if (type === TYPES.PADDING && !isValidPadding(value)) {
//     throw new Error("Not a valid Padding value");
//   }

//   const inputOptions = {
//     type,
//     subType,
//     value
//   };
//   setValue(inputOptions);
// };


// const setValue = function ({ type, subType, value } : InputType) {
//   parentElement.style[`${type}-${subType}`] = value;
// };

// const setAllValue = function ({ type, value } : InputType) {
//   parentElement.style[type] = value;
// };

// const removeValue = function ({ type, subType } : InputType) {
//   parentElement.style.removeProperty(`${type}-${subType}`);
// };

// const removeAllValue = function ({ type } : InputType) {
//   parentElement.style.removeProperty(type);
// };

// const getCurrentValue = function ({ type, subType } : InputType) {
//   return parentElement.style[`${type}-${subType}`];
// };

// const handleDropdown = function (event: Event) {
//     console.log("Dropdown triggered")

//   event.stopPropagation();
//   const { name, value } = event.target as HTMLInputElement;
//   const [type, subType] = getTypeFromSelect(name);

//   switch (value) {
//     case OPTIONS.SET_VALUE_TO_20PX: {
//       setValue({
//         type,
//         subType,
//         value: '20px'
//       });
//       break;
//     }

//     case OPTIONS.SET_ALL_VALUE_TO_VALUE: {
//       const currentValue = getCurrentValue({ type, subType });
//       setAllValue({
//         type,
//         value: currentValue
//       });
//       break;
//     }

//     case OPTIONS.SET_VALUE_TO_AUTO: {
//       setValue({
//         type,
//         subType,
//         value: 'auto'
//       });
//       break;
//     }

//     case OPTIONS.SET_ALL_VALUE_TO_AUTO: {
//       setAllValue({
//         type,
//         value: 'auto'
//       });
//       break;
//     }

//     case OPTIONS.REMOVE_CURRENT_VALUE: {
//       removeValue({ type, subType });
//       break;
//     }

//     case OPTIONS.REMOVE_ALL_VALUE: {
//       removeAllValue({ type });
//       break;
//     }
//   }

//   if (type === TYPES.PADDING && !isValidPadding(getCurrentValue({ type, subType }))) {
//     throw new Error("Not a valid Padding value");
//   }
// };

// renderAllSelect();
