



	// frappe.web_form.add_button_to_header(" Sumbit","",function () {
	// 	if(!frappe.web_form.doc.name){
	// 		frappe.msgprint(" You Must save the Docment Before Submit")
	// 	}else{
	// 		frappe.call({
	// 			method: 'frappe.client.submit',
	// 			args: {
	// 				"doc": frappe.web_form.doc,
	// 			},
	// 			// disable the button until the request is completed
	// 			btn: $('.primary-action'),
				
	// 			// freeze the screen until the request is completed
	// 			freeze: true,
	// 			callback: (r) => {
	// 				frappe.msgprint(r)
	// 			},
	// 			error: (r) => {
	// 				frappe.throw(" Submit Error")
	// 			}
	// 		})

	// 	}

		
	
	// });


	// frappe.call({
	// 	method: 'bcc.bcc.doctype.budget_request.budget_request.get_application',
	

	// 	callback: (r) => {
	// 		var application = [];
	// 		console.log(r.message)
	// 		application.push(r.message[0].applicant_name)
	// 		frappe.web_form.set_df_property('budget_application','options', application);

	// 		console.log(application)
	// 	},
	// 	error: (r) => {
	// 		frappe.throw(" Submit Error")
	// 	}
	// })

function reloadCurrentStateOptions() {
let table = frappe.web_form.fields_dict.specify_income_and_revenue;
table.grid.grid_rows.forEach(row => {
	let field = row.get_field("select_1")
	field.df.onchange = () => {
		console.log("hello")
	}
})

}
frappe.ready(function() {

	frappe.web_form.events.on('after_load', reloadCurrentStateOptions);
	
})
