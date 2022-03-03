// Copyright (c) 2022, Yuvabe and contributors
// For license information, please see license.txt




// Copyright (c) 2021, vasanth and contributors
// For license information, please see license.txt

frappe.ui.form.on('Budget Request', {

    //setup
    setup: function (frm) {
        var selftotal = new Map();
        var servicetotal = new Map();
        frm.get_application_cat = function (application) {

            if (!application) {

                frm.set_value("request_category", '')
            } else {

                frappe.call({
                    method: "bcc.bcc.doctype.budget_request.api.get_application_catagory",
                    args: {
                        "doc_name": application
                    },
                    callback: function (r) {
                        console.log(r.message.category)
                        frm.set_value("request_category", r.message.category)

                    }
                })

            }

        },
            frm.get_budget_settings = function (frm, row) {
                frappe.call({
                    method: 'bcc.bcc.doctype.budget_request.api.get_budget_settings',
                    callback: function (r) {
                        let types = r.message.avm_costing

                        if (row.maintenance_type === '' || row.maintenance_type.length < 0) {
                            row.amount = 0;
                            frm.refresh_field('auroville_maintenance');
                            frm.calculate_av_maintenance(frm, row);
                        } else {
                            types.forEach(d => {
                                if (d.maintenance_type == row.maintenance_type) {
                                    row.amount = d.amount;
                                    frm.refresh_field('auroville_maintenance');
                                    frm.calculate_av_maintenance(frm, row);
                                }
                            })

                        }

                    }
                })

            },
            frm.get_budget__new_settings = function (frm, row) {
                frappe.call({
                    method: 'bcc.bcc.doctype.budget_request.api.get_budget_settings',
                    callback: function (r) {
                        let types = r.message.avm_costing
                        let service_total = 0;
                        let self_total = 0;

                        if (row.maintenance_type === '' || row.maintenance_type.length < 0) {
                            row.maintenance_amount = 0;
                            frm.refresh_field('self_service_maintenace');
                        } else {
                            types.forEach(d => {
                                if (d.code == row.maintenance_type) {
                                    row.maintenance_amount = d.amount;

                                    frm.refresh_field('self_service_maintenace');
                                    frm.calculate_self_maintenance(frm, row);

                                }
                            })

                        }

                    }
                })

            },
            frm.incomesource_duplicate = function (frm, row) {
                frm.doc.specify_income_and_revenue.forEach(d => {
                    if (row.income_source_name == '' || row.idx == d.idx) {
                        console.log("pass")
                    } else {
                        if (row.income_source_name == d.income_source_name) {
                            row.income_source_name = '';
                            frappe.msgprint(`${d.income_source_name} already exists`);
                            frm.refresh_field('specify_income_and_revenue');
                        }
                    }
                });
            },
            frm.avm_dulicate = function (frm, row) {
                frm.doc.auroville_maintenance.forEach(d => {
                    if (row.person_name == '' || row.idx == d.idx) {
                        console.log("pass")
                    } else {
                        if (row.person_name == d.person_name) {
                            row.person_name = '';
                            frappe.msgprint(`${d.person_name} already exists`);
                            frm.refresh_field('auroville_maintenance');
                        }
                    }
                });

            },

            frm.calculate_total_income = function (frm, row) {


                let income = 0;
                frm.doc.specify_income_and_revenue.forEach(d => {
                    income += d.amount;
                });
                frm.set_value('total_income', income);
            },
            frm.calculate_total_netbalance = function (frm, row) {
                let revenue = 0;
                frm.doc.net_balance.forEach(d => {
                    revenue += d.balance;
                });
                frm.set_value('total_net_balance', revenue);
            },
            frm.account_name_duplicate = function (frm, row,) {
                frm.doc.net_balance.forEach(d => {
                    if (row.account_name == '' || row.idx == d.idx) {
                        console.log("pass")
                    } else {
                        if (row.account_name == d.account_name) {
                            row.account_name = '';
                            frappe.msgprint(`${d.account_name} already exists`);
                            frm.refresh_field('net_balance');
                        }
                    }
                });
            },
            //Maintenance Calculation
            frm.calculate_av_maintenance = function (frm, row) {

                let avm_total = 0;
                frm.doc.auroville_maintenance.forEach(d => {
                    avm_total += d.amount;

                });
                frm.set_value('total_av_maintenance', avm_total);

            },
            //end of maintenance cal
            frm.self_service_maintenace_duplicate = function (frm, row) {

                    frm.doc.self_service_maintenace.forEach(d => {
                        if(row.person_name == '' || row.idx == d.idx){

                        }else{
                            if(row.person_name == d.person_name){
                                row.person_name = '';
                                frappe.msgprint(`${d.person_name} already exists`);
                                frm.refresh_field('self_service_maintenace');
                        }
                    }

                    })

            },


            //self maintenance 
            frm.calculate_self_maintenance = function (frm, row) {

                let selfmaintenance = frm.doc.self_service_maintenace
                let self_total = 0;
                let service_total = 0;
                if (selfmaintenance.length > 0) {
                    selfmaintenance.forEach(d => {
                        if (d.support_type == 'Self') {
                            self_total += d.maintenance_amount;
                            frm.set_value('total_self', self_total);
                            console.log(self_total)
                        } else if (d.support_type == 'Service') {

                            service_total += d.maintenance_amount;

                            console.log(service_total)
                        } else {

                        }
                    })

                    frm.set_value('total_service', service_total);
                    frm.set_value('total_self', self_total);

                } else {
                    frm.set_value('total_self', 0);
                    frm.set_value('total_service', 0);
                }
            }//end for self maintenance
            frm.salary_wages_calculation = function (frm, row) {
                let salary_total = 0;
                frm.doc.salary_wages.forEach(d => {
                   salary_total += d.amount;

                });
                frm.set_value('total_salary', salary_total);

            },
            frm.salary_dulicate = function (frm, row) {
                frm.doc.salary_wages.forEach(d => {
                    if (row.employee_name == '' || row.idx == d.idx) {
                        console.log("pass")
                    } else {
                        if (row.employee_name == d.employee_name) {
                            row.employee_name = '';
                            frappe.msgprint(`${d.employee_name} already exists`);
                            frm.refresh_field('net_balance');
                        }
                    }
                });

            },
            frm.expense_name_duplicate = function (frm, row) {
                frm.doc.administrative_recurring_expense.forEach(d => {
                    if (row.expense_name == '' || row.idx == d.idx) {
                        console.log("pass")

                    }else{
                        if(row.expense_name == d.expense_name){
                            row.expense_name = '';
                            frappe.msgprint(`${d.expense_name} already exists`);
                        }
                    }
                })

            },
            frm.calcualte_are_required_total = function (frm, row) {
                let are_required_total = 0;
                frm.doc.administrative_recurring_expense.forEach(d => {
                    are_required_total += d.required_amount;
                });
                frm.set_value('total_recurring_administrative_cost_required', are_required_total);
            },
            frm.calculate_are_current_total = function (frm, row) {
                let are_current_total = 0;
                frm.doc.administrative_recurring_expense.forEach(d => {
                    are_current_total += d.current_spending;
                });
                frm.set_value('total_recurring_administrative_cost_current', are_current_total);
            },
            frm.school_calcualte_are_required_total = function (frm, row) {
                let school_are_required_total = 0;
                frm.doc.school_recurring_expense.forEach(d => {
                    school_are_required_total += d.required_amount;
                })
                frm.set_value('total_ares_required', school_are_required_total);
            },
            frm.school_calculate_are_current_total = function (frm, row) {
                let school_are_current_total = 0;
                frm.doc.school_recurring_expense.forEach(d => {
                    school_are_current_total += d.current_spending;
                })
                frm.set_value('total_ares_current', school_are_current_total);
            },
            frm.school_expense_name_duplicate= function (frm, row) {
                frm.doc.school_recurring_expense.forEach(d => {
                    if (row.expense_name == '' || row.idx == d.idx) {
                        console.log("pass")
                    } else {
                        if (row.expense_name == d.expense_name) {
                            row.expense_name = '';
                            frappe.msgprint(`${d.expense_name} already exists`);
                            frm.refresh_field('net_balance');
                        }
                    }
                });

            },
            frm.non_recurring_expenses_duplicate = function (frm, row) {
                frm.doc.non_recurring_expenses.forEach(d => {
                    if (row.description == '' || row.idx == d.idx) {
                        console.log("pass")
                    } else {
                        if (row.description == d.description) {
                            row.description = '';
                            frappe.msgprint(`${d.description} already exists`);
                            frm.refresh_field('non_recurring_expenses');
                    }
                }

                    
                })


            },
            frm.calculate_non_recurring_expenses = function (frm, row) {
                let non_recurring_total = 0;
                frm.doc.non_recurring_expenses.forEach(d => {
                    non_recurring_total += d.yearly_total;
                });
                frm.set_value('total_non_recurring_expenses', non_recurring_total);

            }

    },
    //end of setup

    //referesh 
    refresh: function (frm) {
        if (frm.doc.docstatus === 0) {
            frm.add_custom_button(__('Cancel'), function () {
                frm.save('Cancel');
            });
        }
        frm.get_application_cat = function (application) {

            if (!application) {

                frm.set_value("request_category", '')
            } else {

                frappe.call({
                    method: "bcc.bcc.doctype.budget_request.api.get_application_catagory",
                    args: {
                        "doc_name": application
                    },
                    callback: function (r) {
                        console.log(r.message.category)
                        frm.set_value("request_category", r.message.category)

                    }
                })

            }

        }
    }
});//main end 

