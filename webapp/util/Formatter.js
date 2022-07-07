sap.ui.define(["sap/ui/core/format/NumberFormat"], function (NumberFormat) {
    "use strict";

    var Formatter = {

        date: function (value) {

            //debugger;

            var oConfiguration = sap.ui.getCore().getConfiguration();

            var oLocale = oConfiguration.getFormatLocale();

            var oPattern = "";

            if (oLocale === "pt-BR") {

                oPattern = "dd/MM/yyyy"

            } else {
                oPattern = "MM/dd/yyyy"
            }

            if (value) {
                var year = new Date().getFullYear();
                if (year === 9999) {
                    return "";
                } else {
                    var oDateFormat = sap.ui.core.format.DateFormat.getTimeInstance({
                        // style: "full"

                        pattern: oPattern
                    });

                    return oDateFormat.format(new Date(value));
                }
            } else {
                return value;
            }

        },

        //Apresentar o texto do status mediante a propiedade Status do model
        statusProduto: function (value) {


            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            try {
                return oBundle.getText("status" + value);
            } catch (err) {
                return "";
            }
        },
        //Apresentar o estado cor do ObjeStatus mediante a propiedade Status do model
        stateProduto: function (value) {

            try {
                if (value === "E") {
                    return "Success";
                } else if (value === "P") {
                    return "Warning";
                } else if (value === "F") {
                    return "Error";
                } else {
                    return "None";
                }
            } catch (err) {
                return "None";
            }
        },

        //Apresentar icone correspondente mediante a propiedade Status do model
        iconProduto: function (value) {

            try {
                if (value === "E") {
                    return "sap-icon://sys-enter-2";
                } else if (value === "P") {
                    return "sap-icon://alert";
                } else if (value === "F") {
                    return "sap-icon://error";
                } else {
                    return "";
                }
            } catch (err) {
                return "";
            }
        },

        //Apresentar valores númericos formatados tipo decimal
        floatNumber: function (value) {
            var numFloat = NumberFormat.getFloatInstance({
                maxFractionDigits: 2,
                minFractionDigits: 2,
                groupingEnabled: true,
                groupingSeparator: ".",
                decimalSeparator: ","

            });

            return numFloat.format(value);
        }

    };

    return Formatter;

}, true);

