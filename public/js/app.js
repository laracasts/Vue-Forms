class Errors {
	/**
	 * Create a new Errors instance.
	 */
	constructor() {
		this.errors = {};
	}


	/**
	 * Determine if an errors exists for the given field.
	 */
	has(field) {
		return this.errors.hasOwnProperty(field);
	}


	/**
	 * Determine if we have any errors.
	 */
	any() {
		return Object.keys(this.errors).length > 0;
	}


	/**
	 * Retrieve the error message for a field.
	 */
	get(field) {
		if (this.errors[field]) {
			return this.errors[field][0];
		}
	}


	/**
	 * Record the new errors.
	 *
	 * @param {object} errors
	 */
	record(errors) {
		this.errors = errors;
	}


	/**
	 * Clear one or all error fields.
	 *
	 * @param {string|null} field
	 */
	clear(field) {
		if (field) {
			delete this.errors[field];

			return;
		}

		this.errors = {};
	}
}


class Form {
	/**
	 * Create a new Form instance.
	 * 
	 * @param {object} data
	 */
	constructor(data) {
		this.originalData = data;

		for (let field in data) {
			this[field] = data[field];
		}

		this.errors = new Errors();
	}


	/**
	 * Fetch all relevant data for the form.
	 */
	data() {
		let data = Object.assign({}, this);

		delete data.originalData;
		delete data.errors;

		return data;
	}


	/**
	 * Reset the form fields.
	 */
	reset() {
		for (let field in this.originalData) {
			this[field] = '';
		}
	}


	/**
	 * Submit the form.
	 * 
	 * @param  {string} requestType 
	 * @param  {string} url         
	 */
	submit(requestType, url) {
		axios[requestType](url, this.data())
			.then(this.onSuccess.bind(this))
			.catch(this.onFail.bind(this))
	}


	/**
	 * Handle a successful form submission.
	 * 
	 * @param {object} response
	 */
	onSuccess(response) {
		alert(response.data.message); // temporary

		this.errors.clear();
		this.reset();
	}

	/**
	 * Handle a failed form submission.
	 * 
	 * @param {object} error
	 */
	onFail(error) {
		this.errors.record(error.response.data);
	}
}


new Vue({
	el: '#app',

	data: {
		form: new Form({
			name: '',
			description: ''
		})
	},

	methods: {
		onSubmit() {
			this.form.submit('post', '/projects');
		}
	}
});
