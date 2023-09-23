"use strict";

//Déclaration des liste et variables
let cara = ["le nerd", "le sportif", "la tiktokeuse", "le plouc", "l'incarcéré"]
let noms = ["Jarod","Jules", "Jean", "Ilan", "Edgar"]
let jason_hp = 100;

//Variables pour faire joli plus tard
let style_red = "display: inline-block ; background-color: red ; color: white ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
let style_green = "display: inline-block ; background-color: lime ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
let style_gold = "display: inline-block ; background-color: gold ; color: black ; font-weight: bold ; padding: 3px 7px 3px 7px ; border-radius: 3px 3px 3px 3px ;"
let style_rainbow = "font-weight: bold; font-size: 50px;color: red; text-shadow: 2px 2px 0 rgb(217,31,38) , 4px 4px 0 rgb(226,91,14) , 6px 6px 0 rgb(245,221,8) , 8px 8px 0 rgb(5,148,68) , 10px 10px 0 rgb(2,135,206) , 12px 12px 0 rgb(4,77,145) , 14px 14px 0 rgb(42,21,113); margin-bottom: 12px; padding: 1%";
let style_default = "";
let style_bold = "font-weight: bold"

//Classe Perso pour créer les 5 personnages
class Perso{
    constructor(){
        this.nom = noms[Math.floor(Math.random() * noms.length)];
        this.caracteristic = cara[Math.floor(Math.random() * cara.length)]
        this.death_prob = Math.floor(Math.random() * 10);
        this.damage_prob = Math.floor(Math.random() * (10 -this.death_prob));
        this.death_damage_prob = 10 - this.death_prob - this.damage_prob;
        this.proba = [];
        for(let i=this.death_prob;i>0;i--){this.proba.push("death");}
        for(let i=this.damage_prob;i>0;i--){this.proba.push("damage");}
        for(let i=this.death_damage_prob;i>0;i--){this.proba.push("death_and_damage");}
        this.death_prob=`${this.death_prob}0%`;this.damage_prob=`${this.damage_prob}0%`;this.death_damage_prob=`${this.death_damage_prob}0%`
        noms.splice(noms.indexOf(this.nom),1);
        cara.splice(cara.indexOf(this.caracteristic),1);
    }
}

//Initialisation des listes de persos vivants et morts
let persos = []
for(let i=0;i<5;i++){persos.push(new Perso())}

let deads = [];

//Affichage de la situation initiale
console.log(`%cJason a ${jason_hp}hp.`, style_red)

console.table(persos)


//Boucle while comprenant toute la logique des attaques, ripostes, décès et messages
while(jason_hp>0 && persos.length>0){
    let target = Math.floor(Math.random() * persos.length)
    let event = persos[target].proba[Math.floor(Math.random() * persos[target].proba.length)]
    switch(event){
        case "death":
            deads.push(persos[target].nom);
            console.log(`------\n%cJason(${jason_hp}hp)%c a tué %c${persos[target].nom}%c.`, style_red, style_default, style_green, style_default);
            persos.splice(target,1);
            break;
        case "damage":
            jason_hp-=10;
            console.log(`------\n%c${persos[target].nom}%c à esquivé %cJason(${jason_hp}hp)%c et a infligé %c10 points de dmg%c.`, style_green, style_default,style_red, style_default, style_bold, style_default);
            break;
        case "death_and_damage":
            jason_hp-=15;
            deads.push(persos[target].nom);
            console.log(`------\n%c${persos[target].nom}%c à infligé %c15 points de dmg%c mais à été tué par %cJason(${jason_hp}hp)%c.`, style_green, style_default, style_bold, style_default, style_red, style_default);
            persos.splice(target,1);
            break;
    }
}

//Message final
if(jason_hp<=0 && persos.length==0){
    console.log("%cEVERYONE'S DEAD !!!", style_rainbow)
    console.log(`%cRIP à ${deads}.`, style_gold)
} else if (jason_hp<=0 && persos.length>0){
    console.log(`%cJason est mort. Les survivants ont gagné.`, style_gold)
    console.log(`%cRIP à ${deads}.`, style_gold)
    console.log("%c Gagné !", style_rainbow);
} else if(jason_hp>0 && persos.length==0){
    console.log("%cJason a gagné.", style_gold)
    console.log(`%cRIP à ${deads}.`, style_gold)
}