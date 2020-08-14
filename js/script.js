
let countriesAll = ""
let infoCounty = ""
let totalWorld = ""
let jsonCitys

async function createMap(){
    const mapa =  await fetch('https://api.covid19api.com/countries')        
    const citys = await mapa.json();
    document.querySelector("#contInfo").innerHTML = ""        
    for (const city of citys) {        
        let htmlInner = `<div class="col col-xs-12 col-lg-3 col-xl-3" >
            <div class="card mt-2 mouse">
                <div class="card-body" name="${city.Country}" onclick="selectInfoCity(this)">${city.Country}</div>
            </div>
        </div>`

        countriesAll += htmlInner        
    }
    rechargeCityes()    
    global()
    jsonCitys = citys
}

function rechargeCityes(){
    document.querySelector("#contInfo").innerHTML = countriesAll 
}

async function global(){
    const world = await fetch('https://api.covid19api.com/summary')
    const jsonWorld = await world.json()
    

    totalWorld = `
    <div class="card center col-sm-10 center">
        <div class="card-head">
            <h3>informacion mundial</h3>
        </div>
        <div class="card-body container">
            <div class="row">                
                <p class="col">Nuevos casos confirmados</p>
                <p class="col">${jsonWorld.Global.NewConfirmed}</p>
            </div>
            <div class="row">                
                <p class="col">Muertos confirmados</p>
                <p class="col">${jsonWorld.Global.NewDeaths}</p>
            </div>
            <div class="row">                
                <p class="col">Nuevos Recuperados</p>
                <p class="col">${jsonWorld.Global.NewRecovered}</p>
            </div>
            <div class="row">                
                <p class="col">Total casos confirmados</p>
                <p class="col">${jsonWorld.Global.TotalConfirmed}</p>
            </div>
            <div class="row">                
                <p class="col">Total muertes</p>
                <p class="col">${jsonWorld.Global.TotalDeaths}</p>
            </div>
            <div class="row">                
                <p class="col">Total recuperados</p>
                <p class="col">${jsonWorld.Global.TotalRecovered}</p>
            </div>
        </div>
    </div>`
}

function printInfoWorld(){
    document.querySelector("#contInfo").innerHTML = totalWorld
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
    if(jsonInfo[0] == null){
        htmlDescription = `<h1>No hay informacion del pais ${nameCity}</h1>`
    }
    else{
        for (const info of jsonInfo) {
        htmlDescription += `
        <div class="col col-xs-12 col-lg-4 col-xl-4" >
            <div class="card mt-2 mouse">
                <div class="card-head" name="${nameCity}" >${nameCity}</div>
                <div class="card-body container">
                    <div class="date row">
                        <p class="col"> fecha </p>
                        <p class="col"> ${info.Date.split('T00')[0]} </p>
                    </div>
                    <div class="active row">
                        <p class="col"> casos activos </p>
                        <p class ="col"> ${info.Active}</p>
                    </div>
                    <div class="confirmed row">
                        <p class="col"> casos confirmados</p>
                        <p class="col"> ${info.Confirmed}</p>                        
                    </div>
                    <div class="death row">
                        <p class="col"> muertes </p>
                        <p class="col"> ${info.Deaths}</p>
                    </div>
                    <div class="recover row">
                        <p class="col"> recuperados</p>
                        <p class="col"> ${info.Recovered}</p>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    infoCounty = htmlDescription
    rechargeCity()
}

function rechargeCity(){
    document.querySelector("#contInfo").innerHTML = infoCounty
    document.querySelector("#infoCity").classList.remove("disabled")
}
/*
function search(){
    const search = document.querySelector("#search").value
    let result = []
    for (const city of jsonCitys) {        
        result = city.Country.match(/${search}/g)
        console.log(result)
        if(result[0].length !== null){
            let htmlInner = `
            <div class="col col-xs-12 col-lg-3 col-xl-3" >
                <div class="card mt-2 mouse">
                    <div class="card-body" name="${city.Country}" onclick="selectInfoCity(this)">${city.Country}</div>
                </div>
            </div>`
        }

        countriesAll += htmlInner        
    }
    rechargeCityes()   
}
*/
createMap();

