//* ======================================================
//*                     IOS CALCULATOR
//* ====================================================== 

//*1.KISIM : Tuş yakalamalar ve Değişken Atamaları

const rakamButtons = document.querySelectorAll(".num");
const islemButtons = document.querySelectorAll(".operator");
const silButton = document.querySelector(".ac");
const isaretButton = document.querySelector(".pm");
const yuzdeButton = document.querySelector(".percent");
const esitButton = document.querySelector(".equal");
const ustEkran = document.querySelector(".previous-display");
const altEkran = document.querySelector(".current-display");

let islem=""; // Bu basilan operatoru tutan degisken
let ustEkranSayi=""; // Bu ilk girilen sayi degeri
let altEkranSayi=""; // Bu ikinci girilen sayi degeri
let sonuc; // Bu ekrana yazdirilmadan once islem sonuclarinin atanacagi degisken
let equalOrPercentPressed=false;

//*2.KISIM : TESPİT FONKSIYONLARI - Basılan tusları tespit eder

// Rakam tuşlarına veya nokta tuşuna basılırsa
rakamButtons.forEach((number) => {
    number.onclick = () => {
    denetim(number.textContent);
    ekranaYaz();
    
    }
    })
    
// islem(operator)tuslarindan birine basilirsa    
islemButtons.forEach((op)=>{
    op.onclick=()=>{
   
    if(altEkranSayi === "")
     return;
    
    if (altEkranSayi && ustEkranSayi)
     hesapla();
      
    islem = op.textContent;
    ustEkranSayi = altEkranSayi;
    altEkranSayi = "";

    ekranaYaz();
    
    }
    })

// Eşittir Butonuna basılırsa
esitButton.onclick = () => {
    hesapla();
    ekranaYaz();
    equalOrPercentPressed=true;
  }

//AC (Sil) Butonuna basıldıgında
silButton.onclick = () => {
    islem="";
    ustEkranSayi="";
    altEkranSayi="";
    ekranaYaz();

}

//İşaret (+-) Butonuna basıldıgında
isaretButton.onclick=()=>{
    if(!altEkranSayi)
     return;    
      altEkranSayi = altEkranSayi * -1
      ekranaYaz();
    }

//Yüzde (percent) Butonuna basıldıgına
yuzdeButton.onclick=()=>{
    if (!altEkranSayi)
     return;

    altEkranSayi= altEkranSayi / 100;

    ekranaYaz();

    equalOrPercentPressed=true
    
    }

//*3.KISIM : İŞLEM FONKSIYONLARI- Hesaplama ve Sonuç verme işlemleri

// Hesaplama Fonksiyonu
const hesapla = () => {
   switch (islem) {
    case "+":
      sonuc = ustEkranSayi + Number(altEkranSayi);
      break;

    case "-":
      sonuc = ustEkranSayi - altEkranSayi;
      break;

    case "x":
      sonuc = ustEkranSayi * altEkranSayi;
      break;

    case "÷":
      sonuc = ustEkranSayi / altEkranSayi;
      break;

    default:// Eger herhangi bir islem tusuna basilmadan esittire basilirsa
      return; 
    
} 
altEkranSayi = sonuc;
ustEkranSayi = "";
islem = "";
}


// Ekrana Yazdirma Fonksiyonu
const ekranaYaz=()=>{

    if(altEkranSayi.toString().length>9)
   
    {altEkranSayi= altEkranSayi.toString().slice(0,9)}  
   
   altEkran.textContent=altEkranSayi;
   
   // islem tusuna basilmissa
   if(islem != null){
   ustEkran.textContent= `${ustEkranSayi}  ${islem}`
   }
   else{
    ustEkran.textContent="";
   }
   }
    


//*4.KISIM : Denetleyici Kısım
const denetim = (num) => {

    //Sıfır girilir sonra 0 veya . disinda bir sayi girerse
    
    if(altEkranSayi == "0" && num !== "0" && num !== ".")
    {
     altEkranSayi = num
     return;
    }
    //Ikinci bir nokta girilirse
    if (num === "." && altEkranSayi.includes(".")) 
    return;
    
    //10 haneden daha uzun bir sayi girilirse
    if(altEkranSayi.length > 9)
    return;    

    //Girilen ilk sifirdan sonra nokta kullanmadan başka sıfırlar girilirse    
    if(altEkranSayi==="0" && num ==="0")
    return;
    
    //Eşittir ve yüzde basıldıktan sonra girilen sayı ekranda gözüksün. Yenı ıslem baslıyor
    if (equalOrPercentPressed) {
        equalOrPercentPressed=false
      altEkranSayi = num;
      return;
    }
    //Denetim başarılı ıse basılan numaraları arka arkaya sırala
    altEkranSayi += num

    }

    


    
    