frappe.ui.form.on('Income And Revenue', {
    specify_income_and_revenue_remove: function (frm) {
        console.log("remove")
        frm.calculate_total_income(frm);
    },
    income_source_name: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.incomesource_duplicate(frm, row, row.income_source_name);
    },
    amount: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.calculate_total_income(frm, row);
    }

});

frappe.ui.form.on('Net Balance All Accounts', {
    net_balance_remove: function (frm) {
        console.log("remove")
        frm.calculate_total_netbalance(frm);
    },
    balance: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.calculate_total_netbalance(frm, row);
    },
    account_name: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.account_name_duplicate(frm, row);
    }

})

frappe.ui.form.on('Auroville Maintenance', {
    auroville_maintenance_remove: function (frm) {
        console.log("remove")
        frm.calculate_av_maintenance(frm);
    },
    person_name: function (frm, cdt, cdn) {

        let row = locals[cdt][cdn];
        frm.avm_dulicate(frm, row, row.person_name);

    },
    maintenance_type: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.get_budget_settings(frm, row)

    }
})
frappe.ui.form.on('Budget Request', {
    'budget_application': function (frm) {
        frm.get_application_cat(frm.doc.budget_application)
    }
});

frappe.ui.form.on('Self And Service Support Maintenance', {
    self_service_maintenace_remove: function (frm) {

        frm.calculate_self_maintenance(frm)
    },
    maintenance_type: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        frm.get_budget__new_settings(frm, row, row.support_type)

    },
    support_type: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        row.maintenance_amount = 0;
        console.log("hello")
        frm.refresh_field('self_service_maintenace');

    },
    person_name: function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.self_service_maintenace_duplicate(frm,row)
    }


})

