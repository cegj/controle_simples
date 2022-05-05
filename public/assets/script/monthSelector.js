import ContextOpenClose from "./contextOpenClose.js";

export default class MonthSelector extends ContextOpenClose{
    constructor(btn, box, form, monthSelector, monthField, monthSelectorBtns){
        super(btn, box);
        this.form = document.querySelector(form);
        this.monthSelector = document.querySelector(monthSelector);
        this.monthField = document.querySelector(monthField);
        this.monthSelectorBtns = document.querySelectorAll(monthSelectorBtns);
    }

    setMonthAndGo(event){
        console.log(event.target.value);
        this.monthField.value = event.target.value;
        this.monthField.innerText = event.target.value;
        this.form.submit();
    }

    addEventToBtns(){

        this.monthSelectorBtns.forEach((btn) => {
            btn.addEventListener('click', this.setMonthAndGo);
        })
    }

    bindEventsMonthSelector(){
        this.setMonthAndGo = this.setMonthAndGo.bind(this);
    }

    initMonthSelector(){
        this.initContextOpenClose();
        this.bindEventsMonthSelector();
        this.addEventToBtns();
    }
}