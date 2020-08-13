
async function createMap(){
    const mapa =  await fetch('https://api.covid19api.com/countries')        
    const citys = await mapa.json();
    document.querySelector("#contInfo").innerHTML =""        
    for (const city of citys) {        
        let htmlInner = `<div class="col col-xs-12 col-lg-3 col-xl-3" >
            <div class="card">
                <div class="card-body" name="${city.Country}" onclick="selectInfoCity(this)">${city.Country}</div>
            </div>
        </div>`

        document.querySelector("#contInfo").innerHTML += htmlInner;
    }
        
   
}

async function loadInfoCity(name){
    const infoCity = await fetch(`https://api.covid19api.com/live/country/${name}/status/confirmed`)
    const jsonInfoCity = await infoCity.json()
    return jsonInfoCity
}

async function selectInfoCity(name){
    const nameCity = name.getAttribute("name")
    const jsonInfo = await loadInfoCity(nameCity)
    let htmlDescription = ""
    console.log(jsonInfo)    

    for (const info of jsonInfo) {
        htmlDescription += `
        <div class="col col-xs-12 col-lg-3 col-xl-3" >
            <div class="card">
                <div class="card-head" name="${nameCity}" >${nameCity}</div>
                <div class="card-body container">
                    <div class="date row">
                        <p class="col"> fecha </p>
                        <p class="col"> ${info.Date} </p>
                    </div>
                </div>
            </div>
        </div>`
    }
    
    document.querySelector("#contInfo").innerHTML = htmlDescription

}

createMap();

