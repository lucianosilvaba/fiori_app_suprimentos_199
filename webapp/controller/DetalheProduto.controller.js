sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "br/com/supri/fioriappsuprimentos199/util/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter) {
        "use strict";

        return Controller.extend("br.com.supri.fioriappsuprimentos199.controller.DetalheProduto", {

            objFormatter: Formatter,

            onInit: function () {
                //Criar objeto Route e acoplando a função que fará o bindElement
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("DetalheProduto").attachMatched(this.onBindingProdutoDetalhes, this);
            },
      
            onBindingProdutoDetalhes: function (oEvent) {

                 debugger;
                //Capturando o parametro trafegado no Route Detalhes (ProductID)
                var oProduto = oEvent.getParameter("arguments").ProductID;

                 //Objeto referente a view Detalhes
                var oView = this.getView();

                //Criar a url de chamada da nossa entidade de produtos

                var sURL = "/product('" + oProduto + "')";


                //Realizar o bindElement

                oView.bindElement({
                    path: sURL,
                    parameters: { expand: '' },
                    events: {
                        change: this.onBindingChange.bind(this),
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function (data) {
                            debugger;
                            oView.setBusy(false);
                        }
                    }
                });
            }, 

            onBindingChange: function (oEvent) {

                //debugger;
                var oView = this.getView();
                var oElementBinding = oView.getElementBinding();

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                // Se não existe um registro válido eu farei uma ação
                if (!oElementBinding.getBoundContext()) {


                    oRouter.getTargets().display("objNotFound");
                    return;

                }
            },

            listarOrdVendasForn: function(){

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaOrdensVendas");

            },

            onListaProduto: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("ListaProdutos");
                
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
            },           

  
            onDetalheFornecedor: function (value) {

               // var oFornId = evt.getSource().getBindingContext().getProperty("ToBusinessPartner/BusinessPartnerID");
                var oFornIdLink = this.getView().byId("linkHeaderForn");
                var oFornId     = oFornIdLink.mProperties.text;
                var oRouter     = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("DetalheFornecedor", {
                    BusinessPartnerID: oFornId
                });                
            }
        });
    });
