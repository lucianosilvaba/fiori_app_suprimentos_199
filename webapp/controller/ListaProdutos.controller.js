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

        return Controller.extend("br.com.supri.fioriappsuprimentos199.controller.ListaProdutos", {

            objFormatter: Formatter,

            onInit: function () {

            },

            onSearch: function () {                 

               debugger;

                //Capturando individualmeente cada objeto input do ob jeto Filter Bar
                var oidProdutoInput    = this.getView().byId("idProdutoInput");
                //var onomeProdutoInput  = this.getView().byId("nomeProdutoInput");
                //var oundProdutoInput   = this.getView().byId("undProdutoInput");
              var ocategProdutoInput = this.getView().byId("categProdutoInput");
                var ofornProdutoInput  = this.getView().byId("fornProdutoInput");

                var oFilter = new Filter({
                    filters: [
                       new Filter("Productid", FilterOperator.Contains, oidProdutoInput.getValue()),
                       //new Filter("Name", FilterOperator.Contains, onomeProdutoInput.getValue()), 
                      // new Filter("MeasureUnit", FilterOperator.Contains, oundProdutoInput.getValue()),
                       new Filter("Category", FilterOperator.Contains, ocategProdutoInput.getValue()), 
                       new Filter("Supplierid", FilterOperator.Contains, ofornProdutoInput.getValue()), 
                      ],
                    and: true
                })

                // Criação do Objeto List
                var oTable = this.getView().byId("tableProdutos");

                //Acesso a agregação items, que é a entidade onde srá aplicada o filtro
                var binding = oTable.getBinding("items");

                // É aplicado o filtro para o databinding
                binding.filter(oFilter);
            },

            onSelectedItem: function(evt){

                debugger;

                var oNumOrdem = evt.getSource().getBindingContext().getProperty("");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("", {
                    SalesOrderID: oNumOrdem
                });

            },

            btnMenuListarOrdVenda: function (evt) {

                // debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaOrdensVendas");

            },

            btnMenuListarForn: function (evt) {

                debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaFornecedor");

            },

            onSelectedItem: function(evt){

                debugger;

                var oProduto = evt.getSource().getBindingContext().getProperty("Productid");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("DetalheProduto", {
                    ProductID: oProduto
                });

            }

        });
    });
