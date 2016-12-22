class Errors {
	constructor() {
		this.errors = {};
	}

	has(field) {
		return this.errors.hasOwnProperty(field);
	}

	any() {
		return Object.keys(this.errors).length > 0;
	}

	get(field) {
		if (this.errors[field]) {
			return this.errors[field][0];
		}
	}

	record(errors) {
		this.errors = errors;
	}

	clear(field) {
		delete this.errors[field];
	}
}

new Vue({
	el: '#app',

	data: {
		name: '',
		description: '',
		errors: new Errors()
	},

	methods: {
		onSubmit() {
			axios.post('/projects', this.$data)
				.then(this.onSuccess)
				.catch(error => this.errors.record(error.response.data));
		},

		onSuccess(response) {
			alert(response.data.message);

			form.reset(); // Cliffhanger duh duh duh
		}
	}
});


