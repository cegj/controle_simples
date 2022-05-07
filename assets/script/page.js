import runMainScript from "./main.js";

export default class Page{

    async fetchPage(pageName){
        const response = await fetch(`/app/pages/${pageName}.php`);
        const page = await response.text();
        return page;    
    }

    setBrowserPrevNext(){
        window.addEventListener('popstate', () => {
            this.load(window.location.search);
          });          
    }

    setPtPageName(pageName){
        switch(pageName){
            case 'board':
                this.ptPageName = 'Painel';
                break;
            case 'statement':
                this.ptPageName = 'Extrato';
                break;        
            case 'budget':
                this.ptPageName = 'Orçamento';
                break;
            case 'category':
                this.ptPageName = 'Categorias';
                break;
            case 'account':
                this.ptPageName = 'Contas';
                break;
        }
        return this.ptPageName;
    }

    async load(paramString, target){
        this.paramString = (paramString !== "") ? paramString : '?p=board';
        this.params = new URLSearchParams(this.paramString);
        this.pageName = this.params.get('p');
        this.target = target ? target : '#main-content';
        this.target = document.querySelector(this.target);

        this.target.innerHTML = `<div class="loading"><img src="/assets/img/load.gif" alt="Carregando..." /></div>`
        this.target.innerHTML = await this.fetchPage(this.pageName);
        document.title = "Contta | " + this.setPtPageName(this.pageName);
        runMainScript();
        return this;
    }
}