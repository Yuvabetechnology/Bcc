# Copyright (c) 2022, Yuvabe and contributors
# For license information, please see license.txt
import frappe
from frappe.website.website_generator import WebsiteGenerator

class BudgetRequest(WebsiteGenerator):
	pass

@frappe.whitelist(allow_guest=True)
def submit_info(profile):
	frappe.msgprint(profile)
