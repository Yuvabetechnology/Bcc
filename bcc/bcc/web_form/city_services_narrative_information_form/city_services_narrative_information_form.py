from __future__ import unicode_literals
from frappe.utils import now
import frappe

def get_context(context):
	context.created_by = frappe.session.user
	context.created_on = now()
	