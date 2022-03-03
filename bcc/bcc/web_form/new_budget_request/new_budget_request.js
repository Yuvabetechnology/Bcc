frappe.ready(function() {
	$("[data-fieldname=income_source_name]").click(function(){
		console.log("clicked")

	})
frappe.web_form.after_load = () => {

	let table = frappe.web_form.fields_dict.specify_income_and_revenue

	table.grid.grid_rows.forEach(row => {
		let field = row.get_field("income_source_name")
		field.df.onchange = () => {
			frappe.msgprint('Please fill all values carefully');
		}
	})
}

	frappe.msgprint('Please fill all values carefully');
	// invoked when clicking a column of a newly inserted row.

})