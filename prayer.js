let time = document.getElementById("time");
let x=document.getElementById("city").value;


function city(){
    x=document.getElementById("city").value;
    
    console.log(x);
    setTime();
}

function setTime() {
    document.getElementById("content").innerHTML = "";
    let d=new Date();
    let d1=String(d.getDate()).padStart(2,"0");
    let d2=String(d.getMonth()+1).padStart(2,"0");
    let d3=String(d.getFullYear());

    console.log(d1+"-"+d2+"-"+d3);
    let day= d1+"-"+d2+"-"+d3;
    
    axios.get(`https://api.aladhan.com/v1/timingsByCity/${day}?city=${x}&country=algeria&method=8`)
        .then((response) => {
            let prays = response.data.data.timings;
            let prayerNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
            let prayerTimes = [prays.Fajr, prays.Sunrise, prays.Dhuhr, prays.Asr, prays.Maghrib, prays.Isha];
            document.getElementById("day").innerHTML=`
             <h1>${x}</h1>
        <div>
            <h2 style="margin-top:3px;">${day}</h2>
        
        </div>
            `
            
            
            for (let i = 0; i < prayerNames.length; i++) {
                let content = `
                    <div id="cards">
                        <h2>${prayerNames[i]}</h2>
                        <p>${prayerTimes[i]}</p>
                    </div>
                `;
                document.getElementById("content").innerHTML += content;
            }
        }).catch(error => {
            alert(error);
        });
}

setTime();
