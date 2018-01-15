"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const redux_form_1 = require("redux-form");
const fieldValidationHelper = require("../../helpers/fieldValidationHelper");
const FieldArray = (props) => (React.createElement(redux_form_1.FieldArray, Object.assign({}, props, { validate: props.validate || fieldValidationHelper.getValidatorsForField(props.name) })));
exports.FieldArray = FieldArray;
//# sourceMappingURL=FieldArray.js.map