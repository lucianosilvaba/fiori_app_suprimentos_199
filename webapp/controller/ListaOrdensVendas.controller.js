sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "br/com/supri/fioriappsuprimentos199/util/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Formatter) {
        "use strict";

        return Controller.extend("br.com.supri.fioriappsuprimentos199.controller.ListaOrdensVendas", {

            objFormatter: Formatter,
            
            onInit: function () {               

            }, 
         
            onSearch: function () {                 

               debugger;

                //Capturando individualmeente cada objeto input do ob jeto Filter Bar
                var onumOrdemInput        = this.getView().byId("numOrdemInput");
                var oclienteNameInput     = this.getView().byId("clienteNameInput");
               // var ostatusOrdemInput     = this.getView().byId("statusOrdemInput");
              // var ofornecedorOrdemInput = this.getView().byId("fornecedorOrdemInput");

                var oFilter = new Filter({
                    filters: [
                       new Filter("Salesorderid", FilterOperator.Contains, onumOrdemInput.getValue()),
                       new Filter("Customername", FilterOperator.Contains, oclienteNameInput.getValue()), 
                      // new Filter("LifecycleStatusDescription", FilterOperator.Contains, ostatusOrdemInput.getValue()),
                       //new Filter("ToBusinessPartner/BusinessPartnerID", FilterOperator.Contains, ofornecedorOrdemInput.getValue()), 
                      ],
                    and: true
                })

                // Criação do Objeto List
                var oTable = this.getView().byId("tableOrdemVendas");

                //Acesso a agregação items, que é a entidade onde srá aplicada o filtro
                var binding = oTable.getBinding("items");

                // É aplicado o filtro para o databinding
                binding.filter(oFilter);
            },

            onSelectedItem: function(evt){

                debugger;

                var oNumOrdem = evt.getSource().getBindingContext().getProperty("Salesorderid");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("DetalheOrdensVendas", {
                    SalesOrderID: oNumOrdem
                });

            },

            btnMenuListarForn: function (evt) {

                debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaFornecedor");

            },

            btnMenuListarProd: function (evt) {

                 debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaProdutos");

            }
        });
    });
