frappe.pages['applicant-profile'].on_page_load = function(wrapper) {
 new ApplicantPage(wrapper);
}

ApplicantPage = Class.extend({
	init: function(wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Applicant Profile',
			single_column: false
		});
		this.make()
	},
	make: function() {
		let me = $(this);
		let body = `
			<div class="row user-profile">
		<p class="text-center">
		Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old
		Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old
		</p>
			</div>
						`
						$(frappe.render_template(body,this)).appendTo(this.page.main);
	}
});


