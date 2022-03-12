frappe.pages['budget-applicant-view'].on_page_load = function (wrapper) {
	new MyPage(wrapper);
}

MyPage = Class.extend({
	init: function (wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Budget Applicant',
			single_column: false
		})

		this.make();

	},
	make: function () {
		let me = $(this);
		let body = `<h1>hello</h1>`;
		$(frappe.render_template(body, this)).appendTo(this.page.main);


	}
});