frappe.ui.form.on('Salaries And Wages', {
    salary_wages_remove: function (frm) {
        frappe.msgprint("remove");
        frm.salary_wages_calculation(frm);

    },
    employee_name: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.salary_dulicate(frm, row);
    },
    amount: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frm.salary_wages_calculation(frm, row);
    }

    
})

frappe.ui.form.on('Required Administrative Recurring Expenses',{
    administrative_recurring_expense_remove:function(frm){
frm.calcualte_are_required_total(frm);
frm.calculate_are_current_total(frm);
    },
    expense_name:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.expense_name_duplicate(frm,row)
    },
    required_amount:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.calcualte_are_required_total(frm,row)

    },
    current_spending:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.calculate_are_current_total(frm,row)
    }
})

frappe.ui.form.on('Administrative Recurring Expenses for Schools',{
    school_recurring_expense_remove:function(frm){
        frm.school_calcualte_are_required_total(frm);
        frm.school_calculate_are_current_total(frm);

    },
    expense_name:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.school_expense_name_duplicate(frm,row)

    },
    required_amount:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.school_calcualte_are_required_total(frm,row)

    },
    current_spending:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.school_calculate_are_current_total(frm,row)

    }

})
frappe.ui.form.on('Non Recurring  And Capital Expenses',{
    non_recurring_expenses_remove:function(frm){
        frm.calculate_non_recurring_expenses(frm);

    },
    description:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        frm.non_recurring_expenses_duplicate(frm,row)
    },
    qty:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        row.yearly_total= 0;
        row.yearly_total= row.unit_cost*row.qty;
        frm.refresh_field('non_recurring_expenses');
        frm.calculate_non_recurring_expenses(frm);
    },
    unit_cost:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        console.log(row.unit_cost*row.qty)
        row.yearly_total= row.unit_cost*row.qty;
        frm.refresh_field('non_recurring_expenses');
        frm.calculate_non_recurring_expenses(frm);
    }



})

frappe.ui.form.on('Budget Request',{
    setup: function(frm) {
        cur_frm.set_query("budget_application", function() {
            return {
                filters: {
                    "docstatus":'1'
                                }
            }
        });
    }
})