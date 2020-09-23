sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/Text"

], function (Controller, JSONModel, Filter, FilterOperator, MessageToast, Button, Dialog, Text) {
	"use strict";

	return Controller.extend("sap.ui.webAppProject.controller.InvoiceList", {

		onAfterRendering: function () {

			this.getView().byId("invoiceList").getBinding("items").sort(new sap.ui.model.Sorter('invoice>/Invoices', true, function (oContext) {
				var d = new Date(oContext.getProperty('StartDate')).getMonth();
				var month = new Array();
				month[0] = "January";
				month[1] = "February";
				month[2] = "March";
				month[3] = "April";
				month[4] = "May";
				month[5] = "June";
				month[6] = "July";
				month[7] = "August";
				month[8] = "September";
				month[9] = "October";
				month[10] = "November";
				month[11] = "December";
				return month[d];
			}));
		},

		onFilterInvoices: function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("EventName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onListItemPress: function (oEvent) {

			var oDialog = new sap.m.Dialog({
				title: oEvent.getSource().getTitle(),
				state: 'Information',

				content: new sap.m.Text({
					text: oEvent.getSource().getDescription()
				}),

				beginButton: new sap.m.Button({
					text: 'Close',
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function () {
					oDialog.destroy();
				}
			});
			oDialog.open();
		},

		onRejectPress: function () {
			MessageToast.show('Reject Button Pressed');
		},

		onAcceptPress: function () {
			MessageToast.show('Accept Button Pressed');
		},

		onErrorPress: function (event) {
			var messageStrip = new sap.m.MessageStrip({
				type: 'Error',
				showIcon: true,
				showCloseButton: true,
				text: 'Error: Something went wrong.',
				link: new sap.m.Link({
					text: 'SAP CE',
					href: 'www.sap.com',
					target: '_blank'
				})
			});

			var notification = event.getSource().getParent().getParent();
			notification.setProcessingMessage(messageStrip);
		},

		onItemClose: function (oEvent) {
			var oItem = oEvent.getSource(),
				oList = oItem.getParent();

			oList.removeItem(oItem);

			MessageToast.show('Item Closed: ' + oEvent.getSource().getTitle());
		}
	});

});