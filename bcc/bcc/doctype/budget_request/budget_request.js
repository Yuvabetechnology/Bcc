// Copyright (c) 2022, Yuvabe and contributors
// For license information, please see license.txt




// Copyright (c) 2021, vasanth and contributors
// For license information, please see license.txt

frappe.ui.form.on('Budget Request', {


	setup: function (frm) {
		var total_income=0;
		var total_nb =0;
		
		frm.doc.specify_income_and_revenue.forEach(function(d){
			console.log(d.amount)
			total_income+=d.amount
			
		})
		frm.set_value('total_income',total_income)

		frm.doc.net_balance.forEach(function(d){
			console.log(d.balance)
			total_nb+=d.balance
			
		})
		frm.set_value('total_net_balance',total_nb)
		
		frm.calculate_total_income=function(frm,row){
			var total_income=0;
			
			frm.doc.specify_income_and_revenue.forEach(function(d){
				console.log(d.amount)
				total_income+=d.amount
			})
			frm.set_value('total_income',total_income)

	}
	
},
	refresh: function (frm) {
		$("#total_income").text(frm.doc.total_income)
		$("#total_avm").text(frm.doc.total_av_maintenance)
		$("#total_nb").text(frm.doc.total_net_balance)
		$("#total_salary").text(frm.doc.total_salary)
		$("#total_recurring").text(frm.doc.total_are)
		$("#total_non_recurring").text(frm.doc.total_nre)



	}

});

frappe.ui.form.on('Income And Revenue', {
	income_source_name: function (frm, cdt, cdn) {
		let row = locals[cdt, cdn];
		console.log(row)
		frm.calculate_total_income(frm, row);

	},
	amount: function (frm, cdt, cdn) {
		let row = locals[cdt, cdn];
		frm.calculate_total_income(frm, row);

	}

});
