sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MaskInput",
    "br/com/supri/fioriappsuprimentos199/util/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, MaskInput, Formatter) {
        "use strict";

        return Controller.extend("br.com.supri.fioriappsuprimentos199.controller.ListaFornecedor", {

            objFormatter: Formatter,

            onInit: function () {

            },

            onSearch: function () {                 


                //Capturando individualmeente cada objeto input do ob jeto Filter Bar
                var oFornecedorIdInput     = this.getView().byId("fornecedorIdInput");
                var oFornecedorNameInput   = this.getView().byId("fornecedorNameInput");
                var oFornecedorCidadeInput = this.getView().byId("fornecedorCidadeInput");
                var oFornecedorPaisInput   = this.getView().byId("fornecedorPaisInput");

                //var maskPhone = new MaskInput ("PhoneNumber", "(000) 0000-0000");

         


                var oFilter = new Filter({
                    filters: [
                        new Filter("Businesspartners", FilterOperator.Contains, oFornecedorIdInput.getValue()),
                        new Filter("Companyname", FilterOperator.Contains, oFornecedorNameInput.getValue()), 
                        new Filter("City", FilterOperator.Contains, oFornecedorCidadeInput.getValue()), 
                        new Filter("Country", FilterOperator.Contains, oFornecedorPaisInput.getValue()), 
                      ],
                    and: true
                })

                // Criação do Objeto List
                var oTable = this.getView().byId("tableFornecedor");

                //Acesso a agregação items, que é a entidade onde srá aplicada o filtro
                var binding = oTable.getBinding("items");

                // É aplicado o filtro para o databinding
                binding.filter(oFilter);
            },

            btnMenuListarOrdVenda: function (evt) {

                // debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaOrdensVendas");

            },

            btnMenuListarProd: function (evt) {

                debugger;

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaProdutos");

            },

            onSelectedItem: function(evt){

                debugger;

                var oFornId = evt.getSource().getBindingContext().getProperty("Businesspartners");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("DetalheFornecedor", {
                    BusinessPartnerID: oFornId
                });

            },

            telefone: function(telValue){   

                if(telValue){

                    var tam = telValue.length;
                    var tamPadrao = 10;

                    if(tam <= tamPadrao){                    
                        
                        if(tam < tamPadrao){
        
                            while(tam < tamPadrao) {
        
                                telValue = "0" + telValue;
                            
                                tam ++;                    
                            }  
                        }
    
                        var telMask = telValue.match(/(\d{3})(\d{3})(\d{4})/);
                        telMask = "(" + telMask[1] + ") " + telMask[2] + "-" + telMask[3];
                        return telMask;
                    }
                }          
            }
        });
    });
