"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const redux_form_1 = require("redux-form");
const fieldValidationHelper = require("../../../common/helpers/fieldValidationHelper");
const Field = (props) => (React.createElement(redux_form_1.Field, Object.assign({}, props, { validate: props.validate || fieldValidationHelper.getValidatorsForField(props.name) })));
exports.Field = Field;
//# sourceMappingURL=Field.js.map