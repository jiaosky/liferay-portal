import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import vanillaTextMask from 'vanilla-text-mask';

import './NumericRegister.soy.js';
import 'dynamic-data-mapping-form-field-type/metal/FieldBase/index.es';
import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './Numeric.soy.js';
import {Config} from 'metal-state';

class Numeric extends Component {
	static STATE = {

		/**
		 * @default 'integer'
		 * @instance
		 * @memberof Numeric
		 * @type {string}
		 */

		dataType: Config.string().value('integer'),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		fieldName: Config.string(),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		id: Config.string(),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		label: Config.string(),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		name: Config.string().required(),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		placeholder: Config.string(),

		/**
		 * @default false
		 * @instance
		 * @memberof Numeric
		 * @type {?bool}
		 */

		readOnly: Config.bool().value(false),

		/**
		 * @default false
		 * @instance
		 * @memberof Numeric
		 * @type {?(bool|undefined)}
		 */

		required: Config.bool().value(false),

		/**
		 * @default undefined
		 * @instance
		 * @memberof FieldBase
		 * @type {?(bool|undefined)}
		 */

		repeatable: Config.bool(),

		/**
		 * @default true
		 * @instance
		 * @memberof Numeric
		 * @type {?(bool|undefined)}
		 */

		showLabel: Config.bool().value(true),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		spritemap: Config.string(),

		/**
		 * @default object
		 * @instance
		 * @memberof Numeric
		 * @type {object}
		 */

		symbols: Config.shapeOf(
			{
				decimalSymbol: Config.string(),
				thousandsSeparator: Config.string()
			}
		).value(
			{
				decimalSymbol: '.',
				thousandsSeparator: ','
			}
		),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		tip: Config.string(),

		/**
		 * @default undefined
		 * @instance
		 * @memberof FieldBase
		 * @type {?(string|undefined)}
		 */

		tooltip: Config.string(),

		/**
		 * @default undefined
		 * @instance
		 * @memberof Numeric
		 * @type {?(string|undefined)}
		 */

		value: Config.string()
	};

	attached() {
		this.applyMask();
	}

	willReceiveState(event) {
		if (event.dataType && event.dataType.newVal) {
			this.applyMask();
		}
	}

	applyMask() {
		const {dataType, element} = this;
		const inputElement = element.querySelector('input');

		if (this.maskInstance) {
			this.maskInstance.destroy();
		}

		const numberMaskOptions = this.getMaskConfig(dataType);

		const mask = createNumberMask(numberMaskOptions);

		this.maskInstance = vanillaTextMask(
			{
				inputElement,
				mask
			}
		);
	}

	getMaskConfig(dataType) {
		const {symbols} = this;

		let config = {
			allowLeadingZeroes: true,
			includeThousandsSeparator: false,
			prefix: ''
		};

		if (dataType === 'double') {
			config = {
				...config,
				allowDecimal: true,
				decimalLimit: null,
				decimalSymbol: symbols.decimalSymbol
			};
		}

		return config;
	}

	_handleFieldChanged(event) {
		this.emit(
			'fieldEdited',
			{
				fieldInstance: this,
				originalEvent: event,
				value: event.target.value
			}
		);
	}
}

Soy.register(Numeric, templates);

export default Numeric;