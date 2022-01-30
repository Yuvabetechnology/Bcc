frappe.ready(function() {
	frappe.web_form.add_button_to_header(" Sumbit","",function () {

		frappe.call({
			method: 'bcc.bcc.doctype.budget_request.budget_request.submit_info',
			args: {
				profile: 'Test'
			},
			// disable the button until the request is completed
			btn: $('.primary-action'),
			// freeze the screen until the request is completed
			freeze: true,
			callback: (r) => {
				// on success
			},
			error: (r) => {
				// on error
			}
		})
		
	
	});
})